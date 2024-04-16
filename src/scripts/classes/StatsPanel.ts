import Stats from './Stats';

export default class StatsPanel {
  private scene: Phaser.Scene;
  private stats: Stats;
  private laps!: Phaser.GameObjects.Text;
  private time!: Phaser.GameObjects.Text;
  private timeLap!: Phaser.GameObjects.Text;
  private timeBestLab!: Phaser.GameObjects.Text;

  constructor(scene: Phaser.Scene, stats: Stats) {
    this.scene = scene;
    this.stats = stats;
    this.laps = this.time = this.timeLap = this.timeBestLab = null!;
    this.create();
  }

  create() {
    const style = {
      font: '24px Arial',
      fill: '#FFFFFF',
    };

    this.laps = this.scene.add
      .text(10, 10, 'Laps: 0/0', style)
      .setScrollFactor(0);
    this.time = this.scene.add
      .text(10, 50, 'Time: 0', style)
      .setScrollFactor(0);
    this.timeLap = this.scene.add
      .text(10, 90, 'Lap time: 0', style)
      .setScrollFactor(0);
    this.timeBestLab = this.scene.add
      .text(10, 130, 'Best lap: 0', style)
      .setScrollFactor(0);
  }

  render() {
    this.laps.setText(`Laps: ${this.stats.lap}/${this.stats.laps}`);
    this.time.setText(`Time: ${this.stats.time.toFixed(2)}`);
    this.timeLap.setText(`Lap time: ${this.stats.timeLap.toFixed(2)}`);
    this.timeBestLab.setText(`Best lap: ${this.stats.timeBestLab.toFixed(2)}`);
  }
}
