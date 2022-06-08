class Snake extends Character {
    constructor(x, y, settings, score = 0) {
        super(x, y, settings);
        this.state = 'alive';
        this.stateMessage = '';

        this.maxEnergy = settings.maxEnergy;
        this.energy = this.maxEnergy;
        this.energyDepletionRate = settings.energyDepletionRate;

        this.score = score;
        this.scoreIncreaseRate = settings.scoreIncreaseRate;
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

    winPoints(points = null) {
        if (points === null) {
            this.score += this.scoreIncreaseRate / SETTINGS.tickSpeed;
        } else {
            this.score += points;
        }
    }

    eat(apple) {
        this.energy += apple.nutritiveValue;
        if (this.energy > this.maxEnergy) {
            this.energy = this.maxEnergy;
        }
        despawnApple(apple);
    }

    manageCollisions(entities = []) {
        let collisionEffects = true;
        entities.forEach((entity) => {
            if (entity instanceof GroundTile) {
                collisionEffects = false;
            }
            if (entity instanceof WaterTile) {
                this.captured('Attention, tu ne peux pas nager!');
            }
            if (entity instanceof Apple) {
                collisionEffects = false;
                this.eat(entity);
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
