const { openFile, readAsLines } = require('../utils/file-handler');
const Region = require('../utils/region');

const readInput = async () => {
    const data = await openFile('inputs/theater.example.txt', __dirname);

    return readAsLines(data);
};

const findLargestRegion = (coordList) => {
    let largestRegion = null;

    for (let i = 0; i < coordList.length; i++) {
        for (let j = i + 1; j < coordList.length; j++) {
            const region = Region.areaFromOppositeCorners(coordList[i], coordList[j]);

            if (!largestRegion || region > largestRegion) {
                largestRegion = region;
            }
        }
    }

    return largestRegion;
}

const getResult = async () => {
    const lines = await readInput();
    const largestRegion = findLargestRegion(lines);
    return largestRegion;
};

getResult().then((result) => {
    console.log(result);
});

module.exports = {
    getResult,
};
