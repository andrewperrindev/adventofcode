const { disableLogging } = require('../../test-helper.js');

const devicesP1 = require('../devices.p1.js');
const devicesP2 = require('../devices.p2.js');

describe('2025 Day 11', () => {
    beforeAll(disableLogging);

    describe('Part 1', () => {
        it('returns expected result for example', async () => {
            const result = await devicesP1.getResult();

            expect(result).toEqual(5);
        });
    });

    describe('Part 2', () => {
        it('returns expected result for example', async () => {
            const result = await devicesP2.getResult();

            expect(result).toEqual(2);
        });
    });
});
