class Blob {
    constructor(r) {
        this.color = "orange";
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
    }

    explode() {
        this.explosionSound.src = this.explosionSoundList[Math.floor(Math.random() * this.explosionSoundList.length)];
        this.explosionSound.volume = 0.5;
        for(var i=0; i<=Math.floor(Math.random()*15); i++) {
            this.flare();
        }
        this.explosionSound.play();
        this.x = 3*this.r + Math.floor(Math.random() * (canvas.width-6*this.r));
        this.y = 3*this.r + Math.floor(Math.random() * (canvas.height-6*this.r));
    }

    flare() {
        ctx.beginPath();
        ctx.arc(this.x + Math.floor(Math.random()*50) , this.y + Math.floor(Math.random()*50), this.r/2 - Math.floor(Math.random()*5), 0, Math.PI*2);
        ctx.arc(this.x - Math.floor(Math.random()*50) , this.y - Math.floor(Math.random()*50), this.r/2 - Math.floor(Math.random()*5), 0, Math.PI*2);
        ctx.arc(this.x - Math.floor(Math.random()*50) , this.y + Math.floor(Math.random()*50), this.r/2 - Math.floor(Math.random()*5), 0, Math.PI*2);
        ctx.arc(this.x + Math.floor(Math.random()*50) , this.y - Math.floor(Math.random()*50), this.r/2 - Math.floor(Math.random()*5), 0, Math.PI*2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}