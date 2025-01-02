const { disableLogging } = require('../../test-helper.js');

const lockpickP1 = require('../lockpick.p1.js');

describe('2024 Day 21', () => {
    beforeAll(disableLogging);

    describe('Part 1', () => {
        it('returns expected result for example', async () => {
            const result = await lockpickP1.getResult();

            expect(result).toEqual(3);
        });
    });
});
