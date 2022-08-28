import { Types } from 'phaser';
import { Bootloader } from './Bootloader';
import { ControlScene } from './scenes/ControlsScene';
import { GameOverScene } from './scenes/GameOverScene';
import { HomeScene } from './scenes/HomeScene';
import { MainScene } from './scenes/MainScene';
import { PauseScene } from './scenes/PauseScene';
import { PreStartScene } from './scenes/PreStartScene';

export const CONFIG: Types.Core.GameConfig = {
    title: 'Snake',
    type: Phaser.AUTO,
    backgroundColor: '#546E7A',
    scale: {
        parent: 'phaser-container',
        width: 440,
        height: 360,
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    dom: {
        createContainer: true
    },
    render: {
        pixelArt: true,
    },
    physics: {
        default: 'arcade'
    },
    scene: [
        Bootloader,
        MainScene,
        PauseScene,
        PreStartScene,
        ControlScene,
        HomeScene,
        GameOverScene
    ]
}