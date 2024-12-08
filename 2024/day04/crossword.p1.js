const { openFile, readAsLines, parseLineAsMatrix } = require('../utils/file-handler');

const WORD = 'XMAS';
const WORD_LENGTH = WORD.length;

// Convenience function because I find it easier to think
// in x,y instead of y,x.
const getLetter = (matrix, x, y) => matrix[y][x];

const readInput = async () => {
    const data = await openFile('inputs/crossword.example.txt', __dirname);

    return readAsLines(data).map((line) => parseLineAsMatrix(line));
};

// Might be nice to encapsulate some of this matrix search logic into its
// own package or class.
// Maybe if this style puzzle comes up again...
const checkForwards = (matrix, x, y) => {
    const line = matrix[y];

    const word = line.slice(x, x + WORD_LENGTH);
    return word.join('') === WORD;
};

const checkBackwards = (matrix, x, y) => {
    const line = matrix[y];
    const endX = x + 1;
    const startX = endX - WORD_LENGTH;

    const word = line.slice(startX, endX);
    word.reverse();
    return word.join('') === WORD;
};

const checkDown = (matrix, x, y) => {
    const word = [];
    const endY = y + WORD_LENGTH;

    if (endY <= matrix.length) {
        for (let letter = y; letter < endY; letter++) {
            word.push(getLetter(matrix, x, letter));
        }

        return word.join('') === WORD;
    }

    return false;
};

const checkUp = (matrix, x, y) => {
    const word = [];
    const endY = y - WORD_LENGTH + 1;

    if (endY >= 0) {
        for (let letter = y; letter >= endY; letter--) {
            word.push(getLetter(matrix, x, letter));
        }

        return word.join('') === WORD;
    }

    return false;
};

const checkDiagonalDownRight = (matrix, x, y) => {
    const word = [];
    const endY = y + WORD_LENGTH;

    if (endY <= matrix.length && x + WORD_LENGTH - 1 <= matrix[y].length) {
        let currentX = x;

        for (let letter = y; letter < endY; letter++) {
            word.push(getLetter(matrix, currentX, letter));
            currentX += 1;
        }

        return word.join('') === WORD;
    }

    return false;
};

const checkDiagonalDownLeft = (matrix, x, y) => {
    const word = [];
    const endY = y + WORD_LENGTH;

    if (endY <= matrix.length && x - WORD_LENGTH + 1 >= 0) {
        let currentX = x;

        for (let letter = y; letter < endY; letter++) {
            word.push(getLetter(matrix, currentX, letter));
            currentX -= 1;
        }

        return word.join('') === WORD;
    }

    return false;
};

const checkDiagonalUpRight = (matrix, x, y) => {
    const word = [];
    const endY = y - WORD_LENGTH + 1;

    if (endY >= 0 && x + WORD_LENGTH - 1 <= matrix[y].length) {
        let currentX = x;

        for (let letter = y; letter >= endY; letter--) {
            word.push(getLetter(matrix, currentX, letter));
            currentX += 1;
        }

        return word.join('') === WORD;
    }

    return false;
};

const checkDiagonalUpLeft = (matrix, x, y) => {
    const word = [];
    const endY = y - WORD_LENGTH + 1;

    if (endY >= 0 && x - WORD_LENGTH + 1 >= 0) {
        let currentX = x;

        for (let letter = y; letter >= endY; letter--) {
            word.push(getLetter(matrix, currentX, letter));
            currentX -= 1;
        }

        return word.join('') === WORD;
    }

    return false;
};

const findAllWords = (matrix) => {
    let tally = 0;

    for (let y = 0; y < matrix.length; y++) {
        const line = matrix[y];

        for (let x = 0; x < line.length; x++) {
            if (getLetter(matrix, x, y) === 'X') {
                // How many directions fully spell out XMAS?
                // Each function returns true or false to indicate if XMAS exists.
                // Then use `reduce` to count how may are `true`.
                const results = [
                    checkForwards(matrix, x, y),
                    checkBackwards(matrix, x, y),
                    checkDown(matrix, x, y),
                    checkUp(matrix, x, y),
                    checkDiagonalDownRight(matrix, x, y),
                    checkDiagonalDownLeft(matrix, x, y),
                    checkDiagonalUpRight(matrix, x, y),
                    checkDiagonalUpLeft(matrix, x, y),
                ];
                tally += results.reduce((count, hasWord) => count + (hasWord ? 1 : 0), 0);
            }
        }
    }

    return tally;
};

readInput().then((matrix) => {
    console.log(findAllWords(matrix));
});

module.exports = {
    readInput,
    findAllWords,
};
