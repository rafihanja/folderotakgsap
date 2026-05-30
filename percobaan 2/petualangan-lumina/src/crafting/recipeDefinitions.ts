import { RecipeType } from './RecipeType';
import type { CraftingRecipe } from './RecipeData';
import { ItemType } from '../items/ItemType';

export const RECIPE_DEFINITIONS: Record<RecipeType, CraftingRecipe> = {
  [RecipeType.BridgeBlock]: {
    type: RecipeType.BridgeBlock,
    displayName: "Bridge Block",
    description: "Craft a sturdy block for repairing broken paths.",
    category: "building",
    ingredients: [
      { itemType: ItemType.WoodBlock, quantity: 2 },
      { itemType: ItemType.StoneBlock, quantity: 1 }
    ],
    output: {
      itemType: ItemType.BridgeBlock,
      quantity: 1
    },
    unlocked: true,
    hint: "Bridge Blocks help you cross gaps and repair broken paths."
  },
  [RecipeType.WoodPlatform]: {
    type: RecipeType.WoodPlatform,
    displayName: "Wood Platform",
    description: "Craft simple wooden building pieces.",
    category: "building",
    ingredients: [
      { itemType: ItemType.WoodBlock, quantity: 2 }
    ],
    output: {
      itemType: ItemType.WoodPlatform,
      quantity: 1
    },
    unlocked: true,
    hint: "Platforms are useful for simple building and path making."
  },
  [RecipeType.CrystalLamp]: {
    type: RecipeType.CrystalLamp,
    displayName: "Crystal Lamp",
    description: "Craft a small glowing Lumina decoration.",
    category: "decoration",
    ingredients: [
      { itemType: ItemType.CrystalShard, quantity: 1 },
      { itemType: ItemType.StoneBlock, quantity: 1 }
    ],
    output: {
      itemType: ItemType.CrystalLamp,
      quantity: 1
    },
    unlocked: true,
    hint: "Crystal Lamps store a little bit of Lumina's light."
  }
};
