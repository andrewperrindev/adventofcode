const { add, downFrom, isValidCoordinate, leftFrom, rightFrom, upFrom } = require('../utils/coordinates');

const Region = require('./region');

class Matrix {
    constructor(matrix) {
        this.freeSpaceChars = ['.'];
        this.fixedSpaceChars = ['#'];
        this.movableSpaceChars = [];

        this.charList = new Set();
        this.regions = [];
        this.matrix = matrix.map((row) => {
            return row.map((loc) => {
                this.charList.add(loc);
                return loc;
            });
        });
    }

    static get UP() {
        return '^';
    }

    static get DOWN() {
        return 'v';
    }

    static get LEFT() {
        return '<';
    }

    static get RIGHT() {
        return '>';
    }

    get width() {
        return this.matrix[0].length;
    }

    get height() {
        return this.matrix.length;
    }

    getCharactersInMatrix() {
        return this.charList;
    }

    isValidCoordinate(coords) {
        return isValidCoordinate(coords, [this.width, this.height]);
    }

    isFreeSpace(coords) {
        return this.freeSpaceChars.includes(this.at(coords));
    }

    isFixedSpace(coords) {
        return this.fixedSpaceChars.includes(this.at(coords));
    }

    isMovableSpace(coords) {
        return this.movableSpaceChars.length === 0 || this.movableSpaceChars.includes(this.at(coords));
    }

    plot() {
        this.matrix.forEach((line) => {
            console.log(line.join(''));
        });
    }

    at(coords) {
        if (this.isValidCoordinate(coords)) {
            const [x, y] = coords;
            return this.matrix[y][x];
        }

        return undefined;
    }

    set(coords, value) {
        if (this.isValidCoordinate(coords)) {
            const [x, y] = coords;
            this.matrix[y][x] = value;
        }
    }

    swap(coordsA, coordsB) {
        const valueA = this.at(coordsA);
        const valueB = this.at(coordsB);

        if (![valueA, valueB].includes(undefined)) {
            this.set(coordsA, valueB);
            this.set(coordsB, valueA);
        }
    }

    distanceBetween(coordsFrom, coordsTo) {
        const [fromX, fromY] = coordsFrom;
        const [toX, toY] = coordsTo;

        return [toX - fromX, toY - fromY];
    }

    coordinateAdd(coords, distance) {
        const newCoords = add(coords, distance);
        return this.isValidCoordinate(newCoords) ? newCoords : undefined;
    }

    upFrom(coords) {
        const newCoords = upFrom(coords);
        return this.isValidCoordinate(newCoords) ? newCoords : undefined;
    }

    downFrom(coords) {
        const newCoords = downFrom(coords);
        return this.isValidCoordinate(newCoords) ? newCoords : undefined;
    }

    leftFrom(coords) {
        const newCoords = leftFrom(coords);
        return this.isValidCoordinate(newCoords) ? newCoords : undefined;
    }

    rightFrom(coords) {
        const newCoords = rightFrom(coords);
        return this.isValidCoordinate(newCoords) ? newCoords : undefined;
    }

    directionFrom(coords, direction) {
        switch (direction) {
            case Matrix.UP:
                return this.upFrom(coords);
            case Matrix.DOWN:
                return this.downFrom(coords);
            case Matrix.LEFT:
                return this.leftFrom(coords);
            case Matrix.RIGHT:
                return this.rightFrom(coords);
            default:
                return undefined;
        }
    }

    find(value) {
        return this.findAnyOf([value]);
    }

    findAll(value) {
        return this.findAllOf([value]);
    }

    findAnyOf(values) {
        for (let y = 0; y < this.matrix.length; y++) {
            for (let x = 0; x < this.matrix[y].length; x++) {
                if (values.includes(this.matrix[y][x])) {
                    return [x, y];
                }
            }
        }

        return undefined;
    }

    findAllOf(values) {
        const locations = [];

        for (let y = 0; y < this.matrix.length; y++) {
            for (let x = 0; x < this.matrix[y].length; x++) {
                if (values.includes(this.matrix[y][x])) {
                    locations.push([x, y]);
                }
            }
        }

        return locations;
    }

    getLocation() {
        return this.location;
    }

    setLocation(coords) {
        if (this.isValidCoordinate(coords)) {
            this.location = coords;
        }
    }

    clearLocation() {
        this.location = undefined;
    }

    moveLocationUp() {
        if (this.location) {
            const newLocation = this.upFrom(this.location);

            if (newLocation) {
                this.location = newLocation;
                return true;
            }
        }

        return false;
    }

