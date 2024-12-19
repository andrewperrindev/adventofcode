const { dijkstra } = require('./dijkstra');
const Matrix = require('./matrix');

module.exports = class Maze extends Matrix {
    constructor(matrix, startChar, endChar) {
        super(matrix);

        this.start = this.find(startChar);
        this.goal = this.find(endChar);
    }

    isValidSpace(coords) {
        return !this.fixedSpaceChars.includes(this.at(coords));
    }

    getOptimalPath(direction, keyFn, scoreFn) {
        return dijkstra(this.start, direction, this.goal, this.isValidSpace.bind(this), keyFn, scoreFn);
    }

    getAllGoodPaths(direction, keyFn, scoreFn) {
        const [targetScore] = dijkstra(
            this.start,
            direction,
            this.goal,
            this.isValidSpace.bind(this),
            keyFn,
            scoreFn,
        );
        return dijkstra(
            this.start,
            direction,
            this.goal,
            this.isValidSpace.bind(this),
            keyFn,
            scoreFn,
            targetScore,
        );
    }
};
