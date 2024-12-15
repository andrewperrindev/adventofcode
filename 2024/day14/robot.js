const { add, isValidCoordinate } = require('../utils/coordinates');

module.exports = class Robot {
    constructor(position, velocity, xMax, yMax) {
        this.position = position;
        this.velocity = velocity;

        this.xMax = xMax;
        this.yMax = yMax;

        this.quadrantX = Math.floor(xMax / 2);
        this.quadrantY = Math.floor(yMax / 2);
    }

    tick() {
        let [newX, newY] = add(this.position, this.velocity);

        while (newX < 0 || newX >= this.xMax) {
            if (newX < 0) {
                newX = this.xMax + newX;
            }
            if (newX >= this.xMax) {
                newX = newX - this.xMax;
            }
        }

        while (newY < 0 || newY >= this.yMax) {
            if (newY < 0) {
                newY = this.yMax + newY;
            }
            if (newY >= this.yMax) {
                newY = newY - this.yMax;
            }
        }

        this.position = [newX, newY];
    }

    inNorthwestQuadrant() {
        return isValidCoordinate(this.position, [this.quadrantX, this.quadrantY]);
    }

    inNortheastQuadrant() {
        const xMin = this.xMax - this.quadrantX;
        return isValidCoordinate(this.position, [this.quadrantX, this.quadrantY], xMin);
    }

    inSouthwestQuadrant() {
        const yMin = this.yMax - this.quadrantY;
        return isValidCoordinate(this.position, [this.quadrantX, this.quadrantY], 0, yMin);
    }

    inSoutheastQuadrant() {
        const xMin = this.xMax - this.quadrantX;
        const yMin = this.yMax - this.quadrantY;
        return isValidCoordinate(this.position, [this.quadrantX, this.quadrantY], xMin, yMin);
    }
};
