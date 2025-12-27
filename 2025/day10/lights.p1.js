const { openFile, readAsLines } = require('../utils/file-handler');

const readInput = async () => {
    const data = await openFile('inputs/lights.example.txt', __dirname);

    return readAsLines(data);
};

const processLine = (line) => {
    const sections = line.split(' ');

    let lights, joltage;
    let buttons = [];

    for (let i = 0; i < sections.length; i++) {
        const section = sections[i];

        if (section[0] === '[') {
            lights = section.substring(1, section.length - 1).split('').map((str) => str === '.' ? 0 : 1);
        } else if (section[0] === '(') {
            buttons.push(section.substring(1, section.length - 1).split(',').map((num) => parseInt(num, 10)));
        } else if (section[0] === '{') {
            joltage = section.substring(1, section.length - 1).split(',').map((num) => parseInt(num, 10));
        }
    }

    return {
        lights,
        buttons,
        joltage,
    };
};

const buttonToMask = (button, numLights) => {
    let mask = Array(numLights).fill(0);

    for (const pos of button) {
        mask[pos] = 1;
    }

    return mask;
};

const xor = (val1, val2) => {
    if (val1 !== val2) {
        return 1;
    }

    return 0;
};

const minPresses = (targetMask, buttons) => {
    const n = targetMask.length;
    const startMask = Array(n).fill(0);

    const targetKey = targetMask.join('');
    const startKey = startMask.join('');

    if (startKey === targetKey) {
        return 0;
    }

    // Use simple BFS.
    // Use string keys for BFS bookkeeping.
    const distance = {};
    distance[startKey] = 0;

    const queue = [startMask];

    while (queue.length > 0) {
        const currentMask = queue.shift();
        const currentKey = currentMask.join('');
        const currentDistance = distance[currentKey];

        for (const button of buttons) {
            // copy the current state so we don't introduce side effects
            const nextMask = currentMask.slice();

            for (let i = 0; i < n; i++) {
                // We only apply the button state if it activates this light
                // (i.e. the button is set to 1 in this position)
                if (button[i] === 1) {
                    nextMask[i] = xor(nextMask[i], 1);
                }
            }

            const nextKey = nextMask.join('');

            if (nextKey === targetKey) {
                return currentDistance + 1;
            }

            if (distance[nextKey] === undefined) {
                distance[nextKey] = currentDistance + 1;
                queue.push(nextMask);
            }
        }
    }

    return -1;
};

const getResult = async () => {
    const lines = await readInput();
    const processed = lines.map(processLine);

    const total = processed.reduce((sum, { lights, buttons }) => {
        const numLights = lights.length;
        const buttonMasks = buttons.map((button) => buttonToMask(button, numLights));

        return sum + minPresses(lights, buttonMasks);
    }, 0);

    return total;
};

getResult().then((result) => {
    console.log(result);
});

module.exports = {
    getResult,
};
