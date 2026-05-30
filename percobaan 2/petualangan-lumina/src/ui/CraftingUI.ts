import { CraftingSystem } from '../crafting/CraftingSystem';
import { ITEM_DEFINITIONS } from '../items/itemDefinitions';
import { UIManager } from './UIManager';
import { RecipeType } from '../crafting/RecipeType';

export class CraftingUI {
  private craftingSystem: CraftingSystem;
  private uiManager: UIManager;
  private panelElement: HTMLElement | null = null;
  private isOpen: boolean = false;

  constructor(craftingSystem: CraftingSystem, uiManager: UIManager) {
    this.craftingSystem = craftingSystem;
    this.uiManager = uiManager;

    setTimeout(() => {
      this.initDOM();
      
      this.craftingSystem.events.subscribeUpdate(() => {
        if (this.isOpen) {
          this.renderRecipes();
        }
      });
    }, 0);
  }

  private initDOM() {
    this.panelElement = document.getElementById('crafting-panel');
    const toggleBtn = document.getElementById('crafting-toggle-btn');
    const closeBtn = document.getElementById('crafting-close-btn');

    if (!this.panelElement) return;

    // Prevent passing clicks to 3D world
    this.panelElement.addEventListener('pointerdown', e => e.stopPropagation());
    this.panelElement.addEventListener('pointerup', e => e.stopPropagation());
    this.panelElement.addEventListener('contextmenu', e => {
      e.preventDefault();
      e.stopPropagation();
    });

    if (toggleBtn) {
      toggleBtn.addEventListener('pointerdown', e => {
        e.stopPropagation();
        this.togglePanel();
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener('pointerdown', e => {
        e.stopPropagation();
        this.closePanel();
      });
    }

    this.renderRecipes();
  }

  public togglePanel() {
    if (this.isOpen) {
      this.closePanel();
    } else {
      this.openPanel();
    }
  }

  public openPanel() {
    this.isOpen = true;
    if (this.panelElement) {
      this.panelElement.classList.remove('hidden');
      this.renderRecipes();
    }
  }

  public closePanel() {
    this.isOpen = false;
    if (this.panelElement) {
      this.panelElement.classList.add('hidden');
    }
  }

  private renderRecipes() {
    const listElement = document.getElementById('crafting-recipe-list');
    if (!listElement) return;

    listElement.innerHTML = '';
    const recipes = this.craftingSystem.getUnlockedRecipes();

    for (const recipe of recipes) {
      const card = document.createElement('div');
      card.className = 'recipe-card';

      const outDef = ITEM_DEFINITIONS[recipe.output.itemType];
      const canCraft = this.craftingSystem.canCraft(recipe.type);

      let ingredientsHTML = '';
      for (const ing of recipe.ingredients) {
        const ingDef = ITEM_DEFINITIONS[ing.itemType];
        ingredientsHTML += `<span>${ingDef.icon} ${ingDef.displayName} x${ing.quantity}</span><br>`;
      }

      card.innerHTML = `
        <div class="recipe-header">
          <div class="recipe-icon">${outDef.icon}</div>
          <div class="recipe-title">
            <strong>${recipe.displayName}</strong><br>
            <small>${recipe.description}</small>
          </div>
        </div>
        <div class="recipe-details">
          <div class="recipe-ingredients">
            <strong>Needs:</strong><br>
            ${ingredientsHTML}
          </div>
          <div class="recipe-output">
            <strong>Creates:</strong> ${outDef.icon} x${recipe.output.quantity}
          </div>
        </div>
        <button class="craft-btn ${canCraft ? '' : 'disabled'}" data-recipe="${recipe.type}">
          ${canCraft ? 'Craft' : 'Missing Items'}
        </button>
      `;

      listElement.appendChild(card);

      // Bind craft button
      const btn = card.querySelector('.craft-btn') as HTMLButtonElement;
      btn.addEventListener('pointerdown', (e) => {
        e.stopPropagation();
        if (canCraft) {
          this.handleCraft(recipe.type);
        } else {
          this.uiManager.showNotification("Not enough items");
        }
      });
    }
  }

  private handleCraft(recipeType: RecipeType) {
    const result = this.craftingSystem.craft(recipeType);
    this.uiManager.showNotification(result.message);
    
    // Automatically re-render UI based on the event emitted by Inventory, 
    // but we can force it here just in case.
    this.renderRecipes();
  }
}
