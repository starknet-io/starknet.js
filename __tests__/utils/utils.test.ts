import * as starkCurve from '@scure/starknet';

import { constants, ec, hash, num, units } from '../../src';
import { ETHtokenAddress } from '../config';

// @scure/starknet is ESM-only since v2: its exports are non-configurable getters that
// jest.spyOn cannot redefine. Replacing the module with a plain (writable) copy restores
// spy-ability while keeping the real implementations. (@swc/jest hoists jest.mock.)
jest.mock('@scure/starknet', () => ({
  __esModule: true,
  ...jest.requireActual('@scure/starknet'),
}));

const { IS_BROWSER } = constants;

test('units', () => {
  expect(units(1n, 'fri')).toEqual('0.000000000000000001');
  expect(units(1000n, 'fri')).toEqual('0.000000000000001');
  expect(units(123123123n, 'fri')).toEqual('0.000000000123123123');
  expect(units('123123123', 'fri')).toEqual('0.000000000123123123');
  expect(units(10n ** 18n, 'fri')).toEqual('1');
  expect(units(30n * 10n ** 16n, 'fri')).toEqual('0.3');
  expect(units(30n * 10n ** 22n, 'fri')).toEqual('300000');
  expect(units('0x40ff', 'fri')).toEqual('0.000000000000016639');

  expect(units('0.3', 'strk')).toEqual('300000000000000000');
  expect(units('1', 'strk')).toEqual('1000000000000000000');
  expect(units('1000', 'strk')).toEqual('1000000000000000000000');
  expect(units('123123123.123', 'strk')).toEqual('123123123123000000000000000');
  expect(units('0x40ff', 'strk')).toEqual('16639000000000000000000');

  expect(units('0.123456789012345678', 'strk')).toEqual('123456789012345678');
  expect(units('0', 'strk')).toEqual('0');
  expect(units('0.0', 'strk')).toEqual('0');
  expect(units('000', 'strk')).toEqual('0');
  expect(units(0n, 'strk')).toEqual('0');
  expect(units('0x0', 'strk')).toEqual('0');
  expect(() => units('0.1234567890123456789', 'strk')).toThrow(/18 decimals/);
  expect(() => units('1.0000000000000000001', 'strk')).toThrow(/18 decimals/);

  const toTest = ['0.333', '123123123.123', '1000.1', '123123123.123123', '0.0000003', '0'];
  toTest.forEach((element) => {
    expect(units(units(element, 'strk'), 'fri')).toEqual(element);
  });
});

test('units: short strk amounts', () => {
  expect(units('.5', 'strk')).toEqual('500000000000000000');
  expect(units('1.', 'strk')).toEqual('1000000000000000000');
});

test('units: negative strk amounts', () => {
  expect(units('-1.5', 'strk')).toEqual('-1500000000000000000');
  expect(units('-.5', 'strk')).toEqual('-500000000000000000');
  expect(units(-1n, 'strk')).toEqual('-1000000000000000000');
  // minus zero is zero, without a sign
  expect(units('-0', 'strk')).toEqual('0');
  expect(units('-0.0', 'strk')).toEqual('0');
});

test('units: zeros after the 18th decimal are accepted', () => {
  expect(units('1.50000000000000000000', 'strk')).toEqual('1500000000000000000');
  expect(units('0.0000000000000000010', 'strk')).toEqual('1');
});

test('units: a strk amount with several dots is refused', () => {
  // '1.000.000' is one million in some countries: it must not become 1 strk
  expect(() => units('1.000.000', 'strk')).toThrow("units: '1.000.000' is not a strk amount");
  expect(() => units('1.2.3', 'strk')).toThrow("units: '1.2.3' is not a strk amount");
});

test('units: a strk amount with other characters is refused', () => {
  // '1 ' must not become 1 fri
  expect(() => units('1 ', 'strk')).toThrow("units: '1 ' is not a strk amount");
  expect(() => units(' 1', 'strk')).toThrow("units: ' 1' is not a strk amount");
  expect(() => units('1,5', 'strk')).toThrow("units: '1,5' is not a strk amount");
  expect(() => units('+1.5', 'strk')).toThrow("units: '+1.5' is not a strk amount");
  expect(() => units('1e3', 'strk')).toThrow("units: '1e3' is not a strk amount");
  expect(() => units('--1', 'strk')).toThrow("units: '--1' is not a strk amount");
  expect(() => units('-0x10', 'strk')).toThrow("units: '-0x10' is not a strk amount");
});

test('units: a strk amount with no digit is refused', () => {
  expect(() => units('', 'strk')).toThrow("units: '' is not a strk amount");
  expect(() => units('.', 'strk')).toThrow("units: '.' is not a strk amount");
  expect(() => units('-', 'strk')).toThrow("units: '-' is not a strk amount");
  expect(() => units('0x', 'strk')).toThrow("Invalid input: '0x' holds no hexadecimal digit");
});

