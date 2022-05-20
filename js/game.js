const WIDTH = 500;
const HEIGHT = 500;

let gameMap;
let snake;

function setup() {
    createCanvas(WIDTH, HEIGHT);
    frameRate(24);
    colorMode(HSL);
    gameMap = new Map(WIDTH, HEIGHT);
    snake = new Snake(0, 0);
}

function draw() {
    background(75);
    move();
    translate(WIDTH / 2 - snake.x, HEIGHT / 2 - snake.y);
    gameMap.render(snake.x, snake.y);
    snake.render();
}

function move() {
    centerMouseX = mouseX - WIDTH / 2;
    centerMouseY = HEIGHT / 2 - mouseY;

    let angle = Math.atan(centerMouseY / centerMouseX);
    if (centerMouseX < 0) {
        angle += Math.PI;
    } else if (centerMouseY < 0) {
        angle += Math.PI * 2;
    }

    snake.rotate(angle);
    snake.moveForward();
}
/*
function collisions(firstObject, secondObject) {
    let referenceCorners = firstObject.getCornersCoordinates();
    let secondCorners = rotateAxis(
        secondObject.getCornersCoordinates(),
        firstObject.orientation - secondObject.orientation
    );

    for (let i = 0; i < secondCorners.length; i++) {
        if (
            secondCorners[i].x >= referenceCorners[0].x &&
            secondCorners[i].x <= referenceCorners[1].x &&
            secondCorners[i].y <= referenceCorners[3].y &&
            secondCorners[i].y >= referenceCorners[0].y
        ) {
            return true;
        }
    }

    return collisions(secondObject, firstObject);
}

function rotateAxis(points = [], angle) {
    let rotatedCoordinates = [];
    for (let i = 0; i < points.length; i++) {
        rotatedCoordinates.push({
            x: points[i].x * Math.cos(angle) + points[i].y * Math.sin(angle),
            y: points[i].y * Math.cos(angle) - points[i].x * Math.sin(angle),
        });
    }
    return rotatedCoordinates;
}
 */
