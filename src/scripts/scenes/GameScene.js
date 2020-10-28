import Map from "../classes/Map";

class GameScene extends Phaser.Scene {
  constructor() {
    super("Game");
  }

  preload() {
    this.add.sprite(0, 0, "bg").setOrigin(0);
  }

  create() {
    this.map = new Map(this);
  }
}

export default GameScene;
