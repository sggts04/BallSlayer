class Player {
    constructor(r) {
      this.r = r;
      this.x = 3*r + Math.floor(Math.random() * (canvas.width-6*r));
      this.y = 3*r + Math.floor(Math.random() * (canvas.height-6*r));
      this.vx = 0;
      this.vy = 0;
      this.ax = 0;
      this.ay = 0.1;  // positive y acceleration brings you down in y direction
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI*2);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.closePath();
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vx += this.ax;
        this.vy += this.ay;
    }

    aim(mouseX, mouseY) {
        // slow down when aiming
        this.ay = 0;
        this.vx = (Math.abs(this.vx) < 1)? this.vx: (this.vx/Math.abs(this.vx));    // velocity should be less than 1 or 1, in same direction as original velocity
        this.vy = (Math.abs(this.vy) < 1)? this.vy: (this.vy/Math.abs(this.vy));
        // draw aiming line
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(mouseX, mouseY);
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 4;
        ctx.stroke();
        ctx.closePath();
        // shrink ball according to aim length
        var shrinkFactor = 1 - (Math.sqrt( (mouseX-this.x)*(mouseX-this.x)  +  (mouseY-this.y)*(mouseY-this.y) )/(canvas.width + canvas.height));
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r * shrinkFactor, 0, Math.PI*2);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.closePath();
    }

    shoot(mouseX, mouseY) {
        // back to normal acceleration
        this.ay = 0.1;
        // give velocity according to length of aim length
        this.vx = (mouseX - this.x) * 20 / canvas.width;
        this.vy = (mouseY - this.y) * 20 / canvas.height;
    }
  }