# README_AGENT.md

## Project Identity

You are building the first playable prototype of **Petualangan Lumina**, a web-first 3D voxel educational sandbox adventure game for children.

The game should feel inspired by the freedom and creativity of Minecraft, but it must not be a Minecraft clone. The goal is to create a small, lightweight, child-friendly, educational sandbox where learning is hidden inside exploration, resource gathering, crafting, building, and puzzle solving.

## Important Correction

This is the **v2 Web-First handoff**.

Do **not** create a Unity project.

Build a web project using:

- Vite
- TypeScript
- Three.js
- HTML/CSS
- Browser-first testing
- Mobile-first controls
- Local browser save
- PWA/Capacitor-ready architecture for future mobile app packaging

## Product Summary

Petualangan Lumina is a 3D voxel sandbox educational adventure where children explore a magical block-based world, collect resources, craft useful objects, build structures, solve educational puzzles, and unlock new areas.

The first prototype focuses on one simple quest:

> Help Pak Ramu repair a broken bridge by collecting resources, solving a material-counting puzzle, crafting bridge blocks, placing them in the world, and unlocking a new area.

## Core Promise

Children should feel:

- “I am exploring a magical world.”
- “I can build and change this world.”
- “I want to see what is beyond the bridge.”
- “I solved the problem myself.”
- “I learned without feeling tested.”

## Development Philosophy

Build the smallest possible playable prototype that proves the core gameplay loop.

The prototype must demonstrate:

1. A controllable 3D character or capsule placeholder.
2. A small voxel island.
3. Resource gathering through block interaction.
4. Inventory and hotbar.
5. Simple crafting.
6. One NPC quest.
7. One educational puzzle.
8. Building/placing bridge blocks.
9. Area unlock.
10. Local save/load.
11. Mobile touch controls.
12. Lightweight browser performance.

## Core Loop

The prototype must support this loop:

```text
Explore → Gather → Craft → Build → Solve Puzzle → Unlock Area → Continue Exploring
```

## Target User

Primary user:

- Children aged approximately 7–12.
- They enjoy sandbox games, exploration, building, and cute companion characters.
- They should not feel like they are using a school app.

Secondary stakeholder:

- Adults who may observe whether the game is educational.
- No adult dashboard is required in the prototype.

## Technical Direction

Use a modular project structure. Do not write all logic in `main.ts`.

Required system areas:

- `scene`
- `player`
- `camera`
- `voxel`
- `inventory`
- `crafting`
- `quest`
- `puzzle`
- `npc`
- `companion`
- `ui`
- `save`
- `config`

## Absolute Do-Not-Build List

Do not implement these in the first prototype:

- Multiplayer
- Login
- Backend server
- Cloud save
- Parent dashboard
- Payment
- Ads
- Procedural infinite world
- Combat
- Weapons
- Realistic graphics
- Heavy physics
- Heavy shaders
- Complex NPC AI
- Multiple dimensions
- App store release flow
- Large world streaming

## Definition of Done

The prototype is only done when a user can:

1. Open the game in a browser.
2. Move around the small voxel island.
3. Use mobile-friendly controls.
4. Collect wood and stone/crystal resources.
5. Talk to Pak Ramu.
6. Receive the bridge repair quest.
7. Open inventory/hotbar.
8. Solve the resource-counting puzzle.
9. Craft bridge blocks.
10. Place bridge blocks in the correct area.
11. Unlock the blocked area.
12. Receive feedback from Bimo.
13. Reload the page and retain saved progress.

## Quality Bar

The result must be clean, modular, readable, and practical. Placeholder visuals are allowed. Broken architecture is not allowed.

The priority order is:

1. Playability
2. Mobile usability
3. Performance
4. Clean system design
5. Visual polish
6. Future scalability
