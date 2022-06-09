function updateSnake() {
    snakeRotationControl();
    snakeMoveControl();
}

function snakeMoveControl() {
    snake.calculateVelocity();
    if (actionnedKeys.space) {
        for (let t = 0; t <= 1; t += SETTINGS.movementCalculationPrecision) {
            snake.moveForward(SETTINGS.movementCalculationPrecision);
            let collisionsEffects = snakeCollisions();
            if (collisionsEffects) {
                snake.confirmPosition(false);
                break;
            }
            snake.confirmPosition();
        }
    } else {
        snakeCollisions();
    }
}

function snakeCollisions() {
    let collisions = checkCollisions(snake);
    let collisionsEffects = snake.manageCollisions(collisions);
    return collisionsEffects;
}

function snakeRotationControl() {
    centerMouseX = mouseX - SETTINGS.width / 2;
    centerMouseY = SETTINGS.height / 2 - mouseY;

    let angle = Math.atan(centerMouseY / centerMouseX);
    if (centerMouseX < 0) {
        angle += Math.PI;
    } else if (centerMouseY < 0) {
        angle += Math.PI * 2;
    }

    let currentAngle = snake.orientation;

    while (currentAngle !== angle) {
        if (abs(snake.orientation - angle) < SETTINGS.rotationCalculationPrecision) {
            currentAngle = angle;
        } else if (snake.orientation < angle) {
            currentAngle += SETTINGS.rotationCalculationPrecision;
        } else {
            currentAngle -= SETTINGS.rotationCalculationPrecision;
        }

        snake.rotate(currentAngle);
        let collisionsEffects = snakeCollisions();
        if (collisionsEffects) {
            snake.confirmAngle(false);
            continue;
        }
        snake.confirmAngle();
    }
}
