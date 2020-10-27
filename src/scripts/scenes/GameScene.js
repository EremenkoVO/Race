class GameScene extends Phaser.Scene {
  constructor() {
    super("Game");
  }

  preload() {
    this.add.sprite(0, 0, "bg").setOrigin(0);
  }

  create() {}
}

export default GameScene;
