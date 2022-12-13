window.addEventListener('load', function () {
    // loading 2D environment
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");

    //checks if the pet is inside the canvas area
    function inCanvas(x, y) {
        return x >= 0 && x < canvas.width-20 && y >= 27 && y < canvas.height;
    }

    //inventory as array
    let inventory = []; //fill with item eg [key,food,food], [food,key]

    function cleanInventory() {
        //when you switch levels, 
        inventory.length = 0;
    }
    function viewInventory() {
        //return inventory array
        window.alert(inventory);
    }
    function removeFromInventory(itemName) { //remove first instance of item
        for (let i = 0; i < inventory.length; i++) {
            if (inventory[i].itemName == itemName) {
                inventory = inventory.splice(i);
                break;
            }
        }
    }

    //item (for inventory) class
    class Item {
        constructor(itemName,x,y,xsize,ysize,fileName) {
            this.itemName = itemName;
            this.xpos = x;
            this.ypos = y;
            this.xsize = xsize;
            this.ysize = ysize;
            this.fileName = fileName;   //to create the visual of a food item??
        }
        drawItem(){
            var itemURL = "../media/level1/" + fileName + ".png";
            const itemImage = new Image();
            itemImage.src = itemURL;
            ctx.drawImage(itemImage,xpos,ypos,xsize,ysize);
        }
        addToInventory() {
            inventory = inventory.push(Item);
        }
        checkItem() {
            //searches array for key when prompted by door, if yes, remove from array and open door
            //searches array for food when prompted by user, if yes remove from array and increase health
            for(i=0;i<inventory.length;i++){
                if(inventory[i].itemName == "food"){
                    //increaseHealth();
                }else if(inventory[i].itemName == "key"){
                    //openDoor();
                }
            }
        }
    }

    // obstacle class
    class Obstacle {
        constructor(name,x, y, width, height, fileName) {
            this.objName = name;
            this.width = width;
            this.height = height;
            this.x = x;
            this.y = y;
            this.fileName = fileName;
        }
        drawObstacle() {
            // ctx.rect(this.x,this.y,this.width,this.height);
            // ctx.fill();
            // console.log(this.x);
            ////// making furniture into images//////////////
            // for each obstacle create obstacle
            var furnitureUrl = "../media/level1/objects/" + this.fileName + ".png";
            const furnitureimg = new Image();
            furnitureimg.src = furnitureUrl;
            furnitureimg.onload = () => {
                ctx.drawImage(furnitureimg, this.x, this.y, this.width, this.height);
            }
            return furnitureimg;
        }
        obstacleArea(x, y) {              //read ctx canvas documentation
            return (x > this.x+this,width &&
                x < this.x &&
                y < this.y &&
                y > this.y + this.height);
        }
    }


    // sprite ///////////////////////////////////////////////////////////////////////////////////////////////////////
    let dog1WalkUrl = "../media/1dog/Walk.png";
    let dog1WalkLUrl = "../media/1dog/WalkL.png";
    let dog1IdleUrl = "../media/1dog/Idle.png";
    let cat3WalkUrl = "../media/3cat/Walk.png";
    let sprite = new Image();
    let counter = 0,
        frame_width = 48,
        frame_height = 48;
    let spritePet = function (x,y,spriteType) {
        sprite.src = spriteType;
        window.requestAnimationFrame(animate);
        function animate() {
            let frame = counter;//Math.floor(counter % 6);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(sprite, frame * frame_width, 0, frame_width, frame_height, x, y, frame_width, frame_height);
            for (let i = 0; i < obstacleArr.length; i++) {
                ctx.drawImage(obstacleArr[i].drawObstacle(), obstacleArr[i].x, obstacleArr[i].y, obstacleArr[i].width, obstacleArr[i].height);
            }
            counter = counter + 1;
            if (counter > 6){
                counter=0;
            }
            //window.requestAnimationFrame(animate);
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
        petMove = (evt) => {
            console.log(evt);
            let step = 3;
            let dx = 2; //how many px pet moves
            let dy = 2;
            // console for checking numbers
            console.log('Key code: ' + evt.keyCode);
            console.log('pet x: ' + this.x);
            console.log('pet y: ' + this.y);
            let lastx = this.x;
            let lasty = this.y;

            // else if (evt.keyCode != 40 || evt.keycode !=39 || evt.keycode != 38 || evt.keycode != 37){
            //     spritePet(this.x, this.y, dog1IdleUrl);
            //     console.log('code passed through idle;')
            // } 
            // spritePet(this.x, this.y, dog1IdleUrl);
            // if the pos satisfies inCanvas it will draw pet in updated pos////////

            //clears past pet and draws a new one in the updated pos///////
            // for (let i = 0; i < obstacleArr.length; i++) {
            //     if (obstacleArr[i].obstacleArea(this.x, this.y)) {
            //         this.x = lastx;
            //         this.y = lasty;
            //         spritePet(this.x, this.y,dog1IdleUrl);
            //         console.log('code passed through idle;')
            //     }
            //     if (evt.keyCode == 39 && obstacleArr[i].obstacleArea(this.x + this.petW, this.y)) { // right
            //         this.x = lastx;
            //         this.y = lasty;
            //         spritePet(this.x, this.y,dog1IdleUrl);
            //         console.log('code passed through idle;')
            //     }
            //     else if (evt.keyCode == 37 && obstacleArr[i].obstacleArea(this.x, this.y)) { // left
            //         this.x = lastx;
            //         this.y = lasty;
            //         spritePet(this.x, this.y,dog1IdleUrl);
            //         console.log('code passed through idle;')
            //     }
            //     else if (evt.keyCode == 38 && obstacleArr[i].obstacleArea(this.x, this.y - this.petH)) { // up
            //         this.x = lastx;
            //         this.y = lasty;
            //         spritePet(this.x, this.y,dog1IdleUrl);
            //         console.log('code passed through idle;')
            //     }
            //     else if (evt.keyCode == 40 && obstacleArr[i].obstacleArea(this.x, this.y + this.petH)) { // down
            //         this.x = lastx;
            //         this.y = lasty;
            //         spritePet(this.x, this.y,dog1IdleUrl);
            //         console.log('code passed through idle;')
            //     } else{
            //         spritePet(this.x, this.y, dog1WalkLUrl);
            //     }
            // }


            for (let i = 0; i < obstacleArr.length; i++) {
                // if (! obstacleArr[i].obstacleArea(this.x, this.y)) {
                //     this.x = lastx;
                //     this.y = lasty;
                    spritePet(this.x, this.y,dog1IdleUrl);
                    console.log('code passed through idle;')
                }
                if (evt.keyCode == 39 /*&& obstacleArr[i].obstacleArea(this.x + this.petW, this.y)*/ && inCanvas(this.x + this.petW, this.y)) { // right
                    this.x += dx;
                    spritePet(this.x, this.y,dog1WalkUrl);
                    console.log('code passed through walk right;')
                }
                else if (evt.keyCode == 37 /*&& obstacleArr[i].obstacleArea(this.x, this.y)*/ && inCanvas(this.x - step, this.y)) { // left
                    this.x -= dx;
                    spritePet(this.x, this.y,dog1WalkLUrl);
                    console.log('code passed through walk left;')
                }
                else if (evt.keyCode == 38 /*&& obstacleArr[i].obstacleArea(this.x, this.y - this.petH)*/ && inCanvas(this.x, this.y+this.petH/3)) { // up
                    this.y -= dy;
                    spritePet(this.x, this.y,dog1WalkUrl);
                    console.log('code passed through walk up;')
                }
                else if (evt.keyCode == 40 /*&& obstacleArr[i].obstacleArea(this.x, this.y + this.petH)*/ && inCanvas(this.x + step, this.y + this.petH)) { // down
                    this.y += dy;
                    spritePet(this.x, this.y,dog1WalkLUrl);
                    console.log('code passed through walk down;')
                } else{
                    spritePet(this.x, this.y, dog1IdleUrl);        
                    
            }
        }
    }

    //make pet object and add idle sprite
    var pet = new Pet("dog", 0, 80, frame_width, frame_height);
    // sprite.onload = function(){      
    //     spritePet(this.x, this.y, dog1IdleUrl);        
    // }

    // make obstacle objects and place in the array hopefully read from objectreference.txt
    let obstacleArr = new Array();
    
    createObject = function(objectName,x,y,xsize,ysize,filename){
        objectName = new Obstacle(objectName,x,y,xsize,ysize,filename);
        obstacleArr.push(objectName);
        for (let i=0; i< obstacleArr.length; i++){
            console.log(obstacleArr[i]);
            ctx.drawImage(obstacleArr[i].drawObstacle(), obstacleArr[i].x, obstacleArr[i].y, obstacleArr[i].width, obstacleArr[i].height);
        } 
    }

    createObject("bed",0,95,37,43,"bed"); //0
    createObject("painting",20,20,37,34,"painting");//1
    createObject("painting2",140,20,26,31,"painting2");//2
    createObject("wardrobe",40,35,48,48,"wardrobe");//3
    createObject("stand",100,114,48,25,"stand");//4
    createObject("stand2",180,90,48,25,"stand");//5
    createObject("wardrobe2",220,17,48,48,"wardrobe");//6
    createObject("tv",102,93,44,29,"tv");//7
    createObject("plant",184,24,24,46,"plant");//8
    createObject("pillow",143,58,18,12,"pillow");//9
    createObject("plant2",182,78,11,14,"plant2");//10
    createObject("cards",222,17,29,9,"cards");//11
    createObject("door",265,80,11,47,"door");//12


    ////////create items/////
    var key = new Item("key", 220,17, 25,25, "key");
    var food = new Item("food", 100,114,20,10,"bone")
    
    ///// make interaction possible/////
    if (obstacleArr[3].x< pet.x <obstacleArr[3].x+obstacleArr[3].width && obstacleArr[3].y< pet.y <obstacleArr[3].y+obstacleArr[3].height 
        //|| obstacleArr[6].x< pet.x <obstacleArr[6].x+obstacleArr[6].width && obstacleArr[6].y< pet.y <obstacleArr[6].y+obstacleArr[6].height 
        //|| obstacleArr[5].x< pet.x <obstacleArr[5].x+obstacleArr[5].width && obstacleArr[5].y< pet.y <obstacleArr[5].y+obstacleArr[5].height
        || obstacleArr[4].x< pet.x <obstacleArr[4].x+obstacleArr[4].width && obstacleArr[4].y< pet.y <obstacleArr[4].y+obstacleArr[4].height){
        document.getElementById("help").innerHTML = "There could be something inside these drawers... press 'i' to interact.";
    } else if(obstacleArr[12].x< pet.x <obstacleArr[12].x+obstacleArr[12].width && obstacleArr[12].y< pet.y <obstacleArr[12].y+obstacleArr[12].height){
        document.getElementById("help").innerHTML = "The door is locked, you must open it with a key...";
    }
    else{
        document.getElementById("help").innerHTML = "Explore the area";
    }

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
