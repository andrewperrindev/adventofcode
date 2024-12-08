const { openFile, readAsLines, parseLineAsMatrix } = require('../utils/file-handler');
const Matrix = require('../utils/matrix');

const LEFT = '<';
const RIGHT = '>';
const UP = '^';
const DOWN = 'V';

const readInput = async () => {
    const data = await openFile('inputs/guard.example.txt', __dirname);

    return readAsLines(data).map(parseLineAsMatrix);
};

const isPathBlocked = (map, direction) => {
    const [x, y] = map.getLocation();
    let newLocation;

    switch (direction) {
        case UP:
            newLocation = [x, y - 1];
            break;
        case DOWN:
            newLocation = [x, y + 1];
            break;
        case LEFT:
            newLocation = [x - 1, y];
            break;
        case RIGHT:
            newLocation = [x + 1, y];
            break;
        default:
            newLocation = [x, y];
    }

    return map.at(newLocation) === '#';
};

const turnRight = (direction) => {
    switch (direction) {
        case UP:
            return RIGHT;
        case DOWN:
            return LEFT;
        case LEFT:
            return UP;
        case RIGHT:
            return DOWN;
        default:
            return direction;
    }
};

const determinePath = (map) => {
    const location = map.findAnyOf([UP, DOWN, LEFT, RIGHT]);

    if (location) {
        let visited = [];
        let success = true;
        let direction = map.at(location);
        map.setLocation(location);

        while (success) {
            // `while` because there might be more than one obstacle next to this location.
            while (isPathBlocked(map, direction)) {
                direction = turnRight(direction);
            }

            // Keep track of previously visited locations -- both direction and coordinates.
            // Since the grid is static, if we revisit the exact same spot heading in the exact
            // same direction, then we're stuck in a loop.
            const prevVisited = visited.find((node) => {
                return (
                    node.direction === direction && node.location.toString() === map.getLocation().toString()
                );
            });
            if (prevVisited) {
                map.setLocationValue('*');
                return true;
            } else {
                visited.push({
                    direction: direction,
                    location: map.getLocation(),
                });
            }

            switch (direction) {
                case UP:
                    success = map.moveLocationUp();
                    break;
                case DOWN:
                    success = map.moveLocationDown();
                    break;
                case LEFT:
                    success = map.moveLocationLeft();
                    break;
                case RIGHT:
                    success = map.moveLocationRight();
                    break;
            }

            if (success) {
                map.setLocationValue('X');
            }
        }
    }

    return false;
};

// Given a list of coordinates, add an obstacle at each coordinate and
// check to see if the guard gets stuck in a loop.
//
// This is definitely slow. One way to speed it up would be to skip ahead
// to where the new obstacle is (since we already know the path up to that point).
const findCycles = (map, pathCoords) => {
    const cycleLocations = pathCoords.map((coords) => {
        const matrix = new Matrix(map);
        matrix.set(coords, '#');
        if (determinePath(matrix)) {
            return matrix.getLocation();
        }
    });

    return cycleLocations.filter((location) => !!location);
};

const getResult = async () => {
    const originalMap = await readInput();
    const matrix = new Matrix(originalMap);
    determinePath(matrix);
    const pathLocations = matrix.findAll('X');
    // Only need to pass in the guard's existing patrol path when looking for
    // cycles. Any other location & the guard would never encounter it anyway.
    const cycleLocations = findCycles(originalMap, pathLocations);
    return cycleLocations.length;
};

if (!module.parent) {
    getResult().then((result) => {
        console.log(result);
    });
}

module.exports = {
    getResult,
};
