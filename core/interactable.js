class Interactable {

    bounding_box;
    action;

    constructor(x, y, width, height, action = null) {
        this.bounding_box = {
            x: x,
            y: y,
            width: width,
            height: height
        };

        this.action = action;
    }

    toString() {
        return `[Interactable] {x: ${this.bounding_box.x}, y: ${this.bounding_box.y}, width: ${this.bounding_box.width}, height: ${this.bounding_box.height}}`;
    }
}