const { openFile, readAsLines, parseLineAsMatrix } = require('../utils/file-handler');

const WORD = 'MAS';
const REVERSE_WORD = 'SAM';
const WORD_LENGTH = WORD.length;

// Convenience function because I find it easier to think
// in x,y instead of y,x.
const getLetter = (matrix, x, y) => matrix[y][x];

const readInput = async () => {
    const data = await openFile('inputs/crossword.example.txt');

    return readAsLines(data).map((line) => parseLineAsMatrix(line));
};

const checkDiagonalDownRight = (matrix, x, y) => {
    const word = [];
    const endY = y + WORD_LENGTH;

    if (endY <= matrix.length && x + WORD_LENGTH - 1 <= matrix[y].length) {
        let currentX = x;

        for (let letter = y; letter < endY; letter++)  {
            word.push(getLetter(matrix, currentX, letter));
            currentX += 1;
        }

        return word.join('') === WORD || word.join('') === REVERSE_WORD;
    }

    return false;
}

const checkDiagonalDownLeft = (matrix, x, y) => {
    const word = [];
    const endY = y + WORD_LENGTH;

    if (endY <= matrix.length && x - WORD_LENGTH + 1 >= 0) {
        let currentX = x;

        for (let letter = y; letter < endY; letter++)  {
            word.push(getLetter(matrix, currentX, letter));
            currentX -= 1;
        }

        return word.join('') === WORD || word.join('') === REVERSE_WORD;
    }

    return false;
}

const findAllWords = (matrix) => {
    let tally = 0;

    for (let y = 0; y < matrix.length; y++) {
        const line = matrix[y];

        for (let x = 0; x < line.length; x++) {
            const letter = getLetter(matrix, x, y);

            if (letter === 'M' || letter === 'S') {
                // By moving consistently down and to the right, we can count all
                // occurrences of `MAS` or `SAM` crossing each other without double counting.
                if (checkDiagonalDownRight(matrix, x, y) && checkDiagonalDownLeft(matrix, x + 2, y)) {
                    tally += 1;
                }
            }
        }
    }

    return tally;
}

readInput().then((matrix) => {
    console.log(findAllWords(matrix));
});