const { Direction, directionFrom } = require('./coordinates');

/**
 *
 * @param {Array} start Grid coordinates for the start location
 * @param {string} direction Initial direction of travel
 * @param {Array} goal Grid coordinates for the end location
 * @param {Function} isValidFn Function that returns true if the given coordinate is valid
 * @param {Function} keyFn Function that returns a string key for tracking nodes
 * @param {Function} distanceFn Function that returns the distance between two coordinates
 * @param {number} targetDistance (optional) Return all paths for a specific distance value
 * @returns {Array} The shortest distance & paths
 */
const dijkstra = (start, direction, goal, isValidFn, keyFn, distanceFn, targetDistance = -1) => {
    let shortestDistance = Infinity;
    let finalPaths = [];

    // Create an object to store the shortest distance from the start node to every other node
    let distances = {};

    // A set to keep track of all visited nodes
    let visited = new Set();

    // Initialize node list to the start node
    const nodes = [[start, direction, 0, [start]]];

    // The distance from the start node to itself is 0
    distances[keyFn(start, direction)] = 0;

    // Loop until all nodes are visited
    while (nodes.length) {
        // Sort nodes by distance and pick the closest unvisited node
        nodes.sort((a, b) => a[2] - b[2]);

        const [closestNode, currDirection, currDistance, currPath] = nodes.shift();
        const key = keyFn(closestNode, currDirection);

        // Mark the chosen node as visited
        visited.add(key);

        // If we're only looking for paths of a certain distance, skip the
        // current node if we're already over the target.
        if (targetDistance >= 0 && currDistance > targetDistance) {
            continue;
        }

        // Check if the goal is reached
        if (closestNode.toString() === goal.toString() && currDistance <= shortestDistance) {
            finalPaths.push(currPath);
            shortestDistance = currDistance;
        }

        // For each neighboring node of the current node
        [Direction.DOWN, Direction.UP, Direction.LEFT, Direction.RIGHT].forEach((newDirection) => {
            const newNode = directionFrom(closestNode, newDirection);
            const newKey = keyFn(newNode, newDirection);

            if (isValidFn(newNode) && !visited.has(newKey)) {
                const newTotalDistance =
                    currDistance + distanceFn(currDirection, closestNode, newNode, currPath);
                const newNodeDistance = distances[newKey] ?? Infinity;
                if (newTotalDistance < newNodeDistance) {
                    nodes.push([newNode, newDirection, newTotalDistance, [...currPath, newNode]]);

                    // Don't log distances if we already know our target distance.
                    // This allows us to find all paths matching the target.
                    if (targetDistance < 0) {
                        distances[newKey] = newTotalDistance;
                    }
                }
            }
        });
    }

    // Return the shortest distance from the start node to the goal.
    // Return all possible paths if we specified a target distance.
    const paths = targetDistance >= 0 ? finalPaths : finalPaths.at(0);
    return [shortestDistance, paths];
};

module.exports = { dijkstra };
