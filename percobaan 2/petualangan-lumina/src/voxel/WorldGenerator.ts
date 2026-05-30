import { VoxelWorld } from './VoxelWorld';
import { BlockType } from './BlockType';
import { gameConfig } from '../config/gameConfig';

export class WorldGenerator {
  private world: VoxelWorld;

  constructor(world: VoxelWorld) {
    this.world = world;
  }

  public generateExpandedMap() {
    const size = gameConfig.world.mapSize; // 96
    const half = size / 2;

    for (let x = -half; x < half; x++) {
      for (let z = -half; z < half; z++) {
        this.generateColumn(x, z);
      }
    }

    this.generateDecorations();
    this.world.refreshDirtyChunks();
  }

  private generateColumn(x: number, z: number) {
    let surfaceY = 2; // Default flat

    // Zone E: River / Water
    if (x > 10 && x < 20) {
      // Winding river
      const curve = Math.sin(z * 0.1) * 5;
      if (Math.abs(x - (15 + curve)) < 3) {
        surfaceY = 0;
        this.world.setBlock({ x, y: 0, z }, BlockType.Sand);
        this.world.setBlock({ x, y: 1, z }, BlockType.Water);
        return;
      }
    }

    // Zone A: Start area (flat)
    if (Math.abs(x) < 10 && Math.abs(z) < 10) {
      surfaceY = 2;
    } 
    // Zone D: Stone Ridge
    else if (x < -20 && z > -20 && z < 20) {
      surfaceY = 3 + Math.floor(Math.random() * 3);
      for (let y = 0; y <= surfaceY; y++) {
         this.world.setBlock({ x, y, z }, BlockType.Stone);
      }
      
      // Crystals
      if (Math.random() > 0.8 && surfaceY >= 4) {
         this.world.setBlock({ x, y: surfaceY + 1, z }, BlockType.Crystal);
      }
      return;
    }
    // Zone C: Hills
    else if (z > 20) {
      surfaceY = 2 + Math.floor(Math.abs(Math.sin(x * 0.2) * 3));
    }

    // Clean layers for generic terrain
    for (let y = 0; y <= surfaceY; y++) {
      let block: BlockType = BlockType.Dirt;
      if (y === 0) block = BlockType.Stone;
      if (y === surfaceY) {
        // Sand near river
        if (x >= 10 && x <= 25) {
          block = BlockType.Sand;
        } else {
          block = BlockType.Grass;
        }
      }
      this.world.setBlock({ x, y, z }, block);
    }
  }

  private generateDecorations() {
    // Trees
    for(let wx = -40; wx <= 40; wx++) {
      for(let wz = -40; wz <= 40; wz++) {
        // Don't spawn trees on river or stone ridge
        if (wx > 10 && wx < 25) continue;
        if (wx < -20) continue;

        if (Math.random() > 0.98) { 
          const groundY = this.world.getHighestSolidBlockYAtGrid(wx, wz);
          if (groundY !== null) {
            const y = Math.floor(groundY / gameConfig.world.blockSize) + 1; // Grid Y
            if (this.world.getBlock({x: wx, y: y-1, z: wz}) === BlockType.Grass) {
              this.buildTree(wx, y, wz);
            }
          }
        }
      }
    }

    // Village Hut
    this.buildHut(15, -5, BlockType.Wood);
  }

  private buildTree(wx: number, y: number, wz: number) {
    const treeHeight = 3 + Math.floor(Math.random() * 2);
    for (let ty = 0; ty < treeHeight; ty++) {
      this.world.setBlock({ x: wx, y: y + ty, z: wz }, BlockType.Wood);
    }
    // Leaves (Grass block)
    const topY = y + treeHeight;
    this.world.setBlock({ x: wx, y: topY, z: wz }, BlockType.Grass);
    this.world.setBlock({ x: wx + 1, y: topY - 1, z: wz }, BlockType.Grass);
    this.world.setBlock({ x: wx - 1, y: topY - 1, z: wz }, BlockType.Grass);
    this.world.setBlock({ x: wx, y: topY - 1, z: wz + 1 }, BlockType.Grass);
    this.world.setBlock({ x: wx, y: topY - 1, z: wz - 1 }, BlockType.Grass);
  }

  private buildHut(hx: number, hz: number, material: BlockType) {
    const y = 3;
    for (let x = hx; x < hx + 5; x++) {
      for (let z = hz; z < hz + 5; z++) {
        if (x === hx || x === hx + 4 || z === hz || z === hz + 4) {
          this.world.setBlock({ x, y, z }, material);
          this.world.setBlock({ x, y: y + 1, z }, material);
        } else {
          this.world.setBlock({ x, y: y - 1, z }, BlockType.Wood); // Floor
        }
      }
    }
    // Doorway
    this.world.setBlock({ x: hx + 2, y, z: hz }, BlockType.Air);
    this.world.setBlock({ x: hx + 2, y: y + 1, z: hz }, BlockType.Air);
  }
}
