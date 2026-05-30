import type { InventorySlotData } from './InventorySlot';

export type InventoryListener = (slots: InventorySlotData[]) => void;

export class InventoryEvents {
  private listeners: InventoryListener[] = [];

  public subscribe(listener: InventoryListener) {
    this.listeners.push(listener);
  }

  public unsubscribe(listener: InventoryListener) {
    this.listeners = this.listeners.filter(l => l !== listener);
  }

  public emit(slots: InventorySlotData[]) {
    this.listeners.forEach(listener => listener(slots));
  }
}
