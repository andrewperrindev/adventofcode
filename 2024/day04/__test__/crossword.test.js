const { readInput: readP1Input, findAllWords: findAllP1Words } = require('../crossword.p1.js');
const { readInput: readP2Input, findAllWords: findAllP2Words } = require('../crossword.p2.js');

describe('2024 Day 4', () => {
    const getResult = async (readFn, findFn) => {
        const data = await readFn();
        return findFn(data);
    };

    describe('Part 1', () => {
        it('returns expected result for example', async () => {
            const result = await getResult(readP1Input, findAllP1Words);

            expect(result).toEqual(18);
        });
    });

    describe('Part 2', () => {
        it('returns expected result for example', async () => {
            const result = await getResult(readP2Input, findAllP2Words);

            expect(result).toEqual(9);
        });
    });
});