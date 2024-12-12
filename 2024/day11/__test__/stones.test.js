const { disableLogging } = require('../../test-helper.js');

const stonesP1 = require('../stones.p1.js');
const stonesP2 = require('../stones.p2.js');

describe('2024 Day 11', () => {
    beforeAll(disableLogging);

    describe('Part 1', () => {
        it('returns expected result for example', async () => {
            const result = await stonesP1.getResult();

            expect(result).toEqual(55312);
        });
    });

    describe('Part 2', () => {
        it('returns expected result for example', async () => {
            const result = await stonesP2.getResult();

            expect(result).toEqual(65601038650482);
        });
    });
});
