class Snake extends Entity {
    constructor(x, y, settings) {
        super(x, y, settings.width, settings.height);
        this.nextPosition = createVector(x, y);
        this.orientation = 0;
        this.speed = 5;
        this.velocity = createVector(0, 0);
        this.calculateVelocity();
        this.state = 'alive';
        this.stateMessage = '';

        this.maxEnergy = settings.maxEnergy;
        this.energy = this.maxEnergy;
        this.energyDepletionRate = settings.energyDepletionRate;

        this.hitbox = new RectangleHitbox(
            this.position.x,
            this.position.y,
            this.size.width,
            this.size.height,
            this.orientation
        );
    }

    get nextX() {
        return this.nextPosition.x;
    }

    get nextY() {
        return this.nextPosition.y;
    }

    render() {
        push();
        translate(this.x, this.y);
        rotate(-this.orientation);
        noStroke();
        fill(0, 100, 50);
        rect(0, 0, this.size.width, this.size.height);
        //circle(0, 0, 3);
        pop();
    }

    moveForward(t) {
        this.nextPosition.x += this.velocity.x * t;
        this.nextPosition.y += this.velocity.y * t;
    }

    confirmPosition() {
        this.position.x = this.nextPosition.x;
        this.position.y = this.nextPosition.y;
        this.hitbox.setPosition(this.position.x, this.position.y);
    }

    rotate(angle) {
        this.orientation = angle;
        this.hitbox.setAngle(this.orientation);
        this.calculateVelocity();
    }

    calculateVelocity() {
        this.velocity = p5.Vector.fromAngle(-this.orientation, this.speed);
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
            this.captured("Tu n'as pas la force de continuer. Pense à manger des pommes, c'est bon les pommes.");
        }
    }

    get stateMessage() {
        return this._stateMessage;
    }

    set stateMessage(message) {
        this._stateMessage = message;
    }
}
