var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: {
    preload: preload,
    create: create,
    update: update
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  }
};

var game = new Phaser.Game(config);

function preload () {
  this.load.image('sky', 'http://localhost:9090/images/example1/sky.png');
  this.load.image('ground', 'http://localhost:9090/images/example1/platform.png');
  this.load.image('star', 'http://localhost:9090/images/example1/star.png');
  this.load.image('bomb', 'http://localhost:9090/images/example1/bomb.png');
  this.load.spritesheet('dude', 
      'http://localhost:9090/images/example1/dude.png',
      { frameWidth: 32, frameHeight: 48 }
  );
}

function create () {
  this.add.image(400, 300, 'sky');
  //this.add.image(0, 0, 'sky').setOrigin(0, 0)
  this.add.image(400, 300, 'star');

  platforms = this.physics.add.staticGroup();
  platforms.create(400, 568, 'ground').setScale(2).refreshBody();
  platforms.create(600, 400, 'ground');
  platforms.create(50, 250, 'ground');
  platforms.create(750, 220, 'ground');

  
  player = this.physics.add.sprite(100, 450, 'dude');
  player.setBounce(0.2);
  player.setCollideWorldBounds(true);
 
  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: 'turn',
    frames: [ { key: 'dude', frame: 4 } ],
    frameRate: 20
  });

  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1
  });

  cursors = this.input.keyboard.createCursorKeys();
  this.physics.add.collider(player, platforms);
  // player.body.setGravityY(300)

  cursors = this.input.keyboard.createCursorKeys();
}
// http://phaser.io/tutorials/making-your-first-phaser-3-game/part7
function update () {
  if (cursors.left.isDown) {
    player.setVelocityX(-160);
    player.anims.play('left', true);
  } else if (cursors.right.isDown) {
    player.setVelocityX(160);
    player.anims.play('right', true);
  } else {
    player.setVelocityX(0);
    player.anims.play('turn');
  }

  if (cursors.up.isDown && player.body.touching.down) {
    player.setVelocityY(-330);
  }
}