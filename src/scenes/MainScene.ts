import { COLORS } from "../constants"
import { BoardBox } from "../models/BoardBox";
import { Point } from "../models/Point";
import { Snake } from "../models/Snake";

export class MainScene extends Phaser.Scene {
    board: BoardBox[][];
    boardBoxHeight: number = 10;
    boardBoxWidth: number = 10;
    
    backgroundBoard?: Phaser.GameObjects.Rectangle;
    borderBoard?: Phaser.GameObjects.Rectangle;
    borderOuterContour: Phaser.GameObjects.Line[];
    borderInnerContour: Phaser.GameObjects.Line[];
    
    numberOfXBoardBoxes: number;
    numberOfYBoardBoxes: number;

    cursorKeys?: Phaser.Types.Input.Keyboard.CursorKeys;

    directions: {
        up: number[],
        right: number[],
        down: number[],
        left: number[]
    };

    direction: number[];
    speed: number;
    timeTemp: number = 0;
    isPressedKey: boolean;
    snake: Snake;
    target!: Point;
    isGameOver: boolean;
    isGamePaused: boolean;
    score: number;
    scoreIncreasePerLevel: number[]
    level: number;
    elapsedTime: {ms: number, minutes: number, seconds: number, strMinutes: string, strSeconds: string}
    scoreText!: Phaser.GameObjects.DOMElement;
    levelText!: Phaser.GameObjects.DOMElement;
    elapsedTimeText!: Phaser.GameObjects.DOMElement;
    pausedKey?: Phaser.Input.Keyboard.Key;

    constructor() {
        super({
            key: 'MainScene'
        });

        this.board = [];

        this.numberOfXBoardBoxes = 33;
        this.numberOfYBoardBoxes = 21;

        this.borderOuterContour = [];
        this.borderInnerContour = [];

        this.speed = 50;

        this.directions = {
            up: [0, -1],
            right: [1, 0],
            down: [0, 1],
            left: [-1, 0]
        }

        this.direction = this.directions.up;
        this.isPressedKey = false;
        this.snake = new Snake(16, 11);
        this.isGameOver = false;
        this.isGamePaused = false;
        this.score = 0;
        this.scoreIncreasePerLevel = [0, 3, 5, 7, 9, 12]
        this.level = 1;
        this.elapsedTime = {ms: 0, minutes: 0, seconds: 0, strMinutes: '', strSeconds: ''}
    }

    init() {
        this.restartScene()
    }

