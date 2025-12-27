const { disableLogging } = require('../../test-helper.js');

const lightsP1 = require('../lights.p1.js');

describe('2025 Day 10', () => {
    beforeAll(disableLogging);

    describe('Part 1', () => {
        it('returns expected result for example', async () => {
            const result = await lightsP1.getResult();

            expect(result).toEqual(7);
        });
    });
});
