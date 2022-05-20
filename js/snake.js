class Snake {
    #position = { x: 0, y: 0 };
    #size = { w: map.gridSize * 1.8, h: map.gridSize * 0.9 };
    #orientation = 0;
    #speed = 5;

    constructor(x, y) {
        this.#position.x = x;
        this.#position.y = y;
    }

    checkCollisions(x, y, orientation) {
        return false;
    }

    render() {
        push();
        translate(WIDTH / 2, HEIGHT / 2);
        rotate(-this.#orientation);
        rectMode(CENTER);
        noStroke();
        fill(255, 0, 0);
        rect(0, 0, this.#size.w, this.#size.h);
        pop();
    }

    moveForward() {
        for (let i = 0; i < this.#speed; i++) {
            let newX = Math.cos(this.#orientation) + this.#position.x;
            let newY = Math.sin(this.#orientation) + this.#position.y;
            /* if (this.checkCollisions(newX, newY, this.#orientation)) {
                return;
            } */
            this.#position.x = newX;
            this.#position.y = newY;
        }
    }

    rotate(angle) {
        this.#orientation = angle;
    }

    getCornersCoordinates() {
        let coordinates = [
            {
                x: this.#position.x - this.#size.w / 2,
                y: this.#position.y - this.#size.h / 2,
            },
            {
                x: this.#position.x + this.#size.w / 2,
                y: this.#position.y - this.#size.h / 2,
            },
            {
                x: this.#position.x + this.#size.w / 2,
                y: this.#position.y + this.#size.h / 2,
            },
            {
                x: this.#position.x - this.#size.w / 2,
                y: this.#position.y + this.#size.h / 2,
            },
        ];
    }

    get orientation() {
        return this.#orientation;
    }

    get x() {
        return this.#position.x;
    }

    get y() {
        return this.#position.y;
    }

    /* #energy;
    #inventoryContent = 0;

    static initializeCharacterType({
        maxEnergy = 10,
        fightingSpirit = 10,
        speed = 5,
        ressourceMultiplier = {
            idle: 1,
            capture: 1,
            mining: 1,
            flight: 1,
        },
        endurance = 1,
        nutrientsAssimilation = 1,
        miningSpeed = 0,
        inventorySize = 0,
        jumpLength = 0,
    }) {
        Snake.#characterSettings = {
            maxEnergy,
            fightingSpirit,
            speed,
            ressourceMultiplier,
            endurance,
            nutrientsAssimilation,
            miningSpeed,
            inventorySize,
            jumpLength,
        };
    } */
}
