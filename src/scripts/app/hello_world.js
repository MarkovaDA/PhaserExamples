var config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  physics: {
      default: 'arcade',
      arcade: {
          // gravity: { y: 200 }
      }
  },
  scene: {
      preload: preload,
      create: create
  }
};

var game = new Phaser.Game(config);
var domain = 'http://localhost:9090/';

function preload()
{
  this.load.setBaseURL('http://labs.phaser.io');

  this.load.image('sky',  domain + 'images/background.jpg');
  this.load.image('logo', domain + 'images/fire.png');
  this.load.image('red', domain + 'images/play_button.png');
}

function create ()
{
    this.add.image(config.width/2, config.height/2, 'sky');

    var particles = this.add.particles('logo');

    var emitter = particles.createEmitter({
        speed: 100,
        scale: { start: 1, end: 0 },
        blendMode: 'ADD'
    });

    var logo = this.physics.add.image(400, 100, 'red');

    logo.setVelocity(100, 200);
    logo.setBounce(1, 1);
    logo.setCollideWorldBounds(true);

    emitter.startFollow(logo);
}
