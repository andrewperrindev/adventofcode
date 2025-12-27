const { disableLogging } = require('../../test-helper.js');

const boxesP1 = require('../boxes.p1.js');
const boxesP2 = require('../boxes.p2.js');

describe('2025 Day 8', () => {
    beforeAll(disableLogging);

    describe('Part 1', () => {
        it('returns expected result for example', async () => {
            const result = await boxesP1.getResult();

            expect(result).toEqual(40);
        });
    });

    describe('Part 2', () => {
        it('returns expected result for example', async () => {
            const result = await boxesP2.getResult();

            expect(result).toEqual(25272);
        });
    });
});
