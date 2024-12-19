const { disableLogging } = require('../../test-helper.js');

const lanternfishP1 = require('../lanternfish.p1.js');
const lanternfishP2 = require('../lanternfish.p2.js');

describe('2024 Day 15', () => {
    beforeAll(disableLogging);

    describe('Part 1', () => {
        it('returns expected result for example', async () => {
            const result = await lanternfishP1.getResult();

            expect(result).toEqual(10092);
        });
    });

    describe('Part 2', () => {
        it('returns expected result for example', async () => {
            const result = await lanternfishP2.getResult();

            expect(result).toEqual(9021);
        });
    });
});
