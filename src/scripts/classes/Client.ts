import * as socketIO from 'socket.io-client';

const HOST = 'http://localhost:3000';

export default class Client extends Phaser.Events.EventEmitter {
  public sent: any;
  public master!: boolean;
  private socket: socketIO.Client;

  constructor() {
    super();
  }

  init(): void {
    this.sent = {};
    this.master = false;
    this.socket = socketIO(HOST);
    this.socket.on('connect', () => {
      console.log('client connected');
    });
    this.socket.on('disconnect', () => {
      console.log('client disconnected');
    });

    this.socket.on('gameStart', (data: { master: boolean }): void => {
      if (data && data.master) {
        this.master = data.master;
      }
      this.emit('game');
    });

    this.socket.on('enemyMove', (data: any): void => {
      this.emit('data', data);
    });
  }

  send(data: any): void {
    if (JSON.stringify(data) !== JSON.stringify(this.send)) {
      this.sent = data;
      this.socket.emit('playerMove', data);
    }
  }
}
