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



//---------- Welcome Scene

class welcomeScene extends Phaser.Scene
{
    constructor()
    {
        super({key: 'welcomeScene'});
    }
    preload()
    {
        
    }
    create()
    {


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
