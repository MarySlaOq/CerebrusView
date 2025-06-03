let game_state = {
    currentScene: null,
    isRunning: false,
    scene_map: {},
    portal_mapping: [], // Mapping for portal memory
    render_data: {},
    inventory: {}
};

const scopes = Object.freeze({
    SCENE: "scene",
    ALL: "all"
});

let settings = {
    debug_colliders: false,
    enable_overflow_collision: false, // Should collidefrs outside the game area be enabled?
    target_resolution: { width: 1920, height: 1080 },
}; 

const get_scene = () => {
    return document.getElementById("scene");
}

function game_Init() {

    // Initialize game settings
    console.log("Game initialized");
    game_state.isRunning = true;

    game_state.render_data.original = {
        width: settings.target_resolution.width || 1920,
        height: settings.target_resolution.height || 1080,
        left: 0,
        top: 0,
    };

    // Set up the game container
    r_UpdateScreenSize();

    // Initialize scenes
    game_InitScenes();

    // Add event listeners to portals
    game_InitPortals();
}

function game_InitScenes() {

    // Add the root scene
    let root_scene = new Scene("root", false);
    game_state.scene_map["root"] = root_scene;

    document.querySelectorAll(".scene").forEach(scene => {

        let is_active = scene.classList.contains("active");
        scene.style.display = "none";

        if (scene.id == "root") {
            console.error("You can't create a scene with the id 'root'. Please use a different id.")
            return;
        }

        // Make scene object
        let scene_obj = new Scene(scene.id);
        game_state.scene_map[scene.id] = scene_obj;

        // If the scene is active, set it as the current scene
        if (is_active) 
            game_LoadScene(scene_obj);
    });
}

// Define portal information
const portal_data = {
    left: {
        x: 0,
        y: settings.target_resolution.height / 2, 
        sprite: "core/res/ArrowLeft.png",
        scale : 0.40,
    },
    right: {
        x: settings.target_resolution.width, 
        y: settings.target_resolution.height / 2,
        sprite: "core/res/ArrowRight.png",
        scale: 0.40,
    }
};

function game_InitPortals() {

    // get portal image size
    var URL = portal_data.left.sprite;
    var img = new Image();

    img.src = URL;
    img.onload = () => {

        // Set portal width and height based on the image size
        for (const side in portal_data) {
            portal_data[side].width = img.width * portal_data[side].scale;
            portal_data[side].height = img.height * portal_data[side].scale;
        }

        // Initialize portals after image is loaded
        document.querySelectorAll(".portal").forEach(portal => {
        
            if (portal.hasAttribute("href")) {
    
                // Get portal scene
                const parentScene = portal.parentElement.parentElement.id;
    
                // Create portal interactable
                const portalSide = portal.classList.contains("left");
                const positioning = portal_data[portalSide ? "left" : "right"];
                if (!portalSide)
                    positioning.x -= positioning.width; 
    
                let portal_interactable = new Interactable(
                    positioning.x,
                    positioning.y - positioning.height / 2, 
                    positioning.width,
                    positioning.height,
                    () => {
                        game_GotoScene(portal.getAttribute("href"));
                    }
                );
    
                // Set portal sprite
                portal_interactable.addSprite(positioning.sprite);
    
                // Register the portal interactable
                game_RegisterInteractable(parentScene, portal_interactable);

                // Delete the portal element from the DOM
                portal.parentNode.removeChild(portal);
    
        } else {
                console.warn("Portal does not have a valid href attribute.");
            }
        });
    };
}

function game_LoadScene(scene) {

    // Unload the current scene if it exists
    if (game_state.currentScene) {

        let current_scene_element = document.getElementById(game_state.currentScene.scene_id);
        current_scene_element.style.display = "none"; // Hide the current scene
    }

    // Load the specified scene
    console.log(`Scene ${scene.scene_id} loaded`);
    game_state.currentScene = scene; 

    r_DrawGame(); // Render the game after loading the scene
}

function game_GotoScene(scene_id) {
    // Go to a specific scene by ID
    if (game_state.scene_map[scene_id]) {

        // Load scene
        game_LoadScene(game_state.scene_map[scene_id]);

    } else {
        console.warn(`Scene ${scene_id} not found in scene map.`);
    }
}

