function updateGameGUI() {
    guis.inGameGui.components.health.updateValue(snake.energy);
    guis.inGameGui.components.score.setMessage(`Score: ${round(snake.score)}`);
}

function updateFailMessageGUI() {
    guis.failMessage.components.message.setMessage(snake.stateMessage);
    guis.failMessage.components.endScore.setMessage(`Score: ${round(snake.score)}`);
}
