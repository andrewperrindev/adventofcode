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

const countZeroTraversals = (start, instructions) => {
    let arrayLength = 100;
    let lock = Array.from({ length: arrayLength }, (value, index) => index);
    var position = start;
    let zeroCount = 0;

    instructions.forEach(([ direction, number ]) => {
        let distanceToZero = (direction === 'L' ? position : arrayLength - position);
        var adjustedNumber = number;

        // If this move crosses zero, count that first
        if (position > 0 && adjustedNumber >= distanceToZero) {
            adjustedNumber -= distanceToZero;
            position = 0;
            zeroCount += 1;
        }

        let offset = position + (direction === 'L' ? -adjustedNumber : adjustedNumber);

        // Then, count any full rotations over zero
        if (Math.abs(offset) >= arrayLength) {
            zeroCount += Math.floor(Math.abs(offset) / arrayLength);
        }

        let newIndex = (offset % arrayLength + arrayLength) % arrayLength
        position = lock[newIndex];
    });

    return zeroCount;
}

const getResult = async (overrideInstructions = undefined) => {
    const instructions = overrideInstructions ?? await readInput();
    return countZeroTraversals(50, instructions);
};

getResult().then((result) => {
    console.log(result);
});

module.exports = {
    getResult,
};
