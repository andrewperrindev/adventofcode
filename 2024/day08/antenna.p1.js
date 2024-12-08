const { openFile, readAsLines, parseLineAsMatrix } = require('../utils/file-handler');
const Matrix = require('../utils/matrix');

const stringToLocation = (string) => string.split(',').map((num) => parseInt(num, 10));

const readInput = async () => {
    const data = await openFile('inputs/antenna.example.txt', __dirname);

    return readAsLines(data).map(parseLineAsMatrix);
};

/**
 * Given a specific antenna symbol, find all connections between the antenna nodes.
 *
 * @param {string} type Antenna symbol (letter or digit)
 * @param {Matrix} grid Full grid with antenna locations
 * @returns {object} Map where the key is an antenna location, and the value is an array
 * of all other antenna locations connected to it.
 */
const getAntennaConnectionsForType = (type, grid) => {
    const connections = {};

    // Iterate over the list of all locations for an antenna type.
    // An antenna's connections include every location to its right in the list.
    // This avoids duplicate connections for the inverse direction.
    grid.findAll(type).forEach((location) => {
        Object.keys(connections).forEach((key) => connections[key].push(location));
        connections[location] = [];
    });

    return connections;
};

/**
 * Given the locations of two antenna, find the two antinodes.
 * An antinode is located the same distance from an antenna as the two antenna locations.
 *
 * @param {Array} locationA
 * @param {Array} locationB
 * @param {Matrix} grid
 */
const getAntiNodesForPair = (locationA, locationB, grid) => {
    // Get the distance we need to move from each antenna location in order
    // to find the antinode locations.
    const distance = grid.distanceBetween(locationA, locationB);
    const reverseDistance = distance.map((num) => -num);

    // Calculate the new locations. `coordinateAdd` returns undefined if the
    // resulting coordinates are outside the bounds of the grid.
    const antiNodeA = grid.coordinateAdd(locationA, reverseDistance);
    const antiNodeB = grid.coordinateAdd(locationB, distance);

    return [antiNodeA, antiNodeB].filter((node) => !!node);
};

const getResult = async () => {
    const data = await readInput();
    const grid = new Matrix(data);
    const result = new Set();

    grid.getCharactersInMatrix().forEach((char) => {
        if (char !== '.') {
            const connections = getAntennaConnectionsForType(char, grid);

            // For each pair of antennas (`locationA` & `locationB`), find both
            // antinodes. Convert the antinode locations to strings so we can build
            // a unique set of locations.
            Object.keys(connections).forEach((locationAStr) => {
                const locationA = stringToLocation(locationAStr);
                const antiNodes = connections[locationAStr].map((locationB) =>
                    getAntiNodesForPair(locationA, locationB, grid).map(String),
                );
                antiNodes.flat().map(result.add, result);
            });
        }
    });

    return result.size;
};

if (!module.parent) {
    getResult().then(console.log);
}

module.exports = {
    getResult,
};
