import Phaser from 'phaser';
import BootScene from './scripts/scenes/BootScene';
import GameScene from './scripts/scenes/GameScene';
import PreloadScene from './scripts/scenes/PreloadScene';
import StartScene from './scripts/scenes/StartScene';

new Phaser.Game({
  type: Phaser.AUTO,
  width: 1280,
  height: 720,
  scene: [BootScene, PreloadScene, GameScene, StartScene],
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: 'matter',
    matter: {
      debug: false,
      gravity: { x: 0, y: 0 },
    },
  },
});
