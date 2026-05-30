# Petualangan Lumina

Petualangan Lumina is a web-first 3D voxel sandbox educational adventure game for children. It aims to combine the creative freedom of voxel games with playful learning elements, without feeling like a traditional school test.

## Current Prototype Scope

This prototype currently encompasses **Prompt 01 (Foundation)**, **Prompt 02 (Voxel World)**, **Prompt 03 (Mobile Player Control)**, **Prompt 04 (Inventory)**, **Prompt 05 (Crafting System)**, **Prompt 05.6 (Visual Polish & Rebase)**, and **Prompt 06 (NPC & Dialogue)**.

- [x] **Prompt 01 & 02:** Core Engine (Three.js, Vite, TS), Camera, Lighting, Sky, Terrain Generation.
- [x] **Prompt 03:** Character Controller (Mobile Joystick, WASD, Physics).
- [x] **Prompt 04:** Inventory System (Hotbar, Item Blocks, Mining).
- [x] **Prompt 05:** Crafting System (Recipe, Crafting UI, Inventory Link).
- [x] **Prompt 05.6:** Visual Polish & Rebase
- [x] **Prompt 06:** NPC & Dialogue

### Implemented in Prompt 06:
- NPC data system
- Original blocky voxel NPCs
- NPC interaction detection
- Interaction prompt UI
- Dialogue data system
- Dialogue system
- Dialogue UI
- Bimo companion positioning improvements
- Bimo guidance message system
- Desktop Interact input
- Mobile Interact button support

Note:
* quests are not implemented yet
* educational puzzles are not implemented yet
* save/load is not implemented yet

### Implemented in Prompt 05.6:
- Minecraft-like foundation rebase
- Cleaner voxel world data/render separation
- Starter island rebuilt as intentional tutorial island
- Chunk foundation cleaned up
- Player grounding repaired
- No-ground movement prevention added
- Bimo positioning repaired
- Third-person camera framing improved
- Block highlight improved
- Visual palette improved
- Lighting improved
- Prompt-number UI text removed
- Hotbar restyled
- Joystick restyled
- Action button cluster cleaned
- Debug and instruction panels compacted

*(Note: NPC, dialogue, quests, educational puzzles, and save/load are still intentionally not implemented.)*

### Tech Stack
- Vite
- TypeScript
- Three.js
- HTML/CSS (UI Overlay)
- (No React, Unity, or Unreal Engine)

## Implementation Status

**Implemented in Prompt 04 (Inventory and Resource System):**
- Item type system
- Item definition system
- Block drop system
- Inventory slots
- Inventory item stacking
- Hotbar with 5 slots
- Hotbar selection
- Resource collection from broken blocks
- Inventory-based block placement
- Feedback messages

**Implemented in Prompt 03 (Mobile Player Control):**
- Third-person player controller
- Camera-relative movement
- Desktop keyboard movement (WASD)
- Mobile virtual joystick (DOM-based)
- Mobile camera swipe control (Pointer drag)
- Smooth third-person camera follow
- Simple voxel terrain ground snapping
- Basic movement bounds

**Implemented in Prompt 02 (Voxel World):**
- Starter voxel island (Grass, Dirt, Stone, Wood, Crystal)
- Block type system, raycasting, highlight, break, and placement

**What is intentionally NOT implemented yet:**
- Crafting system
- Quest system
- Educational puzzle system
- Save/load functionality
- PWA/Capacitor setup
- Backend, database, multiplayer, login, ads, payments
- Advanced chunk streaming or procedural infinite terrain
- Full physics engine

## Controls

### Desktop
- **W / Arrow Up**: Move forward
- **S / Arrow Down**: Move backward
- **A / Arrow Left**: Move left
- **D / Arrow Right**: Move right
- **Pointer drag**: Rotate camera
- **Left Click**: Break selected block and collect resource
- **Right Click**: Place selected hotbar block
- **1-5**: Select hotbar slot

### Mobile
- **Left joystick**: Move player
- **Right swipe**: Rotate camera
- **Mine button**: Break selected block and collect resource if connected (Tap)
- **Place button**: Place selected hotbar block if connected (Double Tap / Hold)
- **Tap hotbar slot**: Select item

*(Note: Browser context menu on right click is disabled over the game canvas).*

## How to Run

### Install Dependencies
```bash
npm install
```

### Start Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Next Planned Step
**Prompt 04 — Inventory and Resource System**. 
This will introduce gathering materials, crafting, and simple inventory management.
