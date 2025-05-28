class Interactable {

    id;
    bounding_box;
    action;
    sprite;

    constructor(x, y, width, height, action = null) {

        this.bounding_box = {
            x: x,
            y: y,
            width: width,
            height: height
        };

        this.action = action;

        // Create element
        this.id = `interactable-${Math.floor(Math.random() * 1000000)}`;
        const element = document.createElement("div");
        element.classList.add("interactable");
        element.id = this.id;

        element.style.position = "absolute";
        element.style.left = `${x}px`;
        element.style.top = `${y}px`;
        element.style.width = `${width}px`;
        element.style.height = `${height}px`;
        element.style.zIndex = "1000"; 

        // Append to the document body or a specific container
        document.body.appendChild(element);
    }

    addSprite(image) {

        this.sprite = image;

        // Change sprite
        const element = document.getElementById(this.id);
        if (element) {
            element.style.backgroundImage = `url(${image})`;
            element.style.backgroundSize = "cover"; // Cover the entire element
            element.style.backgroundPosition = "center"; // Center the image

        } else {
            console.warn(`Element with id ${this.id} not found.`);
        }
    }

    toString() {
        return `[Interactable] {x: ${this.bounding_box.x}, y: ${this.bounding_box.y}, width: ${this.bounding_box.width}, height: ${this.bounding_box.height}}`;
    }
}