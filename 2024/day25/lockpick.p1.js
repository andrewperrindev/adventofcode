const { openFile, parseLineAsMatrix, readAsLines } = require('../utils/file-handler');
const Matrix = require('../utils/matrix');

const PIN = '#';

const readInput = async (type) => {
    const data = await openFile(`inputs/lockpick.${type}.txt`, __dirname);

    return readAsLines(data);
};

const parseInput = (data) => {
    const locks = [];
    const keys = [];

    while (data.length > 0) {
        const grid = [];
        let line = data.shift();

        while (line && line !== '') {
            grid.push(parseLineAsMatrix(line));
            line = data.shift();
        }

        const matrix = new Matrix(grid);
        const heights = [];

        for (let col = 0; col < matrix.width; col++) {
            heights.push(matrix.getColCharacterCount(PIN, col) - 1);
        }

        if (matrix.at([0, 0]) === PIN) {
            locks.push(heights);
        } else {
            keys.push(heights);
        }
    }

    return [locks, keys];
};

const tryLocks = (locks, keys) => {
    let tally = 0;

    for (let lock of locks) {
        for (let key of keys) {
            if (lock.every((lockHeight, idx) => lockHeight + key[idx] < 6)) {
                tally++;
            }
        }
    }

    return tally;
};

const getResult = async (type = 'example') => {
    const data = await readInput(type);
    const [locks, keys] = parseInput(data);
    return tryLocks(locks, keys);
};

if (!module.parent) {
    getResult('input').then(console.log);
}

module.exports = {
    getResult,
};
