import 'phaser';

export class Scene2 extends Phaser.Scene {
  constructor() {
    super("playGame");
    this.width = 960;
    this.height = 640;
  }

  preload() {}

  create() {
    // this.background = this.add.image(0, 0, 'background'); just background image
    this.background = this.add.tileSprite(0, 0, this.width, this.height, 'background');
    this.background.setOrigin(0, 0);

    this.ship1 = this.add.image(this.width / 2 - 300, this.height/2, "ship");
    this.ship2 = this.add.image(this.width / 2, this.height/2, "ship2");
    this.ship3 = this.add.image(this.width / 2 + 300, this.height / 2, "ship3");
  }

  update() {
    this.moveShip(this.ship1, 3);
    this.moveShip(this.ship2, 1);
    this.moveShip(this.ship3, 2);

    this.background.tilePositionY -= 0.5;
  }

  moveShip(ship, speed) {
    ship.y += speed;

    if (ship.y > this.height) {
      this.resetShipPos(ship);
    }
  }

  resetShipPos(ship) {
    ship.y = 0;
    ship.x = Phaser.Math.Between(0, this.width);
  }
}