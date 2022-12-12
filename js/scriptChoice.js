// window.addEventListener('load', function () {
//     let canvasChoice = document.getElementById("canvasChoice");
//     let ctxChoice = canvasChoice.getContext("2d");
//     ///// PET CHOICE ///////
//     let counter = 0,
//     frame_width = 48,
//     frame_height = 48;
//     let dog2IdleUrl = "../media/2dog/Idle.png";
//     let cat4WalkLUrl = "../media/4cat/Idle.png";
//     let rat5IdleUrl = "../media/5rat/Idle.png";
//     let rat6IdleUrl = "../media/6rat/Idle.png";
//     let cat3IdleUrl = "../media/3cat/Idle.png";
//     let spriteChoice = new Image();
//     spriteChoice.onload = function() { //(x, y, spriteType) {
//     // spriteChoice.src = spriteType;
//     spriteChoice.src = dog2IdleUrl;

//     window.requestAnimationFrame(animate);
//     function animate() {
//         let frame = counter;//Math.floor(counter % 6);
//         ctxChoice.clearRect(0, 0, canvasChoice.width, canvasChoice.height);
//         ctxChoice.drawImage(spriteChoice, frame * frame_width, 0, frame_width, frame_height, x, y, frame_width, frame_height);
//         counter = counter + 1;
//         if (counter > 6){
//             counter=1;
//         }
//         window.requestAnimationFrame(animate);
//     }
//     }

//     //animate all, if user clicks x button record choice
//     // spriteChoice.onload(20,30,dog2IdleUrl);
//     return 1;
// });

let dog1IdleUrl = "../media/1dog/Idle.png";
let dog2IdleUrl = "../media/2dog/Idle.png";
let cat4IdleUrl = "../media/4cat/Idle.png";
let rat5IdleUrl = "../media/5rat/Idle.png";
let rat6IdleUrl = "../media/6rat/Idle.png";
let cat3IdleUrl = "../media/3cat/Idle.png";



let cat4 = new Image();
cat4.src = cat4IdleUrl;
let rat6 = new Image();
rat6.src = rat6IdleUrl;
let counter = 0,
  frame_width = 48,
  frame_height = 48;
window.onload = function() {
    let canvasChoice = document.getElementById("canvasChoice");
    let ctxChoice = canvasChoice.getContext("2d");
  window.requestAnimationFrame(animate);
 
  function animate() {
    let frame = Math.floor(counter % 6);
    ctxChoice.clearRect(0, 0, canvasChoice.width, canvasChoice.height);
    ctxChoice.drawImage(cat4, frame * frame_width, 0, frame_width, frame_height, 0, 0, frame_width, frame_height);
    ctxChoice.drawImage(rat6, frame * frame_width, 250, frame_width, frame_height, 0, 0, frame_width, frame_height);
        counter = counter + 0.25;
        if (counter > 6){
            counter=1;
        }
    
    window.requestAnimationFrame(animate);
  }
}

// let cat3 = new Image();
// cat3.src = cat3IdleUrl;
// cat3.onload = function() {
//     let canvasChoice = document.getElementById("canvasChoice");
//     let ctxChoice = canvasChoice.getContext("2d");
//   window.requestAnimationFrame(animate);
 
//   function animate() {
//     let frame = Math.floor(counter % 6);
//     ctxChoice.clearRect(0, 0, canvasChoice.width, canvasChoice.height);
//     ctxChoice.drawImage(cat3, frame * frame_width, 50, frame_width, frame_height, 0, 0, frame_width, frame_height);
//         counter = counter + 0.25;
//         if (counter > 6){
//             counter=1;
//         }
    
//     window.requestAnimationFrame(animate);
//   }
// }

// let dog1 = new Image();
// dog1.src = dog1IdleUrl;
// dog1.onload = function() {
//     let canvasChoice = document.getElementById("canvasChoice");
//     let ctxChoice = canvasChoice.getContext("2d");
//   window.requestAnimationFrame(animate);
 
//   function animate() {
//     let frame = Math.floor(counter % 6);
//     ctxChoice.clearRect(0, 0, canvasChoice.width, canvasChoice.height);
//     ctxChoice.drawImage(dog1, frame * frame_width, 100, frame_width, frame_height, 0, 0, frame_width, frame_height);
//         counter = counter + 0.25;
//         if (counter > 6){
//             counter=1;
//         }
    
//     window.requestAnimationFrame(animate);
//   }
// }

// let dog2 = new Image();
// dog2.src = dog2IdleUrl;
// dog2.onload = function() {
//     let canvasChoice = document.getElementById("canvasChoice");
//     let ctxChoice = canvasChoice.getContext("2d");
//   window.requestAnimationFrame(animate);
 
//   function animate() {
//     let frame = Math.floor(counter % 6);
//     ctxChoice.clearRect(0, 0, canvasChoice.width, canvasChoice.height);
//     ctxChoice.drawImage(dog2, frame * frame_width, 150, frame_width, frame_height, 0, 0, frame_width, frame_height);
//         counter = counter + 0.25;
//         if (counter > 6){
//             counter=1;
//         }
    
//     window.requestAnimationFrame(animate);
//   }
// }

// let rat5 = new Image();
// rat5.src = rat5IdleUrl;
// rat5.onload = function() {
//     let canvasChoice = document.getElementById("canvasChoice");
//     let ctxChoice = canvasChoice.getContext("2d");
//   window.requestAnimationFrame(animate);
 
//   function animate() {
//     let frame = Math.floor(counter % 6);
//     ctxChoice.clearRect(0, 0, canvasChoice.width, canvasChoice.height);
//     ctxChoice.drawImage(rat5, frame * frame_width, 200, frame_width, frame_height, 0, 0, frame_width, frame_height);
//         counter = counter + 0.25;
//         if (counter > 6){
//             counter=1;
//         }
    
//     window.requestAnimationFrame(animate);
//   }
// }

// let rat6 = new Image();
// rat6.src = rat6IdleUrl;
// rat6.onload = function() {
//     let canvasChoice = document.getElementById("canvasChoice");
//     let ctxChoice = canvasChoice.getContext("2d");
//   window.requestAnimationFrame(animate);
 
//   function animate() {
//     let frame = Math.floor(counter % 6);
//     ctxChoice.clearRect(0, 0, canvasChoice.width, canvasChoice.height);
//     ctxChoice.drawImage(rat6, frame * frame_width, 250, frame_width, frame_height, 0, 0, frame_width, frame_height);
//         counter = counter + 0.25;
//         if (counter > 6){
//             counter=1;
//         }
    
//     window.requestAnimationFrame(animate);
//   }
// }