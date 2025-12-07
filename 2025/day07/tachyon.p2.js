const { openFile, readAsLines, parseLineAsMatrix } = require('../utils/file-handler');
const Matrix = require('../utils/matrix');

const readInput = async () => {
    const data = await openFile('inputs/tachyon.example.txt', __dirname);

    return readAsLines(data).map(parseLineAsMatrix);
};

// Have to use memoization here since the real input is significantly larger than the example
const traverse = (grid, coordinates, cache = {}) => {
    if (!grid.isValidCoordinate(coordinates)) {
        return 0;
    }

    if (coordinates.toString() in cache) {
        return cache[coordinates.toString()];
    }

    if (grid.isFixedSpace(coordinates)) {
        let result = traverse(grid, grid.leftFrom(coordinates), cache) + traverse(grid, grid.rightFrom(coordinates), cache);
        cache[coordinates.toString()] = result;
        return result;
    } else if (!grid.isValidCoordinate(grid.downFrom(coordinates))) {
        return 1;
    } else {
        let result = traverse(grid, grid.downFrom(coordinates), cache);
        cache[coordinates.toString()] = result;
        return result;
    }
}

const getResult = async () => {
    const data = await readInput();
    const grid = new Matrix(data);
    grid.fixedSpaceChars = ['^'];

    return traverse(grid, grid.find('S'));
}

getResult().then((result) => {
    console.log(result);
});

module.exports = {
    getResult,
};
