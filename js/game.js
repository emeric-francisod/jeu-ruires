class Character {
    constructor() {
        this.x = Math.floor(options.gridWidth / 2);
        this.y = Math.floor(options.gridHeight / 2);
        this._rectangle = false;
    }

    draw() {
        stroke(0);
        strokeWeight(3);
        fill('red');
        if (this._rectangle) {
            rect(this.x * options.gridSize, this.y * options.gridSize, options.gridSize, options.gridSize);
        } else {
            circle((this.x + 0.5) * options.gridSize, (this.y + 0.5) * options.gridSize, options.gridSize);
        }
    }

    up() {
        this.y--;
    }

    down() {
        this.y++;
    }

    right() {
        this.x++;
    }

    left() {
        this.x--;
    }

    rectangle() {
        this._rectangle = true;
    }

    circle() {
        this._rectangle = false;
    }
}

const options = {
    gridSize: 20,
    gridWidth: 0,
    gridHeight: 0,
};

let mainCharacter;

function setup() {
    let canvas = createCanvas(400, 400);
    canvas.parent('game');
    options.gridHeight = height / options.gridSize;
    options.gridWidth = width / options.gridSize;
    mainCharacter = new Character();
}

function draw() {
    background(200);
    stroke(75);
    strokeWeight(1);

    for (let i = 0; i <= options.gridWidth; i++) {
        line(i * options.gridSize, 0, i * options.gridSize, height);
    }
    for (let i = 0; i <= options.gridHeight; i++) {
        line(0, i * options.gridSize, width, i * options.gridSize);
    }

    mainCharacter.draw();
}
