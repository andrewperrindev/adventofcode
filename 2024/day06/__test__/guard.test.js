const { getResult: getP1Result } = require('../guard.p1.js');
const { getResult: getP2Result } = require('../guard.p2.js');

describe('2024 Day 6', () => {
    describe('Part 1', () => {
        it('returns expected result for example', async () => {
            const result = await getP1Result();

            expect(result).toEqual(41);
        });
    });

    describe('Part 2', () => {
        it('returns expected result for example', async () => {
            const result = await getP2Result();

            expect(result).toEqual(6);
        });
    });
});