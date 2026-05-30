import { BlockType } from './BlockType';
import { ItemType } from '../items/ItemType';

export type ItemStack = {
  type: ItemType;
  quantity: number;
};

export const BlockDrops = {
  getDropsForBlock(blockType: BlockType): ItemStack[] {
    switch (blockType) {
      case BlockType.Grass:
        return [{ type: ItemType.GrassBlock, quantity: 1 }];
      case BlockType.Dirt:
        return [{ type: ItemType.DirtBlock, quantity: 1 }];
      case BlockType.Stone:
        return [{ type: ItemType.StoneBlock, quantity: 1 }];
      case BlockType.Wood:
        return [{ type: ItemType.WoodBlock, quantity: 1 }];
      case BlockType.Crystal:
        return [{ type: ItemType.CrystalShard, quantity: 1 }];
      case BlockType.Bridge:
        return [{ type: ItemType.BridgeBlock, quantity: 1 }];
      case BlockType.Air:
      default:
        return [];
    }
  }
};
