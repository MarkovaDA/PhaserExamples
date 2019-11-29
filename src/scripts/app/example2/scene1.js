import 'phaser';

export class Scene1 extends Phaser.Scene {
  constructor() {
    super('bootGame')
  }

  preload() {
    this.load.image('background', '/images/example2/images/starbackground.jpg');

    this.load.spritesheet('ship', '/images/example2/spritesheets/ship.png', {
      frameWidth: 16,
      frameHeight: 16
    });

    this.load.spritesheet('ship2', '/images/example2/spritesheets/ship2.png', {
      frameWidth: 32,
      frameHeight: 16
    });

    this.load.spritesheet('ship3', '/images/example2/spritesheets/ship3.png', {
      frameWidth: 32,
      frameHeight: 32
    });

    this.load.spritesheet('explosion', '/images/example2/spritesheets/explosion.png', {
      frameWidth: 16,
      frameHeight: 16
    });

    this.load.spritesheet("power-up", "/images/example2/spritesheets/power-up.png",{
      frameWidth: 16,
      frameHeight: 16
    });
  }

  create() {
    this.add.text(30, 100, "Loading game...", {fill: '#fff', fontFamily: 'cursive'});
    this.scene.start('playGame');
  }

  update() {

  }
}
