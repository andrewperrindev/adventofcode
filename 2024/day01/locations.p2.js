const { openFile } = require('../utils/file-handler');

const processLine = (line) => {
    const numbers = line.split('   ');
    return numbers.map((number) => parseInt(number.trim(), 10));
};

const readInput = async () => {
    const data = await openFile('inputs/locations.example.txt', __dirname);

    const firstLocations = [];
    const secondLocations = {};
    data.split('\n').forEach((line) => {
        const [firstLocation, secondLocation] = processLine(line);

        firstLocations.push(firstLocation);

        const tally = secondLocations[secondLocation] || 0;
        secondLocations[secondLocation] = tally + 1;
    });

    return [firstLocations, secondLocations];
};

const computeSimilarity = ([firstLocations, secondLocations]) => {
    const scores = [];

    for (let index = 0; index < firstLocations.length; index++) {
        const location = firstLocations[index];
        const occurrances = secondLocations[location] || 0;
        scores.push(location * occurrances);
    }

    return scores;
};

const getResult = async () => {
    const locationLists = await readInput();
    const scores = computeSimilarity(locationLists);
    return scores.reduce((currentSum, score) => currentSum + score, 0);
};

getResult().then((result) => {
    console.log(result);
});

module.exports = {
    getResult,
};
