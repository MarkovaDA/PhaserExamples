import { Scene1 } from './scene1';
import { Scene2 } from './scene2';
import 'phaser';

const config = {
  width: 960,
  height: 640,
  scene: [Scene1, Scene2],
  physics: {
    default: "arcade",
    arcade:{
      debug: false
    }
  }
}

const game = new Phaser.Game(config);