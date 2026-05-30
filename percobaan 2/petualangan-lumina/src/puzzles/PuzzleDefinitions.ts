import type { PuzzleDefinition } from './PuzzleData';
import { PuzzleType } from './PuzzleType';

export const PUZZLE_DEFINITIONS: Record<string, PuzzleDefinition> = {
  crystal_puzzle_1: {
    id: 'crystal_puzzle_1',
    type: PuzzleType.MaterialCounting,
    title: 'The Explorer\'s Riddle',
    question: 'If you have 2 Wood and you find 3 more Wood, how many Wood do you have in total?',
    choices: [
      { id: 'c1', text: '4 Wood', isCorrect: false },
      { id: 'c2', text: '5 Wood', isCorrect: true },
      { id: 'c3', text: '6 Wood', isCorrect: false }
    ],
    hint: 'Bimo says: Try counting on your fingers! 2 plus 3 is...'
  }
};
