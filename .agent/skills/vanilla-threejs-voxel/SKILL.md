---
name: vanilla-threejs-voxel
description: Expert patterns for building highly performant voxel engines in pure vanilla Three.js without React.
risk: safe
---

# Vanilla Three.js Voxel Engine Architecture

You are an expert in WebGL and vanilla Three.js, specializing in high-performance voxel (block) generation for low-end mobile devices. Use this skill when building Minecraft-like features in vanilla JS/TS.

## Core Principles

1. **Avoid Individual Meshes for Production Worlds**
   Rendering thousands of `THREE.Mesh` objects with `THREE.BoxGeometry` will kill mobile performance (draw call overload).
   **Solution for Prototypes:** For < 1,500 blocks, `THREE.InstancedMesh` is excellent.
   **Solution for Production:** Chunk-based geometry generation (Greedy Meshing) where you build a single `THREE.BufferGeometry` per chunk.

2. **Greedy Meshing (The Industry Standard)**
   Greedy meshing merges adjacent coplanar faces of the same type into a single, larger quad. This drastically reduces the number of vertices and triangles sent to the GPU.
   - Reference: Mikola Lysenko's "Meshing in a Minecraft Game" (0FPS).
   - *First Step:* Implement **Occlusion Culling** (Hidden Face Culling). Do not render faces that are completely surrounded by solid blocks.

3. **Data-Driven World (Map/Grid)**
   The world is just data. Store it independently from the Three.js scene.
   ```typescript
   // Example lightweight state
   const voxelMap = new Map<string, string>(); // "x,y,z" -> "blockType"
   
   function getBlock(x: number, y: number, z: number) {
       return voxelMap.get(`${x},${y},${z}`);
   }
   ```

4. **Texture Atlases**
   Use a single texture atlas (one large image containing all block textures) and adjust UV coordinates on your geometries. This allows a whole chunk to be drawn in **1 draw call** with 1 material.

5. **Web Workers**
   For large worlds, move the mesh generation and greedy meshing algorithm to a Web Worker. This prevents the main thread from stuttering (frame drops) when a player places or breaks a block.

6. **Low-End Mobile Optimization**
   - Cap pixel ratio: `renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))`
   - Avoid expensive real-time shadow maps for every block.
   - Use `MeshLambertMaterial` or `MeshBasicMaterial` instead of `MeshStandardMaterial` if lighting doesn't need to be PBR.
