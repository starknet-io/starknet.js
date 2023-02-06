import { removeHexPrefix } from '../../src/utils/encode';
import { decodeShortString, encodeShortString } from '../../src/utils/shortString';

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
