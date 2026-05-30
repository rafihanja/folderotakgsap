import { ItemType } from '../items/ItemType';
import { RecipeType } from './RecipeType';

export type RecipeIngredient = {
  itemType: ItemType;
  quantity: number;
};

export type RecipeOutput = {
  itemType: ItemType;
  quantity: number;
};

export type CraftingRecipe = {
  type: RecipeType;
  displayName: string;
  description: string;
  category: "building" | "decoration" | "utility";
  ingredients: RecipeIngredient[];
  output: RecipeOutput;
  unlocked: boolean;
  hint?: string;
};

export type CraftResult =
  | {
      success: true;
      recipeType: RecipeType;
      outputItem: ItemType;
      outputQuantity: number;
      message: string;
    }
  | {
      success: false;
      recipeType: RecipeType;
      reason: "locked" | "missing_ingredients" | "inventory_full" | "unknown_recipe";
      message: string;
    };
