function displayFailMessage() {
    background(290, 95, 5, 0.7);
    fill(295, 10, 95);
    textAlign(CENTER, BOTTOM);
    textSize(100);
    textStyle(BOLD);
    text('Perdu!', snake.x, snake.y);
    textSize(25);
    textStyle(BOLD);
    textAlign(CENTER, TOP);
    rectMode(CENTER);
    text(snake.stateMessage, snake.x, snake.y, SETTINGS.width * 0.9);
}

function centerOnSnake() {
    translate(SETTINGS.width / 2 - snake.x, SETTINGS.height / 2 - snake.y);
    rectMode(CENTER);
}

function resetCoordinates() {
    resetMatrix();
    rectMode(CORNER);
}

function renderGame() {
    centerOnSnake();
    gameMap.render(snake.x, snake.y);
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
