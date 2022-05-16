const WIDTH = 500;
const HEIGHT = 500;

let map;
let x = 0,
    y = 0;

function setup() {
    createCanvas(WIDTH, HEIGHT);
    frameRate(24);
    map = new Map(WIDTH, HEIGHT);
}

function draw() {
    background(75);
    move();
    map.render(x, y);
}

function move() {
    if (!keyIsPressed) {
        return false;
    }
    switch (keyCode) {
        case LEFT_ARROW:
            x -= 5;
            break;
        case RIGHT_ARROW:
            x += 5;
            break;
        case UP_ARROW:
            y -= 5;
            break;
        case DOWN_ARROW:
            y += 5;
            break;
    }
}
