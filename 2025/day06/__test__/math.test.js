const { disableLogging } = require('../../test-helper.js');

const mathP1 = require('../math.p1.js');
const mathP2 = require('../math.p2.js');

describe('2025 Day 6', () => {
    beforeAll(disableLogging);

    describe('Part 1', () => {
        it('returns expected result for example', async () => {
            const result = await mathP1.getResult();

            expect(result).toEqual(4277556);
        });
    });

    describe('Part 2', () => {
        it('returns expected result for example', async () => {
            const result = await mathP2.getResult();

            expect(result).toEqual(3263827);
        });
    });
});
