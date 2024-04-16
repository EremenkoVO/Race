export default class Stats {
  public scene: Phaser.Scene;
  public laps: number;
  public lap: number;
  public time: number;
  public timeLap: number;
  public timeBestLab: number;
  public timelastLap: number;

  constructor(scene: Phaser.Scene, laps: any) {
    this.scene = scene;
    this.laps = laps;
    this.lap = 1;
    this.time = 0;
    this.timeLap = 0;
    this.timeBestLab = 0;
    this.timelastLap = 0;
  }

  get complete(): boolean {
    return this.lap > this.laps;
  }

  onLapComplete(): void {
    ++this.lap;

    if (this.timeBestLab === 0 || this.timeLap < this.timeBestLab) {
      this.timeBestLab = this.timeLap;
    }

    this.timelastLap = this.timeLap;
    this.timeLap = 0;
  }

  update(dt: number) {
    if (!this.complete) {
      const time = dt / 1000;
      this.time += time;
      this.timeLap += time;
    }
  }
}
