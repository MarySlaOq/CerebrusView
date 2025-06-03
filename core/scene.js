class Scene {

    scene_id;
    image_file;
    interactables = [];
    tags = [];

    constructor(id, parse=true){
        
        this.scene_id = id;
        this.image_file = null; 

        if (parse)
            this.parseElement();
    }

    addTag(tag) {
        if (!this.tags.includes(tag)) {
            this.tags.push(tag);
        }
    }

    parseElement() {
                
        // Parse scene data
        let scene_element = document.getElementById(this.scene_id);

        let image_element = scene_element.querySelector("img");
        if (image_element) {

            image_element.style.display = "none"; // Hide the image element
            this.image_file = image_element.src;
        } else {
            console.warn(`Scene ${this.scene_id} does not have an image element.`);
            this.image_file = null; // No image found
        }
    }

    addInteractable(interactable) {
        this.interactables.push(interactable);
    }
}