class Snake extends Character {
    constructor(x, y, settings, sprite, score = 0) {
        super(x, y, settings, sprite);
        this.state = 'alive';
        this.stateMessage = '';

        this.initialMaxEnergy = settings.maxEnergy;
        this.maxEnergy = this.initialMaxEnergy;
        this.energy = this.initialMaxEnergy;
        this.energyDepletionRate = settings.energyDepletionRate;
        this.hungry = false;

        this.score = score;
        this.scoreIncreaseRate = settings.scoreIncreaseRate;
    }

    setMaxEnergy(maxEnergy) {
        this.maxEnergy = maxEnergy;
    }

    setScoreIncreaseRate(rate) {
        this.scoreIncreaseRate = rate;
    }

    setSpeed(speed) {
        this.speed = speed;
    }

    render() {
        push();
        translate(this.x, this.y);
        rotate(-this.orientation + PI / 2);
        /* noStroke();
        fill(139, 91, 36);
        rect(0, 0, this.size.width, this.size.height); */
        this.sprite.displayImage(0, 0, this.size.height);
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
            let message = '';
            if (chickenAttack) {
                message = "Une poule a fini par t'attraper. Souviens toi, ce sont des animaux dangereux.";
                sounds.chickenCapture.play();
            } else {
                message = "Tu n'as pas la force de continuer. Pense à manger des pommes, c'est bon les pommes.";
                sounds.hungerDeath.play();
            }
            this.captured(message);
            return;
        }

        if (!this.hungry && this.energy / this.initialMaxEnergy <= 0.1) {
            sounds.hungry.play();
            this.hungry = true;
        }

        if (chickenAttack) {
            sounds.chickenTouch.play();
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

        if (this.hungry && this.energy / this.initialMaxEnergy > 0.1) {
            this.hungry = false;
        }
        sounds.appleEat.play();
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
                sounds.drown.play();
            }
            if (entity instanceof Apple) {
                collisionEffects = false;
                this.eat(entity);
            }
            if (entity instanceof Fox) {
                collisionEffects = false;
                this.winPoints((this.score * entity.scorePercentage) / 100);
                sounds.score.play();
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
