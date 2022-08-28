export class BoardBox {
    private rectangle: Phaser.GameObjects.Rectangle;
    private _value: number;
    x: number;
    y: number;

    constructor(value: number = 0, x: number, y: number, width: number, height: number, escena: Phaser.Scene){
        this._value = value;
        this.x = x;
        this.y = y;
        this.rectangle = escena.add.rectangle(x, y, width, height, 0xecf0f1);
        this.rectangle.setOrigin(0, 0);

    }

    // 0: casilla vacia, 1: serpiente, 2: objetivo
    updateValue(newValue: number, color?: number){
        this._value = newValue;
        if (color) this.rectangle.fillColor = color;
    }

    changeColor(color: number){
        this.rectangle.fillColor = color;
    }

    get value(){
        return this._value;
    }
}