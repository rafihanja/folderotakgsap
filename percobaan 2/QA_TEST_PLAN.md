# QA_TEST_PLAN.md

## 1. Purpose

This QA plan verifies that the Petualangan Lumina prototype is playable, stable, mobile-friendly, and aligned with the intended MVP.

## 2. Test Environments

### Required

- Desktop Chrome
- Mobile Chrome on Android
- Browser dev tools mobile simulation

### Recommended

- Low-end Android phone if available
- Mid-range Android phone
- Tablet browser if available

## 3. Installation Test

Steps:

1. Clone/open project.
2. Run `npm install`.
3. Run `npm run dev`.
4. Open local URL.
5. Run `npm run build`.
6. Run `npm run preview`.

Pass if:

- No install failure.
- Dev server runs.
- Production build succeeds.
- Preview opens game.

## 4. First Load Test

Steps:

1. Open the game.
2. Wait for scene to load.
3. Observe console.

Pass if:

- Scene renders.
- No blocking console errors.
- Player and island appear.
- UI appears.

## 5. Movement Test

Desktop:

- Use WASD/arrow keys.
- Rotate camera with mouse drag.

Mobile:

- Use joystick.
- Swipe camera.

Pass if:

- Player moves predictably.
- Camera follows.
- Camera does not spin uncontrollably.
- Player remains visible.

## 6. Resource Gathering Test

Steps:

1. Approach wood block.
2. Target block.
3. Press mine.
4. Check inventory.
5. Repeat with stone block.

Pass if:

- Target highlight appears.
- Correct block breaks.
- Correct resource count increases.
- Non-breakable blocks are not destroyed accidentally.

## 7. Inventory/Hotbar Test

Steps:

1. Gather resources.
2. Open inventory.
3. Select hotbar slot.
4. Close inventory.
5. Check HUD.

Pass if:

- Resource counts are accurate.
- UI is readable.
- Hotbar selection is clear.

## 8. NPC Dialogue Test

Steps:

1. Approach Pak Ramu.
2. Press interact.
3. Read dialogue.
4. Start quest.

Pass if:

- Dialogue appears.
- Text is readable.
- Quest starts.
- Objective tracker updates.

## 9. Quest Progress Test

Steps:

1. Start quest.
2. Gather required resources.
3. Check quest objective.
4. Open crafting.

Pass if:

- Quest recognizes resources.
- Objective changes appropriately.
- Crafting becomes available.

## 10. Puzzle Test

Steps:

1. Open bridge crafting.
2. Trigger puzzle.
3. Select wrong answer.
4. Read Bimo hint.
5. Select correct answer.

Pass if:

- Wrong answer does not fail quest.
- Hint appears.
- Correct answer completes puzzle.
- Crafting unlocks.

## 11. Crafting Test

Steps:

1. Solve puzzle.
2. Craft bridge blocks.
3. Check resource consumption.
4. Check bridge block count.

Pass if:

- Resources decrease correctly.
- Bridge blocks increase.
- Crafting cannot happen without required resources.

## 12. Building Test

Steps:

1. Select bridge block.
2. Move to bridge area.
3. Place block in highlighted slot.
4. Repeat until bridge complete.

Pass if:

- Valid placement works.
- Invalid placement is blocked.
- Quest progress updates.

## 13. Area Unlock Test

Steps:

1. Complete bridge.
2. Walk across bridge.
3. Enter locked area.

Pass if:

- Barrier is removed or deactivated.
- Player can access area.
- Bimo/Pak Ramu success feedback appears.

## 14. Save/Load Test

Steps:

1. Complete part of quest.
2. Refresh browser.
3. Check player progress.
4. Complete bridge.
5. Refresh again.
6. Use reset progress.

Pass if:

- Inventory persists.
- Quest state persists.
- Placed blocks persist.
- Unlock state persists.
- Reset clears save.

## 15. Mobile UI Test

Steps:

1. Open on mobile browser.
2. Use all buttons.
3. Open inventory/crafting/puzzle.
4. Complete quest.

Pass if:

- Buttons are large enough.
- UI is not cut off.
- Game can be completed on touch controls.
- No essential UI is hidden behind browser controls.

## 16. Performance Test

Steps:

1. Enable debug overlay if available.
2. Play for 10 minutes.
3. Gather resources.
4. Complete quest.
5. Watch FPS/responsiveness.

Pass if:

- Game remains responsive.
- No major memory/performance degradation.
- No heavy stutter during quest.
- No runaway console spam.

## 17. Child Usability Observation

If testing with a child:

Observe:

- Do they understand movement?
- Do they notice Pak Ramu?
- Do they understand gathering?
- Do they understand puzzle?
- Do they enjoy placing bridge blocks?
- Do they want to enter the unlocked area?

Do not over-explain. If the child needs constant adult instruction, onboarding needs improvement.

## 18. Regression Test

After every major change, retest:

- Movement
- Camera
- Block break
- Inventory
- Quest
- Puzzle
- Crafting
- Bridge placement
- Save/load

## 19. Bug Report Format

Use this format:

```text
Title:
Environment:
Steps to reproduce:
Expected result:
Actual result:
Screenshot/video:
Severity:
Notes:
```

## 20. Release Gate

The prototype should not be shared widely until:

- Build passes.
- Bridge quest works.
- Mobile controls work.
- Save/load works.
- No major console errors.
- Performance is acceptable.
