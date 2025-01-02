const { openFile, readAsLines } = require('../utils/file-handler');

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

const processCommands = (commands, state) => {
    let line = commands.shift();

    while (line) {
        const [command, out] = line.split(' -> ');

        const [in1, gate, in2] = command.split(' ');

        if ([state[in1], state[in2]].includes(undefined)) {
            commands.push(line);
        } else {
            switch (gate) {
                case AND:
                    state[out] = state[in1] && state[in2] ? 1 : 0;
                    break;
                case OR:
                    state[out] = state[in1] || state[in2] ? 1 : 0;
                    break;
                case XOR:
                    state[out] = state[in1] !== state[in2] ? 1 : 0;
            }
        }

        line = commands.shift();
    }
};

const getResult = async (type = 'example') => {
    const data = await readInput(type);
    const state = parseState(data);
    processCommands(data, state);
    const binaryResult = Object.keys(state)
        .filter((key) => key.startsWith('z'))
        .sort()
        .map((key) => state[key])
        .reverse()
        .join('');

    return parseInt(binaryResult, 2);
};

if (!module.parent) {
    getResult('input').then(console.log);
}

module.exports = {
    getResult,
};
