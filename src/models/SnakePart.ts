import { Point } from "./Point";

export class SnakePart {
    constructor(
        public currentPosition: Point,
        public nextPosition?: Point
    ){}
}