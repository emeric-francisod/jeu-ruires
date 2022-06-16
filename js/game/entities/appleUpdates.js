function createApple() {
    if (apples.length >= appleSettings.spawnCap) {
        return;
    }

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
            appleSettings.maxNutritiveValue,
            sprites.apple
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

function despawnApple(apple) {
    for (let appleId in apples) {
        if (
            apple.x === apples[appleId].x &&
            apple.y === apples[appleId].y &&
            apple.nutritiveValue === apples[appleId].nutritiveValue
        ) {
            apples.splice(appleId, 1);
            console.log('Supprimer pomme n°', appleId, 'manuellement');
        }
    }
}

function checkAppleCollisions(character) {
    let appleCollisions = [];
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
            appleCollisions.push(apple);
        }
    });
    return appleCollisions;
}
