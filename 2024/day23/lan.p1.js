const { openFile, readAsLines } = require('../utils/file-handler');

const readInput = async (type) => {
    const data = await openFile(`inputs/lan.${type}.txt`, __dirname);

    return readAsLines(data);
};

const parseConnections = (data) => {
    const links = {};

    for (let link of data) {
        const [compA, compB] = link.split('-');

        const compALinks = links[compA] || [];
        compALinks.push(compB);
        links[compA] = compALinks;

        const compBLinks = links[compB] || [];
        compBLinks.push(compA);
        links[compB] = compBLinks;
    }

    return links;
};

const findThrees = (links) => {
    const threes = new Set();

    Object.keys(links).forEach((key) => {
        const next = links[key];

        next.forEach((nextKey) => {
            if (links[nextKey].includes(key)) {
                links[nextKey].forEach((finalKey) => {
                    if (links[finalKey].includes(key) && links[finalKey].includes(nextKey)) {
                        threes.add([key, nextKey, finalKey].sort().join());
                    }
                });
            }
        });
    });

    return threes;
};

const getResult = async (type = 'example') => {
    const data = await readInput(type);
    const connections = parseConnections(data);

    const threes = findThrees(connections);
    return [...threes.values()].reduce((tally, value) => {
        const valueKeys = value.split(',');
        tally += valueKeys.some((val) => val.startsWith('t')) ? 1 : 0;
        return tally;
    }, 0);
};

if (!module.parent) {
    getResult('input').then(console.log);
}

module.exports = {
    getResult,
};
