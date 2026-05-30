# GAME_SYSTEMS_SPEC.md

## 1. System Overview

The prototype must be built as a modular web game. Each system must be separated clearly so future agents can extend the game without rewriting everything.

Required systems:

1. App bootstrap
2. Scene system
3. Player movement system
4. Camera system
5. Voxel/block system
6. Targeting system
7. Resource system
8. Inventory system
9. Hotbar system
10. Crafting system
11. Quest system
12. Puzzle system
13. NPC/dialogue system
14. Companion system
15. Area unlock system
16. Save/load system
17. UI system
18. Performance/debug system

## 2. App Bootstrap

Responsible for:

- Creating renderer.
- Creating scene.
- Creating camera.
- Initializing game state.
- Loading world.
- Starting update loop.
- Connecting input systems.

Suggested file:

```text
src/main.ts
src/app/App.ts
```

## 3. Scene System

Responsible for:

- Three.js scene setup.
- Lights.
- Ground/world container.
- Object groups.
- Environment initialization.

Suggested files:

```text
src/scene/createScene.ts
src/scene/lights.ts
src/scene/worldRoot.ts
```

Requirements:

- Use simple ambient and directional lighting.
- Avoid heavy shadows by default.
- Keep scene hierarchy organized.

## 4. Player Movement System

Responsible for:

- Player position.
- Movement input.
- Basic collision approximation.
- Movement speed.
- Optional jump.
- Rotation toward movement direction.

Inputs:

- Keyboard WASD/arrow keys for desktop.
- Virtual joystick for mobile.

Suggested files:

```text
src/player/PlayerController.ts
src/player/PlayerModel.ts
```

Prototype movement can be simple. Do not overbuild physics.

## 5. Camera System

Responsible for:

- Third-person follow.
- Mouse drag rotation.
- Touch swipe rotation.
- Camera distance.
- Camera height.
- Smooth follow.

Suggested file:

```text
src/camera/FollowCamera.ts
```

Rules:

- No first-person camera in prototype.
- Keep camera comfortable on mobile.
- Avoid extreme sensitivity.
- Allow sensitivity tuning through config.

## 6. Voxel/Block System

Responsible for:

- Block definitions.
- Block placement data.
- Block rendering.
- Block lookup by coordinate.
- Block add/remove.

Suggested files:

```text
src/voxel/blockDefinitions.ts
src/voxel/VoxelWorld.ts
src/voxel/BlockRenderer.ts
src/voxel/blockTypes.ts
```

Data model example:

```ts
type BlockType = "grass" | "dirt" | "stone" | "wood" | "crystal" | "bridge";

interface BlockDefinition {
  id: BlockType;
  displayName: string;
  color: string;
  breakable: boolean;
  placeable: boolean;
  resourceDrop?: string;
}
```

Prototype can use colored cubes instead of textures.

## 7. Targeting System

Responsible for:

- Raycasting from camera/touch center.
- Detecting selected block.
- Showing highlight.
- Determining valid break/place target.

Suggested file:

```text
src/voxel/BlockTargeting.ts
```

Requirements:

- Must work with mouse click and touch action buttons.
- Should highlight target block.
- Must avoid accidental breaking of important quest blocks.

## 8. Resource System

Responsible for:

- Resource definitions.
- Resource gain from broken blocks.
- UI notifications.

Suggested files:

```text
src/resources/resourceDefinitions.ts
src/resources/ResourceEvents.ts
```

Resource examples:

- wood
- stone
- crystal
- bridgeBlock

## 9. Inventory System

Responsible for:

- Storing item quantities.
- Adding resources.
- Removing resources for crafting.
- Checking requirements.
- Save/load inventory.

Suggested file:

```text
src/inventory/InventoryStore.ts
```

Inventory can use simple in-memory state plus save sync.

## 10. Hotbar System

Responsible for:

- 5 visible slots.
- Selected slot.
- Placeable item selection.
- Touch/click selection.

