# ASSET_DIRECTION.md

## 1. Visual Goal

Petualangan Lumina should look like a child-friendly magical voxel world. It should be inspired by the readability and creativity of block-based games, but it must have its own identity.

The prototype may use placeholder assets. Visual clarity is more important than final polish.

## 2. Style Keywords

- Stylized
- Voxel
- Bright
- Magical
- Soft
- Friendly
- Readable
- Lightweight
- Playful
- Not realistic

## 3. Avoid

- Do not copy Minecraft textures.
- Do not use realistic materials.
- Do not use horror/dark visuals.
- Do not use high-poly assets.
- Do not use heavy post-processing.
- Do not use complex animated characters in the first prototype.
- Do not use large texture files.

## 4. Color Direction

Use simple and readable color groups:

- Grass: soft green
- Dirt: warm brown
- Stone: soft gray
- Wood: warm tan/brown
- Crystal: cyan/blue/purple glow-like color
- Bridge block: warm wood + stone accent
- Bimo: blue/cyan/yellow glow
- Quest highlight: yellow or cyan glow

## 5. Block Assets

Prototype block assets can be simple cubes with colors.

Minimum block set:

| Asset | Description |
|---|---|
| Grass Block | Green top, optional brown sides |
| Dirt Block | Brown cube |
| Stone Block | Gray cube |
| Wood Block | Brown/tan cube |
| Crystal Block | Cyan/purple cube, slightly emissive-looking |
| Bridge Block | Wooden plank-like cube |
| Locked Barrier | Transparent or glowing barrier |
| Placement Ghost | Semi-transparent bridge block preview |

## 6. Character Assets

### Player

Prototype:

- Capsule, simple voxel person, or colored placeholder.
- Must be visible from third-person camera.
- Should have a clear forward direction if possible.

Future:

- Child-friendly customizable avatar.

### Bimo

Prototype:

- Small floating sphere or simple glowing cube.
- Follows player or appears near dialogue UI.
- Uses color/emissive material.
- Can bob gently up and down.

Bimo should feel like:

- friendly
- curious
- safe
- encouraging

### Pak Ramu

Prototype:

- Simple voxel NPC or colored capsule.
- Stands near bridge.
- Has interaction marker above head.

## 7. Environment Assets

Minimum:

- Small island terrain
- Trees or wood blocks
- Stone resource area
- Crystal reward area
- Broken bridge
- Bridge placement slots
- Locked area
- Simple background sky color

Optional lightweight polish:

- Floating particles near crystal
- Simple ambient glow
- Small grass patches using low-cost geometry
- Signpost near bridge

## 8. UI Asset Direction

Use HTML/CSS UI.

UI should feel:

- large
- rounded
- friendly
- readable
- simple
- touch-first

Required UI:

- Loading screen
- HUD
- Hotbar
- Inventory panel
- Crafting panel
- Puzzle panel
- Dialogue box
- Quest objective tracker
- Action buttons
- Settings/reset button

## 9. Audio Direction

Audio is optional for first prototype but recommended if easy.

Suggested simple sounds:

- Resource collected
- Block placed
- Puzzle correct
- Puzzle hint
- Quest completed
- Area unlocked

Avoid:

- loud sounds
- scary sounds
- repetitive annoying sounds

## 10. Performance Asset Rules

- Prefer flat colors over textures.
- If textures are used, keep them tiny.
- Reuse materials.
- Avoid unique material per block.
- Use simple geometry.
- Do not import large GLB models for prototype.
- Avoid skeletal animation unless absolutely needed.
- Keep total downloadable asset size small.

## 11. Asset Naming Convention

Use clear lowercase names:

```text
block_grass
block_dirt
block_stone
block_wood
block_crystal
block_bridge
npc_pak_ramu
companion_bimo
ui_hotbar_slot
ui_button_action
```

## 12. Prototype Acceptance

Visual prototype is acceptable if:

- Player understands where to go.
- Resource blocks are distinguishable.
- Bridge area is obvious.
- Bimo and Pak Ramu are readable.
- UI is readable on mobile.
- Game does not look broken even with placeholder assets.
