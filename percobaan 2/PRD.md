# PRD.md

## 1. Product Name

**Petualangan Lumina**

Subtitle:

**A Web-First 3D Voxel Educational Sandbox Adventure**

## 2. Product Type

Web-first game prototype with future mobile app packaging.

The product is not a static website, not a traditional learning app, and not a native app first. It is a browser-playable 3D game prototype designed with mobile controls and low-end device constraints from day one.

## 3. Product Summary

Petualangan Lumina is a 3D voxel sandbox educational adventure game for children. Players explore a magical block-based world, gather resources, craft items, build structures, solve embedded educational puzzles, and unlock new areas.

The first playable prototype focuses on a small island called **Pulau Lumina**. The player meets **Bimo**, a friendly companion, and **Pak Ramu**, an NPC who asks for help repairing a broken bridge. To repair the bridge, the player gathers resources, solves a visual material-counting puzzle, crafts bridge blocks, places them in the world, and unlocks a new area.

## 4. Product Vision

The long-term vision is to create a game where children can learn through free exploration and creation rather than formal quizzes.

The game should eventually feel like an educational sandbox world where every activity has playful learning value:

- Building teaches quantity, structure, planning, and spatial reasoning.
- Crafting teaches resource management and arithmetic.
- Puzzles teach logic and problem solving.
- Exploration teaches curiosity and discovery.
- NPC quests teach reading comprehension and decision making.
- World changes reward effort and reinforce learning.

## 5. Core Problem

Many educational games feel like school assignments disguised with cartoon graphics. Children often become bored because the learning content is disconnected from meaningful gameplay.

Petualangan Lumina solves this by placing learning inside game actions. The child is not asked to answer isolated math questions. The child solves problems because they want to repair a bridge, unlock a new area, or help a character.

## 6. Target Users

### Primary Users

Children aged 7–12 who enjoy:

- Sandbox building games
- Exploration
- Cute characters
- Discovery
- Crafting
- Puzzle solving
- Creative play

### Secondary Users

Adults who care about educational value, but the prototype does not include a parent dashboard.

### User Needs

Children need:

- Simple controls
- Immediate feedback
- Clear goals
- Freedom to explore
- A world that reacts to their actions
- Fun interactions rather than formal tests

### User Pain Points

Children may lose interest when:

- Educational content feels forced
- Controls are hard
- UI is too small
- Tasks are unclear
- Progress feels slow
- The game world does not respond to success

## 7. Product Goals

### Prototype Goals

- Prove that a small web-based 3D voxel sandbox can feel playable.
- Prove that gathering, crafting, building, puzzle solving, and unlocking can work as one loop.
- Prove that the experience can run in browser and be tested on mobile devices.
- Prove that educational content can be embedded into gameplay.
- Keep the prototype light enough to later package into a mobile app.

### Measurable Prototype Goals

- Player can understand movement within 60 seconds.
- Player can complete the bridge quest within 5–10 minutes.
- Prototype runs at an acceptable 30 FPS target on mid-range mobile browser, with low-end constraints in mind.
- UI buttons are usable on touch screens.
- Reloading the browser preserves quest and inventory progress.

## 8. Non-Goals

The prototype must not include:

- Multiplayer
- Online accounts
- Cloud save
- Parent dashboard
- Payment
- Ads
- Full procedural infinite world
- Full curriculum system
- App store release
- Advanced graphics
- Full mobile native features
- AI-generated quest system
- Combat systems

## 9. Product Scope

### Must Have

- Web project using Vite + TypeScript + Three.js.
- Small 3D voxel island.
- Player movement.
- Camera control.
- Mobile touch controls.
- Resource block interaction.
- Inventory and hotbar.
- Simple crafting.
- One NPC quest.
- One educational puzzle.
- Bridge repair flow.
- Area unlock.
- Bimo companion feedback.
- Local save/load.
- Browser playable build.

### Should Have

- PWA-ready setup.
- Basic graphics quality settings.
- Config-driven block definitions.
- Config-driven recipe definitions.
- Config-driven quest text.
- Simple debug overlay for FPS and block count.

### Nice to Have

