const { disableLogging } = require('../../test-helper.js');

const theaterP1 = require('../theater.p1.js');

describe('2025 Day 9', () => {
    beforeAll(disableLogging);

    describe('Part 1', () => {
        it('returns expected result for example', async () => {
            const result = await theaterP1.getResult();

            expect(result).toEqual(50);
        });
    });
});