Suggested file:

```text
src/inventory/Hotbar.ts
```

Requirements:

- Hotbar must be readable on mobile.
- Selected slot must be obvious.

## 11. Crafting System

Responsible for:

- Recipe definitions.
- Requirement checking.
- Puzzle gate.
- Craft output.
- UI integration.

Suggested files:

```text
src/crafting/recipeDefinitions.ts
src/crafting/CraftingSystem.ts
src/ui/CraftingPanel.ts
```

Recipe data example:

```ts
interface Recipe {
  id: string;
  outputItem: string;
  outputQuantity: number;
  ingredients: Record<string, number>;
  requiresPuzzle?: string;
}
```

## 12. Quest System

Responsible for:

- Quest state.
- Quest objectives.
- Quest transitions.
- Dialogue trigger rules.
- Completion conditions.

Suggested files:

```text
src/quest/questDefinitions.ts
src/quest/QuestStore.ts
src/quest/QuestSystem.ts
```

Quest states for bridge quest:

- not_started
- started
- resources_needed
- puzzle_ready
- puzzle_completed
- bridge_crafted
- bridge_built
- completed

## 13. Puzzle System

Responsible for:

- Puzzle definitions.
- User answer.
- Validation.
- Hint triggers.
- Completion event.

Suggested files:

```text
src/puzzle/puzzleDefinitions.ts
src/puzzle/PuzzleSystem.ts
src/ui/PuzzlePanel.ts
```

Puzzle must be visual and simple.

## 14. NPC/Dialogue System

Responsible for:

- NPC data.
- Interaction prompt.
- Dialogue text.
- Dialogue progression.
- Quest start/completion.

Suggested files:

```text
src/npc/NPC.ts
src/npc/npcDefinitions.ts
src/dialogue/DialogueSystem.ts
src/ui/DialogueBox.ts
```

## 15. Companion System

Responsible for:

- Bimo display.
- Bimo hints.
- Bimo success messages.
- Optional follow behavior.

Suggested files:

```text
src/companion/Bimo.ts
src/companion/BimoDialogue.ts
```

Prototype Bimo can be a floating glowing sphere.

## 16. Area Unlock System

Responsible for:

- Locked zone state.
- Bridge completion detection.
- Unlocking area.
- Visual barrier removal.

Suggested file:

```text
src/world/AreaUnlockSystem.ts
```

## 17. Save/Load System

Responsible for:

- Serializing game state.
- Writing to localStorage.
- Loading saved state.
- Resetting progress.

Suggested file:

```text
src/save/SaveSystem.ts
```

Save data:

```ts
interface SaveData {
  version: number;
  playerPosition: { x: number; y: number; z: number };
  inventory: Record<string, number>;
  questStates: Record<string, string>;
  placedBlocks: Array<{ type: string; x: number; y: number; z: number }>;
  removedBlocks: Array<{ x: number; y: number; z: number }>;
  unlockedAreas: string[];
  completedPuzzles: string[];
}
```

## 18. UI System

Responsible for:

- HUD
- Hotbar
- Inventory panel
- Crafting panel
- Dialogue box
- Puzzle panel
- Action buttons
- Debug overlay

Use HTML/CSS overlay instead of rendering UI inside Three.js.

## 19. Performance/Debug System

Responsible for:

- Optional FPS display.
- Block count display.
- Draw call approximation if available.
- Device mode indicator.
- Low graphics toggle.

Suggested file:

```text
src/debug/DebugOverlay.ts
```

## 20. Implementation Order

Build systems in this order:

1. App bootstrap
2. Scene
3. Camera
4. Player
5. Voxel world
6. Targeting
7. Block break/place
8. Inventory
9. Hotbar
10. NPC/dialogue
11. Quest
12. Crafting
13. Puzzle
14. Bimo
15. Unlock area
16. Save/load
17. Mobile polish
18. Performance pass
