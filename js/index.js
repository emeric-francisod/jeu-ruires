const SETTINGS = {
    width: 500,
    height: 500,
    tickSpeed: 24,
    gridSize: 10,
};

let snakeSettings = {
    maxEnergy: 100,
    energyDepletionRate: 10,
    width: 1.8 * SETTINGS.gridSize,
    height: 0.9 * SETTINGS.gridSize,
};

const mapSettings = {
    gridSize: SETTINGS.gridSize,
    perlinZoom: 0.001,
    seaLevel: 0.4,
    mountainLevel: 0.6,
    perlinOriginShift: 1000000,
};

/**
 * @type {Map}
 */
let gameMap;
/**
 * @type {Snake}
 */
let snake;
/**
 * @type {GUI}
 */
let inGameGui;

function setup() {
    createCanvas(SETTINGS.width, SETTINGS.height);
    frameRate(SETTINGS.tickSpeed);
    colorMode(HSB);

    gameMap = new Map(SETTINGS.width, SETTINGS.height, mapSettings);
    let spawnPoint = gameMap.findSpawnPoint();
    snake = new Snake(spawnPoint.x, spawnPoint.y, snakeSettings);

    inGameGui = new GUI();
    inGameGui.addComponent(new HealthBar(snakeSettings.maxEnergy), 'health');
}

function draw() {
    if (snake.isCaptured()) {
        renderGame();
        displayFailMessage();
    } else {
        background(75);
        move();
        snake.looseEnergy();
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
    rectMode(CENTER);
    text(snake.stateMessage, snake.x, snake.y, SETTINGS.width * 0.9);
}

function centerOnSnake() {
    translate(SETTINGS.width / 2 - snake.x, SETTINGS.height / 2 - snake.y);
    rectMode(CENTER);
}

function resetCoordinates() {
    resetMatrix();
    rectMode(CORNER);
}

function renderGame() {
    centerOnSnake();
    gameMap.render(snake.x, snake.y);
    snake.render();
}

function renderGameUI() {
    resetCoordinates();
    inGameGui.components.health.updateValue(snake.energy);
    inGameGui.render();
}

function move() {
    centerMouseX = mouseX - SETTINGS.width / 2;
    centerMouseY = SETTINGS.height / 2 - mouseY;

    let angle = Math.atan(centerMouseY / centerMouseX);
    if (centerMouseX < 0) {
        angle += Math.PI;
    } else if (centerMouseY < 0) {
        angle += Math.PI * 2;
    }

    snake.rotate(angle);
    snake.moveForward();
}
