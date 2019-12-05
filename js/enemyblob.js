var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
class EnemyBlob {
    constructor(r) {
        this.color = "pink";
        this.r = r;
        this.x = 3*r + Math.floor(Math.random() * (canvas.width-6*r));
        this.y = 3*r + Math.floor(Math.random() * (canvas.height-6*r));

        // Sounds
        this.explosionSound = document.createElement("audio");
        this.explosionSoundList = ["sounds/explosions/explosion.wav", "sounds/explosions/explosion2.wav", "sounds/explosions/explosion3.wav", "sounds/explosions/explosion4.wav"];
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI*2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r/2, 0, Math.PI*2);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r/3, 0, Math.PI*2);
        ctx.fillStyle = "maroon";
        ctx.fill();
        ctx.closePath();
    }
}