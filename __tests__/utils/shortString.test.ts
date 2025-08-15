import { CairoByteArray } from '../../src';
import { removeHexPrefix } from '../../src/utils/encode';
import {
  decodeShortString,
  encodeShortString,
  isDecimalString,
  isShortString,
} from '../../src/utils/shortString';

describe('shortString', () => {
  test('should convert string to number', () => {
    expect(encodeShortString('hello')).toMatchInlineSnapshot(`"0x68656c6c6f"`);
  });

  test('should throw if string to encode is too long', () => {
    expect(() =>
      encodeShortString('hello world hello world hello world hello world hello world hello world')
    ).toThrowErrorMatchingInlineSnapshot(
      `"hello world hello world hello world hello world hello world hello world is too long"`
    );
  });

  test('should throw if string to encode contains non ascii chars', () => {
    expect(() => encodeShortString('hello\uD83D\uDE00')).toThrowErrorMatchingInlineSnapshot(
      `"hello😀 is not an ASCII string"`
    );
  });

  test('should convert hex number string to string', () => {
    expect(JSON.stringify(decodeShortString('0x68656c6c6f'))).toBe('"hello"');
  });

  test('should convert decimal number string to string', () => {
    expect(JSON.stringify(decodeShortString('448378203247'))).toBe('"hello"');
  });

  test('should throw if decode input is not ascii chars', () => {
    expect(() => decodeShortString('hello\uD83D\uDE00')).toThrowErrorMatchingInlineSnapshot(
      `"hello😀 is not an ASCII string"`
    );
  });

  test('should throw if decode input is not Hex string or numerical string', () => {
    expect(() => decodeShortString('Test')).toThrowErrorMatchingInlineSnapshot(
      `"Test is not Hex or decimal"`
    );
  });

  test('explicitly test removeHexPrefix', () => {
    expect(removeHexPrefix('0x01')).toBe('01');
    expect(removeHexPrefix('0X01')).toBe('01');
  });

  test('convert string to ByteArray', () => {
    expect(
      CairoByteArray.byteArrayFromString(
        'ABCDEFGHIJKLMNOPQRSTUVWXYZ12345AAADEFGHIJKLMNOPQRSTUVWXYZ12345A'
      )
    ).toEqual({
      data: [
        '0x4142434445464748494a4b4c4d4e4f505152535455565758595a3132333435',
        '0x4141414445464748494a4b4c4d4e4f505152535455565758595a3132333435',
      ],
      pending_word: '0x41',
      pending_word_len: 1,
    });
    expect(CairoByteArray.byteArrayFromString('ABCDEFGHIJKLMNOPQRSTUVWXYZ12345')).toEqual({
      data: ['0x4142434445464748494a4b4c4d4e4f505152535455565758595a3132333435'],
      pending_word: '0x00',
      pending_word_len: 0,
    });
    expect(CairoByteArray.byteArrayFromString('ABCDEFGHIJKLMNOPQRSTUVWXYZ1234')).toEqual({
      data: [],
      pending_word: '0x4142434445464748494a4b4c4d4e4f505152535455565758595a31323334',
      pending_word_len: 30,
    });
    expect(CairoByteArray.byteArrayFromString('')).toEqual({
      data: [],
      pending_word: '0x00',
      pending_word_len: 0,
    });
  });

  test('convert ByteArray to string', () => {
    expect(
      CairoByteArray.stringFromByteArray({
        data: [
          '0x4142434445464748494a4b4c4d4e4f505152535455565758595a3132333435',
          '0x4141414445464748494a4b4c4d4e4f505152535455565758595a3132333435',
        ],
        pending_word: '0x41',
        pending_word_len: 1,
      })
    ).toBe('ABCDEFGHIJKLMNOPQRSTUVWXYZ12345AAADEFGHIJKLMNOPQRSTUVWXYZ12345A');
  });
  expect(
    CairoByteArray.stringFromByteArray({
      data: [],
      pending_word: '0x4142434445464748494a4b4c4d4e4f505152535455565758595a31323334',
      pending_word_len: 30,
    })
  ).toBe('ABCDEFGHIJKLMNOPQRSTUVWXYZ1234');
  expect(
    CairoByteArray.stringFromByteArray({
      data: [],
      pending_word: '0x00',
      pending_word_len: 0,
    })
  ).toBe('');
});

describe('isShortString', () => {
  test('should return true for short strings', () => {
    const shortStr = '1234567890123456789012345678901';
    expect(isShortString(shortStr)).toBe(true);
  });

  test('should return true for short strings', () => {
    // TODO: IMPORTANT: This pass even though it's 31 chars long, but each char is 2 bytes, so it's 62 bytes long
    // TODO: felt can store 31 bytes + 4 bits.
    // TODO: This is a bug, we need to fix it.
    // TODO: We need to check if the string is 31 bytes long or less, not by character number.
    const shortStr = '☥☥☥☥☥☥☥☥☥☥☥☥☥☥☥☥☥☥☥☥☥☥☥☥☥☥☥☥☥☥☥';
    expect(isShortString(shortStr)).toBe(true);
  });

  test('should return false for long strings', () => {
    const longStr = '12345678901234567890123456789012';
    expect(isShortString(longStr)).toBe(false);
  });
});

describe('isDecimalString', () => {
  test('should return true for decimal strings', () => {
    expect(isDecimalString('1234567890')).toBe(true);
  });

  test('should return false for non-decimal strings', () => {
    expect(isDecimalString('123A')).toBe(false);
    expect(isDecimalString('ABCDE')).toBe(false);
    expect(isDecimalString('123.456')).toBe(false);
  });
});
