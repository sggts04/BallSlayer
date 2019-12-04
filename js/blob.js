class Blob {
    constructor(r) {
        this.color = "orange";
        this.r = r;
        this.x = 3*r + Math.floor(Math.random() * (canvas.width-6*r));
        this.y = 3*r + Math.floor(Math.random() * (canvas.height-6*r));
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI*2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}