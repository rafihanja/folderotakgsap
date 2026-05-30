import { BlockType } from './BlockType';
import type { GridPosition } from './BlockData';

export class VoxelChunk {
  public position: GridPosition;
  public isDirty: boolean;
  private blocks: Map<string, BlockType>;

  constructor(x: number, y: number, z: number) {
    this.position = { x, y, z };
    this.isDirty = true;
    this.blocks = new Map();
  }

  private getKey(x: number, y: number, z: number): string {
    return `${x},${y},${z}`;
  }

  public getBlock(x: number, y: number, z: number): BlockType {
    const key = this.getKey(x, y, z);
    return this.blocks.get(key) || BlockType.Air;
  }

  public setBlock(x: number, y: number, z: number, type: BlockType) {
    const key = this.getKey(x, y, z);
    if (type === BlockType.Air) {
      this.blocks.delete(key);
    } else {
      this.blocks.set(key, type);
    }
    this.isDirty = true;
  }

  public removeBlock(x: number, y: number, z: number) {
    this.setBlock(x, y, z, BlockType.Air);
  }

  public getAllBlocks(): { pos: GridPosition, type: BlockType }[] {
    const result: { pos: GridPosition, type: BlockType }[] = [];
    this.blocks.forEach((type, key) => {
      const [strX, strY, strZ] = key.split(',');
      result.push({
        pos: { x: parseInt(strX, 10), y: parseInt(strY, 10), z: parseInt(strZ, 10) },
        type
      });
    });
    return result;
  }
}
