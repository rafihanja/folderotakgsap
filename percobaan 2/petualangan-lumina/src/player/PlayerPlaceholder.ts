import { Scene, Object3D, CapsuleGeometry, MeshLambertMaterial, Mesh, BoxGeometry } from 'three';

export class PlayerPlaceholder {
  public mesh: Object3D;

  constructor(scene: Scene) {
    this.mesh = new Object3D();
    
    // Body (Capsule) height 1.6
    const geometry = new CapsuleGeometry(0.35, 0.9, 4, 8);
    const material = new MeshLambertMaterial({ color: 0x2f80ed });
    const body = new Mesh(geometry, material);
    body.position.y = 0.8; // center is at half height
    this.mesh.add(body);

    // Forward marker (Nose/Visor) to show direction (Dark blue cube)
    const markerGeom = new BoxGeometry(0.3, 0.2, 0.3);
    const markerMat = new MeshLambertMaterial({ color: 0x1b4f8a });
    const marker = new Mesh(markerGeom, markerMat);
    marker.position.set(0, 1.1, 0.3); // Positioned at eye level, facing +Z
    this.mesh.add(marker);

    // Position in center of world
    this.mesh.position.set(0, 0, 0);
    
    // Hide mesh for First-Person view, but keep object for position/collision
    this.mesh.visible = false;
    
    scene.add(this.mesh);
  }

  public update(_deltaTime: number) {
    // Placeholder for future movement logic
  }
}