- Basic sound effects.
- Simple background music toggle.
- Basic animated Bimo placeholder.
- Visual block highlight.
- Accessibility-friendly text scaling.

### Future Features

- More biomes
- More quests
- More puzzles
- Larger crafting system
- Procedural zones
- Offline mobile app packaging with Capacitor
- Cloud save
- Optional account system
- Additional subjects beyond math and logic

## 10. Key User Journey

1. Player opens the game in a browser.
2. The loading screen shows the title Petualangan Lumina.
3. Player enters Pulau Lumina.
4. Bimo introduces the world.
5. Player learns movement and camera controls.
6. Player discovers resource blocks.
7. Player collects wood, stone, and crystal.
8. Player meets Pak Ramu.
9. Pak Ramu explains that the bridge is broken.
10. Player gathers required materials.
11. Player opens crafting.
12. Player solves a visual resource-counting puzzle.
13. Player crafts bridge blocks.
14. Player places bridge blocks in the broken bridge area.
15. Bridge completes.
16. New area unlocks.
17. Bimo celebrates.
18. Progress is saved locally.

## 11. UX Requirements

### General UX

- The game must communicate goals clearly.
- UI must be readable on mobile.
- Buttons must be large enough for children.
- Feedback must be encouraging, never harsh.
- Puzzle failure must trigger hints, not punishment.

### Mobile UX

- Left side: movement joystick.
- Right side: camera swipe area.
- Bottom: hotbar.
- Right cluster: interact, mine, place, jump.
- Inventory and crafting must be easy to open and close.
- No tiny text.
- No UI clutter that blocks the game view.

## 12. Technical Requirements

### Stack

- Vite for fast local development and web build.
- TypeScript for maintainable code.
- Three.js for 3D rendering.
- HTML/CSS for game UI overlay.
- LocalStorage for initial save implementation.
- IndexedDB may be used later if save data grows.
- PWA-ready manifest structure.
- Capacitor-ready folder architecture for future mobile app packaging.

### Rendering Direction

- Use simple voxel-style geometry.
- Prefer instanced meshes or merged geometry when block counts increase.
- Avoid expensive real-time shadows in the prototype.
- Use simple lighting.
- Use low-resolution textures or flat colors.
- Keep draw calls low.

## 13. Data Requirements

The prototype stores only local gameplay progress:

- Player position
- Inventory quantities
- Quest state
- Crafted bridge block count
- Placed bridge block positions
- Area unlock state
- Puzzle completion state

No personal data is required.

## 14. Security and Privacy Requirements

Because the prototype has no login, no backend, and no personal data, security risk is low.

Requirements:

- No external tracking scripts.
- No ads.
- No payment SDK.
- No collection of child personal data.
- No chat.
- No user-generated uploads.
- Local save only.
- If analytics are added later, they must avoid personal identifiers and must be optional.

## 15. Performance Requirements

The prototype must be designed for low-end mobile devices.

Targets:

- 30 FPS target.
- Small world size.
- Low block count.
- Low draw calls.
- Minimal shader complexity.
- No heavy post-processing.
- No large textures.
- No excessive particles.
- No complex physics simulation.
- Touch controls must remain responsive.

## 16. Accessibility Requirements

- Text must be readable.
- Controls must be large.
- Visual feedback must not rely only on color.
- Important actions must have both text and icon when possible.
- Puzzle instructions must use simple language.
- Sound must not be required to understand gameplay.

## 17. Acceptance Criteria

The prototype is accepted only when:

- It runs in a browser.
- It can be tested on mobile browser.
- Player can move and rotate camera.
- Player can gather resources.
- Inventory updates correctly.
- Crafting requires resources.
- Puzzle is integrated into the bridge quest.
- Bridge blocks can be placed.
- New area unlocks after bridge completion.
- Bimo provides success and hint feedback.
- Save/load works after browser refresh.
- Code is modular and understandable.
- The project contains clear instructions for running locally.

## 18. Final Expected Result

The final prototype should feel like a small magical voxel sandbox. It does not need to look final, but it must prove the core promise:

> A child can explore, gather, build, solve a meaningful problem, and feel excited when the world changes because of their action.
