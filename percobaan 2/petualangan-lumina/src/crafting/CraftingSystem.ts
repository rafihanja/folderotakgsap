import { Inventory } from '../inventory/Inventory';
import { RecipeType } from './RecipeType';
import type { CraftingRecipe, RecipeIngredient, CraftResult } from './RecipeData';
import { RECIPE_DEFINITIONS } from './recipeDefinitions';
import { CraftingEvents } from './CraftingEvents';
import { gameConfig } from '../config/gameConfig';
import { ITEM_DEFINITIONS } from '../items/itemDefinitions';

export class CraftingSystem {
  private inventory: Inventory;
  public events = new CraftingEvents();

  constructor(inventory: Inventory) {
    this.inventory = inventory;
    
    // Listen to inventory changes so we can notify UI to re-check craftability
    this.inventory.events.subscribe(() => {
      this.events.emitUpdate();
    });
  }

  public getRecipes(): CraftingRecipe[] {
    return Object.values(RECIPE_DEFINITIONS);
  }

  public getUnlockedRecipes(): CraftingRecipe[] {
    const all = this.getRecipes();
    if (gameConfig.crafting.showLockedRecipes) {
      return all;
    }
    return all.filter(r => r.unlocked);
  }

  public canCraft(recipeType: RecipeType): boolean {
    const missing = this.getMissingIngredients(recipeType);
    return missing.length === 0;
  }

  public getMissingIngredients(recipeType: RecipeType): RecipeIngredient[] {
    const recipe = RECIPE_DEFINITIONS[recipeType];
    if (!recipe) return [];

    const missing: RecipeIngredient[] = [];
    for (const ing of recipe.ingredients) {
      if (!this.inventory.hasItem(ing.itemType, ing.quantity)) {
        const has = this.inventory.getItemCount(ing.itemType);
        missing.push({
          itemType: ing.itemType,
          quantity: ing.quantity - has
        });
      }
    }

    return missing;
  }

  public craft(recipeType: RecipeType): CraftResult {
    const recipe = RECIPE_DEFINITIONS[recipeType];
    if (!recipe) {
      return { success: false, recipeType, reason: "unknown_recipe", message: "Unknown recipe" };
    }

    if (!recipe.unlocked) {
      return { success: false, recipeType, reason: "locked", message: "Recipe is locked" };
    }

    const missing = this.getMissingIngredients(recipeType);
    if (missing.length > 0) {
      return { success: false, recipeType, reason: "missing_ingredients", message: "Missing ingredients" };
    }

    // Check if output can fit BEFORE consuming ingredients
    if (!this.inventory.canAddItem(recipe.output.itemType, recipe.output.quantity)) {
      return { success: false, recipeType, reason: "inventory_full", message: "Inventory full" };
    }

    // 1. Consume ingredients
    for (const ing of recipe.ingredients) {
      this.inventory.removeItem(ing.itemType, ing.quantity);
    }

    // 2. Add output
    this.inventory.addItem(recipe.output.itemType, recipe.output.quantity);

    const outDef = ITEM_DEFINITIONS[recipe.output.itemType];
    const result: CraftResult = {
      success: true,
      recipeType,
      outputItem: recipe.output.itemType,
      outputQuantity: recipe.output.quantity,
      message: `Crafted ${outDef.displayName} x${recipe.output.quantity}`
    };

    this.events.emitCraft(result);
    return result;
  }
}
