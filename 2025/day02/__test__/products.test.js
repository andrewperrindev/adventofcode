const { disableLogging } = require('../../test-helper.js');

const productsP1 = require('../products.p1.js');
const productsP2 = require('../products.p2.js');

describe('2025 Day 2', () => {
    beforeAll(disableLogging);

    describe('Part 1', () => {
        it('returns expected result for example', async () => {
            const result = await productsP1.getResult();

            expect(result).toEqual(1227775554);
        });
    });

    describe('Part 2', () => {
        it('returns expected result for example', async () => {
            const result = await productsP2.getResult();

            expect(result).toEqual(4174379265);
        });
    });
});
