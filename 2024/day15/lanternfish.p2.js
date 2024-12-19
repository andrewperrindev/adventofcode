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

/**
 * Figure out which columns to move now that boxes can span multiple columns.
 * We also keep track of which row a column should start being pushed from,
 * as well as which row is the last to be pushed (`colsToFirstRow` and `colsToLastRow`).
 * This is to accomodate two special cases in this scenario, both a side
 * effect of boxes being able to stack and overlap in ways that form gaps:
 *   - Some boxes hang over the edges, and don't appear until well above where
 *     the robot is positioned. Solution: we need to skip initial empty spaces when pushing.
 *   - Some overlaps cause spaces in between boxes, which can cause a false reading for
 *     whether an empty space is available to push for a given column. Solution: specify
 *     the last row that needs to be pushed, regardless of empty space in between.
 */
const determineCols = (matrix, direction) => {
    let [x, y] = matrix.getLocation();
    const colsToFirstRow = {};
    const colsToLastRow = {};
    colsToFirstRow[x] = y;
    colsToLastRow[x] = y;

    [x, y] = matrix.directionFrom([x, y], direction);
    let colsToSearch = [x];

    while (y >= 0 && y < matrix.height) {
        colsToSearch = colsToSearch.filter((col) => ['[', ']'].includes(matrix.at([col, y])));

        if (colsToSearch.length === 0) {
            break;
        }

        if (matrix.at([colsToSearch.at(0), y]) === ']') {
            colsToFirstRow[colsToSearch.at(0) - 1] ??= y;
            colsToSearch.unshift(colsToSearch.at(0) - 1);
        }
        if (matrix.at([colsToSearch.at(-1), y]) === '[') {
            colsToFirstRow[colsToSearch.at(-1) + 1] ??= y;
            colsToSearch.push(colsToSearch.at(-1) + 1);
        }

        // For all columns that we are still analyzing, update the colsToLastRow value.
        for (let i = colsToSearch[0]; i <= colsToSearch.at(-1); i++) {
            colsToLastRow[i] = y;
        }

        [x, y] = matrix.directionFrom([x, y], direction);
    }

    return [colsToFirstRow, colsToLastRow];
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
            const [colFirstRowsToMove, colLastRowsToMove] = determineCols(matrix, command);
            matrix.pushLocationCols(command, colFirstRowsToMove, colLastRowsToMove);
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
