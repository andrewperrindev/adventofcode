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

const getResult = async () => {
    const { ranges, ingredients } = await readInput();

    return ingredients.reduce((acc, ingredient) => {
        if (ranges.some((range) => ingredient >= range[0] && ingredient <= range[1])) {
            return acc + 1;
        }

        return acc;
    }, 0);
};

getResult().then((result) => {
    console.log(result);
});

module.exports = {
    getResult,
};
