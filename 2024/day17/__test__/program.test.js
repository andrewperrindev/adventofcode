const { disableLogging } = require('../../test-helper.js');

const programP1 = require('../program.p1.js');

describe('2024 Day 17', () => {
    beforeAll(disableLogging);

    describe('Part 1', () => {
        it('returns expected result for example', async () => {
            const result = await programP1.getResult();

            expect(result).toEqual('4,6,3,5,6,3,5,2,1,0');
        });
    });
});
