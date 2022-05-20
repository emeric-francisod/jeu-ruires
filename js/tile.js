class Tile {
    #x;
    #y;
    #value;
    #size;

    constructor(x, y, value, size) {
        this.#x = x;
        this.#y = y;
        this.#value = value;
        this.#size = size;
    }

    render() {
        if (this.#value === 1) {
            fill(142, 132, 115);
        } else if (this.#value === -1) {
            fill(5, 0, 158);
        } else {
            fill(6, 183, 3);
        }
        noStroke();

        rect(this.#x, this.#y, this.#size);
    }

    getCornersCoordinates() {
        return [
            {
                x: this.#x,
                y: this.#y,
            },
            {
                x: this.#x + this.#size,
                y: this.#y,
            },
            {
                x: this.#x + this.#size,
                y: this.#y + this.#size,
            },
            {
                x: this.#x,
                y: this.#y + this.#size,
            },
        ];
    }

    get orientation() {
        return 0;
    }
}
