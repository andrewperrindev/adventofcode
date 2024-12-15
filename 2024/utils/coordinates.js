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

const add = (coords, distance) => {
    const [x, y] = coords;
    const [distanceX, distanceY] = distance;

    return [x + distanceX, y + distanceY];
};

module.exports = {
    stringToCoordinates,
    isValidCoordinate,
    upFrom,
    downFrom,
    leftFrom,
    rightFrom,
    upLeftFrom,
    upRightFrom,
    downLeftFrom,
    downRightFrom,
    add,
};
