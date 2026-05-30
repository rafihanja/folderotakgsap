import { Camera, Raycaster, Vector2 } from 'three';
import { NPCManager } from './NPCManager';
import type { NPCInstance } from './NPCManager';
import { DialogueSystem } from '../dialogue/DialogueSystem';
import { InputManager } from '../input/InputManager';
import { UIManager } from '../ui/UIManager';
import { QuestSystem } from '../quests/QuestSystem';
import { PuzzleSystem } from '../puzzles/PuzzleSystem';
import { QuestObjectiveType } from '../quests/QuestObjectiveType';

export class NPCInteraction {
  private raycaster: Raycaster;
  private centerCoord = new Vector2(0, 0); // Always center for FPS
  private npcManager: NPCManager;
  private dialogueSystem: DialogueSystem;
  private inputManager: InputManager;
  private uiManager: UIManager;
  private camera: Camera;
  private questSystem: QuestSystem;
  private puzzleSystem: PuzzleSystem;

  private currentTarget: NPCInstance | null = null;
  private maxInteractDistance = 4;

  constructor(
    npcManager: NPCManager,
    dialogueSystem: DialogueSystem,
    inputManager: InputManager,
    uiManager: UIManager,
    camera: Camera,
    questSystem: QuestSystem,
    puzzleSystem: PuzzleSystem
  ) {
    this.raycaster = new Raycaster();
    this.npcManager = npcManager;
    this.dialogueSystem = dialogueSystem;
    this.inputManager = inputManager;
    this.uiManager = uiManager;
    this.camera = camera;
    this.questSystem = questSystem;
    this.puzzleSystem = puzzleSystem;
  }

  public update() {
    // If dialogue is active, handle dialogue inputs
    if (this.dialogueSystem.isActive()) {
      if (this.inputManager.state.consumeAdvanceDialogue()) {
        this.dialogueSystem.advance();
      }
      if (this.inputManager.state.consumeCloseDialogue()) {
        this.dialogueSystem.closeDialogue();
      }
      // Hide prompt when dialogue is open
      this.uiManager.interactionPromptUI?.hide();
      return;
    }

    // Raycast for NPCs
    this.raycaster.setFromCamera(this.centerCoord, this.camera);
    
    let closestNPC: NPCInstance | null = null;
    let minDistance = this.maxInteractDistance;

    const npcs = this.npcManager.getNPCs();
    for (const npc of npcs) {
      if (this.raycaster.ray.intersectsBox(npc.boundingBox)) {
        const dist = this.camera.position.distanceTo(npc.group.position);
        if (dist < minDistance) {
          closestNPC = npc;
          minDistance = dist;
        }
      }
    }

    this.currentTarget = closestNPC;

    if (this.currentTarget) {
      this.uiManager.interactionPromptUI?.show(this.currentTarget.data.name);
      
      // Handle interact input
      if (this.inputManager.state.consumeInteract()) {
        const npcId = this.currentTarget.data.id;
        
        // Advance quest progress for talking to this NPC
        this.questSystem.updateObjectiveProgress({
          type: QuestObjectiveType.TalkToNPC,
          targetId: npcId,
          amount: 1
        });

        // Special case for Explorer puzzle
        const activeCrystalQuest = this.questSystem.getActiveQuests().find(q => q.id === 'crystal_spark');
        if (npcId === 'explorer' && activeCrystalQuest) {
          const obj = activeCrystalQuest.objectives.find(o => o.type === QuestObjectiveType.SolvePuzzle);
          if (obj && obj.currentCount < obj.requiredCount) {
            // Show puzzle instead of standard dialogue, or dialogue first?
            // Let's just show puzzle for now
            this.uiManager.puzzleUI?.showPuzzle('crystal_puzzle_1');
            return;
          }
        }

        this.dialogueSystem.startDialogue(this.currentTarget.data);
      }
    } else {
      this.uiManager.interactionPromptUI?.hide();
      
      // Consume interact anyway so it doesn't leak or if we want Bimo to say something
      if (this.inputManager.state.consumeInteract()) {
        // Maybe Bimo says "Nothing to interact with here."
      }
    }
  }

  public hasTarget(): boolean {
    return this.currentTarget !== null;
  }
}
