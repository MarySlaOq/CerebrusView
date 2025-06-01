import Game from './core/core.js';

document.addEventListener("DOMContentLoaded", () => {

    Game.settings.debug_colliders = true; // Enable debug colliders
    Game.game_Init();
    

    // Add interactables (lados esq/right, up/down, hitbox sides size, hitbox height size )

    // Add trashcan 
    let trashcan = new Interactable(995, 550, 200, 200, () => {
        window.open("countdown.html", '_self'); 
    });
    trashcan.addSprite("imgs/trash.png"); // Add sprite to the trashcan interactable
    
    Game.game_RegisterInteractable("Kitchen", trashcan);
    
    // Add scenes  hitbox = lados esq/right, up/down, hitbox sides size, hitbox height size )
    
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
    
    Game.game_RegisterInteractable("Cabinet", new Interactable(800, 300, 300, 200, () => {
        console.log("Cabinet opened");
        Game.game_GotoScene("CabinetOpen");
    }));
    
    Game.game_RegisterInteractable("CabinetOpen", new Interactable(800, 300, 300, 200, () => {
        console.log("Cabinet closed");
        Game.game_GotoScene("Cabinet");
    }));

});


//sounds
function playSound(fileName){
    document.getElementById("shotGun").setAttribute('src', fileName);
    document.getElementById("button").setAttribute('src', fileName);
   // document.getElementById("shotGun").load(); //call this to just preload the audio without playing
   // document.getElementById("birdsSound").play(); //call this to play the song right away
}