import { Scene } from "phaser";

export class Bootloader extends Scene {
    constructor() {
        super({
            key: 'Bootloader'
        });
    }

    preload() {
        this.load.setPath('assets/');
        this.load.css('text-styles', 'css/text-styles.css');

        this.load.on('complete', () => {
            this.scene.start('HomeScene');
        })
    }
}   