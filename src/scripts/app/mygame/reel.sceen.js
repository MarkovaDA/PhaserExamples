import 'phaser';

export class ReelScene extends Phaser.Scene {
  constructor() {
    super('reelScene');
  }

  preload() {
    this.load.image('red', '/images/mygame/red.png');
    this.load.image('matilda', '/images/mygame/matilda.png');
    this.load.image('bomb', '/images/mygame/bomb.png');
    this.load.image('chuck', '/images/mygame/chuck.png');
  }

  create() {
    this.reel = this.add.group();
    this.reel.add(this.add.image(600, 400, 'red'));
    this.reel.add(this.add.image(600, 400, 'matilda'));
    this.reel.add(this.add.image(600, 400, 'bomb'));
    this.reel.add(this.add.image(600, 400, 'chuck'));
    
    this.reel.getChildren().forEach((it, index) => it.depth = index);
  }
  
  moveHeroes(index) {
    const children =  this.reel.getChildren();
    const length = children.length;

    if (index < length && index >= 0) {
      this.moveHero(children[index], () => {
        children[index].depth = length - index - 1;
        this.moveHeroes(index - 1);
      });
    } else {
      children.forEach(it => {
        it.alpha = 1;
        it.x = 600;
      });
    }
  }

  moveHero(hero, callback) {
    this.tweens.add({
      targets: hero,
      x: {
        value: 800,
        ease: 'Linear',
        duration: 200
      },
      alpha: {
        value: 0,
        ease: 'Linear',
        duration: 100
      },
      onComplete: callback
    })
  }
}