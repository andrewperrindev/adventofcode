const { disableLogging } = require('../../test-helper.js');

const marketP1 = require('../market.p1.js');

describe('2024 Day 22', () => {
    beforeAll(disableLogging);

    describe('Part 1', () => {
        it('returns expected result for example', async () => {
            const result = await marketP1.getResult();

            expect(result).toEqual(37327623);
        });
    });
});
