class Entity {
    constructor(x, y, w, h, sprite = null) {
        this.position = createVector(x, y);
        this.size = {
            width: w,
            height: h,
            outRadius: sqrt(sq(w / 2) + sq(h / 2)),
        };
        this.sprite = null;
        if (sprite !== null) {
            this.setSprite(sprite);
        }
    }

    setSprite(sprite) {
        if (this.sprite !== null) {
            this.sprite.clearAnimation();
        }
        this.sprite = sprite.clone();
        this.sprite.startAnimation();
    }

    get x() {
        return this.position.x;
    }

    get y() {
        return this.position.y;
    }
}
