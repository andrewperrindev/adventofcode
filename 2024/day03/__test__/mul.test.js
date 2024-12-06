const { getSum: getP1Sum } = require('../mul.p1.js');
const { getSum: getP2Sum } = require('../mul.p2.js');

describe('2024 Day 3', () => {
    describe('Part 1', () => {
        it('returns expected result for example', async () => {
            const result = await getP1Sum();

            expect(result).toEqual(161);
        });
    });

    describe('Part 2', () => {
        it('returns expected result for example', async () => {
            const result = await getP2Sum();

            expect(result).toEqual(48);
        });
    });
});