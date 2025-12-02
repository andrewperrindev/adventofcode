const { disableLogging } = require('../../test-helper.js');

const combinationP1 = require('../combination.p1.js');
const combinationP2 = require('../combination.p2.js');

describe('2025 Day 1', () => {
    beforeAll(disableLogging);

    describe('Part 1', () => {
        it('returns expected result for example', async () => {
            const result = await combinationP1.getResult();

            expect(result).toEqual(3);
        });
    });

    describe('Part 2', () => {
        it('only counts exact 0 once', async () => {
            let instructions = [
                ['L', 50],
                ['R', 20]
            ];
            const result = await combinationP2.getResult(instructions);

            expect(result).toEqual(1);
        });

        it('counts both exact 0 and passing 0', async () => {
            let instructions = [
                ['L', 50],
                ['R', 5],
                ['L', 50]
            ];
            const result = await combinationP2.getResult(instructions);

            expect(result).toEqual(2);
        });

        it('counts multiple negative rotations', async () => {
            let instructions = [
                ['L', 1005]
            ];
            const result = await combinationP2.getResult(instructions);

            expect(result).toEqual(10);
        });

        it('counts multiple positive rotations', async () => {
            let instructions = [
                ['R', 1008]
            ];
            const result = await combinationP2.getResult(instructions);

            expect(result).toEqual(10);
        });

        it('returns expected result for example', async () => {
            const result = await combinationP2.getResult();

            expect(result).toEqual(6);
        });
    });
});
