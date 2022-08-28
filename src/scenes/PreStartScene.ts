export class PreStartScene extends Phaser.Scene {

    constructor(){
        super({
            key: 'PreStartScene'
        })
    }

    create(){
        
        let centerWidth = this.scale.width / 2;
        let centerHeight = this.scale.height / 2;

        const numberOneText = this.add.dom(centerWidth, -100, 'h1', {fontWeight: 'bold', margin: 0, padding: 0, color: '#a3cb38'}, '1').setOrigin(0.5, 0.5);
        numberOneText.setClassName('grandpixel-font text-border');
        numberOneText.setScale(1.5, 1.5);

        const numberTwoText = this.add.dom(centerWidth, -100, 'h1', {fontWeight: 'bold', margin: 0, padding: 0, color: '#a3cb38'}, '2').setOrigin(0.5, 0.5);
        numberTwoText.setClassName('grandpixel-font text-border');
        numberTwoText.setScale(1.5, 1.5);

        const numberThreeText = this.add.dom(centerWidth, -100, 'h1', {fontWeight: 'bold', margin: 0, padding: 0, color: '#a3cb38'}, '3').setOrigin(0.5, 0.5);
        numberThreeText.setClassName('grandpixel-font text-border');
        numberThreeText.setScale(1.5, 1.5);

        const numberOneTween = this.tweens.add({
            paused: true,
            targets: numberOneText,
            duration: 450,
            props: {
                x: {
                    value: centerWidth,
                },
                y: {
                    value: centerHeight,
                }
            },
            yoyo: true,
            ease: 'Power1',
            hold: 300,
            onComplete: () => {
                this.scene.run('MainScene');
                this.scene.stop('PreStartScene');
            }
        })

        const numberTwoTween = this.tweens.add({
            paused: true,
            targets: numberTwoText,
            duration: 450,
            props: {
                x: {
                    value: centerWidth,
                },
                y: {
                    value: centerHeight,
                }
            },
            yoyo: true,
            ease: 'Power1',
            hold: 300,
            onComplete: () => numberOneTween.play()
        })

        const numberThreeTween = this.tweens.add({
            paused: true,
            targets: numberThreeText,
            duration: 450,
            props: {
                x: {
                    value: centerWidth,
                },
                y: {
                    value: centerHeight,
                }
            },
            yoyo: true,
            ease: 'Power1',
            hold: 300,
            onComplete: () => numberTwoTween.play()
        })

        numberThreeTween.play();
    }   
}