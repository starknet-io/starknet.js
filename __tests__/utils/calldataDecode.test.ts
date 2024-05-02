import { DecodeConfig } from '../../src/types';

import {
  // Account,
  BigNumberish,
  CairoUint256,
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
  // num,
  // selector,
  // shortString,
  // stark,
  // types,
  // type Uint512,
} from '../../src';

import {
  // compiledC1v2,
  // compiledHelloSierra,
  compiledComplexSierra,
} from '../config/fixtures';

const {
  // uint256,
  tuple,
  //  isCairo1Abi
} = cairo;

describe('Cairo 1', () => {
  test('should correctly compile and decompile complex data structures', async () => {
    type Order2 = {
      p1: BigNumberish;
      p2: BigNumberish[];
    };

    const myOrder2bis: Order2 = {
      // wrong order
      p2: ['abcd', '56ec'],
      p1: 'smolstring',
    };

    const secondUint256: CairoUint256 = new CairoUint256(40000n);
    const tempUint256 = { low: 23456n, high: 1n } as CairoUint256;
    const thirdUint256: CairoUint256 = new CairoUint256(tempUint256);
    const myFalseUint256: CairoUint256 = thirdUint256; // wrong order

    const myRawArgsObject: RawArgsObject = {
      // wrong order
      active: true,
      symbol: 'NIT',
      initial_supply: myFalseUint256,
      recipient: '0x7e00d496e324876bbc8531f2d9a82bf154d1a04a50218ee74cdd372f75a551a',
      decimals: 18,
      tupoftup: tuple(tuple(34, 94), myFalseUint256),
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
      tuple1: tuple(secondUint256, myOrder2bis, [54, 55, 174], 59),
      name: 'niceToken',
      array5: [tuple(251, 40000), tuple(252, 40001)],
    };

    const myRawArgsArray: RawArgsArray = [
      'niceToken',
      'NIT',
      18,
      thirdUint256,
      { p1: '17', p2: ['234', '467456745457', '0x56ec'] },
      '0x7e00d496e324876bbc8531f2d9a82bf154d1a04a50218ee74cdd372f75a551a',
      true,
      { '0': { '0': 34, '1': 94 }, '1': thirdUint256 },
      'Bug is back, for ever, here and everywhere',
      ['100', '101', '102'],
      [
        [200, 201],
        [202, 203],
        [204, 205],
      ],
      [
        { p1: '17', p2: ['234', '467456745457n', '0x56ec'] },
        { p1: '17', p2: ['234', '467456745457n', '0x56ec'] },
      ],
      [thirdUint256, thirdUint256],
      {
        '0': secondUint256,
        '1': { p1: '17', p2: ['234', '467456745457n', '0x56ec'] },
        '2': [54, 55, 56],
        '3': 59,
      },
      [
        { '0': 251, '1': 40000 },
        { '0': 252, '1': 40001 },
      ],
    ];

    const config: DecodeConfig = {
      felt: String,
      'core::felt252': String,
      'core::integer::u8': Number,
      'core::integer::u16': Number,
      'core::integer::u64': Number,
      'core::integer::u128': BigInt,
      'core::starknet::contract_address::ContractAddress': String,
      longText: String,
    };

    const cd: CallData = new CallData(compiledComplexSierra.abi);
    const compiledDataFromObject: Calldata = cd.compile('constructor', myRawArgsObject);
    const compiledDataFromArray: Calldata = cd.compile('constructor', myRawArgsArray);
    const decompiledDataFromObject = cd.decompile('constructor', compiledDataFromObject, config);
    const decompiledDataFromArray = cd.decompile(
      'constructor',
      compiledDataFromArray,
      config,
      true
    );

    expect(decompiledDataFromObject).toEqual(myRawArgsObject);
    expect(decompiledDataFromArray).toEqual(myRawArgsArray);
  });
});
