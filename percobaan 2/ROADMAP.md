# ROADMAP.md

## Product Roadmap

This roadmap turns the Petualangan Lumina concept into a real playable product through controlled phases.

## Phase 0 — Planning Package

Status: Complete when all handoff files are available.

Output:

- Product foundation
- GDD
- Technical spec
- Game systems spec
- Mobile controls spec
- Low-end performance spec
- Quest and puzzle spec
- Asset direction
- Acceptance criteria
- QA test plan
- Final agent handoff

## Phase 1 — Technical Web Prototype

Goal:

Prove that the technical foundation works in the browser.

Build:

- Vite + TypeScript + Three.js setup.
- Rendering canvas.
- Small voxel island.
- Player placeholder.
- Basic camera.
- Keyboard movement.
- Touch joystick placeholder.
- Basic block scene.

Exit criteria:

- Project runs locally.
- Browser displays 3D voxel island.
- Player can move.
- Camera can rotate.
- No major console errors.

## Phase 2 — Core Interaction Prototype

Goal:

Prove the sandbox interaction loop.

Build:

- Block targeting.
- Break block.
- Collect resource.
- Inventory count.
- Hotbar.
- Place block in allowed zone.
- Basic UI feedback.

Exit criteria:

- Player can gather at least wood and stone.
- Inventory updates after block breaking.
- Player can place bridge block placeholder.
- Targeting is understandable on desktop and mobile.

## Phase 3 — Quest and Puzzle Prototype

Goal:

Prove that education can be embedded into gameplay.

Build:

- Pak Ramu NPC.
- Bimo companion text system.
- Bridge repair quest.
- Material-counting puzzle.
- Crafting gate.
- Bridge completion.
- Area unlock.

Exit criteria:

- Player can complete the full bridge repair quest.
- Puzzle feels integrated into the task.
- Incorrect answers trigger hints, not punishment.
- Quest state progresses correctly.

## Phase 4 — Mobile Browser Usability Pass

Goal:

Make the prototype playable on touch devices.

Build/improve:

- Virtual joystick.
- Touch camera swipe.
- Large action buttons.
- Touch-friendly inventory.
- Touch-friendly crafting.
- Touch-friendly puzzle UI.
- Mobile UI layout.

Exit criteria:

- Game can be played with two thumbs.
- Buttons are large enough for children.
- Camera movement is not frustrating.
- UI does not block core gameplay.

## Phase 5 — Save/Load and Persistence

Goal:

Ensure prototype progress survives refresh.

Build:

- LocalStorage save system.
- Save inventory.
- Save quest state.
- Save placed bridge.
- Save unlocked area.
- Reset progress button.

Exit criteria:

- Refreshing browser preserves progress.
- Reset button clears local save.
- Save data errors fail gracefully.

## Phase 6 — Low-End Performance Pass

Goal:

Prepare for low-end mobile browser and future app wrapper.

Optimize:

- Geometry count.
- Draw calls.
- Materials.
- Shadows.
- Texture sizes.
- UI rendering cost.
- Block count.
- Memory usage.

Exit criteria:

- Stable target around 30 FPS on reasonable test devices.
- No heavy post-processing.
- No excessive memory growth.
- Debug overlay can show FPS and object counts.

## Phase 7 — Vertical Slice

Goal:

Turn the prototype into a 10–15 minute mini-experience.

Add:

- Better map layout.
- More readable environment.
- Better quest pacing.
- Better dialogue.
- Simple sound feedback.
- Additional optional resource interaction.
- Visual polish without heavy graphics.

Exit criteria:

- A tester can play 10–15 minutes.
- Bridge quest is fun and understandable.
- Tester understands what to do next.
- Game feels like a real direction, not a tech demo only.

## Phase 8 — Future Mobile Packaging

Goal:

Prepare app packaging after browser prototype is proven.

Possible path:

- Add PWA manifest.
- Add service worker if appropriate.
- Evaluate Capacitor packaging.
- Test Android WebView performance.
- Add mobile-safe local storage strategy.
- Package Android prototype.

Exit criteria:

- Android wrapper can load game.
- Touch controls remain usable.
- Performance remains acceptable.
- App works offline if required.

## Phase 9 — Expanded MVP

Only after the prototype proves fun.

Potential additions:

- More quests.
- More resources.
- More recipes.
- Larger island.
- More puzzle types.
- More Bimo reactions.
- More unlockable areas.
- Better progress book.

## Strategic Rule

Never expand content until the core loop feels fun.
