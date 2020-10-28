import Phaser from "phaser";
import LoadingBar from "../classes/LoadingBar";
import tilesetPng from "../../assets/sprites/tileset.png";
import tilemapJson from "../../assets/sprites/tilemap.json";
import objectsPng from "../../assets/sprites/objects.png";
import objectsJson from "../../assets/sprites/objects.json";

class PreloadScene extends Phaser.Scene {
  constructor() {
    super("Preload");
  }

  preload() {
    this.add.sprite(0, 0, "bg").setOrigin(0);
    this.LoadingBar = new LoadingBar(this);

    this.load.spritesheet("tileset", tilesetPng, {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.tilemapTiledJSON("tilemap", tilemapJson);
    this.load.atlas("objects", objectsPng, objectsJson);
  }

  create() {
    this.scene.start("Game");
  }
}

export default PreloadScene;
