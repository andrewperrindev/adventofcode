const { openFile, readAsLines, parseLineAsNumbers } = require('../utils/file-handler');

const mult = (a, b) => a * b;
const add = (a, b) => a + b;
const concat = (a, b) => parseInt(`${a}${b}`, 10);

const OPERATORS = [mult, add, concat];

const readInput = async () => {
    const data = await openFile('inputs/bridge.example.txt', __dirname);

    return readAsLines(data);
};

const getEquationComponents = (line) => {
    const [result, constantStr] = line.split(':');
    const constants = parseLineAsNumbers(constantStr);

    return [parseInt(result, 10), constants];
};

const isValid = (result, a, b) => {
    if (Array.isArray(b) && b.length === 1) {
        b = b[0];
    }
    if (typeof a === 'number' && typeof b === 'number') {
        return OPERATORS.some((operator) => operator(a, b) === result);
    } else {
        return OPERATORS.some((operator) => {
            const [nextVal, ...vals] = b;
            return isValid(result, operator(a, nextVal), vals);
        });
    }
};

const getValidEquations = (equations) => {
    return equations.map(([result, constants]) => {
        const [first, ...rest] = constants;
        return isValid(result, first, rest);
    });
};

const getResult = async () => {
    const data = await readInput();
    const equations = data.map(getEquationComponents);
    return getValidEquations(equations).reduce(
        (tally, isValid, index) => tally + (isValid ? equations[index][0] : 0),
        0,
    );
};

getResult().then((tally) => {
    console.log(tally);
});

module.exports = {
    getResult,
};
