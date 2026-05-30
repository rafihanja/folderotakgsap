import { WebGLRenderer } from 'three';
import { gameConfig } from '../config/gameConfig';

export class Renderer {
  public instance: WebGLRenderer;

  constructor(canvas: HTMLCanvasElement | null) {
    this.instance = new WebGLRenderer({
      canvas: canvas || undefined,
      antialias: !gameConfig.performance.lowEndMode,
      powerPreference: 'high-performance'
    });

    // Cap pixel ratio for low-end mobile performance
    this.instance.setPixelRatio(Math.min(window.devicePixelRatio, gameConfig.performance.pixelRatioMax));
    this.instance.setClearColor(0x87d7f5);
    
    // Shadows
    if (gameConfig.performance.enableShadows) {
      this.instance.shadowMap.enabled = true;
    }
  }
}
