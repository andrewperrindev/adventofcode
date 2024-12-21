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

const getPossibleDesignCount = (availablePatterns, desiredDesigns) => {
    const results = desiredDesigns.map((design) => isValidDesign(design, availablePatterns));
    return results.filter((isValid) => isValid).length;
};

const isValidDesign = (design, patterns, cache = {}) => {
    let isValid = false;

    // If we're at a base case (design fully matched) OR the design
    // is in the cache, set the appropriate result.
    if (design.length === 0 || typeof cache[design] === 'boolean') {
        isValid = design.length > 0 ? cache[design] : true;
    } else {
        for (let pattern of patterns) {
            if (design.startsWith(pattern)) {
                const remainingDesign = design.substring(pattern.length);

                if (isValidDesign(remainingDesign, patterns, cache)) {
                    isValid = true;
                    break;
                }
            }
        }
    }

    cache[design] = isValid;
    return isValid;
};

const getResult = async (type = 'example') => {
    const data = await readInput(type);
    const [availablePatterns, desiredDesigns] = parseInput(data);
    return getPossibleDesignCount(availablePatterns, desiredDesigns);
};

if (!module.parent) {
    getResult('input').then(console.log);
}

module.exports = {
    getResult,
};
