const { openFile, readAsLines, parseLineAsMatrix } = require('../utils/file-handler');
const Matrix = require('../utils/matrix');

const readInput = async () => {
    const data = await openFile('inputs/garden.example.txt', __dirname);

    return readAsLines(data).map(parseLineAsMatrix);
};

const getResult = async () => {
    const data = await readInput();
    const matrix = new Matrix(data);
    matrix.findRegions();
    return matrix.getRegions().reduce((tally, region) => tally + region.sides() * region.area(), 0);
};

if (!module.parent) {
    getResult().then(console.log);
}

module.exports = {
    getResult,
};
