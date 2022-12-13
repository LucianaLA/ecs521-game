let imgArr = new Array();
let dog1IdleUrl = "../media/1dog/Idle.png";
let dog2IdleUrl = "../media/2dog/Idle.png";
let cat4IdleUrl = "../media/4cat/Idle.png";
let cat3IdleUrl = "../media/3cat/Idle.png";


let canvasChoice = document.getElementById("canvasChoice");
let ctxChoice = canvasChoice.getContext("2d");
let cat4 = new Image();
cat4.src = cat4IdleUrl;
imgArr[0] = cat4;
let cat3 = new Image();
cat3.src = cat3IdleUrl;
imgArr[1] = cat3;
let dog1 = new Image();
dog1.src = dog1IdleUrl;
imgArr[2] = dog1;
let dog2 = new Image();
dog2.src = dog2IdleUrl;
imgArr[3] = dog2;
let counter = 1,
frame_width = 48,
frame_height = 48;
function choicePet() {
  window.requestAnimationFrame(animate);
  function animate() {
    let frame = Math.floor(counter % 4);
    ctxChoice.clearRect(0, 0, canvasChoice.width, canvasChoice.height);
    for(var i=0;i<imgArr.length;i++){
        ctxChoice.drawImage(imgArr[i], frame * frame_width, 0, frame_width, frame_height,i*50,0, frame_width, frame_height);
    }
        counter = counter + 0.1;
    window.requestAnimationFrame(animate);
  }
}

imgArr.onload = function() {choicePet();};
choicePet();