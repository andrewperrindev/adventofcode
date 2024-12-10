const { openFile, readAsLines, parseLineAsNumbers } = require('../utils/file-handler');
const Filesystem = require('./filesystem/Filesystem');

const readInput = async () => {
    const data = await openFile('inputs/defrag.example.txt', __dirname);

    return readAsLines(data).map((line) => parseLineAsNumbers(line, ''));
};

const isFragmented = (fs) => {
    return fs.freeSpaceCount > 1 || !isLastSpaceFree(fs);
};

const isLastSpaceFree = (fs) => {
    return fs.at(-1).isFree;
};

const getFirstFreeSpace = (fs) => {
    return fs.findIndex((item) => item.isFree);
};

const getLastFile = (fs) => {
    return fs.findLastIndex((item) => !item.isFree);
};

const defrag = (fs) => {
    while (isFragmented(fs)) {
        fs.move(getLastFile(fs), getFirstFreeSpace(fs));
        fs.compact();
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
