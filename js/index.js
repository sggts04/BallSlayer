(function() {
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var player = new Player(20);
var blobs = [];
for(var i=0; i<5; i++) {
    blobs.push(new Blob(20));
}
var enemyblobs = [];
for(var i=0; i<2; i++) {
    enemyblobs.push(new EnemyBlob(20));
}

var mouseX;
var mouseY;
var aiming = false;
var shooting = false;
var shaking = false;
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

function shake() {  // camera shake during explosion, done by translating the context
    if(shaking) {
        var dir = [1, -1];
        var dx = Math.random()*20;
        var dy = Math.random()*20;
        var dir1 = dir[Math.floor(Math.random()*2)];
        var dir2 = dir[Math.floor(Math.random()*2)];
        ctx.translate(dir1*dx, dir2*dy);
    }
}

function shakeEnd() {   // end camera shake after some time
    shaking = false;
    ctx.restore();
}

var music = new Audio('sounds/music.wav'); 
music.volume = 0.3;
music.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);
music.play();

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
            ctx.save();
            shaking = true;
            setInterval(shake, 50); // new camera position after every 50ms
            setTimeout(shakeEnd, 200);  // stop shaking after 200ms
        }
    }

    for(var i=0; i<enemyblobs.length; i++) {
        enemyblobs[i].draw();
        if(player.checkExplode(enemyblobs[i].x, enemyblobs[i].y, enemyblobs[i].r)) {
            alert("GAME OVER\nYour Score: "+score);
            document.location.reload();
        }
    }

    requestAnimationFrame(draw);
}

requestAnimationFrame(draw);
})();