import type { QuestObjectiveType } from './QuestObjectiveType';
import type { QuestReward } from './QuestRewards';

export interface QuestObjective {
  id: string;
  type: QuestObjectiveType;
  description: string;
  targetId: string; // NPC id, ItemType, BlockType, or Puzzle id
  requiredCount: number;
  currentCount: number;
}

export interface QuestDefinition {
  id: string;
  title: string;
  description: string;
  giverNpcId: string;
  objectives: QuestObjective[];
  rewards: QuestReward[];
  nextQuestId?: string;
}

export interface QuestProgressPayload {
  type: QuestObjectiveType;
  targetId: string;
  amount?: number;
}
