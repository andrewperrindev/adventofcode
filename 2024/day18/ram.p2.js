const { openFile, readAsLines } = require('../utils/file-handler');
const { stringToCoordinates } = require('../utils/coordinates');
const Maze = require('../utils/maze');

const readInput = async (type) => {
    const data = await openFile(`inputs/ram.${type}.txt`, __dirname);

    return readAsLines(data);
};

const parseCoordinates = (lines) => {
    return lines.map(stringToCoordinates);
};

const buildMatrix = (width, height, start, end) => {
    const [startX, startY] = start;
    const [endX, endY] = end;

    const grid = Array(height)
        .fill('.')
        .map(() => Array(width).fill('.'));
    grid[startY][startX] = 'S';
    grid[endY][endX] = 'E';
    return grid;
};

const getKey = (coords) => `${coords}`;

const getScore = () => 1;

const getResult = async (type = 'example', width = 7, height = 7, maxCoords = 12) => {
    const data = await readInput(type);
    const coordsList = parseCoordinates(data);
    const maze = new Maze(buildMatrix(width, height, [0, 0], [width - 1, height - 1]), 'S', 'E');

    for (let i = 0; i < maxCoords; i++) {
        maze.set(coordsList[i], '#');
    }

    maze.plot();

    // Iterate over the remaining list of coordinates until the optimal path
    // score returns `Infinity` -- meaning there is no path.
    for (let i = maxCoords; i < coordsList.length; i++) {
        maze.set(coordsList[i], '#');
        const [score] = maze.getOptimalPath(Maze.RIGHT, getKey, getScore);
        if (score === Infinity) {
            return `${coordsList[i]}`;
        }
    }
};

if (!module.parent) {
    getResult('input', 71, 71, 1024).then(console.log);
}

module.exports = {
    getResult,
};
