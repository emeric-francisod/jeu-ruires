const SETTINGS = {
    width: 500,
    height: 500,
    tickSpeed: 24,
    gridSize: 10,
    movementCalculationPrecision: 0.05,
    rotationCalculationPrecision: Math.PI / 360,
};

const snakeSettings = {
    maxEnergy: 100,
    energyDepletionRate: 20,
    scoreIncreaseRate: 10,
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

const appleSettings = {
    size: SETTINGS.gridSize * 0.8,
    spawnRate: 1,
    spawnCap: 10,
    minSpawnRadius: 5,
    maxSpawnRadius: SETTINGS.width / SETTINGS.gridSize,
    despawnRadius: (SETTINGS.width * 2) / SETTINGS.gridSize,
    minNutritiveValue: 0,
    maxNutritiveValue: snakeSettings.maxEnergy * 0.33,
};

let gameMap;
let snake;
let guis = {};
let apples = [];

let actionnedKeys = {
    space: false,
};

function resetSnake() {
    let spawnPoint = false;
    do {
        gameMap = new Map(SETTINGS.width, SETTINGS.height, mapSettings);
        spawnPoint = gameMap.findSpawnPoint();
    } while (!spawnPoint);
    console.log(spawnPoint.x, spawnPoint.y);
    snake = new Snake(spawnPoint.x, spawnPoint.y, snakeSettings);
}

function resetGameUi() {
    guis.inGameGui = new GUI();
    guis.inGameGui.addComponent(new HealthBar(20, 15, 100, 15, snakeSettings.maxEnergy), 'health');
    guis.inGameGui.addComponent(
        new Message(SETTINGS.width - 20, 15, 'Score: ', 25, 'white', 'top', 'right', true, 200),
        'score'
    );
}

function resetFailUI() {
    let failMessageBackgroundColor = color(290, 95, 5, 0.7);
    guis.failMessage = new GUI(failMessageBackgroundColor);
    guis.failMessage.addComponent(
        new Message(
            SETTINGS.width / 2,
            SETTINGS.height * 0.05,
            "Pour recommencer, appuie sur la touche 'r'.",
            16,
            color(295, 10, 95),
            'top',
            'center',
            false,
            SETTINGS.width * 0.9
        ),
        'restartInstructions'
    );
    guis.failMessage.addComponent(
        new Message(
            SETTINGS.width / 2,
            SETTINGS.height / 2,
            'Perdu!',
            100,
            color(295, 10, 95),
            'bottom',
            'center',
            true,
            SETTINGS.width * 0.9
        ),
        'title'
    );
    guis.failMessage.addComponent(
        new Message(
            SETTINGS.width / 2,
            SETTINGS.height / 2,
            'Placeholder',
            25,
            color(295, 10, 95),
            'top',
            'center',
            true,
            SETTINGS.width * 0.9
        ),
        'message'
    );
    guis.failMessage.addComponent(
        new Message(
            SETTINGS.width / 2,
            SETTINGS.height * 0.95,
            'Score: 0',
            25,
            color(295, 10, 95),
            'bottom',
            'center',
            false,
            SETTINGS.width * 0.9
        ),
        'endScore'
    );
}

function resetGame() {
    resetSnake();
    resetFailUI();
    resetGameUi();
    if (!isLooping()) {
        loop();
    }
}

function setup() {
    createCanvas(SETTINGS.width, SETTINGS.height);
    console.log('start');
    frameRate(SETTINGS.tickSpeed);
    colorMode(HSB);

    resetGame();
}

function draw() {
    if (snake.isCaptured()) {
        let bestScore = getItem('bestScore');
        if (!bestScore || bestScore < snake.score) {
            storeItem('bestScore', round(snake.score));
        }
        renderGame();
        updateFailMessageGUI();
        renderFailMessage();
        noLoop();
    } else {
        background(75);
        updateCharacters();
        updateGameGUI();
        renderGame();
        renderGameUI();
    }
}

function keyPressed() {
    actionnedKeys.space = key === ' ';
    if (key === 'r' && snake.isCaptured()) {
        console.log('restart');
        resetGame();
    }
    return false;
}

function keyReleased() {
    actionnedKeys.space = !key === ' ';
    return false;
}
