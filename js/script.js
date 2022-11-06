window.addEventListener('load', function() {
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d"); 
    // pet init coordinates
    var x=canvas.width/2;
    var y=canvas.height/2;
    const image = new Image();
    image.src = "../media/dog-lofi.png"; //dog for now
    let w = 75; // pet image width
    let h = 50; // pet image height
    image.onload = () => {
        ctx.drawImage(image, x, y, w, h);
    }

    function move(evt){
        let step = 5; //how many px pet moves
        // console for checking numbers
        console.log('Key code: ' + evt.keyCode);
        console.log('x: ' + x);
        console.log('y: ' + y);
    
        // right and left
        if (evt.keyCode == 39) {
            x += step;
        }
        else if (evt.keyCode == 37) {
            x -= step;
        }
        // up and down
        else if (evt.keyCode == 38) {
            y -= step;
        }
        else if (evt.keyCode == 40) {
            y += step;
        }
        //clears past pet and draws a new one in the updated pos
        ctx.clearRect(x,y,w,h);
        ctx.drawImage(image, x, y, w, h);
     }
     //moves pet when arrow keys are used
     window.addEventListener("keydown", move, false);

     return 1;
});
