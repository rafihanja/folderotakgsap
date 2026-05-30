import { PuzzleType } from './PuzzleType';

export interface PuzzleChoice {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface PuzzleDefinition {
  id: string;
  type: PuzzleType;
  title: string;
  question: string;
  choices: PuzzleChoice[];
  hint: string;
}
