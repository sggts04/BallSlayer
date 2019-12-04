var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

function draw() {

    requestAnimationFrame(draw);
}

requestAnimationFrame(draw);