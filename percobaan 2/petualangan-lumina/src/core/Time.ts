export class Time {
  public deltaTime: number = 0;
  public elapsedTime: number = 0;

  public update(delta: number, elapsed: number) {
    this.deltaTime = delta;
    this.elapsedTime = elapsed;
  }
}
