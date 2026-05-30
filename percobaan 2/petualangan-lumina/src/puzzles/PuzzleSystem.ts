import type { PuzzleDefinition } from './PuzzleData';
import { PUZZLE_DEFINITIONS } from './PuzzleDefinitions';
import { PuzzleEvents } from './PuzzleEvents';

export class PuzzleSystem {
  public events = new PuzzleEvents();

  public getPuzzle(puzzleId: string): PuzzleDefinition | undefined {
    return PUZZLE_DEFINITIONS[puzzleId];
  }

  public submitAnswer(puzzleId: string, choiceId: string): boolean {
    const puzzle = PUZZLE_DEFINITIONS[puzzleId];
    if (!puzzle) return false;

    const choice = puzzle.choices.find(c => c.id === choiceId);
    if (!choice) return false;

    if (choice.isCorrect) {
      this.events.emitResult({ success: true, puzzleId });
      return true;
    } else {
      this.events.emitResult({ success: false, puzzleId });
      return false;
    }
  }
}
