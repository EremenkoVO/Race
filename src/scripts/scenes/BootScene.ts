import bgPng from '../../assets/sprites/bg.png';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload(): void {
    this.load.image('bg', bgPng);
  }

  create(): void {
    this.scene.start('Preload');
  }
}
