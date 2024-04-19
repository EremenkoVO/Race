export default class OtherBtns {
  private scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  restartBtn() {
    if (
      this.scene.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.R).isDown
    ) {
      this.scene.scene.start('Game');
    }
  }
}
