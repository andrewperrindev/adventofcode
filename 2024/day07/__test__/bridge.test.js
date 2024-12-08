const { disableLogging } = require('../../test-helper.js');

const bridgeP1 = require('../bridge.p1.js');
const bridgeP2 = require('../bridge.p2.js');

describe('2024 Day 7', () => {
    beforeAll(disableLogging);

    describe('Part 1', () => {
        it('returns expected result for example', async () => {
            const result = await bridgeP1.getResult();

            expect(result).toEqual(3749);
        });
    });

    describe('Part 2', () => {
        it('returns expected result for example', async () => {
            const result = await bridgeP2.getResult();

            expect(result).toEqual(11387);
        });
    });
});
