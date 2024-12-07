class Matrix {
    constructor(matrix) {
        this.matrix = matrix.map((row) => [...row]);
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

    find(value) {
        return this.findAnyOf([value]);
    }

    findAll(value) {
        return this.findAllOf([value]);
    }

    findAnyOf(values) {
        for(let y = 0; y < this.matrix.length; y++) {
            for(let x = 0; x < this.matrix[y].length; x++) {
                if (values.includes(this.matrix[y][x])) {
                    return [x, y];
                }
            }
        }

        return undefined;
    }

    findAllOf(values) {
        const locations = [];

        for(let y = 0; y < this.matrix.length; y++) {
            for(let x = 0; x < this.matrix[y].length; x++) {
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
