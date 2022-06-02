class Snake extends Entity {
    constructor(x, y, settings) {
        super(x, y, settings.width, settings.height);
        this.nextPosition = createVector(x, y);
        this.orientation = 0;
        this.nextOrientation = 0;
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
        this.hitbox.setPosition(this.nextPosition.x, this.nextPosition.y);
    }

    confirmPosition(isConfirmed = true) {
        if (isConfirmed) {
            this.position.x = this.nextPosition.x;
            this.position.y = this.nextPosition.y;
        } else {
            this.nextPosition.x = this.position.x;
            this.nextPosition.y = this.position.y;
            this.hitbox.setPosition(this.position.x, this.position.y);
        }
    }

    rotate(angle) {
        this.nextOrientation = angle;
        this.hitbox.setAngle(this.nextOrientation);
    }

    confirmAngle(isConfirmed = true) {
        if (isConfirmed) {
            this.orientation = this.nextOrientation;
        } else {
            this.nextOrientation = this.orientation;
            this.hitbox.setAngle(this.orientation);
        }
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

    manageCollisions(entities = []) {
        let collisionEffects = false;
        entities.forEach((entity) => {
            if (entity instanceof WaterTile) {
                collisionEffects = true;
                this.captured('Attention, tu ne peux pas nager!');
            } else if (entity instanceof MountainTile) {
                collisionEffects = true;
            }
        });
        return collisionEffects;
    }

    get stateMessage() {
        return this._stateMessage;
    }

    set stateMessage(message) {
        this._stateMessage = message;
    }
}
