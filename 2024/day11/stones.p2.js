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

// Always returns an array so `blink` can just use `reduce` to continue recursing.
const processStone = (stone) => {
    if (stone === 0) {
        return [1];
    } else if (hasEvenDigitCount(stone)) {
        return splitNumber(stone);
    }

    return [stone * 2024];
};

/**
 * The array solution in part 1 doesn't work for 75 iterations because it generates
 * more "stones" than a Javascript array can support. However, 75 levels in a stack
 * is more reasonable, so recursion is a better approach as long as we tackle one
 * stone at a time.
 *
 * Ultimately all we care about is how many stones result from a single starting stone,
 * so this recusive function just returns how many stones are created after `times` iterations.
 * These stone counts roll up to a final total.
 *
 * The other problem is performace: there are a lot of stones being generated that need to be
 * recursed over. Thankfully, a lot of the stone numbers are repeated. By caching the result
 * of X stone at Y depth, we can skip a bunch of the recursion & calculation if we already know the answer.
 *
 * @param {number} stone The current stone's number
 * @param {number} times How many times we've "blinked" so far (aka recursion depth)
 * @param {number} target When to stop blinking (aka base case)
 * @param {object} cache Object whose key describes a stone at a certain depth, and value is how many
 * stones it genereates.
 * @returns Number of generated stones after `target` iterations.
 */
const blink = (stone, times, target, cache) => {
    const key = `${stone}.${times}`;

    if (cache[key] !== undefined) {
        return cache[key];
    }
    if (times === target) {
        return 1; // Enter with one stone, leave with one stone
    } else {
        const result = processStone(stone);
        const count = result.reduce((tally, stone) => tally + blink(stone, times + 1, target, cache), 0);
        cache[key] = count;
        return count;
    }
};

const getResult = async () => {
    const [stones] = await readInput();
    const cache = {};

    return stones.reduce((tally, stone) => tally + blink(stone, 0, 75, cache), 0);
};

if (!module.parent) {
    getResult().then(console.log);
}

module.exports = {
    getResult,
};
