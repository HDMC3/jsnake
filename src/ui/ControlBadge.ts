import { GameObjects, Scene } from "phaser";

export class ControlBadge {

    private badgeRectangle: GameObjects.Rectangle;
    private leftBorder: GameObjects.Line;
    private bottomBorder: GameObjects.Line;
    private rightBorder: GameObjects.Line;
    private topBorder: GameObjects.Line;
    
    constructor(
        private x: number,
        private y: number,
        private width: number,
        private height: number,
        private backgroundColor: number,
        private borderColor: number,
        private scene: Scene
    ) {
        this.badgeRectangle = this.scene.add.rectangle(this.x, this.y, this.width, this.height, this.backgroundColor);
        this.topBorder = this.scene.add.line(0, 0, this.badgeRectangle.getTopLeft().x, this.badgeRectangle.getTopLeft().y, this.badgeRectangle.getBottomLeft().x, this.badgeRectangle.getBottomLeft().y, this.borderColor).setOrigin(0, 0)
        this.rightBorder = this.scene.add.line(0, 0, this.badgeRectangle.getBottomLeft().x, this.badgeRectangle.getBottomLeft().y, this.badgeRectangle.getBottomRight().x, this.badgeRectangle.getBottomRight().y, this.borderColor).setOrigin(0, 0)
        this.leftBorder = this.scene.add.line(0, 0, this.badgeRectangle.getBottomRight().x, this.badgeRectangle.getBottomRight().y, this.badgeRectangle.getTopRight().x, this.badgeRectangle.getTopRight().y, this.borderColor).setOrigin(0, 0)
        this.bottomBorder = this.scene.add.line(0, 0, this.badgeRectangle.getTopRight().x, this.badgeRectangle.getTopRight().y, this.badgeRectangle.getTopLeft().x, this.badgeRectangle.getTopLeft().y, this.borderColor).setOrigin(0, 0)
    }

    addToContainer(container: GameObjects.Container) {
        container.add([
            this.badgeRectangle, this.topBorder, this.rightBorder, this.leftBorder, this.bottomBorder
        ]);
    }

    get rectangle() {
        return this.badgeRectangle;
    }
}