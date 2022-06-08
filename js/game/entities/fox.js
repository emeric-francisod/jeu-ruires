class Fox extends Character {
    constructor(x, y, settings) {
        super(x, y, settings);
        this.scorePercentage = this.generateScorePercentage(settings.minScorePercentage, settings.maxScorePercentage);
        this.stepToDo = 0;
    }

    render() {
        push();
        translate(this.x, this.y);
        rotate(-this.orientation);
        noStroke();
        fill(0, 100, 50);
        rect(0, 0, this.size.width, this.size.height);
        pop();
    }

    generateScorePercentage(min, max) {
        return randomNormal(min, max);
    }

    manageCollisions(entities = []) {
        let collisionEffects = false;
        entities.forEach((entity) => {
            if (entity instanceof MountainTile || entity instanceof WaterTile) {
                collisionEffects = true;
                this.stepToDo = 0;
            }
        });
        return collisionEffects;
    }
}
