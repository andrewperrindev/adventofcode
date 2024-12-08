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
        let success = true;
        map.setLocation(location);
        let direction = map.at(location);

        while (success) {
            // `while` because there might be more than one obstacle next to this location.
            while (isPathBlocked(map, direction)) {
                direction = turnRight(direction);
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

    return map;
};

const getResult = async () => {
    const matrix = new Matrix(await readInput());
    determinePath(matrix);
    return matrix.findAll('X').length;
};

if (!module.parent) {
    getResult().then((result) => {
        console.log(result);
    });
}

module.exports = {
    readInput,
    getResult,
};