function game_Exit() {

    // Exit the game
    console.log("Game exited");
    game_state.isRunning = false;

    document.getElementById("game").innerHTML = "Bye loser"; // Clear the game container
}

function game_RegisterInteractable(scene, interactable) {

    game_state.scene_map[scene].addInteractable(interactable);
    r_DrawGame(); // Initial render of the game
}

function r_DrawGame() {

    // Render the current scene
    if (game_state.currentScene) {

        let scene_element = document.getElementById(game_state.currentScene.scene_id);
        scene_element.style.display = "block"; // Show the current scene
        
        // Set backgroud image
        get_scene().style.backgroundImage = `url(${game_state.currentScene.image_file})`;

    } else {
        console.warn("No current scene to render.");
    }

    r_UpdateInteractables(); // Update interactables positions

    if (settings.debug_colliders) 
        r_DrawColliders();
}

function r_DrawColliders() {

    // Clear previous colliders
    let scene_element = document.getElementById(game_state.currentScene.scene_id);
    if (scene_element) {
        [...scene_element.querySelectorAll(".collider")].forEach(collider => collider.remove());
    }

    // Draw debug colliders for interactables
    Object.keys(game_state.scene_map).forEach(scene => {

        if (game_state.currentScene && game_state.currentScene.scene_id !== scene) return; // Skip if not the current scene

        let interactables = game_GetAllColliders(scopes.SCENE);

        interactables.forEach(interactable => {

            let pos = m_CalculateInteractablePosition(interactable);
            let bounding_box = interactable.bounding_box;

            // Create a debug collider element
            let collider = document.createElement("div");
            collider.classList.add("collider");
            collider.style.position = "absolute";

            // Set collider styles
            collider.style.border = "1px solid red"; // Red border for visibility

            collider.style.left = `${pos.x}px`;
            collider.style.top = `${pos.y}px`;
            collider.style.width = `${bounding_box.width}px`;
            collider.style.height = `${bounding_box.height}px`;

            // Append to the scene
            document.getElementById(game_state.currentScene.scene_id).appendChild(collider);
        });
    });
}

function r_UpdateScreenSize() {

    const screen_size = m_CalculateScreenSize();

    game_state.render_data.width = screen_size.width;
    game_state.render_data.height = screen_size.height;
    game_state.render_data.left = 0;
    game_state.render_data.top = 0;
    game_state.render_data.right = game_state.render_data.left + game_state.render_data.width;
    game_state.render_data.bottom = game_state.render_data.top + game_state.render_data.height;

    // Clamp the render data
    game_state.render_data.width = m_Clamp(game_state.render_data.width, 300, window.innerWidth);
    game_state.render_data.height = m_Clamp(game_state.render_data.height, 300, window.innerHeight);

    // Update the game container size
    const game_container = get_scene();
    game_container.style.width = `${game_state.render_data.width}px`;
    game_container.style.height = `${game_state.render_data.height}px`;
    game_container.style.left = `${game_state.render_data.left}px`;
    game_container.style.top = `${game_state.render_data.top}px`;

    // Update the interactable positions and scale
    let interactables = game_GetAllColliders();
    let boundingLeft = get_scene().getBoundingClientRect().left;
    let boundingTop = get_scene().getBoundingClientRect().top;

    interactables.forEach(interactable => {

        interactable.updatePosition(
            game_state.render_data.width,
            game_state.render_data.height,
            game_state.render_data.original.width, 
            game_state.render_data.original.height,
            game_state.render_data.left + boundingLeft,
            game_state.render_data.top + boundingTop
        );
    });
}

function game_GetAllColliders(scope = scopes.SCENE) {

    let colliders = [];

    if (scope === scopes.SCENE && game_state.currentScene) {
        
        // Get colliders only from the current scene
        colliders = game_state.currentScene?.interactables || [];

    } else if (scope === scopes.ALL) {

        // Get colliders from all scenes
        for (const scene_id in game_state.scene_map) {
            colliders.push(...game_state.scene_map[scene_id].getColliders());
        }
    }

    return new Set(colliders);
}

