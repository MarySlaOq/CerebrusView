class Interactable {

    id;
    bounding_box;
    original_bounding_box;
    action;
    sprite;
    tags = []; // Tags for categorization or filtering

    constructor(x, y, width, height, action = null, id = null) {

        this.bounding_box = {
            x: x,
            y: y,
            width: width,
            height: height
        };

        this.original_bounding_box = { ...this.bounding_box }; // Store original bounding box for scaling
        this.action = action;

        // Create element
        this.id = id == null ? `interactable-${Math.floor(Math.random() * 1000000)}` : id;
        const element = document.createElement("div");
        element.classList.add("interactable");
        element.id = this.id;

        element.style.position = "absolute";
        element.style.left = `${x}px`;
        element.style.top = `${y}px`;
        element.style.zIndex = action ? "100" : "0";

        if (width > 0 && height > 0) {
            element.style.width = `${width}px`;
            element.style.height = `${height}px`;
        }

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

        if (this.original_bounding_box.width < 0 || this.original_bounding_box.height < 0) {
            // Get real image size
            const img = new Image();
            img.src = image;
            img.onload = () => {
                const realWidth = img.width;
                const realHeight = img.height;

                // Update the bounding box with the real image size
                this.bounding_box.width = realWidth;
                this.bounding_box.height = realHeight;

                // Update the element style
                element.style.width = `${realWidth}px`;
                element.style.height = `${realHeight}px`;
            };
        }
    }

    addHTML(html) {
        
        const element = document.getElementById(this.id);
        if (element) {
            element.innerHTML = html;
        } else {
            console.warn(`Element with id ${this.id} not found.`);
        }
    }

    addTag(tag) {
        if (!this.tags.includes(tag)) {
            this.tags.push(tag);
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

        // Applly style to all children
        var children = element.children;
        for (let i = 0; i < children.length; i++) {

            const child = children[i];

            child.style.left = `${newX + offsetX}px`;
            child.style.top = `${newY + offsetY}px`;
            child.style.width = `${newWidth}px`;
            child.style.height = `${newHeight}px`;
        }
    }

    element() {
        const element = document.getElementById(this.id);
        if (element) {
            return element;
        } else {
            console.warn(`Element with id ${this.id} not found.`);
            return null;
        }
    }

    toString() {
        return `[Interactable] {x: ${this.bounding_box.x}, y: ${this.bounding_box.y}, width: ${this.bounding_box.width}, height: ${this.bounding_box.height}}`;
    }
}