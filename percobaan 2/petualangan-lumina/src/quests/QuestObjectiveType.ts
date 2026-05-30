export const QuestObjectiveType = {
  TalkToNPC: "TalkToNPC",
  CollectItem: "CollectItem",
  CraftItem: "CraftItem",
  PlaceBlock: "PlaceBlock",
  SolvePuzzle: "SolvePuzzle"
} as const;
export type QuestObjectiveType = typeof QuestObjectiveType[keyof typeof QuestObjectiveType];
