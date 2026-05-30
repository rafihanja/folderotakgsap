import { Scene, PerspectiveCamera } from 'three';

export class SceneManager {
  public scene: Scene;
  public camera: PerspectiveCamera;

  constructor() {
    this.scene = new Scene();
    this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  }
}
