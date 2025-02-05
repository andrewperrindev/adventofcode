const { disableLogging } = require('../../test-helper.js');

const levelsP1 = require('../levels.p1.js');
const levelsP2 = require('../levels.p2.js');

describe('2024 Day 2', () => {
    beforeAll(disableLogging);

    describe('Part 1', () => {
        it('returns expected result for example', async () => {
            const result = await levelsP1.getSafeLineCount();

            expect(result).toEqual(2);
        });
    });

    describe('Part 2', () => {
        it('returns expected result for example', async () => {
            const result = await levelsP2.getSafeLineCount();

            expect(result).toEqual(4);
        });
    });
});
