import { Scene, BoxGeometry, EdgesGeometry, LineBasicMaterial, LineSegments } from 'three';
import { VoxelWorld } from './VoxelWorld';
import type { GridPosition } from './BlockData';
import { gameConfig } from '../config/gameConfig';

export class BlockHighlighter {
  private highlightMesh: LineSegments;

  constructor(scene: Scene) {
    // We use a wireframe edge geometry for a clean look
    const size = gameConfig.world.blockSize * 1.03; // Scale 1.03 to prevent z-fighting
    const geometry = new BoxGeometry(size, size, size);
    const edges = new EdgesGeometry(geometry);
    const material = new LineBasicMaterial({ 
      color: 0xffd84d, 
      linewidth: 2,
      transparent: true,
      opacity: 0.9
    });
    
    this.highlightMesh = new LineSegments(edges, material);
    this.highlightMesh.visible = false;
    scene.add(this.highlightMesh);
  }

  public update(world: VoxelWorld, gridPosition?: GridPosition) {
    if (!gridPosition) {
      this.highlightMesh.visible = false;
      return;
    }

    const worldPos = world.gridToWorld(gridPosition);
    this.highlightMesh.position.copy(worldPos);
    this.highlightMesh.visible = true;
  }
}
