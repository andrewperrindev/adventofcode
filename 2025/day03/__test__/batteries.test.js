const { disableLogging } = require('../../test-helper.js');

const batteriesP1 = require('../batteries.p1.js');
const batteriesP2 = require('../batteries.p2.js');

describe('2025 Day 3', () => {
    beforeAll(disableLogging);

    describe('Part 1', () => {
        it('returns expected result for example', async () => {
            const result = await batteriesP1.getResult();

            expect(result).toEqual(357);
        });
    });

    describe('Part 2', () => {
        it('returns expected result for example', async () => {
            const result = await batteriesP2.getResult();

            expect(result).toEqual(3121910778619);
        });
    });
});
