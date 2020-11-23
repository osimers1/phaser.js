/*
    Phaser Workshop
*/

//---------- Game Config

window.onload = () =>
{
    const config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 600 },
                debug: false
            }
        },
        scene: [welcomeScene, gameScene]
    };
    const game = new Phaser.Game(config);
    game.scene.start('welcomeScene');
}

//---------- Variables

let player;
let platforms;
let cursors;
let lastDir;
let score = 0;
let scoreText;
let coins;
let gameOver = false;
let bombs;

//---------- Welcome Scene

class welcomeScene extends Phaser.Scene
{
    constructor()
    {
        super({key: 'welcomeScene'});
    }
    preload()
    {
        this.load.image('homeBackground', 'assets/img/homeBackground.png');
        this.load.image('ground', 'assets/img/ground.png');
        this.load.spritesheet('phantom', 'assets/img/phantom.png',
            { frameWidth: 144, frameHeight: 221 }
        );
    }
    create()
    {
        this.add.image(400, 300, 'homeBackground');

        platforms = this.physics.add.staticGroup();
        platforms.create(400, 600, 'ground').setScale(2).refreshBody();

        player = this.physics.add.sprite(70, 500, 'phantom').setScale(0.5).refreshBody();
        player.setBounce(0.2);
        player.setCollideWorldBounds(true);

        this.physics.add.collider(player, platforms);

        cursors = this.input.keyboard.createCursorKeys();

        //---------- Animations

        this.anims.create({
            key: 'standLeft',
            frames: [ { key: 'phantom', frame: 8 } ],
            frameRate: 10
        });
        this.anims.create({
            key: 'standRight',
            frames: [ { key: 'phantom', frame: 9 } ],
            frameRate: 10
        });
        this.anims.create({
            key: 'runLeft',
            frames: this.anims.generateFrameNumbers('phantom', { start: 5, end: 7 }),
            frameRate: 10
        });
        this.anims.create({
            key: 'runRight',
            frames: this.anims.generateFrameNumbers('phantom', { start: 10, end: 12 }),
            frameRate: 10
        });
        this.anims.create({
            key: 'jumpLeft',
            frames: this.anims.generateFrameNumbers('phantom', { start: 2, end: 4 }),
            frameRate: 10
        });
        this.anims.create({
            key: 'jumpRight',
            frames: this.anims.generateFrameNumbers('phantom', { start: 13, end: 15 }),
            frameRate: 10
        });
        this.anims.create({
            key: 'dieLeft',
            frames: this.anims.generateFrameNumbers('phantom', { start: 0, end: 1 }),
            frameRate: 10
        });
        this.anims.create({
            key: 'dieRight',
            frames: this.anims.generateFrameNumbers('phantom', { start: 16, end: 17 }),
            frameRate: 10
        });
    }
    update()
    {
        if (player.body.right === 800)
        {
            this.scene.start('gameScene'); 
        }

        if (cursors.left.isDown)
        {
            lastDir = 'left';
            player.setVelocityX(-200);
            player.anims.play('runLeft', true);
        }
        else if (cursors.right.isDown)
        {
            lastDir = 'right';
            player.setVelocityX(200);
            player.anims.play('runRight', true);
        }
        else if (cursors.up.isDown)
        {
            if (lastDir === 'left')
            {
                player.setVelocityY(-300);
                player.anims.play('jumpLeft', true);
            }
            else if (lastDir === 'right')
            { 
                player.setVelocityY(-300);
                player.anims.play('jumpRight', true);
            }
        }
        else
        {
            player.setVelocityX(0);

            if (lastDir === undefined)
            {
                player.anims.play('standRight', true);
            }
            if (lastDir === 'left')
            {
                player.anims.play('standLeft', true);
            }
            if (lastDir === 'right')
            {
                player.anims.play('standRight', true);
            }
        }
    }
}

//---------- Game Scene

class gameScene extends Phaser.Scene
{
    constructor()
    {
        super({key: 'gameScene'});
    }
    preload()
    {
        this.load.image('lvlBackground', 'assets/img/lvlBackground.png');
        this.load.image('coin', 'assets/img/be-coin.png');
        this.load.image('bomb', 'assets/img/fireball.png');
    }
    create()
    {       
        this.add.image(400, 300, 'lvlBackground');

        platforms = this.physics.add.staticGroup();
        platforms.create(400, 600, 'ground').setScale(2).refreshBody();
        platforms.create(50, 250, 'ground');
        platforms.create(750, 270, 'ground');

        player = this.physics.add.sprite(70, 500, 'phantom').setScale(0.5).refreshBody();
        player.setBounce(0.2);
        player.setCollideWorldBounds(true);

        this.physics.add.collider(player, platforms);

        cursors = this.input.keyboard.createCursorKeys();

        //---------- Gameplay

        scoreText = this.add.text(16, 16, 'Score: ' + score, { fontSize: '32px', fill: '#000' });

        coins = this.physics.add.group({
            key: 'coin',
            repeat: 10,
            setXY: { x: 45, y: 0, stepX: 70 }
        });

        coins.children.iterate((child) => {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        });

        this.physics.add.collider(coins, platforms);
        this.physics.add.overlap(player, coins, collectCoin, null, this);

        bombs = this.physics.add.group();

        this.physics.add.collider(bombs, platforms);
        this.physics.add.overlap(player, bombs, hitBomb, null, this);
    }
    update()
    {
        if (gameOver) {
            if (lastDir === 'left')
            {
                player.anims.play('dieLeft', true);
            }
            else if (lastDir === 'right')
            {
                player.anims.play('dieRight', true);
            }
        }
        else if (cursors.left.isDown)
        {
            lastDir = 'left';
            player.setVelocityX(-200);
            player.anims.play('runLeft', true);
        }
        else if (cursors.right.isDown)
        {
            lastDir = 'right';
            player.setVelocityX(200);
            player.anims.play('runRight', true);
        }
        else if (cursors.up.isDown)
        {
            if (lastDir === 'left')
            {
                player.setVelocityY(-300);
                player.anims.play('jumpLeft', true);
            }
            else if (lastDir === 'right')
            { 
                player.setVelocityY(-300);
                player.anims.play('jumpRight', true);
            }
        }
        else
        {
            player.setVelocityX(0);

            if (lastDir === undefined)
            {
                player.anims.play('standRight', true);
            }
            if (lastDir === 'left')
            {
                player.anims.play('standLeft', true);
            }
            if (lastDir === 'right')
            {
                player.anims.play('standRight', true);
            }
        }          
    }
}
function collectCoin (player, coin)
{
    coin.disableBody(true, true);

    score += 10;
    scoreText.setText('Score: ' + score);

    if (coins.countActive(true) === 0)
    {
        coins.children.iterate((child) => {
            child.enableBody(true, child.x, 0, true, true);
        });

        let x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

        let bomb = bombs.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    }
}
function hitBomb (player, bomb)
{
    this.physics.pause();

    player.setTint(0xff0000);

    gameOver = true;
}
