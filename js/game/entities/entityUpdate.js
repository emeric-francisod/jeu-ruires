function updateCharacters() {
    updateSnake();
    snake.looseEnergy();
    snake.winPoints();

    let randomSpawnDecider = random();
    if (randomSpawnDecider <= 1 / (SETTINGS.tickSpeed * appleSettings.spawnRate)) {
        createApple();
    }
    if (randomSpawnDecider <= 1 / (SETTINGS.tickSpeed * foxSettings.spawnRate)) {
        createFox();
    }

    despawnApples();
}

function checkCollisions(character) {
    let collisionData = checkTileCollisions(character);
    collisionData = collisionData.concat(checkEntityCollisions(character));
    return collisionData;
}

function checkEntityCollisions(character) {
    let tileCollisions = [];
    apples.forEach((apple) => {
        if (
            circleCollision(
                {
                    c1x: character.x,
                    c1y: character.y,
                    r1: character.size.outRadius,
                },
                {
                    c2x: apple.x,
                    c2y: apple.y,
                    r2: apple.size.outRadius,
                }
            )
        ) {
            tileCollisions.push(apple);
        }
    });
    return tileCollisions;
}

function checkTileCollisions(character) {
    const standingTile = gameMap.getCurrentTile(character.nextX, character.nextY);
    let tileCollisions = [];

    tileCollisions.push(standingTile);

    return tileCollisions;
}
