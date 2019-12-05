class Player {
    constructor(r) {
      this.color = "red";
      this.trajectoryColor = "gray";
      this.aimColor = "white";
      this.r = r;
      this.x = 3*r + Math.floor(Math.random() * (canvas.width-6*r));
      this.y = 3*r + Math.floor(Math.random() * (canvas.height-6*r));
      this.vx = 0;
      this.vy = 0;
      this.ay = 0.1;  // positive y acceleration brings you down in y direction

      this.maxTrajectoryLength = 20;
      this.trajectory = [];

      // Sounds
      this.jumpSound = document.createElement("audio");
      this.jumpSoundList = ["sounds/jumps/jump.wav", "sounds/jumps/jump2.wav", "sounds/jumps/jump3.wav", "sounds/jumps/jump4.wav"];
    }

    draw() {
        // draw trajectory
        for(var i=0; i<this.trajectory.length; i++) {
            ctx.beginPath();
            ctx.arc(this.trajectory[i].x, this.trajectory[i].y, this.r/(3 + (this.trajectory.length-i-1)), 0, Math.PI*2);
            ctx.fillStyle = this.trajectoryColor;
            ctx.fill();
            ctx.closePath();
        }
    
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI*2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();

    }

    update() {
        if(this.vx || this.vy) {    // if moving, add old coords to trajectory
            this.trajectory.push({x: this.x, y: this.y});
            if(this.trajectory.length === this.maxTrajectoryLength) { // if trajectory length is greater than max, shrink the trajectory from beginning
                this.trajectory.shift();
            }
        }
        else { // else shrink trajectory
            this.trajectory.shift();
        }

        if((this.x + this.vx + this.r > canvas.width) || (this.x + this.vx < this.r)) {
            this.vx = -this.vx/5;
        }
        if((this.y + this.vy + this.r > canvas.height) || (this.y + this.vy < this.r)) {
            this.vy = -this.vy/5;
        }
        this.x += this.vx;
        this.y += this.vy;
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
        ctx.strokeStyle = this.aimColor;
        ctx.lineWidth = 4;
        ctx.stroke();
        ctx.closePath();
    
        // draw trajectory
        for(var i=0; i<this.trajectory.length; i++) {
            ctx.beginPath();
            ctx.arc(this.trajectory[i].x, this.trajectory[i].y, this.r/(3 + (this.trajectory.length-i-1)), 0, Math.PI*2);
            ctx.fillStyle = this.trajectoryColor;
            ctx.fill();
            ctx.closePath();
        }

        // shrink ball according to aim length
        var shrinkFactor = 1 - (Math.sqrt( (mouseX-this.x)*(mouseX-this.x)  +  (mouseY-this.y)*(mouseY-this.y) )/(canvas.width + canvas.height));
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r * shrinkFactor, 0, Math.PI*2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    shoot(mouseX, mouseY) {
        // back to normal acceleration
        this.ay = 0.1;
        // give velocity according to length of aim length
        this.vx = (mouseX - this.x) * 20 / canvas.width;
        this.vy = (mouseY - this.y) * 20 / canvas.height;
        this.jumpSound.src = this.jumpSoundList[Math.floor(Math.random() * this.jumpSoundList.length)];
        this.jumpSound.volume = 0.2;
        this.jumpSound.play();
    }

    checkExplode(blobX, blobY, blobR) {
        if( Math.sqrt( (blobX-this.x)*(blobX-this.x)  +  (blobY-this.y)*(blobY-this.y) ) <= (this.r + blobR) ) {
            this.kill();
            return true;
        }
        return false;
    }

    kill() {
        this.vx = -this.vx;
        this.vy = -this.vy;
    }
  }