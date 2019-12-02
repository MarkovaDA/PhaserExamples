
export class MainScene extends Phaser.Scene {
  constructor() {
    super('mainGame')
  }

  preload() {
    //loading my heroes on game field
    this.load.image('hero', '/images/mygame/hero.png');
    this.load.image('hero2', '/images/mygame/hero2.png');
  }

  create() {
    this.background = this.add.image(window.innerWidth / 2, window.innerHeight / 2, 'background');
    this.hero = this.add.image(200, window.innerHeight - 300, 'hero');
    this.hero2 = this.add.image(400, window.innerHeight - 300, 'hero');

    this.group = this.add.group();
    this.group.add(this.hero);
    this.group.add(this.hero2);

    this.group.getChildren().forEach(hero => {
      hero.angle = Phaser.Math.Between(-15, 15);
      this.wiggleHero(hero, Phaser.Math.Between(500, 700));
    });
  }

  wiggleHero(hero, duration) {
    return this.tweens.add({
      targets: hero,
      angle: {
        value: -1* hero.angle,
        ease: 'Linear',
        duration: duration,
        yoyo: true,
        repeat: -1
      }
    });
  }
}