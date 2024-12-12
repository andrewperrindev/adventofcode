const { openFile, readAsLines, parseLineAsNumbers } = require('../utils/file-handler');

const readInput = async () => {
    const data = await openFile('inputs/stones.example.txt', __dirname);

    return readAsLines(data).map((line) => parseLineAsNumbers(line));
};

const hasEvenDigitCount = (stone) => stone.toString().length % 2 === 0;

const splitNumber = (stone) => {
    const stoneStr = stone.toString();
    const halfLength = Math.floor(stone.toString().length / 2);
    return [parseInt(stoneStr.substring(0, halfLength), 10), parseInt(stoneStr.substring(halfLength), 10)];
};

const processStones = (stones) => {
    const newStones = [];

    stones.forEach((stone) => {
        if (stone === 0) {
            newStones.push(1);
        } else if (hasEvenDigitCount(stone)) {
            newStones.push(...splitNumber(stone));
        } else {
            newStones.push(stone * 2024);
        }
    });

    return newStones;
};

const blink = (stones, times) => {
    let newStones = [...stones];

    for (let i = 0; i < times; i++) {
        newStones = processStones(newStones);
    }

    return newStones;
};

const getResult = async () => {
    const [stones] = await readInput();
    return blink(stones, 25).length;
};

if (!module.parent) {
    getResult().then(console.log);
}

module.exports = {
    getResult,
};
