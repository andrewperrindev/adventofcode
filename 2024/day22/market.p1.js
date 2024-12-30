const { openFile, readAsLines } = require('../utils/file-handler');

const readInput = async (type) => {
    const data = await openFile(`inputs/market.${type}.txt`, __dirname);

    return readAsLines(data);
};

const mix = (numA, numB) => {
    return BigInt(numA ^ numB);
};

const prune = (numA) => {
    return BigInt(numA % BigInt(16777216));
};

const getNextSecret = (num) => {
    let result = BigInt(num * BigInt(64));
    num = prune(mix(result, num));

    result = BigInt(num / BigInt(32));
    num = prune(mix(result, num));

    result = BigInt(num * BigInt(2048));
    return prune(mix(result, num));
};

const getResult = async (type = 'example') => {
    const data = (await readInput(type)).map((line) => parseInt(line, 10));
    const calc = data.map((initial) => {
        for (let i = 0; i < 2000; i++) {
            initial = getNextSecret(BigInt(initial));
        }
        return parseInt(initial, 10);
    });
    return calc.reduce((tally, num) => tally + num, 0);
};

if (!module.parent) {
    getResult('input').then(console.log);
}

module.exports = {
    getResult,
};
