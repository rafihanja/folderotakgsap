import { Renderer } from './Renderer';
import { SceneManager } from './SceneManager';
import { Time } from './Time';
import { Resize } from './Resize';
import { Game } from './Game';
import { logger } from '../utils/logger';
import { gameConfig } from '../config/gameConfig';

export class App {
  private renderer: Renderer;
  private sceneManager: SceneManager;
  private time: Time;
  private resize: Resize;
  private lastRenderTime: number = 0;
  private game: Game;

  constructor(canvas: HTMLCanvasElement) {
    logger.info('Initializing App Foundation...');

    this.renderer = new Renderer(canvas);
    this.sceneManager = new SceneManager();
    this.time = new Time();
    this.resize = new Resize(this.sceneManager.camera, this.renderer.instance);
    
    this.game = new Game(this.sceneManager);

    // Prevent TS unused warning
    this.resize;

    this.start();
  }

  private start() {
    this.lastRenderTime = performance.now();
    this.loop(this.lastRenderTime);
    logger.info('App loop started');
  }

  private loop(timestamp: number) {
    requestAnimationFrame((ts) => this.loop(ts));

    // Target frame time
    const targetFrameTime = 1000 / gameConfig.performance.targetFps;

    // Check if cap is enabled and if enough time has passed
    if (gameConfig.performance.capFrameRate) {
      if (timestamp - this.lastRenderTime < targetFrameTime) {
        return; // Skip frame
      }
    }

    this.update(timestamp);
  }

  private update(timestamp: number) {
    // Calculate raw delta
    let rawDelta = (timestamp - this.lastRenderTime) / 1000;
    this.lastRenderTime = timestamp;

    // Clamp delta time to avoid large jumps after tab switch
    const clampedDelta = Math.min(rawDelta, gameConfig.performance.maxDeltaTime);
    
    this.time.update(clampedDelta, timestamp / 1000);
    this.game.update(this.time.deltaTime, this.time.elapsedTime);
    this.renderer.instance.render(this.sceneManager.scene, this.sceneManager.camera);
  }
}
