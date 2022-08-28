import { Game, Types } from "phaser";
import { CONFIG } from "./config";

class SnakeGame extends Game {
    constructor(config: Types.Core.GameConfig) {
        super(config);
    }
}

new SnakeGame(CONFIG);