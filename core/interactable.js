class Interactable {

    id;
    bounding_box;
    original_bounding_box;
    action;
    sprite;

    constructor(x, y, width, height, action = null) {

        this.bounding_box = {
            x: x,
            y: y,
            width: width,
            height: height
        };

        this.original_bounding_box = { ...this.bounding_box }; // Store original bounding box for scaling
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

        if (action == null) {
            // Deactivate pointer events if no action is provided
            element.style.pointerEvents = "none";
        }

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

    updatePosition(currentWidth, currentHeight, originalWidth, originalHeight, offsetX, offsetY) {
        
        const targetAspect = originalWidth / originalHeight;
        const currentAspect = currentWidth / currentHeight;
        
        let scale, effectiveWidth, effectiveHeight, xOffset = 0, yOffset = 0;
        
        if (currentAspect > targetAspect) {
            // Letterboxing (black bars top and bottom)
            scale = currentHeight / originalHeight;
            effectiveWidth = originalWidth * scale;
            xOffset = (currentWidth - effectiveWidth) / 2;
        } else {
            // Pillarboxing (black bars left and right)
            scale = currentWidth / originalWidth;
            effectiveHeight = originalHeight * scale;
            yOffset = (currentHeight - effectiveHeight) / 2;
        }
        
        // Apply scaling to position and size
        const newX = (this.original_bounding_box.x * scale) + xOffset;
        const newY = (this.original_bounding_box.y * scale) + yOffset;
        const newWidth = this.original_bounding_box.width * scale;
        const newHeight = this.original_bounding_box.height * scale;
        
        this.bounding_box = {
            x: newX,
            y: newY,
            width: newWidth,
            height: newHeight
        };
        
        const element = document.getElementById(this.id);
        if (element) {
            element.style.left = `${newX + offsetX}px`;
            element.style.top = `${newY + offsetY}px`;
            element.style.width = `${newWidth}px`;
            element.style.height = `${newHeight}px`;
        }
    }

    toString() {
        return `[Interactable] {x: ${this.bounding_box.x}, y: ${this.bounding_box.y}, width: ${this.bounding_box.width}, height: ${this.bounding_box.height}}`;
    }
}