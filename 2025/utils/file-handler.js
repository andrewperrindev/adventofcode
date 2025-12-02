const fs = require('fs/promises');
const path = require('path');
const process = require('process');

const pathOptions = [__dirname, process.cwd()];

const openFileAtPath = async (filePath) => {
    return fs.readFile(filePath, { encoding: 'utf-8' });
};

const openFile = async (fileName, basePath = null) => {
    let data;
    let pathIndex = 0;

    if (basePath) {
        pathOptions.push(basePath);
    }

    while (pathIndex < pathOptions.length && !data) {
        const filePath = path.join(pathOptions[pathIndex], fileName);

        try {
            data = await openFileAtPath(filePath);

            console.log(`file-handler.js | openFile | Successfully opened ${filePath}`);
        } catch (ex) {
            console.warn(`file-handler.js | openFile | File not found at ${filePath}: ${ex}`);
        }

        pathIndex++;
    }

    if (!data) {
        throw new Error(`Unable to locate or open ${fileName}`);
    }

    return data;
};

const openJsonFile = async (fileName) => {
    let result;
    const data = await openFile(fileName);

    try {
        result = JSON.parse(data);
    } catch (ex) {
        throw new Error(`Unable to parse JSON in file ${fileName}: ${ex}`);
    }

    return result;
};

const writeFileAsJson = async (fileName, data) => {
    return fs.writeFile(path.join(pathOptions[0], fileName), JSON.stringify(data, null, 4));
};

const truncateTrailingLines = (lines) => {
    while (lines.at(lines.length - 1).trim() === '') {
        lines.pop();
    }

    return lines;
};

const readAsLines = (data) => {
    return truncateTrailingLines(data.split('\n')).map((line) => line.trim());
};

const parseLineAsMatrix = (line) => {
    return [...line];
};

const parseLineAsNumbers = (line, separator = /\s+/) => {
    const numbers = line.trim().split(separator);
    return numbers.map((number) => parseInt(number.trim(), 10));
};

module.exports = {
    openFile,
    openFileAtPath,
    openJsonFile,
    writeFileAsJson,
    readAsLines,
    parseLineAsMatrix,
    parseLineAsNumbers,
};
