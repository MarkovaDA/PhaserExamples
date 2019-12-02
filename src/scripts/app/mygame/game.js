import { LaunchScene } from './launch.sceen';
import { MainScene } from './main.sceen';
import 'phaser';

const config = {
  width: window.innerWidth,
  height: window.innerHeight,
  scene: [ LaunchScene, MainScene ]
}

const game = new Phaser.Game(config);