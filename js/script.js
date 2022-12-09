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
        constructor(x,y,width,height,name) {
            this.width = width;
            this.height = height;
            this.x = x;
            this.y = y;
            this.name=name;
        }
        drawObstacle(){
            // ctx.rect(this.x,this.y,this.width,this.height);
            // ctx.fill();
            // console.log(this.x);
            ////// making furniture into images//////////////
            var furnitureUrl = "../media/" + this.name + ".png";
            const furnitureimg = new Image();
            furnitureimg.src = furnitureUrl;
            furnitureimg.onload = () => {
                ctx.drawImage(furnitureimg, this.x, this.y, this.width, this.height);
            }
            return furnitureimg;
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
        drawPet1(x, y) {
            var petUrl = "../media/" + this.petChoice + "1.png";
            const petimg = new Image();
            petimg.src = petUrl;
            petimg.onload = () => {
                ctx.drawImage(petimg, x, y, this.petW, this.petH);
            }

            return petimg;
        }
        drawPet2(x, y) {
            var petUrl = "../media/" + this.petChoice + "3.png";
            const petimg2 = new Image();
            petimg2.src = petUrl;
            petimg2.onload = () => {
                ctx.drawImage(petimg2, x, y, this.petW, this.petH);
            }

            return petimg2;
        }

        animPet(){
            ctx.clearRect(0,0,canvas.width,canvas.height);
            // bed.drawObstacle();
            ctx.drawImage(bed.drawObstacle(), bed.x, bed.y,bed.width,bed.height);
            // this.drawPet(this.x, this.y);
            ctx.drawImage(this.drawPet1(), this.x, this.y,this.petW,this.petH); //DOG NO LONGER BLINKS!!!!!!!!!!!!!!
            ctx.clearRect(0,0,canvas.width,canvas.height); //trying animation frame by frame (inneficient way)
            ctx.drawImage(bed.drawObstacle(), bed.x, bed.y,bed.width,bed.height);
            ctx.drawImage(this.drawPet2(), this.x, this.y,this.petW,this.petH);
            console.log(this.drawPet1());
            console.log(this.drawPet2());
        }
        petMove = (evt)=> {
            let step = 3;
            let dx = 3; //how many px pet moves
            let dy = 3;
            // console for checking numbers
            console.log('Key code: ' + evt.keyCode);
            console.log('pet x: ' + this.x);
            console.log('pet y: ' + this.y);
            let lastx = this.x;
            let lasty = this.y;
    
            //inCanvas position check////////
            if (evt.keyCode == 39 && inCanvas(this.x + this.petW, this.y)) { // right
                this.x += dx;
            }
            else if (evt.keyCode == 37 && inCanvas(this.x - step, this.y)) { // left
                this.x -= dx;
            }
            else if (evt.keyCode == 38 && inCanvas(this.x, this.y-step)) { // up
                this.y -= dy;
            }
            else if (evt.keyCode == 40 && inCanvas(this.x + step, this.y + this.petH)) { // down
                this.y += dy;
            }
            // if the pos satisfies inCanvas it will draw pet in updated pos////////
    
            //clears past pet and draws a new one in the updated pos
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
            else if (evt.keyCode == 38 && bed.obstacleArea(this.x, this.y - this.petH)) { // up
                this.x = lastx;
                this.y = lasty;
            }
            else if (evt.keyCode == 40 && bed.obstacleArea(this.x, this.y + this.petH)) { // down
                this.x = lastx;
                this.y = lasty;
            }
            this.animPet();
        }
    }

    const bed = new Obstacle(0, 0, 50, 65,"bed");
    bed.drawObstacle();

    const drawer = new Obstacle(50, 0, 10, 10,"drawer");
    drawer.drawObstacle();

    const desk = new Obstacle(70, 0, 40, 30,"desk");
    desk.drawObstacle();

    const wardrobe = new Obstacle(130, 0, 50, 65,"wardrobe");
    wardrobe.drawObstacle();    

    var petWidth = 40;
    var pet = new Pet("dog", canvas.width / 2, canvas.height / 2, petWidth, petWidth/1.1);
    pet.drawPet1(canvas.width / 2, canvas.height / 2);

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
