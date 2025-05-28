import Game from './core/core.js';

Game.settings.debug_colliders = true; // Enable debug colliders
Game.game_Init();

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