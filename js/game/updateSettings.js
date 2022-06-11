function updateSettings() {
    updateMaxEnergy();
    updateScoreIncreaseRate();
    updateSpeeds();
    updateSpawnRates();
    updateSpawnCaps();
    updateAttackDammages();
    updateAttackRadius();
    updateFlightRadius();
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
    slope = slopeByOrigin(chickenSettings.initialSpawnRate, 1, 300);
    chickenSettings.spawnRate =
        chickenSettings.spawnRate <= 0.3 ? 0.3 : affine(gameLength, slope, chickenSettings.initialSpawnRate);
    slope = slopeByOrigin(appleSettings.initialSpawnRate, 1, 300);
    appleSettings.spawnRate =
        appleSettings.spawnRate <= 0.7 ? 0.7 : affine(gameLength, slope, appleSettings.initialSpawnRate);
}

function updateSpawnCaps() {
    let slope = slopeByOrigin(foxSettings.initialSpawnCap, 2, 600);
    foxSettings.spawnCap = foxSettings.spawnCap <= 2 ? 2 : ceil(affine(gameLength, slope, foxSettings.initialSpawnCap));
    slope = slopeByDouble(chickenSettings.initialSpawnCap, 600);
    chickenSettings.spawnCap =
        chickenSettings.spawnCap >= 5 * chickenSettings.initialSpawnCap
            ? 5 * chickenSettings.initialSpawnCap
            : ceil(affine(gameLength, slope, chickenSettings.initialSpawnCap));
    slope = slopeByOrigin(appleSettings.initialSpawnCap, 5, 600);
    appleSettings.spawnCap =
        appleSettings.spawnCap <= 5 ? 5 : ceil(affine(gameLength, slope, appleSettings.initialSpawnCap));
}

function updateFlightRadius() {
    let slope = slopeByDouble(foxSettings.initialFlightRadius, 600);
    foxSettings.flightRadius =
        foxSettings.flightRadius >= 30 ? 30 : affine(gameLength, slope, foxSettings.initialFlightRadius);
}

function updateAttackRadius() {
    let slope = slopeByDouble(chickenSettings.initialAttackRadius, 200);
    chickenSettings.attackRadius = affine(gameLength, slope, chickenSettings.initialAttackRadius);
}

function updateAttackDammages() {
    chickenSettings.maxDammage = snake.maxEnergy * 0.3;
}

function resetSettings() {
    foxSettings.flightRadius = 7;

    chickenSettings.spawnCap = 10;
    chickenSettings.attackRadius = 20;
    chickenSettings.minDammage = 1;
    chickenSettings.maxDammage = snakeSettings.maxEnergy * 0.3;
}