test('units: a strk amount given as a number is refused', () => {
  // TypeScript forbids it, but plain JavaScript can pass a number: it used to give 0 fri
  expect(() => units(1.5 as unknown as string, 'strk')).toThrow(
    'units: a strk amount must be a string or a bigint, not number'
  );
});

test('units: negative fri amounts', () => {
  expect(units(-1n, 'fri')).toEqual('-0.000000000000000001');
  expect(units('-1', 'fri')).toEqual('-0.000000000000000001');
  expect(units(-(10n ** 17n), 'fri')).toEqual('-0.1');
  expect(units(-15n * 10n ** 17n, 'fri')).toEqual('-1.5');
});

test('units: negative amounts survive a round trip', () => {
  expect(units(units('-0.000000000000000001', 'strk'), 'fri')).toEqual('-0.000000000000000001');
  expect(units(units(-340n, 'fri'), 'strk')).toEqual('-340');
});

test('units: an empty fri amount is refused', () => {
  // BigInt('') is 0n: without this check, '' would become '0' strk
  expect(() => units('', 'fri')).toThrow('units: the fri amount is an empty string');
  expect(() => units(' ', 'fri')).toThrow('units: the fri amount is an empty string');
  expect(() => units('0x', 'fri')).toThrow("Invalid input: '0x' holds no hexadecimal digit");
});

test('isNode', () => {
  expect(IS_BROWSER).toBe(false);
});

describe('hexToDecimalString()', () => {
  test('parse 0xa23', () => {
    expect(num.hexToDecimalString('0xa23')).toBe('2595');
  });
});

describe('getSelectorFromName()', () => {
  test('hash works for value="test"', () => {
    expect(hash.getSelectorFromName('test')).toBe(
      '0x22ff5f21f0b81b113e63f7db6da94fedef11b2119b4088b89664fb9a3cb658'
    );
  });
  test('hash works for value="initialize"', () => {
    expect(hash.getSelectorFromName('initialize')).toBe(
      '0x79dc0da7c54b95f10aa182ad0a46400db63156920adb65eca2654c0945a463'
    );
  });
  test('hash works for value="mint"', () => {
    expect(hash.getSelectorFromName('mint')).toBe(
      '0x2f0b3c5710379609eb5495f1ecd348cb28167711b73609fe565a72734550354'
    );
  });
});

describe('computeHashOnElements()', () => {
  test('should return valid hash for empty array', () => {
    const res = hash.computeHashOnElements([]);
    expect(res).toMatchInlineSnapshot(
      `"0x49ee3eba8c1600700ee1b87eb599f16716b0b1022947733551fde4050ca6804"`
    );
  });
  test('should return valid hash for valid array', () => {
    const res = hash.computeHashOnElements([
      num.toBigInt(123782376),
      num.toBigInt(213984),
      num.toBigInt(128763521321),
    ]);
    expect(res).toMatchInlineSnapshot(
      `"0x7b422405da6571242dfc245a43de3b0fe695e7021c148b918cd9cdb462cac59"`
    );
  });
});

describe('calculateContractAddressFromHash()', () => {
  const daiAddress = '0x03e85bfbb8e2a42b7bead9e88e9a1b19dbccf661471061807292120462396ec9';
  const factoryAddress = '0x249827618A01858A72B7D04339C47195A324D20D6037033DFE2829F98AFF4FC';
  const classHash = '0x55187E68C60664A947048E0C9E5322F9BF55F7D435ECDCF17ED75724E77368F';
  // Any type of salt can be used. It depends on the dApp what kind of salt it wants to use.
  const salt = ec.starkCurve.pedersen(ETHtokenAddress, daiAddress);

  // This test just shows how to use calculateContractAddressFromHash for new devs
  test('calculated contract address should match the snapshot', () => {
    const res = hash.calculateContractAddressFromHash(
      salt,
      classHash,
      [ETHtokenAddress, daiAddress, factoryAddress],
      factoryAddress
    );

    expect(res).toMatchInlineSnapshot(
      `"0x36dc8dcb3440596472ddde11facacc45d0cd250df764ae7c3d1a360c853c324"`
    );
  });

  test('output should be bound', () => {
    const starkCurveSpy = jest.spyOn(starkCurve, 'pedersen');
    starkCurveSpy.mockReturnValue(num.toHex(constants.ADDR_BOUND + 1n));
    const res = hash.calculateContractAddressFromHash(
      salt,
      classHash,
      [ETHtokenAddress, daiAddress, factoryAddress],
      factoryAddress
    );
    expect(starkCurveSpy).toHaveBeenCalled();
    expect(BigInt(res)).toBeLessThan(constants.ADDR_BOUND);
    starkCurveSpy.mockRestore();
  });
});
