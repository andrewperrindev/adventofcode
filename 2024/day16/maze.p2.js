const { openFile, readAsLines, parseLineAsMatrix } = require('../utils/file-handler');
const { stringToCoordinates } = require('../utils/coordinates');
const Maze = require('../utils/maze');

const readInput = async () => {
    const data = await openFile('inputs/maze.example.txt', __dirname);

    return readAsLines(data).map(parseLineAsMatrix);
};

const getMovementDirection = ([fromX, fromY], [toX, toY]) => {
    if (fromX === toX) {
        if (toY > fromY) {
            return Maze.DOWN;
        } else if (toY < fromY) {
            return Maze.UP;
        }
    } else if (fromY === toY) {
        if (toX > fromX) {
            return Maze.RIGHT;
        } else if (toX < fromX) {
            return Maze.LEFT;
        }
    }
};

const scoreMovement = (prevDirection, fromCoords, toCoords) => {
    let score = 1;

    if (getMovementDirection(fromCoords, toCoords) !== prevDirection) {
        score += 1000;
    }

    return score;
};

const getKey = (coords, direction) => {
    return `${coords}.${direction}`;
};

const getResult = async () => {
    const data = await readInput();
    const maze = new Maze(data, 'S', 'E');

    const [, paths] = maze.getAllGoodPaths(Maze.RIGHT, getKey, scoreMovement);

    let fullSet = new Set();
    paths.forEach((s) => (fullSet = new Set([...fullSet, ...s.map(String)])));

    for (let loc of fullSet) {
        maze.set(stringToCoordinates(loc), 'O');
    }
    maze.plot();

    return fullSet.size;
};

if (!module.parent) {
    getResult().then(console.log);
}

module.exports = {
    getResult,
};
