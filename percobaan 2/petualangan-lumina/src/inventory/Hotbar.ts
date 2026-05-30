import { Inventory } from './Inventory';
import type { InventorySlotData } from './InventorySlot';
import { gameConfig } from '../config/gameConfig';
import { ITEM_DEFINITIONS } from '../items/itemDefinitions';
import { BlockType } from '../voxel/BlockType';

export type HotbarListener = (selectedIndex: number) => void;

export class Hotbar {
  private inventory: Inventory;
  private selectedIndex: number = 0;
  private listeners: HotbarListener[] = [];

  constructor(inventory: Inventory) {
    this.inventory = inventory;
  }

  public subscribeSelection(listener: HotbarListener) {
    this.listeners.push(listener);
    // Emit initial state
    listener(this.selectedIndex);
  }

  public setSelectedIndex(index: number) {
    if (index >= 0 && index < gameConfig.inventory.hotbarSlotCount) {
      this.selectedIndex = index;
      this.notifySelection();
    }
  }

  public getSelectedIndex(): number {
    return this.selectedIndex;
  }

  private notifySelection() {
    this.listeners.forEach(l => l(this.selectedIndex));
  }

  public getSelectedSlotData(): InventorySlotData {
    const slots = this.inventory.getSlotsData();
    // Assuming hotbar maps directly to the first N slots of the inventory
    return slots[this.selectedIndex];
  }

  public getSelectedPlaceableBlock(): BlockType | null {
    const slot = this.getSelectedSlotData();
    if (!slot.itemType || slot.quantity <= 0) return null;

    const def = ITEM_DEFINITIONS[slot.itemType];
    if (def.placeable && def.relatedBlockType) {
      return def.relatedBlockType;
    }

    return null;
  }

  // Helper to consume 1 item from the selected slot (used for placing)
  public consumeSelectedItem(): boolean {
    const slot = this.getSelectedSlotData();
    if (slot.itemType && slot.quantity > 0) {
      return this.inventory.removeItem(slot.itemType, 1);
    }
    return false;
  }
}
