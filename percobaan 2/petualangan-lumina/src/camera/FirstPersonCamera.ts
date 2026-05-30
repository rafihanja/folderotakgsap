import { Camera, Vector3, MathUtils, Object3D, Euler } from 'three';
import { gameConfig } from '../config/gameConfig';

export class FirstPersonCamera {
  public camera: Camera;
  private target: Object3D | null = null;

  // Rotation states
  private yaw = 0; // horizontal rotation
  private pitch = 0; // vertical rotation (radians)

  constructor(camera: Camera) {
    this.camera = camera;
    // Set initial rotation order to YXZ for FPS style look around
    this.camera.rotation.order = 'YXZ';
  }

  public setTarget(target: Object3D) {
    this.target = target;
    // Align camera rotation with target's initial rotation
    const euler = new Euler().setFromQuaternion(target.quaternion, 'YXZ');
    this.yaw = euler.y;
    this.pitch = 0;
  }

  public processInputDeltas(deltaX: number, deltaY: number) {
    if (deltaX === 0 && deltaY === 0) return;

    this.yaw -= deltaX * gameConfig.camera.yawSensitivity;
    this.pitch -= deltaY * gameConfig.camera.pitchSensitivity;

    // Clamp pitch to avoid flipping or going under ground
    this.pitch = MathUtils.clamp(this.pitch, gameConfig.camera.minPitch, gameConfig.camera.maxPitch);
  }

  public getForwardVector(): Vector3 {
    // Return a normalized vector pointing horizontally forward relative to the camera
    const forward = new Vector3(0, 0, -1);
    forward.applyEuler(this.camera.rotation);
    forward.y = 0; // Flatten on XZ plane
    return forward.normalize();
  }

  public getRightVector(): Vector3 {
    const right = new Vector3(1, 0, 0);
    right.applyEuler(this.camera.rotation);
    right.y = 0; // Flatten on XZ plane
    return right.normalize();
  }

  public update() {
    if (!this.target) return;

    // Position camera at player's eye level
    const eyePosition = this.target.position.clone();
    eyePosition.y += gameConfig.camera.eyeHeight;
    this.camera.position.copy(eyePosition);

    // Apply rotation
    this.camera.rotation.set(this.pitch, this.yaw, 0, 'YXZ');
  }
}
