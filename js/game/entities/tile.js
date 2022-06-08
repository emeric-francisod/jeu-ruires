class Tile extends Entity {
    constructor(x, y, size, value) {
        super(x, y, size, size);
        this.value = value;
        this.colorParameters = {
            hue: [0, 360, 0],
            saturation: [0, 100, 0],
            value: [0, 100, 0],
        };
    }

    setColor() {
        let hue = map(this.value, 0, 1, this.colorParameters.hue[0], this.colorParameters.hue[1]);
        hue += random(-hue * this.colorParameters.hue[2], hue * this.colorParameters.hue[2]);
        let saturation = map(this.value, 0, 1, this.colorParameters.saturation[0], this.colorParameters.saturation[1]);
        saturation += random(-hue * this.colorParameters.saturation[2], hue * this.colorParameters.saturation[2]);
        let value = map(this.value, 0, 1, this.colorParameters.value[0], this.colorParameters.value[1]);
        value += random(-hue * this.colorParameters.value[2], hue * this.colorParameters.value[2]);
        this.color = color(hue, saturation, value);
    }

    render() {
        fill(this.color);
        noStroke();
        rect(this.position.x, this.position.y, this.size.width);
    }
}

class WaterTile extends Tile {
    constructor(x, y, size, value) {
        super(x, y, size, value);
        this.colorParameters = {
            hue: [255, 210, 0],
            saturation: [91, 70, 0],
            value: [20, 97, 0],
        };
        this.setColor();
    }
}

class GroundTile extends Tile {
    constructor(x, y, size, value) {
        super(x, y, size, value);
        this.colorParameters = {
            hue: [55, 85, 0.07],
            saturation: [36, 70, 0.03],
            value: [95, 75, 0.01],
        };
        this.setColor();
    }
}

class MountainTile extends Tile {
    constructor(x, y, size, value) {
        super(x, y, size, value);
        this.colorParameters = {
            hue: [46, 75, 0.02],
            saturation: [29, 1, 0.1],
            value: [36, 94, 0.1],
        };
        this.setColor();
    }
}
