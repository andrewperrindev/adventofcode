jest.mock('../../utils/file-handler', () => {
    const originalModule = jest.requireActual('../../utils/file-handler');

    return {
        __esModule: true,
        ...originalModule,
        readAsLines: jest.spyOn(originalModule, 'readAsLines'),
    };
});
const { readAsLines } = require('../../utils/file-handler');

const { disableLogging } = require('../../test-helper.js');

const guardP1 = require('../guard.p1.js');
const guardP2 = require('../guard.p2.js');

describe('2024 Day 6', () => {
    beforeAll(disableLogging);

    describe('Part 1', () => {
        it('returns expected result for example', async () => {
            const result = await guardP1.getResult();

            expect(result).toEqual(41);
        });

        it('correctly handles multiple obstacles by one location', async () => {
            readAsLines.mockReturnValueOnce(['.##..', '..##.', '.....', '.^.#.', '.....']);
            const result = await guardP1.getResult();

            expect(result).toEqual(4);
        });
    });

    describe('Part 2', () => {
        it('returns expected result for example', async () => {
            const result = await guardP2.getResult();

            expect(result).toEqual(6);
        });
    });
});
