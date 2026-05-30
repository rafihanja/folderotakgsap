import { PerspectiveCamera, WebGLRenderer } from 'three';

export class Resize {
  private camera: PerspectiveCamera;
  private renderer: WebGLRenderer;

  constructor(camera: PerspectiveCamera, renderer: WebGLRenderer) {
    this.camera = camera;
    this.renderer = renderer;
    window.addEventListener('resize', this.onResize.bind(this));
    this.onResize(); // initial call
  }

  private onResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
  }

  public dispose() {
    window.removeEventListener('resize', this.onResize.bind(this));
  }
}
