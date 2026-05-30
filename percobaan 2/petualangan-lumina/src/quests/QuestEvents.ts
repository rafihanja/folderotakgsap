export class QuestEvents {
  private updateListeners: Set<() => void> = new Set();
  private areaUnlockListeners: Set<(areaId: string) => void> = new Set();

  public subscribe(callback: () => void) {
    this.updateListeners.add(callback);
    return () => this.updateListeners.delete(callback);
  }

  public subscribeAreaUnlock(callback: (areaId: string) => void) {
    this.areaUnlockListeners.add(callback);
    return () => this.areaUnlockListeners.delete(callback);
  }

  public emitUpdate() {
    this.updateListeners.forEach(cb => cb());
  }

  public emitAreaUnlock(areaId: string) {
    this.areaUnlockListeners.forEach(cb => cb(areaId));
  }
}

