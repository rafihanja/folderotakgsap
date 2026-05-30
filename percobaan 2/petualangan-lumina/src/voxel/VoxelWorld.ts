import { Scene, Vector3, Object3D } from 'three';
import { BlockType } from './BlockType';
import type { GridPosition } from './BlockData';
import { VoxelChunk } from './VoxelChunk';
import { gameConfig } from '../config/gameConfig';

import { ChunkManager } from './ChunkManager';
import { WorldGenerator } from './WorldGenerator';

export class VoxelWorld {
  private scene: Scene;
  private rootObject: Object3D;
  private chunks: Map<string, VoxelChunk> = new Map();
  private chunkManager: ChunkManager;
  
  constructor(scene: Scene) {
    this.scene = scene;
    this.rootObject = new Object3D();
    this.rootObject.name = 'VoxelWorldRoot';
    this.scene.add(this.rootObject);
    this.chunkManager = new ChunkManager(this.rootObject);
  }

  public updateChunks(playerPos: Vector3, renderDistance: number = 2) {
    this.chunkManager.updateActiveChunks(playerPos, renderDistance);
  }

  private getChunkKeyForPosition(x: number, z: number): string {
    const cx = Math.floor(x / 16);
    const cz = Math.floor(z / 16);
    return `${cx},${cz}`;
  }

  private getChunk(x: number, z: number): VoxelChunk | undefined {
    return this.chunks.get(this.getChunkKeyForPosition(x, z));
  }

  private getOrCreateChunk(x: number, z: number): VoxelChunk {
    const key = this.getChunkKeyForPosition(x, z);
    if (!this.chunks.has(key)) {
      const cx = Math.floor(x / 16);
      const cz = Math.floor(z / 16);
      this.chunks.set(key, new VoxelChunk(cx, 0, cz));
    }
    return this.chunks.get(key)!;
  }

  public generateStarterMap() {
    // Generate map using WorldGenerator (now handles the logic)
    // The Game class or someone should really call it, but we'll do a simple wrapper here for now if needed.
    // Actually, let's leave this empty or removed, and have Game or VoxelWorld call WorldGenerator directly.
    // I'll keep the method signature but use WorldGenerator here so we don't break Game.ts.
    const generator = new WorldGenerator(this);
    generator.generateExpandedMap();
  }

  // Find the highest solid block y-coordinate at world x, z
  public getGroundHeightAtWorldPosition(x: number, z: number): number {
    const bX = Math.round(x);
    const bZ = Math.round(z);
    
    for (let y = 10; y >= -5; y--) {
      if (this.isSolidBlock({ x: bX, y, z: bZ })) {
        return y + 0.5; 
      }
    }
    
    return -10; // Default ground plane if no block found
  }

  public tryMineBlock(pos: Vector3): BlockType | null {
    const position = this.worldToGrid(pos);
    return this.getBlock(position);
  }

  public getBlock(position: GridPosition): BlockType {
    const chunk = this.getChunk(position.x, position.z);
    if (!chunk) return BlockType.Air;
    return chunk.getBlock(position.x, position.y, position.z);
  }

  public isSolidBlock(position: GridPosition): boolean {
    return this.getBlock(position) !== BlockType.Air;
  }

  public isInsideWorldBounds(position: GridPosition): boolean {
    const half = gameConfig.world.mapSize / 2;
    return position.y >= -10 && position.y <= 15 && 
           position.x >= -half && position.x <= half && 
           position.z >= -half && position.z <= half;
  }

  public setBlock(position: GridPosition, type: BlockType) {
    if (!this.isInsideWorldBounds(position)) return;
    const chunk = this.getOrCreateChunk(position.x, position.z);
    chunk.setBlock(position.x, position.y, position.z, type);
    this.refreshDirtyChunks();
  }

  public removeBlock(position: GridPosition) {
    this.setBlock(position, BlockType.Air);
  }

  public canPlaceBlock(position: GridPosition): boolean {
    const currentBlock = this.getBlock(position);
    return currentBlock === BlockType.Air;
  }

  public getHighestSolidBlockYAtGrid(x: number, z: number): number | null {
    for (let y = 10; y >= -10; y--) {
      if (this.getBlock({ x, y, z }) !== BlockType.Air) {
        return (y * gameConfig.world.blockSize) + (gameConfig.world.blockSize / 2);
      }
    }
    return null; 
  }

  public gridToWorld(position: GridPosition): Vector3 {
    return new Vector3(
      position.x * gameConfig.world.blockSize,
      position.y * gameConfig.world.blockSize,
      position.z * gameConfig.world.blockSize
    );
  }

  public worldToGrid(worldPos: Vector3): GridPosition {
    return {
      x: Math.round(worldPos.x / gameConfig.world.blockSize),
      y: Math.round(worldPos.y / gameConfig.world.blockSize),
      z: Math.round(worldPos.z / gameConfig.world.blockSize)
    };
  }

  public refreshDirtyChunks(): void {
    this.chunks.forEach((chunk, key) => {
      if (chunk.isDirty) {
        this.chunkManager.refreshChunkMesh(key, chunk);
        chunk.isDirty = false;
      }
    });
  }

  public getRootObject(): Object3D {
    return this.rootObject;
  }
}
