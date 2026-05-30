import { Vector3, Object3D, Mesh, BoxGeometry, MeshBasicMaterial, Group } from 'three';
import type { BaseEntity } from './EntityManager';
import { VoxelWorld } from '../voxel/VoxelWorld';

export type AnimalType = 'bird' | 'frog' | 'cat';
export const AnimalType = {
  BIRD: 'bird' as AnimalType,
  FROG: 'frog' as AnimalType,
  CAT: 'cat' as AnimalType
};

export class Animal implements BaseEntity {
  public id: string;
  public mesh: Object3D;
  private type: AnimalType;
  private voxelWorld: VoxelWorld;
  
  private velocity: Vector3 = new Vector3();
  private stateTimer: number = 0;
  private state: 'idle' | 'moving' | 'following' = 'idle';
  private color: number;
  
  public isPet: boolean = false;

  constructor(id: string, type: AnimalType, position: Vector3, voxelWorld: VoxelWorld) {
    this.id = id;
    this.type = type;
    this.voxelWorld = voxelWorld;
    
    this.mesh = new Group();
    this.mesh.position.copy(position);

    // Create simple blocky representation based on type
    let size = 0.5;
    this.color = 0xffffff;

    if (type === AnimalType.BIRD) {
      this.color = 0x3498db; // Blue bird
      size = 0.3;
    } else if (type === AnimalType.FROG) {
      this.color = 0x2ecc71; // Green frog
      size = 0.4;
    } else if (type === AnimalType.CAT) {
      this.color = 0xe67e22; // Orange cat
      size = 0.6;
    }

    const geo = new BoxGeometry(size, size, size);
    const mat = new MeshBasicMaterial({ color: this.color });
    const body = new Mesh(geo, mat);
    body.position.y = size / 2;
    this.mesh.add(body);
  }

  public update(deltaTime: number, playerPos: Vector3) {
    this.stateTimer -= deltaTime;

    if (this.isPet && playerPos.distanceTo(this.mesh.position) > 3) {
      this.state = 'following';
    }

    if (this.stateTimer <= 0 && this.state !== 'following') {
      // Pick new random state
      if (Math.random() > 0.5) {
        this.state = 'idle';
        this.velocity.set(0, 0, 0);
        this.stateTimer = 2 + Math.random() * 3;
      } else {
        this.state = 'moving';
        this.stateTimer = 1 + Math.random() * 2;
        
        // Random direction
        const angle = Math.random() * Math.PI * 2;
        const speed = this.type === AnimalType.BIRD ? 3 : 1.5;
        this.velocity.set(Math.cos(angle) * speed, 0, Math.sin(angle) * speed);
      }
    }

    // Apply movement
    if (this.state === 'following') {
      const dir = new Vector3().copy(playerPos).sub(this.mesh.position);
      dir.y = 0;
      if (dir.length() > 3) {
        dir.normalize();
        this.velocity.copy(dir).multiplyScalar(3);
      } else {
        this.state = 'idle';
        this.velocity.set(0, 0, 0);
      }
    }

    if (this.state === 'moving' || this.state === 'following') {
      this.mesh.position.addScaledVector(this.velocity, deltaTime);
      this.mesh.lookAt(this.mesh.position.x + this.velocity.x, this.mesh.position.y, this.mesh.position.z + this.velocity.z);
    }

    // Gravity & Ground collision (naive)
    if (this.type !== AnimalType.BIRD) {
      this.velocity.y -= 9.8 * deltaTime;
      this.mesh.position.y += this.velocity.y * deltaTime;

      const groundY = this.voxelWorld.getGroundHeightAtWorldPosition(this.mesh.position.x, this.mesh.position.z);
      if (this.mesh.position.y < groundY) {
        this.mesh.position.y = groundY;
        this.velocity.y = 0;
        
        // Frog jump
        if (this.type === AnimalType.FROG && this.state === 'moving' && Math.random() > 0.95) {
          this.velocity.y = 4;
        }
      }
    } else {
      // Bird flight behavior (stay above ground)
      const groundY = this.voxelWorld.getGroundHeightAtWorldPosition(this.mesh.position.x, this.mesh.position.z);
      const targetY = groundY + 5;
      this.mesh.position.y += (targetY - this.mesh.position.y) * 2 * deltaTime;
    }
  }

  public destroy() {
    // Cleanup if needed
  }
}
