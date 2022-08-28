import { GameObjects, Scene } from "phaser";

export class Button {

    private buttonRectangle: GameObjects.Rectangle;
    private leftBorder: GameObjects.Line;
    private bottomBorder: GameObjects.Line;
    private rightBorder: GameObjects.Line;
    private topBorder: GameObjects.Line;
    private textButton?: GameObjects.DOMElement;

    constructor(
        private x: number,
        private y: number,
        private width: number,
        private height: number,
        private fillColor: number,
        private borderColor: number,
        private scene: Scene
    ) {
        this.buttonRectangle = this.scene.add.rectangle(this.x, this.y, this.width, this.height, this.fillColor);
        this.leftBorder = this.scene.add.line(0, 0, this.buttonRectangle.getTopLeft().x, this.buttonRectangle.getTopLeft().y, this.buttonRectangle.getBottomLeft().x, this.buttonRectangle.getBottomLeft().y, this.borderColor).setOrigin(0, 0);
        this.bottomBorder = this.scene.add.line(0, 0, this.buttonRectangle.getBottomLeft().x, this.buttonRectangle.getBottomLeft().y, this.buttonRectangle.getBottomRight().x, this.buttonRectangle.getBottomRight().y, this.borderColor).setOrigin(0, 0);
        this.rightBorder = this.scene.add.line(0, 0, this.buttonRectangle.getBottomRight().x, this.buttonRectangle.getBottomRight().y, this.buttonRectangle.getTopRight().x, this.buttonRectangle.getTopRight().y, this.borderColor).setOrigin(0, 0);
        this.topBorder = this.scene.add.line(0, 0, this.buttonRectangle.getTopRight().x, this.buttonRectangle.getTopRight().y, this.buttonRectangle.getTopLeft().x, this.buttonRectangle.getTopLeft().y, this.borderColor).setOrigin(0, 0);
    }

    addText(text: string, classNames?: string, cssStyles?: any,) {
        this.textButton = this.scene.add.dom(this.buttonRectangle.getCenter().x, this.buttonRectangle.getCenter().y, 'p', cssStyles, text);
        if (classNames) {
            this.textButton.setClassName(classNames);
        }
    }

    addToContainer(container: GameObjects.Container) {
        const buttonElements: GameObjects.GameObject[] = [this.buttonRectangle, this.leftBorder, this.bottomBorder, this.rightBorder, this.topBorder];
        if (this.textButton) {
            buttonElements.push(this.textButton);
        }
        container.add(buttonElements);
    }

    get rectangle() {
        return this.buttonRectangle;
    }
}