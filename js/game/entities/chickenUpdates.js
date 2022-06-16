function createChicken() {
    if (chickens.length >= chickenSettings.spawnCap) {
        return;
    }

    let spawnPoint = gameMap.findSpawnPoint(
        snake.x,
        snake.y,
        chickenSettings.minSpawnRadius,
        chickenSettings.maxSpawnRadius,
        true
    );
    console.log('Spawn chicken at ', spawnPoint.x, spawnPoint.y);
    chickens.push(new Chicken(spawnPoint.x, spawnPoint.y, chickenSettings, sprites.chickenMove));
}

function chickenUpdate() {
    chickens.forEach((chicken) => {
        chickenRotationControl(chicken);
        chickenMoveControl(chicken);
    });
}

function chickenMoveControl(chicken) {
    chicken.calculateVelocity();
    for (let t = 0; t <= 1; t += SETTINGS.movementCalculationPrecision) {
        chicken.moveForward(SETTINGS.movementCalculationPrecision);
        let collisions = checkTileCollisions(chicken);
        let collisionsEffects = chicken.manageCollisions(collisions);
        if (collisionsEffects) {
            chicken.confirmPosition(false);
            break;
        }
        chicken.confirmPosition();
    }
    chicken.stepToDo--;
}

function chickenRotationControl(chicken) {
    let chickenSnakeDistanceSquared =
        (snake.position.x - chicken.position.x) * (snake.position.x - chicken.position.x) +
        (snake.position.y - chicken.position.y) * (snake.position.y - chicken.position.y);
    let tileDistanceSquared = chickenSnakeDistanceSquared / (SETTINGS.gridSize * SETTINGS.gridSize);

    if (tileDistanceSquared <= chickenSettings.attackRadius * chickenSettings.attackRadius) {
        let snakeVector = snake.position;
        let chickenVector = chicken.position;
        let snakeChickenVector = p5.Vector.sub(chickenVector, snakeVector);
        chicken.rotate(-snakeChickenVector.heading() + PI);
    } else if (chicken.stepToDo <= 0) {
        chicken.rotate(random(0, TWO_PI));
        chicken.stepToDo = round(random(0, SETTINGS.tickSpeed * 3));
    }

    chicken.confirmAngle();
}

function despawnChickens() {
    for (let chickenId in chickens) {
        let chicken = chickens[chickenId];
        let snakeChickenDistanceSquared =
            (snake.position.x - chicken.position.x) * (snake.position.x - chicken.position.x) +
            (snake.position.y - chicken.position.y) * (snake.position.y - chicken.position.y);
        let tileDistanceSquared = snakeChickenDistanceSquared / (SETTINGS.gridSize * SETTINGS.gridSize);

        if (tileDistanceSquared >= chickenSettings.despawnRadius * chickenSettings.despawnRadius) {
            chickens.splice(chickenId, 1);
            console.log('Supprimer poule n°', chickenId);
        }
    }
}

function despawnChicken(chicken) {
    for (let chickenId in chickens) {
        if (chicken.x === chickens[chickenId].x && chicken.y === chickens[chickenId].y) {
            chickens.splice(chickenId, 1);
            console.log('Supprimer poule n°', chickenId, 'manuellement');
        }
    }
}

function checkChickenCollisions(character) {
    let chickenCollisions = [];
    chickens.forEach((chicken) => {
        if (
            circleCollision(
                {
                    c1x: character.x,
                    c1y: character.y,
                    r1: character.size.outRadius,
                },
                {
                    c2x: chicken.x,
                    c2y: chicken.y,
                    r2: chicken.size.outRadius,
                }
            )
        ) {
            chickenCollisions.push(chicken);
        }
    });
    return chickenCollisions;
}
