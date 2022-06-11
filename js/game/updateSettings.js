function updateSettings() {
    updateMaxEnergy();
    updateScoreIncreaseRate();
}

function negativeExponential(x) {
    return -exp(-x);
}

function easeInOut(x) {
    return x < 0.5 ? 4 * x * x * x : 1 - pow(-2 * x + 2, 3) / 2;
}

function affine(x, a, b) {
    return a * x + b;
}

function growthFactor(x, a, b, t) {
    return a + pow(b, x / t);
}

function updateMaxEnergy() {
    let timeToFirstDouble = 180 * SETTINGS.tickSpeed;
    let slope = snakeSettings.maxEnergy / timeToFirstDouble;
    snake.setMaxEnergy(affine(gameLength, slope, snake.initialMaxEnergy));
}

function updateScoreIncreaseRate() {
    snake.setScoreIncreaseRate(growthFactor(gameLength, snakeSettings.scoreIncreaseRate, 2, 10 * SETTINGS.tickSpeed));
}

function resetSettings() {
    snakeSettings.maxEnergy = 100;
    snakeSettings.energyDepletionRate = 60;
    snakeSettings.scoreIncreaseRate = 10;
    snakeSettings.speed = 5;

    foxSettings.spawnRate = 3;
    foxSettings.spawnCap = 10;
    foxSettings.flightRadius = 7;
    foxSettings.minScorePercentage = 1;
    foxSettings.maxScorePercentage = 20;
    foxSettings.speed = 3;

    chickenSettings.spawnRate = 3;
    chickenSettings.spawnCap = 10;
    chickenSettings.attackRadius = 20;
    chickenSettings.minDammage = 1;
    chickenSettings.maxDammage = snakeSettings.maxEnergy * 0.3;
    chickenSettings.speed = 2;

    appleSettings.spawnRate = 2;
    appleSettings.spawnCap = 10;
    appleSettings.minNutritiveValue = 0;
    appleSettings.maxNutritiveValue = snakeSettings.maxEnergy * 0.3;
}
