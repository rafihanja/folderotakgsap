import { Hotbar } from '../inventory/Hotbar';
import { Inventory } from '../inventory/Inventory';
import { ITEM_DEFINITIONS } from '../items/itemDefinitions';
import { gameConfig } from '../config/gameConfig';

export class HotbarUI {
  private hotbar: Hotbar;
  private inventory: Inventory;
  private container: HTMLElement | null = null;
  private slotElements: HTMLElement[] = [];

  constructor(inventory: Inventory, hotbar: Hotbar) {
    this.inventory = inventory;
    this.hotbar = hotbar;

    // Wait a tick for DOM to be ready from TouchOverlay
    setTimeout(() => {
      this.initDOM();
      
      // Subscribe to updates
      this.inventory.events.subscribe(() => this.render());
      this.hotbar.subscribeSelection(() => this.render());
      
      this.render();
    }, 0);
  }

  private initDOM() {
    this.container = document.getElementById('hotbar-container');
    if (!this.container) return;

    this.container.innerHTML = '';
    
    // Prevent dragging or clicking UI from hitting the canvas
    this.container.addEventListener('pointerdown', (e) => e.stopPropagation());
    this.container.addEventListener('pointerup', (e) => e.stopPropagation());
    this.container.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      e.stopPropagation();
    });

    for (let i = 0; i < gameConfig.inventory.hotbarSlotCount; i++) {
      const slotEl = document.createElement('div');
      slotEl.className = 'hotbar-slot';
      
      // Click to select
      slotEl.addEventListener('pointerdown', () => {
        this.hotbar.setSelectedIndex(i);
      });

      this.container.appendChild(slotEl);
      this.slotElements.push(slotEl);
    }
  }

  private render() {
    if (!this.container || this.slotElements.length === 0) return;

    const slotsData = this.inventory.getSlotsData();
    const selectedIndex = this.hotbar.getSelectedIndex();

    for (let i = 0; i < gameConfig.inventory.hotbarSlotCount; i++) {
      const slotEl = this.slotElements[i];
      const data = slotsData[i];

      // Update Selection
      if (i === selectedIndex) {
        slotEl.classList.add('active');
      } else {
        slotEl.classList.remove('active');
      }

      // Update Item Content
      if (data && data.itemType && data.quantity > 0) {
        const def = ITEM_DEFINITIONS[data.itemType];
        slotEl.innerHTML = `
          <div class="hotbar-icon">${def.icon}</div>
          <div class="hotbar-qty">${data.quantity}</div>
        `;
      } else {
        slotEl.innerHTML = ''; // Empty
      }
    }
  }
}
