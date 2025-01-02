const { openFile, readAsLines } = require('../utils/file-handler');

const START_INPUTS = ['x00', 'y00'];
const FIRST_OUTPUT = 'z00';
const AND = 'AND';
const OR = 'OR';
const XOR = 'XOR';

const readInput = async (type) => {
    const data = await openFile(`inputs/gates.${type}.txt`, __dirname);

    return readAsLines(data);
};

const parseState = (input) => {
    const state = {};
    let line = input.shift();

    while (line !== '') {
        const [register, value] = line.split(': ');
        state[register] = parseInt(value, 10);
        line = input.shift();
    }

    return state;
};

const isInputBit = (bit) => {
    return ['x', 'y'].includes(bit[0]) || ['x', 'y'].includes(bit[0]);
};

const isStartInput = (bit) => {
    return START_INPUTS.includes(bit);
};

const isFinalOutput = (bit) => {
    return bit.startsWith('z');
};

const parseCommandLine = (line) => {
    const [command, out] = line.split(' -> ');
    const [in1, gate, in2] = command.split(' ');
    return [in1, in2, gate, out];
};

const getMaxOutput = (commandLines) => {
    return commandLines.reduce((max, line) => {
        const [, , , out] = parseCommandLine(line);
        const maxNum = parseInt(max.substring(1), 10);

        if (isFinalOutput(out)) {
            const lineNum = parseInt(out.substring(1), 10);
            if (lineNum > maxNum) {
                return out;
            }
        }

        return max;
    }, FIRST_OUTPUT);
};

const gateExistsWithInput = (lines, gate, input) => {
    return lines.some((line) => {
        const [nextIn1, nextIn2, nextGate] = parseCommandLine(line);
        return (input === nextIn1 || input === nextIn2) && nextGate === gate;
    });
};

// The problem space might be small enough that this could be bruteforced, but
// it didn't feel ike that was the right solution. After some research, I found that
// this type of binary adder simulates a [Ripple-carry adder](https://en.wikipedia.org/wiki/Adder_(electronics)#Ripple-carry_adder).
// This function runs through a series of rules, checking for scenarios that should
// never happen in a correctly implemented Ripple-carry adder.
const findBadCommands = (commandLines) => {
    const badOuts = [];
    const lastBit = getMaxOutput(commandLines);

    for (let commandLine of commandLines) {
        const [in1, in2, gate, out] = parseCommandLine(commandLine);

        // Rule 1: if the output of a gate is z, then the operation has to be XOR unless it is the last bit.
        if (gate !== XOR && isFinalOutput(out) && out !== lastBit) {
            badOuts.push(out);
        } else if (gate === XOR) {
            // Rule 2: if the output of a gate is not z and the inputs are not x, y then it has to be AND / OR, but not XOR.
            if (!isFinalOutput(out) && !isInputBit(in1) && !isInputBit(in2)) {
                badOuts.push(out);
            } else if (isInputBit(in1) && isInputBit(in2) && out !== FIRST_OUTPUT) {
                // Rule 3: if there is a XOR gate with inputs x, y, and its output isn't the first
                // output bit, then there must be another XOR gate with this gate as an input.
                // Search through all gates for an XOR gate with this gate as an input;
                // if it doesn't exist, this XOR gate is faulty.
                if (!gateExistsWithInput(commandLines, XOR, out)) {
                    badOuts.push(out);
                }
            }
        } else if (gate === AND && !isStartInput(in1) && !isStartInput(in2)) {
            // Rule 4: if there is an AND gate, and its inputs aren't the first set of inputs, then
            // there must be an OR gate with this gate as an input. Search through all gates for an
            // OR gate with this gate as an input; if it doesn't exist, this AND gate is faulty.
            if (!gateExistsWithInput(commandLines, OR, out)) {
                badOuts.push(out);
            }
        }
    }

    return badOuts.sort();
};

const getResult = async (type = 'example') => {
    const data = await readInput(type);
    parseState(data); // Discard state.
    const result = findBadCommands(data);

    return result.join(',');
};

if (!module.parent) {
    getResult('input').then(console.log);
}

module.exports = {
    getResult,
};
