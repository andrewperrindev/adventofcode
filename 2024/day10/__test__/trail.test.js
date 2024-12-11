const { disableLogging } = require('../../test-helper.js');

const trailP1 = require('../trail.p1.js');
const trailP2 = require('../trail.p2.js');

describe('2024 Day 10', () => {
    beforeAll(disableLogging);

    describe('Part 1', () => {
        it('returns expected result for example', async () => {
            const result = await trailP1.getResult();

            expect(result).toEqual(36);
        });
    });

    describe('Part 2', () => {
        it('returns expected result for example', async () => {
            const result = await trailP2.getResult();

            expect(result).toEqual(81);
        });
    });
});
