const { openFile, readAsLines, parseLineAsMatrix } = require('../utils/file-handler');
const Maze = require('../utils/maze');

const readInput = async (type) => {
    const data = await openFile(`inputs/race.${type}.txt`, __dirname);

    return readAsLines(data).map(parseLineAsMatrix);
};

const calculateShortcuts = (maze, path) => {
    const stats = {};
    const foundCheats = new Set();

    // For each move along the path, find possible cheat moves.
    for (let move = 0; move < path.length; move++) {
        [Maze.UP, Maze.DOWN, Maze.LEFT, Maze.RIGHT].forEach((direction) => {
            const cheat1 = maze.directionFrom(path[move], direction);
            const cheat2 = maze.directionFrom(cheat1, direction);

            // A cheat must pass through a wall, meaning the first coordinate
            // must be a wall and the second must be an open space.
            if (
                !foundCheats.has(cheat1.toString()) &&
                maze.isFixedSpace(cheat1) &&
                maze.isFreeSpace(cheat2)
            ) {
                foundCheats.add(cheat1.toString());
                const found_index = path.findIndex((coord) => coord.toString() === cheat2.toString());

                // `diff` is the number of steps (aka picoseconds) that we save by using this cheat.
                // We have to subtract 2 though, since we waste 2 picoseconds executing the cheat maneuver.
                const diff = Math.abs(move - found_index) - 2;

                // Keep track of how many cheats save this number of steps/picoseconds.
                const tally = stats[diff] || 0;
                stats[diff] = tally + 1;
            }
        });
    }

    return stats;
};

const getResult = async (type = 'example', minPs = 1) => {
    const data = await readInput(type);
    const maze = new Maze(data, 'S', 'E');
    const [, path] = maze.getOptimalPath(Maze.DOWN);

    const stats = calculateShortcuts(maze, path);
    return Object.keys(stats).reduce((tally, ps) => tally + (ps >= minPs ? stats[ps] : 0), 0);
};

if (!module.parent) {
    getResult('input', 100).then(console.log);
}

module.exports = {
    getResult,
};
