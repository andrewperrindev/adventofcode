const { disableLogging } = require('../../test-helper.js');

const mulP1 = require('../mul.p1.js');
const mulP2 = require('../mul.p2.js');

describe('2024 Day 3', () => {
    beforeAll(disableLogging);

    describe('Part 1', () => {
        it('returns expected result for example', async () => {
            const result = await mulP1.getSum();

            expect(result).toEqual(161);
        });
    });

    describe('Part 2', () => {
        it('returns expected result for example', async () => {
            const result = await mulP2.getSum();

            expect(result).toEqual(48);
        });
    });
});
