const { openFile } = require('../utils/file-handler');

const processLine = (line) => {
    const numbers = line.split('   ');
    return numbers.map((number) => parseInt(number.trim(), 10));
};

const sortedIndex = (array, value) => {
    var low = 0,
        high = array.length;

    while (low < high) {
        var mid = (low + high) >>> 1;
        if (array[mid] < value) low = mid + 1;
        else high = mid;
    }
    return low;
};

const readInput = async () => {
    const data = await openFile('inputs/locations.example.txt', __dirname);

    const firstLocations = [];
    const secondLocations = [];
    data.split('\n').forEach((line) => {
        const [firstLocation, secondLocation] = processLine(line);

        const firstIndex = sortedIndex(firstLocations, firstLocation);
        firstLocations.splice(firstIndex, 0, firstLocation);

        const secondIndex = sortedIndex(secondLocations, secondLocation);
        secondLocations.splice(secondIndex, 0, secondLocation);
    });

    return [firstLocations, secondLocations];
};

const computeDiffs = ([firstLocations, secondLocations]) => {
    const diffs = [];

    for (let index = 0; index < firstLocations.length; index++) {
        diffs.push(Math.abs(firstLocations[index] - secondLocations[index]));
    }

    return diffs;
};

const getResult = async () => {
    const locationLists = await readInput();
    const diffs = computeDiffs(locationLists);
    return diffs.reduce((currentSum, diff) => currentSum + diff, 0);
};

getResult().then((result) => {
    console.log(result);
});

module.exports = {
    getResult,
};
