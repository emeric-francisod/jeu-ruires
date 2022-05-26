function updateGameGUI() {
    guis.inGameGui.components.health.updateValue(snake.energy);
}

function updateFailMessageGUI() {
    guis.failMessage.components.message.setMessage(snake.stateMessage);
}
