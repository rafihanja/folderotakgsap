export class InputManager {
  public state = {
    // Joystick / Keyboard Movement (-1 to +1)
    moveX: 0,
    moveY: 0,
    
    // Camera Swipe Deltas
    cameraDeltaX: 0,
    cameraDeltaY: 0,

    // Raycaster Support (NDC coordinates for mouse pointing)
    ndcX: 0,
    ndcY: 0,
    
    // Action tracking
    _leftClick: false,
    _rightClick: false,
    isMiningHeld: false,
    _keys: new Set<string>(),

    consumeLeftClick: () => {
      if (this.state._leftClick) {
        this.state._leftClick = false;
        return true;
      }
      return false;
    },

    consumeRightClick: () => {
      if (this.state._rightClick) {
        this.state._rightClick = false;
        return true;
      }
      return false;
    },

    consumeKey: (key: string) => {
      if (this.state._keys.has(key)) {
        this.state._keys.delete(key);
        return true;
      }
      return false;
    },

    // Hotbar selection
    _hotbarKey: null as number | null,

    consumeHotbarKey: () => {
      if (this.state._hotbarKey !== null) {
        const key = this.state._hotbarKey;
        this.state._hotbarKey = null;
        return key;
      }
      return null;
    },

    _craftingToggle: false,
    consumeCraftingToggle: () => {
      if (this.state._craftingToggle) {
        this.state._craftingToggle = false;
        return true;
      }
      return false;
    },

    _interactToggle: false,
    consumeInteract: () => {
      if (this.state._interactToggle) {
        this.state._interactToggle = false;
        return true;
      }
      return false;
    },

    _advanceDialogueToggle: false,
    consumeAdvanceDialogue: () => {
      if (this.state._advanceDialogueToggle) {
        this.state._advanceDialogueToggle = false;
        return true;
      }
      return false;
    },

    _closeDialogueToggle: false,
    consumeCloseDialogue: () => {
      if (this.state._closeDialogueToggle) {
        this.state._closeDialogueToggle = false;
        return true;
      }
      return false;
    }
  };

  // Internal state for pointers
  private activePointers = new Map<number, {
    startX: number;
    startY: number;
    lastX: number;
    lastY: number;
    type: 'joystick' | 'camera' | 'none';
  }>();

  // Joystick boundaries (in pixels)
  private joystickCenter = { x: 80, y: window.innerHeight - 80 };
  private joystickRadius = 60;
  private joystickElement: HTMLElement | null = null;
  private knobElement: HTMLElement | null = null;

  constructor() {
    this.setupKeyboard();
    this.setupPointers();
    this.setupContextMenu();
  }

  private setupKeyboard() {
    window.addEventListener('keydown', (e) => {
      this.state._keys.add(e.key.toLowerCase());
      
      // Check for hotbar keys (1-5)
      const num = parseInt(e.key);
      if (num >= 1 && num <= 5) {
        this.state._hotbarKey = num - 1; // 0-indexed
      }

      // Check for crafting toggle
      if (e.key.toLowerCase() === 'c') {
        this.state._craftingToggle = true;
      }
      
      // Check for interact
      if (e.key.toLowerCase() === 'e') {
        this.state._interactToggle = true;
      }

      // Check for advance dialogue
      if (e.key.toLowerCase() === ' ' || e.key.toLowerCase() === 'enter') {
        this.state._advanceDialogueToggle = true;
      }

      // Check for close dialogue
      if (e.key.toLowerCase() === 'escape') {
        this.state._closeDialogueToggle = true;
      }

      this.updateMovementFromKeys();
    });
    window.addEventListener('keyup', (e) => {
      this.state._keys.delete(e.key.toLowerCase());
      this.updateMovementFromKeys();
    });
  }

  private updateMovementFromKeys() {
    // WASD or Arrows
    let x = 0;
    let y = 0;

    if (this.state._keys.has('w') || this.state._keys.has('arrowup')) y += 1;
    if (this.state._keys.has('s') || this.state._keys.has('arrowdown')) y -= 1;
    if (this.state._keys.has('a') || this.state._keys.has('arrowleft')) x -= 1;
    if (this.state._keys.has('d') || this.state._keys.has('arrowright')) x += 1;

    // Normalize length if moving diagonally so speed is consistent
    if (x !== 0 && y !== 0) {
      const length = Math.sqrt(x * x + y * y);
      x /= length;
      y /= length;
    }

    this.state.moveX = x;
    this.state.moveY = y;
  }

  private bindJoystickDOM() {
    if (!this.joystickElement) {
      this.joystickElement = document.getElementById('joystick-base');
      this.knobElement = document.getElementById('joystick-knob');
      
      if (this.joystickElement) {
        const rect = this.joystickElement.getBoundingClientRect();
        this.joystickCenter = {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2
        };
        this.joystickRadius = rect.width / 2;
      }
    }
  }

  private setupPointers() {
    window.addEventListener('resize', () => {
      this.joystickElement = null; // Force rebind on next touch
    });

    window.addEventListener('pointerdown', (e) => {
      this.bindJoystickDOM();
      this.state.ndcX = (e.clientX / window.innerWidth) * 2 - 1;
      this.state.ndcY = -(e.clientY / window.innerHeight) * 2 + 1;

      let type: 'joystick' | 'camera' | 'none' = 'none';

      if (e.clientX < window.innerWidth / 2) {
        type = 'joystick';
        this.updateJoystick(e.clientX, e.clientY);
      } else {
        type = 'camera';
        // Track mining hold if it's the left mouse button (0) on desktop, or touch on the right side if not specifically placed.
        // Actually, we'll let mobile rely on the UI mine button for mining.
        // Desktop left click:
        if (e.button === 0 && e.pointerType === 'mouse') {
          this.state.isMiningHeld = true;
        }
      }

      this.activePointers.set(e.pointerId, {
        startX: e.clientX,
        startY: e.clientY,
        lastX: e.clientX,
        lastY: e.clientY,
        type
      });
    });

    window.addEventListener('pointermove', (e) => {
      this.state.ndcX = (e.clientX / window.innerWidth) * 2 - 1;
      this.state.ndcY = -(e.clientY / window.innerHeight) * 2 + 1;

      const pointer = this.activePointers.get(e.pointerId);
      if (pointer) {
        if (pointer.type === 'camera') {
          this.state.cameraDeltaX += (e.clientX - pointer.lastX);
          this.state.cameraDeltaY += (e.clientY - pointer.lastY);
        } else if (pointer.type === 'joystick') {
          this.updateJoystick(e.clientX, e.clientY);
        }
        pointer.lastX = e.clientX;
        pointer.lastY = e.clientY;
      }
    });

    const handlePointerUp = (e: PointerEvent) => {
      if (e.button === 0 && e.pointerType === 'mouse') {
        this.state.isMiningHeld = false;
      }

      const pointer = this.activePointers.get(e.pointerId);
      if (pointer) {
        const dist = Math.hypot(e.clientX - pointer.startX, e.clientY - pointer.startY);
        if (dist < 10) {
          if (e.button === 0 || e.pointerType === 'touch') {
            this.state._leftClick = true;
          }
          if (e.button === 2) {
            this.state._rightClick = true;
          }
        }

        if (pointer.type === 'joystick') {
          this.resetJoystick();
        }
        this.activePointers.delete(e.pointerId);
      }
    };

    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', (e) => {
      handlePointerUp(e);
      if (e.pointerType === 'mouse') {
        this.state.isMiningHeld = false;
      }
    });
  }

  private updateJoystick(clientX: number, clientY: number) {
    let dx = clientX - this.joystickCenter.x;
    let dy = clientY - this.joystickCenter.y;
    const distance = Math.hypot(dx, dy);

    if (distance > this.joystickRadius) {
      dx = (dx / distance) * this.joystickRadius;
      dy = (dy / distance) * this.joystickRadius;
    }

    if (this.knobElement) {
      this.knobElement.style.transform = `translate(${dx}px, ${dy}px)`;
    }

    this.state.moveX = dx / this.joystickRadius;
    this.state.moveY = -(dy / this.joystickRadius);
  }

  private resetJoystick() {
    if (this.knobElement) {
      this.knobElement.style.transform = `translate(0px, 0px)`;
    }
    if (this.state._keys.size === 0) {
      this.state.moveX = 0;
      this.state.moveY = 0;
    } else {
      this.updateMovementFromKeys();
    }
  }

  public consumeCameraDeltas(): { x: number, y: number } {
    const res = { x: this.state.cameraDeltaX, y: this.state.cameraDeltaY };
    this.state.cameraDeltaX = 0;
    this.state.cameraDeltaY = 0;
    return res;
  }

  private setupContextMenu() {
    window.addEventListener('contextmenu', (e) => {
      e.preventDefault();
    });
  }

  public bindUIActionButtons() {
    const btnMine = document.getElementById('action-mine');
    if (btnMine) {
      btnMine.addEventListener('pointerdown', (e) => {
        e.stopPropagation();
        this.state.isMiningHeld = true;
      });
      btnMine.addEventListener('pointerup', (e) => {
        e.stopPropagation();
        this.state.isMiningHeld = false;
      });
      btnMine.addEventListener('pointercancel', (e) => {
        e.stopPropagation();
        this.state.isMiningHeld = false;
      });
      btnMine.addEventListener('pointerleave', (e) => {
        e.stopPropagation();
        this.state.isMiningHeld = false;
      });
    }

    const btnPlace = document.getElementById('action-place');
    if (btnPlace) {
      btnPlace.addEventListener('pointerdown', (e) => {
        e.stopPropagation();
        this.state._rightClick = true;
      });
    }
    
    const btnInteract = document.getElementById('action-interact');
    if (btnInteract) {
      btnInteract.addEventListener('pointerdown', (e) => {
        e.stopPropagation();
        this.state._interactToggle = true;
      });
    }
  }
}
