import Game from './core/core.js';

document.addEventListener("DOMContentLoaded", () => {

    Game.settings.debug_colliders = true; // Enable debug colliders
    Game.settings.disable_empty_interactables = true; // Disable empty interactables
    Game.settings.target_resolution = { width: 1920, height: 1080 }; // Set aspect ratio to 16:9

    Game.game_Init();

    const timer = new Interactable(0, 0, 150, 100);
    const start_time = 15;
    let time = start_time;

    timer.addHTML("<p id='timer'>00:00</p>");

    // timer code
    setInterval(() => {
        const timerElement = document.getElementById("timer");
        if (timerElement) {
            
            const minutes = Math.floor(time / 60);
            const seconds = time % 60;
            timerElement.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

            time--;
            
        }
            

    }, 1000); // Update every second

    Game.game_RegisterInteractable(undefined, timer);

    // Add interactables (lados esq/right, up/down, hitbox sides size, hitbox height size )


                                               //KITCHEN
    // Add fridge 
    
    //img
    let fridgeimg = new Interactable(960, 235, 580, 580);
    //hitbox
    let fridge = new Interactable(1130, 290, 260, 330, () => {
        // Check if the fridge has been opened before
        if (Game.inventory.i_GetItem("fridge_opened")) {
            return;
        }
        fridgeimg.addSprite("imgs/Kitchen_fridge-open.png"); // Add sprite to the trashcan interactable
        // Savee in the inventory that the cabinet has been opened
        Game.inventory.i_AddItem("fridge_opened");
        
        Game.game_GotoScene("Fridge");
    });
    let fridge2 = new Interactable(1130, 450, 140, 300, () => {
        
        // Check if the fridge has been opened before
        if (Game.inventory.i_GetItem("fridge_opened")) {
            return;
        }

        // Savee in the inventory that the cabinet has been opened
        Game.inventory.i_AddItem("fridge_opened");
        
        Game.game_GotoScene("Fridge");
    });

    fridgeimg.addSprite("imgs/Kitchen_fridge.png"); // Add sprite to the trashcan interactable
    Game.game_RegisterInteractable("Kitchen", fridgeimg);
    Game.game_RegisterInteractable("Kitchen", fridge);
    Game.game_RegisterInteractable("Kitchen", fridge2);

// Add cabinet 
    //img
    let cabinetimg = new Interactable(770, 478, 300, 300);
    //hitbox
    let cabinet = new Interactable(789, 500, 203, 240, () => {

        // Check if the fridge has been opened before
        if (Game.inventory.i_GetItem("cabinet_opened")) {
            window.alert("You already opened this");
            return;
        }
        cabinetimg.addSprite("imgs/Kitchen_cabinet-open.png"); // Add sprite to the trashcan interactable
        // Savee in the inventory that the cabinet has been opened
        Game.inventory.i_AddItem("cabinet_opened");

        //window.open("countdown.html", '_self'); 
        Game.game_GotoScene("cabinet");
    });

    cabinetimg.addSprite("imgs/Kitchen_cabinet.png"); // Add sprite to the trashcan interactable
    Game.game_RegisterInteractable("Kitchen", cabinetimg);
    Game.game_RegisterInteractable("Kitchen", cabinet);

// Add PETBOWL 
    //img
    let bowlimg = new Interactable(1270, 710, 260, 260);
    //hitbox
    let bowl = new Interactable(1300, 780, 198, 123, () => {        
        Game.game_GotoScene("petbowl");
    });

    bowlimg.addSprite("imgs/Kitchen_foodwater.png"); // Add sprite to the trashcan interactable
    Game.game_RegisterInteractable("Kitchen", bowlimg);
    Game.game_RegisterInteractable("Kitchen", bowl);

// Add trashcan 
    //img
    let trashimg = new Interactable(1250, 610, 200, 200);
    //hitbox
    let trash = new Interactable(1290, 620, 120, 160, () => {

        // Check if the fridge has been opened before
        if (Game.inventory.i_GetItem("trash_opened")) {  
            window.alert("You already opened this");          
            return;
        }
        
        trashimg.addSprite("imgs/Kitchen_trash-open.png"); // Add sprite to the trashcan interactable
        // Savee in the inventory that the cabinet has been opened
        Game.inventory.i_AddItem("trash_opened");
        
        Game.game_GotoScene("trash");
    });

    trashimg.addSprite("imgs/Kitchen_trash.png"); // Add sprite to the trashcan interactable
    Game.game_RegisterInteractable("Kitchen", trashimg);
    Game.game_RegisterInteractable("Kitchen", trash);

                                               //LIVINGROOM


    // Add sofa 
    //img
    let sofaimg = new Interactable(150, 310, 960, 960);
    //hitbox
    let sofa = new Interactable(150, 590, 850, 400, () => {
        // Check if the fridge has been opened before
        if (Game.inventory.i_GetItem("sofa_opened")) {  
            window.alert("You already opened this");          
            return;
        }
        
        sofaimg.addSprite("imgs/LivingRoom_tvstand.png"); // Add sprite to the trashcan interactable
        // Savee in the inventory that the cabinet has been opened
        Game.inventory.i_AddItem("sofa_opened");
        
        Game.game_GotoScene("");
    });

    sofaimg.addSprite("imgs/LivingRoom_sofa.png"); // Add sprite to the trashcan interactable
    Game.game_RegisterInteractable("LivingRoom", sofaimg);
    Game.game_RegisterInteractable("LivingRoom", sofa);



    //add nose
    //img
    let nose = new Interactable(540, 530, 800, 800);
    //hitbox

    nose.addSprite("imgs/nosee.png"); // Add sprite to the trashcan interactable
    Game.game_RegisterInteractable("LivingRoom", nose);

    
    // Add hanger 
    //img
    let hangerimg = new Interactable(1000, 600, 800, 800);
    //hitbox
    let hanger = new Interactable(1290, 400, 120, 160, () => {
        // Check if the fridge has been opened before
        if (Game.inventory.i_GetItem("hanger_opened")) {  
            window.alert("You already opened this");          
            return;
        }
        
        tvimg.addSprite("imgs/LivingRoom_hanger.png"); // Add sprite to the trashcan interactable
        // Savee in the inventory that the cabinet has been opened
        Game.inventory.i_AddItem("hanger_opened");
        
        Game.game_GotoScene("");
    });

    hangerimg.addSprite("imgs/LivingRoom_hanger.png"); // Add sprite to the trashcan interactable
    Game.game_RegisterInteractable("LivingRoom", hangerimg);
    Game.game_RegisterInteractable("LivingRoom", hanger);

    // Add books~case 
    //img
    let bookimg = new Interactable(460, 250, 330, 330);
    //hitbox
    let book = new Interactable(480, 250, 275, 320, () => {
        // Check if the fridge has been opened before
        if (Game.inventory.i_GetItem("book_opened")) {  
            window.alert("You already opened this");          
            return;
        }
        
        bookimg.addSprite("imgs/LivingRoom_bookcase.png"); // Add sprite to the trashcan interactable
        // Savee in the inventory that the cabinet has been opened
        Game.inventory.i_AddItem("book_opened");
        
        Game.game_GotoScene("");
    });

    bookimg.addSprite("imgs/LivingRoom_bookcase.png"); // Add sprite to the trashcan interactable
    Game.game_RegisterInteractable("LivingRoom", bookimg);
    Game.game_RegisterInteractable("LivingRoom", book);

    // Add cofee table 
    //img
    let coffeeimg = new Interactable(956, 610, 140, 140);
    //hitbox
    let coffee = new Interactable(1000, 610, 75, 140, () => {
        // Check if the fridge has been opened before
        if (Game.inventory.i_GetItem("coffee_opened")) {  
            window.alert("You already opened this");          
            return;
        }
        
        coffeeimg.addSprite("imgs/LivingRoom_coffeetable.png"); // Add sprite to the trashcan interactable
        // Savee in the inventory that the cabinet has been opened
        Game.inventory.i_AddItem("tv_opened");
        
        Game.game_GotoScene("");
    });

    coffeeimg.addSprite("imgs/LivingRoom_coffeetable.png"); // Add sprite to the trashcan interactable
    Game.game_RegisterInteractable("LivingRoom", coffeeimg);
    Game.game_RegisterInteractable("LivingRoom", coffee);




    // Add tvstand 
    //img
    let tvimg = new Interactable(828, 294, 450, 450);
    //hitbox
    let tv = new Interactable(2000, 720, 120, 160, () => {
        // Check if the fridge has been opened before
        if (Game.inventory.i_GetItem("tv_opened")) {  
            window.alert("You already opened this");          
            return;
        }
        
        tvimg.addSprite("imgs/Kitchen_trash-open.png"); // Add sprite to the trashcan interactable
        // Savee in the inventory that the cabinet has been opened
        Game.inventory.i_AddItem("tv_opened");
        
        Game.game_GotoScene("");
    });

    tvimg.addSprite("imgs/LivingRoom_tvstand.png"); // Add sprite to the trashcan interactable
    Game.game_RegisterInteractable("LivingRoom", tvimg);
    Game.game_RegisterInteractable("LivingRoom", tv);


// Add scenes  hitbox = lados esq/right, up/down, hitbox sides size, hitbox height size )
    // fridge
    Game.game_RegisterInteractable("Fridge", new Interactable(715, 100, 480, 950, () => {

        Game.game_GotoScene("FridgeOpen");
    }));
    
    Game.game_RegisterInteractable("FridgeOpen", new Interactable(500, 100, 800, 1100, () => {
        console.log("Fridge closed");
        Game.game_GotoScene("FridgeMessy");
    }));
    
    Game.game_RegisterInteractable("FridgeMessy", new Interactable(715, 100, 480, 950, () => {
        console.log("Fridge closed");
        Game.game_GotoScene("Kitchen");
    }));
    //openable test cabinet
    
    Game.game_RegisterInteractable("Cabinet", new Interactable(800, 300, 300, 200, () => {
        console.log("Cabinet opened");
        Game.game_GotoScene("CabinetOpen");
    }));
    
    Game.game_RegisterInteractable("CabinetOpen", new Interactable(800, 300, 300, 200, () => {
        console.log("Cabinet closed");
        Game.game_GotoScene("Cabinet");
    }));

    //petbowl

    Game.game_RegisterInteractable("petbowl", new Interactable(600, 180, 750, 750, () => {
        console.log("Cabinet opened");
        Game.game_GotoScene("petbowl-eat");
    }));
    
    Game.game_RegisterInteractable("petbowl-eat", new Interactable(320, 250, 1400, 850, () => {
        console.log("Cabinet closed");
        Game.game_GotoScene("Kitchen");
    }));

    //trash

    Game.game_RegisterInteractable("trash", new Interactable(725, 260, 450, 680, () => {
        console.log("Cabinet opened");
        Game.game_GotoScene("trashOpen");
    }));
    
    Game.game_RegisterInteractable("trashOpen", new Interactable(725, 260, 450, 680, () => {
        console.log("Cabinet closed");
        Game.game_GotoScene("trashSniff");
    }));

    Game.game_RegisterInteractable("trashSniff", new Interactable(725, 400, 780, 680, () => {
        console.log("Cabinet closed");
        Game.game_GotoScene("trashBroken");
    }));

    Game.game_RegisterInteractable("trashBroken", new Interactable(725, 260, 450, 680, () => {
        console.log("Cabinet closed");
        Game.game_GotoScene("Kitchen");
    }));

    //openable cabinet
    
    Game.game_RegisterInteractable("cabinet", new Interactable(600, 400, 810, 560, () => {
        console.log("Cabinet opened");
        Game.game_GotoScene("cabinetOpening");
    }));
    
    Game.game_RegisterInteractable("cabinetOpening", new Interactable(830, 400, 500, 540, () => {
        console.log("Cabinet closed");
        Game.game_GotoScene("cabinetGroceries");
    }));

    Game.game_RegisterInteractable("cabinetGroceries", new Interactable(600, 400, 810, 560, () => {
        console.log("Cabinet opened");
        Game.game_GotoScene("cabinetEating");
    }));
    
    Game.game_RegisterInteractable("cabinetEating", new Interactable(830, 400, 500, 540, () => {
        console.log("Cabinet closed");
        Game.game_GotoScene("cabinMessy");
    }));

    Game.game_RegisterInteractable("cabinMessy", new Interactable(600, 400, 810, 560, () => {
        console.log("Cabinet closed");
        Game.game_GotoScene("Kitchen");
    }));

    Game.text.t_ShowModal(["Hai!!! Nani ga suki??", "Chocominto!", "Yori mo anata!"]);
});

    //sofa

    Game.game_RegisterInteractable("sofa", new Interactable(600, 180, 750, 750, () => {
        console.log("sofa opened");
        Game.game_GotoScene("petbowl-eat");
    }));
    
    Game.game_RegisterInteractable("petbowl-eat", new Interactable(320, 250, 1400, 850, () => {
        console.log("Cabinet closed");
        Game.game_GotoScene("Kitchen");
    }));

//sounds
function playSound(fileName){
    document.getElementById("shotGun").setAttribute('src', fileName);
    document.getElementById("button").setAttribute('src', fileName);
   // document.getElementById("shotGun").load(); //call this to just preload the audio without playing
   // document.getElementById("birdsSound").play(); //call this to play the song right away
};