    create(): void {
        this.registry.events.on('request-score', () => {
            this.registry.events.emit('gameover-score', this.score);
        });

        let centerWidth = this.scale.width / 2;
        let centerHeight = this.scale.height / 2 + 18;

        this.backgroundBoard = this.add.rectangle(centerWidth, centerHeight, (this.boardBoxWidth * this.numberOfXBoardBoxes) + (this.numberOfXBoardBoxes + 1) * 2 + 4, (this.boardBoxHeight * this.numberOfYBoardBoxes) + (this.numberOfYBoardBoxes + 1) * 2 + 4, COLORS.primary);
        this.borderBoard = this.add.rectangle(centerWidth, centerHeight, this.backgroundBoard.width + 10, this.backgroundBoard.height + 10, COLORS.secondary).setDepth(-1);

        this.borderInnerContour.push(this.add.line(0, 0, this.backgroundBoard.getTopLeft().x, this.backgroundBoard.getTopLeft().y, this.backgroundBoard.getBottomLeft().x, this.backgroundBoard.getBottomLeft().y, COLORS.tertiary).setOrigin(0,0))
        this.borderInnerContour.push(this.add.line(0, 0, this.backgroundBoard.getBottomLeft().x, this.backgroundBoard.getBottomLeft().y, this.backgroundBoard.getBottomRight().x, this.backgroundBoard.getBottomRight().y, COLORS.tertiary).setOrigin(0,0))
        this.borderInnerContour.push(this.add.line(0, 0, this.backgroundBoard.getBottomRight().x, this.backgroundBoard.getBottomRight().y, this.backgroundBoard.getTopRight().x, this.backgroundBoard.getTopRight().y, COLORS.tertiary).setOrigin(0,0))
        this.borderInnerContour.push(this.add.line(0, 0, this.backgroundBoard.getTopRight().x, this.backgroundBoard.getTopRight().y, this.backgroundBoard.getTopLeft().x, this.backgroundBoard.getTopLeft().y, COLORS.tertiary).setOrigin(0,0))
        
        this.borderOuterContour.push(this.add.line(0, 0, this.borderBoard.getTopLeft().x, this.borderBoard.getTopLeft().y, this.borderBoard.getBottomLeft().x, this.borderBoard.getBottomLeft().y, COLORS.tertiary).setOrigin(0,0))
        this.borderOuterContour.push(this.add.line(0, 0, this.borderBoard.getBottomLeft().x, this.borderBoard.getBottomLeft().y, this.borderBoard.getBottomRight().x, this.borderBoard.getBottomRight().y, COLORS.tertiary).setOrigin(0,0))
        this.borderOuterContour.push(this.add.line(0, 0, this.borderBoard.getBottomRight().x, this.borderBoard.getBottomRight().y, this.borderBoard.getTopRight().x, this.borderBoard.getTopRight().y, COLORS.tertiary).setOrigin(0,0))
        this.borderOuterContour.push(this.add.line(0, 0, this.borderBoard.getTopRight().x, this.borderBoard.getTopRight().y, this.borderBoard.getTopLeft().x, this.borderBoard.getTopLeft().y, COLORS.tertiary).setOrigin(0,0))

        let initialX = this.backgroundBoard.getTopLeft().x + 4;
        let initialY = this.backgroundBoard.getTopLeft().y + 4;

        for (let x = 0; x <this.numberOfXBoardBoxes; x++) {
            this.board.push([]);
            for(let y = 0; y<this.numberOfYBoardBoxes; y++){
                this.board[x].push(new BoardBox(0, initialX, initialY, this.boardBoxWidth, this.boardBoxHeight, this));
                this.board[x][y].changeColor(COLORS.secondary)
                initialY += this.boardBoxHeight + 2;
            }

            initialY = this.backgroundBoard.getTopLeft().y + 4;
            initialX += this.boardBoxWidth + 2;
        }

        this.board[this.snake.parts[0].currentPosition.x][this.snake.parts[0].currentPosition.y].updateValue(1, COLORS.snakeHead)

        this.cursorKeys = this.input.keyboard.createCursorKeys();

        this.target = this.getRandomPoint();

        this.board[this.target.x][this.target.y].updateValue(2, COLORS.highlight)
        
        // Tablero de datos
        let borderStats = this.add.rectangle(this.borderBoard.getTopLeft().x, this.borderBoard.getTopLeft().y - 36, this.borderBoard.width, 30, COLORS.secondary).setOrigin(0, 0);
        let backgroundStats = this.add.rectangle(borderStats.getCenter().x, borderStats.getCenter().y, borderStats.width-10, borderStats.height-10, COLORS.primary);

        this.add.line(0, 0, backgroundStats.getTopLeft().x, backgroundStats.getTopLeft().y, backgroundStats.getBottomLeft().x, backgroundStats.getBottomLeft().y, COLORS.tertiary).setOrigin(0,0)
        this.add.line(0, 0, backgroundStats.getBottomLeft().x, backgroundStats.getBottomLeft().y, backgroundStats.getBottomRight().x, backgroundStats.getBottomRight().y, COLORS.tertiary).setOrigin(0,0)
        this.add.line(0, 0, backgroundStats.getBottomRight().x, backgroundStats.getBottomRight().y, backgroundStats.getTopRight().x, backgroundStats.getTopRight().y, COLORS.tertiary).setOrigin(0,0)
        this.add.line(0, 0, backgroundStats.getTopRight().x, backgroundStats.getTopRight().y, backgroundStats.getTopLeft().x, backgroundStats.getTopLeft().y, COLORS.tertiary).setOrigin(0,0)
        
        this.add.line(0, 0, borderStats.getTopLeft().x, borderStats.getTopLeft().y, borderStats.getBottomLeft().x, borderStats.getBottomLeft().y, COLORS.tertiary).setOrigin(0,0)
        this.add.line(0, 0, borderStats.getBottomLeft().x, borderStats.getBottomLeft().y, borderStats.getBottomRight().x, borderStats.getBottomRight().y, COLORS.tertiary).setOrigin(0,0)
        this.add.line(0, 0, borderStats.getBottomRight().x, borderStats.getBottomRight().y, borderStats.getTopRight().x, borderStats.getTopRight().y, COLORS.tertiary).setOrigin(0,0)
        this.add.line(0, 0, borderStats.getTopRight().x, borderStats.getTopRight().y, borderStats.getTopLeft().x, borderStats.getTopLeft().y, COLORS.tertiary).setOrigin(0,0)

        // Separadores tablero datos
        this.add.line(0, 0, backgroundStats.getTopLeft().x + backgroundStats.width / 3, backgroundStats.getTopLeft().y, backgroundStats.getTopLeft().x + backgroundStats.width / 3, backgroundStats.getBottomLeft().y, COLORS.tertiary).setOrigin(0, 0)
        this.add.line(0, 0, backgroundStats.getTopLeft().x + backgroundStats.width / 3 * 2, backgroundStats.getTopLeft().y, backgroundStats.getTopLeft().x + backgroundStats.width / 3 * 2, backgroundStats.getBottomLeft().y, COLORS.tertiary).setOrigin(0, 0)

        this.scoreText = this.add.dom(backgroundStats.getTopLeft().x + 6, backgroundStats.getTopLeft().y + 4, 'h6', {fontWeight: 'bold', margin: 0, color: '#fff'}, 'PUNTEO: 0').setOrigin(0, 0)
        this.scoreText.setClassName('grandpixel-font')
        
        this.levelText = this.add.dom(backgroundStats.getTopLeft().x + (backgroundStats.width / 3) + 6, backgroundStats.getTopLeft().y + 4, 'h6', {fontWeight: 'bold', margin: 0, color: '#fff'}, 'NIVEL: 1').setOrigin(0, 0)
        this.levelText.setClassName('grandpixel-font')
        
        this.elapsedTimeText = this.add.dom(backgroundStats.getTopLeft().x + (backgroundStats.width / 3 * 2) + 6, backgroundStats.getTopLeft().y + 4, 'h6', {fontWeight: 'bold', margin: 0, color: '#fff'}, 'TIEMPO: 0:00').setOrigin(0, 0)
        this.elapsedTimeText.setClassName('grandpixel-font')

        // Tecla para pausar el juego
        this.pausedKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        this.scene.pause();
        this.scene.run('PreStartScene');

    }

