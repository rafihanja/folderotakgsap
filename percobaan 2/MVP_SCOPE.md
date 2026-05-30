# MVP_SCOPE.md

## Purpose

This file defines the exact scope of the first prototype. The AI coding agent must not expand beyond this scope without explicit approval.

## MVP Name

**Petualangan Lumina — Web-First Prototype v1**

## MVP Objective

Build a small browser-playable prototype that proves the core loop:

```text
Explore → Gather → Craft → Build → Solve Puzzle → Unlock
```

## Included in MVP

### Platform

- Browser playable web project.
- Built with Vite + TypeScript + Three.js.
- Mobile-browser testing supported through touch controls.
- Architecture should be PWA/Capacitor-ready, but actual native app packaging is not required in the MVP.

### World

- One small voxel island.
- One broken bridge.
- One locked area behind the bridge.
- Simple grass/dirt/stone/wood/crystal blocks.
- No infinite terrain.
- No procedural world generation required.

### Player

- Simple placeholder character or capsule.
- Movement with keyboard and virtual joystick.
- Camera rotation using mouse drag and touch swipe.
- Basic jump optional but preferred.

### Voxel Interaction

- Highlight targeted block.
- Break selected resource blocks.
- Place bridge blocks only in allowed bridge area for MVP.
- Collect resources into inventory.

### Resources

Minimum resources:

- Wood
- Stone
- Crystal

### Inventory

- Hotbar with 5 slots.
- Inventory panel showing resource quantities.
- Inventory updates after gathering and crafting.

### Crafting

Minimum recipe:

- Bridge Block = wood + stone, unlocked through quest.
- Crafting flow includes one visual educational puzzle before output is granted.

### NPC

One NPC:

- Pak Ramu
- Gives bridge repair quest.
- Explains required resources.
- Reacts after completion.

### Companion

One companion:

- Bimo
- Provides tutorial hints.
- Gives supportive feedback.
- Gives hint when puzzle answer is incorrect.
- Celebrates when bridge is repaired.

### Quest

One main quest:

- Repair the Broken Bridge

Quest states:

1. Not started
2. Started
3. Resources gathered
4. Puzzle ready
5. Puzzle completed
6. Bridge block crafted
7. Bridge placed
8. Area unlocked
9. Quest completed

### Puzzle

One embedded educational puzzle:

- Visual material counting.
- No formal quiz feeling.
- Uses resource icons.
- Allows retry.
- Gives Bimo hint after incorrect answer.

### Save System

Local browser save:

- Inventory
- Quest state
- Placed bridge blocks
- Unlocked area state
- Player position

## Excluded from MVP

Do not build:

- Unity project
- Unreal project
- Native app first
- Multiplayer
- Online accounts
- Cloud save
- Parent dashboard
- Payment
- Ads
- Combat
- Enemies
- Weapons
- Chat
- User-generated uploads
- Infinite world
- Multiple dimensions
- Advanced procedural generation
- Complex physics
- Advanced AI companion
- Full curriculum
- App store release
- Skin shop
- Cosmetic economy

## MVP Quality Requirements

The MVP must be:

- Playable
- Lightweight
- Clear
- Modular
- Mobile-aware
- Easy to test
- Easy to extend

## MVP Completion Rule

If the bridge quest cannot be completed from start to finish, the MVP is not complete.

If the game cannot run in a browser, the MVP is not complete.

If the code is written as one giant file without system separation, the MVP is not complete.

If the mobile controls are unusable, the MVP is not complete.
