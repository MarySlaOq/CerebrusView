import Game from './core/core.js';

document.addEventListener("DOMContentLoaded", () => {

    Game.settings.debug_colliders = true; // Enable debug colliders
    Game.game_Init();
    
    // Add trashcan
    let trashcan = new Interactable(900, 470, 320, 320, () => {
        window.open("countdown.html", '_self'); 
    });
    trashcan.addSprite("imgs/trash.png"); // Add sprite to the trashcan interactable
    
    Game.game_RegisterInteractable("Kitchen", trashcan);
    
    // Add interactables
    // Opeanable fridge
    Game.game_RegisterInteractable("Fridge", new Interactable(500, 70, 320, 630, () => {
        console.log("Fridge opened");
        Game.game_GotoScene("FridgeOpen");
    }));
    
    Game.game_RegisterInteractable("FridgeOpen", new Interactable(500, 70, 320, 630, () => {
        console.log("Fridge closed");
        Game.game_GotoScene("Fridge");
    }));
    
    //openable cabinet
    
    Game.game_RegisterInteractable("Cabinet", new Interactable(500, 100, 400, 630, () => {
        console.log("Cabinet opened");
        Game.game_GotoScene("CabinetOpen");
    }));
    
    Game.game_RegisterInteractable("CabinetOpen", new Interactable(500, 100, 400, 630, () => {
        console.log("Cabinet closed");
        Game.game_GotoScene("Cabinet");
    }));

});