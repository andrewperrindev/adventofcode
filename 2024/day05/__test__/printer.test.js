const { getTotal: getP1Total } = require('../printer.p1.js');
const { getTotal: getP2Total } = require('../printer.p2.js');

describe('2024 Day 3', () => {
    describe('Part 1', () => {
        it('returns expected result for example', async () => {
            const result = await getP1Total();

            expect(result).toEqual(143);
        });
    });

    describe('Part 2', () => {
        it('returns expected result for example', async () => {
            const result = await getP2Total();

            expect(result).toEqual(123);
        });
    });
});