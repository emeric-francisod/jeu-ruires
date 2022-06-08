class Fox extends Character {
    constructor(x, y, settings) {
        super(x, y, settings);
        this.scorePercentage = this.generateScorePercentage(settings.minScorePercentage, settings.maxScorePercentage);
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
}
