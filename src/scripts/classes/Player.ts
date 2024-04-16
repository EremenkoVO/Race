const DIRECTIONS = Object.freeze({ BACKWORD: -1, NONE: 0, FORWARD: 1 });
const TURNS = Object.freeze({ LEFT: -1, NONE: 0, RIGHT: 1 });
const SPEED = 10;
const ACCELERATION = 0.5;
const SLIDE_ANGLE = 5;

export default class Player {
  private scene: Phaser.Scene;
  public map: any;
  public car: Phaser.Physics.Matter.Sprite;
  private _velocity: number;
  private checpoint: number;

  constructor(
    scene: Phaser.Scene,
    map: any,
    config: { position: string; sprite: string },
  ) {
    this.scene = scene;
    this.map = map;
    const position = this.map.getPlayerPosition(config.position);
    this.car = this.scene.matter.add.sprite(
      position.x,
      position.y,
      'objects',
      config.sprite,
    ) as Phaser.Physics.Matter.Sprite;
    this.car.setFixedRotation();
    this._velocity = 0;
    this.checpoint = 0;
  }

  get direction(): number {
    let direction: number = DIRECTIONS.NONE;

    if (
      this.scene.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
        .isDown
    ) {
      direction = DIRECTIONS.FORWARD;
    } else if (
      this.scene.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)
        .isDown
    ) {
      direction = DIRECTIONS.BACKWORD;
    }

    return direction;
  }

  get velocity(): number {
    const speed = Math.abs(this._velocity);
    const max = this.getMaxSpeed();

    if (this.direction && speed < max) {
      this._velocity += ACCELERATION * Math.sign(this.direction);
    } else if (
      (this.direction && speed > max) ||
      (!this.direction && speed > 0)
    ) {
      this._velocity -= ACCELERATION * Math.sign(this._velocity);
    }

    return this._velocity;
  }

  get turn(): number {
    let turn: number = TURNS.NONE;

    if (
      this.scene.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        .isDown
    ) {
      turn = TURNS.LEFT;
    } else if (
      this.scene.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        .isDown
    ) {
      turn = TURNS.RIGHT;
    }

    return turn;
  }

  get angle(): number {
    return this.car.angle + (this.turn * SPEED) / 2;
  }

  getVelocityFromAngle(): Phaser.Math.Vector2 {
    const vec2 = new Phaser.Math.Vector2();
    return vec2.setToPolar(this.car.rotation - Math.PI / 2, this.velocity);
  }

  getMaxSpeed(): number {
    return SPEED * this.map.getTileFriction(this.car);
  }

  slide(): void {
    this.car.angle += SLIDE_ANGLE;
  }

  move(): void {
    this.car.setAngle(this.angle);
    const velocity = this.getVelocityFromAngle();
    this.car.setVelocity(velocity.x, velocity.y);
    this.checkPositions();
  }

  checkPositions(): void {
    const checpoint = this.map.getCheckpoint(this.car);
    if (checpoint) {
      this.onCheckpoint(checpoint);
    }
  }

  onCheckpoint(checpoint: number) {
    if (checpoint === 1 && this.checpoint === this.map.checkpoints.length) {
      this.checpoint = 1;
      this.car.emit('lap');
    } else if (checpoint === this.checpoint + 1) {
      ++this.checpoint;
    }
  }
}
