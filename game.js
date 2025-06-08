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
        fridgeimg.addSprite("imgs/Kitchen_messyfridge.png"); // Add sprite to the trashcan interactable
        // Savee in the inventory that the cabinet has been opened
        Game.inventory.i_AddItem("fridge_opened");
        
        Game.game_GotoScene("Fridge");
    });
    let fridge2 = new Interactable(1130, 450, 140, 300, () => {
        
        // Check if the fridge has been opened before
        if (Game.inventory.i_GetItem("fridge_opened")) {
            return;
        }
        fridgeimg.addSprite("imgs/Kitchen_messyfridge.png");
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
            return;
        }
        cabinetimg.addSprite("imgs/Kitchen_messycabinets.png"); // Add sprite to the trashcan interactable
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
    let bowlwater = new Interactable(1300, 780, 198, 123, () => {        
        Game.game_GotoScene("petbowl");
        bowlimg.addSprite("imgs/Kitchen_messyfoodwater.png");
        Game.inventory.i_AddItem("bowl_opened");
    });


    bowlimg.addSprite("imgs/Kitchen_foodwater.png"); // Add sprite to the trashcan interactable
    Game.game_RegisterInteractable("Kitchen", bowlimg);
    Game.game_RegisterInteractable("Kitchen", bowlwater);


// Add trashcan 
    //img
    let trashimg = new Interactable(1250, 610, 200, 200);
    //hitbox
    let trash = new Interactable(1290, 620, 120, 160, () => {

        // Check if the fridge has been opened before
        if (Game.inventory.i_GetItem("trash_opened")) {  
                    
            return;
        }
        
        trashimg.addSprite("imgs/Kitchen_messytrash.png"); // Add sprite to the trashcan interactable
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
                    
            return;
        }
        
        sofaimg.addSprite("imgs/LivingRoom_messysofa.png"); // Add sprite to the trashcan interactable
        // Savee in the inventory that the cabinet has been opened
        Game.inventory.i_AddItem("sofa_opened");
        
        Game.game_GotoScene("sofa");
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
    let hangerimg = new Interactable(960,83, 1000, 1000);
    //hitbox
    let hanger = new Interactable(1290, 83, 300, 1000, () => {

        //const allChecked = neededItems.every(key => Game.inventory.i_GetItem(key));
        // Check if the fridge has been opened before
        if (Game.inventory.i_GetItem("fridge_opened" && "cabinet_opened" && "trash_opened" && "sofa_opened" && "book_opened" && "coffee_opened" && "tv_opened" && "hanger_opened")) {  
                     
            return;
        }
        
        tvimg.addSprite("imgs/LivingRoom_hanger.png"); // Add sprite to the trashcan interactable
        // Savee in the inventory that the cabinet has been opened
        Game.inventory.i_AddItem("hanger_opened");
        
        Game.game_GotoScene("hanger");
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
                      
            return;
        }
        
        bookimg.addSprite("imgs/LivingRoom_messybookshelf2.png", (550, 250, 330, 330)); // Add sprite to the trashcan interactable
        // Savee in the inventory that the cabinet has been opened
        Game.inventory.i_AddItem("book_opened");
        
        Game.game_GotoScene("book");
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
                   
            return;
        }
        
        coffeeimg.addSprite("imgs/LivingRoom_messycoffeetable.png"); // Add sprite to the trashcan interactable
        // Savee in the inventory that the cabinet has been opened
        Game.inventory.i_AddItem("coffee_opened");
        
        Game.game_GotoScene("coffee0");
        remote_routine(); 
    });

    coffeeimg.addSprite("imgs/LivingRoom_coffeetable.png"); // Add sprite to the trashcan interactable
    Game.game_RegisterInteractable("LivingRoom", coffeeimg);
    Game.game_RegisterInteractable("LivingRoom", coffee);

    //controler
    let remoteimg = new Interactable;
    remoteimg.addSprite("imgs/coffeetable_remotechanges2.png"); // Add sprite to the trashcan interactable
    Game.game_RegisterInteractable("coffee", remoteimg);



    // Add tvstand 
    //img
    let tvimg = new Interactable(828, 297, 450, 450);
    //hitbox
    let tv = new Interactable(828, 297, 450, 300, () => {
        // Check if the fridge has been opened before
        if (Game.inventory.i_GetItem("tv_opened")) {  
                     
            return;
        }
        
        tvimg.addSprite("imgs/LivingRoom_messytvstand.png"); // Add sprite to the trashcan interactable
        // Savee in the inventory that the cabinet has been opened
        Game.inventory.i_AddItem("tv_opened");
        
        Game.game_GotoScene("tv");
    });
    let tv2 = new Interactable(1080, 297, 200, 425, () => {
        // Check if the fridge has been opened before
        if (Game.inventory.i_GetItem("tv_opened")) {  
                     
            return;
        }
        
        tvimg.addSprite("imgs/LivingRoom_messytvstand.png"); // Add sprite to the trashcan interactable
        // Savee in the inventory that the cabinet has been opened
        Game.inventory.i_AddItem("tv_opened");
        
        Game.game_GotoScene("tv");
    });

    tvimg.addSprite("imgs/LivingRoom_tvstand.png"); // Add sprite to the trashcan interactable
    Game.game_RegisterInteractable("LivingRoom", tvimg);
    Game.game_RegisterInteractable("LivingRoom", tv);
    Game.game_RegisterInteractable("LivingRoom", tv2);


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

    Game.game_RegisterInteractable("petbowl", new Interactable(900, 150, 250, 250, () => {
        console.log("Cabinet opened");
        Game.game_GotoScene("petbowl-eat");
    }));
    Game.game_RegisterInteractable("petbowl", new Interactable(620, 220, 250, 250, () => {
        console.log("Cabinet opened");
        Game.game_GotoScene("petbowl-drink");
    }));
    
    Game.game_RegisterInteractable("petbowl-drink", new Interactable(250, 250, 1350, 850, () => {
        console.log("Cabinet closed");
        Game.game_GotoScene("Kitchen");
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

                                              //living room

    //sofa

    //sofa

    Game.game_RegisterInteractable("sofa", new Interactable(300, 180, 1200, 750, () => {
        console.log("sofa opened");
        Game.game_GotoScene("sofa2");
    }));
    
    Game.game_RegisterInteractable("sofa2", new Interactable(300, 180, 1200, 750, () => {
        console.log("Cabinet closed");
        Game.game_GotoScene("sofa3");
    }));
    Game.game_RegisterInteractable("sofa3", new Interactable(300, 180, 1200, 750, () => {
        console.log("Cabinet closed");
        Game.game_GotoScene("sofa4");
    }));
    Game.game_RegisterInteractable("sofa4", new Interactable(300, 250, 1200, 750, () => {
        console.log("Cabinet closed");
        Game.game_GotoScene("sofa5");
    }));
    Game.game_RegisterInteractable("sofa5", new Interactable(300, 180, 1200, 750, () => {
        console.log("Cabinet closed");
        Game.game_GotoScene("LivingRoom");
    }));

    //coffeeset

    Game.game_RegisterInteractable("coffee0", new Interactable(600, 180, 750, 750, () => {
        console.log("sofa opened");
        Game.game_GotoScene("coffee");
    }));
    25
    Game.game_RegisterInteractable("coffee", new Interactable(0, 0, 0, 0, () => {
        console.log("Cabinet closed");
        Game.game_GotoScene("coffee1");
    }));

    Game.game_RegisterInteractable("coffee1", new Interactable(600, 180, 750, 750, () => {
        console.log("sofa opened");
        Game.game_GotoScene("LivingRoom");
        
    }));

    //tvv
    Game.game_RegisterInteractable("tv", new Interactable(300, 180, 1200, 750, () => {
        console.log("sofa opened");
        Game.game_GotoScene("tv2");
    }));
    Game.game_RegisterInteractable("tv2", new Interactable(300, 180, 1200, 750, () => {
        console.log("sofa opened");
        Game.game_GotoScene("tv3");
    }));
    Game.game_RegisterInteractable("tv3", new Interactable(300, 180, 1200, 750, () => {
        console.log("sofa opened");
        Game.game_GotoScene("tv4");
    }));
    Game.game_RegisterInteractable("tv4", new Interactable(300, 180, 1200, 750, () => {
        console.log("sofa opened");
        Game.game_GotoScene("tv5");
    }));9
    Game.game_RegisterInteractable("tv5", new Interactable(300, 100, 1400, 800, () => {
        console.log("sofa opened");
        Game.game_GotoScene("LivingRoom");
    }));

    //book
    Game.game_RegisterInteractable("book", new Interactable(300, 180, 1200, 750, () => {
        console.log("sofa opened");
        Game.game_GotoScene("book1");
    }));
    Game.game_RegisterInteractable("book1", new Interactable(300, 180, 1200, 750, () => {
        console.log("sofa opened");
        Game.game_GotoScene("book2");
    }));
    Game.game_RegisterInteractable("book2", new Interactable(300, 180, 1200, 750, () => {
        console.log("sofa opened");
        Game.game_GotoScene("book3");
    }));
    Game.game_RegisterInteractable("book3", new Interactable(300, 180, 1200, 750, () => {
        console.log("sofa opened");
        Game.game_GotoScene("book4");
    }));
    Game.game_RegisterInteractable("book4", new Interactable(300, 180, 1200, 750, () => {
        console.log("sofa opened");
        Game.game_GotoScene("LivingRoom");
    }));

    //hanger
    Game.game_RegisterInteractable("hanger", new Interactable(300, 180, 1200, 750, () => {
        console.log("sofa opened");
        Game.game_GotoScene("hanger1");
    }));
    Game.game_RegisterInteractable("hanger1", new Interactable(300, 180, 1200, 750, () => {
        console.log("sofa opened");
        Game.game_GotoScene("hanger2");
    }));
    Game.game_RegisterInteractable("hanger2", new Interactable(300, 180, 1200, 750, () => {
        console.log("sofa opened");
        Game.game_GotoScene("hanger3");
    }));
    Game.game_RegisterInteractable("hanger3", new Interactable(300, 180, 1200, 750, () => {
        console.log("sofa opened");
        Game.game_GotoScene("hanger4");
    }));
    Game.game_RegisterInteractable("hanger4", new Interactable(300, 180, 1200, 750, () => {
        console.log("sofa opened");
        window.open("end.html", "_self");
    }));


    // Register remote
    // <img id="remote" src="imgs/coffeetable_remotechanges1.png" alt="" draggable="false"> 
    const remote = new Interactable(600, 410, 700, 300, () => {}, "remote");

    remote.addHTML(`<img id="remote_image" src="imgs/coffeetable_remotechanges1.png" alt="" draggable="false">`);
    Game.game_RegisterInteractable("coffee", remote);
});

function remote_routine() {

    const remote = document.getElementById("remote");

    if (!remote) {
        console.error("Remote element not found. Make sure it exists in the HTML.");
        return;
    }

    remote.style.zIndex = "9999";
    remote.style.pointerEvents = "auto"; 

    const TEMPO_PARA_TROCAR_1 = 3000;
    const TEMPO_PARA_TROCAR_2 = 3000 + TEMPO_PARA_TROCAR_1;
    const TEMPO_PARA_TROCAR_3 = 3000 + TEMPO_PARA_TROCAR_2;
    const TEMPO_PARA_TROCAR_4 = 3000 + TEMPO_PARA_TROCAR_3;

    let tempoPressionado = 0;
    let ultimaAtualizacao = 0;
    let estadoAtual = 1;

    let isHolding = false;
    let offsetX = 0;
    let offsetY = 0;

    function atualizarremote() {

        const remote_img = document.getElementById("remote_image");

      if (tempoPressionado >= TEMPO_PARA_TROCAR_1 && estadoAtual < 2) {
        remote_img.src = "imgs/coffeetable_remotechanges2.png";
        estadoAtual = 2;
      } else if (tempoPressionado >= TEMPO_PARA_TROCAR_2 && estadoAtual < 3) {
        remote_img.src = "imgs/coffeetable_remotechanges3.png";
        estadoAtual = 3;
      } else if (tempoPressionado >= TEMPO_PARA_TROCAR_3 && estadoAtual < 4) {
        remote_img.src = "imgs/coffeetable_remotechanges4.png";
        estadoAtual = 4;        
      } else if (tempoPressionado >= TEMPO_PARA_TROCAR_4 && estadoAtual < 5) {
        remote_img.src = "imgs/coffeetable_remotechanges4.png";
        estadoAtual = 5;        
      }

      hide();
    }

    
    function hide() {
        const arrow = document.getElementById('remotearrow');
        if (!arrow) return;

        if (estadoAtual === 5) {
            arrow.removeAttribute("hidden");
            Game.game_GotoScene("coffee1");
        } else {
            arrow.setAttribute("hidden","");
        }
    }


    function loopDeAtualizacao() {

        
        if (isHolding) {
            const agora = Date.now();
            tempoPressionado += agora - ultimaAtualizacao;
            ultimaAtualizacao = agora;

        atualizarremote();
      }

      requestAnimationFrame(loopDeAtualizacao);
    }

    requestAnimationFrame(loopDeAtualizacao);

    remote.addEventListener("mousedown", (e) => {
        
      isHolding = true;
      ultimaAtualizacao = Date.now();

      const rect = remote.getBoundingClientRect();
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;

      remote.style.cursor = "grabbing";
    });

    document.addEventListener("mousemove", (e) => {
        
      if (isHolding && e.buttons === 1) {
        remote.style.left = `${e.clientX - offsetX}px`;
        remote.style.top = `${e.clientY - offsetY}px`;
      }
    });

    function pararTudo() {
      isHolding = false;
      remote.style.cursor = "grab";
    }

    document.addEventListener("mouseup", pararTudo);
    document.addEventListener("mouseleave", pararTudo);
}

//sounds
function playSound(fileName){
    document.getElementById("shotGun").setAttribute('src', fileName);
    document.getElementById("button").setAttribute('src', fileName);
   // document.getElementById("shotGun").load(); //call this to just preload the audio without playing
   // document.getElementById("birdsSound").play(); //call this to play the song right away
};