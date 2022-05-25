class Entity {
    constructor(x, y, w, h) {
        this.position = createVector(x, y);
        this.size = {
            width: w,
            height: h,
        };
    }

    get x() {
        return this.position.x;
    }

    get y() {
        return this.position.y;
    }
}
