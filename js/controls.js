function moveCharacters() {
    snakeControl();
}

function snakeControl() {
    centerMouseX = mouseX - SETTINGS.width / 2;
    centerMouseY = SETTINGS.height / 2 - mouseY;

    let angle = Math.atan(centerMouseY / centerMouseX);
    if (centerMouseX < 0) {
        angle += Math.PI;
    } else if (centerMouseY < 0) {
        angle += Math.PI * 2;
    }

    snake.rotate(angle);

    if (actionnedKeys.space) {
        snake.moveForward();
    }
}
