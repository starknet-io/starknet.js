// import { CallData, Contract, stark } from '../../src';
// import { encodeShortString } from '../../src/utils/shortString';
// import { compiledErc20, getTestAccount, getTestProvider } from '../fixtures';

import { CallData, RawArgsObject } from '../../src';
import { tuple } from '../../src/utils/calldata/cairo';

// compile arrays and objects
// combining compiled data

describe('calldata.compile', () => {
  describe('Compile arrays and objects', () => {
    // let erc20Contract: Contract;
    // const provider = getTestProvider();
    // const wallet = stark.randomAddress();
    // const account = getTestAccount(provider);
    // const constructorCalldata = [encodeShortString('Token'), encodeShortString('ERC20'), wallet];

    // beforeAll(async () => {
    //   const { deploy } = await account.declareAndDeploy({
    //     contract: compiledErc20,
    //     classHash: '0x54328a1075b8820eb43caf0caa233923148c983742402dcfc38541dd843d01a',
    //     constructorCalldata,
    //   });

    //   erc20Contract = new Contract(compiledErc20.abi, deploy.contract_address!, provider);
    // });

    test('should compile calladata - boolean', () => {
      const cdata = CallData.compile({ false: 0, true: 1 });
      expect(cdata).toEqual(['0', '1']);
      const cdata2 = CallData.compile({ false: false, true: true });
      expect(cdata2).toEqual(['0', '1']);
    });

    test('should compile calladata - arrays', () => {
      const cdata1d = CallData.compile({
        test: [1, 2],
        test2: [3, 4],
      });
      expect(cdata1d).toEqual(['2', '1', '2', '2', '3', '4']);

      const cdata2d = CallData.compile({
        test: [
          [1, 2],
          [3, 4],
        ],
      });
      expect(cdata2d).toEqual(['2', '2', '1', '2', '2', '3', '4']);
    });

    test('should compile calladata - objects', () => {
      const cdata = CallData.compile({
        test: { a: 1, b: 2 },
        test2: { low: 23456, high: 0 },
      });
      expect(cdata).toEqual(['1', '2', '23456', '0']);
    });

    test('should compile calladata - arrays of objects', () => {
      const cdata = CallData.compile({
        test: [
          { a: 1, b: 2 },
          { a: 3, b: 4 },
        ],
        test2: [
          { low: 23456, high: 0 },
          { low: 0, high: 0 },
        ],
      });
      expect(cdata).toEqual(['2', '1', '2', '3', '4', '2', '23456', '0', '0', '0']);
    });
  });

  test('Recompiling compiled Calldata', () => {
    const myRawArgsObject: RawArgsObject = {
      active: true,
      symbol: 'NIT',
      initial_supply: { low: 23456, high: 0 },
      recipient: '0x7e00d496e324876bbc8531f2d9a82bf154d1a04a50218ee74cdd372f75a551a',
      decimals: 18,
      arr: [1, 2, 3],
      arr2: [
        [4, 5],
        [6, 7],
      ],
      obj: { a: 1, b: 2 },
      arrObj: [
        { a: 1, b: 2 },
        { a: 3, b: 4 },
      ],
      tup: tuple(252, 40001n),
    };
    const expectedResult = [
      '1',
      '5130580',
      '23456',
      '0',
      '3562055384976875123115280411327378123839557441680670463096306030682092229914',
      '18',
      '3',
      '1',
      '2',
      '3',
      '2',
      '2',
      '4',
      '5',
      '2',
      '6',
      '7',
      '1',
      '2',
      '2',
      '1',
      '2',
      '3',
      '4',
      '252',
      '40001',
    ];
    const cdata = CallData.compile(myRawArgsObject);
    expect(cdata).toEqual(expectedResult);
    const cdataTwice = CallData.compile(cdata);
    expect(cdataTwice).toEqual(expectedResult);
  });

  test('Combining compiled Calldata', () => {
    const myRawArgsObject: RawArgsObject = {
      active: true,
      symbol: 'NIT',
      initial_supply: { low: 23456, high: 0 },
      recipient: '0x7e00d496e324876bbc8531f2d9a82bf154d1a04a50218ee74cdd372f75a551a',
      decimals: 18,
    };
    const cdata = CallData.compile(myRawArgsObject);
    const myRawArgsObject2: RawArgsObject = {
      arr: [1, 2, 3],
      arr2: [
        [4, 5],
        [6, 7],
      ],
      obj: { a: 1, b: 2 },
      arrObj: [
        { a: 1, b: 2 },
        { a: 3, b: 4 },
      ],
      tup: tuple(252, 40001n),
    };
    const cdata2 = CallData.compile(myRawArgsObject2);
    const expectedResult = [
      '1',
      '5130580',
      '23456',
      '0',
      '3562055384976875123115280411327378123839557441680670463096306030682092229914',
      '18',
      '3',
      '1',
      '2',
      '3',
      '2',
      '2',
      '4',
      '5',
      '2',
      '6',
      '7',
      '1',
      '2',
      '2',
      '1',
      '2',
      '3',
      '4',
      '252',
      '40001',
    ];
    expect([...cdata, ...cdata2]).toEqual(expectedResult);
  });

  describe('RawCalldata to Calldata', () => {});
});
