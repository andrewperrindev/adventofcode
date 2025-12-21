const { openFile, readAsLines } = require('../utils/file-handler');

const readInput = async () => {
    const data = await openFile('inputs/devices.input.txt', __dirname);

    return readAsLines(data);
};

const processLine = (line) => {
    const [device, connections] = line.split(':');

    return { [device]: connections.trim().split(' ') };
};

const findPathCount = (deviceMap, start, end, cache = {}) => {
    if (start === end) {
        return 1;
    } else if (cache[start] >= 0) {
        return cache[start];
    } else {
        let count = 0;
        const connections = deviceMap[start];

        if (!connections) {
            return 0;
        }

        for (const connection of connections) {
            count += findPathCount(deviceMap, connection, end, cache);
        }
        cache[start] = count;
        return count;
    }
}

const getResult = async () => {
    const lines = await readInput();
    const deviceMap = lines.reduce((devices, line) => Object.assign(devices, processLine(line)), {});

    // Paths MUST pass through a 'dac' and an 'fft' device in any order. While we could enforce that in the recursive function,
    // it's more diffiult to memoize the results. Instead, we can break this down into 3 parts:
    // 1. From 'svr' to 'dac'
    // 2. From 'dac' to 'fft'
    // 3. From 'fft' to 'out'
    // We then multiply these together to get the total number of paths that pass through both 'dac' and 'fft'.
    // We also need to consider the case where the path goes from 'svr' to 'fft' to 'dac' to 'out', so we calculate that as well.
    // tl;dr: while this looks like a lot, the combination of recursion + memoization allows it to run pretty quickly.
    const forwards = findPathCount(deviceMap, 'svr', 'dac') * findPathCount(deviceMap, 'dac', 'fft') * findPathCount(deviceMap, 'fft', 'out');
    const inverse = findPathCount(deviceMap, 'svr', 'fft') * findPathCount(deviceMap, 'fft', 'dac') * findPathCount(deviceMap, 'dac', 'out');

    return forwards + inverse;
};

getResult().then((result) => {
    console.log(result);
});

module.exports = {
    getResult,
};
