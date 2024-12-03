const fs = require('fs/promises');
const path = require('path');
const process = require('process');

const pathOptions = [
    __dirname,
    process.cwd(),
];

const openFileAtPath = async (filePath) => {
    return fs.readFile(filePath, {encoding: 'utf-8'});
};

const openFile = async (fileName) => {
    let data;
    let pathIndex = 0;

    while (pathIndex < pathOptions.length && !data) {
        const filePath = path.join(pathOptions[pathIndex], fileName);

        try {
            data = await openFileAtPath(filePath);

            console.log(
                `file-handler.js | openFile | Successfully opened ${filePath}`,
            );
        } catch (ex) {
            console.warn(
                `file-handler.js | openFile | File not found at ${filePath}`,
            );
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
        throw new Error(`Unable to parse JSON in file ${fileName}`);
    }

    return result;
};

const writeFileAsJson = async (fileName, data) => {
    const basePath = app.isPackaged ? pathOptions[0] : pathOptions[1];

    return fs.writeFile(
        path.join(basePath, fileName),
        JSON.stringify(data, null, 4),
    );
};

const readAsLines = (data) => {
    return data.split('\n').map((line) => line.trim()).filter((line) => line.length > 0);
};

const parseLineAsNumbers = (line) => {
    const numbers = line.split(/\s+/);
    return numbers.map((number) => parseInt(number.trim(), 10));
};

module.exports = {
    openFile,
    openFileAtPath,
    openJsonFile,
    writeFileAsJson,
    readAsLines,
    parseLineAsNumbers,
};
