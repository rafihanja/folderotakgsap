import { ItemType } from './ItemType';
import type { ItemDefinition } from './ItemData';
import { BlockType } from '../voxel/BlockType';

export const ITEM_DEFINITIONS: Record<ItemType, ItemDefinition> = {
  [ItemType.GrassBlock]: {
    type: ItemType.GrassBlock,
    displayName: "Grass Block",
    description: "A soft block from Lumina's ground.",
    maxStackSize: 99,
    icon: "🟩",
    placeable: true,
    relatedBlockType: BlockType.Grass
  },
  [ItemType.DirtBlock]: {
    type: ItemType.DirtBlock,
    displayName: "Dirt Block",
    description: "A basic earth block.",
    maxStackSize: 99,
    icon: "🟫",
    placeable: true,
    relatedBlockType: BlockType.Dirt
  },
  [ItemType.StoneBlock]: {
    type: ItemType.StoneBlock,
    displayName: "Stone Block",
    description: "A strong stone block.",
    maxStackSize: 99,
    icon: "⬜",
    placeable: true,
    relatedBlockType: BlockType.Stone
  },
  [ItemType.WoodBlock]: {
    type: ItemType.WoodBlock,
    displayName: "Wood Block",
    description: "A warm wooden block for building.",
    maxStackSize: 99,
    icon: "🪵",
    placeable: true,
    relatedBlockType: BlockType.Wood
  },
  [ItemType.CrystalShard]: {
    type: ItemType.CrystalShard,
    displayName: "Crystal Shard",
    description: "A glowing piece of Lumina energy.",
    maxStackSize: 99,
    icon: "💎",
    placeable: false
  },
  [ItemType.BridgeBlock]: {
    type: ItemType.BridgeBlock,
    displayName: "Bridge Block",
    description: "A sturdy crafted block used to repair broken paths.",
    icon: "🌉",
    maxStackSize: 99,
    placeable: true,
    relatedBlockType: BlockType.Stone // Fallback to stone for now, or bridge if added
  },
  [ItemType.WoodPlatform]: {
    type: ItemType.WoodPlatform,
    displayName: "Wood Platform",
    description: "A simple wooden platform for building small paths.",
    icon: "🪵",
    maxStackSize: 99,
    placeable: true,
    relatedBlockType: BlockType.Wood
  },
  [ItemType.CrystalLamp]: {
    type: ItemType.CrystalLamp,
    displayName: "Crystal Lamp",
    description: "A glowing decoration powered by Lumina crystal energy.",
    icon: "💡",
    maxStackSize: 99,
    placeable: false
  }
};
