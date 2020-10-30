import Phaser from "phaser";
import Map from "../classes/Map";
import Player from "../classes/Player";

const LAPS = 3;

class GameScene extends Phaser.Scene {
  constructor() {
    super("Game");
  }

  init() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  preload() {
    this.add.sprite(0, 0, "bg").setOrigin(0);
  }

  create() {
    this.map = new Map(this);
    this.player = new Player(this, this.map);

    this.cameras.main.setBounds(
      0,
      0,
      this.map.tilemap.widthInPixels,
      this.map.tilemap.heightInPixels,
    );
    this.cameras.main.startFollow(this.player.car);

    this.player.car.on("lap", this.onLapComplete, this);
    this.matter.world.on("collisionactive", (event, a, b) => {
      if (
        b.gameObject === this.player.car &&
        a.gameObject.frame.name === "oil"
      ) {
        this.player.slide();
      }
    });
  }

  onLapComplete(lap) {
    if (lap > LAPS) {
      this.scene.restart();
    }
  }

  update() {
    this.player.move();
  }
}

export default GameScene;
