class Map {
    #gridSize;
    #mapCache = {};
    #perlinZoom;
    #seaLevel;
    #mountainLevel;
    #canvasWidth;
    #canvasHeight;
    #gridWidth;
    #gridHeight;

    constructor(canvasWidth, canvasHeight, gridSize = 10, perlinZoom = 0.001, seaLevel = 0.5, mountainLevel = 0.7) {
        this.#gridSize = gridSize;
        this.#perlinZoom = perlinZoom;
        this.#seaLevel = seaLevel;
        this.#mountainLevel = mountainLevel;
        this.#canvasWidth = canvasWidth;
        this.#canvasHeight = canvasHeight;
        this.#gridWidth = Math.ceil(this.#canvasWidth / this.#gridSize);
        this.#gridHeight = Math.ceil(this.#canvasHeight / this.#gridSize);

        for (let i = 0 - this.#gridWidth; i < this.#gridWidth * 2 + 1; i++) {
            let xCacheIndex = '' + i;
            this.#mapCache[xCacheIndex] = {};

            for (let j = 0 - this.#gridHeight; j < this.#gridHeight * 2 + 1; j++) {
                let yCacheIndex = '' + j;
                this.#mapCache[xCacheIndex][yCacheIndex] = this.#getTile(i, j);
            }
        }
    }

    //Align the coordinates on the grid
    #normilizeCoordinate(coordinate) {
        let offset = coordinate % this.#gridSize;
        if (offset < 0) {
            offset = this.#gridSize + offset;
        }
        return coordinate - offset;
    }

    //Convert map coordinates to canvas coordinates
    #convertToConvasCoordinate(mapCoordinate) {
        return mapCoordinate * this.#gridSize;
    }

    //Get the altitude of the bloc
    #getAltitude(mapX, mapY) {
        let elevationNoise = noise(mapX * this.#gridSize * this.#perlinZoom, mapY * this.#gridSize * this.#perlinZoom);
        if (elevationNoise < this.#seaLevel) {
            return -1;
        }

        if (elevationNoise > this.#mountainLevel) {
            return 1;
        }

        return 0;
    }

    // Creates a tile instance
    #getTile(mapX, mapY) {
        return new Tile(
            this.#convertToConvasCoordinate(mapX),
            this.#convertToConvasCoordinate(mapY),
            this.#getAltitude(mapX, mapY),
            this.#gridSize
        );
    }

    //Displays the map
    render(x, y) {
        const xNorm = this.#normilizeCoordinate(x);
        const yNorm = this.#normilizeCoordinate(y);
        const xGridStart = xNorm / this.#gridSize;
        const yGridStart = yNorm / this.#gridSize;

        push();
        translate(-x, -y);

        for (let i = xGridStart; i < xGridStart + this.#gridWidth + 1; i++) {
            for (let j = yGridStart; j < yGridStart + this.#gridHeight + 1; j++) {
                let xCacheIndex = '' + i;
                let yCacheIndex = '' + j;

                if (!this.#mapCache[xCacheIndex]) {
                    this.#mapCache[xCacheIndex] = {};
                }

                if (!this.#mapCache[xCacheIndex][yCacheIndex]) {
                    this.#mapCache[xCacheIndex][yCacheIndex] = this.#getTile(i, j);
                }

                this.#mapCache[xCacheIndex][yCacheIndex].render();
            }
        }

        pop();
    }

    get gridSize() {
        return this.#gridSize;
    }
}
