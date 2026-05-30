import type { BlockType } from '../voxel/BlockType';
import type { ItemType } from './ItemType';

export interface ItemDefinition {
  type: ItemType;
  displayName: string;
  description: string;
  maxStackSize: number;
  icon: string;
  placeable: boolean;
  relatedBlockType?: BlockType;
}
