const { openFile, readAsLines } = require('../utils/file-handler');
const { getMovementDirection } = require('../utils/coordinates');
const Maze = require('../utils/maze');

const BTN_A = 'A';
const INVALID = '#';

const readInput = async (type) => {
    const data = await openFile(`inputs/locks.${type}.txt`, __dirname);

    return readAsLines(data);
};

const parseInput = (lines) => {
    return lines.map((line) => line.split(''));
};

const buildNumpadGrid = () => {
    const matrix = [['7', '8', '9']];
    matrix.push(['4', '5', '6']);
    matrix.push(['1', '2', '3']);
    matrix.push([INVALID, '0', BTN_A]);
    return matrix;
};

const buildArrowGrid = () => {
    const matrix = [[INVALID, Maze.UP, BTN_A]];
    matrix.push([Maze.LEFT, Maze.DOWN, Maze.RIGHT]);
    return matrix;
};

const getNumPadPaths = (fromKey, toKey) => {
    const maze = new Maze(buildNumpadGrid(), fromKey, toKey);
    maze.freeSpaceChars.push(BTN_A, '0', '1', '2', '3', '4', '5', '6', '7', '8', '9');
    const [, paths] = maze.getAllGoodPaths(undefined, undefined, scoreFn);
    return paths;
};

const getArrowPaths = (fromKey, toKey) => {
    const maze = new Maze(buildArrowGrid(), fromKey, toKey);
    maze.freeSpaceChars.push(BTN_A, Maze.UP, Maze.DOWN, Maze.LEFT, Maze.RIGHT);
    const [, paths] = maze.getAllGoodPaths(undefined, undefined, scoreFn);
    return paths;
};

// Convert a list of path coordinates from a dijkstra analysis to an array
// of movement directions, e.g. [Maze.LEFT, Maze.UP, Maze.LEFT, ...]
const convertPathsToDirections = (paths) => {
    return paths.map((path) => {
        const directions = [];

        for (let a = 0; a < path.length - 1; a++) {
            const b = a + 1;
            directions.push(getMovementDirection(path[a], path[b]));
        }

        return directions;
    });
};

const convertCodeToCommands = (code) => {
    let commands = [];
    let prevChar = BTN_A;

    for (let char of code) {
        const paths = getNumPadPaths(prevChar, char);
        const newCommands = convertPathsToDirections(paths);
        newCommands.map((command) => command.push(BTN_A));

        if (commands.length === 0) {
            commands = newCommands;
        } else {
            const iterated = [];
            for (let newCommand of newCommands) {
                for (let command of commands) {
                    iterated.push([...command, ...newCommand]);
                }
            }
            commands = iterated;
        }
        prevChar = char;
    }

    return commands;
};

const convertDirectionsToCommands = (directionChars) => {
    let allCommandPaths = [];

    for (let charDirPath of directionChars) {
        let commands = [];
        let prevChar = BTN_A;

        for (let char of charDirPath) {
            const paths = getArrowPaths(prevChar, char);
            const newCommands = convertPathsToDirections(paths);
            newCommands.map((command) => command.push(BTN_A));

            if (commands.length === 0) {
                commands = newCommands;
            } else {
                const iterated = [];
                for (let newCommand of newCommands) {
                    for (let command of commands) {
                        iterated.push([...command, ...newCommand]);
                    }
                }
                commands = iterated;
            }
            prevChar = char;
        }

        allCommandPaths = [...allCommandPaths, ...commands];
    }

    return allCommandPaths;
};

// Similar score function to day 16. Shorter path is better, so extra penalty
// as path length increases. Keeping direction change penalty since moving to
// a different direction results in more key presses in later iterations.
const scoreFn = (prevDirection, fromCoords, toCoords, currPath) => {
    let score = 10 * (currPath.length || 1);

    if (getMovementDirection(fromCoords, toCoords) !== prevDirection) {
        score += 1000;
    }

    return score;
};

const calculateComplexity = (code, score) => {
    return parseInt(code.join(''), 10) * score;
};

const getResult = async (type = 'example') => {
    let result = 0;
    const data = await readInput(type);
    const input = parseInput(data);

    for (let code of input) {
        const codeCommands = convertCodeToCommands(code);
        const arrowCommands = convertDirectionsToCommands(codeCommands);
        const arrowAgainCommands = convertDirectionsToCommands(arrowCommands);

        const lowest = arrowAgainCommands.reduce((lowest, path) => {
            return path.length < lowest ? path.length : lowest;
        }, Infinity);
        result += calculateComplexity(code, lowest);
    }

    return result;
};

if (!module.parent) {
    getResult('input').then(console.log);
}

module.exports = {
    getResult,
};
