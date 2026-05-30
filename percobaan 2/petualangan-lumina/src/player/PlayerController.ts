import { Vector3, MathUtils } from 'three';
import { PlayerPlaceholder } from './PlayerPlaceholder';
import { FirstPersonCamera } from '../camera/FirstPersonCamera';
import { VoxelWorld } from '../voxel/VoxelWorld';
import { gameConfig } from '../config/gameConfig';

export class PlayerController {
  private player: PlayerPlaceholder;
  private cameraSys: FirstPersonCamera;
  private world: VoxelWorld;

  constructor(player: PlayerPlaceholder, cameraSys: FirstPersonCamera, world: VoxelWorld) {
    this.player = player;
    this.cameraSys = cameraSys;
    this.world = world;
  }

  public update(deltaTime: number, inputX: number, inputY: number) {
    // 1. Calculate camera-relative movement direction
    const moveDir = new Vector3(0, 0, 0);

    if (Math.abs(inputX) > 0.1 || Math.abs(inputY) > 0.1) {
      const camForward = this.cameraSys.getForwardVector();
      const camRight = this.cameraSys.getRightVector();

      moveDir.addScaledVector(camRight, inputX);
      moveDir.addScaledVector(camForward, inputY);
      moveDir.normalize();
    }

    // 2. Move player
    const speed = gameConfig.player.movementSpeed;
    const moveStep = moveDir.clone().multiplyScalar(speed * deltaTime);
    
    const nextX = this.player.mesh.position.x + moveStep.x;
    const nextZ = this.player.mesh.position.z + moveStep.z;

    // 3. Ground snapping (Voxel height detection)
    const groundY = this.world.getGroundHeightAtWorldPosition(nextX, nextZ);

    if (groundY > -5) { // If there is a valid ground (not void)
      // Allow movement since ground exists
      this.player.mesh.position.x = nextX;
      this.player.mesh.position.z = nextZ;
      
      // Snap exactly to ground surface. The mesh center is groundY + halfHeight.
      const halfHeight = gameConfig.player.height / 2;
      const targetY = groundY + halfHeight;
      
      // Simple lerp for y to make stairs smooth, but snap tightly
      this.player.mesh.position.y = MathUtils.lerp(this.player.mesh.position.y, targetY, 20 * deltaTime);
    }

    // Pass internal updates to player placeholder (like animation offset)
    this.player.update(deltaTime);
  }
}

