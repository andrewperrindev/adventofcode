const { openFile, readAsLines } = require('../utils/file-handler');

const A = 'A';
const B = 'B';
const C = 'C';

const readInput = async () => {
    const data = await openFile('inputs/program.example.txt', __dirname);

    return readAsLines(data);
};

const parseInput = (lines) => {
    const registers = {};

    let line = lines.shift();
    while (line !== '') {
        const [register, value] = line.split(': ');
        if (register.startsWith('Register')) {
            registers[register.at(-1)] = parseInt(value, 10);
        }
        line = lines.shift();
    }

    const [, programStr] = lines.shift().split(': ');
    return [registers, programStr.split(',').map((op) => parseInt(op, 10))];
};

const getComboOperandValue = (registers, operand) => {
    switch (operand) {
        case 0:
        case 1:
        case 2:
        case 3:
            return operand;
        case 4:
            return registers[A];
        case 5:
            return registers[B];
        case 6:
            return registers[C];
        case 7:
            throw new Error('Combo operand 7 not supported');
        default:
            throw new Error('Unexpected combo operand');
    }
};

const runProgram = (registers, program) => {
    const output = [];
    let pointer = 0;

    console.log(registers);
    console.log(program);

    while (pointer < program.length) {
        const instruction = program[pointer];
        const operand = program[pointer + 1];

        switch (instruction) {
            case 0:
            case 6:
            case 7: {
                const opToRegister = { 0: A, 6: B, 7: C };
                const numerator = registers[A];
                const denominator = getComboOperandValue(registers, operand);
                registers[opToRegister[instruction]] = Math.floor(numerator / 2 ** denominator);
                break;
            }
            case 1:
                registers[B] = registers[B] ^ operand;
                break;
            case 2:
                registers[B] = getComboOperandValue(registers, operand) % 8;
                break;
            case 3:
                if (registers[A] !== 0) {
                    pointer = operand - 2;
                }
                break;
            case 4:
                registers[B] = registers[B] ^ registers[C];
                break;
            case 5:
                output.push(getComboOperandValue(registers, operand) % 8);
                break;
        }

        pointer += 2;
    }

    return output.join(',');
};

const getResult = async () => {
    const data = await readInput();
    const [registers, program] = parseInput(data);
    return runProgram(registers, program);
};

if (!module.parent) {
    getResult().then(console.log);
}

module.exports = {
    getResult,
};
