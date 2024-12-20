const { disableLogging } = require('../../test-helper.js');

const towelsP1 = require('../towels.p1.js');
const towelsP2 = require('../towels.p2.js');

describe('2024 Day 19', () => {
    beforeAll(disableLogging);

    describe('Part 1', () => {
        it('returns expected result for example', async () => {
            const result = await towelsP1.getResult();

            expect(result).toEqual(6);
        });
    });

    describe('Part 2', () => {
        it('returns expected result for example', async () => {
            const result = await towelsP2.getResult();

            expect(result).toEqual(16);
        });
    });
});
