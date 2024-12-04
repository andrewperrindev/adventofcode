const { openFile, readAsLines } = require('../utils/file-handler');

const readInput = async () => {
    const data = await openFile('inputs/mul.input.txt');

    return readAsLines(data);
};

const findMuls = (line) => {
    const matches = [...line.matchAll(/mul\([0-9]{1,3},[0-9]{1,3}\)/g)];
    return matches.map((match) => match[0]);
};

const evaluateMul = (mulString) => {
    const matches = [...mulString.matchAll(/[0-9]{1,3}/g)];
    const numStrs = matches.map((match) => match[0]);
    return numStrs.reduce((currentTotal, numStr) => currentTotal * parseInt(numStr, 10), 1);
};

const evaluateAllMuls = (mulStrings) => {
    return mulStrings.map((mulStr) => evaluateMul(mulStr));
}

const getSum = async() => {
    const lines = await readInput();

    const mulStrings = lines.reduce((muls, line) => [...muls, ...findMuls(line)], []);
    const results = evaluateAllMuls(mulStrings);
    return results.reduce((sum, result) => sum + result, 0);
}

getSum().then((result) => {
    console.log(result);
});
