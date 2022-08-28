import { COLORS } from "../constants";
import { Banner } from "../ui/Banner";
import { Button } from "../ui/Button";

export class HomeScene extends Phaser.Scene {
    contenedorTitulo?: Phaser.GameObjects.Container;
    contenedorBotonJugar?: Phaser.GameObjects.Container;
    contenedorBotonControles?: Phaser.GameObjects.Container;
    
    constructor() {
        super({
            key: 'HomeScene'
        });
    }

    create() {
        let centerWidth = this.scale.width / 2;
        let centerHeight = this.scale.height / 2;

        const titleBanner = new Banner(centerWidth, centerHeight - 100, 300, 100, COLORS.secondary, COLORS.primary, COLORS.tertiary, this);
        titleBanner.addText('JSNAKE', 'grandpixel-font title-text-border', {fontWeight: 'bold', margin: 0, fontSize: '60px', color: '#fff'});
        this.contenedorTitulo = this.add.container(0, -300)
        titleBanner.addToContainer(this.contenedorTitulo);

        this.tweens.add({
            targets: this.contenedorTitulo,
            duration: 800,
            ease: 'Power1',
            y: 0
        })

        const playButton = new Button(centerWidth, centerHeight + 20, 160, 60, COLORS.highlight, COLORS.tertiary, this);
        playButton.addText('JUGAR', 'grandpixel-font title-text-border', {fontWeight: 'bold', margin: 0, paddingRight: '9px', color: '#fff', fontSize: '30px'});
        playButton.rectangle.setInteractive()
            .on('pointerover', () => playButton.rectangle.fillColor = COLORS.highlightShade)
            .on('pointerout', () => playButton.rectangle.fillColor = COLORS.highlight)
            .on('pointerdown', () =>{
                this.tweens.add({
                    targets: this.contenedorTitulo,
                    duration: 600,
                    ease: 'Power1',
                    y: -300
                })
                
                this.tweens.add({
                    targets: this.contenedorBotonJugar,
                    duration: 600,
                    ease: 'Power1',
                    x: -320
                })
                
                this.tweens.add({
                    targets: this.contenedorBotonControles,
                    duration: 600,
                    ease: 'Power1',
                    x: 350
                }).on('complete', () => {
                    this.scene.start('MainScene')
                });

            });
        this.contenedorBotonJugar = this.add.container(-200, 0);
        playButton.addToContainer(this.contenedorBotonJugar);

        const controlsButton = new Button(centerWidth, centerHeight + 120, 220, 60, COLORS.highlight, COLORS.tertiary, this);
        controlsButton.addText('CONTROLES', 'grandpixel-font title-text-border', {fontWeight: 'bold', margin: 0, paddingRight: '4px', color: '#fff', fontSize: '30px'});
        controlsButton.rectangle.setInteractive()
            .on('pointerover', () => controlsButton.rectangle.fillColor = COLORS.highlightShade)
            .on('pointerout', () => controlsButton.rectangle.fillColor = COLORS.highlight)
            .on('pointerdown', () => {
                this.tweens.add({
                    targets: this.contenedorTitulo,
                    duration: 600,
                    ease: 'Power1',
                    y: -300
                })

                this.tweens.add({
                    targets: this.contenedorBotonJugar,
                    duration: 600,
                    ease: 'Power1',
                    x: -320
                })

                this.tweens.add({
                    targets: this.contenedorBotonControles,
                    duration: 600,
                    ease: 'Power1',
                    x: 350
                }).on('complete', () => {
                    this.scene.stop('HomeScene');
                    this.scene.run('ControlScene')
                });
            });
        
        this.contenedorBotonControles = this.add.container(350, 0);
        controlsButton.addToContainer(this.contenedorBotonControles);

        this.tweens.add({
            targets: this.contenedorBotonJugar,
            duration: 800,
            ease: 'Power1',
            x: 0
        })
        
        this.tweens.add({
            targets: this.contenedorBotonControles,
            duration: 800,
            ease: 'Power1',
            x: 0
        })
        
    }
}
