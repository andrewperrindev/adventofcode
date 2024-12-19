const { disableLogging } = require('../../test-helper.js');

const ramP1 = require('../ram.p1.js');
const ramP2 = require('../ram.p2.js');

describe('2024 Day 18', () => {
    beforeAll(disableLogging);

    describe('Part 1', () => {
        it('returns expected result for example', async () => {
            const result = await ramP1.getResult();

            expect(result).toEqual(22);
        });
    });

    describe('Part 2', () => {
        it('returns expected result for example', async () => {
            const result = await ramP2.getResult();

            expect(result).toEqual('6,1');
        });
    });
});
