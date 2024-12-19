const Direction = {
    UP: '^',
    DOWN: 'v',
    LEFT: '<',
    RIGHT: '>',
};

const stringToCoordinates = (string) => {
    return string.split(',').map((num) => parseInt(num, 10));
};

const isValidCoordinate = (coords, gridDimensions, xMin = 0, yMin = 0) => {
    const [x, y] = coords;
    const [length, height] = gridDimensions;
    const xMax = xMin + length;
    const yMax = yMin + height;

    return y >= yMin && y < yMax && x >= xMin && x < xMax;
};

const areEqual = ([x1, y1], [x2, y2]) => {
    return x1 === x2 && y1 === y2;
};

const upFrom = ([x, y]) => {
    return [x, y - 1];
};

const downFrom = ([x, y]) => {
    return [x, y + 1];
};

const leftFrom = ([x, y]) => {
    return [x - 1, y];
};

const rightFrom = ([x, y]) => {
    return [x + 1, y];
};

const upLeftFrom = ([x, y]) => {
    return [x - 1, y - 1];
};

const upRightFrom = ([x, y]) => {
    return [x + 1, y - 1];
};

const downLeftFrom = ([x, y]) => {
    return [x - 1, y + 1];
};

const downRightFrom = ([x, y]) => {
    return [x + 1, y + 1];
};

const directionFrom = (coords, direction) => {
    switch (direction) {
        case Direction.UP:
            return upFrom(coords);
        case Direction.DOWN:
            return downFrom(coords);
        case Direction.LEFT:
            return leftFrom(coords);
        case Direction.RIGHT:
            return rightFrom(coords);
        default:
            return undefined;
    }
};

const add = (coords, distance) => {
    const [x, y] = coords;
    const [distanceX, distanceY] = distance;

    return [x + distanceX, y + distanceY];
};

module.exports = {
    Direction,
    stringToCoordinates,
    isValidCoordinate,
    areEqual,
    upFrom,
    downFrom,
    leftFrom,
    rightFrom,
    upLeftFrom,
    upRightFrom,
    downLeftFrom,
    downRightFrom,
    directionFrom,
    add,
};
