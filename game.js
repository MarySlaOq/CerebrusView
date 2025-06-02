import Game from './core/core.js';

document.addEventListener("DOMContentLoaded", () => {

    Game.settings.debug_colliders = true; // Enable debug colliders
    Game.settings.aspect_ratio = 16/9; // Set aspect ratio to 16:9

    Game.game_Init();
    

    // Add interactables (lados esq/right, up/down, hitbox sides size, hitbox height size )

        // Add fridge 
            //img
            let fridgeimg = new Interactable(930, 190, 500, 500);
            //hitbox
            let fridge = new Interactable(1070, 250, 210, 400, () => {
            window.open("countdown.html", '_self'); 
            });

            fridgeimg.addSprite("imgs/Kitchen_fridge.png"); // Add sprite to the trashcan interactable
            Game.game_RegisterInteractable("Kitchen", fridgeimg);
            Game.game_RegisterInteractable("Kitchen", fridge);

        // Add cabinet 
            //img
            let cabinetimg = new Interactable(790, 400, 300, 300);
            //hitbox
            let cabinet = new Interactable(809, 420, 205, 240, () => {
            window.open("countdown.html", '_self'); 
            });

            cabinetimg.addSprite("imgs/Kitchen_cabinet.png"); // Add sprite to the trashcan interactable
            Game.game_RegisterInteractable("Kitchen", cabinetimg);
            Game.game_RegisterInteractable("Kitchen", cabinet);

        // Add PETBOWL 
            //img
            let bowlimg = new Interactable(1230, 630, 260, 260);
            //hitbox
            let bowl = new Interactable(1260, 699, 198, 123, () => {
            window.open("countdown.html", '_self'); 
            });

            bowlimg.addSprite("imgs/Kitchen_foodwater.png"); // Add sprite to the trashcan interactable
            Game.game_RegisterInteractable("Kitchen", bowlimg);
            Game.game_RegisterInteractable("Kitchen", bowl);

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