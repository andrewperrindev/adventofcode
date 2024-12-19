const { disableLogging } = require('../../test-helper.js');

const mazeP1 = require('../maze.p1.js');
const mazeP2 = require('../maze.p2.js');

describe('2024 Day 16', () => {
    beforeAll(disableLogging);

    describe('Part 1', () => {
        it('returns expected result for example', async () => {
            const result = await mazeP1.getResult();

            expect(result).toEqual(11048);
        });
    });

    describe('Part 2', () => {
        it('returns expected result for example', async () => {
            const result = await mazeP2.getResult();

            expect(result).toEqual(64);
        });
    });
});
