const { openFile, readAsLines, parseLineAsMatrix } = require('../utils/file-handler');
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

    const [score, solution] = maze.getOptimalPath(Maze.RIGHT, getKey, scoreMovement);

    for (let coord of solution) {
        maze.set(coord, 'O');
    }
    maze.plot();

    return score;
};

if (!module.parent) {
    getResult().then(console.log);
}

module.exports = {
    getResult,
};
