class Apple extends Entity {
    constructor(x, y, d, minNutritiveValue, maxNutritiveValue) {
        super(x, y, d, d);
        this.nutritiveValue = this.generateNutritiveValue(minNutritiveValue, maxNutritiveValue);
    }

    render() {
        noStroke();
        fill(0, 100, 100);
        circle(this.position.x, this.position.y, this.size.width);
    }

    generateNutritiveValue(min, max) {
        return randomNormal(min, max);
    }
}