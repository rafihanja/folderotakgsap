# TECHNICAL_SPEC.md

## 1. Technical Direction

Build Petualangan Lumina as a web-first 3D voxel game prototype.

Correct stack:

- Vite
- TypeScript
- Three.js
- HTML/CSS overlay UI
- Browser local save
- Mobile touch controls
- PWA-ready project structure
- Capacitor-ready structure for future Android packaging

Do not create a Unity project.

## 2. Why Web-First

Web-first is selected because:

- AI coding agents can generate and modify web code directly.
- Prototype can be tested quickly through browser.
- Sharing a URL or local build is easier than installing a native app.
- Mobile browser testing can validate touch controls early.
- The project can later be wrapped as a mobile app if the prototype proves fun.

## 3. Core Dependencies

Recommended dependencies:

```text
vite
typescript
three
```

Optional later:

```text
@vitejs/plugin-basic-ssl
vite-plugin-pwa
@capacitor/core
@capacitor/cli
@capacitor/android
```

Do not add heavy libraries unless needed.

## 4. Rendering Architecture

Use Three.js for 3D rendering.

### Renderer

- WebGLRenderer
- Antialias can be disabled on low-end mode.
- Pixel ratio should be capped.

Recommended:

```ts
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
```

For low mode:

```ts
renderer.setPixelRatio(1);
```

### Scene

- Ambient light.
- One directional light.
- No heavy real-time shadows by default.
- Simple background color or gradient.

### Camera

- Perspective camera.
- Third-person follow camera.
- Mouse/touch drag rotation.

## 5. Voxel Rendering Strategy

For the first prototype, a small block count is acceptable. Begin simple.

### Stage 1

Use individual cube meshes for clarity if block count is very low.

### Stage 2

When block count grows, optimize by:

- Reusing geometries.
- Reusing materials.
- Grouping static blocks.
- Merging geometry.
- Using InstancedMesh for repeated block types.

### Prototype Rule

Do not build complex chunk meshing before the basic game loop works.

## 6. World Data

Represent the world with grid coordinates.

Example:

```ts
interface BlockPosition {
  x: number;
  y: number;
  z: number;
}

interface WorldBlock {
  type: BlockType;
  position: BlockPosition;
  breakable: boolean;
}
```

Use a map key format:

```ts
const key = `${x},${y},${z}`;
```

## 7. Input System

Support both desktop and mobile:

### Desktop

- WASD / arrow movement.
- Mouse drag camera.
- Mouse click / key action for interaction.

### Mobile

- Virtual joystick.
- Touch swipe camera.
- Large action buttons.
- Hotbar touch selection.

Input should be abstracted so player movement does not care whether input comes from keyboard or joystick.

## 8. UI Layer

Use HTML/CSS for UI.

Required UI:

- HUD
- Hotbar
- Inventory panel
- Crafting panel
- Puzzle panel
- Dialogue box
- Quest tracker
- Mobile buttons
- Debug overlay

Do not render UI as 3D text unless needed.

## 9. Game State Management

For prototype, use a lightweight custom store.

No need to install Redux.

Suggested stores:

- InventoryStore
- QuestStore
- SettingsStore
- SaveStore

Use TypeScript interfaces for state.

## 10. Save System

Use localStorage first.

Save format:

```ts
interface SaveData {
  version: number;
  playerPosition: { x: number; y: number; z: number };
  inventory: Record<string, number>;
  questStates: Record<string, string>;
  removedBlocks: Array<{ x: number; y: number; z: number }>;
  placedBlocks: Array<{ type: string; x: number; y: number; z: number }>;
  unlockedAreas: string[];
  completedPuzzles: string[];
}
```

Requirements:

- Save after important actions.
- Load on startup.
- Provide reset progress button.
- Handle corrupted save gracefully.

## 11. Puzzle System

Puzzle must be data-driven.

Example:

```ts
interface PuzzleDefinition {
  id: string;
  type: "material_counting";
  prompt: string;
  correctAnswer: number;
  options: number[];
  hintSteps: string[];
}
```

## 12. Quest System

Quest should be state-machine driven.

Avoid hardcoding all quest logic in UI.

Example:

```ts
type QuestState =
  | "not_started"
  | "started"
  | "resources_ready"
  | "puzzle_completed"
  | "bridge_blocks_ready"
  | "bridge_completed"
  | "completed";
```

## 13. File Modularity Rules

Do not put everything in `main.ts`.

`main.ts` should only initialize the app.

Large systems must live in their own files.

## 14. Build Scripts

Required package scripts:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  }
}
```

Optional later:

```json
{
  "cap:init": "cap init",
  "cap:add:android": "cap add android",
  "cap:sync": "cap sync"
}
```

## 15. Mobile Packaging Future

The prototype does not need Capacitor implementation immediately, but project decisions should not block it.

Future path:

1. Ensure game works well in mobile browser.
2. Add PWA manifest.
3. Add Capacitor.
4. Build Android WebView app.
5. Test on low-end Android devices.

## 16. Browser Compatibility

The prototype should target modern browsers.

Primary test browsers:

- Chrome desktop
- Chrome Android
- Safari iOS later if needed

## 17. Error Handling

Required:

- Missing asset fallback.
- Save parse failure fallback.
- UI should not crash if quest state is unexpected.
- Block interaction should ignore invalid targets.

## 18. Performance Constraints

- Cap pixel ratio.
- Keep world small.
- Reuse materials.
- Avoid excessive object creation per frame.
- Avoid logging every frame.
- Do not allocate large arrays every update.
- Remove event listeners on cleanup if applicable.

## 19. Development Completion Requirements

Technical implementation is acceptable when:

- `npm install` works.
- `npm run dev` starts the game.
- `npm run build` succeeds.
- Project runs in browser.
- Core systems are modular.
- No blocking console errors.
- Mobile UI is present.
- Save/load works.
