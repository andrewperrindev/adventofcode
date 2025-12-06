const { disableLogging } = require('../../test-helper.js');

const ingredientsP1 = require('../ingredients.p1.js');
const ingredientsP2 = require('../ingredients.p2.js');

describe('2025 Day 5', () => {
    beforeAll(disableLogging);

    describe('Part 1', () => {
        it('returns expected result for example', async () => {
            const result = await ingredientsP1.getResult();

            expect(result).toEqual(3);
        });
    });

    describe('Part 2', () => {
        it('returns expected result for example', async () => {
            const result = await ingredientsP2.getResult();

            expect(result).toEqual(14);
        });
    });
});
