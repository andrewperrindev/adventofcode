const { openFile, readAsLines, parseLineAsNumbers } = require('../utils/file-handler');
const Matrix = require('../utils/matrix');

const readInput = async () => {
    const data = await openFile('inputs/trail.example.txt', __dirname);

    return readAsLines(data).map((line) => parseLineAsNumbers(line, ''));
};

const findPaths = (matrix, coords, num = 0) => {
    if (coords && matrix.at(coords) === num) {
        if (num === 9) {
            return coords.toString();
        } else {
            return [
                findPaths(matrix, matrix.upFrom(coords), num + 1),
                findPaths(matrix, matrix.downFrom(coords), num + 1),
                findPaths(matrix, matrix.leftFrom(coords), num + 1),
                findPaths(matrix, matrix.rightFrom(coords), num + 1),
            ].filter((result) => !!result);
        }
    }

    return [];
};

const getResult = async () => {
    const data = await readInput();
    const grid = new Matrix(data);
    const coords = grid.findAll(0);
    const counts = [];

    for (let coord of coords) {
        const result = new Set();
        findPaths(grid, coord).flat(Infinity).map(result.add, result);
        counts.push(result.size);
    }

    // console.log(counts);
    return counts.reduce((sum, num) => (sum += num), 0);
};

if (!module.parent) {
    getResult().then(console.log);
}

module.exports = {
    getResult,
};
