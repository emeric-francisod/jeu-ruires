function updateCharacters() {
    updateSnake();
    snake.looseEnergy();

    let randomSpawnDecider = random();
    if (randomSpawnDecider <= 1 / (SETTINGS.tickSpeed * appleSettings.spawnRate)) {
        createApple();
    }

    despawnApples();
}

function updateSnake() {
    snakeRotationControl();
    snakeMoveControl();
}

function snakeMoveControl() {
    snake.calculateVelocity();
    for (let t = 0; t <= 1; t += SETTINGS.movementCalculationPrecision) {
        if (actionnedKeys.space) {
            snake.moveForward(SETTINGS.movementCalculationPrecision);
            let collisions = checkCollisions(snake);
            let collisionsEffects = snake.manageCollisions(collisions);
            if (collisionsEffects) {
                snake.confirmPosition(false);
                break;
            }
            snake.confirmPosition();
        }
    }
}

function snakeRotationControl() {
    centerMouseX = mouseX - SETTINGS.width / 2;
    centerMouseY = SETTINGS.height / 2 - mouseY;

    let angle = Math.atan(centerMouseY / centerMouseX);
    if (centerMouseX < 0) {
        angle += Math.PI;
    } else if (centerMouseY < 0) {
        angle += Math.PI * 2;
    }

    let currentAngle = snake.orientation;

    while (currentAngle !== angle) {
        if (abs(snake.orientation - angle) < SETTINGS.rotationCalculationPrecision) {
            currentAngle = angle;
        } else if (snake.orientation < angle) {
            currentAngle += SETTINGS.rotationCalculationPrecision;
        } else {
            currentAngle -= SETTINGS.rotationCalculationPrecision;
        }

        snake.rotate(currentAngle);
        let collisions = checkCollisions(snake);
        let collisionsEffects = snake.manageCollisions(collisions);
        if (collisionsEffects) {
            snake.confirmAngle(false);
            continue;
        }
        snake.confirmAngle();
    }
}

function checkCollisions(character) {
    let collisionData = checkTileCollisions(character);
    collisionData = collisionData.concat(checkEntityCollisions(character));
    console.log(collisionData);
    return collisionData;
}

function checkEntityCollisions(character) {
    return [];
}

function checkTileCollisions(character) {
    const standingTile = gameMap.getCurrentTile(character.nextX, character.nextY);
    let tileCollisions = [];

    tileCollisions.push(standingTile);

    return tileCollisions;
}

function createApple() {
    let spawnPoint = gameMap.findSpawnPoint(
        snake.x,
        snake.y,
        appleSettings.minSpawnRadius,
        appleSettings.maxSpawnRadius,
        true
    );
    console.log('Spawn apple at ', spawnPoint.x, spawnPoint.y);
    apples.push(
        new Apple(
            spawnPoint.x,
            spawnPoint.y,
            appleSettings.size,
            appleSettings.minNutritiveValue,
            appleSettings.maxNutritiveValue
        )
    );
}

function despawnApples() {
    for (let appleId in apples) {
        let apple = apples[appleId];
        let snakeAppleDistanceSquared =
            (snake.position.x - apple.position.x) * (snake.position.x - apple.position.x) +
            (snake.position.y - apple.position.y) * (snake.position.y - apple.position.y);
        let tileDistanceSquared = snakeAppleDistanceSquared / (SETTINGS.gridSize * SETTINGS.gridSize);

        if (tileDistanceSquared >= appleSettings.despawnRadius * appleSettings.despawnRadius) {
            apples.splice(appleId, 1);
            console.log('Supprimer pomme n°', appleId);
        }
    }
}
