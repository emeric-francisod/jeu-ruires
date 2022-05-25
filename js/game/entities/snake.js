class Snake extends Entity {
    constructor(x, y, settings) {
        super(x, y, settings.width, settings.height);
        this.orientation = 0;
        this.speed = 5;
        this.velocity = createVector(0, 0);
        this.calculateVelocity();
        this.state = 'alive';
        this.stateMessage = '';

        this.maxEnergy = settings.maxEnergy;
        this.energy = this.maxEnergy;
        this.energyDepletionRate = settings.energyDepletionRate;
    }

    render() {
        push();
        translate(this.x, this.y);
        rotate(-this.orientation);
        noStroke();
        fill(0, 100, 50);
        rect(0, 0, this.size.width, this.size.height);
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

    looseEnergy() {
        this.energy -= this.maxEnergy / (this.energyDepletionRate * SETTINGS.tickSpeed);
        if (this.energy <= 0) {
            this.captured("Tu n'as pas la force de continuer. Pense à manger des pommes, c'est bon les pommes");
        }
    }

    get stateMessage() {
        return this._stateMessage;
    }

    set stateMessage(message) {
        this._stateMessage = message;
    }
}
