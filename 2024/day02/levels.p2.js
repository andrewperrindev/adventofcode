const { openFile, readAsLines, parseLineAsNumbers } = require('../utils/file-handler');

const readInput = async () => {
    const data = await openFile('inputs/levels.example.txt', __dirname);

    return readAsLines(data);
};

const findBadIndex = (numbers) => {
    let prev_number = null;
    let increasing = null;

    for (let i = 0; i < numbers.length; i++) {
        let diff = 0;

        if (prev_number !== null) {
            diff = numbers[i] - prev_number;
            if (![1, 2, 3].includes(Math.abs(diff))) {
                return i;
            }
        }

        if (i === 1) {
            increasing = diff > 0;
        } else if (i > 0) {
            if ((increasing && numbers[i] < prev_number) || (!increasing && numbers[i] > prev_number)) {
                return i;
            }
        }

        prev_number = numbers[i];
    }

    return -1;
};

const applyProblemDampener = (numbers, badIndex) => {
    // Why these indices in particular?
    // We know `badIndex` caused a failure, but we don't know if removing
    // the failure OR the value before it would allow the reamining numbers to succeed.
    // We also don't specifically do any checks on the first element -- this really only
    // applies if `badIndex` === 2, but there is no performance benefit by adding
    // that extra conditional (for the amount of data we're working with).
    const candidates = [0, badIndex, badIndex - 1];
    let result = badIndex;

    for (const candidate of candidates) {
        const newNumbers = numbers.filter((_, numIdx) => numIdx !== candidate);
        result = findBadIndex(newNumbers);

        if (result === -1) {
            break;
        }
    }

    return result;
};

const getSafeLineCount = async () => {
    const lines = await readInput();

    return lines.reduce((tally, line) => {
        const numbers = parseLineAsNumbers(line);
        let badIndex = findBadIndex(numbers);

        if (badIndex > 0) {
            badIndex = applyProblemDampener(numbers, badIndex);
        }

        if (badIndex === -1) {
            tally += 1;
        }

        return tally;
    }, 0);
};

getSafeLineCount().then((result) => {
    console.log(result);
});

module.exports = {
    getSafeLineCount,
};
