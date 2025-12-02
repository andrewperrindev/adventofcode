const { dijkstra } = require('./dijkstra');
const Matrix = require('./matrix');

const defaultKeyFn = (coords) => `${coords}`;
const defaultScoreFn = () => 1;

module.exports = class Maze extends Matrix {
    constructor(matrix, startChar, endChar) {
        super(matrix);

        this.start = this.find(startChar);
        this.goal = this.find(endChar);

        this.freeSpaceChars.push(startChar, endChar);
    }

    isValidSpace(coords) {
        return this.isValidCoordinate(coords) && !this.fixedSpaceChars.includes(this.at(coords));
    }

    setStartAndGoal(start = 'S', goal = 'E') {
        this.start = this.find(start);
        this.goal = this.find(goal);
    }

    getOptimalPath(direction, keyFn = defaultKeyFn, scoreFn = defaultScoreFn) {
        return dijkstra(this.start, direction, this.goal, this.isValidSpace.bind(this), keyFn, scoreFn);
    }

    getAllGoodPaths(direction, keyFn = defaultKeyFn, scoreFn = defaultScoreFn) {
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
