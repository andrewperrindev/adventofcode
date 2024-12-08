class Matrix {
    constructor(matrix) {
        this.charList = new Set();
        this.matrix = matrix.map((row) => {
            return row.map((loc) => {
                this.charList.add(loc);
                return loc;
            });
        });
    }

    getCharactersInMatrix() {
        return this.charList;
    }

    isValidCoordinate(coords) {
        const [x, y] = coords;
        return y >= 0 && y < this.matrix.length && x >= 0 && x < this.matrix[y].length;
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

    distanceBetween(coordsFrom, coordsTo) {
        const [fromX, fromY] = coordsFrom;
        const [toX, toY] = coordsTo;

        return [toX - fromX, toY - fromY];
    }

    coordinateAdd(coords, distance) {
        const [x, y] = coords;
        const [distanceX, distanceY] = distance;

        const newCoords = [x + distanceX, y + distanceY];
        return this.isValidCoordinate(newCoords) ? newCoords : undefined;
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
            const [x, y] = this.location;

            if (this.isValidCoordinate([x, y - 1])) {
                this.location = [x, y - 1];
                return true;
            }
        }

        return false;
    }

    moveLocationDown() {
        if (this.location) {
            const [x, y] = this.location;

            if (this.isValidCoordinate([x, y + 1])) {
                this.location = [x, y + 1];
                return true;
            }
        }

        return false;
    }

    moveLocationLeft() {
        if (this.location) {
            const [x, y] = this.location;

            if (this.isValidCoordinate([x - 1, y])) {
                this.location = [x - 1, y];
                return true;
            }
        }

        return false;
    }

    moveLocationRight() {
        if (this.location) {
            const [x, y] = this.location;

            if (this.isValidCoordinate([x + 1, y])) {
                this.location = [x + 1, y];
                return true;
            }
        }

        return false;
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
}

module.exports = Matrix;
