const { openFile, readAsLines, parseLineAsMatrix } = require('../utils/file-handler');
const Matrix = require('../utils/matrix');

const readInput = async () => {
    const data = await openFile('inputs/lanternfish.example.txt', __dirname);

    return readAsLines(data);
};

const parseInput = (lines) => {
    const matrixLines = [];
    let commandStr = '';
    let line = lines.shift();

    while (line !== '') {
        matrixLines.push(parseLineAsMatrix(line));
        line = lines.shift();
    }

    for (line of lines) {
        commandStr += line;
    }

    return [new Matrix(matrixLines), commandStr.split('')];
};

const calculateGps = (matrix) => {
    return matrix.findAll('O').reduce((tally, coords) => tally + (coords[0] + coords[1] * 100), 0);
};

const getResult = async () => {
    const data = await readInput();
    const [matrix, commands] = parseInput(data);
    matrix.setLocation(matrix.find('@'));
    commands.forEach((command) => {
        matrix.pushLocation(command);
    });
    return calculateGps(matrix);
};

if (!module.parent) {
    getResult().then(console.log);
}

module.exports = {
    getResult,
};
