import Client from '../classes/Client';

export default class StartScene extends Phaser.Scene {
  private button1!: Phaser.GameObjects.Text;
  private button2!: Phaser.GameObjects.Text;
  private client: any;

  constructor() {
    super('Start');
  }

  create() {
    this.Background();
    this.createButtons();
    this.setEvents();
  }

  Background() {
    this.add.sprite(0, 0, 'bg').setOrigin(0);
  }

  createButtons() {
    this.button1 = this.add
      .text(
        this.cameras.main.centerX,
        this.cameras.main.centerY - 50,
        'ONE PLAYER',
        {
          font: 'bold 46px Arial',
          color: '#FAFAD2',
        },
      )
      .setOrigin(0.5)
      .setInteractive();

    this.button2 = this.add
      .text(
        this.cameras.main.centerX,
        this.cameras.main.centerY + 50,
        'TWO PLAYERS',
        {
          font: 'bold 46px Arial',
          color: '#FAFAD2',
        },
      )
      .setOrigin(0.5)
      .setInteractive();
  }

  setEvents() {
    this.button1.on('pointerdown', this.startGame, this);
    this.button2.on('pointerdown', this.requestGame, this);
  }

  startGame() {
    this.scene.start('Game', { client: this.client });
  }

  requestGame() {
    this.client = new Client();
    this.client.init();
    this.client.on('game', this.startGame, this);
  }
}
