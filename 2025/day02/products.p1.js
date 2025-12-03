const { openFile } = require('../utils/file-handler');

const processLine = (line) => {
    const ranges = line.split(',');
    return ranges.map((range) => range.split('-').map(num => parseInt(num, 10)));
};

const readInput = async () => {
    const data = await openFile('inputs/products.example.txt', __dirname);
    return processLine(data);
};

const splitNumber = (number) => {
    const string = number.toString();

    if (string.length % 2 === 0) {
        return [
            parseInt(string.slice(0, string.length / 2), 10),
            parseInt(string.slice(string.length / 2), 10),
        ];
    }

    return null;
}

function roundDownToBase(number) {
    let numArray = number.toString().split('');
    numArray.fill("0", 1);
    const base = parseInt(numArray.join(''), 10);

    return Math.floor(number / base) * base;
}

const findRepetitions = (range) => {
    const [ start, end ] = range;

    let startSplit = splitNumber(start);
    let endSplit = splitNumber(end);

    if (startSplit) {
        let repetitions = [];
        let startFirst = startSplit[0];
        let candidate = parseInt(`${startFirst}${startFirst}`, 10);

        while (candidate <= end) {
            if (candidate >= start) {
                repetitions.push(candidate);
            }
            startFirst += 1;
            candidate = parseInt(`${startFirst}${startFirst}`, 10);
        }

        return repetitions.reduce((acc, rep) => acc + rep, 0);
    }

    if (endSplit) {
        let repetitions = [];
        let endFirst = roundDownToBase(endSplit[0]);
        let candidate = parseInt(`${endFirst}${endFirst}`, 10);

        while (candidate >= start && candidate <= end) {
            repetitions.push(candidate);
            endFirst += 1;
            candidate = parseInt(`${endFirst}${endFirst}`, 10);
        }

        return repetitions.reduce((acc, rep) => acc + rep, 0);
    }

    return 0;
};

const getResult = async () => {
    const ranges = await readInput();

    const total = ranges.reduce((acc, range) => {
        return acc + findRepetitions(range);
    }, 0);

    return total;
};

getResult().then((result) => {
    console.log(result);
});

module.exports = {
    getResult,
};

