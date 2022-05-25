class Snake {
    constructor(x, y, settings) {
        this.position = createVector(x, y);
        this.size = { w: gameMap.gridSize * 1.8, h: gameMap.gridSize * 0.9 };
        this.orientation = 0;
        this.speed = 5;
        this.velocity = createVector(0, 0);
        this.calculateVelocity();
        this.state = 'alive';
        this.stateMessage = '';

        this.maxEnergy = settings.maxEnergy;
        this.energy = this.maxEnergy;
    }

    get x() {
        return this.position.x;
    }

    get y() {
        return this.position.y;
    }

    render() {
        push();
        translate(this.x, this.y);
        rotate(-this.orientation);
        rectMode(CENTER);
        noStroke();
        fill(0, 100, 50);
        rect(0, 0, this.size.w, this.size.h);
        pop();
    }

    moveForward() {
        let newX = this.position.x;
        let newY = this.position.y;

        for (let t = 0; t <= 1; t += 0.01) {
            let nextX = this.velocity.x * t + this.position.x;
            let nextY = this.velocity.y * t + this.position.y;
            if (this.checkCollisions(nextX, nextY)) {
                break;
            }
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
        this.velocity.set(vx, -vy);
    }

    checkCollisions(x, y) {
        const standingTile = gameMap.getCurrentTile(x, y);
        if (standingTile instanceof GroundTile) {
            return false;
        }

        if (standingTile instanceof WaterTile) {
            this.captured('Attention, tu ne peut pas nager!');
        }

        return true;
    }

    captured(message = '') {
        this.state = 'captured';
        this.stateMessage = message;
    }

    isCaptured() {
        return this.state === 'captured';
    }

    get stateMessage() {
        return this._stateMessage;
    }

    set stateMessage(message) {
        this._stateMessage = message;
    }
}
