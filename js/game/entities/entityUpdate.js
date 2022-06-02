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
            if (checkCollisions(snake)) {
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
        if (checkCollisions(snake)) {
            snake.confirmAngle(false);
            continue;
        }
        snake.confirmAngle();
    }
}

function checkCollisions(character) {
    return checkTileCollisions(character);
}

function checkTileCollisions(character) {
    const standingTile = gameMap.getCurrentTile(character.nextX, character.nextY);

    if (standingTile instanceof GroundTile) {
        return false;
    }

    if (standingTile instanceof WaterTile) {
        character.captured('Attention, tu ne peux pas nager!');
    }

    return true;
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
