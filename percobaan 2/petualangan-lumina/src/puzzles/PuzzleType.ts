export const PuzzleType = {
  MaterialCounting: "MaterialCounting",
  Pattern: "Pattern",
  LogicSequence: "LogicSequence"
} as const;
export type PuzzleType = typeof PuzzleType[keyof typeof PuzzleType];
