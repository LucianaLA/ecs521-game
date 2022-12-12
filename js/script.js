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
    class Item {
        constructor(itemName) {
            //item type? if item == health, if item == key etc
            itemName = this.itemName;
        }
        addToInventory(itemName) {
            inventory = inventory.push(itemName);
        }
        removeFromInventory(itemName) { //remove first instance of item
            for (let i = 0; i < inventory.length; i++) {
                if (inventory[i] == itemName) {
                    inventory = inventory.splice(i);
                    break;
                }
            }
        }
        cleanInventory() {
            //when you switch levels, 
            inventory.length = 0;
        }
        viewInventory() {
            //return inventory array
        }
        checkItem(itemName) {
            //searches array for key when prompted by door, if yes, remove from array and open door
            //searches array for food when prompted by user, if yes remove from array and increase health
        }
    }

    // obstacle class
    class Obstacle {
        constructor(x, y, width, height, name) {
            this.width = width;
            this.height = height;
            this.x = x;
            this.y = y;
            this.name = name;
        }
        drawObstacle() {
            // ctx.rect(this.x,this.y,this.width,this.height);
            // ctx.fill();
            // console.log(this.x);
            ////// making furniture into images//////////////
            // for each obstacle create obstacle
            var furnitureUrl = "../media/" + this.name + ".png";
            const furnitureimg = new Image();
            furnitureimg.src = furnitureUrl;
            furnitureimg.onload = () => {
                ctx.drawImage(furnitureimg, this.x, this.y, this.width, this.height);
            }
            return furnitureimg;
        }
        obstacleArea(x, y) {              //read ctx canvas documentation
            return x > this.x &&
                x < this.x + this.width &&
                y > this.y &&
                y < this.y + this.height;
        }
    }

    // sprite ///////////////////////////////////////////////////////////////////////////////////////////////////////
    let dog1WalkUrl = "../media/1dog/Walk.png";
    let dog1IdleUrl = "../media/1dog/Idle.png";
    let cat3WalkUrl = "../media/3cat/Walk.png";
    let sprite = new Image();
    let counter = 0,
        frame_width = 48,
        frame_height = 48;
    petWalk = function (x, y, spriteType) {
        sprite.src = spriteType;
        window.requestAnimationFrame(animate);
        function animate() {
            let frame = Math.floor(counter % 6);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(sprite, frame * frame_width, 0, frame_width, frame_height, x, y, frame_width, frame_height);
            counter = counter + .25;

            window.requestAnimationFrame(animate);
        }
    }
    /////////////////////////////////////////////////////////////////////////////////////////////////////
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

        animPet() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            petWalk(this.x, this.y,dog1WalkUrl);
            ctx.clearRect(0, 0, canvas.width, canvas.height); //trying animation frame by frame (inneficient way)
            for (let i = 0; i < obstacleArr.length; i++) {
                ctx.drawImage(obstacleArr[i].drawObstacle(), obstacleArr[i].x, obstacleArr[i].y, obstacleArr[i].width, obstacleArr[i].height);
            }
            // ctx.drawImage(bed.drawObstacle(), bed.x, bed.y,bed.width,bed.height);
            petWalk(this.x, this.y,dog1IdleUrl);
        }
        petMove = (evt) => {
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
            else if (evt.keyCode == 38 && inCanvas(this.x, this.y - step)) { // up
                this.y -= dy;
            }
            else if (evt.keyCode == 40 && inCanvas(this.x + step, this.y + this.petH)) { // down
                this.y += dy;
            }
            // if the pos satisfies inCanvas it will draw pet in updated pos////////

            //clears past pet and draws a new one in the updated pos
            for (let i = 0; i < obstacleArr.length; i++) {
                if (obstacleArr[i].obstacleArea(this.x, this.y)) {
                    this.x = lastx;
                    this.y = lasty;
                }
                if (evt.keyCode == 39 && obstacleArr[i].obstacleArea(this.x + this.petW, this.y)) { // right
                    this.x = lastx;
                    this.y = lasty;
                }
                else if (evt.keyCode == 37 && obstacleArr[i].obstacleArea(this.x, this.y)) { // left
                    this.x = lastx;
                    this.y = lasty;
                }
                else if (evt.keyCode == 38 && obstacleArr[i].obstacleArea(this.x, this.y - this.petH)) { // up
                    this.x = lastx;
                    this.y = lasty;
                }
                else if (evt.keyCode == 40 && obstacleArr[i].obstacleArea(this.x, this.y + this.petH)) { // down
                    this.x = lastx;
                    this.y = lasty;
                }
            }
            this.animPet();
        }
    }

    let obstacleArr = new Array();

    const bed = new Obstacle(0, 0, 50, 65, "bed");
    obstacleArr[0] = bed;
    bed.drawObstacle();

    const drawer = new Obstacle(50, 0, 10, 10, "drawer");
    obstacleArr[1] = drawer;
    drawer.drawObstacle();

    const desk = new Obstacle(70, 0, 40, 30, "desk");
    obstacleArr[2] = desk;
    desk.drawObstacle();

    const closet = new Obstacle(130, 0, 50, 65, "closet");
    obstacleArr[3] = closet;
    closet.drawObstacle();

    var petWidth = 40;
    var pet = new Pet("dog", canvas.width / 2, canvas.height / 2, petWidth, petWidth / 1.1);
    petWalk(this.x, this.y, dog1IdleUrl);

    // play music
    //////////////////// Pet Choice ///////////////////////
    /////////////////////////// LEVEL 1 //////////////////////////////////////////////////////////////////

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
