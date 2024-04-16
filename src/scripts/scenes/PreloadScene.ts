import objectsJson from '../../assets/sprites/objects.json';
import objectsPng from '../../assets/sprites/objects.png';
import tilemapJson from '../../assets/sprites/tilemap.json';
import tilesetPng from '../../assets/sprites/tileset.png';
import LoadingBar from '../classes/LoadingBar';

class PreloadScene extends Phaser.Scene {
  public LoadingBar!: LoadingBar;

  constructor() {
    super('Preload');
  }

  preload() {
    this.add.sprite(0, 0, 'bg').setOrigin(0);
    this.LoadingBar = new LoadingBar(this);

    this.load.spritesheet('tileset', tilesetPng, {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.tilemapTiledJSON('tilemap', tilemapJson);
    this.load.atlas('objects', objectsPng, objectsJson);
  }

  create() {
    this.scene.start('Start');
  }
}

export default PreloadScene;
