const { disableLogging } = require('../../test-helper.js');

const lanP1 = require('../lan.p1.js');
const lanP2 = require('../lan.p2.js');

describe('2024 Day 23', () => {
    beforeAll(disableLogging);

    describe('Part 1', () => {
        it('returns expected result for example', async () => {
            const result = await lanP1.getResult();

            expect(result).toEqual(7);
        });
    });

    describe('Part 2', () => {
        it('returns expected result for example', async () => {
            const result = await lanP2.getResult();

            expect(result).toEqual('co,de,ka,ta');
        });
    });
});
