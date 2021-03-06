class Apple extends Entity {
    constructor(x, y, d, minNutritiveValue, maxNutritiveValue, sprite) {
        super(x, y, d, d, sprite);
        this.nutritiveValue = this.generateNutritiveValue(minNutritiveValue, maxNutritiveValue);
        this.size.outRadius = d / 2;
    }

    render() {
        /* noStroke();
        fill(0, 100, 93);
        circle(this.position.x, this.position.y, this.size.width); */
        this.sprite.displayImage(this.position.x, this.position.y, this.size.height);
    }

    generateNutritiveValue(min, max) {
        return randomNormal(min, max);
    }
}
