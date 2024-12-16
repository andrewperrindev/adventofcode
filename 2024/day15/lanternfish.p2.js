const { openFile, readAsLines, parseLineAsMatrix } = require('../utils/file-handler');
const Matrix = require('../utils/matrix');

const readInput = async () => {
    const data = await openFile('inputs/lanternfish.example.txt', __dirname);

    return readAsLines(data);
};

const expandLine = (line) => {
    const newLine = [];
    line.forEach((char) => {
        switch (char) {
            case 'O':
                newLine.push('[', ']');
                break;
            case '@':
                newLine.push('@', '.');
                break;
            default:
                newLine.push(char, char);
        }
    });

    return newLine;
};

const parseInput = (lines) => {
    const matrixLines = [];
    let commandStr = '';
    let line = lines.shift();

    while (line !== '') {
        const matrixLine = parseLineAsMatrix(line);
        matrixLines.push(expandLine(matrixLine));
        line = lines.shift();
    }

    for (line of lines) {
        commandStr += line;
    }

    return [new Matrix(matrixLines), commandStr.split('')];
};

const determineCols = (matrix, coords, direction) => {
    let [x, y] = coords;
    const colsToMinRow = {};
    const colsToMaxRow = {};
    colsToMinRow[x] = y;
    colsToMaxRow[x] = y;

    [x, y] = matrix.directionFrom(coords, direction);
    let colsToSearch = [x];

    while (y >= 0 && y < matrix.height) {
        colsToSearch = colsToSearch.filter((col) => ['[', ']'].includes(matrix.at([col, y])));

        if (colsToSearch.length === 0) {
            break;
        }
        if (matrix.at([colsToSearch.at(0), y]) === ']') {
            colsToMinRow[colsToSearch.at(0) - 1] ??= y;
            colsToMaxRow[colsToSearch.at(0) - 1] = y;
            colsToSearch.unshift(colsToSearch.at(0) - 1);
        }
        if (matrix.at([colsToSearch.at(-1), y]) === '[') {
            colsToMinRow[colsToSearch.at(-1) + 1] ??= y;
            colsToMaxRow[colsToSearch.at(-1) + 1] = y;
            colsToSearch.push(colsToSearch.at(-1) + 1);
        }
        for (let i = colsToSearch[0]; i < colsToSearch.at(-1); i++) {
            colsToMaxRow[i] = y;
        }

        [x, y] = matrix.directionFrom([x, y], direction);
    }

    return [colsToMinRow, colsToMaxRow];
};

const calculateGps = (matrix) => {
    return matrix.findAll('[').reduce((tally, coords) => tally + (coords[0] + coords[1] * 100), 0);
};

const getResult = async () => {
    const data = await readInput();
    const [matrix, commands] = parseInput(data);
    matrix.setLocation(matrix.find('@'));
    commands.forEach((command) => {
        if ([Matrix.LEFT, Matrix.RIGHT].includes(command)) {
            matrix.pushLocation(command);
        } else {
            const [colMinRowsToMove, colMaxRowsToMove] = determineCols(matrix, matrix.getLocation(), command);
            matrix.pushLocationCols(command, colMinRowsToMove, colMaxRowsToMove);
        }
    });
    return calculateGps(matrix);
};

if (!module.parent) {
    getResult().then(console.log);
}

module.exports = {
    getResult,
};
