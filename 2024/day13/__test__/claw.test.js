const { disableLogging } = require('../../test-helper.js');

const clawP1 = require('../claw.p1.js');
const clawP2 = require('../claw.p2.js');

describe('2024 Day 13', () => {
    beforeAll(disableLogging);

    describe('Part 1', () => {
        it('returns expected result for example', async () => {
            const result = await clawP1.getResult();

            expect(result).toEqual(480);
        });
    });

    describe('Part 2', () => {
        it('returns expected result for example', async () => {
            const result = await clawP2.getResult();

            expect(result).toEqual(875318608908);
        });
    });
});
