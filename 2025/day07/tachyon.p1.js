const { openFile, readAsLines, parseLineAsMatrix } = require('../utils/file-handler');
const Matrix = require('../utils/matrix');
const { areEqual } = require('../utils/coordinates');

const readInput = async () => {
    const data = await openFile('inputs/tachyon.example.txt', __dirname);

    return readAsLines(data).map(parseLineAsMatrix);
};

const countAllTargets = (grid) => {
    let targetsHit = [];
    let coordQueue = [grid.find('S')];

    while (coordQueue.length > 0) {
        grid.setLocation(coordQueue.shift());

        if (grid.atLocation() === '|') {
            continue;
        } else if (grid.atLocation() !== 'S') {
            grid.setLocationValue('|');
        }

        while (grid.moveLocationDown()) {
            let currentCoords = grid.getLocation();
            if (grid.isFixedSpace(currentCoords)) {
                if (!targetsHit.find((coords) => areEqual(coords, currentCoords))) {
                    targetsHit.push(currentCoords);
                }
                if (grid.isFreeSpace(grid.rightFrom(currentCoords))) {
                    coordQueue.push(grid.rightFrom(currentCoords));
                }
                if (grid.isFreeSpace(grid.leftFrom(currentCoords))) {
                    grid.moveLocationLeft();
                    grid.setLocationValue('|');
                } else {
                    break;
                }
            } else {
                grid.setLocationValue('|');
            }
        }
    }

    return targetsHit.length;
}

const getResult = async () => {
    const data = await readInput();
    const grid = new Matrix(data);
    grid.fixedSpaceChars = ['^'];

    return countAllTargets(grid);
}

getResult().then((result) => {
    console.log(result);
});

module.exports = {
    getResult,
};