function m_CalculateScreenSize() {

    const monitor_width = window.innerWidth;
    const monitor_height = window.innerHeight;

    const target_aspect = settings.target_resolution.width / settings.target_resolution.height;
    const screen_aspect = monitor_width / monitor_height;

    let width, height;

    if (screen_aspect > target_aspect) {
        height = monitor_height;
        width = height * target_aspect;
    } else {
        width = monitor_width;
        height = width / target_aspect;
    }

    return {
        width,
        height,
    };
}

function m_CalculateInteractablePosition(interactable) {

    let boundingLeft = get_scene().getBoundingClientRect().left;
    let boundingTop = get_scene().getBoundingClientRect().top;

    // Calculate the position of an interactable based on its bounding box
    return {
        x: interactable.bounding_box.x + game_state.render_data.left + boundingLeft,
        y: interactable.bounding_box.y + game_state.render_data.top + boundingTop
    };
}

function m_Clamp(num, min, max) {
    return num <= min 
      ? min 
      : num >= max 
        ? max 
        : num
}

function r_UpdateInteractables() {

    // Disable all interactables initially
    document.querySelectorAll(".interactable").forEach(element => {
        element.style.display = "none"; 
    });

    // Update the positions of interactables based on the current scene
    if (!game_state.currentScene) return; // No current scene
    let interactables = game_GetAllColliders(scopes.SCENE);

    interactables.forEach(interactable => {
        let pos = m_CalculateInteractablePosition(interactable);
        let element = document.getElementById(interactable.id);

        if (element) {
            element.style.left = `${pos.x}px`;
            element.style.top = `${pos.y}px`;

            element.style.display = "block"; // Ensure the interactable is visible
        } else {
            console.warn(`Interactable element with id ${interactable.id} not found.`);
        }
    });

    r_UpdateScreenSize();
}

// Inventory definitions
function i_AddItem(item) {

    if (!game_state.inventory[item]) {
        game_state.inventory[item] = 0; // Initialize item count if not present
    }

    game_state.inventory[item]++;
    console.log(`Added ${item} to inventory. Total: ${game_state.inventory[item]}`);
}

function i_RemoveItem(item, count = 1) {

    if (game_state.inventory[item]) {
        game_state.inventory[item] -= count;

        if (game_state.inventory[item] <= 0) {
            delete game_state.inventory[item];
        }

        console.log(`Removed ${count} ${item}(s) from inventory. Remaining: ${game_state.inventory[item] || 0}`);
    } else {
        console.warn(`Item ${item} not found in inventory.`);
    }
}

function i_GetItem(item) {
    return game_state.inventory[item] || 0;
}

// Hook window resize
window.addEventListener("resize", () => {

    // Update render data on window resize
    r_UpdateScreenSize();
    r_DrawGame(); // Redraw the game
});

// Hook mouse click events for interactables
document.addEventListener("click", (event) => {

    if (!game_state.currentScene) return; // No current scene

    // Check if outside the game area
    if (!settings.enable_overflow_collision) {

        let scene_box = get_scene().getBoundingClientRect();
        if (event.clientX < scene_box.left || event.clientX > scene_box.right ||
            event.clientY < scene_box.top || event.clientY > scene_box.bottom) {
            return; 
        }
    }

    let interactables = game_GetAllColliders(scopes.SCENE);

    interactables.forEach(interactable => {

        if (!interactable.action) return;

        let pos = m_CalculateInteractablePosition(interactable);
        let bounding_box = interactable.bounding_box;

        // Check if the click is within the interactable's bounding box
        if (event.clientX >= pos.x && event.clientX <= pos.x + bounding_box.width &&
            event.clientY >= pos.y && event.clientY <= pos.y + bounding_box.height) {
            
            // Trigger the interactable's action
            interactable.action();

            console.log(`Interacted with ${interactable} at (${event.clientX}, ${event.clientY})`);
        }
    });
});

export default {
    game_Init,
    game_GotoScene,
    game_Exit,
    game_RegisterInteractable,
    settings,
    inventory: {
        i_AddItem,
        i_RemoveItem,
        i_GetItem
    }
}