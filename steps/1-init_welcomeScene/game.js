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
