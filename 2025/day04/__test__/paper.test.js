const { disableLogging } = require('../../test-helper.js');

const paperP1 = require('../paper.p1.js');
const paperP2 = require('../paper.p2.js');

describe('2025 Day 4', () => {
    beforeAll(disableLogging);

    describe('Part 1', () => {
        it('returns expected result for example', async () => {
            const result = await paperP1.getResult();

            expect(result).toEqual(13);
        });
    });

    describe('Part 2', () => {
        it('returns expected result for example', async () => {
            const result = await paperP2.getResult();

            expect(result).toEqual(43);
        });
    });
});
