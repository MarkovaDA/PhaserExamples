import 'phaser';

export class LaunchScene extends Phaser.Scene {
  constructor() {
    super('launchGame')
  }

  preload() {
    this.load.path = '/images/mygame/';
    this.load.image('background', 'background.png');
    this.load.image('play', 'play_btn.png');
    this.load.image('play2', 'play_btn2.png');
    this.load.image('play3', 'play_btn3.png');
    this.load.image('logo', 'logo.png');
  }

  create() {
    this.background = this.add.image(window.innerWidth / 2, window.innerHeight / 2, 'background');
    this.logo = this.add.image(window.innerWidth / 2, -200, 'logo');
    this.input.setDefaultCursor('url(/images/mygame/cursor1.png), pointer');

    this.anims.create({
      key: 'playbtnanim',
      frames: [
        { key: 'play' },
        { key: 'play2' },
        { key: 'play3' }
      ],
      frameRate: 8,
      repeat: -1  
    });

    this.btnStartGame = this.add.sprite(window.innerWidth / 2, window.innerHeight/ 2 + 200, 'play')
    this.btnStartGame.scaleY = 0.8;
    this.btnStartGame.scaleX = 0.8;
    this.btnStartGame.alpha = 0;
    
    this.btnStartGame.setInteractive({
      // cursor: 'url(/images/mygame/cursor1.png), pointer'
    });
    
    this.btnStartGame.on('pointerdown', () => {
      alert('launching new game')
    });
  }

  update() {
    if (this.logo.y < 200) {
      this.logo.y+=10;
    } else if (this.btnStartGame.alpha < 1) {
      this.btnStartGame.alpha += 0.01;
      return;
    } 
    
    if (!this.playing) {
      this.playing = true;
      this.btnStartGame.play('playbtnanim')
    }
  }
}