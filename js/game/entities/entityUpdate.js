function updateCharacters() {
    updateSnake();
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

    despawnApples();
    despawnFoxes();
}

function checkCollisions(character) {
    let collisionData = checkTileCollisions(character);
    collisionData = collisionData.concat(checkEntityCollisions(character));
    return collisionData;
}

function checkEntityCollisions(character) {
    let entityCollisions = checkAppleCollisions(character);
    entityCollisions = entityCollisions.concat(checkFoxCollisions(character));
    return entityCollisions;
}

function checkTileCollisions(character) {
    const standingTile = gameMap.getCurrentTile(character.nextX, character.nextY);
    let tileCollisions = [];

    tileCollisions.push(standingTile);

    return tileCollisions;
}
