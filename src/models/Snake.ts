import { Point } from "./Point"
import { SnakePart } from "./SnakePart"

export class Snake {
    parts: SnakePart[]
    constructor(initialX: number, initialY: number){
        this.parts = []
        this.parts.push(new SnakePart(new Point(initialX, initialY)))
    }

    addPart(x: number, y: number){
        let newPart = new SnakePart(new Point(x, y), this.parts[this.parts.length-1].currentPosition)
        this.parts.push(newPart)
    }
}