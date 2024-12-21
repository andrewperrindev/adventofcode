const { openFile, readAsLines, parseLineAsMatrix } = require('../utils/file-handler');
const { manhattanDistance } = require('../utils/coordinates');
const Maze = require('../utils/maze');

const readInput = async (type) => {
    const data = await openFile(`inputs/race.${type}.txt`, __dirname);

    return readAsLines(data).map(parseLineAsMatrix);
};

const buildCoordinateToIndex = (path) => {
    return path.reduce((obj, coords, index) => {
        obj[coords] = index;
        return obj;
    }, {});
};

const getNearbyCoordinates = (maze, coords, distance) => {
    const [x, y] = coords;
    const validNearby = [];

    for (let dis = 2; dis <= distance; dis++) {
        for (let offset = 1; offset <= dis; offset++) {
            const inverse = dis - offset;
            const se = [x + offset, y + inverse];
            const ne = [x + inverse, y - offset];
            const nw = [x - offset, y - inverse];
            const sw = [x - inverse, y + offset];

            [se, ne, nw, sw].forEach((nearby) => {
                if (maze.isFreeSpace(nearby)) {
                    validNearby.push(nearby);
                }
            });
        }
    }

    return validNearby;
};

const calculateShortcuts = (maze, path, lookup) => {
    const stats = {};
    const foundCheats = new Set();

    // For each move along the path, find possible cheat moves.
    for (let move = 0; move < path.length; move++) {
        // This time, we have 20 steps/picoseconds to work with, vastly expanding our options.
        // Compile a list of all nearby open coordinates that can be reached from this spot.
        getNearbyCoordinates(maze, path[move], 20).forEach((cheat) => {
            const key = `${path[move]}-${cheat}`;

            if (!foundCheats.has(key)) {
                foundCheats.add(key);
                foundCheats.add(key.split('-').reverse().join('-')); // `${cheat}-${path[move]}`
                const found_index = lookup[cheat];

                // `diff` is the number of steps (aka picoseconds) that we save by using this cheat.
                // This time the cheat can waste any number of steps/picoseconds up to 20.
                const diff = Math.abs(move - found_index) - manhattanDistance(path[move], cheat);

                // Keep track of how many cheats save this number of steps/picoseconds.
                const tally = stats[diff] || 0;
                stats[diff] = tally + 1;
            }
        });
    }

    return stats;
};

const getResult = async (type = 'example', minPs = 50) => {
    const data = await readInput(type);
    const maze = new Maze(data, 'S', 'E');
    const [, path] = maze.getOptimalPath(Maze.DOWN);

    // Shave off a bit of run time by creating a reverse lookup of coordinates to
    // location on the path.
    const lookup = buildCoordinateToIndex(path);

    const stats = calculateShortcuts(maze, path, lookup);
    return Object.keys(stats).reduce((tally, ps) => tally + (ps >= minPs ? stats[ps] : 0), 0);
};

if (!module.parent) {
    getResult('input', 100).then(console.log);
}

module.exports = {
    getResult,
};
