class Snake extends Character {
    constructor(x, y, settings, score = 0) {
        super(x, y, settings);
        this.state = 'alive';
        this.stateMessage = '';

        this.initialMaxEnergy = settings.maxEnergy;
        this.maxEnergy = this.initialMaxEnergy;
        this.energy = this.initialMaxEnergy;
        this.energyDepletionRate = settings.energyDepletionRate;

        this.score = score;
        this.scoreIncreaseRate = settings.scoreIncreaseRate;
    }

    setMaxEnergy(maxEnergy) {
        this.maxEnergy = maxEnergy;
    }

    render() {
        push();
        translate(this.x, this.y);
        rotate(-this.orientation);
        noStroke();
        fill(139, 91, 36);
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

    looseEnergy(dammage = null) {
        let chickenAttack = false;
        if (dammage === null) {
            this.energy -= this.initialMaxEnergy / (this.energyDepletionRate * SETTINGS.tickSpeed);
        } else {
            this.energy -= dammage;
            chickenAttack = true;
        }
        if (this.energy <= 0) {
            let message = chickenAttack
                ? "Une poule a fini par t'attraper. Souvient toi, ce sont des animaux dangereux."
                : "Tu n'as pas la force de continuer. Pense à manger des pommes, c'est bon les pommes.";
            this.captured(message);
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
            if (entity instanceof Fox) {
                collisionEffects = false;
                this.winPoints((this.score * entity.scorePercentage) / 100);
                despawnFox(entity);
            }
            if (entity instanceof Chicken) {
                collisionEffects = false;
                this.looseEnergy(entity.dammage);
                despawnChicken(entity);
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
