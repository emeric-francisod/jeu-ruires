class Tile {
    constructor(x, y, size, value) {
        this.coordinates = createVector(x, y);
        this.size = size;
        this.value = value;
    }

    setColor() {
        throw 'Cette méthode doit être implémentée.';
    }

    render() {
        this.setColor();
        noStroke();
        rect(this.coordinates.x, this.coordinates.y, this.size);
    }
}

class WaterTile extends Tile {
    constructor(x, y, size, value) {
        super(x, y, size, value);
    }

    setColor() {
        fill(242, 100, 50 * this.value);
    }
}

class GroundTile extends Tile {
    constructor(x, y, size, value) {
        super(x, y, size, value);
    }

    setColor() {
        fill(119, 96.8, 36.5);
    }
}

class MountainTile extends Tile {
    constructor(x, y, size, value) {
        super(x, y, size, value);
    }

    setColor() {
        fill(38, 10.7, 50.4);
    }
}
