import { gameConfig } from '../config/gameConfig';

export class PerformanceManager {
  private frameCount: number = 0;
  private lastFpsTime: number = 0;
  private currentFps: number = 0;
  private fpsHistory: number[] = [];
  private averageFps: number = 30;
  
  private adaptiveCheckTimer: number = 0;
  
  public isLowEndMode: boolean;
  public currentRenderDistance: number;
  public currentEntityUpdateDistance: number;

  constructor() {
    this.isLowEndMode = gameConfig.performance.lowEndMode;
    this.currentRenderDistance = gameConfig.world.activeChunkRadius;
    this.currentEntityUpdateDistance = gameConfig.performance.adaptiveQuality.maxEntityUpdateDistance;
    this.lastFpsTime = performance.now();
    
    // Fill history with target FPS to avoid sudden drops at start
    for (let i = 0; i < 5; i++) {
      this.fpsHistory.push(gameConfig.performance.targetFps);
    }
  }

  public update(deltaTime: number) {
    this.frameCount++;
    const now = performance.now();
    
    // Calculate FPS every second
    if (now - this.lastFpsTime >= 1000) {
      this.currentFps = Math.round((this.frameCount * 1000) / (now - this.lastFpsTime));
      this.frameCount = 0;
      this.lastFpsTime = now;
      
      // Update rolling average
      this.fpsHistory.push(this.currentFps);
      if (this.fpsHistory.length > 5) {
        this.fpsHistory.shift();
      }
      
      this.averageFps = Math.round(
        this.fpsHistory.reduce((a, b) => a + b, 0) / this.fpsHistory.length
      );
    }

    if (gameConfig.performance.adaptiveQuality.enabled) {
      this.adaptiveCheckTimer += deltaTime;
      const checkInterval = gameConfig.performance.adaptiveQuality.checkIntervalSeconds;
      
      if (this.adaptiveCheckTimer >= checkInterval) {
        this.checkAdaptiveQuality();
        this.adaptiveCheckTimer = 0;
      }
    }
  }

  private checkAdaptiveQuality() {
    const config = gameConfig.performance.adaptiveQuality;
    
    // If struggling
    if (this.averageFps < config.lowFpsThreshold) {
      this.isLowEndMode = true;
      
      // Reduce render distance
      if (this.currentRenderDistance > config.minRenderDistanceChunks) {
        this.currentRenderDistance--;
      }
      
      // Reduce entity update distance
      if (this.currentEntityUpdateDistance > config.minEntityUpdateDistance) {
        this.currentEntityUpdateDistance = Math.max(
          config.minEntityUpdateDistance,
          this.currentEntityUpdateDistance - 5
        );
      }
    } 
    // If thriving
    else if (this.averageFps >= config.recoveryFpsThreshold) {
      // Increase render distance
      if (this.currentRenderDistance < config.maxRenderDistanceChunks) {
        this.currentRenderDistance++;
      }
      
      // Increase entity update distance
      if (this.currentEntityUpdateDistance < config.maxEntityUpdateDistance) {
        this.currentEntityUpdateDistance = Math.min(
          config.maxEntityUpdateDistance,
          this.currentEntityUpdateDistance + 5
        );
      }
    }
  }

  public getCurrentFps(): number {
    return this.currentFps;
  }

  public getAverageFps(): number {
    return this.averageFps;
  }
}
