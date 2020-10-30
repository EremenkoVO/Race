export default class StatsPopap {
  constructor(scene, stats) {
    this.scene = scene;
    this.stats = stats;
    this.create();
  }

  create() {
    const style = {
      font: "30px Arial",
      fill: "#FFFFFF",
    };

    const popupWidth = 800;
    const popupHeight = 600;

    this.popup = this.scene.add
      .graphics()
      .setScrollFactor(0)
      .fillStyle(0x000000, 0.5)
      .fillRect(
        (this.scene.sys.game.config.width - popupWidth) / 2,
        (this.scene.sys.game.config.height - popupHeight) / 2,
        popupWidth,
        popupHeight,
      );

    this.title = this.scene.add
      .text(
        this.scene.cameras.main.centerX,
        this.scene.cameras.main.centerY - 200,
        "Level complete!",
        { font: "46px Arial", fill: "#FAFAD2" },
      )
      .setOrigin(0.5)
      .setScrollFactor(0);

    this.time = this.scene.add
      .text(
        this.scene.cameras.main.centerX,
        this.scene.cameras.main.centerY - 50,
        `Time total: ${this.stats.time.toFixed(2)}`,
        { font: "46px Arial", fill: "#FAFAD2" },
      )
      .setOrigin(0.5)
      .setScrollFactor(0);

    this.timeBestLab = this.scene.add
      .text(
        this.scene.cameras.main.centerX,
        this.scene.cameras.main.centerY + 50,
        `Times best lap: ${this.stats.timeBestLab.toFixed(2)}`,
        style,
      )
      .setOrigin(0.5)
      .setScrollFactor(0);

    this.text = this.scene.add
      .text(
        this.scene.cameras.main.centerX,
        this.scene.cameras.main.centerY + 200,
        "Tap to continue!",
        style,
      )
      .setOrigin(0.5)
      .setScrollFactor(0);

    this.scene.input.once("pointerdown", () => {
      this.scene.scene.start("Game");
    });
  }
}
