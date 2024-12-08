const { openFile, readAsLines, parseLineAsNumbers } = require('../utils/file-handler');

const readInput = async () => {
    const data = await openFile('inputs/printer.example.txt', __dirname);

    return readAsLines(data);
};

const parseOrderingRules = (input) => {
    const mustComeAfter = {};
    const mustComeBefore = {};
    let line = input.shift();

    while (line !== '') {
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
};

const parseUpdates = (input) => {
    const pageUpdates = [];

    for (let i = 0; i < input.length; i++) {
        const pages = parseLineAsNumbers(input[i], ',');
        if (pages.length > 0) {
            pageUpdates.push(pages);
        }
    }

    return pageUpdates;
};

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
};

const validateUpdates = (pageUpdates, mustComeAfter) => {
    return pageUpdates.map((update) => {
        for (let i = 0; i < update.length; i++) {
            // This time, if invalid, first fix so the pages are in valid order,
            // then include in the final tally.
            if (!isPageValid(update[i], update.slice(0, i), mustComeAfter)) {
                const fixed = fixInvalidUpdate(update, mustComeAfter);
                return fixed.at(Math.floor(fixed.length / 2));
            }
        }

        return 0;
    });
};

const fixInvalidUpdate = (pageUpdate, mustComeAfter) => {
    const fixed = [];

    // Find the correct order by traversing the list of pages
    // and re-inserting them based on whether they have to appear after
    // another page or not. If no requirements, just insert at end.
    for (let page of pageUpdate) {
        for (let i = 0; i < fixed.length; i++) {
            const fixedPage = fixed.at(i);

            if (mustComeAfter[page]?.includes(fixedPage)) {
                fixed.splice(i, 0, page);
                break;
            }
        }

        if (!fixed.includes(page)) {
            fixed.push(page);
        }
    }

    return fixed;
};

const getTotal = async () => {
    const data = await readInput();
    const [mustComeAfter] = parseOrderingRules(data);
    const updates = parseUpdates(data);

    const results = validateUpdates(updates, mustComeAfter);
    return results.reduce((sum, result) => sum + result, 0);
};

getTotal().then((result) => {
    console.log(result);
});

module.exports = {
    getTotal,
};
