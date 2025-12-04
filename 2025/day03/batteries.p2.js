const { openFile } = require('../utils/file-handler');

const processLine = (line) => {
    const bank = line.split('');
    return bank.map((battery) => parseInt(battery, 10));
};

const readInput = async () => {
    const data = await openFile('inputs/batteries.example.txt', __dirname);
    return data.split('\n')
    .map((line) => {
        return processLine(line);
    });
};

const findHighestJoltage = (batteries) => {
    const bankSize = batteries.length;
    let candidates = Array(12).fill(0);

    batteries.forEach((battery, index) => {
        for (let i = 0; i < candidates.length; i++) {
            const remainingSlots = 12 - i;
            if (battery > candidates[i] && index <= bankSize - remainingSlots) {
                candidates[i] = battery;
                candidates.fill(0, i + 1);
                break;
            }
        }
    });

    return parseInt(candidates.join(''), 10);
}

const getResult = async () => {
    const banks = await readInput();

    return banks.reduce((acc, bank) => {
        return acc + findHighestJoltage(bank);
    }, 0);
};

getResult().then((result) => {
    console.log(result);
});

module.exports = {
    getResult,
};
