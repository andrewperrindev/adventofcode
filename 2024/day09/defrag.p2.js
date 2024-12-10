const { openFile, readAsLines, parseLineAsNumbers } = require('../utils/file-handler');
const Filesystem = require('./filesystem/Filesystem');

const readInput = async () => {
    const data = await openFile('inputs/defrag.example.txt', __dirname);

    return readAsLines(data).map((line) => parseLineAsNumbers(line, ''));
};

const getFirstFreeSpaceWithMinSize = (fs, minSize) => {
    return fs.findIndex((item) => item.isFree && item.blocks >= minSize);
};

const getLastFile = (fs) => {
    return fs.findLastIndex((item) => !item.isFree);
};

const getFileWithId = (fs, id) => {
    return fs.findIndex((item) => !item.isFree && item.id === id);
};

const defrag = (fs) => {
    let fileId = fs.at(getLastFile(fs)).id;

    for (; fileId >= 0; fileId--) {
        const fileIndex = getFileWithId(fs, fileId);
        const freeIndex = getFirstFreeSpaceWithMinSize(fs, fs.at(fileIndex).blocks);
        if (fileIndex >= 0 && freeIndex >= 0 && freeIndex < fileIndex) {
            fs.move(fileIndex, freeIndex);
            fs.compact();
        }
    }
};

const getResult = async () => {
    const [data] = await readInput();
    const fs = new Filesystem(data);
    defrag(fs);
    return fs.checksum;
};

if (!module.parent) {
    getResult().then(console.log);
}

module.exports = {
    getResult,
};
