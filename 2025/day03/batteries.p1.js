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
    let first = 0;
    let second = 0;

    batteries.forEach((battery, index) => {
        if (battery > first && index !== batteries.length - 1) {
            first = battery;
            second = 0;
        } else if (battery > second) {
            second = battery;
        }
    });

    return parseInt(`${first}${second}`, 10);
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
