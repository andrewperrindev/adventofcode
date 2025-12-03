const { openFile } = require('../utils/file-handler');

const processLine = (line) => {
    const direction = line.slice(0, 1);
    const number = parseInt(line.slice(1), 10);
    return [ direction, number ];
};

const readInput = async () => {
    const data = await openFile('inputs/combination.example.txt', __dirname);

    return data.split('\n')
        .map((line) => {
            return processLine(line);
        });
};

const countZeroResults = (start, instructions) => {
    let arrayLength = 100;
    let position = start;
    let zeroCount = 0;

    instructions.forEach(([ direction, number ]) => {
        let offset = position + (direction === 'L' ? -number : number);
        position = (offset % arrayLength + arrayLength) % arrayLength

        if (position === 0) {
            zeroCount++;
        }
    });

    return zeroCount;
}

const getResult = async () => {
    const instructions = await readInput();
    return countZeroResults(50, instructions);
};

getResult().then((result) => {
    console.log(result);
});

module.exports = {
    getResult,
};
