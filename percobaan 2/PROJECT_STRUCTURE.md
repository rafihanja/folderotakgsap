# PROJECT_STRUCTURE.md

## Required Project Structure

The AI coding agent should create a clean Vite + TypeScript project.

Recommended structure:

```text
petualangan-lumina/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── public/
│   ├── icons/
│   └── manifest.webmanifest
├── src/
│   ├── main.ts
│   ├── app/
│   │   ├── App.ts
│   │   └── GameLoop.ts
│   ├── scene/
│   │   ├── createScene.ts
│   │   ├── createRenderer.ts
│   │   ├── lights.ts
│   │   └── resize.ts
│   ├── camera/
│   │   └── FollowCamera.ts
│   ├── player/
│   │   ├── PlayerController.ts
│   │   ├── PlayerModel.ts
│   │   └── PlayerInputAdapter.ts
│   ├── input/
│   │   ├── KeyboardInput.ts
│   │   ├── TouchInput.ts
│   │   └── InputState.ts
│   ├── voxel/
│   │   ├── blockDefinitions.ts
│   │   ├── blockTypes.ts
│   │   ├── VoxelWorld.ts
│   │   ├── BlockRenderer.ts
│   │   └── BlockTargeting.ts
│   ├── resources/
│   │   └── resourceDefinitions.ts
│   ├── inventory/
│   │   ├── InventoryStore.ts
│   │   └── HotbarStore.ts
│   ├── crafting/
│   │   ├── recipeDefinitions.ts
│   │   └── CraftingSystem.ts
│   ├── quest/
│   │   ├── questDefinitions.ts
│   │   ├── QuestStore.ts
│   │   └── QuestSystem.ts
│   ├── puzzle/
│   │   ├── puzzleDefinitions.ts
│   │   └── PuzzleSystem.ts
│   ├── npc/
│   │   ├── npcDefinitions.ts
│   │   └── NPCSystem.ts
│   ├── companion/
│   │   ├── Bimo.ts
│   │   └── bimoDialogues.ts
│   ├── world/
│   │   ├── createPulauLumina.ts
│   │   └── AreaUnlockSystem.ts
│   ├── save/
│   │   └── SaveSystem.ts
│   ├── ui/
│   │   ├── createUI.ts
│   │   ├── Hud.ts
│   │   ├── HotbarUI.ts
│   │   ├── InventoryPanel.ts
│   │   ├── CraftingPanel.ts
│   │   ├── PuzzlePanel.ts
│   │   ├── DialogueBox.ts
│   │   ├── MobileControls.ts
│   │   └── DebugOverlay.ts
│   ├── config/
│   │   ├── gameplayConfig.ts
│   │   └── performanceConfig.ts
│   ├── styles/
│   │   └── game.css
│   └── types/
│       └── gameTypes.ts
└── docs/
    └── README_DEV.md
```

## Folder Responsibilities

### `app`

Application initialization and main update loop.

### `scene`

Three.js renderer, scene, lights, resize, and root setup.

### `camera`

Third-person follow camera and orbit/swipe behavior.

### `player`

Player mesh/model and movement logic.

### `input`

Keyboard and touch input normalization.

### `voxel`

Block data, rendering, targeting, breaking, placing.

### `inventory`

Inventory and hotbar state.

### `crafting`

Recipe definitions and crafting rules.

### `quest`

Quest definitions and quest state machine.

### `puzzle`

Educational puzzle logic.

### `npc`

NPC positions, interactions, and dialogue triggers.

### `companion`

Bimo behavior and dialogue.

### `world`

Pulau Lumina map generation and area unlock.

### `save`

Local save/load/reset.

### `ui`

HTML/CSS game UI.

### `config`

Tunable values.

### `types`

Shared TypeScript types.

## Code Quality Rules

- Use TypeScript types.
- Avoid circular imports.
- Avoid one-file implementation.
- Keep data definitions separate from behavior where reasonable.
- Use config files for tuning values.
- Do not hardcode all numbers inside UI components.
- Keep UI update functions explicit and predictable.

## Required Documentation

Create `docs/README_DEV.md` with:

- How to install.
- How to run.
- How to build.
- How to test on mobile browser.
- How to reset save.
- Current limitations.
