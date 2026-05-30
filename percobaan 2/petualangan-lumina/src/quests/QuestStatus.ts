export const QuestStatus = {
  NotStarted: "NotStarted",
  Active: "Active",
  ReadyToComplete: "ReadyToComplete",
  Completed: "Completed"
} as const;
export type QuestStatus = typeof QuestStatus[keyof typeof QuestStatus];
