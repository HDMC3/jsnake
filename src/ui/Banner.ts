import { GameObjects, Scene } from "phaser";

export class Banner {
    private bannerRectangle: GameObjects.Rectangle;
    private backgroundBannerRectangle: GameObjects.Rectangle;

    private textBanner?: GameObjects.DOMElement;

    private leftBorderInnerContour: GameObjects.Line;
    private bottomBorderInnerContour: GameObjects.Line;
    private rightBorderInnerContour: GameObjects.Line;
    private topBorderInnerContour: GameObjects.Line;

    private leftBorderOuterContour: GameObjects.Line;
    private bottomBorderOuterContour: GameObjects.Line;
    private rightBorderOuterContour: GameObjects.Line;
    private topBorderOuterContour: GameObjects.Line;


    constructor(
        private x: number,
        private y: number,
        private width: number,
        private height: number,
        private borderColor: number,
        private backgroundColor: number,
        private borderContourColor: number,
        private scene: Scene
    ) {
        this.bannerRectangle = this.scene.add.rectangle(this.x, this.y, this.width, this.height, this.borderColor);
        this.backgroundBannerRectangle = this.scene.add.rectangle(this.x, this.y, this.bannerRectangle.width - 10, this.bannerRectangle.height - 10, this.backgroundColor);

        this.leftBorderInnerContour = this.scene.add.line(0, 0, this.backgroundBannerRectangle.getTopLeft().x, this.backgroundBannerRectangle.getTopLeft().y, this.backgroundBannerRectangle.getBottomLeft().x, this.backgroundBannerRectangle.getBottomLeft().y, this.borderContourColor).setOrigin(0, 0);
        this.bottomBorderInnerContour = this.scene.add.line(0, 0, this.backgroundBannerRectangle.getBottomLeft().x, this.backgroundBannerRectangle.getBottomLeft().y, this.backgroundBannerRectangle.getBottomRight().x, this.backgroundBannerRectangle.getBottomRight().y, this.borderContourColor).setOrigin(0, 0);
        this.rightBorderInnerContour = this.scene.add.line(0, 0, this.backgroundBannerRectangle.getBottomRight().x, this.backgroundBannerRectangle.getBottomRight().y, this.backgroundBannerRectangle.getTopRight().x, this.backgroundBannerRectangle.getTopRight().y, this.borderContourColor).setOrigin(0, 0);
        this.topBorderInnerContour = this.scene.add.line(0, 0, this.backgroundBannerRectangle.getTopRight().x, this.backgroundBannerRectangle.getTopRight().y, this.backgroundBannerRectangle.getTopLeft().x, this.backgroundBannerRectangle.getTopLeft().y, this.borderContourColor).setOrigin(0, 0);

        this.leftBorderOuterContour = this.scene.add.line(0, 0, this.bannerRectangle.getTopLeft().x, this.bannerRectangle.getTopLeft().y, this.bannerRectangle.getBottomLeft().x, this.bannerRectangle.getBottomLeft().y, this.borderContourColor).setOrigin(0, 0)
        this.bottomBorderOuterContour = this.scene.add.line(0, 0, this.bannerRectangle.getBottomLeft().x, this.bannerRectangle.getBottomLeft().y, this.bannerRectangle.getBottomRight().x, this.bannerRectangle.getBottomRight().y, this.borderContourColor).setOrigin(0, 0)
        this.rightBorderOuterContour = this.scene.add.line(0, 0, this.bannerRectangle.getBottomRight().x, this.bannerRectangle.getBottomRight().y, this.bannerRectangle.getTopRight().x, this.bannerRectangle.getTopRight().y, this.borderContourColor).setOrigin(0, 0)
        this.topBorderOuterContour = this.scene.add.line(0, 0, this.bannerRectangle.getTopRight().x, this.bannerRectangle.getTopRight().y, this.bannerRectangle.getTopLeft().x, this.bannerRectangle.getTopLeft().y, this.borderContourColor).setOrigin(0, 0)
    }

    addText(text: string, classNames?: string, cssStyles?: any, domTag?: string) {
        this.textBanner = this.scene.add.dom(this.bannerRectangle.getCenter().x, this.bannerRectangle.getCenter().y, domTag || 'h1', cssStyles, text);
        if (classNames) {
            this.textBanner.setClassName(classNames);
        }
    }

    addToContainer(container: GameObjects.Container) {
        const buttonElements: GameObjects.GameObject[] = [
            this.bannerRectangle, this.backgroundBannerRectangle, 
            this.leftBorderInnerContour, this.bottomBorderInnerContour, this.rightBorderInnerContour, this.topBorderInnerContour,
            this.leftBorderOuterContour, this.bottomBorderOuterContour, this.rightBorderOuterContour, this.topBorderOuterContour
        ];
        if (this.textBanner) {
            buttonElements.push(this.textBanner);
        }
        container.add(buttonElements);
    }
}