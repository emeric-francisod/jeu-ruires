class Tile {
    constructor(x, y, size) {
        this.coordinates = createVector(x, y);
        this.size = size;
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
    constructor(x, y, size) {
        super(x, y, size);
    }

    setColor() {
        fill(5, 0, 158);
    }
}

class GroundTile extends Tile {
    constructor(x, y, size) {
        super(x, y, size);
    }

    setColor() {
        fill(6, 183, 3);
    }
}

class MountainTile extends Tile {
    constructor(x, y, size) {
        super(x, y, size);
    }

    setColor() {
        fill(142, 132, 115);
    }
}
