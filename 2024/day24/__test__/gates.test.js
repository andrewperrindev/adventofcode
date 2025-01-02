const { disableLogging } = require('../../test-helper.js');

const gatesP1 = require('../gates.p1.js');
const gatesP2 = require('../gates.p2.js');

describe('2024 Day 21', () => {
    beforeAll(disableLogging);

    describe('Part 1', () => {
        it('returns expected result for example', async () => {
            const result = await gatesP1.getResult();

            expect(result).toEqual(2024);
        });
    });

    describe('Part 2', () => {
        it('returns expected result for example', async () => {
            const result = await gatesP2.getResult();

            expect(result).toEqual('ffh,hwm,mjb,rvg,tgd,wpb,z02,z03,z05,z06,z07,z08,z10,z11');
        });
    });
});
