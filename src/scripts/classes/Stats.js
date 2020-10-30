export default class Stats {
  constructor(scene, laps) {
    this.scene = scene;
    this.laps = laps;
    this.lap = 1;
    this.time = 0;
    this.timeLap = 0;
    this.timeBestLab = 0;
    this.timelastLap = 0;
  }

  get complete() {
    return this.lap > this.laps;
  }

  onLapComplete() {
    ++this.lap;

    if (this.timeBestLab === 0 || this.timeLap < this.timeBestLab) {
      this.timeBestLab = this.timeLap;
    }

    this.timelastLap = this.timeLap;
    this.timeLap = 0;
  }

  update(dt) {
    if (!this.complete) {
      const time = dt / 1000;
      this.time += time;
      this.timeLap += time;
    }
  }
}
