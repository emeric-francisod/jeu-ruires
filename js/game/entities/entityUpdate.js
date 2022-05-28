function updateCharacters() {
    moveCharacters();
    snake.looseEnergy();

    let randomSpawnDecider = random();
    if (randomSpawnDecider <= 1 / (SETTINGS.tickSpeed * appleSettings.spawnRate)) {
        createApple();
    }
}

function moveCharacters() {
    characterRotationControl();

    for (let t = 0; t <= 1; t += SETTINGS.calculationPrecision) {
        if (actionnedKeys.space) {
            snake.moveForward(SETTINGS.calculationPrecision);
            if (checkCollisions(snake)) {
                break;
            }
            snake.confirmPosition();
        }
    }
}

function characterRotationControl() {
    centerMouseX = mouseX - SETTINGS.width / 2;
    centerMouseY = SETTINGS.height / 2 - mouseY;

    let angle = Math.atan(centerMouseY / centerMouseX);
    if (centerMouseX < 0) {
        angle += Math.PI;
    } else if (centerMouseY < 0) {
        angle += Math.PI * 2;
    }

    snake.rotate(angle);
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
