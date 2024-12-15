const { openFile, readAsLines } = require('../utils/file-handler');
const { stringToCoordinates } = require('../utils/coordinates');
const Matrix = require('../utils/matrix');
const Robot = require('./robot');

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const waitAsync = (prompt) => {
    return new Promise((resolve) => {
        rl.question(prompt, (answer) => {
            resolve(answer);
        });
    });
};

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

const tick = async (robots, seconds, showGrid) => {
    // It appears there is a cycle starting at 11 and repeating every 101 iterations
    // where the robots congregate along a single line. Noticing this, pause and print
    // out the grid at each of these iterations to see if a tree image is formed.
    //
    // I found this by observing the output, but there could be a way to automate by
    // looking for unusual groupings in the coordinates.
    // Could be an interesting future extension of this exercise.
    let stop = 11;

    for (let i = 0; i < seconds; i++) {
        robots.map((r) => r.tick());

        if (i === stop && showGrid) {
            stop += 101;
            console.clear();
            createMatrix(robots, 101, 103).plot();
            console.log(i);

            await waitAsync('Press ENTER key to continue...');
        }
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

const createMatrix = (robots, length, height) => {
    const data = Array(height).fill(Array(length).fill('.'));
    const matrix = new Matrix(data);
    robots.forEach((robot) => {
        matrix.set(robot.position, 'X');
    });
    return matrix;
};

const getResult = async (type = 'example', width = 11, height = 7, seconds = 8100, showGrid = false) => {
    const data = await readInput(type);
    const robots = createRobots(data, width, height);
    await tick(robots, seconds, showGrid);
    rl.close();
    return getQuadrantCounts(robots).reduce((tally, count) => tally * count, 1);
};

if (!module.parent) {
    getResult('input', 101, 103, 6800, true).then(console.log);
}

module.exports = {
    getResult,
};
