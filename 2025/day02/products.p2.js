const { openFile } = require('../utils/file-handler');

const processLine = (line) => {
    const ranges = line.split(',');
    return ranges.map((range) => range.split('-').map(num => parseInt(num, 10)));
};

const readInput = async () => {
    const data = await openFile('inputs/products.example.txt', __dirname);
    return processLine(data);
};

const splitNumber = (number, times = 2) => {
    const string = number.toString();

    if (string.length % times === 0) {
        return Array.from(
            { length: times },
            (_, i) => parseInt(string.slice(i * (string.length / times), (i + 1) * (string.length / times)), 10)
        );
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
    let repetitions = new Set();
    const [ start, end ] = range;

    for (let size = 2; size <= start.toString().length; size++) {
        let startSplit = splitNumber(start, size);

        if (startSplit) {
            let startFirst = startSplit[0];
            let candidate = parseInt(`${startFirst}`.repeat(size), 10);

            while (candidate <= end) {
                if (candidate >= start) {
                    repetitions.add(candidate);
                }
                startFirst += 1;
                candidate = parseInt(`${startFirst}`.repeat(size), 10);
            }
        }
    }

    for (let size = 2; size <= end.toString().length; size++) {
        let endSplit = splitNumber(end, size);

        if (endSplit) {
            let endFirst = roundDownToBase(endSplit[0]);
            let candidate = parseInt(`${endFirst}`.repeat(size), 10);

            while (candidate >= start && candidate <= end) {
                repetitions.add(candidate);
                endFirst += 1;
                candidate = parseInt(`${endFirst}`.repeat(size), 10);
            }
        }
    }

    return Array.from(repetitions).reduce((acc, rep) => acc + rep, 0);
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

