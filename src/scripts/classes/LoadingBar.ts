export default class LoadingBar {
  private scene: any;
  private style: any;
  private progressBox: any;
  private progressBar: any;

  constructor(scene: any) {
    this.scene = scene;
    this.style = {
      boxColor: 0xd3d3d3,
      barColor: 0xfff8dc,
      x: this.scene.game.config.width / 2 - 450,
      y: this.scene.game.config.height / 2 + 250,
      width: 900,
      height: 25,
    };

    this.progressBox = this.scene.add.graphics();
    this.progressBar = this.scene.add.graphics();

    this.showProgressBox();
    this.setEvents();
  }

  setEvents(): void {
    this.scene.load.on('progress', this.showProgressBar, this);
    this.scene.load.on('fileprogress', this.onFileProgress, this);
    this.scene.load.on('complete', this.onLoadComplete, this);
  }

  showProgressBox(): void {
    this.progressBox
      .fillStyle(this.style.boxColor)
      .fillRect(
        this.style.x,
        this.style.y,
        this.style.width,
        this.style.height,
      );
  }
  onFileProgress(): void {}
  onLoadComplete() {
    this.progressBar.destroy();
    this.progressBox.destroy();
  }

  showProgressBar(value: number): void {
    this.progressBar
      .clear()
      .fillStyle(this.style.barColor)
      .fillRect(
        this.style.x,
        this.style.y,
        this.style.width * value,
        this.style.height,
      );
  }
}
