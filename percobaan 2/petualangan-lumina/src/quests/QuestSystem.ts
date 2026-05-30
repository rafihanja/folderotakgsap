import type { QuestDefinition, QuestProgressPayload } from './QuestData';
import { QuestStatus } from './QuestStatus';
import { QUEST_DEFINITIONS } from './QuestDefinitions';
import { QuestEvents } from './QuestEvents';
import { Inventory } from '../inventory/Inventory';
import { UIManager } from '../ui/UIManager';

export class QuestSystem {
  public activeQuests: Map<string, QuestDefinition> = new Map();
  public completedQuests: Set<string> = new Set();
  public events = new QuestEvents();

  private inventory: Inventory;
  private uiManager: UIManager;

  constructor(inventory: Inventory, uiManager: UIManager) {
    this.inventory = inventory;
    this.uiManager = uiManager;
  }

  public startQuest(questId: string) {
    if (this.activeQuests.has(questId) || this.completedQuests.has(questId)) {
      return;
    }

    const questDef = QUEST_DEFINITIONS[questId];
    if (questDef) {
      // Deep copy so we can modify currentCount
      const newQuest = JSON.parse(JSON.stringify(questDef)) as QuestDefinition;
      this.activeQuests.set(questId, newQuest);
      this.uiManager.showNotification(`Quest Started: ${newQuest.title}`);
      this.events.emitUpdate();
    }
  }

  public getActiveQuests(): QuestDefinition[] {
    return Array.from(this.activeQuests.values());
  }

  public updateObjectiveProgress(payload: QuestProgressPayload) {
    let questUpdated = false;

    for (const [questId, quest] of this.activeQuests) {
      for (const objective of quest.objectives) {
        if (objective.type === payload.type && objective.targetId === payload.targetId) {
          if (objective.currentCount < objective.requiredCount) {
            objective.currentCount += (payload.amount || 1);
            if (objective.currentCount > objective.requiredCount) {
              objective.currentCount = objective.requiredCount;
            }
            questUpdated = true;
          }
        }
      }

      if (this.isQuestReadyToComplete(quest)) {
        this.completeQuest(questId);
        questUpdated = true;
      }
    }

    if (questUpdated) {
      this.events.emitUpdate();
    }
  }

  private isQuestReadyToComplete(quest: QuestDefinition): boolean {
    return quest.objectives.every(obj => obj.currentCount >= obj.requiredCount);
  }

  private completeQuest(questId: string) {
    const quest = this.activeQuests.get(questId);
    if (!quest) return;

    this.activeQuests.delete(questId);
    this.completedQuests.add(questId);

    this.uiManager.showNotification(`Quest Completed: ${quest.title}`);

    // Grant Rewards
    for (const reward of quest.rewards) {
      if (reward.type === 'item' && reward.itemType && reward.quantity) {
        this.inventory.addItem(reward.itemType, reward.quantity);
        this.uiManager.showNotification(`Reward: Got items!`);
      } else if (reward.type === 'bimo_message' && reward.message) {
        this.uiManager.bimoMessageUI?.showMessage(reward.message);
      } else if (reward.type === 'unlock_area') {
        this.events.emitAreaUnlock(reward.areaId!);
      }
    }

    // Auto-start next quest
    if (quest.nextQuestId) {
      setTimeout(() => {
        this.startQuest(quest.nextQuestId!);
      }, 2000);
    }
  }
}
