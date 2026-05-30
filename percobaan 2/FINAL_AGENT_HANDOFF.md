# FINAL_AGENT_HANDOFF.md

## Final Instruction to AI Coding Agent

You are building the first playable web prototype for **Petualangan Lumina**.

Read all handoff files before coding.

This is a **web-first Three.js project**, not a Unity project.

## Correct Project Direction

Build:

```text
Vite + TypeScript + Three.js browser game
```

Designed for:

```text
Browser testing → mobile browser testing → future PWA/Capacitor mobile app packaging
```

## Product Summary

Petualangan Lumina is a child-friendly 3D voxel sandbox educational adventure game.

The prototype must prove this core loop:

```text
Explore → Gather → Craft → Build → Solve Puzzle → Unlock Area
```

## First Prototype Experience

The player should:

1. Spawn on Pulau Lumina.
2. Meet Bimo.
3. Learn movement.
4. Gather wood and stone.
5. Talk to Pak Ramu.
6. Start bridge repair quest.
7. Gather required materials.
8. Solve material-counting puzzle.
9. Craft bridge blocks.
10. Place bridge blocks.
11. Unlock area beyond bridge.
12. Save progress locally.

## Required Stack

Use:

- Vite
- TypeScript
- Three.js
- HTML/CSS UI
- localStorage save

Optional later:

- PWA manifest
- Capacitor

Do not use:

- Unity
- Unreal
- Native mobile first
- Backend
- Login
- Multiplayer

## Required Systems

You must implement:

- Scene setup
- Renderer setup
- Player controller
- Camera controller
- Keyboard input
- Touch input
- Voxel world
- Block targeting
- Block breaking
- Block placement
- Resource inventory
- Hotbar
- Crafting
- Quest state machine
- Puzzle system
- NPC dialogue
- Bimo companion
- Area unlock
- Local save/load
- Mobile UI
- README instructions

## Required User Interface

Use HTML/CSS overlay.

Required UI:

- HUD
- Quest tracker
- Hotbar
- Inventory panel
- Crafting panel
- Puzzle panel
- Dialogue box
- Mobile joystick
- Mobile action buttons
- Reset progress button

## Core Quest

Quest:

**Repair the Broken Bridge**

NPC:

**Pak Ramu**

Companion:

**Bimo**

Puzzle:

Visual resource-counting puzzle.

Do not make the puzzle feel like a formal school exam.

## MVP Boundaries

Do not add:

- Infinite world
- Multiplayer
- Login
- Parent dashboard
- Payment
- Ads
- Combat
- Multiple dimensions
- Full curriculum
- AI-generated content
- App store deployment
- Complex procedural generation

## Implementation Order

Follow this order:

1. Setup Vite + TypeScript + Three.js.
2. Create scene, renderer, camera.
3. Create small voxel island.
4. Add player movement.
5. Add touch controls.
6. Add block targeting.
7. Add block breaking and resource pickup.
8. Add inventory and hotbar.
9. Add Pak Ramu NPC and dialogue.
10. Add quest state.
11. Add crafting.
12. Add puzzle.
13. Add bridge placement.
14. Add area unlock.
15. Add Bimo hints and celebration.
16. Add save/load.
17. Add mobile polish.
18. Add performance tuning.
19. Add README.

## Performance Priorities

- Keep world small.
- Keep block count low.
- Reuse geometries.
- Reuse materials.
- Cap pixel ratio.
- Avoid heavy shadows.
- Avoid post-processing.
- Avoid complex physics.
- Avoid huge textures.
- Avoid constant DOM rebuilds.

## Definition of Done

The prototype is done only if:

- It runs in browser.
- It works on desktop input.
- It works on mobile touch input.
- Player can gather resources.
- Player can talk to Pak Ramu.
- Player can solve the bridge puzzle.
- Player can craft bridge blocks.
- Player can place bridge blocks.
- Area unlocks.
- Bimo gives feedback.
- Save/load works after refresh.
- Project builds successfully.
- Code is modular.

## Final Warning

Do not overbuild.

The goal is not to create the full game.

The goal is to create the smallest high-quality playable prototype that proves the core loop.
