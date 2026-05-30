import type { PuzzleResult } from './PuzzleResult';

export class PuzzleEvents {
  private listeners: Set<(result: PuzzleResult) => void> = new Set();

  public subscribe(callback: (result: PuzzleResult) => void) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  public emitResult(result: PuzzleResult) {
    this.listeners.forEach(cb => cb(result));
  }
}
