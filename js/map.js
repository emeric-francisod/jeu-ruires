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
    #perlinOriginShift;

    constructor(
        canvasWidth,
        canvasHeight,
        gridSize = 10,
        perlinZoom = 0.001,
        seaLevel = 0.4,
        mountainLevel = 0.6,
        perlinOriginShift = 1000000
    ) {
        this.#gridSize = gridSize;
        this.#perlinZoom = perlinZoom;
        this.#seaLevel = seaLevel;
        this.#mountainLevel = mountainLevel;
        this.#canvasWidth = canvasWidth;
        this.#canvasHeight = canvasHeight;
        this.#gridWidth = Math.ceil(this.#canvasWidth / this.#gridSize);
        this.#gridHeight = Math.ceil(this.#canvasHeight / this.#gridSize);
        this.#perlinOriginShift = perlinOriginShift;

        for (let i = 0 - this.#gridWidth; i < this.#gridWidth * 2 + 1; i++) {
            let xCacheIndex = '' + i;
            this.#mapCache[xCacheIndex] = {};

            for (let j = 0 - this.#gridHeight; j < this.#gridHeight * 2 + 1; j++) {
                let yCacheIndex = '' + j;
                this.#mapCache[xCacheIndex][yCacheIndex] = this.#createTile(
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

    //Find tile map coordinates
    #findTileCoordinates(coordinate) {
        return createVector(
            this.#normilizeCoordinate(coordinate.x) / this.#gridSize,
            this.#normilizeCoordinate(coordinate.y) / this.#gridSize
        );
    }

    //Get the altitude of the bloc
    #getAltitude(coordinateVector) {
        return noise(
            (coordinateVector.x + this.#perlinOriginShift) * this.#perlinZoom,
            (coordinateVector.y + this.#perlinOriginShift) * this.#perlinZoom
        );
    }

    // Creates a tile instance
    #createTile(coordinateVector) {
        const altitude = this.#getAltitude(coordinateVector);

        if (altitude < this.#seaLevel) {
            return new WaterTile(
                coordinateVector.x,
                coordinateVector.y,
                this.#gridSize,
                map(altitude, 0, this.#seaLevel, 0, 1)
            );
        }

        if (altitude > this.#mountainLevel) {
            return new MountainTile(
                coordinateVector.x,
                coordinateVector.y,
                this.#gridSize,
                map(altitude, this.#mountainLevel, 1, 0, 1)
            );
        }

        return new GroundTile(
            coordinateVector.x,
            coordinateVector.y,
            this.#gridSize,
            map(altitude, this.#seaLevel, this.#mountainLevel, 0, 1)
        );
    }

    #getTile(i, j) {
        const xCacheIndex = '' + i;
        const yCacheIndex = '' + j;

        if (!this.#mapCache[xCacheIndex]) {
            this.#mapCache[xCacheIndex] = {};
        }

        if (!this.#mapCache[xCacheIndex][yCacheIndex]) {
            this.#mapCache[xCacheIndex][yCacheIndex] = this.#createTile(
                createVector(i * this.#gridSize, j * this.#gridSize)
            );
        }

        return this.#mapCache[xCacheIndex][yCacheIndex];
    }

    //Displays the map around the point
    render(x, y) {
        const startingPoint = createVector(x - this.#canvasWidth / 2, y - this.#canvasHeight / 2);
        const gridStartingPoint = this.#findTileCoordinates(startingPoint);

        for (let i = gridStartingPoint.x; i < gridStartingPoint.x + this.#gridWidth + 2; i++) {
            for (let j = gridStartingPoint.y; j < gridStartingPoint.y + this.#gridHeight + 2; j++) {
                this.#getTile(i, j).render();
            }
        }
    }

    findSpawnPoint(x = 0, y = 0) {
        let currentTileCoordinates = this.#findTileCoordinates(createVector(x, y));
        let currentTile = this.#getTile(currentTileCoordinates.x, currentTileCoordinates.y);
        let searchDepth = 0;

        while (!(currentTile instanceof GroundTile)) {
            if (currentTileCoordinates.y === searchDepth) {
                if (currentTileCoordinates.x === searchDepth) {
                    searchDepth++;
                }
                currentTileCoordinates.x++;
            } else if (currentTileCoordinates.x === -searchDepth) {
                currentTileCoordinates.y++;
            } else if (currentTileCoordinates.y === -searchDepth) {
                currentTileCoordinates.x--;
            } else if (currentTileCoordinates.x === searchDepth) {
                currentTileCoordinates.y--;
            }

            currentTile = this.#getTile(currentTileCoordinates.x, currentTileCoordinates.y);
        }

        return createVector(
            currentTile.coordinates.x + this.#gridSize / 2,
            currentTile.coordinates.y + this.#gridSize / 2
        );
    }

    get gridSize() {
        return this.#gridSize;
    }
}
