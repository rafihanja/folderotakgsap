import { SceneManager } from './SceneManager';
import { FirstPersonCamera } from '../camera/FirstPersonCamera';
import { PlayerController } from '../player/PlayerController';
import { InputManager } from '../input/InputManager';
import { UIManager } from '../ui/UIManager';
import { createInitialScene } from '../scene/createInitialScene';
import { PlayerPlaceholder } from '../player/PlayerPlaceholder';
import { BimoPlaceholder } from '../companion/BimoPlaceholder';
import { VoxelWorld } from '../voxel/VoxelWorld';
import { VoxelRaycaster } from '../voxel/VoxelRaycaster';
import { BlockHighlighter } from '../voxel/BlockHighlighter';
import { BlockInteraction } from '../voxel/BlockInteraction';
import { Inventory } from '../inventory/Inventory';
import { Hotbar } from '../inventory/Hotbar';
import { CraftingSystem } from '../crafting/CraftingSystem';
import { NPCManager } from '../npc/NPCManager';
import { DialogueSystem } from '../dialogue/DialogueSystem';
import { NPCInteraction } from '../npc/NPCInteraction';
import { PerformanceManager } from './PerformanceManager';
import { gameConfig } from '../config/gameConfig';
import { EntityManager } from '../entity/EntityManager';
import { QuestSystem } from '../quests/QuestSystem';
import { PuzzleSystem } from '../puzzles/PuzzleSystem';
import { QuestObjectiveType } from '../quests/QuestObjectiveType';
import { UnlockAreaSystem } from '../world/UnlockAreaSystem';

export class Game {
  private sceneManager: SceneManager;
  private cameraSystem: FirstPersonCamera;
  private inputManager: InputManager;
  private uiManager: UIManager;
  private performanceManager: PerformanceManager;

  private player: PlayerPlaceholder;
  private playerController: PlayerController;
  private bimo: BimoPlaceholder;
  
  private voxelWorld: VoxelWorld;
  private blockInteraction: BlockInteraction;
  private npcManager: NPCManager;
  private entityManager: EntityManager;
  private dialogueSystem: DialogueSystem;
  private npcInteraction: NPCInteraction;
  
  private inventory: Inventory;
  private hotbar: Hotbar;
  private craftingSystem: CraftingSystem;
  
  private questSystem: QuestSystem;
  private puzzleSystem: PuzzleSystem;

  private bimoHints = {
    shownIntro: false,
    shownCrafting: false,
    shownFirstBlock: false,
    shownNPC: false
  };

