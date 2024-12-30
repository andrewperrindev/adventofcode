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

const findConnections = (connections, searchKeys, links) => {
    let newConnections = new Set(connections);

    while (searchKeys.length > 0) {
        const searchKey = searchKeys.pop();
        if (connections.every((conn) => links[searchKey].includes(conn))) {
            newConnections.add(searchKey);
            findConnections(Array.from(newConnections), [...links[searchKey]], links).forEach((newConn) => {
                newConnections.add(newConn);
            });
            return Array.from(newConnections);
        }
    }

    return connections;
};

const findAll = (links) => {
    const all = new Set();

    Object.keys(links).forEach((key) => {
        const connections = findConnections([key], [...links[key]], links);
        all.add(connections.sort().join(','));
    });

    return Array.from(all);
};

const getResult = async (type = 'example') => {
    const data = await readInput(type);
    const connections = parseConnections(data);

    const allConnections = findAll(connections);
    return allConnections.reduce((longest, value) => {
        return value.length > longest.length ? value : longest;
    }, '');
};

if (!module.parent) {
    getResult('input').then(console.log);
}

module.exports = {
    getResult,
};
