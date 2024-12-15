const { openFile, readAsLines } = require('../utils/file-handler');
const { stringToCoordinates } = require('../utils/coordinates');
const Robot = require('./robot');

const readInput = async (type = 'example') => {
    const data = await openFile(`inputs/robots.${type}.txt`, __dirname);

    return readAsLines(data);
};

const createRobots = (inputLines, xMax, yMax) => {
    return inputLines.map((line) => {
        const [positionStr, velocityStr] = line.split(/\s+/);

        const [, posCoordStr] = positionStr.split('=');
        const [, velCoordStr] = velocityStr.split('=');

        return new Robot(stringToCoordinates(posCoordStr), stringToCoordinates(velCoordStr), xMax, yMax);
    });
};

const tick = (robots, seconds) => {
    for (let i = 0; i < seconds; i++) {
        robots.map((r) => r.tick());
    }

    return robots;
};

const getQuadrantCounts = (robots) => {
    let [nw, ne, sw, se] = [0, 0, 0, 0];

    robots.forEach((robot) => {
        nw += robot.inNorthwestQuadrant() ? 1 : 0;
        ne += robot.inNortheastQuadrant() ? 1 : 0;
        sw += robot.inSouthwestQuadrant() ? 1 : 0;
        se += robot.inSoutheastQuadrant() ? 1 : 0;
    });

    return [nw, ne, sw, se];
};

const getResult = async (type = 'example', width = 11, height = 7, seconds = 100) => {
    const data = await readInput(type);
    const robots = createRobots(data, width, height);
    tick(robots, seconds);
    return getQuadrantCounts(robots).reduce((tally, count) => tally * count, 1);
};

if (!module.parent) {
    getResult('input', 101, 103, 100).then(console.log);
}

module.exports = {
    getResult,
};
