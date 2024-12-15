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

const gardenP1 = require('../garden.p1.js');
const gardenP2 = require('../garden.p2.js');

describe('2024 Day 12', () => {
    beforeAll(disableLogging);

    describe('Part 1', () => {
        it('returns expected result for example', async () => {
            const result = await gardenP1.getResult();

            expect(result).toEqual(1930);
        });
    });

    describe('Part 2', () => {
        it('returns expected result for example', async () => {
            const result = await gardenP2.getResult();

            expect(result).toEqual(1206);
        });

        it('supports nested regions', async () => {
            readAsLines.mockReturnValueOnce(['OOOOO', 'OXOXO', 'OOOOO', 'OXOXO', 'OOOOO']);
            const result = await gardenP2.getResult();

            expect(result).toEqual(436);
        });

        it('supports joined nested regions', async () => {
            readAsLines.mockReturnValueOnce(['AAAAAA', 'AAABBA', 'AAABBA', 'ABBAAA', 'ABBAAA', 'AAAAAA']);
            const result = await gardenP2.getResult();

            expect(result).toEqual(368);
        });
    });
});
