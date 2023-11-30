import { removeHexPrefix } from '../../src/utils/encode';
import { decodeShortString, encodeShortString, splitLongString } from '../../src/utils/shortString';
import { TEXT_TO_FELT_MAX_LEN } from '../../src/constants';

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
});

describe('splitLongString', () => {
  it('should split a long string into an array of substrings', () => {
    const string = 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
    const result = splitLongString(string);
    expect(result).toEqual(['aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 'a']);
  });

  it('should split a long string into an array of substrings with max length', () => {
    const longStr = 'This is a long string that needs to be split into smaller parts.';
    const result = splitLongString(longStr);
    expect(result).toEqual([
      'This is a long string that need',
      's to be split into smaller part',
      's.',
    ]);
    expect(result[0].length).toBe(TEXT_TO_FELT_MAX_LEN);
  });

  it('should return an empty array for an empty string', () => {
    const result = splitLongString('');
    expect(result).toEqual([]);
  });
});
