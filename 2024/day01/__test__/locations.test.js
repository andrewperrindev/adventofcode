const { getResult: getP1Result } = require('../locations.p1.js');
const { getResult: getP2Result } = require('../locations.p2.js');

describe('2024 Day 1', () => {
    describe('Part 1', () => {
        it('returns expected result for example', async () => {
            const result = await getP1Result();

            expect(result).toEqual(11);
        });
    });

    describe('Part 2', () => {
        it('returns expected result for example', async () => {
            const result = await getP2Result();

            expect(result).toEqual(31);
        });
    });
});