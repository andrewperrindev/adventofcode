const { disableLogging } = require('../../test-helper.js');

const locationsP1 = require('../locations.p1.js');
const locationsP2 = require('../locations.p2.js');

describe('2024 Day 1', () => {
    beforeAll(disableLogging);

    describe('Part 1', () => {
        it('returns expected result for example', async () => {
            const result = await locationsP1.getResult();

            expect(result).toEqual(11);
        });
    });

    describe('Part 2', () => {
        it('returns expected result for example', async () => {
            const result = await locationsP2.getResult();

            expect(result).toEqual(31);
        });
    });
});
