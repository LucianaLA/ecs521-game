window.addEventListener('load', function() {
    // loading 2D environment
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d"); 

    ////////////////////Starting Screen //////////////////////////////////////////////
    // const startingBackground = new Image();
    // startingBackground.src = "";
    // startingBackground.style.background = contain;
    // startingBackground.width = canvas.width;
    // startingBackground.height = canvas.height;
    // startingBackground.onload = () => {
    //     ctx.drawImage(startingBackground, 0, 0);
    // }

    // play music
    // buttons
    // let buttonHowToPlay = document.getElementById("buttonHowToPlay"); // make svg element 
    // window.addEventListener("onClick", nextScreen, false);
    //////////////////// Pet Choice ///////////////////////
    /////////////////////////// LEVEL 1 //////////////////////////////////////////////////////////////////
    
    // pet init coordinates
    var petX=canvas.width/2;
    var petY=canvas.height/2;
    const pet = new Image();
    pet.src = "../media/dog-lofi.png"; //dog for now, need to make pet into object
    let w = 50; // pet image width
    let h = 35; // pet image height
    pet.onload = () => {
        ctx.drawImage(pet, petX, petY, w, h);
    }

    //checks if the pet is inside the canvas area
    function inCanvas(x,y){
        return x >= 0 && x < canvas.width && y >= 0 && y < canvas.height;
    }

    //checks if the mouse/character is in interaction area (near interactable item) - works like inCanvas
    // function inInteractionArea(x,y){
    //     return ;
    // }

    // add item to inventory
    // function addToInventory(item){}

    // food mechanic
    // function eat(){
    //     if (hunger<petFull){ // if hunger less than max, add
    //         hunger++;
    //     } else { // if pet is full, store food to eat later
    //         addToInventory("food");
    //     }
    // }

    function move(evt){
        let step = 5;
        let dx = 5; //how many px pet moves
        let dy = 5;
        // console for checking numbers
        console.log('Key code: ' + evt.keyCode);
        console.log('x: ' + petX);
        console.log('y: ' + petY);

        if (evt.keyCode == 39 && inCanvas(petX + w + 3, petY)) { // right
            petX += dx;
        }
        else if (evt.keyCode == 37 && inCanvas(petX + 5, petY)) { // left
            petX -= dx;
        }
        else if (evt.keyCode == 38 && inCanvas(petX + 5, petY)) { // up
            petY -= dy;
        }
        else if (evt.keyCode == 40 && inCanvas(petX + 5, petY + h)) { // down
            petY += dy;
        }
        // if the pos satisfies incanvas it will draw pet in updated pos
            
        //clears past pet and draws a new one in the updated pos
        ctx.clearRect(petX-5,petY-5,w+10,h+10);
        ctx.drawImage(pet, petX, petY, w, h);
        
     }

    //  function interact(evt){
    //     if (evt.keyCode == 73 && inInteractionArea(x,y)){ 
    //         if (petX - 20< key.x < petX + 20 || petY -20 < key.y < petY + 20){ // arbitary numbers, test to see if works well and adjust
    //             addToInventory("key");
    //         }
    //         else if (petX - 20< food.x < petX + 20 || petY -20 < food.x < petY + 20) {
    //             eat;
    //         }
    //     }
    //  }
     //moves pet when arrow keys are used
     window.addEventListener("keydown", move, false);
    //  window.addEventListener("onClick", interact, false);

     return 1;
});
