const { getSafeLineCount: getP1SafeLineCount } = require('../levels.p1.js');
const { getSafeLineCount: getP2SafeLineCount } = require('../levels.p2.js');

describe('2024 Day 2', () => {
    describe('Part 1', () => {
        it('returns expected result for example', async () => {
            const result = await getP1SafeLineCount();

            expect(result).toEqual(2);
        });
    });

    describe('Part 2', () => {
        it('returns expected result for example', async () => {
            const result = await getP2SafeLineCount();

            expect(result).toEqual(4);
        });
    });
});