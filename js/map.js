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
                this.#mapCache[xCacheIndex][yCacheIndex] = this.#getTile(
                    createVector(i * this.#gridSize, j * this.#gridSize)
                );
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

    //Get the altitude of the bloc
    #getAltitude(coordinateVector) {
        let elevationNoise = noise(coordinateVector.x * this.#perlinZoom, coordinateVector.y * this.#perlinZoom);

        if (elevationNoise < this.#seaLevel) {
            return -1;
        }

        if (elevationNoise > this.#mountainLevel) {
            return 1;
        }

        return 0;
    }

    // Creates a tile instance
    #getTile(coordinateVector) {
        const altitude = this.#getAltitude(coordinateVector);
        switch (altitude) {
            case 1:
                return new MountainTile(coordinateVector.x, coordinateVector.y, this.#gridSize);
            case -1:
                return new WaterTile(coordinateVector.x, coordinateVector.y, this.#gridSize);
            default:
                return new GroundTile(coordinateVector.x, coordinateVector.y, this.#gridSize);
        }
    }

    //Displays the map around the point
    render(coordinateVector) {
        const startingPoint = createVector(
            coordinateVector.x - this.#canvasWidth / 2,
            coordinateVector.y - this.#canvasHeight / 2
        );
        const gridStartingPoint = createVector(
            this.#normilizeCoordinate(startingPoint.x) / this.#gridSize,
            this.#normilizeCoordinate(startingPoint.y) / this.#gridSize
        );

        for (let i = gridStartingPoint.x; i < gridStartingPoint.x + this.#gridWidth; i++) {
            for (let j = gridStartingPoint.y; j < gridStartingPoint.y + this.#gridHeight; j++) {
                const xCacheIndex = '' + i;
                const yCacheIndex = '' + j;

                if (!this.#mapCache[xCacheIndex]) {
                    this.#mapCache[xCacheIndex] = {};
                }

                if (!this.#mapCache[xCacheIndex][yCacheIndex]) {
                    this.#mapCache[xCacheIndex][yCacheIndex] = this.#getTile(
                        createVector(i * this.#gridSize, j * this.#gridSize)
                    );
                }

                this.#mapCache[xCacheIndex][yCacheIndex].render();
            }
        }
    }

    get gridSize() {
        return this.#gridSize;
    }
}
