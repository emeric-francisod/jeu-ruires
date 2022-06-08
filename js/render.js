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

function renderGame() {
    centerOnSnake();
    gameMap.render(snake.x, snake.y);
    renderApples();
    renderFoxes();
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
