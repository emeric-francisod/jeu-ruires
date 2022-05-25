const WIDTH = 500;
const HEIGHT = 500;
const TICK_SPEED = 24;

let snakeSettings = {
    maxEnergy: 100,
};

let gameMap;
let snake;

function setup() {
    createCanvas(WIDTH, HEIGHT, 10, 0.001, 0.6, 0.7);
    frameRate(TICK_SPEED);
    colorMode(HSB);
    gameMap = new Map(WIDTH, HEIGHT);
    let spawnPoint = gameMap.findSpawnPoint();
    snake = new Snake(spawnPoint.x, spawnPoint.y, snakeSettings);
}

function draw() {
    if (snake.isCaptured()) {
        renderGame();
        displayFailMessage();
    } else {
        background(75);
        move();
        renderGame();
        renderGameUI();
    }
}

function displayFailMessage() {
    background(290, 95, 5, 0.7);
    fill(295, 10, 95);
    textAlign(CENTER, BOTTOM);
    textSize(100);
    textStyle(BOLD);
    text('Perdu!', snake.x, snake.y);
    textSize(25);
    textStyle(BOLD);
    textAlign(CENTER, TOP);
    text(snake.stateMessage, snake.x, snake.y);
}

function centerOnSnake() {
    translate(WIDTH / 2 - snake.x, HEIGHT / 2 - snake.y);
}

function resetCoordinates() {
    resetMatrix();
}

function renderGame() {
    centerOnSnake();
    gameMap.render(snake.x, snake.y);
    snake.render();
}

function renderEnergyBar() {
    const barMaxWidth = 100;
    const barWidth = (snake.energy * barMaxWidth) / snake.maxEnergy;
    const barHeight = 15;
    const borderWeight = 3;
    const barMargin = {
        horizontal: 20,
        vertical: 15,
    };

    fill(0, 98, 91);
    noStroke();
    rect(barMargin.horizontal, barMargin.vertical, barWidth, barHeight);

    stroke(120, 10, 91);
    strokeWeight(borderWeight);
    noFill();
    rect(barMargin.horizontal, barMargin.vertical, barMaxWidth, barHeight);
}

function renderGameUI() {
    resetCoordinates();
    renderEnergyBar();
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

function entityTileCollision(entityX, entityY, tileX, tileY) {
    if (
        entityX >= tileX &&
        entityX <= tileX + gameMap.gridSize &&
        entityY >= tileY &&
        entityY <= tileY + gameMap.gridSize
    ) {
        return true;
    }

    return false;
}
