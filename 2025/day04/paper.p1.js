const { openFile, readAsLines, parseLineAsMatrix } = require('../utils/file-handler');
const Matrix = require('../utils/matrix');

const readInput = async () => {
    const data = await openFile('inputs/paper.example.txt', __dirname);

    return readAsLines(data).map(parseLineAsMatrix);
};

const isAccessible = (coords, grid) => {
    let nearbyRolls = 0;

    if (grid.isFixedSpace(grid.leftFrom(coords))) {
        nearbyRolls += 1;
    }
    if (grid.isFixedSpace(grid.rightFrom(coords))) {
        nearbyRolls += 1;
    }

    let nearbyCoords = grid.upFrom(coords);

    if (nearbyCoords) {
        if (grid.isFixedSpace(nearbyCoords)) {
            nearbyRolls += 1;
        }
        if (grid.isFixedSpace(grid.rightFrom(nearbyCoords))) {
            nearbyRolls += 1;
        }
        if (grid.isFixedSpace(grid.leftFrom(nearbyCoords))) {
            nearbyRolls += 1;
        }
    }

    nearbyCoords = grid.downFrom(coords);

    if (nearbyCoords) {
        if (grid.isFixedSpace(nearbyCoords)) {
            nearbyRolls += 1;
        }
        if (grid.isFixedSpace(grid.rightFrom(nearbyCoords))) {
            nearbyRolls += 1;
        }
        if (grid.isFixedSpace(grid.leftFrom(nearbyCoords))) {
            nearbyRolls += 1;
        }
    }

    return nearbyRolls < 4;
};

const getResult = async () => {
    const data = await readInput();
    const grid = new Matrix(data);
    grid.fixedSpaceChars = ['@'];
    let tally = 0;

    for (let y = 0; y < grid.height; y++) {
        let coords = [0, y];

        while(coords) {
            if (grid.isFixedSpace(coords)) {
                if (isAccessible(coords, grid)) {
                    tally += 1;
                }
            }
            coords = grid.rightFrom(coords);
        }
    }

    return tally;
};

getResult().then((result) => {
    console.log(result);
});

module.exports = {
    getResult,
};
