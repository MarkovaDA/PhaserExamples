import 'phaser';

export class Scene2 extends Phaser.Scene {
  constructor() {
    super("playGame");
    this.width = 960;
    this.height = 640;
  }

  preload() {}

  create() {
    this.background = this.add.tileSprite(0, 0, this.width, this.height, 'background');
    this.background.setOrigin(0, 0);
    this.ship1 = this.add.sprite(this.width / 2 - 300, this.height / 2, "ship");
    this.ship2 = this.add.sprite(this.width / 2, this.height / 2, "ship2");
    this.ship3 = this.add.sprite(this.width / 2 + 300, this.height / 2, "ship3");

    this.anims.create({
      key: "ship1_anim",
      frames: this.anims.generateFrameNumbers("ship"),
      frameRate: 20,
      repeat: -1
    });

    this.anims.create({
      key: "ship2_anim",
      frames: this.anims.generateFrameNumbers("ship2"),
      frameRate: 20,
      repeat: -1
    });

    this.anims.create({
      key: "ship3_anim",
      frames: this.anims.generateFrameNumbers("ship3"),
      frameRate: 20,
      repeat: -1
    });

    this.anims.create({
      key: "explode",
      frames: this.anims.generateFrameNumbers("explosion"),
      frameRate: 20,
      repeat: 0,
      hideOnComplete: true
    });

    this.ship1.play("ship1_anim");
    this.ship2.play("ship2_anim");
    this.ship3.play("ship3_anim");

    this.ship1.setInteractive();
    this.ship2.setInteractive();
    this.ship3.setInteractive();
    
    //this.input.setDefaultCursor('url(/images/example2/images/cursor.png), pointer');
    this.input.on('gameobjectdown', this.destroyShip, this);
    
    this.anims.create({
      key: "red",
      frames: this.anims.generateFrameNumbers("power-up", {
        start: 0,
        end: 1
      }),
      frameRate: 20,
      repeat: -1
    });

    this.anims.create({
      key: "gray",
      frames: this.anims.generateFrameNumbers("power-up", {
        start: 2,
        end: 3
      }),
      frameRate: 20,
      repeat: -1
    });

    // this.powerUps = this.physics.add.group();
    // const maxObjects = 4;
    // for (let i = 0; i <= maxObjects; i++) {
    //   const powerUp = this.physics.add.sprite(16, 16, "power-up");
    //   this.powerUps.add(powerUp);
    //   powerUp.setRandomPosition(0, 0, this.width, this.height);
    //    // set random animation
    //    if (Math.random() > 0.5) {
    //     powerUp.play("red");
    //   } else {
    //     powerUp.play("gray");
    //   }

    //   powerUp.setVelocity(100, 100);
    //   powerUp.setCollideWorldBounds(true);
    //   powerUp.setBounce(1);
    // }    
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

  destroyShip(pointer, gameObject) {
    gameObject.setTexture("explosion");
    gameObject.play("explode");
  }
}