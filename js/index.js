var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var player = new Player(20);
var blobs = [];
for(var i=0; i<5; i++) {
    blobs.push(new Blob(20));
}

var mouseX;
var mouseY;
var aiming = false;
var shooting = false;
var score = 0;

function mouseDownHandler(e) {
    mouseX = e.clientX - canvas.offsetLeft;
    mouseY = e.clientY - canvas.offsetTop;
    aiming = true;
}

function mouseMoveHandler(e) {
    if(aiming) {
        mouseX = e.clientX - canvas.offsetLeft;
        mouseY = e.clientY - canvas.offsetTop;
    }
}

function mouseUpHandler(e) {
    mouseX = e.clientX - canvas.offsetLeft;
    mouseY = e.clientY - canvas.offsetTop;
    aiming = false;
    shooting = true;
}

document.addEventListener("mousedown", mouseDownHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);
document.addEventListener("mouseup", mouseUpHandler, false);

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.font = "50px Verdana";
    ctx.strokeStyle = "red";
    ctx.textAlign = "center";
    ctx.lineWidth = 2;
    ctx.strokeText("Score: "+score, canvas.width/2, canvas.height/10);

    if(aiming) {
        player.aim(mouseX, mouseY);
    } else if(shooting) {
        player.shoot(mouseX, mouseY);
        shooting = false;
    }
    else {
        player.draw();
    }
    player.update();
    
    for(var i=0; i<blobs.length; i++) {
        blobs[i].draw();
        if(player.checkExplode(blobs[i].x, blobs[i].y, blobs[i].r)) {
            blobs[i].explode();
            score+=100;
        }
    }

    requestAnimationFrame(draw);
}

requestAnimationFrame(draw);