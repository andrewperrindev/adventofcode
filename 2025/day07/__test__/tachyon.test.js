const { disableLogging } = require('../../test-helper.js');

const tachyonP1 = require('../tachyon.p1.js');
const tachyonP2 = require('../tachyon.p2.js');

describe('2025 Day 7', () => {
    beforeAll(disableLogging);

    describe('Part 1', () => {
        it('returns expected result for example', async () => {
            const result = await tachyonP1.getResult();

            expect(result).toEqual(21);
        });
    });

    describe('Part 2', () => {
        it('returns expected result for example', async () => {
            const result = await tachyonP2.getResult();

            expect(result).toEqual(40);
        });
    });
});
