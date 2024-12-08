const { disableLogging } = require('../../test-helper.js');

const crosswordP1 = require('../crossword.p1.js');
const crosswordP2 = require('../crossword.p2.js');

describe('2024 Day 4', () => {
    beforeAll(disableLogging);

    const getResult = async (readFn, findFn) => {
        const data = await readFn();
        return findFn(data);
    };

    describe('Part 1', () => {
        it('returns expected result for example', async () => {
            const result = await getResult(crosswordP1.readInput, crosswordP1.findAllWords);

            expect(result).toEqual(18);
        });
    });

    describe('Part 2', () => {
        it('returns expected result for example', async () => {
            const result = await getResult(crosswordP2.readInput, crosswordP2.findAllWords);

            expect(result).toEqual(9);
        });
    });
});
