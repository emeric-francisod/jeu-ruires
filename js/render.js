function centerOnSnake() {
    translate(SETTINGS.width / 2 - snake.x, SETTINGS.height / 2 - snake.y);
    rectMode(CENTER);
}

function resetCoordinates() {
    resetMatrix();
    rectMode(CORNER);
}

function renderApples() {
    for (let apple of apples) {
        apple.render();
    }
}

function renderFoxes() {
    for (let fox of foxes) {
        fox.render();
    }
}

function renderChickens() {
    for (let chicken of chickens) {
        chicken.render();
    }
}

function renderGame() {
    centerOnSnake();
    gameMap.render(snake.x, snake.y);
    renderApples();
    renderFoxes();
    renderChickens();
    snake.render();
}

function renderGameUI() {
    resetCoordinates();
    guis.inGameGui.render();
}

function renderFailMessage() {
    resetCoordinates();
    guis.failMessage.render();
}

function renderMusic() {
    if (!musics[currentMusicId].isPlaying()) {
        currentMusicId = currentMusicId >= musics.length - 1 ? 0 : currentMusicId + 1;
        musics[currentMusicId].play();
    }
}

function stopMusic() {
    musics[currentMusicId].stop();
}
