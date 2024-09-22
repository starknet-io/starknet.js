import {
  isHex,
  toBigInt,
  toHex,
  hexToDecimalString,
  cleanHex,
  assertInRange,
  bigNumberishArrayToDecimalStringArray,
  bigNumberishArrayToHexadecimalStringArray,
  isStringWholeNumber,
  getDecimalString,
  getHexString,
  getHexStringArray,
  toCairoBool,
  hexToBytes,
  addPercent,
} from '../../src/utils/num';
import { num } from '../../src';

describe('isHex', () => {
  test('should return true for valid hex strings', () => {
    expect(isHex('0xab')).toBe(true);
    expect(isHex('0xAB')).toBe(true);
    expect(isHex('0x0')).toBe(true);
    expect(isHex('0x12345')).toBe(true);
  });

  test('should return false for non-hex strings', () => {
    expect(isHex('0xG')).toBe(false);
    expect(isHex('ab')).toBe(false);
    expect(isHex('123')).toBe(false);
    expect(isHex('')).toBe(false);
  });
});

describe('toBigInt', () => {
  test('should properly convert to big int', () => {
    expect(toBigInt(0)).toBe(0n);
    expect(toBigInt(123)).toBe(123n);
    expect(toBigInt(-123)).toBe(-123n);
    expect(toBigInt('1')).toBe(1n);
  });

  test('should throw for invalid arg', () => {
    expect(() => toBigInt('test')).toThrow();
  });
});

describe('toHex', () => {
  test('should properly convert to hex-string', () => {
    expect(toHex(100)).toBe('0x64');
    expect(toHex('200')).toBe('0xc8');
  });
});

describe('hexToDecimalString', () => {
  test('should properly convert to decimal string', () => {
    expect(hexToDecimalString('64')).toBe('100');
    expect(hexToDecimalString('c8')).toBe('200');
  });
});

describe('cleanHex', () => {
  test('should properly clean up the hex string', () => {
    expect(cleanHex('0x00023AB')).toBe('0x23ab');
  });
});

describe('assertInRange', () => {
  test('should not throw when assertion is true', () => {
    expect(() => assertInRange(10, 5, 20, 'value')).not.toThrow();
  });

  test('should throw when assertion is false', () => {
    expect(() => assertInRange(30, 5, 20, 'value')).toThrow();
  });
});

describe('bigNumberishArrayToDecimalStringArray', () => {
  test('should properly convert array elements to decimal strings', () => {
    expect(bigNumberishArrayToDecimalStringArray([100, BigInt(200)])).toStrictEqual(['100', '200']);
  });
});

describe('bigNumberishArrayToHexadecimalStringArray', () => {
  test('should properly convert array elements to hex-strings', () => {
    expect(bigNumberishArrayToHexadecimalStringArray([100, BigInt(200)])).toStrictEqual([
      '0x64',
      '0xc8',
    ]);
  });
});

describe('isStringWholeNumber', () => {
  test('should return correct values', () => {
    expect(isStringWholeNumber('100')).toBe(true);
    expect(isStringWholeNumber('03')).toBe(true);
    expect(isStringWholeNumber('10.0')).toBe(false);
    expect(isStringWholeNumber('test')).toBe(false);
  });
});

describe('getDecimalString', () => {
  test('should properly convert hex-string to decimal string', () => {
    expect(getDecimalString('0x1a')).toBe('26');
  });

  test('should throw when arg is non-valid', () => {
    expect(() => getDecimalString('test')).toThrow();
  });
});

describe('getHexString', () => {
  test('should properly convert to hex-string', () => {
    expect(getHexString('123')).toBe('0x7b');
  });

  test('should throw when arg is non-valid', () => {
    expect(() => getHexString('test')).toThrow();
  });
});

describe('getHexStringArray', () => {
  test('should properly convert array elements to hex-strings', () => {
    expect(getHexStringArray(['100', '200', '0xaa'])).toStrictEqual(['0x64', '0xc8', '0xaa']);
  });
});

describe('toCairoBool', () => {
  test('should properly convert boolean to cairo bool string', () => {
    expect(toCairoBool(false)).toBe('0');
    expect(toCairoBool(true)).toBe('1');
  });
});

describe('hexToBytes', () => {
  test('should properly convert to an array of bytes', () => {
    expect(hexToBytes('0x64')).toStrictEqual(Uint8Array.from([0x64]));
  });

  test('should throw when arg is non-valid', () => {
    expect(() => hexToBytes('test')).toThrow('test needs to be a hex-string');
  });
});

describe('addPercent', () => {
  test('should calculate result and return correct value', () => {
    expect(addPercent(100, 50)).toBe(150n);
    expect(addPercent(100, 0)).toBe(100n);
    expect(addPercent(100, 100)).toBe(200n);
    expect(addPercent(100, 200)).toBe(300n);
    expect(addPercent(100, -50)).toBe(50n);
    expect(addPercent(200, 50)).toBe(300n);
    expect(addPercent(200, -50)).toBe(100n);
    expect(addPercent(200, -100)).toBe(0n);
    expect(addPercent(200, -150)).toBe(-100n);
  });
});

describe('stringToSha256ToArrayBuff4', () => {
  test('should correctly hash&encode an utf8 string', () => {
    const buff = num.stringToSha256ToArrayBuff4('LedgerW');
    expect(buff).toEqual(new Uint8Array([43, 206, 231, 219]));
  });
});

describe('isBigNumberish', () => {
  test('determine if value is a BigNumberish', () => {
    expect(num.isBigNumberish(234)).toBe(true);
    expect(num.isBigNumberish(234n)).toBe(true);
    expect(num.isBigNumberish('234')).toBe(true);
    expect(num.isBigNumberish('0xea')).toBe(true);
    expect(num.isBigNumberish('ea')).toBe(false);
    expect(num.isBigNumberish('zero')).toBe(false);
  });
});
