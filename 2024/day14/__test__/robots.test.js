const { disableLogging } = require('../../test-helper.js');

const robotsP1 = require('../robots.p1.js');
const robotsP2 = require('../robots.p2.js');

describe('2024 Day 14', () => {
    beforeAll(disableLogging);

    describe('Part 1', () => {
        it('returns expected result for example', async () => {
            const result = await robotsP1.getResult();

            expect(result).toEqual(12);
        });
    });

    describe('Part 2', () => {
        it('returns expected result for example', async () => {
            const result = await robotsP2.getResult();

            // Unfortunately a real part 2 test can't be done using the
            // example input. Instead, just use a higher iteration count.
            expect(result).toEqual(20);
        });
    });
});
