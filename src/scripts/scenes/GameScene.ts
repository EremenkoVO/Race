import Map from '../classes/Map';
import OtherBtns from '../classes/OtherBtns';
import Player from '../classes/Player';
import Stats from '../classes/Stats';
import StatsPanel from '../classes/StatsPanel';
import StatsPopup from '../classes/StatsPopup';

const LAPS = 1;
const CARS = {
  BLUE: {
    sprite: 'car_blue_1',
    position: 'player',
  },
  RED: {
    sprite: 'car_red_1',
    position: 'enemy',
  },
};

export default class GameScene extends Phaser.Scene {
  private client: any;
  private stats!: Stats;
  private statsPanel!: StatsPanel;
  private buttons!: OtherBtns;
  public cursors: Phaser.Types.Input.Keyboard.CursorKeys | null = null;
  public map!: Map;
  public player!: Player;
  public enemy!: Player;
  public statsPopup!: StatsPopup;

  constructor() {
    super('Game');
  }

  init(data: any): void {
    if (data && data.client) {
      this.client = data.client;
    }

    if (this.input.keyboard)
      this.cursors = this.input.keyboard.createCursorKeys();
  }

  preload(): void {
    this.add.sprite(0, 0, 'bg').setOrigin(0);
  }

  getCarsConfig(): any {
    let config = {
      player: CARS.BLUE,
      enemy: CARS.RED,
    };
    if (this.client && !this.client.master) {
      config = {
        player: CARS.RED,
        enemy: CARS.BLUE,
      };
    }
    return config;
  }

  create() {
    this.map = new Map(this);
    this.buttons = new OtherBtns(this);
    const car = this.getCarsConfig();

    this.player = new Player(this, this.map, car.player);

    if (this.client) {
      this.enemy = new Player(this, this.map, car.enemy);
      this.client.on('data', (data: any) => {
        this.enemy.car.setX(data.x);
        this.enemy.car.setY(data.y);
        this.enemy.car.setAngle(data.angle);
      });
    }

    this.stats = new Stats(this, LAPS);
    this.statsPanel = new StatsPanel(this, this.stats);

    this.cameras.main.setBounds(
      0,
      0,
      this.map.tilemap.widthInPixels,
      this.map.tilemap.heightInPixels,
    );
    this.cameras.main.startFollow(this.player.car);

    this.player.car.on('lap', this.onLapComplete, this);
    this.matter.world.on(
      'collisionactive',
      (_event: any, a: any, b: any): void => {
        if (
          b.gameObject === this.player.car &&
          a.gameObject.frame.name === 'oil'
        ) {
          this.player.slide();
        }
      },
    );
  }

  onLapComplete() {
    this.stats.onLapComplete();

    if (this.stats.complete) {
      this.statsPopup = new StatsPopup(this, this.stats);
    }
  }

  update(_time: number, dt: number) {
    this.stats.update(dt);
    this.statsPanel.render();
    this.player.move();
    this.sync();
    if (!this.client) this.buttons.restartBtn();
  }

  sync() {
    if (this.client) {
      this.client.send({
        x: this.player.car.x,
        y: this.player.car.y,
        angle: this.player.car.angle,
      });
    }
  }
}
