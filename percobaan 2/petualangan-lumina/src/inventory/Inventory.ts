import { ItemType } from '../items/ItemType';
import { InventorySlot } from './InventorySlot';
import type { InventorySlotData } from './InventorySlot';
import { InventoryEvents } from './InventoryEvents';
import { gameConfig } from '../config/gameConfig';
import { ITEM_DEFINITIONS } from '../items/itemDefinitions';

export class Inventory {
  private slots: InventorySlot[] = [];
  public events = new InventoryEvents();

  constructor() {
    for (let i = 0; i < gameConfig.inventory.slotCount; i++) {
      this.slots.push(new InventorySlot());
    }

    if (gameConfig.inventory.enableStarterItems) {
      this.addStarterItems();
    }
  }

  private addStarterItems() {
    this.addItem(ItemType.WoodBlock, 3);
    this.addItem(ItemType.DirtBlock, 3);
    this.addItem(ItemType.StoneBlock, 3);
  }

  public getSlotsData(): InventorySlotData[] {
    return this.slots.map(s => s.toData());
  }

  private notify() {
    this.events.emit(this.getSlotsData());
  }

  public canAddItem(itemType: ItemType, quantity: number): boolean {
    if (quantity <= 0) return true;
    let remaining = quantity;
    const def = ITEM_DEFINITIONS[itemType];
    const maxStack = def ? def.maxStackSize : 99;

    for (const slot of this.slots) {
      if (!slot.isEmpty && slot.itemType === itemType && !slot.isFull) {
        const space = maxStack - slot.quantity;
        remaining -= space;
        if (remaining <= 0) return true;
      }
    }
    if (remaining > 0) {
      for (const slot of this.slots) {
        if (slot.isEmpty) {
          remaining -= maxStack;
          if (remaining <= 0) return true;
        }
      }
    }
    return remaining <= 0;
  }

  public addItem(itemType: ItemType, quantity: number): boolean {
    if (quantity <= 0) return true;

    let remaining = quantity;

    // 1. Try to add to existing stacks
    for (const slot of this.slots) {
      if (!slot.isEmpty && slot.itemType === itemType && !slot.isFull) {
        remaining = slot.add(itemType, remaining);
        if (remaining === 0) break;
      }
    }

    // 2. Try to add to empty slots
    if (remaining > 0) {
      for (const slot of this.slots) {
        if (slot.isEmpty) {
          remaining = slot.add(itemType, remaining);
          if (remaining === 0) break;
        }
      }
    }

    this.notify();
    // Return true if we managed to add everything
    return remaining === 0;
  }

  public removeItem(itemType: ItemType, quantity: number): boolean {
    if (!this.hasItem(itemType, quantity)) return false;

    let remaining = quantity;

    // Remove from slots (starting from end or beginning, let's just do sequential)
    // To be cleaner, we remove from the smallest stacks first, but sequential is fine for prototype.
    for (const slot of this.slots) {
      if (slot.itemType === itemType) {
        const removed = slot.remove(remaining);
        remaining -= removed;
        if (remaining === 0) break;
      }
    }

    this.notify();
    return true;
  }

  public getItemCount(itemType: ItemType): number {
    return this.slots
      .filter(s => s.itemType === itemType)
      .reduce((sum, s) => sum + s.quantity, 0);
  }

  public hasItem(itemType: ItemType, quantity: number): boolean {
    return this.getItemCount(itemType) >= quantity;
  }

  public clear() {
    this.slots.forEach(s => s.clear());
    this.notify();
  }
}
