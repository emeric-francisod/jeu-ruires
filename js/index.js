const SETTINGS = {
    width: 500,
    height: 500,
    tickSpeed: 24,
    gridSize: 10,
    calculationPrecision: 0.01,
};

const snakeSettings = {
    maxEnergy: 100,
    energyDepletionRate: 120,
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
    minSpawnRadius: 5,
    maxSpawnRadius: SETTINGS.width / SETTINGS.gridSize,
    despawnRadius: (SETTINGS.width * 2) / SETTINGS.gridSize,
    minNutritiveValue: 0,
    maxNutritiveValue: snakeSettings.maxEnergy,
};

let gameMap;
let snake;
let guis = {};
let apples = [];

let actionnedKeys = {
    space: false,
};

function setup() {
    createCanvas(SETTINGS.width, SETTINGS.height);
    console.log('start');
    frameRate(SETTINGS.tickSpeed);
    colorMode(HSB);
    let spawnPoint = false;
    do {
        gameMap = new Map(SETTINGS.width, SETTINGS.height, mapSettings);
        spawnPoint = gameMap.findSpawnPoint();
    } while (!spawnPoint);
    console.log(spawnPoint.x, spawnPoint.y);
    snake = new Snake(spawnPoint.x, spawnPoint.y, snakeSettings);

    guis.inGameGui = new GUI();
    guis.inGameGui.addComponent(new HealthBar(20, 15, 100, 15, snakeSettings.maxEnergy), 'health');

    let failMessageBackgroundColor = color(290, 95, 5, 0.7);
    guis.failMessage = new GUI(failMessageBackgroundColor);
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
}

function draw() {
    /* if (snake.isCaptured()) {
        renderGame();
        updateFailMessageGUI();
        renderFailMessage();
    } else {
        background(75);
        updateCharacters();
        updateGameGUI();
        renderGame();
        renderGameUI();
    } */
    background(55);
    noStroke();
    rectMode(CENTER);
    fill('black');
    resetMatrix();
    translate(width / 2, height / 2);
    circle(0, 0, 5);
    push();
    translate(50, 70);
    rotate(PI / 5);
    rect(0, 0, 40, 40);
    pop();
    fill('gray');
    push();
    translate(mouseX - width / 2, mouseY - height / 2);
    circle(0, 0, 20);
    pop();

    let h1 = new RectangleHitbox(50, 70, 40, 40, PI / 5);
    let h2 = new CircleHitbox(mouseX - width / 2, mouseY - height / 2, 20);

    if (h1.testCollision(h2)) {
        console.log('Collision');
    } else {
        console.log('No collision');
    }
}

function drawVector(vector, color) {
    vector.setMag(10);
    stroke(color);
    strokeWeight(2);
    line(0, 0, vector.x, vector.y);
    fill(color);
    noStroke();
    rect(vector.x, vector.y, 4, 4);
}
function drawPoint(vector, color, size) {
    noStroke();
    fill(color);
    circle(vector.x, vector.y, size);
}

function drawSimplex(simplex, color, size) {
    for (let i = 0; i < simplex.length; i++) {
        drawPoint(simplex[i], color, size);
        stroke(color);
        strokeWeight(size);
        if (i > 0) {
            line(simplex[i - 1].x, simplex[i - 1].y, simplex[i].x, simplex[i].y);
        } else {
            line(simplex[simplex.length - 1].x, simplex[simplex.length - 1].y, simplex[i].x, simplex[i].y);
        }
    }
}

function keyPressed() {
    actionnedKeys.space = key === ' ';
    if (key === 'a') {
        createApple();
    }
    return false;
}

function keyReleased() {
    actionnedKeys.space = !key === ' ';
    return false;
}
