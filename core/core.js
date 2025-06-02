let game_state = {
    currentScene: null,
    isRunning: false,
    scene_map: {},
    portal_mapping: [], // Mapping for portal memory
    render_data: {}
};

let settings = {
    debug_colliders: false,
    aspect_ration: 16 / 9,
}; 

const PORTAL_OFFSET_X = 150; // Offset for portal positioning
const PORTAL_OFFSET_Y = 50; // Offset for portal positioning

const get_scene = () => {
    return document.getElementById("scene");
}

function m_CalculateScreenSize() {

    const monitor_width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    const monitor_height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

    const aspect_ratio = settings.aspect_ration || 16 / 9;
    let width = monitor_width;
    let height = monitor_height;
    if (width / height > aspect_ratio) {
        width = height * aspect_ratio;
    } else {
        height = width / aspect_ratio;
    }

    game_state.render_data.width = width;
    game_state.render_data.height = height;
}

function game_Init() {

    // Initialize game settings
    console.log("Game initialized");
    game_state.isRunning = true;

    m_CalculateScreenSize(); // Calculate initial screen size
    game_state.render_data = {
        left: get_scene().offsetLeft,
        right: get_scene().offsetLeft + get_scene().offsetWidth,
        top: get_scene().offsetTop,
        bottom: get_scene().offsetTop + get_scene().offsetHeight
    };

    console.log(`Render data: ${JSON.stringify(game_state.render_data)}`);

    document.querySelectorAll(".scene").forEach(scene => {

        let is_active = scene.classList.contains("active");
        scene.style.display = "none";

        // Make scene object
        let scene_obj = new Scene(scene.id);
        game_state.scene_map[scene.id] = scene_obj;

        // If the scene is active, set it as the current scene
        if (is_active) 
            game_LoadScene(scene_obj);
    });

    // Position portals
    r_UpdatePortals();

    // Add event listeners to portals
    document.querySelectorAll(".portal").forEach(portal => {
        
        if (portal.hasAttribute("href"))

            portal.addEventListener("click", (event) => {
                event.preventDefault(); // Prevent default link behavior
                let target_scene = portal.getAttribute("href");

                if (game_state.scene_map[target_scene]) {

                    game_LoadScene(game_state.scene_map[target_scene]);

                } else {
                    console.warn(`Scene ${target_scene} not found.`);
                }
            });
        else {
            console.warn("Portal does not have a valid href attribute.");
        }
    });
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

    if (settings.debug_colliders) {

        // Clear previous colliders
        let scene_element = document.getElementById(game_state.currentScene.scene_id);
        if (scene_element) {
            [...scene_element.querySelectorAll(".collider")].forEach(collider => collider.remove());
        }

        // Draw debug colliders for interactables
        Object.keys(game_state.scene_map).forEach(scene => {

            let interactables = game_state.scene_map[scene].interactables || [];

            if (game_state.currentScene && game_state.currentScene.scene_id !== scene) return; // Skip if not the current scene

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

    r_UpdatePortals(); // Update portal positions
    r_UpdateInteractables(); // Update interactables positions
}

function m_CalculateInteractablePosition(interactable) {

    // Calculate the position of an interactable based on its bounding box
    return {
        x: interactable.bounding_box.x + game_state.render_data.left,
        y: interactable.bounding_box.y + game_state.render_data.top
    };
}

function m_Clamp(num, min, max) {
    return num <= min 
      ? min 
      : num >= max 
        ? max 
        : num
  }

function r_UpdatePortals() {

    const left_portal_pos = {
        x: game_state.render_data.left + PORTAL_OFFSET_X / 3,
        y: game_state.render_data.top + game_state.render_data.height / 2 - PORTAL_OFFSET_Y
    };

    const right_portal_pos = {
        x: game_state.render_data.right - PORTAL_OFFSET_X,
        y: game_state.render_data.top + game_state.render_data.height / 2 - PORTAL_OFFSET_Y
    };

    document.querySelectorAll(".portal").forEach(portal => {
        
        if (portal.classList.contains("left")) {
            portal.style.left = `${left_portal_pos.x}px`;
            portal.style.top = `${left_portal_pos.y}px`;
        }

        if (portal.classList.contains("right")) {
            portal.style.left = `${right_portal_pos.x}px`;
            portal.style.top = `${right_portal_pos.y}px`;
        }
    });
}

function r_UpdateInteractables() {

    // Disable all interactables initially
    document.querySelectorAll(".interactable").forEach(element => {
        element.style.display = "none"; 
    });

    // Update the positions of interactables based on the current scene
    if (!game_state.currentScene) return; // No current scene
    let interactables = game_state.currentScene.interactables || [];

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
}

// Hook window resize
window.addEventListener("resize", () => {

    // Update render data on window resize
    game_state.render_data.width = get_scene().offsetWidth;
    game_state.render_data.height = get_scene().offsetHeight;
    game_state.render_data.left = get_scene().offsetLeft;
    game_state.render_data.right = get_scene().offsetLeft + get_scene().offsetWidth;

    r_DrawGame(); // Redraw the game
});

// Hook mouse click events for interactables
document.addEventListener("click", (event) => {

    if (!game_state.currentScene) return; // No current scene

    // Check if outside the game area
    if (event.clientX < game_state.render_data.left || 
        event.clientX > game_state.render_data.right || 
        event.clientY < game_state.render_data.top || 
        event.clientY > game_state.render_data.bottom) {
        return; // Click is outside the game area
    }

    let interactables = game_state.currentScene.interactables || [];

    interactables.forEach(interactable => {

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
    settings
}