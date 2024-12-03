const { openFile, readAsLines, parseLineAsNumbers } = require('../utils/file-handler');

const readInput = async () => {
    const data = await openFile('inputs/levels.input.txt');

    return readAsLines(data);
};

const isSafe = (numbers) => {
    prev_number = null;
    increasing = null;

    for (let i = 0; i < numbers.length; i++) {
        let diff = 0;

        if (prev_number !== null) {
            diff = numbers[i] - prev_number;
            if (![1,2,3].includes(Math.abs(diff))) {
                return false;
            }
        }

        if (i === 1) {
            increasing = diff > 0;
        }
        else if (i > 0) {
            if ((increasing && numbers[i] < prev_number) || (!increasing && numbers[i] > prev_number)) {
                return false;
            }
        }

        prev_number = numbers[i];
    }

    return true;
}

const getSafeLineCount = async () => {
    const lines = await readInput();

    return lines.reduce((tally, line) => {
        if (isSafe(parseLineAsNumbers(line))) {
            tally += 1;
        }

        return tally;
    }, 0);
}

getSafeLineCount().then((result) => {
    console.log(result);
});
