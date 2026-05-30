import { gameConfig } from '../config/gameConfig';

export class TouchOverlay {
  private overlayElement: HTMLElement;
  private notificationElement: HTMLElement | null = null;
  private notificationTimeout: number | null = null;

  constructor() {
    this.overlayElement = document.createElement('div');
    this.overlayElement.id = 'ui-overlay';
    this.buildUI();
    document.body.appendChild(this.overlayElement);
    
    this.notificationElement = document.getElementById('notification-toast');
  }

  private buildUI() {
    this.overlayElement.innerHTML = `
      <div class="top-hud">
        <div class="title-container">
          <div class="title">Petualangan Lumina</div>
          <div class="subtitle">Voxel Adventure Prototype</div>
        </div>
        ${gameConfig.ui.showDebugPanel ? `
        <div class="debug-panel">
          <div id="debug-info">FPS: -- | Size: --</div>
          <div id="target-block-info">Looking at: None</div>
          <div id="selected-item-info">Item: None</div>
        </div>
        ` : ''}
      </div>

      <!-- Feedback Toast -->
      <div id="notification-toast" class="notification-toast hidden"></div>

      <!-- FPS Crosshair -->
      <div class="crosshair"></div>
      <div id="mining-progress-container" class="mining-progress-container hidden">
        <div id="mining-progress-bar" class="mining-progress-bar"></div>
      </div>

      <div class="left-hud" style="pointer-events: none;">
        <div class="controls-hint">
          <b>Move:</b> Joy / WASD<br>
          <b>Look:</b> Drag right side<br>
          <b>Mine:</b> Hold LClick / Mine btn<br>
          <b>Place:</b> Tap / RClick<br>
          <b>Craft:</b> C / Craft btn
        </div>
      </div>
      
      <!-- Action Buttons Cluster (Bottom Right) -->
      <div class="action-cluster">
        <div class="action-row">
          <button id="action-mine" class="action-btn">Mine</button>
          <button id="action-place" class="action-btn">Place</button>
        </div>
        <div class="action-row">
          <button id="action-interact" class="action-btn">Interact</button>
          <button id="crafting-toggle-btn" class="action-btn craft-action-btn">Craft</button>
        </div>
      </div>

      <!-- Crafting Panel -->
      <div id="crafting-panel" class="crafting-panel hidden">
        <div class="crafting-header">
          <h2>Crafting</h2>
          <button id="crafting-close-btn" class="close-btn">X</button>
        </div>
        <div id="crafting-recipe-list" class="crafting-recipe-list">
          <!-- Filled by CraftingUI -->
        </div>
      </div>

      <!-- Virtual Joystick Base & Knob -->
      <div id="joystick-base" class="joystick-zone">
        <div id="joystick-knob" class="joystick-knob"></div>
      </div>

      <div class="bottom-hud">
        <div class="hotbar" id="hotbar-container">
          <!-- Filled by HotbarUI -->
        </div>
      </div>
    `;
  }

  public updateDebugInfo(fps: string, width: number, height: number) {
    const debugEl = document.getElementById('debug-info');
    if (debugEl) {
      debugEl.innerText = `FPS: ${fps} | Size: ${width}x${height}`;
    }
  }

  public updateTargetInfo(blockName: string) {
    const el = document.getElementById('target-block-info');
    if (el) el.innerText = `Looking at: ${blockName}`;
  }

  public updateSelectedInfo(itemName: string) {
    const el = document.getElementById('selected-item-info');
    if (el) el.innerText = `Item: ${itemName}`;
  }

  public updateMiningProgress(progress: number) {
    const container = document.getElementById('mining-progress-container');
    const bar = document.getElementById('mining-progress-bar');
    if (container && bar) {
      if (progress > 0 && progress < 1.0) {
        container.classList.remove('hidden');
        bar.style.width = `${progress * 100}%`;
      } else {
        container.classList.add('hidden');
        bar.style.width = '0%';
      }
    }
  }

  public showNotification(message: string) {
    if (!this.notificationElement) return;
    
    this.notificationElement.innerText = message;
    this.notificationElement.classList.remove('hidden');
    this.notificationElement.classList.add('visible');

    if (this.notificationTimeout) {
      clearTimeout(this.notificationTimeout);
    }

    this.notificationTimeout = window.setTimeout(() => {
      this.notificationElement?.classList.remove('visible');
      this.notificationElement?.classList.add('hidden');
    }, 2000); // Hide after 2 seconds
  }
}
