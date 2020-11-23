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

    }
    create()
    {       
        

        //---------- Gameplay

       
    }
    update()
    {
                  
    }
}
