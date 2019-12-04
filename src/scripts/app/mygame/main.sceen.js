
export class MainScene extends Phaser.Scene {
  constructor() {
    super('mainGame');

    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.heroes = ['red', 'matilda', 'bomb', 'chuck'];
  }

  preload() {
    // this.load.image('balance_txt', '/images/mygame/balance.png');
    // this.load.image('bet_txt',  '/images/mygame/bet.png');
    this.load.image('card1', '/images/mygame/card1.png');
    this.load.image('card2', '/images/mygame/card2.png');
    this.load.image('card3', '/images/mygame/card3.png');
    this.load.image('card4', '/images/mygame/card4.png');
    this.load.image('card1_hovered', '/images/mygame/card1_hovered.png');
    this.load.image('card2_hovered', '/images/mygame/card2_hovered.png');
    this.load.image('card3_hovered', '/images/mygame/card3_hovered.png');
    this.load.image('card4_hovered', '/images/mygame/card4_hovered.png');
    this.load.image('red', '/images/mygame/red.png');
    this.load.image('matilda', '/images/mygame/matilda.png');
    this.load.image('bomb', '/images/mygame/bomb.png');
    this.load.image('chuck', '/images/mygame/chuck.png');
  }

  create() {
    this.background = this.add.image(this.width / 2, this.height / 2, 'background');
    // this.add.image(100, 200, 'balance_txt').setOrigin(0);
    // this.add.image(100, 300, 'bet_txt').setOrigin(0);

    this.initCards();
    
    this.heroes.forEach((_, index) => {
      const cardName = `card${index+1}`;

      this.anims.create({
        key: `${cardName}over`,
        frames: [
          { key: cardName},
          { key: `${cardName}_hovered`}
        ],
        frameRate: 10,
        ease: 'Sine.easeOut'
      });

      this.anims.create({
        key: `${cardName}out`,
        frames: [
          { key: `${cardName}_hovered`},
          { key: cardName}
        ],
        frameRate: 10,
        ease: 'Sine.easeOut'
      })
    });
  }
  
  initCards() {
    this.cards = this.add.group();
    // TODO may be make with load spritesheet
    this.cards.add(this.add.sprite(-400, this.height - 200, 'card1'));
    this.cards.add(this.add.sprite(-400, this.height - 200, 'card2'));
    this.cards.add(this.add.sprite(-400, this.height - 200, 'card3'));
    this.cards.add(this.add.sprite(-400, this.height - 200, 'card4'));

    this.cards.getChildren().forEach((card, index) => {
      card.scaleX = 0.5; 
      card.scaleY = 0.5;
      card.setInteractive();
      
      card.on('pointerover', () => {
        //set frame card.setFrame(index)
        card.play(`card${index + 1}over`);
      })
      card.on('pointerout', () => {
        card.play(`card${index + 1}out`);
      });
      //we can animate all the cards here
      this.tweens.add({
        targets: card,
        x: {
          value: 100 + 220*(index + 1),
          ease: 'Sine.easeOut',
          duration: 400
        },
        onComplete: () => {
          this.initHero(index);
        }
      })
    });
  }

  initHero(index) {
    const hero = this.add.image(100 + 220 * (index + 1), this.height - 200, this.heroes[index]);
    hero.alpha = 0;
    hero.angle = Phaser.Math.Between(-15, 15);
    hero.scaleX = 0.5; 
    hero.scaleY = 0.5;
    this.wiggleHero(hero, Phaser.Math.Between(500, 800));
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
      },
      alpha: {
        value: {
          from: 0,
          to: 1,
          ease: 'Linear',
          duration: 300
        }
      }
    });
  }
}