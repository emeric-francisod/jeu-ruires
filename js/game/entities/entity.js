class Entity {
    constructor(x, y, w, h) {
        this.position = createVector(x, y);
        this.size = {
            width: w,
            height: h,
            outRadius: sqrt(sq(w / 2) + sq(h / 2)),
        };
    }

    get x() {
        return this.position.x;
    }

    get y() {
        return this.position.y;
    }
}
