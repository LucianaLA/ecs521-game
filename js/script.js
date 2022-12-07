window.addEventListener('load', function () {
    // loading 2D environment
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");

    //checks if the pet is inside the canvas area
    function inCanvas(x, y) {
        return x >= 0 && x < canvas.width && y >= 0 && y < canvas.height;
    }

    //inventory as array
    let inventory = []; //fill with item eg [key,food,food], [food,key]

    //item (for inventory) class
    class Item{
        constructor(itemName){
            //item type? if item == health, if item == key etc
            itemName = this.itemName;
        }
        addToInventory(itemName){
            inventory = inventory.push(itemName);
        }
        removeFromInventory(itemName){ //remove first instance of item
            for(let i=0; i<inventory.length; i++){
                if(inventory[i]==itemName){
                    inventory = inventory.splice(i);
                    break;
                }
            }
        }
        cleanInventory(){
            //when you switch levels, 
            inventory.length = 0;
        }
        viewInventory(){
            //return inventory array
        }
        checkItem(itemName){
            //searches array for key when prompted by door, if yes, remove from array and open door
            //searches array for food when prompted by user, if yes remove from array and increase health
        }
    }

    // obstacle class
    class Obstacle {
        constructor(x,y,width,height) {
            this.width = width;
            this.height = height;
            this.x = x;
            this.y = y;
        }
        drawObstacle(){
            ctx.rect(this.x,this.y,this.width,this.height);
            ctx.fill();
            console.log(this.x);
        }
        obstacleArea(x,y){              //read ctx canvas documentation
            return x > this.x && 
            x < this.x + this.width && 
            y > this.y && 
            y < this.y + this.height;
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
        drawPet(x, y) {
            var petUrl = "../media/" + this.petChoice + "-lofi.png";
            const petimg = new Image();
            petimg.src = petUrl;
            petimg.onload = () => {
                ctx.drawImage(petimg, x, y, this.petW, this.petH);
            }
        }
        petMove = (evt)=> {
            let step = 5;
            let dx = 5; //how many px pet moves
            let dy = 5;
            // console for checking numbers
            console.log('Key code: ' + evt.keyCode);
            console.log('pet x: ' + this.x);
            console.log('pet y: ' + this.y);
            let lastx = this.x;
            let lasty = this.y;
    
            //inCanvas position check////////
            if (evt.keyCode == 39 && inCanvas(this.x + this.petW + step, this.y)) { // right
                this.x += dx;
            }
            else if (evt.keyCode == 37 && inCanvas(this.x + step, this.y)) { // left
                this.x -= dx;
            }
            else if (evt.keyCode == 38 && inCanvas(this.x + step, this.y)) { // up
                this.y -= dy;
            }
            else if (evt.keyCode == 40 && inCanvas(this.x + step, this.y + this.petH)) { // down
                this.y += dy;
            }
            // if the pos satisfies inCanvas it will draw pet in updated pos////////
    
            //clears past pet and draws a new one in the updated pos
            // try to either rotate pet picture when walking or change url path to different angles
            // ctx.scale(-1, 1);
            if (bed.obstacleArea(this.x,this.y)) {
                this.x = lastx;
                this.y = lasty;
            }
            if (evt.keyCode == 39 && bed.obstacleArea(this.x + this.petW, this.y)) { // right
                this.x = lastx;
                this.y = lasty;
            }
            else if (evt.keyCode == 37 && bed.obstacleArea(this.x, this.y)) { // left
                this.x = lastx;
                this.y = lasty;
            }
            else if (evt.keyCode == 38 && bed.obstacleArea(this.x, this.y)) { // up
                this.x = lastx;
                this.y = lasty;
            }
            else if (evt.keyCode == 40 && bed.obstacleArea(this.x, this.y + this.petH)) { // down
                this.x = lastx;
                this.y = lasty;
            }
            ctx.clearRect(this.x - step, this.y - step, this.petW + step*2, this.petH + step*2);
            this.drawPet(this.x, this.y);
            //draw obstacle + from array
        }
    }

    const bed = new Obstacle(30, 0, 60, 65);
    bed.drawObstacle();

    var pet = new Pet("dog", canvas.width / 2, canvas.height / 2, 50, 35);
    pet.drawPet(canvas.width / 2, canvas.height / 2);

    // play music
    //////////////////// Pet Choice ///////////////////////
    /////////////////////////// LEVEL 1 //////////////////////////////////////////////////////////////////

    //checks if the mouse/character is in interaction area (near interactable item) - works like inCanvas
    // function inInteractionArea(x,y){
    //     return ;
    // }

    // add item to inventory
    // Item.addToInventory(itemName); should append inventory[]??

    // food mechanic - merged into item object method checkItem(food);
    // function eat(){
    //     if (hunger<petFull){ // if hunger less than max, add
    //         hunger++;
    //     } else { // if pet is full, store food to eat later
    //         addToInventory("food");
    //     }
    // }

    // merged into item object method checkItem(key);
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
    window.addEventListener("keydown", pet.petMove, false);
    //  window.addEventListener("onClick", petUrl, false);
    //  window.addEventListener("onClick", interact, false);

    return 1;
});
