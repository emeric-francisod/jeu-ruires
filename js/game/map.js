class Map {
    constructor(
        canvasWidth,
        canvasHeight,
        { gridSize = 10, perlinZoom = 0.001, seaLevel = 0.4, mountainLevel = 0.6, perlinOriginShift = 1000000 }
    ) {
        this.perlinSettings = {
            zoom: perlinZoom,
            originShift: perlinOriginShift,
        };
        this.levels = {
            sea: seaLevel,
            mountain: mountainLevel,
        };
        this.canvasSize = {
            width: canvasWidth,
            height: canvasHeight,
        };
        this.grid = {
            width: Math.ceil(this.canvasSize.width / gridSize),
            height: Math.ceil(this.canvasSize.height / gridSize),
            size: gridSize,
        };
        this.mapCache = {};

        for (let i = 0 - this.grid.width; i < this.grid.width * 2 + 1; i++) {
            let xCacheIndex = '' + i;
            this.mapCache[xCacheIndex] = {};

            for (let j = 0 - this.grid.height; j < this.grid.height * 2 + 1; j++) {
                let yCacheIndex = '' + j;
                this.mapCache[xCacheIndex][yCacheIndex] = this.createTile(
                    createVector(this.convertFromIndexToCoordinate(i), this.convertFromIndexToCoordinate(j))
                );
            }
        }
    }

    //Convert map index to map coordinate
    convertFromIndexToCoordinate(index) {
        return index * this.grid.size;
    }

    //Get the altitude of the bloc
    getAltitude(coordinateVector) {
        return noise(
            (coordinateVector.x + this.perlinSettings.originShift) * this.perlinSettings.zoom,
            (coordinateVector.y + this.perlinSettings.originShift) * this.perlinSettings.zoom
        );
    }

    // Creates a tile instance
    createTile(coordinateVector) {
        const altitude = this.getAltitude(coordinateVector);

        if (altitude < this.levels.sea) {
            return new WaterTile(
                coordinateVector.x,
                coordinateVector.y,
                this.grid.size,
                map(altitude, 0, this.levels.sea, 0, 1)
            );
        }

        if (altitude > this.levels.mountain) {
            return new MountainTile(
                coordinateVector.x,
                coordinateVector.y,
                this.grid.size,
                map(altitude, this.levels.mountain, 1, 0, 1)
            );
        }

        return new GroundTile(
            coordinateVector.x,
            coordinateVector.y,
            this.grid.size,
            map(altitude, this.levels.sea, this.levels.mountain, 0, 1)
        );
    }

    //Align the coordinates on the grid
    normilizeCoordinate(coordinate) {
        let offset = coordinate % this.grid.size;
        if (offset < 0) {
            offset = this.grid.size + offset;
        }
        if (offset > this.grid.size / 2) {
            return coordinate + this.grid.size - offset;
        }
        return coordinate - offset;
    }

    //Find tile map coordinates
    findTileCoordinates(coordinate) {
        return createVector(
            this.normilizeCoordinate(coordinate.x) / this.grid.size,
            this.normilizeCoordinate(coordinate.y) / this.grid.size
        );
    }

    getTile(i, j) {
        const xCacheIndex = '' + i;
        const yCacheIndex = '' + j;

        if (!this.mapCache[xCacheIndex]) {
            this.mapCache[xCacheIndex] = {};
        }

        if (!this.mapCache[xCacheIndex][yCacheIndex]) {
            this.mapCache[xCacheIndex][yCacheIndex] = this.createTile(
                createVector(i * this.grid.size, j * this.grid.size)
            );
        }

        return this.mapCache[xCacheIndex][yCacheIndex];
    }

    //Displays the map around the point
    render(x, y) {
        const startingPoint = createVector(x - this.canvasSize.width / 2, y - this.canvasSize.height / 2);
        const gridStartingPoint = this.findTileCoordinates(startingPoint);

        for (let i = gridStartingPoint.x; i < gridStartingPoint.x + this.grid.width + 2; i++) {
            for (let j = gridStartingPoint.y; j < gridStartingPoint.y + this.grid.height + 2; j++) {
                this.getTile(i, j).render();
            }
        }
    }

    getCurrentTile(x, y) {
        let currentTileCoordinates = this.findTileCoordinates(createVector(x, y));
        return this.getTile(currentTileCoordinates.x, currentTileCoordinates.y);
    }

    checkSpawnableTile(i, j) {
        let testedTile = this.getTile(i, j);
        if (testedTile instanceof GroundTile) {
            return createVector(testedTile.position.x, testedTile.position.y);
        }
        return false;
    }

    testSymetricTiles(i, j) {
        let coordinates = this.checkSpawnableTile(i, j);
        if (coordinates) {
            return coordinates;
        }
        coordinates = this.checkSpawnableTile(-i, j);
        if (coordinates) {
            return coordinates;
        }
        coordinates = this.checkSpawnableTile(i, -j);
        if (coordinates) {
            return coordinates;
        }
        coordinates = this.checkSpawnableTile(-i, -j);
        if (coordinates) {
            return coordinates;
        }
        coordinates = this.checkSpawnableTile(j, i);
        if (coordinates) {
            return coordinates;
        }
        coordinates = this.checkSpawnableTile(-j, i);
        if (coordinates) {
            return coordinates;
        }
        coordinates = this.checkSpawnableTile(j, -i);
        if (coordinates) {
            return coordinates;
        }
        coordinates = this.checkSpawnableTile(-j, -i);
        if (coordinates) {
            return coordinates;
        }
        return false;
    }

    findSpawnPoint(centerX = 0, centerY = 0, minRadius = 0, maxRadius = 10000, randomPosition = false) {
        let originCoordinates = this.findTileCoordinates(createVector(centerX, centerY));
        let startRadius = randomPosition ? round(random(minRadius, maxRadius)) : minRadius;
        let radius = startRadius;

        do {
            let x = originCoordinates.x;
            let y = radius + originCoordinates.y;
            let d = radius - 1;

            while (y >= x) {
                let coordinates = this.testSymetricTiles(x, y);
                if (coordinates) {
                    return coordinates;
                }

                if (d >= 2 * x) {
                    d -= 2 * x - 1;
                    x++;
                } else if (d < 2 * (radius - y)) {
                    d += 2 * y - 1;
                    y--;
                } else {
                    d += 2 * (y - x - 1);
                    y--;
                    x++;
                }
            }

            radius = radius === maxRadius ? minRadius : radius + 1;
        } while (radius !== startRadius);
    }
}
