import 'phaser';

export class Scene1 extends Phaser.Scene {
  constructor() {
    super('bootGame')
  }

  preload() {
    this.load.image('background', '/images/example2/images/starbackground.jpg');
    this.load.image('ship', '/images/example2/images/ship.png');
    this.load.image('ship2', '/images/example2/images/ship2.png');
    this.load.image('ship3', '/images/example2/images/ship3.png')
  }

  create() {
    this.add.text(30, 100, "Loading game...", {fill: '#fff', fontFamily: 'cursive'});
    this.scene.start('playGame');
  }

  update() {

  }
}
