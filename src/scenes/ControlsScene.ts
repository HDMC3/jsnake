import { Banner } from "../ui/Banner";
import { Button } from "../ui/Button";
import { ControlBadge } from "../ui/ControlBadge";
import { COLORS } from '../constants';

export class ControlScene extends Phaser.Scene {

    constructor(){
        super({
            key: 'ControlScene'
        })
    }

    create(){
        let centerWidth = this.scale.width / 2;
        let centerHeight = this.scale.height / 2;

        const title = this.add.dom(centerWidth, centerHeight - 150, 'p', {fontWeight: 'bold', margin: 0, padding: 0, color: '#fff', fontSize: '25px'}, 'CONTROLES').setClassName('grandpixel-font title-text-border');

        const menuButton = new Button(centerWidth - 160, centerHeight - 150, 70, 30, COLORS.highlight, COLORS.tertiary, this)
        menuButton.addText('MENU', 'grandpixel-font', {fontWeight: 'bold', margin: 0, padding: 0, color: '#fff', fontSize: '15px'});
        menuButton.rectangle.setInteractive()
            .on('pointerover', () => menuButton.rectangle.fillColor = COLORS.highlightShade)
            .on('pointerout', () => menuButton.rectangle.fillColor = COLORS.highlight)
            .on('pointerdown', () =>{
                this.tweens.add({
                    targets: [moveUpControlContainer, moveRightControlContainer, moveDownControlContainer, moveLeftControlContainer, backgroundBannerContainer, pauseControlContainer],
                    duration: 800,
                    ease: 'Power1',
                    y: -400
                }).on('complete', () => {
                    this.scene.stop('ControlScene');
                    this.scene.run('HomeScene')
                }).on('start', () => {
                    setTimeout(() => {
                        this.tweens.add({
                            targets: menuButtonContainer,
                            duration: 500,
                            ease: 'Power1',
                            x: -200
                        });
                        
                        this.tweens.add({
                            targets: title,
                            duration: 400,
                            ease: 'Power1',
                            x: 550
                        });
                    }, 100);
                });

            });

        const menuButtonContainer = this.add.container(0, 0);
        menuButton.addToContainer(menuButtonContainer);


        const controlsBackgroundBanner = new Banner(centerWidth, centerHeight + 20, this.scale.width - 100, this.scale.height - 90, COLORS.secondary, COLORS.primary, COLORS.tertiary, this);
        const backgroundBannerContainer = this.add.container();
        controlsBackgroundBanner.addToContainer(backgroundBannerContainer);


        const arrowUpBadge = new ControlBadge(centerWidth - 100, centerHeight - 80, 36, 36, COLORS.secondary, COLORS.tertiary, this);
        // Arrow up parts
        const arrowUpSymbolHead = this.add.triangle(0, 0, arrowUpBadge.rectangle.getTopCenter().x, arrowUpBadge.rectangle.getTopCenter().y + 4, arrowUpBadge.rectangle.getRightCenter().x - 5, arrowUpBadge.rectangle.getRightCenter().y, arrowUpBadge.rectangle.getLeftCenter().x + 5, arrowUpBadge.rectangle.getLeftCenter().y, COLORS.highlight).setOrigin(0, 0);
        const arrowUpSymbolBody = this.add.rectangle(arrowUpBadge.rectangle.getCenter().x, arrowUpBadge.rectangle.getCenter().y, arrowUpBadge.rectangle.width / 3, arrowUpBadge.rectangle.height / 3, COLORS.highlight).setOrigin(0.5, 0);
        
        const moveUpControlText = this.add.dom(centerWidth - 50, arrowUpBadge.rectangle.getCenter().y, 'h4', {fontWeight: 'bold', margin: 0, color: '#fff'}, 'MOVER ARRIBA').setClassName('grandpixel-font title-text-border').setOrigin(0, 0.5);
        const moveUpControlContainer = this.add.container(0, centerHeight * 2 + 50)
        arrowUpBadge.addToContainer(moveUpControlContainer);
        moveUpControlContainer.add([arrowUpSymbolHead, arrowUpSymbolBody, moveUpControlText])
        this.tweens.add({
            paused: false,
            targets: moveUpControlContainer,
            duration: 400,
            ease: 'Power1',
            y: 0,
            onStart: () => {
                setTimeout(() => {
                    tweenDerecha.play()
                }, 100);
            }
        })


        const arrowRight = new ControlBadge(centerWidth - 100, centerHeight - 30, 36, 36, COLORS.secondary, COLORS.tertiary, this);
        // Arrow right parts
        const arrowRightSymbolHead = this.add.triangle(0, 0, arrowRight.rectangle.getRightCenter().x - 4, arrowRight.rectangle.getRightCenter().y, arrowRight.rectangle.getBottomCenter().x, arrowRight.rectangle.getBottomCenter().y -5, arrowRight.rectangle.getTopCenter().x, arrowRight.rectangle.getTopCenter().y + 5, COLORS.highlight).setOrigin(0, 0);
        const arrowRightSymbolBody = this.add.rectangle(arrowRight.rectangle.getCenter().x, arrowRight.rectangle.getCenter().y, arrowRight.rectangle.width / 3, arrowRight.rectangle.height / 3, COLORS.highlight).setOrigin(1, 0.5);
        
        const moveRightControlText = this.add.dom(centerWidth - 50, arrowRight.rectangle.getCenter().y, 'h4', {fontWeight: 'bold', margin: 0, color: '#fff'}, 'MOVER DERECHA').setClassName('grandpixel-font title-text-border').setOrigin(0, 0.5);
        const moveRightControlContainer = this.add.container(0, centerHeight * 2 + 100);
        arrowRight.addToContainer(moveRightControlContainer);
        moveRightControlContainer.add([arrowRightSymbolHead, arrowRightSymbolBody, moveRightControlText])
        let tweenDerecha = this.tweens.add({
            paused: true,
            targets: moveRightControlContainer,
            duration: 400,
            ease: 'Power1',
            y: 0,
            onStart: () => {
                setTimeout(() => {
                    tweenAbajo.play()
                }, 100);
            }
        })


        const arrowDown = new ControlBadge(centerWidth - 100, centerHeight + 20, 36, 36, COLORS.secondary, COLORS.tertiary, this);
        // Arrow down parts
        const arrowDownSymbolHead = this.add.triangle(0, 0, arrowDown.rectangle.getBottomCenter().x, arrowDown.rectangle.getBottomCenter().y - 4, arrowDown.rectangle.getLeftCenter().x + 5, arrowDown.rectangle.getLeftCenter().y, arrowDown.rectangle.getRightCenter().x - 5, arrowDown.rectangle.getRightCenter().y, COLORS.highlight).setOrigin(0, 0);
        const arrowDownSymbolBody = this.add.rectangle(arrowDown.rectangle.getCenter().x, arrowDown.rectangle.getCenter().y, arrowDown.rectangle.width / 3, arrowDown.rectangle.height / 3, COLORS.highlight).setOrigin(0.5, 1);
        
        const moveDownControlText = this.add.dom(centerWidth - 50, arrowDown.rectangle.getCenter().y, 'h4', {fontWeight: 'bold', margin: 0, color: '#fff'}, 'MOVER ABAJO').setClassName('grandpixel-font title-text-border').setOrigin(0, 0.5);
        const moveDownControlContainer = this.add.container(0, centerHeight * 2 + 150)
        arrowDown.addToContainer(moveDownControlContainer);
        moveDownControlContainer.add([arrowDownSymbolHead, arrowDownSymbolBody, moveDownControlText])
        let tweenAbajo = this.tweens.add({
            paused: true,
            targets: moveDownControlContainer,
            duration: 400,
            ease: 'Power1',
            y: 0,
            onStart: () => {
                setTimeout(() => {
                    tweenIzquierda.play()
                }, 100);
            }
        })


        const arrowLeft = new ControlBadge(centerWidth - 100, centerHeight + 70, 36, 36, COLORS.secondary, COLORS.tertiary, this);
        // Arrow left parts
        const arrowLeftSymbolHead = this.add.triangle(0, 0, arrowLeft.rectangle.getLeftCenter().x + 4, arrowLeft.rectangle.getLeftCenter().y, arrowLeft.rectangle.getTopCenter().x, arrowLeft.rectangle.getTopCenter().y + 5, arrowLeft.rectangle.getBottomCenter().x, arrowLeft.rectangle.getBottomCenter().y - 5, COLORS.highlight).setOrigin(0, 0);
        const arrowLeftSymbolBody = this.add.rectangle(arrowLeft.rectangle.getCenter().x, arrowLeft.rectangle.getCenter().y, arrowLeft.rectangle.width / 3, arrowLeft.rectangle.height / 3, COLORS.highlight).setOrigin(0, 0.5);
        
        const moveLeftControlText = this.add.dom(centerWidth - 50, arrowLeft.rectangle.getCenter().y, 'h4', {fontWeight: 'bold', margin: 0, color: '#fff'}, 'MOVER IZQUIERDA').setClassName('grandpixel-font title-text-border').setOrigin(0, 0.5);
        const moveLeftControlContainer = this.add.container(0, centerHeight * 2 + 200)
        arrowLeft.addToContainer(moveLeftControlContainer);
        moveLeftControlContainer.add([arrowLeftSymbolHead, arrowLeftSymbolBody, moveLeftControlText])
        let tweenIzquierda = this.tweens.add({
            paused: true,
            targets: moveLeftControlContainer,
            duration: 400,
            ease: 'Power1',
            y: 0,
            onStart: () => {
                setTimeout(() => {
                    tweenPausa.play()
                }, 100);
            } 
        })


        const escBadge = new ControlBadge(centerWidth - 100, centerHeight + 120, 48, 36, COLORS.secondary, COLORS.tertiary, this);
        const escKeyText = this.add.dom(escBadge.rectangle.getCenter().x + 1, escBadge.rectangle.getCenter().y - 1, 'h4', {fontWeight: 'bold', margin: 0, color: '#a3cb38'}, 'ESC').setClassName('grandpixel-font title-text-border');
        const pauseControlText = this.add.dom(centerWidth - 50, escBadge.rectangle.getCenter().y, 'h4', {fontWeight: 'bold', margin: 0, color: '#fff'}, 'PAUSA / CONTINUAR').setClassName('grandpixel-font title-text-border').setOrigin(0, 0.5);
        const pauseControlContainer = this.add.container(0, centerHeight * 2 + 250)
        escBadge.addToContainer(pauseControlContainer);
        pauseControlContainer.add([escKeyText, pauseControlText])
        let tweenPausa = this.tweens.add({
            paused: true,
            targets: pauseControlContainer,
            duration: 400,
            ease: 'Power1',
            y: 0
        }) 
        
    }
}