    moveLocationDown() {
        if (this.location) {
            const newLocation = this.downFrom(this.location);

            if (newLocation) {
                this.location = newLocation;
                return true;
            }
        }

        return false;
    }

    moveLocationLeft() {
        if (this.location) {
            const newLocation = this.leftFrom(this.location);

            if (newLocation) {
                this.location = newLocation;
                return true;
            }
        }

        return false;
    }

    moveLocationRight() {
        if (this.location) {
            const newLocation = this.rightFrom(this.location);

            if (newLocation) {
                this.location = newLocation;
                return true;
            }
        }

        return false;
    }

    moveLocation(direction) {
        switch (direction) {
            case Matrix.UP:
                return this.moveLocationUp();
            case Matrix.DOWN:
                return this.moveLocationDown();
            case Matrix.LEFT:
                return this.moveLocationLeft();
            case Matrix.RIGHT:
                return this.moveLocationRight();
            default:
                return undefined;
        }
    }

    pushLocation(direction) {
        const canPush = this.checkPush(this.getLocation(), direction);

        if (canPush) {
            this.doPush(this.getLocation(), direction);
            this.moveLocation(direction);
        }
    }

    pushLocationCols(direction, colMinRowsToMove, colMaxRowsToMove) {
        const coordsToPush = Object.keys(colMinRowsToMove).map((col) => {
            let newY = colMinRowsToMove[col];
            const xNum = parseInt(col, 10);

            while (this.at([xNum, newY]) === '.') {
                [, newY] = this.directionFrom([xNum, newY], direction);
            }
            return [xNum, newY];
        });
        const canPushCols = coordsToPush.map((coord) =>
            this.checkPush(coord, direction, colMaxRowsToMove[coord[0]]),
        );

        if (canPushCols.every((canPush) => canPush)) {
            coordsToPush.forEach((coord) => {
                this.doPush(coord, direction, colMaxRowsToMove[coord[0]]);
            });
            this.moveLocation(direction);
        }
    }

    atTarget(currentY, maxY, direction) {
        if (direction === Matrix.UP) {
            return currentY <= maxY;
        } else {
            return currentY >= maxY;
        }
    }

    checkPush(coords, direction, maxY = null) {
        if (coords) {
            maxY ??= coords[1];
            if (this.isFreeSpace(coords) && this.atTarget(coords[1], maxY, direction)) {
                return true;
            } else if (!this.isFixedSpace(coords) && this.isMovableSpace(coords)) {
                return this.checkPush(this.directionFrom(coords, direction), direction, maxY);
            }
        }

        return false;
    }

    doPush(coords, direction, maxY = null) {
        if (coords && !this.isFixedSpace(coords)) {
            maxY ??= coords[1];
            if (this.isFreeSpace(coords) && this.atTarget(coords[1], maxY, direction)) {
                return coords;
            } else if (this.isMovableSpace(coords)) {
                const pushCoords = this.doPush(this.directionFrom(coords, direction), direction, maxY);

                if (pushCoords) {
                    this.swap(coords, pushCoords);
                    return this.isFreeSpace(coords) ? coords : undefined;
                }
            }
        }

        return undefined;
    }

    atLocation() {
        if (this.location && this.isValidCoordinate(this.location)) {
            return this.at(this.location);
        }

        return undefined;
    }

    setLocationValue(value = '@') {
        if (this.location) {
            this.set(this.location, value);
        }
    }

    findRegion(char, coord) {
        const result = new Region();

        const coordsToCheck = [coord];
        while (coordsToCheck.length > 0) {
            const newCoord = coordsToCheck.pop();

            if (newCoord && !result.has(newCoord) && this.at(newCoord) === char) {
                result.add(newCoord);

                const nextCoords = [
                    this.upFrom(newCoord),
                    this.downFrom(newCoord),
                    this.leftFrom(newCoord),
                    this.rightFrom(newCoord),
                ].filter((coord) => !!coord);

                coordsToCheck.push(...nextCoords);
            }
        }

        return result;
    }

    inAnyRegion(coord) {
        return this.regions.some((region) => region.has(coord));
    }

    getRegions() {
        return this.regions;
    }

    findRegions() {
        this.regions = [];

        this.charList.forEach((char) => {
            const allCoords = this.findAll(char);
            for (let coord of allCoords) {
                if (!this.inAnyRegion(coord)) {
                    this.regions.push(this.findRegion(char, coord));
                }
            }
        });

        return this.regions;
    }

    getRegionFor(coords) {
        for (let region of this.regions) {
            if (region.has(coords)) {
                return region;
            }
        }

        return undefined;
    }
}

module.exports = Matrix;
