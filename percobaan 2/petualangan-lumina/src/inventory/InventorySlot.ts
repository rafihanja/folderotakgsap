import { ItemType } from '../items/ItemType';
import { ITEM_DEFINITIONS } from '../items/itemDefinitions';

export type InventorySlotData = {
  itemType: ItemType | null;
  quantity: number;
};

export class InventorySlot {
  private _itemType: ItemType | null = null;
  private _quantity: number = 0;

  public get itemType(): ItemType | null { return this._itemType; }
  public get quantity(): number { return this._quantity; }

  public get isEmpty(): boolean {
    return this._itemType === null || this._quantity <= 0;
  }

  public get maxStackSize(): number {
    if (!this._itemType) return 0;
    return ITEM_DEFINITIONS[this._itemType].maxStackSize;
  }

  public get isFull(): boolean {
    return !this.isEmpty && this._quantity >= this.maxStackSize;
  }

  public get availableSpace(): number {
    if (this.isEmpty) return 99; // Assume default max stack for empty slot, handled by logic
    return this.maxStackSize - this._quantity;
  }

  public canStack(type: ItemType): boolean {
    return this.isEmpty || (this._itemType === type && !this.isFull);
  }

  public add(type: ItemType, amount: number): number {
    if (!this.isEmpty && this._itemType !== type) return amount; // Cannot add

    if (this.isEmpty) {
      this._itemType = type;
      this._quantity = 0;
    }

    const space = this.maxStackSize - this._quantity;
    const amountToAdd = Math.min(space, amount);
    this._quantity += amountToAdd;

    return amount - amountToAdd; // Return remainder
  }

  public remove(amount: number): number {
    if (this.isEmpty) return 0;

    const amountToRemove = Math.min(this._quantity, amount);
    this._quantity -= amountToRemove;

    if (this._quantity <= 0) {
      this.clear();
    }

    return amountToRemove; // Return amount actually removed
  }

  public clear() {
    this._itemType = null;
    this._quantity = 0;
  }

  public toData(): InventorySlotData {
    return {
      itemType: this._itemType,
      quantity: this._quantity
    };
  }
}
