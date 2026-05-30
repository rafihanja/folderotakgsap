import { ItemType } from '../items/ItemType';

export interface QuestReward {
  type: 'item' | 'unlock_area' | 'bimo_message';
  itemType?: ItemType;
  quantity?: number;
  message?: string;
  areaId?: string;
}
