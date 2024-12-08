const { disableLogging } = require('../../test-helper.js');

const printerP1 = require('../printer.p1.js');
const printerP2 = require('../printer.p2.js');

describe('2024 Day 5', () => {
    beforeAll(disableLogging);

    describe('Part 1', () => {
        it('returns expected result for example', async () => {
            const result = await printerP1.getTotal();

            expect(result).toEqual(143);
        });
    });

    describe('Part 2', () => {
        it('returns expected result for example', async () => {
            const result = await printerP2.getTotal();

            expect(result).toEqual(123);
        });
    });
});
