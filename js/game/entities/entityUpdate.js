function updateCharacters() {
    snake.looseEnergy();
    snake.winPoints();

    let randomSpawnDecider = random();
    if (randomSpawnDecider <= 1 / (SETTINGS.tickSpeed * appleSettings.spawnRate)) {
        createApple();
    }
    randomSpawnDecider = random();
    if (randomSpawnDecider <= 1 / (SETTINGS.tickSpeed * foxSettings.spawnRate)) {
        createFox();
    }
    randomSpawnDecider = random();
    if (randomSpawnDecider <= 1 / (SETTINGS.tickSpeed * foxSettings.spawnRate)) {
        createChicken();
    }

    updateSnake();
    foxUpdate();
    chickenUpdate();

    despawnApples();
    despawnFoxes();
    despawnChickens();
}

function checkCollisions(character) {
    let collisionData = checkTileCollisions(character);
    collisionData = collisionData.concat(checkEntityCollisions(character));
    return collisionData;
}

function checkEntityCollisions(character) {
    let entityCollisions = checkAppleCollisions(character);
    entityCollisions = entityCollisions.concat(checkFoxCollisions(character));
    entityCollisions = entityCollisions.concat(checkChickenCollisions(character));
    return entityCollisions;
}

function checkTileCollisions(character) {
    const standingTile = gameMap.getCurrentTile(character.nextX, character.nextY);
    let tileCollisions = [];

    tileCollisions.push(standingTile);

    return tileCollisions;
}