    update(_: number, delta: number){
        this.timeTemp += delta;
        
        if(!this.isGameOver && !this.isGamePaused){
            this.elapsedTime.ms += delta
            this.elapsedTime.minutes = this.elapsedTime.ms / 60000;
            this.elapsedTime.seconds = (this.elapsedTime.ms % 60000) / 1000;

            this.elapsedTime.strMinutes = this.elapsedTime.minutes < 10 ? `0${Math.floor(this.elapsedTime.minutes)}` : `${Math.floor(this.elapsedTime.minutes)}`  
            this.elapsedTime.strSeconds = this.elapsedTime.seconds < 10 ? `0${Math.floor(this.elapsedTime.seconds)}` : `${Math.floor(this.elapsedTime.seconds)}`
            
            this.elapsedTimeText.setText(`TIEMPO: ${this.elapsedTime.strMinutes}:${this.elapsedTime.strSeconds}`)

            if (this.timeTemp >= this.speed || this.isPressedKey) {
    
                if(this.direction == this.directions.up){
                    this.updateSnakeHead(this.directions.up)
                    this.isPressedKey = false;
                }else if(this.direction == this.directions.right) {
                    this.updateSnakeHead(this.directions.right)
                    this.isPressedKey = false;
                }else if(this.direction == this.directions.down){
                    this.updateSnakeHead(this.directions.down)
                    this.isPressedKey = false;
                }else if(this.direction == this.directions.left){
                    this.updateSnakeHead(this.directions.left)
                    this.isPressedKey = false;
                }
                
                this.timeTemp = 0;
            }
    
            if(this.cursorKeys && Phaser.Input.Keyboard.JustDown(this.cursorKeys.up) && this.direction != this.directions.up && this.direction != this.directions.down) {
                this.direction = this.directions.up; 
                this.isPressedKey = true
            }
            else if(this.cursorKeys && Phaser.Input.Keyboard.JustDown(this.cursorKeys.right) && this.direction != this.directions.right && this.direction != this.directions.left) {
                this.direction = this.directions.right; 
                this.isPressedKey = true
            }
            else if(this.cursorKeys && Phaser.Input.Keyboard.JustDown(this.cursorKeys.down) && this.direction != this.directions.up && this.direction != this.directions.down) {
                this.direction = this.directions.down; 
                this.isPressedKey = true
            }
            else if(this.cursorKeys && Phaser.Input.Keyboard.JustDown(this.cursorKeys.left) && this.direction != this.directions.right && this.direction != this.directions.left) {
                this.direction = this.directions.left; 
                this.isPressedKey = true
            }

            this.updateLevel(this.elapsedTime.ms / 1000);

            this.levelText.setText(`NIVEL: ${this.level}`)
            
            if(this.pausedKey && Phaser.Input.Keyboard.JustUp(this.pausedKey) && !this.isGameOver){
                this.scene.pause();
                this.scene.run('PauseScene');
            }
            
            if(this.isGameOver){
                this.scene.pause('MainScene');
                this.scene.run('GameOverScene');
            }
        }
        
    }

