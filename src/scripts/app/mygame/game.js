import { LaunchScene } from './launch.sceen';
import 'phaser';

const config = {
  width: window.innerWidth,
  height: window.innerHeight,
  scene: [LaunchScene],
  physics: {
    default: 'arcade'
  }
}

const game = new Phaser.Game(config);