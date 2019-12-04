import 'phaser';

export class ReelScene extends Phaser.Scene {
  constructor() {
    super('reelScene');
    this.positions = [800, 200, 400, 600];
    this.startReel = this.startReel.bind(this);
    this.stopReel = this.stopReel.bind(this);
  }

  preload() {
    this.load.spritesheet('heroes', '/images/mygame/heroesstripbig.png', {
      frameWidth: 800,
      frameHeight: 200
    });
    this.load.image('btnstart', '/images/mygame/start_btn.png')
  }


  create() {
    this.reel = this.add.group();
    const button = this.add.image(300, 1000, 'btnstart');
    const tile1 = this.add.tileSprite(300, 200, 200, 200, 'heroes');
    const tile2 = this.add.tileSprite(300, 400, 200, 200, 'heroes');
    const tile3 = this.add.tileSprite(300, 600, 200, 200, 'heroes');
    const tile4 = this.add.tileSprite(300, 800, 200, 200, 'heroes');
    
    this.reel.addMultiple([tile1, tile2, tile3, tile4]);
    this.resetPositions();

    button.setInteractive({cursor: 'pointer'});
    button.on('pointerdown', this.startReel);
  }

  startReel() {
    this.resetPositions();
    this.tweens.add({
      targets: this.reel.getChildren(),
      tilePositionX: 0,
      duration: 300,
      ease: 'Linear',
      onStart: this.stopReel
    });

    this.scrollTween = this.tweens.add({
      targets: this.reel.getChildren(),
      tilePositionX: 800,
      duration: 500,
      ease: 'Linear',
      repeat: -1,
      onStart: this.stopReel
    });
  }

  stopReel() {
    setTimeout(() => {
      this.scrollTween.stop();
      this.reel.getChildren().forEach(tile => {
        const index = Phaser.Math.RND.integerInRange(0, this.positions.length);
        const stopX = this.positions[index];
        //to the end
        this.tweens.add({
          targets: tile,
          tilePositionX: 800,
          duration: 600
        });
        //to the target
        this.tweens.add({
          targets: tile,
          tilePositionX: {
            from: 0,
            to: stopX,
            duration: 800
          },
        });
      });
    }, 2000);
  }

  resetPositions() {
    this.reel.getChildren().forEach((tile, index) => tile.tilePositionX = -200 * index);
  }
}