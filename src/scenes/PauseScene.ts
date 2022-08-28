import { Banner } from "../ui/Banner";

export class PauseScene extends Phaser.Scene {

    textoPausa?: Phaser.GameObjects.DOMElement;
    pauseKey?: Phaser.Input.Keyboard.Key;
    mainContainer?: Phaser.GameObjects.Container
    
    coloresTablero:{blanco: number, gris: number, fondo: number, borde: number, contornoBorde: number, verde: number};

    constructor(){
        super({
            key: 'PauseScene'
        })

        this.coloresTablero = {
            blanco: 0xecf0f1, // Color para casilla valor 1
            gris: 0x95a5a6, 
            fondo: 0x34495e, 
            borde: 0x2c3e50, // Color para casilla con valor 0
            contornoBorde: 0x243342,
            verde: 0xa3cb38 // Color para casilla con valor 2
        }
    }

    create(){
        let centerWidth = this.scale.width / 2;
        let centerHeight = this.scale.height / 2;

        this.mainContainer = this.add.container(0, -300)

        const pauseBanner = new Banner(centerWidth, centerHeight, 160, 60, this.coloresTablero.borde, this.coloresTablero.fondo, this.coloresTablero.contornoBorde, this);
        pauseBanner.addText('PAUSA', 'grandpixel-font', {fontWeight: 'bold', margin: 0, color: '#a3cb38'}, 'h3');
        pauseBanner.addToContainer(this.mainContainer);

        this.tweens.add({
            targets: this.mainContainer,
            duration: 600,
            ease: 'Power1',
            y: 0
        })

        this.pauseKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    }

    update(): void{
        if(this.pauseKey && Phaser.Input.Keyboard.JustDown(this.pauseKey)){
            this.tweens.add({
                targets: this.mainContainer,
                duration: 400,
                ease: 'Power1',
                y: -300
            }).on('complete', () => {
                this.scene.stop('PauseScene');
                this.scene.resume('MainScene');
            })
        }
    }
}