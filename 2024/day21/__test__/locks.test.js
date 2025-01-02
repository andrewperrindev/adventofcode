const { disableLogging } = require('../../test-helper.js');

const locksP1 = require('../locks.p1.js');
const locksP2 = require('../locks.p2.js');

describe('2024 Day 21', () => {
    beforeAll(disableLogging);

    describe('Part 1', () => {
        it('returns expected result for example', async () => {
            const result = await locksP1.getResult();

            expect(result).toEqual(126384);
        });
    });

    describe('Part 2', () => {
        it('returns expected result for example', async () => {
            const result = await locksP2.getResult();

            expect(result).toEqual(154115708116294);
        });
    });
});
