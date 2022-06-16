const SETTINGS = {
    width: window.innerWidth * 0.9,
    height: window.innerHeight * 0.9,
    tickSpeed: 24,
    gridSize: 10,
    movementCalculationPrecision: 0.1,
    rotationCalculationPrecision: Math.PI / 180,
};

const snakeSettings = {
    maxEnergy: 100,
    energyDepletionRate: 45,
    scoreIncreaseRate: 10,
    width: 1.8 * SETTINGS.gridSize,
    height: 3.9 * SETTINGS.gridSize,
    speed: 5,
};

const foxSettings = {
    width: 1.4 * SETTINGS.gridSize,
    height: 4.5 * SETTINGS.gridSize,
    initialSpawnRate: 3,
    spawnRate: 3,
    spawnCap: 10,
    initialSpawnCap: 10,
    minSpawnRadius: 7,
    maxSpawnRadius: SETTINGS.width / SETTINGS.gridSize,
    despawnRadius: (SETTINGS.width * 2) / SETTINGS.gridSize,
    flightRadius: 7,
    initialFlightRadius: 7,
    minScorePercentage: 1,
    maxScorePercentage: 20,
    initialSpeed: 3,
    speed: 3,
};

const chickenSettings = {
    width: 1.4 * SETTINGS.gridSize,
    height: 3 * SETTINGS.gridSize,
    initialSpawnRate: 6,
    spawnRate: 6,
    spawnCap: 5,
    initialSpawnCap: 5,
    minSpawnRadius: 15,
    maxSpawnRadius: SETTINGS.width / SETTINGS.gridSize,
    despawnRadius: (SETTINGS.width * 2) / SETTINGS.gridSize,
    attackRadius: 10,
    initialAttackRadius: 10,
    minDammage: 1,
    maxDammage: snakeSettings.maxEnergy * 0.3,
    initialSpeed: 2,
    speed: 2,
};

const mapSettings = {
    gridSize: SETTINGS.gridSize,
    perlinZoom: 0.001,
    seaLevel: 0.36,
    mountainLevel: 0.67,
    perlinOriginShift: 1000000,
};

const appleSettings = {
    size: SETTINGS.gridSize,
    initialSpawnRate: 2,
    spawnRate: 2,
    spawnCap: 10,
    initialSpawnCap: 10,
    minSpawnRadius: 5,
    maxSpawnRadius: SETTINGS.width / 2 / SETTINGS.gridSize,
    despawnRadius: (SETTINGS.width * 2) / SETTINGS.gridSize,
    minNutritiveValue: 0,
    maxNutritiveValue: snakeSettings.maxEnergy * 0.3,
};

let gameLength = 0;

let gameMap;
let snake;
let guis = {};
let apples = [];
let foxes = [];
let chickens = [];

let sprites = {};
let sounds = {};
let musics = [];
let currentMusicId = null;

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
    snake = new Snake(spawnPoint.x, spawnPoint.y, snakeSettings, sprites.snakeStill);
}

function resetEntities() {
    apples = [];
    foxes = [];
    chickens = [];
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
    gameLength = 0;
    resetSnake();
    resetFailUI();
    resetGameUi();
    resetEntities();
    updateSettings();
    if (!isLooping()) {
        loop();
    }
}

function imagePreload() {
    loadImage('./sprites/serpent-stop.png', (img) => {
        sprites['snakeStill'] = new Sprite(img, 28, 64);
    });
    loadImage('./sprites/serpent-marche.png', (img) => {
        sprites['snakeMove'] = new Sprite(img, 40, 64);
    });
    loadImage('./sprites/poule-marche.png', (img) => {
        sprites['chickenMove'] = new Sprite(img, 24, 53);
    });
    loadImage('./sprites/renard-marche.png', (img) => {
        sprites['foxMove'] = new Sprite(img, 20, 64);
    });
    loadImage('./sprites/Pomme.png', (img) => {
        sprites['apple'] = new Sprite(img, img.width, img.height);
    });
}

function soundPreload() {
    loadSound('./audio/apple-eat.wav', (sound) => {
        sounds['appleEat'] = sound;
    });
    loadSound('./audio/chicken buck.wav', (sound) => {
        sound.setVolume(0.7);
        sounds['chickenTouch'] = sound;
    });
    loadSound('./audio/chicken.wav', (sound) => {
        sounds['chickenCapture'] = sound;
    });
    loadSound('./audio/drown.mp3', (sound) => {
        sounds['drown'] = sound;
    });
    loadSound('./audio/hunger-death.mp3', (sound) => {
        sound.setVolume(0.4);
        sounds['hungerDeath'] = sound;
    });
    loadSound('./audio/hungry.wav', (sound) => {
        sounds['hungry'] = sound;
    });
    loadSound('./audio/score.wav', (sound) => {
        sounds['score'] = sound;
    });
    loadSound('./audio/snake-crawl.wav', (sound) => {
        sounds['snakeCrawl'] = sound;
    });
}

function musicPreload() {
    loadSound('./audio/music1.mp3', (music) => {
        music.setVolume(0.2, 3);
        musics.push(music);
        if (currentMusicId === null) {
            currentMusicId = 0;
        }
    });
    loadSound('./audio/music2.mp3', (music) => {
        music.setVolume(0.2, 3);
        musics.push(music);
    });
}

function preload() {
    imagePreload();
    soundPreload();
    musicPreload();
}

function setup() {
    SETTINGS.gridSize = constrain(SETTINGS.width / 100, 15, 50);
    createCanvas(SETTINGS.width, SETTINGS.height);
    console.log('start');
    frameRate(SETTINGS.tickSpeed);
    colorMode(HSB);

    //resetGame();
    noLoop();
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
        stopMusic();
        noLoop();
    } else {
        gameLength++;
        background(75);
        updateSettings();
        updateCharacters();
        updateGameGUI();
        renderGame();
        renderGameUI();
        renderMusic();
    }
}

function keyPressed() {
    if (key === ' ') {
        actionnedKeys.space = true;
        snake.setSprite(sprites.snakeMove);
        sounds.snakeCrawl.loop();
        return false;
    }
    if (key === 'r' && snake.isCaptured()) {
        console.log('restart');
        resetGame();
        return false;
    }
}

function keyReleased() {
    if (key === ' ') {
        actionnedKeys.space = false;
        snake.setSprite(sprites.snakeStill);
        sounds.snakeCrawl.stop();
        return false;
    }
}

document.getElementById('closeDialog').addEventListener('click', (event) => {
    document.getElementById('rules').removeAttribute('open');
    resetGame();
});
