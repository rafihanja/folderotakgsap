export class PerformanceUI {
  private container: HTMLDivElement;
  private fpsText: HTMLSpanElement;

  constructor() {
    this.container = document.createElement('div');
    this.container.id = 'performance-ui';
    
    this.fpsText = document.createElement('span');
    this.fpsText.id = 'fps-text';
    this.fpsText.innerText = 'FPS: --';
    
    this.container.appendChild(this.fpsText);
    document.body.appendChild(this.container);
  }

  public updateFPS(currentFps: number, averageFps: number, isLowEndMode: boolean) {
    this.fpsText.innerText = `FPS: ${currentFps} (Avg: ${averageFps}) ${isLowEndMode ? '[LowEnd]' : ''}`;
  }
}
