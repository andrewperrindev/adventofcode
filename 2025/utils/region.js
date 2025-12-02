const {
    stringToCoordinates,
    upFrom,
    downFrom,
    leftFrom,
    rightFrom,
    upLeftFrom,
    upRightFrom,
    downLeftFrom,
    downRightFrom,
} = require('./coordinates');

module.exports = class Region {
    constructor(coords = []) {
        this.regionCoords = new Set(coords.map(String));
    }

    has(coord) {
        return this.regionCoords.has(coord.toString());
    }

    add(coord) {
        this.regionCoords.add(coord.toString());
    }

    perimeter() {
        return Array.from(this.regionCoords).reduce((tally, coord) => {
            const [x, y] = stringToCoordinates(coord);
            const neighbors = [
                [x - 1, y],
                [x + 1, y],
                [x, y - 1],
                [x, y + 1],
            ];
            return tally + (4 - neighbors.filter((neighbor) => this.has(neighbor)).length);
        }, 0);
    }

    area() {
        return this.regionCoords.size;
    }

    sides() {
        // # of vertices == # of sides
        let vertices = 0;

        Array.from(this.regionCoords).forEach((coord) => {
            coord = stringToCoordinates(coord);

            const up = upFrom(coord);
            const down = downFrom(coord);
            const left = leftFrom(coord);
            const right = rightFrom(coord);
            const upLeft = upLeftFrom(coord);
            const upRight = upRightFrom(coord);
            const downLeft = downLeftFrom(coord);
            const downRight = downRightFrom(coord);

            // Check if this is a vertex
            if (!this.has(left) && !this.has(upLeft) && !this.has(up)) {
                vertices++;
            }
            if (!this.has(right) && !this.has(upRight) && !this.has(up)) {
                vertices++;
            }
            if (!this.has(left) && !this.has(downLeft) && !this.has(down)) {
                vertices++;
            }
            if (!this.has(right) && !this.has(downRight) && !this.has(down)) {
                vertices++;
            }

            if (this.has(left) && !this.has(upLeft) && this.has(up)) {
                vertices++;
            }
            if (this.has(right) && !this.has(upRight) && this.has(up)) {
                vertices++;
            }
            if (this.has(left) && !this.has(downLeft) && this.has(down)) {
                vertices++;
            }
            if (this.has(right) && !this.has(downRight) && this.has(down)) {
                vertices++;
            }

            if (!this.has(left) && this.has(upLeft) && !this.has(up)) {
                vertices++;
            }
            if (!this.has(right) && this.has(upRight) && !this.has(up)) {
                vertices++;
            }
            if (!this.has(left) && this.has(downLeft) && !this.has(down)) {
                vertices++;
            }
            if (!this.has(right) && this.has(downRight) && !this.has(down)) {
                vertices++;
            }
        });

        return vertices;
    }
};
