# PROTOTYPE_BUILD_PROMPT.md

## Direct Prompt for AI Coding Agent

You are a senior web game developer.

Build the first playable web prototype for **Petualangan Lumina**, a web-first 3D voxel educational sandbox adventure game for children.

This project must be built using:

- Vite
- TypeScript
- Three.js
- HTML/CSS UI overlay

Do not use Unity.  
Do not use Unreal.  
Do not create a native mobile project first.

The prototype must run in a browser and be designed with mobile touch controls so it can be tested on mobile browsers and later prepared for PWA/Capacitor app packaging.

## Product Direction

Petualangan Lumina is inspired by the freedom and creativity of Minecraft, but it is not a Minecraft clone.

The player explores a small magical voxel island, gathers resources, crafts bridge blocks, helps an NPC repair a broken bridge, solves a visual educational material-counting puzzle, places bridge blocks, and unlocks a new area.

The learning must feel like part of the gameplay, not a school quiz.

## Core Gameplay Loop

Implement this loop:

```text
Explore → Gather → Craft → Build → Solve Puzzle → Unlock Area
```

## Required Prototype Flow

1. Player opens the game in browser.
2. Player spawns on **Pulau Lumina**.
3. Bimo companion introduces the world.
4. Player can move with keyboard and mobile joystick.
5. Player can rotate camera with mouse drag and mobile swipe.
6. Player can target resource blocks.
7. Player can break wood/stone blocks.
8. Resources enter inventory.
9. Player talks to Pak Ramu.
10. Pak Ramu starts the bridge repair quest.
11. Player gathers required resources.
12. Player opens crafting panel.
13. Crafting triggers a visual material-counting puzzle.
14. Player solves puzzle.
15. Bridge blocks are crafted.
16. Player selects bridge block from hotbar.
17. Player places bridge blocks in highlighted bridge slots.
18. Bridge is completed.
19. Locked area opens.
20. Bimo celebrates.
21. Progress saves locally.
22. Refreshing the browser keeps progress.

## Required Files and Systems

Create a modular project structure with systems for:

- App bootstrap
- Scene setup
- Renderer setup
- Third-person camera
- Player movement
- Keyboard input
- Touch input
- Voxel world
- Block definitions
- Block targeting
- Block breaking
- Block placement
- Resource definitions
- Inventory
- Hotbar
- Crafting
- Quest state
- Puzzle logic
- NPC dialogue
- Bimo companion
- Area unlock
- Save/load
- HTML/CSS UI
- Debug/performance overlay optional

Do not put all logic inside one file.

## Minimum Block Types

- Grass
- Dirt
- Stone
- Wood
- Crystal
- Bridge

## Minimum Items

- Wood
- Stone
- Crystal
- Bridge Block

## Main Quest

Quest name:

**Repair the Broken Bridge**

NPC:

**Pak Ramu**

Companion:

**Bimo**

Required resources example:

- 6 Wood
- 3 Stone

Puzzle example:

> Each Bridge Block needs 2 Wood. If we have 6 Wood, how many Bridge Blocks can we make?

Correct answer:

```text
3
```

Use icons or visual grouping, not plain text-only math.

## Mobile Controls

Implement:

- Left virtual joystick.
- Right swipe camera.
- Interact button.
- Mine button.
- Place button.
- Inventory button.
- Crafting button.
- Hotbar with 5 slots.

Buttons must be large enough for children.

## Save System

Use localStorage for first prototype.

Save:

- Player position.
- Inventory.
- Quest state.
- Removed resource blocks.
- Placed bridge blocks.
- Unlocked area.
- Puzzle completion.

Add a reset progress button.

## Performance Rules

Design for low-end mobile browser:

- Small world.
- Simple cubes.
- Reused geometries/materials.
- Cap pixel ratio.
- No heavy post-processing.
- No heavy real-time shadows.
- No complex physics.
- No huge textures.
- No infinite terrain.

## Do Not Implement

Do not implement:

- Unity
- Native mobile first
- Multiplayer
- Login
- Backend
- Cloud save
- Parent dashboard
- Payment
- Ads
- Combat
- Enemies
- Infinite world
- Multiple dimensions
- Full procedural generation
- App store release

## Deliverables

The final project must include:

- Source code.
- `package.json`.
- Vite config.
- TypeScript config.
- Clear folder structure.
- CSS for UI.
- Local save system.
- README with install/run/build/test instructions.

## Required Commands

The project must support:

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Acceptance

The prototype is accepted only when the bridge quest can be completed from start to finish in browser.