    updateSnakeHead(direction: number[]){
        let xActual = this.snake.parts[0].currentPosition.x + direction[0];
        let yActual = this.snake.parts[0].currentPosition.y + direction[1];
        
        if(xActual < 0 || xActual >= this.numberOfXBoardBoxes || yActual < 0 || yActual >= this.numberOfYBoardBoxes || this.board[xActual][yActual].value === 1){
            this.isGameOver = true;
        }else{

            if(this.board[xActual][yActual].value === 2){
                this.updateSnakeBody();

                this.snake.parts[0].currentPosition.x += direction[0]
                this.snake.parts[0].currentPosition.y += direction[1]

                this.snake.addPart(this.snake.parts[0].currentPosition.x, this.snake.parts[0].currentPosition.y);
                this.target = this.getRandomPoint();
                this.score += this.scoreIncreasePerLevel[this.level]
                this.scoreText.setText(`PUNTEO: ${this.score}`)
                this.drawBoard();

            }else{
                this.updateSnakeBody();

                this.snake.parts[0].currentPosition.x += direction[0]
                this.snake.parts[0].currentPosition.y += direction[1]

                this.drawBoard();
            }
        }
    }

    getRandomPoint(): Point{
        let validPoints: Point[] = [];

        for (let x = 0; x < this.board.length; x++) {
            for (let y = 0; y < this.board[x].length; y++) {
                if(this.board[x][y].value == 0){
                    validPoints.push(new Point(x, y))
                }
            }
        }

        let randomNumber = this.getRandomInt(0, validPoints.length)
        
        return validPoints[randomNumber];
    }

    getRandomInt(min: number, max: number) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    updateSnakeBody(){
        for (let i = this.snake.parts.length-1; i > 0; i--) {
            const nextPosition = this.snake.parts[i].nextPosition;
            if (nextPosition) {
                this.snake.parts[i].currentPosition.x = nextPosition.x
                this.snake.parts[i].currentPosition.y = nextPosition.y
            }   
        }
    }

    drawBoard(){
        for (const itemX of this.board) {
            for (const itemY of itemX) {
                itemY.updateValue(0, COLORS.secondary)
            }
        }

        for (const parte of this.snake.parts) {
            this.board[parte.currentPosition.x][parte.currentPosition.y].updateValue(1, COLORS.snakeBody)
        }

        this.board[this.target.x][this.target.y].updateValue(2, COLORS.highlight)
        this.board[this.snake.parts[0].currentPosition.x][this.snake.parts[0].currentPosition.y].updateValue(1, COLORS.snakeHead)
    }

    updateLevel(time: number){
        switch (this.level) {
            case 1:
                this.speed = 200;
                if(this.score >= 30) this.level = 2
                else if(time >= 30) this.level = 2
                break;
            case 2: 
                this.speed = 150;
                if(this.score >= 130) this.level = 3
                else if(time >= 90) this.level = 3
                break;
            case 3: 
                this.speed = 125;
                if(this.score >= 410) this.level = 4
                else if(time >= 210) this.level = 4
                break;
            case 4: 
                this.speed = 100;
                if(this.score >= 1130) this.level = 5
                else if(time >= 450) this.level = 5 
                break;
            case 5:
                this.speed = 75;
                break;
            default:
                break;
        }
    }

    restartScene(){
        this.board = [];

        this.numberOfXBoardBoxes = 33;
        this.numberOfYBoardBoxes = 21;

        this.borderInnerContour = [];
        this.borderOuterContour = [];

        this.speed = 50;

        this.directions = {
            up: [0, -1],
            right: [1, 0],
            down: [0, 1],
            left: [-1, 0]
        }

        this.direction = this.directions.up;
        this.isPressedKey = false;
        this.snake = new Snake(16, 11);
        this.isGameOver = false;
        this.isGamePaused = false;
        this.score = 0;
        this.scoreIncreasePerLevel = [0, 3, 5, 7, 9, 12]
        this.level = 1;
        this.elapsedTime = {ms: 0, minutes: 0, seconds: 0, strMinutes: '', strSeconds: ''}
    }
}
