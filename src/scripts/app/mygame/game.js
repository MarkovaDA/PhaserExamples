// import { LaunchScene } from './launch.sceen';
// import { MainScene } from './main.sceen';
import { ReelScene } from './reel.sceen';

import 'phaser';

const config = {
  width: window.innerWidth,
  height: window.innerHeight,
  scene: [ ReelScene ]
}

const game = new Phaser.Game(config);