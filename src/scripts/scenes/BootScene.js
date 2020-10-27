import bgPng from "../../assets/sprites/bg.png";

class BootScene extends Phaser.Scene {
  constructor() {
    super("Boot");
  }

  preload() {
    this.load.image("bg", bgPng);
  }

  create() {
    this.scene.start("Preload");
  }
}

export default BootScene;
