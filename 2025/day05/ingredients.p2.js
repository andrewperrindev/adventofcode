const { openFile, readAsLines } = require('../utils/file-handler');

const processRangeLine = (line) => {
    let range = line.split('-');
    return range.map((id) => parseInt(id, 10));
};

const readInput = async () => {
    const data = await openFile('inputs/ingredients.example.txt', __dirname);
    let lines = readAsLines(data);
    let line = lines.shift();

    let ranges = [];

    while (line.trim() !== '') {
        ranges.push(processRangeLine(line));
        line = lines.shift();
    }

    let ingredients = lines.map((line) => parseInt(line, 10));

    return { ranges, ingredients };
};

const sortRanges = (ranges) => {
    return ranges.sort((a, b) => a[0] - b[0]);
};

const consolidateRanges = (first, second) => {
    if (first[1] >= second[0] - 1) {
        return [first[0], Math.max(first[1], second[1])];
    }

    return null;
}

const getResult = async () => {
    const { ranges } = await readInput();

    let sortedRanges = sortRanges(ranges);

    let consolidatedRanges = sortedRanges.reduce((acc, range) => {
        let lastRange = acc[acc.length - 1];

        if (lastRange) {
            let mergedRange = consolidateRanges(lastRange, range);

            if (mergedRange) {
                acc[acc.length - 1] = mergedRange;
            } else {
                acc.push(range);
            }
        } else {
            acc.push(range);
        }

        return acc;
    }, []);

    return consolidatedRanges.reduce((count, range) => {
        return count + (range[1] - range[0] + 1);
    }, 0);
};

getResult().then((result) => {
    console.log(result);
});

module.exports = {
    getResult,
};
