import type { CraftResult } from './RecipeData';

export class CraftingEvents {
  private updateListeners: (() => void)[] = [];
  private craftListeners: ((result: CraftResult) => void)[] = [];

  public subscribeUpdate(callback: () => void) {
    this.updateListeners.push(callback);
  }

  public emitUpdate() {
    this.updateListeners.forEach(cb => cb());
  }

  public subscribeCraft(callback: (result: CraftResult) => void) {
    this.craftListeners.push(callback);
  }

  public emitCraft(result: CraftResult) {
    this.craftListeners.forEach(cb => cb(result));
  }
}
