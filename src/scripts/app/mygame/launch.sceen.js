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
    this.scene.start('mainGame'); //TODO: delete after

    this.background = this.add.image(window.innerWidth / 2, window.innerHeight / 2, 'background');
    this.logo = this.add.image(window.innerWidth / 2, -200, 'logo');
    
    this.input.setDefaultCursor('url(/images/mygame/cursor.png), pointer');

    this.initPlayButton();
    this.animateLogo();
  }

  initPlayButton() {
    this.button = this.add.sprite(window.innerWidth / 2, window.innerHeight + 200, 'play');
    this.button.scaleY = 0.8;
    this.button.scaleX = 0.8;
    this.button.setInteractive();

    this.button.on('pointerdown', () => {
      this.scene.start('mainGame');
    });

    this.anims.create({
      key: 'shining',
      frames: [
        { key: 'play' },
        { key: 'play2' },
        { key: 'play3' }
      ],
      frameRate: 8,
      repeat: -1  
    });
  }

  animateLogo() {
    return this.tweens.add({
      targets: this.logo,
      y: {
        value: 200,
        duration: 300,
        ease: 'Circ.easeOut'
      },
      onComplete: () => {
        this.animatePlayButton();
      }
    });
  }

  animatePlayButton() {
    return this.tweens.add({
      targets: this.button,
      y: {
        value: window.innerHeight / 2 + 200,
        duration: 300,
        ease: 'Linear'
      },
      onComplete: () => {
        this.button.play('shining');
      }
    });
  }
}