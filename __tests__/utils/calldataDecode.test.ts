// import { parseCalldataField } from '../../src/utils/calldata/requestParser';
// import { decodeCalldataField } from '../../src/utils/calldata/calldataDecoder';
// import assert from '../../src/utils/assert';
// import { CairoFelt } from '../../src/utils/cairoDataTypes/felt';
// import { AbiEnums, AbiStructs } from '../../src/types';

import {
  // Account,
  BigNumberish,
  // CairoCustomEnum,
  // CairoOption,
  // CairoOptionVariant,
  // CairoResult,
  // CairoResultVariant,
  // CairoUint256,
  // CairoUint512,
  CallData,
  Calldata,
  // CompiledSierra,
  // Contract,
  // DeclareDeployUDCResponse,
  RawArgsArray,
  RawArgsObject,
  // byteArray,
  cairo,
  // ec,
  // hash,
  num,
  // selector,
  // shortString,
  // stark,
  // types,
  // type Uint512,
} from '../../src';

import { compiledC1v2, compiledHelloSierra, compiledComplexSierra } from '../config/fixtures';

// import { initializeMatcher } from '../../config/schema';

const {
  // uint256,
  tuple,
  //  isCairo1Abi
} = cairo;
// const { toHex } = num;
// const { starknetKeccak } = selector;

