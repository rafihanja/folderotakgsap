# ACCEPTANCE_CRITERIA.md

## 1. Purpose

This checklist defines whether the prototype is complete.

If any critical acceptance item fails, the prototype is not complete.

## 2. Build Criteria

- [ ] Project uses Vite.
- [ ] Project uses TypeScript.
- [ ] Project uses Three.js.
- [ ] Project does not use Unity.
- [ ] `npm install` completes.
- [ ] `npm run dev` starts the project.
- [ ] `npm run build` completes successfully.
- [ ] `npm run preview` runs the production build.

## 3. Rendering Criteria

- [ ] Browser displays a 3D scene.
- [ ] Scene contains a small voxel island.
- [ ] Blocks are visually distinguishable.
- [ ] Lighting is simple and readable.
- [ ] No major console rendering errors occur.

## 4. Player Criteria

- [ ] Player appears in the world.
- [ ] Player can move using keyboard.
- [ ] Player can move using mobile joystick.
- [ ] Camera follows player.
- [ ] Camera rotates with mouse drag.
- [ ] Camera rotates with touch swipe.
- [ ] Player remains visible during normal movement.

## 5. Voxel Interaction Criteria

- [ ] Player can target blocks.
- [ ] Targeted block is highlighted.
- [ ] Player can break wood blocks.
- [ ] Player can break stone blocks.
- [ ] Broken resource blocks disappear or change state.
- [ ] Resources enter inventory after breaking blocks.
- [ ] Non-breakable blocks are protected.

## 6. Inventory and Hotbar Criteria

- [ ] Inventory shows wood count.
- [ ] Inventory shows stone count.
- [ ] Inventory shows bridge block count.
- [ ] Hotbar has 5 slots.
- [ ] Player can select an item from hotbar.
- [ ] UI is readable on desktop and mobile.

## 7. NPC and Dialogue Criteria

- [ ] Pak Ramu exists near the broken bridge.
- [ ] Player can interact with Pak Ramu.
- [ ] Dialogue box appears.
- [ ] Pak Ramu can start the bridge quest.
- [ ] Dialogue text is readable.

## 8. Bimo Criteria

- [ ] Bimo appears as companion or dialogue guide.
- [ ] Bimo introduces the world.
- [ ] Bimo gives hints during puzzle failure.
- [ ] Bimo celebrates bridge completion.

## 9. Quest Criteria

- [ ] Bridge quest starts correctly.
- [ ] Quest objective displays required resources.
- [ ] Quest recognizes gathered resources.
- [ ] Quest advances to puzzle state.
- [ ] Quest advances after puzzle completion.
- [ ] Quest advances after bridge block placement.
- [ ] Quest completes after bridge is repaired.

## 10. Puzzle Criteria

- [ ] Puzzle is triggered through crafting.
- [ ] Puzzle uses visual resource counting.
- [ ] Puzzle does not feel like a detached school test.
- [ ] Wrong answer gives gentle hint.
- [ ] Correct answer unlocks crafting.
- [ ] Player can retry after wrong answer.

## 11. Crafting Criteria

- [ ] Crafting panel opens.
- [ ] Bridge block recipe is visible.
- [ ] Crafting checks resource requirements.
- [ ] Resources are consumed on successful crafting.
- [ ] Bridge blocks are added to inventory/hotbar.

## 12. Building Criteria

- [ ] Bridge placement slots are highlighted.
- [ ] Player can place bridge blocks in allowed slots.
- [ ] Player cannot place bridge blocks anywhere if restricted by MVP rules.
- [ ] Bridge becomes complete after required blocks are placed.

## 13. Area Unlock Criteria

- [ ] Locked area is blocked before bridge completion.
- [ ] Area unlocks after bridge completion.
- [ ] Player can cross into the new area.
- [ ] Completion feedback is shown.

## 14. Save/Load Criteria

- [ ] Inventory saves.
- [ ] Quest state saves.
- [ ] Removed blocks save.
- [ ] Placed bridge blocks save.
- [ ] Area unlock state saves.
- [ ] Browser refresh restores progress.
- [ ] Reset progress button works.

## 15. Mobile Usability Criteria

- [ ] UI buttons are large enough.
- [ ] Joystick works on touch screen.
- [ ] Camera swipe works on touch screen.
- [ ] Interact/mine/place buttons work.
- [ ] Puzzle can be solved on mobile.
- [ ] UI does not block essential gameplay.

## 16. Performance Criteria

- [ ] World is small and lightweight.
- [ ] No heavy post-processing is used.
- [ ] Pixel ratio is capped.
- [ ] Reused geometries/materials are used where practical.
- [ ] Game remains responsive in browser.
- [ ] No excessive console logging per frame.

## 17. Code Quality Criteria

- [ ] Code is modular.
- [ ] `main.ts` is not a giant file.
- [ ] Systems are separated into folders.
- [ ] TypeScript interfaces/types are used.
- [ ] Config values are not scattered randomly.
- [ ] README explains how to run and test.

## 18. Final Acceptance Rule

The prototype is accepted only if a tester can complete this flow without developer assistance:

```text
Open game → move → gather resources → talk to Pak Ramu → solve puzzle → craft bridge blocks → place bridge → unlock area → refresh browser → progress remains saved
```
