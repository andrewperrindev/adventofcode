const { disableLogging } = require('../../test-helper.js');

const raceP1 = require('../race.p1.js');
const raceP2 = require('../race.p2.js');

describe('2024 Day 20', () => {
    beforeAll(disableLogging);

    describe('Part 1', () => {
        it('returns expected result for example', async () => {
            const result = await raceP1.getResult();

            expect(result).toEqual(44);
        });
    });

    describe('Part 2', () => {
        it('returns expected result for example', async () => {
            const result = await raceP2.getResult();

            expect(result).toEqual(285);
        });
    });
});
