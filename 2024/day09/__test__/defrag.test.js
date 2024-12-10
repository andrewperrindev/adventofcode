const { disableLogging } = require('../../test-helper.js');

const defragP1 = require('../defrag.p1.js');
const defragP2 = require('../defrag.p2.js');

describe('2024 Day 9', () => {
    beforeAll(disableLogging);

    describe('Part 1', () => {
        it('returns expected result for example', async () => {
            const result = await defragP1.getResult();

            expect(result).toEqual(1928);
        });
    });

    describe('Part 2', () => {
        it('returns expected result for example', async () => {
            const result = await defragP2.getResult();

            expect(result).toEqual(2858);
        });
    });
});
