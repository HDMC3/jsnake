import { COLORS } from "../constants";
import { Banner } from "../ui/Banner";
import { Button } from "../ui/Button";

export class GameOverScene extends Phaser.Scene {
    score: number;

    constructor(){
        super({
            key: 'GameOverScene'
        })

        this.score = 0;
    }

    create(){
        this.registry.events.on('gameover-score', (pts: number) => {
            this.score = pts;
        });
        
        this.registry.events.emit('request-score')

        let centerWidth = this.scale.width / 2;
        let centerHeight = this.scale.height / 2;

        const mainContainer = this.add.container(0, -300);

        const gameOverModal = new Banner(centerWidth, centerHeight, 150, 200, COLORS.secondary, COLORS.primary, COLORS.tertiary, this);
        gameOverModal.addToContainer(mainContainer);
        
        
        const gameOverText = this.add.dom(centerWidth, centerHeight - 60, 'h4', {fontWeight: 'bold', margin: 0, padding: 0, color: '#fff'}, 'GAME OVER')
        gameOverText.setClassName('grandpixel-font');
        mainContainer.add(gameOverText);

        const scoreText = this.add.dom(centerWidth, centerHeight - 30, 'h6', {fontWeight: 'bold', margin: 0, padding: 0, color: '#fff'}, `PUNTEO: ${this.score}`)
        scoreText.setClassName('grandpixel-font');
        mainContainer.add(scoreText);


        const menuButton = new Button(centerWidth, centerHeight + 10, 110, 30, COLORS.highlight, COLORS.tertiary, this);
        menuButton.rectangle.setInteractive()
            .on('pointerover', () => menuButton.rectangle.fillColor = COLORS.highlightShade)
            .on('pointerout', () => menuButton.rectangle.fillColor = COLORS.highlight)
            .on('pointerdown', () =>{
                this.tweens.add({
                    targets: mainContainer,
                    duration: 400,
                    ease: 'Power1',
                    y: -300
                }).on('complete', () => {
                    this.scene.stop('MainScene');
                    this.scene.stop('GameOverScene');
                    this.scene.run('HomeScene')
                })
            });
        
        menuButton.addText('MENU', 'grandpixel-font', {fontWeight: 'bold', margin: 0, padding: 0, color: '#fff', fontSize: '10px'});
        menuButton.addToContainer(mainContainer);

        const restartButton = new Button(centerWidth, centerHeight + 50, 110, 30, COLORS.highlight, COLORS.tertiary, this);
        restartButton.rectangle.setInteractive()
            .on('pointerover', () => restartButton.rectangle.fillColor = 0x84a32d)
            .on('pointerout', () => restartButton.rectangle.fillColor = COLORS.highlight)
            .on('pointerdown', () => {
                this.tweens.add({
                    targets: mainContainer,
                    duration: 400,
                    ease: 'Power1',
                    y: -300
                }).on('complete', () => {
                    this.scene.start('MainScene')
                })
            });
        restartButton.addText('JUGAR DE NUEVO', 'grandpixel-font', {fontWeight: 'bold', margin: 0, padding: 0, color: '#fff', fontSize: '10px'});
        restartButton.addToContainer(mainContainer);
        
        this.tweens.add({
            targets: mainContainer,
            duration: 600,
            ease: 'Bounce',
            y: 0
        })
    }
}