describe('Cairo 1', () => {
  describe('API and contract interactions', () => {
    test('myCallData.compile for Cairo 1', async () => {
      const myFalseUint256 = { high: 1, low: 23456 }; // wrong order
      type Order2 = {
        p1: BigNumberish;
        p2: BigNumberish[];
      };

      const myOrder2bis: Order2 = {
        // wrong order
        p2: [234, 467456745457n, '0x56ec'],
        p1: '17',
      };
      const myRawArgsObject: RawArgsObject = {
        // wrong order
        active: true,
        symbol: 'NIT',
        initial_supply: myFalseUint256,
        recipient: '0x7e00d496e324876bbc8531f2d9a82bf154d1a04a50218ee74cdd372f75a551a',
        decimals: 18,
        tupoftup: tuple(tuple(34, '0x5e'), myFalseUint256),
        card: myOrder2bis,
        longText: 'Bug is back, for ever, here and everywhere',
        array1: [100, 101, 102],
        array2: [
          [200, 201],
          [202, 203],
          [204, 205],
        ],
        array3: [myOrder2bis, myOrder2bis],
        array4: [myFalseUint256, myFalseUint256],
        tuple1: tuple(40000n, myOrder2bis, [54, 55n, '0xae'], 'texte'),
        name: 'niceToken',
        array5: [tuple(251, 40000n), tuple(252, 40001n)],
      };
      const myRawArgsArray: RawArgsArray = [
        'niceToken',
        'NIT',
        18,
        { low: 23456, high: 1 },
        { p1: '17', p2: [234, 467456745457n, '0x56ec'] },
        '0x7e00d496e324876bbc8531f2d9a82bf154d1a04a50218ee74cdd372f75a551a',
        true,
        { '0': { '0': 34, '1': '0x5e' }, '1': { low: 23456, high: 1 } },
        'Bug is back, for ever, here and everywhere',
        [100, 101, 102],
        [
          [200, 201],
          [202, 203],
          [204, 205],
        ],
        [
          { p1: '17', p2: [234, 467456745457n, '0x56ec'] },
          { p1: '17', p2: [234, 467456745457n, '0x56ec'] },
        ],
        [
          { low: 23456, high: 1 },
          { low: 23456, high: 1 },
        ],
        {
          '0': 40000n,
          '1': { p1: '17', p2: [234, 467456745457n, '0x56ec'] },
          '2': [54, 55n, '0xae'],
          '3': 'texte',
        },
        [
          { '0': 251, '1': 40000n },
          { '0': 252, '1': 40001n },
        ],
      ];

      const contractCallData: CallData = new CallData(compiledComplexSierra.abi);
      const callDataFromObject: Calldata = contractCallData.compile('constructor', myRawArgsObject);
      const callDataFromArray: Calldata = contractCallData.compile('constructor', myRawArgsArray);
      const expectedResult = [
        '2036735872918048433518',
        '5130580',
        '18',
        '23456',
        '1',
        '17',
        '3',
        '234',
        '467456745457',
        '22252',
        '3562055384976875123115280411327378123839557441680670463096306030682092229914',
        '1',
        '34',
        '94',
        '23456',
        '1',
        '2',
        '117422190885827407409664260607192623408641871979684112605616397634538401380',
        '39164769268277364419555941',
        '3',
        '100',
        '101',
        '102',
        '3',
        '2',
        '200',
        '201',
        '2',
        '202',
        '203',
        '2',
        '204',
        '205',
        '2',
        '17',
        '3',
        '234',
        '467456745457',
        '22252',
        '17',
        '3',
        '234',
        '467456745457',
        '22252',
        '2',
        '23456',
        '1',
        '23456',
        '1',
        '40000',
        '0',
        '17',
        '3',
        '234',
        '467456745457',
        '22252',
        '3',
        '54',
        '55',
        '174',
        '499918599269',
        '2',
        '251',
        '40000',
        '252',
        '40001',
      ];
      expect(callDataFromObject).toStrictEqual(expectedResult);
      expect(callDataFromArray).toStrictEqual(expectedResult);
    });

    test('myCallData.decodeParameters for Cairo 1', async () => {
      const Cairo1HelloAbi = compiledHelloSierra;
      const Cairo1Abi = compiledC1v2;
      const helloCallData = new CallData(Cairo1HelloAbi.abi);
      const c1v2CallData = new CallData(Cairo1Abi.abi);

      const res2 = helloCallData.decodeParameters('hello::hello::UserData', ['0x123456', '0x1']);
      expect(res2).toEqual({ address: 1193046n, is_claimed: true });
      const res3 = helloCallData.decodeParameters(
        ['hello::hello::UserData', 'hello::hello::UserData'],
        ['0x123456', '0x1', '0x98765', '0x0']
      );
      expect(res3).toEqual([
        { address: 1193046n, is_claimed: true },
        { address: 624485n, is_claimed: false },
      ]);
      const res4 = helloCallData.decodeParameters('core::integer::u8', ['0x123456']);
      expect(res4).toBe(1193046n);
      const res5 = helloCallData.decodeParameters('core::bool', ['0x1']);
      expect(res5).toBe(true);
      const res6 = helloCallData.decodeParameters('core::felt252', ['0x123456']);
      expect(res6).toBe(1193046n);
      const res7 = helloCallData.decodeParameters('core::integer::u256', ['0x123456', '0x789']);
      expect(num.toHex(res7.toString())).toBe('0x78900000000000000000000000000123456');
      const res8 = helloCallData.decodeParameters('core::array::Array::<core::integer::u16>', [
        '2',
        '0x123456',
        '0x789',
      ]);
      expect(res8).toEqual([1193046n, 1929n]);
      const res9 = helloCallData.decodeParameters('core::array::Span::<core::integer::u16>', [
        '2',
        '0x123456',
        '0x789',
      ]);
      expect(res9).toEqual([1193046n, 1929n]);
      const res10 = helloCallData.decodeParameters('(core::felt252, core::integer::u16)', [
        '0x123456',
        '0x789',
      ]);
      expect(res10).toEqual({ '0': 1193046n, '1': 1929n });
      const res11 = helloCallData.decodeParameters('core::starknet::eth_address::EthAddress', [
        '0x123456',
      ]);
      expect(res11).toBe(1193046n);
      const res12 = helloCallData.decodeParameters(
        'core::starknet::contract_address::ContractAddress',
        ['0x123456']
      );
      expect(res12).toBe(1193046n);
      const res13 = helloCallData.decodeParameters('core::starknet::class_hash::ClassHash', [
        '0x123456',
      ]);
      expect(res13).toBe(1193046n);
      const res14 = c1v2CallData.decodeParameters('core::option::Option::<core::integer::u8>', [
        '0',
        '0x12',
      ]);
      expect(res14).toEqual({ Some: 18n, None: undefined });
      const res15 = c1v2CallData.decodeParameters(
        'core::result::Result::<hello_res_events_newTypes::hello_res_events_newTypes::Order, core::integer::u16>',
        ['0', '0x12', '0x345']
      );
      expect(res15).toEqual({ Ok: { p1: 18n, p2: 837n }, Err: undefined });
      const res16 = c1v2CallData.decodeParameters(
        'hello_res_events_newTypes::hello_res_events_newTypes::MyEnum',
        ['0', '0x12', '0x5678']
      );
      expect(res16).toEqual({
        variant: {
          Response: { p1: 18n, p2: 22136n },
          Warning: undefined,
          Error: undefined,
        },
      });
    });
  });

  test('should correctly compile and decompile complex data structures', async () => {
    // const complexData = {
    //   id: CairoFelt(1),
    //   name: 'Alice',
    //   transactions: [{ amount: 100, timestamp: '1625235962' }],
    //   isActive: true,
    // };

    const cd = new CallData(compiledComplexSierra.abi);
    const compiledData = cd.compile('calldata', ['0x34a', [1, 3n]]);
    console.log(compiledData);
  });
});
