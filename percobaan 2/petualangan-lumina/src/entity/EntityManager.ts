import { Vector3, Object3D, Scene } from 'three';
import { gameConfig } from '../config/gameConfig';

export interface BaseEntity {
  id: string;
  mesh: Object3D;
  update: (deltaTime: number, playerPos: Vector3) => void;
  destroy: () => void;
}

export class EntityManager {
  private entities: Map<string, BaseEntity> = new Map();
  private scene: Scene;

  constructor(scene: Scene) {
    this.scene = scene;
  }

  public addEntity(entity: BaseEntity) {
    this.entities.set(entity.id, entity);
    this.scene.add(entity.mesh);
  }

  public removeEntity(id: string) {
    const entity = this.entities.get(id);
    if (entity) {
      entity.destroy();
      this.scene.remove(entity.mesh);
      this.entities.delete(id);
    }
  }

  public update(deltaTime: number, playerPos: Vector3) {
    this.entities.forEach(entity => {
      // Distance-based culling / throttling
      const distance = entity.mesh.position.distanceTo(playerPos);
      
      if (distance > gameConfig.entities.maxUpdateDistance) {
        // Skip update if too far
        return;
      }
      
      entity.update(deltaTime, playerPos);
    });
  }
}
