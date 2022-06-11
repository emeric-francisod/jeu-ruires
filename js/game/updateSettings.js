function updateSettings() {
    updateMaxEnergy();
    updateScoreIncreaseRate();
    updateSpeeds();
    updateSpawnRates();
    updateSpawnCaps();
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

function slopeByDouble(initial, time) {
    let timeToDouble = time * SETTINGS.tickSpeed;
    return initial / timeToDouble;
}

function slopeByOrigin(initial, final, time) {
    let timeTick = time * SETTINGS.tickSpeed;
    return (final - initial) / timeTick;
}

function growthFactor(x, a, b, t) {
    return a + pow(b, x / t);
}

function updateMaxEnergy() {
    let slope = slopeByDouble(snakeSettings.maxEnergy, 180);
    snake.setMaxEnergy(affine(gameLength, slope, snake.initialMaxEnergy));
}

function updateScoreIncreaseRate() {
    snake.setScoreIncreaseRate(growthFactor(gameLength, snakeSettings.scoreIncreaseRate, 2, 10 * SETTINGS.tickSpeed));
}

function updateSpeeds() {
    let slope = slopeByDouble(snakeSettings.speed, 120);
    snake.setSpeed(affine(gameLength, slope, snakeSettings.speed));
    foxSettings.speed =
        foxSettings.speed >= snake.speed * 0.9
            ? snake.speed * 0.9
            : affine(gameLength, slope * 1.1, foxSettings.initialSpeed);
    chickenSettings.speed =
        chickenSettings.speed >= snake.speed * 0.9
            ? snake.speed * 0.9
            : affine(gameLength, slope * 1.1, chickenSettings.initialSpeed);
}

function updateSpawnRates() {
    let slope = slopeByDouble(foxSettings.initialSpawnRate, 600);
    foxSettings.spawnRate = affine(gameLength, slope, foxSettings.initialSpawnRate);
    slope = slopeByOrigin(chickenSettings.initialSpawnRate, 1, 180);
    chickenSettings.spawnRate =
        chickenSettings.spawnRate <= 0.3 ? 0.3 : affine(gameLength, slope, chickenSettings.initialSpawnRate);
}

function updateSpawnCaps() {}

function resetSettings() {
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
