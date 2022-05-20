class Snake {
    constructor(x, y) {
        this.position = createVector(x, y);
        this.size = { w: map.gridSize * 1.8, h: map.gridSize * 0.9 };
        this.orientation = 0;
        this.speed = 5;
        this.velocity = createVector(0, 0);
        this.calculateVelocity();
    }

    render() {
        push();
        rotate(-this.orientation);
        rectMode(CENTER);
        noStroke();
        fill(255, 0, 0);
        rect(this.position.x, this.position.y, this.size.w, this.size.h);
        pop();
    }

    moveForward() {
        let newX = this.position.x;
        let newY = this.position.y;

        for (let t = 0; t <= 1; t += 0.1) {
            let nextX = this.velocity.x * t + this.position.x;
            let nextY = this.velocity.y * t + this.position.y;
            newX = nextX;
            newY = nextY;
        }

        this.position.x = newX;
        this.position.y = newY;
    }

    rotate(angle) {
        this.orientation = angle;
        this.calculateVelocity();
    }

    calculateVelocity() {
        let vx = this.speed * Math.cos(this.orientation);
        let vy = this.speed * Math.sin(this.orientation);
        this.velocity.set(vx, vy);
    }
}
