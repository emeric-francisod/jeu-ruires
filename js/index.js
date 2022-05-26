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

let gameMap;
let snake;
let inGameGui;

let actionnedKeys = {
    space: false,
};

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
        moveCharacters();
        snake.looseEnergy();
        renderGame();
        renderGameUI();
    }
}

function keyPressed() {
    actionnedKeys.space = key === ' ';
    return false;
}

function keyReleased() {
    actionnedKeys.space = !key === ' ';
    return false;
}
