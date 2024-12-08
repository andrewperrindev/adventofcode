const { disableLogging } = require('../../test-helper.js');

const antennaP1 = require('../antenna.p1.js');
const antennaP2 = require('../antenna.p2.js');

describe('2024 Day 8', () => {
    beforeAll(disableLogging);

    describe('Part 1', () => {
        it('returns expected result for example', async () => {
            const result = await antennaP1.getResult();

            expect(result).toEqual(14);
        });
    });

    describe('Part 2', () => {
        it('returns expected result for example', async () => {
            const result = await antennaP2.getResult();

            expect(result).toEqual(34);
        });
    });
});
