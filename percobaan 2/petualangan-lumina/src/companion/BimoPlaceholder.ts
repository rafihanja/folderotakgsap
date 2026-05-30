import { Scene, Object3D, Mesh, MeshLambertMaterial, SphereGeometry, Vector3 } from 'three';

export class BimoPlaceholder {
  public mesh: Object3D;
  private time: number = 0;
  private targetPos: Vector3 = new Vector3();
  private currentPos: Vector3 = new Vector3();

  constructor(scene: Scene) {
    this.mesh = new Object3D();
    
    const geometry = new SphereGeometry(0.3, 16, 16);
    const material = new MeshLambertMaterial({ 
      color: 0xffd45a,
      emissive: 0xffa500,
      emissiveIntensity: 0.2
    });
    
    const body = new Mesh(geometry, material);
    this.mesh.add(body);
    
    scene.add(this.mesh);
  }

  public update(deltaTime: number, targetPosition: Vector3) {
    this.time += deltaTime;

    // First-person companion positioning
    // We want Bimo to be slightly to the right, slightly forward, and eye-level
    // To do this properly relative to camera direction, we would need camera rotation,
    // but for now, we just stick him near the player position + some offset.
    const idealOffset = new Vector3(1.2, -0.2, -1.5);
    
    // Smooth follow
    this.targetPos.copy(targetPosition).add(idealOffset);
    
    // Lerp towards target
    this.currentPos.lerp(this.targetPos, deltaTime * 3.0);

    // Apply bobbing
    const bob = Math.sin(this.time * 3) * 0.15;
    
    this.mesh.position.copy(this.currentPos);
    this.mesh.position.y += bob;

    // Gentle rotation
    this.mesh.rotation.y += deltaTime * 0.5;
  }
}
