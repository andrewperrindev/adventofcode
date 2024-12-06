const { openFile, readAsLines, parseLineAsNumbers } = require('../utils/file-handler');

const readInput = async () => {
    const data = await openFile('inputs/printer.example.txt', __dirname);

    return readAsLines(data);
};

const parseOrderingRules = (input) => {
    const mustComeAfter = {};
    const mustComeBefore = {};
    let line = input.shift();

    while(line !== '') {
        const [first, second] = parseLineAsNumbers(line, '|');

        // Keep track of which pages MUST come before or after these numbers.
        const before = mustComeAfter[first] || [];
        before.push(second);
        mustComeAfter[first] = before;

        // Ended up not needing the before hash. oh well.
        const after = mustComeBefore[second] || [];
        after.push(first);
        mustComeBefore[second] = after;

        line = input.shift();
    }

    return [mustComeAfter, mustComeBefore];
}

const parseUpdates = (input) => {
    const pageUpdates = [];

    for(let i = 0; i < input.length; i++) {
        const pages = parseLineAsNumbers(input[i], ',');
        if (pages.length > 0) {
            pageUpdates.push(pages);
        }
    }

    return pageUpdates;
}

const isPageValid = (page, prevPages, mustComeAfter) => {
    // Invalid if any of the previous pages must come after
    // the current page.
    const requireds = mustComeAfter[page];
    for (let prevPage of prevPages) {
        if (requireds?.includes(prevPage)) {
            return false;
        }
    }

    return true;
}

const validateUpdates = (pageUpdates, mustComeAfter) => {
    return pageUpdates.map((update) => {
        for (let i = 0; i < update.length; i++) {
            // If invalid, don't include in the tally.
            if (!isPageValid(update[i], update.slice(0, i), mustComeAfter)) {
                return 0;
            }
        }

        return update.at(Math.floor(update.length / 2));
    })
}

const getTotal = async() => {
    const data = await readInput();
    const [mustComeAfter] = parseOrderingRules(data);
    const updates = parseUpdates(data);

    const results = validateUpdates(updates, mustComeAfter);
    return results.reduce((sum, result) => sum + result, 0);
}

getTotal().then(result => {
    console.log(result);
});

module.exports = {
    getTotal
};