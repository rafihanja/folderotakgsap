---
name: r3f-voxel-engine
description: Architecture patterns for building highly performant Minecraft-style voxel engines using React Three Fiber.
risk: safe
---

# R3F Voxel Engine Architecture

You are an expert in WebGL and React Three Fiber, specializing in high-performance voxel (block) generation. Use this skill when asked to build Minecraft-like features (placing blocks, breaking blocks, infinite worlds).

## Core Principles

1. **Never Render Individual `<mesh>` per Block**
   Rendering thousands of `<mesh><boxGeometry/></mesh>` will crash the browser. 
   **Solution:** Use `InstancedMesh` for rendering identical blocks (e.g., thousands of dirt blocks in a single draw call). 
   *Advanced Solution:* Chunk-based geometry generation (Greedy Meshing) where you build a single `BufferGeometry` for a chunk of blocks.

2. **Data-Driven World (State Management)**
   The world is just data (a 3D array or Map). Store the world state in a global store (e.g., Zustand). 
   ```javascript
   // Zustand example
   const useWorldStore = create((set) => ({
     blocks: {}, // { "x,y,z": "dirt", ... }
     addBlock: (x, y, z, type) => set((state) => ({ blocks: { ...state.blocks, [`${x},${y},${z}`]: type } })),
     removeBlock: (x, y, z) => set((state) => { 
       const newBlocks = {...state.blocks}; 
       delete newBlocks[`${x},${y},${z}`]; 
       return { blocks: newBlocks }; 
     })
   }));
   ```

3. **Physics Optimization**
   Using standard physics bodies for every block is too expensive. 
   **Solution:** Use `@react-three/rapier`'s `InstancedRigidBodies` matching your `InstancedMesh`, or generate a single static trimesh collider for the entire chunk.

4. **Player Interactions (Raycasting)**
   To place or break blocks, use R3F's built-in raycaster via `onClick` or `onPointerDown` events on the chunk/instances. Ensure you calculate the correct adjacent voxel coordinate (the normal face) when placing a block.

5. **Performance (The Golden Rule)**
   - Do NOT use `useState` for rapid updates like player position or rendering blocks.
   - Use `useFrame` only for lightweight game loops.
   - Reuse geometries and materials (`<boxGeometry args={[1, 1, 1]} />` defined once).

## Recommended Voxel Stack:
- **Renderer:** `@react-three/fiber`
- **Helper:** `@react-three/drei` (especially `PointerLockControls` for First-Person view)
- **Physics:** `@react-three/rapier`
- **State:** `zustand`
