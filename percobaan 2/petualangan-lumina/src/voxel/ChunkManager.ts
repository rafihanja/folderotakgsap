import { Object3D, Mesh, BoxGeometry, Vector3 } from 'three';
import { VoxelChunk } from './VoxelChunk';
import { BlockType } from './BlockType';
import { getMaterialForBlock } from './blockMaterials';
import { gameConfig } from '../config/gameConfig';
import type { GridPosition } from './BlockData';

export class ChunkManager {
  private rootObject: Object3D;
  private chunkMeshes: Map<string, Map<string, Mesh>> = new Map();
  private sharedGeometry: BoxGeometry;
  
  private activeChunks: Set<string> = new Set();
  
  constructor(rootObject: Object3D) {
    this.rootObject = rootObject;
    this.sharedGeometry = new BoxGeometry(gameConfig.world.blockSize, gameConfig.world.blockSize, gameConfig.world.blockSize);
  }

  public getChunkKey(cx: number, cz: number): string {
    return `${cx},${cz}`;
  }

  public updateActiveChunks(playerPos: Vector3, renderDistance: number) {
    const pCX = Math.floor(playerPos.x / (gameConfig.world.blockSize * 16));
    const pCZ = Math.floor(playerPos.z / (gameConfig.world.blockSize * 16));
    
    const newActive = new Set<string>();
    
    for (let x = -renderDistance; x <= renderDistance; x++) {
      for (let z = -renderDistance; z <= renderDistance; z++) {
        newActive.add(this.getChunkKey(pCX + x, pCZ + z));
      }
    }
    
    // Hide chunks out of range
    this.activeChunks.forEach(key => {
      if (!newActive.has(key)) {
        this.hideChunk(key);
      }
    });
    
    // Show new chunks
    newActive.forEach(key => {
      if (!this.activeChunks.has(key)) {
        this.showChunk(key);
      }
    });
    
    this.activeChunks = newActive;
  }
  
  private hideChunk(chunkKey: string) {
    const meshMap = this.chunkMeshes.get(chunkKey);
    if (meshMap) {
      meshMap.forEach(mesh => {
        mesh.visible = false;
      });
    }
  }
  
  private showChunk(chunkKey: string) {
    const meshMap = this.chunkMeshes.get(chunkKey);
    if (meshMap) {
      meshMap.forEach(mesh => {
        mesh.visible = true;
      });
    }
  }

  public refreshChunkMesh(chunkKey: string, chunk: VoxelChunk) {
    if (!this.chunkMeshes.has(chunkKey)) {
      this.chunkMeshes.set(chunkKey, new Map());
    }
    const meshMap = this.chunkMeshes.get(chunkKey)!;
    
    // Clear old meshes
    meshMap.forEach(mesh => {
      this.rootObject.remove(mesh);
    });
    meshMap.clear();

    const blocks = chunk.getAllBlocks();
    blocks.forEach(block => {
      this.createMeshForBlock(block.pos, block.type, meshMap);
    });
    
    // If not in active radius, hide immediately
    if (this.activeChunks.size > 0 && !this.activeChunks.has(chunkKey)) {
      this.hideChunk(chunkKey);
    }
  }

  private createMeshForBlock(position: GridPosition, type: BlockType, meshMap: Map<string, Mesh>) {
    const material = getMaterialForBlock(type);
    if (!material) return;

    const mesh = new Mesh(this.sharedGeometry, material);
    mesh.position.copy(this.gridToWorld(position));
    mesh.userData = { gridPosition: position, blockType: type };

    const key = `${position.x},${position.y},${position.z}`;
    meshMap.set(key, mesh);
    this.rootObject.add(mesh);
  }

  private gridToWorld(position: GridPosition): Vector3 {
    return new Vector3(
      position.x * gameConfig.world.blockSize,
      position.y * gameConfig.world.blockSize,
      position.z * gameConfig.world.blockSize
    );
  }
}
