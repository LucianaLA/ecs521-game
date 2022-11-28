window.addEventListener('load', function () {
    // loading 2D environment
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");

    // obstacle class
    class Obstacle {
        constructor(height, width) {
            this.height = height;
            this.width = width;
        }
    }

    class Pet {
        constructor(petChoice, x, y, petW, petH) {
            this.petChoice = petChoice;
            this.x = x;
            this.y = y;
            this.petW = petW;
            this.petH = petH;
         }
        drawPet(x, y){
            var petUrl = "../media/" + this.petChoice + "-lofi.png";
            const petimg = new Image();
            petimg.src = petUrl;
            petimg.onload = () => {
                ctx.drawImage(petimg, x, y, this.petW, this.petH);
            }
         }
    }

    pet = new Pet("dog", canvas.width/2, canvas.height/2, 50, 35);
    pet.drawPet(canvas.width/2,canvas.height/2);

    bed = new Obstacle(500, 400);

    // var petChoice;
    // petChoice = "dog";
    // var petUrl = "../media/" + petChoice + "-lofi.png";

    // // pet init coordinates
    // var pet.x = canvas.width / 2;
    // var pet.y = canvas.height / 2;
    // const pet = new Image();
    // pet.src = petUrl;
    // let w = 50; // pet image width
    // let h = 35; // pet image height
    // pet.onload = () => {
    //     ctx.drawImage(pet, pet.x, pet.y, w, h);
    // }

    // var petUrl = function() { 
    //     var petChoice;
    //     if ()
    //     petChoice = "dog";
    //     "../media/"+petChoice+"-lofi.png";
    // }

    // play music
    // buttons
    // let buttonHowToPlay = document.getElementById("buttonHowToPlay"); // make svg element 
    // window.addEventListener("onClick", nextScreen, false);
    //////////////////// Pet Choice ///////////////////////
    /////////////////////////// LEVEL 1 //////////////////////////////////////////////////////////////////


    //checks if the pet is inside the canvas area
    function inCanvas(x, y) {
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

    function move(evt) {
        let step = 5;
        let dx = 5; //how many px pet moves
        let dy = 5;
        // console for checking numbers
        console.log('Key code: ' + evt.keyCode);
        console.log('x: ' + pet.x);
        console.log('y: ' + pet.y);

        if (evt.keyCode == 39 && inCanvas(pet.x + pet.petW + 3, pet.y)) { // right
            pet.x += dx;
        }
        else if (evt.keyCode == 37 && inCanvas(pet.x + 5, pet.y)) { // left
            pet.x -= dx;
        }
        else if (evt.keyCode == 38 && inCanvas(pet.x + 5, pet.y)) { // up
            pet.y -= dy;
        }
        else if (evt.keyCode == 40 && inCanvas(pet.x + 5, pet.y + pet.petH)) { // down
            pet.y += dy;
        }
        // if the pos satisfies incanvas it will draw pet in updated pos

        //clears past pet and draws a new one in the updated pos
        ctx.clearRect(pet.x - 5, pet.y - 5, pet.petW + 10, pet.petH + 10);
        // try to either rotate pet picture when walking or change url path to different angles
        // ctx.scale(-1, 1);
        pet.drawPet(pet.x, pet.y);

    }

    //  function interact(evt){
    //     if (evt.keyCode == 73 && inInteractionArea(x,y)){ 
    //         if (pet.x - 20< key.x < pet.x + 20 || pet.y -20 < key.y < pet.y + 20){ // arbitary numbers, test to see if works well and adjust
    //             addToInventory("key");
    //         }
    //         else if (pet.x - 20< food.x < pet.x + 20 || pet.y -20 < food.x < pet.y + 20) {
    //             eat;
    //         }
    //     }
    //  }
    //moves pet when arrow keys are used
    window.addEventListener("keydown", move, false);
    //  window.addEventListener("onClick", petUrl, false);
    //  window.addEventListener("onClick", interact, false);

    return 1;
});
