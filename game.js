var config = {
    type: Phaser.AUTO,
    width: 600,
    height: 300,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload() {
    this.load.image('peppa', 'peppa.png')
    this.load.image('bird', 'bird.png')
    this.load.image('gameover', 'gameover.png')
    this.load.image('t', 't.png')
    this.load.image('mario', 'mario.png')
    this.load.image('win', 'win.png')
}

function create() {
    this.peppa = this.physics.add.sprite(500, 300, 'peppa');
    this.peppa.setScale(0.5).refreshBody();
    this.peppa.setCollideWorldBounds(true);

    this.bird = this.physics.add.sprite(-100, 100, 'bird');
    this.bird.setScale(0.5).refreshBody();
    this.bird.setCollideWorldBounds(false);
    this.bird.setBounce(0.5);
    this.bird.setGravity(200, -270)

    this.physics.add.collider(this.peppa, this.bird, function (peppa, bird) {
        console.log('hit')
        bird.setGravity(0, 200)
        bird.setCollideWorldBounds(true);
        this.gameover.setVisible(true)
        bird.setBounce(0);
        peppa.setRotation(90)
    }, null, this);

    this.t = this.add.image(300, 300, 't').setScale(0.5);
    this.t.setInteractive();
    this.t.on('pointerdown', function (pointer) {
        this.mario.setGravity(0, -2000);
    }, this)
    this.t.setDepth(1)

    this.gameover = this.add.image(300, 150, 'gameover');
    this.gameover.setVisible(false);
    this.gameover.setInteractive();
    this.gameover.on('pointerdown', function (pointer) {
        this.scene.restart();
    }, this)

    this.win = this.add.image(300, 150, 'win');
    this.win.setVisible(false);
    this.win.setInteractive();
    this.win.on('pointerdown', function (pointer) {
        this.scene.restart();
    }, this)

    this.mario = this.physics.add.sprite(300, 270, 'mario');
    this.mario.setScale(0.3).refreshBody();
    this.mario.setGravity(0, -300);
    this.mario.setBounce(0.5);

    this.physics.add.collider(this.mario, this.bird, function (mario, bird) {
        console.log('hit')
        bird.setGravity(0, 200)
        bird.setBounce(0);
        bird.setRotation(90)
        this.mario.setGravity(0, 300);
        this.mario.setCollideWorldBounds(false);
        this.win.setVisible(true)
    }, null, this);
}

function update() {
}