import { Camera } from 'three';
import { VoxelWorld } from './VoxelWorld';
import { VoxelRaycaster } from './VoxelRaycaster';
import { BlockHighlighter } from './BlockHighlighter';
import { InputManager } from '../input/InputManager';
import { UIManager } from '../ui/UIManager';
import { BlockType } from './BlockType';
import { Inventory } from '../inventory/Inventory';
import { Hotbar } from '../inventory/Hotbar';
import { BlockDrops } from './BlockDrops';
import { ITEM_DEFINITIONS } from '../items/itemDefinitions';
import type { GridPosition } from './BlockData';
import { QuestSystem } from '../quests/QuestSystem';
import { QuestObjectiveType } from '../quests/QuestObjectiveType';

type MiningState = {
  isMining: boolean;
  targetBlockKey: string | null;
  elapsed: number;
  requiredDuration: number;
};

export class BlockInteraction {
  private world: VoxelWorld;
  private raycaster: VoxelRaycaster;
  private highlighter: BlockHighlighter;
  private input: InputManager;
  private ui: UIManager;
  private camera: Camera;
  private inventory: Inventory;
  private hotbar: Hotbar;
  private questSystem: QuestSystem;

  private miningState: MiningState = {
    isMining: false,
    targetBlockKey: null,
    elapsed: 0,
    requiredDuration: 1.0
  };

  constructor(
    world: VoxelWorld,
    raycaster: VoxelRaycaster,
    highlighter: BlockHighlighter,
    input: InputManager,
    ui: UIManager,
    camera: Camera,
    inventory: Inventory,
    hotbar: Hotbar,
    questSystem: QuestSystem
  ) {
    this.world = world;
    this.raycaster = raycaster;
    this.highlighter = highlighter;
    this.input = input;
    this.ui = ui;
    this.camera = camera;
    this.inventory = inventory;
    this.hotbar = hotbar;
    this.questSystem = questSystem;
  }

  private getBlockKey(pos: GridPosition): string {
    return `${pos.x},${pos.y},${pos.z}`;
  }

  public update(deltaTime: number) {
    // 1. Raycast from screen center (first-person)
    this.raycaster.updatePointer(0, 0);
    const hitResult = this.raycaster.intersectWorld(this.camera, this.world);

    // 2. Highlight
    if (hitResult.hit && hitResult.blockPosition) {
      this.highlighter.update(this.world, hitResult.blockPosition);
      
      const blockType = this.world.getBlock(hitResult.blockPosition);
      const name = Object.keys(BlockType).find(key => BlockType[key as keyof typeof BlockType] === blockType) || "Unknown";
      this.ui.setTargetBlockName(name);
    } else {
      this.highlighter.update(this.world, undefined);
      this.ui.setTargetBlockName("None");
    }

    // 3. Process Hotbar Selection Input
    const hotbarKey = this.input.state.consumeHotbarKey();
    if (hotbarKey !== null) {
      this.hotbar.setSelectedIndex(hotbarKey);
    }

    // 4. Process Mining (Hold to mine)
    if (this.input.state.isMiningHeld && hitResult.hit && hitResult.blockPosition) {
      const blockType = this.world.getBlock(hitResult.blockPosition);
      if (blockType !== BlockType.Air) {
        const targetKey = this.getBlockKey(hitResult.blockPosition);
        
        if (!this.miningState.isMining || this.miningState.targetBlockKey !== targetKey) {
          // Started mining a new block
          this.miningState.isMining = true;
          this.miningState.targetBlockKey = targetKey;
          this.miningState.elapsed = 0;
        }

        this.miningState.elapsed += deltaTime;
        const progress = Math.min(this.miningState.elapsed / this.miningState.requiredDuration, 1.0);
        
        // Show progress UI
        this.ui.updateMiningProgress(progress);

        if (this.miningState.elapsed >= this.miningState.requiredDuration) {
          // Mining complete
          const drops = BlockDrops.getDropsForBlock(blockType);
          let collectedAll = true;

          for (const drop of drops) {
            const success = this.inventory.addItem(drop.type, drop.quantity);
            if (!success) {
              collectedAll = false;
              this.ui.showNotification("Inventory full");
              break; 
            } else {
              const def = ITEM_DEFINITIONS[drop.type];
              this.ui.showNotification(`Collected ${def.displayName}`);
              
              // Quest update
              this.questSystem.updateObjectiveProgress({
                type: QuestObjectiveType.CollectItem,
                targetId: drop.type,
                amount: drop.quantity
              });
            }
          }

          if (collectedAll || drops.length === 0) {
            this.world.setBlock(hitResult.blockPosition, BlockType.Air);
          }

          // Reset mining state so it doesn't repeat instantly
          this.miningState.isMining = false;
          this.miningState.targetBlockKey = null;
          this.miningState.elapsed = 0;
          this.ui.updateMiningProgress(0); // Hide
        }
      }
    } else {
      // Not holding or no hit, cancel mining
      if (this.miningState.isMining) {
        this.miningState.isMining = false;
        this.miningState.targetBlockKey = null;
        this.miningState.elapsed = 0;
        this.ui.updateMiningProgress(0); // Hide
      }
      // Consume left click if it was tapped but we aren't holding (to clear state)
      this.input.state.consumeLeftClick();
    }

    // 5. Process Right Click (Place) - Tap/Instant
    if (this.input.state.consumeRightClick() && hitResult.hit && hitResult.blockPosition && hitResult.normal) {
      const placeableBlock = this.hotbar.getSelectedPlaceableBlock();
      
      if (placeableBlock === null) {
        const slotData = this.hotbar.getSelectedSlotData();
        if (slotData && slotData.itemType) {
          this.ui.showNotification("Cannot place this item");
        } else {
          this.ui.showNotification("No block selected");
        }
        return;
      }

      // We have a placeable block. Find place position.
      const placePos = {
        x: hitResult.blockPosition.x + hitResult.normal.x,
        y: hitResult.blockPosition.y + hitResult.normal.y,
        z: hitResult.blockPosition.z + hitResult.normal.z,
      };

      // Check collision with player? Future improvement.
      if (this.world.canPlaceBlock(placePos)) {
        // Try consuming the item
        if (this.hotbar.consumeSelectedItem()) {
          this.world.setBlock(placePos, placeableBlock);
          
          // Quest update
          this.questSystem.updateObjectiveProgress({
            type: QuestObjectiveType.PlaceBlock,
            targetId: placeableBlock.toString(),
            amount: 1
          });
        } else {
          this.ui.showNotification("Not enough items");
        }
      }
    }
  }
}
