const { openFile, readAsLines } = require('../utils/file-handler');

const readInput = async (type) => {
    const data = await openFile(`inputs/towels.${type}.txt`, __dirname);

    return readAsLines(data);
};

const parseInput = (lines) => {
    const availablePatterns = lines.shift().split(', ');
    lines.shift(); // discard empty line

    return [availablePatterns, lines];
};

const getDesignPatternPermutationTotal = (availablePatterns, desiredDesigns) => {
    const counts = desiredDesigns.map((design) => getPermutationCountFor(design, availablePatterns));
    return counts.reduce((tally, count) => tally + count, 0);
};

const getPermutationCountFor = (design, patterns, cache = {}) => {
    let count = 0;

    // If we're at a base case (design fully matched) OR the design
    // is in the cache, set the appropriate result.
    if (design.length === 0 || typeof cache[design] === 'number') {
        count = design.length > 0 ? cache[design] : 1;
    } else {
        for (let pattern of patterns) {
            if (design.startsWith(pattern)) {
                const remainingDesign = design.substring(pattern.length);
                count += getPermutationCountFor(remainingDesign, patterns, cache);
            }
        }
    }

    cache[design] = count;
    return count;
};

const getResult = async (type = 'example') => {
    const data = await readInput(type);
    const [availablePatterns, desiredDesigns] = parseInput(data);
    return getDesignPatternPermutationTotal(availablePatterns, desiredDesigns);
};

if (!module.parent) {
    getResult('input').then(console.log);
}

module.exports = {
    getResult,
};
