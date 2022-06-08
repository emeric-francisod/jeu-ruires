function createFox() {
    if (foxes.length >= foxSettings.spawnCap) {
        return;
    }

    let spawnPoint = gameMap.findSpawnPoint(
        snake.x,
        snake.y,
        foxSettings.minSpawnRadius,
        foxSettings.maxSpawnRadius,
        true
    );
    console.log('Spawn fox at ', spawnPoint.x, spawnPoint.y);
    foxes.push(new Fox(spawnPoint.x, spawnPoint.y, foxSettings));
}

function foxUpdate() {
    foxes.forEach((fox) => {
        foxRotationControl(fox);
        foxMoveControl(fox);
    });
}

function foxMoveControl(fox) {
    fox.calculateVelocity();
    for (let t = 0; t <= 1; t += SETTINGS.movementCalculationPrecision) {
        fox.moveForward(SETTINGS.movementCalculationPrecision);
        let collisions = checkTileCollisions(fox);
        let collisionsEffects = fox.manageCollisions(collisions);
        if (collisionsEffects) {
            fox.confirmPosition(false);
            break;
        }
        fox.confirmPosition();
        fox.stepToDo--;
    }
}

function foxRotationControl(fox) {
    let foxSnakeDistanceSquared =
        (snake.position.x - fox.position.x) * (snake.position.x - fox.position.x) +
        (snake.position.y - fox.position.y) * (snake.position.y - fox.position.y);
    let tileDistanceSquared = foxSnakeDistanceSquared / (SETTINGS.gridSize * SETTINGS.gridSize);

    if (tileDistanceSquared <= foxSettings.flightRadius * foxSettings.flightRadius) {
        fox.rotate(snake.orientation);
    } else if (fox.stepToDo <= 0) {
        fox.rotate(random(0, TWO_PI));
        fox.stepToDo = round(random(0, SETTINGS.tickSpeed * 10));
    }

    fox.confirmAngle();
}

function despawnFoxes() {
    for (let foxId in foxes) {
        let fox = foxes[foxId];
        let snakeFoxDistanceSquared =
            (snake.position.x - fox.position.x) * (snake.position.x - fox.position.x) +
            (snake.position.y - fox.position.y) * (snake.position.y - fox.position.y);
        let tileDistanceSquared = snakeFoxDistanceSquared / (SETTINGS.gridSize * SETTINGS.gridSize);

        if (tileDistanceSquared >= foxSettings.despawnRadius * foxSettings.despawnRadius) {
            foxes.splice(foxId, 1);
            console.log('Supprimer renard n°', foxId);
        }
    }
}

function despawnFox(fox) {
    for (let foxId in foxes) {
        if (
            fox.x === foxes[foxId].x &&
            fox.y === foxes[foxId].y &&
            fox.scorePercentage === foxes[foxId].scorePercentage
        ) {
            foxes.splice(foxId, 1);
            console.log('Supprimer renard n°', foxId, 'manuellement');
        }
    }
}

function checkFoxCollisions(character) {
    let foxCollisions = [];
    foxes.forEach((fox) => {
        if (
            circleCollision(
                {
                    c1x: character.x,
                    c1y: character.y,
                    r1: character.size.outRadius,
                },
                {
                    c2x: fox.x,
                    c2y: fox.y,
                    r2: fox.size.outRadius,
                }
            )
        ) {
            foxCollisions.push(fox);
        }
    });
    return foxCollisions;
}
