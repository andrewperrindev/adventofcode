const { openFile, readAsLines } = require('../utils/file-handler');

const readInput = async () => {
    const data = await openFile('inputs/devices.p1.example.txt', __dirname);

    return readAsLines(data);
};

const processLine = (line) => {
    const [device, connections] = line.split(':');

    return { [device]: connections.trim().split(' ') };
};

const findPathCount = (deviceMap, start, end) => {
    let count = 0;

    const path = [start];

    while (path.length > 0) {
        const current = path.shift();

        if (current === end) {
            count++;
        } else {
            const connections = deviceMap[current];
            for (const connection of connections) {
                path.push(connection);
            }
        }
    }

    return count;
}

const getResult = async () => {
    const lines = await readInput();
    const deviceMap = lines.reduce((devices, line) => Object.assign(devices, processLine(line)), {});

    return findPathCount(deviceMap, 'you', 'out');
};

getResult().then((result) => {
    console.log(result);
});

module.exports = {
    getResult,
};
