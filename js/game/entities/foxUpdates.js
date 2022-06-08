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

function despawnFoxes() {
    for (let foxId in foxes) {
        let fox = foxes[foxId];
        let foxAppleDistanceSquared =
            (snake.position.x - fox.position.x) * (snake.position.x - fox.position.x) +
            (snake.position.y - fox.position.y) * (snake.position.y - fox.position.y);
        let tileDistanceSquared = foxAppleDistanceSquared / (SETTINGS.gridSize * SETTINGS.gridSize);

        if (tileDistanceSquared >= foxSettings.despawnRadius * foxSettings.despawnRadius) {
            foxes.splice(foxId, 1);
            console.log('Supprimer renard n°', foxId);
        }
    }
}
/*
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
