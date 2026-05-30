# LOW_END_PERFORMANCE_SPEC.md

## 1. Purpose

This file defines performance rules for low-end mobile browser testing and future mobile app packaging.

The game must be designed for low-end devices from the beginning.

## 2. Performance Target

Primary target:

```text
30 FPS target on low-to-mid mobile devices
```

Prototype should prioritize stable performance over visual effects.

## 3. World Size Limits

For first prototype:

- Small island only.
- Recommended footprint: 32x32 to 48x48 blocks.
- Keep vertical height limited.
- Avoid underground caves in prototype.
- Avoid infinite world.
- Avoid chunk streaming until needed.

## 4. Block Count Rules

Start with low block count.

Recommended initial active blocks:

```text
Under 1,500 visible blocks if using individual meshes.
```

If block count increases, use:

- InstancedMesh
- merged geometry
- material reuse
- visible face optimization later

Do not build a huge world with thousands of individual mesh objects before optimization.

## 5. Renderer Rules

- Cap pixel ratio.
- Use simple background.
- Avoid expensive antialiasing on low mode.
- Do not enable heavy shadow maps by default.
- Avoid post-processing.

Recommended:

```ts
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
```

Low mode:

```ts
renderer.setPixelRatio(1);
```

## 6. Lighting Rules

Use:

- Ambient light.
- One directional light.

Avoid:

- Many dynamic lights.
- Real-time shadows on all objects.
- Complex light calculations.

## 7. Material Rules

Use:

- Shared materials.
- Flat colors.
- Simple MeshStandardMaterial or MeshLambertMaterial.
- Minimal emissive materials.

Avoid:

- Unique material per block.
- Large texture atlases in prototype.
- PBR-heavy materials.
- Transparent materials everywhere.

## 8. Geometry Rules

Use:

- Cube geometry reused.
- Simple player placeholder.
- Simple NPC placeholder.
- Simple Bimo sphere/cube.

Avoid:

- High-poly models.
- Heavy GLB imports.
- Skeletal animation in first prototype.
- Complex collision meshes.

## 9. Physics Rules

Do not add a full physics engine unless absolutely required.

Prototype can use:

- Simple position updates.
- Basic ground height check.
- Simple collision bounds.

Avoid:

- Rigidbodies for every block.
- Physics simulation for resources.
- Complex character controller physics.

## 10. UI Performance

Use HTML/CSS overlay.

Avoid:

- Constantly rebuilding full UI every frame.
- Heavy DOM updates per frame.
- Animated UI everywhere.
- Large image assets.

Update UI only when state changes.

## 11. Memory Rules

Avoid:

- Creating many temporary objects every frame.
- Adding event listeners repeatedly.
- Keeping removed blocks in scene.
- Duplicating large arrays.

Save only required state.

## 12. Mobile Browser Testing

Test on:

- Desktop Chrome.
- Chrome Android.
- At least one low-end or older Android device if available.
- Mobile device in browser remote debugging if possible.

## 13. Graphics Settings

Prototype should include simple settings:

- Low
- Medium

Low mode:

- Pixel ratio 1.
- No shadows.
- Minimal particles.
- Reduced draw distance if implemented.

Medium mode:

- Slightly higher pixel ratio.
- Simple visual polish.

## 14. Debug Overlay

Optional but recommended:

Show:

- FPS estimate.
- Block count.
- Mesh count if available.
- Current graphics mode.
- Save state indicator.

## 15. App Packaging Future

When packaging with Capacitor later:

- Test WebView performance.
- Avoid relying on browser-only features that may behave differently.
- Keep offline support in mind.
- Keep asset size low.

## 16. Acceptance Criteria

Performance is acceptable when:

- Prototype loads without major delay.
- Movement remains responsive.
- Touch controls respond quickly.
- No major frame drops during bridge quest.
- No heavy visual effects are required.
- Game remains usable on mobile browser.
- Code includes clear places to tune performance.
