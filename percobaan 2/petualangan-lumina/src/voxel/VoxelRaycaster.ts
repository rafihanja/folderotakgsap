import { Raycaster, Vector2, Camera, Vector3 } from 'three';
import type { Intersection } from 'three';
import type { GridPosition } from './BlockData';
import { VoxelWorld } from './VoxelWorld';

export type VoxelHitResult = {
  hit: boolean;
  blockPosition?: GridPosition;
  normal?: Vector3;
  worldPoint?: Vector3;
};

export class VoxelRaycaster {
  private raycaster: Raycaster;
  private pointer: Vector2;

  constructor() {
    this.raycaster = new Raycaster();
    this.pointer = new Vector2(0, 0);
  }

  // pointerX/Y should be normalized device coordinates (-1 to +1)
  public updatePointer(ndcX: number, ndcY: number) {
    this.pointer.x = ndcX;
    this.pointer.y = ndcY;
  }

  public intersectWorld(camera: Camera, world: VoxelWorld): VoxelHitResult {
    this.raycaster.setFromCamera(this.pointer, camera);

    const root = world.getRootObject();
    const intersects: Intersection[] = this.raycaster.intersectObjects(root.children, false);

    if (intersects.length > 0) {
      const firstHit = intersects[0];
      const mesh = firstHit.object;
      
      // We stored the grid position in userData when creating the mesh
      if (mesh.userData && mesh.userData.gridPosition) {
        return {
          hit: true,
          blockPosition: mesh.userData.gridPosition as GridPosition,
          normal: firstHit.face?.normal?.clone(),
          worldPoint: firstHit.point.clone()
        };
      }
    }

    return { hit: false };
  }
}
