class Apple extends Entity {
    constructor(x, y, d) {
        super(x, y, d, d);
        this.nutritiveValue = 1;
    }

    render() {
        noStroke();
        fill(0, 100, 100);
        circle(this.position.x, this.position.y, this.size.width);
    }
}