  constructor(sceneManager: SceneManager) {
    this.sceneManager = sceneManager;
    this.cameraSystem = new FirstPersonCamera(this.sceneManager.camera);
    this.inputManager = new InputManager();
    this.uiManager = new UIManager();
    this.performanceManager = new PerformanceManager();
    this.dialogueSystem = new DialogueSystem();

    // Setup Inventory
    this.inventory = new Inventory();
    this.hotbar = new Hotbar(this.inventory);
    this.uiManager.initInventoryUI(this.inventory, this.hotbar);
    
    // Bind UI actions to input after DOM exists
    this.inputManager.bindUIActionButtons();

    // Setup Crafting
    this.craftingSystem = new CraftingSystem(this.inventory);
    this.uiManager.initCraftingUI(this.craftingSystem);

    // Setup Dialogue UI
    this.uiManager.initDialogueUI(this.dialogueSystem);

    // Setup Quest and Puzzle systems
    this.questSystem = new QuestSystem(this.inventory, this.uiManager);
    this.puzzleSystem = new PuzzleSystem();
    this.uiManager.initQuestUI(this.questSystem);
    this.uiManager.initPuzzleUI(this.puzzleSystem, () => {
      // Callback on puzzle closed. If we need to resume things we can do it here.
    });

    const entities = createInitialScene(this.sceneManager.scene);
    this.player = entities.player;
    this.bimo = entities.bimo;
    this.voxelWorld = entities.voxelWorld;
    this.npcManager = entities.npcManager;
    this.entityManager = entities.entityManager;

    // Follow player
    this.cameraSystem.setTarget(this.player.mesh);
    this.playerController = new PlayerController(this.player, this.cameraSystem, this.voxelWorld);

    // Setup NPC Interaction
    this.npcInteraction = new NPCInteraction(
      this.npcManager,
      this.dialogueSystem,
      this.inputManager,
      this.uiManager,
      this.sceneManager.camera,
      this.questSystem,
      this.puzzleSystem
    );

    // Setup Voxel Interactions
    const raycaster = new VoxelRaycaster();
    const highlighter = new BlockHighlighter(this.sceneManager.scene);
    this.blockInteraction = new BlockInteraction(
      this.voxelWorld,
      raycaster,
      highlighter,
      this.inputManager,
      this.uiManager,
      this.sceneManager.camera,
      this.inventory,
      this.hotbar,
      this.questSystem
    );

    // Wire up Crafting to QuestSystem
    this.craftingSystem.events.subscribeCraft((result) => {
      if (result && result.success && result.outputItem) {
        this.questSystem.updateObjectiveProgress({
          type: QuestObjectiveType.CraftItem,
          targetId: result.outputItem,
          amount: result.outputQuantity
        });
      }
    });

    // Wire up PuzzleSystem to QuestSystem
    this.puzzleSystem.events.subscribe((result) => {
      if (result.success) {
        this.questSystem.updateObjectiveProgress({
          type: QuestObjectiveType.SolvePuzzle,
          targetId: result.puzzleId,
          amount: 1
        });
      }
    });

    const unlockAreaSystem = new UnlockAreaSystem(this.voxelWorld);
    this.questSystem.events.subscribeAreaUnlock((areaId) => {
      unlockAreaSystem.unlockArea(areaId);
    });

    // Bimo intro message
    setTimeout(() => {
      if (!this.bimoHints.shownIntro) {
        this.bimoHints.shownIntro = true;
        this.uiManager.bimoMessageUI?.showMessage("Hi! I'm Bimo. I'll stay nearby while you explore Lumina.");
        this.questSystem.startQuest('welcome_lumina');
      }
    }, 2000);
  }

  public update(deltaTime: number, elapsedTime: number) {
    // 1. Process Input
    const camDeltas = this.inputManager.consumeCameraDeltas();
    
    const isUIActive = this.dialogueSystem.isActive() || !!this.uiManager.puzzleUI?.isActive;

    // Only allow camera look if no modal UI is active
    if (!isUIActive) {
      this.cameraSystem.processInputDeltas(camDeltas.x, camDeltas.y);
    }

    if (this.inputManager.state.consumeCraftingToggle()) {
      if (!isUIActive) {
        this.uiManager.toggleCraftingPanel();
        if (!this.bimoHints.shownCrafting) {
          this.bimoHints.shownCrafting = true;
          this.uiManager.bimoMessageUI?.showMessage("Open Craft when you have enough materials. You can make helpful blocks.");
        }
      }
    }

    // 2. Update Movement
    if (!isUIActive) {
      this.playerController.update(deltaTime, this.inputManager.state.moveX, this.inputManager.state.moveY);
    } else {
      this.inputManager.state.moveX = 0;
      this.inputManager.state.moveY = 0;
    }
    
    // 3. Update Camera
    this.cameraSystem.update();

    // 4. Update Companions & NPCs
    this.bimo.update(deltaTime, this.player.mesh.position);
    
    // 5. Update systems
    this.npcInteraction.update();
    this.npcManager.update(deltaTime, elapsedTime, this.player.mesh.position);
    this.entityManager.update(deltaTime, this.player.mesh.position);

    // Update VoxelWorld chunks based on player position
    this.voxelWorld.updateChunks(
      this.cameraSystem.camera.position,
      gameConfig.world.activeChunkRadius
    );

    // Only allow block interaction if no UI is active
    if (!isUIActive) {
      this.blockInteraction.update(deltaTime);
    } else {
      this.inputManager.state.consumeLeftClick();
      this.inputManager.state.consumeRightClick();
    }

    // Bimo Hint Triggers
    if (this.npcInteraction.hasTarget() && !this.bimoHints.shownNPC) {
      this.bimoHints.shownNPC = true;
      this.uiManager.bimoMessageUI?.showMessage("That person looks friendly. Press Interact to talk.");
    }

    // 6. Update UI
    this.uiManager.update(deltaTime, elapsedTime);
    
    // 7. Update Performance
    this.performanceManager.update(deltaTime);
    this.uiManager.updatePerformance(this.performanceManager);
  }
}
