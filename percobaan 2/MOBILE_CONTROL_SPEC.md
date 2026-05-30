# MOBILE_CONTROL_SPEC.md

## 1. Purpose

This file defines mobile controls for the web-first prototype.

The game must be playable on mobile browser using touch controls, even before it becomes a packaged mobile app.

## 2. Control Philosophy

Children should be able to play with two thumbs.

Controls must be:

- Large
- Simple
- Forgiving
- Clearly labeled
- Not crowded
- Not dependent on precision taps

## 3. Control Layout

### Left Side

- Virtual joystick for movement.
- Positioned bottom-left.
- Large enough for thumbs.
- Should support touch drag within a comfortable area.

### Right Side

- Swipe area for camera rotation.
- Action buttons grouped bottom-right.

### Bottom Center

- Hotbar with 5 slots.

### Top or Upper Side

- Quest objective tracker.
- Inventory/crafting buttons.
- Optional settings/reset button.

## 4. Required Touch Controls

### Movement Joystick

Inputs:

- X axis
- Y axis
- Active/inactive state

Behavior:

- Player moves relative to camera direction if possible.
- Movement should not require exact precision.

### Camera Swipe

Behavior:

- Touch drag on right side rotates camera horizontally.
- Vertical camera rotation should be limited.
- Sensitivity must be tunable.

### Action Buttons

Required buttons:

- Interact
- Mine
- Place
- Jump optional
- Inventory
- Crafting
- Bimo hint optional

## 5. Button Size

Minimum recommended touch size:

```text
48px x 48px
```

Preferred for children:

```text
56px x 56px or larger
```

Spacing:

- Buttons should have enough margin to avoid accidental taps.
- Do not place important buttons too close together.

## 6. Hotbar

Requirements:

- 5 slots.
- Selected slot clearly highlighted.
- Tap to select.
- Show item icon or abbreviation.
- Show item count.

## 7. Block Targeting on Mobile

Mobile block targeting must be forgiving.

Options:

1. Center-screen reticle targeting.
2. Raycast from camera center.
3. Highlight targeted block.
4. Mine/place button acts on highlighted block.

Do not require the player to tap exact block faces precisely.

## 8. Bridge Placement UX

For MVP:

- Bridge block placement should be restricted to highlighted bridge slots.
- Show ghost blocks where placement is valid.
- If wrong area is selected, show gentle message:
  > “Blok jembatan dipasang di area jembatan.”

## 9. Inventory UI

Requirements:

- Large readable text.
- Simple resource list.
- Close button obvious.
- Do not use dense grid inventory in prototype.

## 10. Crafting UI

Requirements:

- Show recipe.
- Show required resources.
- Show whether resources are enough.
- Show craft button.
- If puzzle is required, open puzzle panel before crafting completes.

## 11. Puzzle UI on Mobile

Requirements:

- Large answer options.
- Resource icons visible.
- Simple prompt.
- Retry without penalty.
- Bimo hint visible.

## 12. Dialogue UI

Requirements:

- Large text.
- Tap to continue.
- Skip/close only after text is readable.
- Speaker name visible.

## 13. Desktop Compatibility

The same prototype must also work on desktop:

- WASD movement.
- Mouse drag camera.
- Click/tap UI.
- Keyboard shortcuts optional.

## 14. Accessibility and Comfort

- Avoid excessive camera shake.
- Avoid fast spinning.
- Avoid tiny text.
- Avoid mandatory rapid tapping.
- Avoid time pressure in puzzles.

## 15. Acceptance Criteria

Mobile controls are accepted when:

- Player can move with joystick.
- Player can rotate camera with touch swipe.
- Player can interact with NPC.
- Player can mine targeted block.
- Player can place bridge blocks.
- Player can use hotbar.
- Player can open inventory and crafting.
- Player can solve puzzle on mobile.
- UI is not too small.
