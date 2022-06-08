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
} /*

function despawnFoxes() {
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

function despawnFox(fox) {
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
} */
