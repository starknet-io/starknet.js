import { encode } from '../../src';
import {
  atobUniversal,
  btoaUniversal,
  hexStringToUint8Array,
  bigIntToUint8Array,
  stringToUint8Array,
  uint8ArrayToBigInt,
} from '../../src/utils/encode';

describe('atobUniversal and btoaUniversal functions', () => {
  test('atobUniversal should decode base64 string to Uint8Array', () => {
    const base64 = 'SGVsbG8sIFdvcmxkIQ=='; // "Hello, World!" in base64
    const expected = new Uint8Array([72, 101, 108, 108, 111, 44, 32, 87, 111, 114, 108, 100, 33]);
    const result = atobUniversal(base64);
    expect(result).toEqual(expected);
  });

  test('btoaUniversal should encode ArrayBuffer to base64 string', () => {
    const { buffer } = new Uint8Array([72, 101, 108, 108, 111, 44, 32, 87, 111, 114, 108, 100, 33]);

    const expected = 'SGVsbG8sIFdvcmxkIQ=='; // "Hello, World!" in base64
    const result = btoaUniversal(buffer);
    expect(result).toBe(expected);
  });

  test('should round trip encode/decode correctly', () => {
    const originalString = 'Hello, World!';
    const { buffer } = new TextEncoder().encode(originalString);
    const encoded = btoaUniversal(buffer);
    const decoded = new TextDecoder().decode(atobUniversal(encoded));
    expect(decoded).toBe(originalString);
  });

  test('should handle empty string', () => {
    const emptyBuffer = new ArrayBuffer(0);
    const encoded = btoaUniversal(emptyBuffer);
    expect(encoded).toBe('');
    const decoded = atobUniversal(encoded);
    expect(decoded).toEqual(new Uint8Array([]));
  });
});

describe('concatenateArrayBuffer', () => {
  test('should concatenate uint8Arrays', () => {
    const path0buff = new Uint8Array([128, 0, 10, 85]);
    const path1buff = new Uint8Array([71, 65, 233, 201]);
    const result = encode.concatenateArrayBuffer([path0buff, path1buff]);
    expect(result).toEqual(new Uint8Array([128, 0, 10, 85, 71, 65, 233, 201]));
  });
});

describe('hexToUint8Array', () => {
  test('should convert hex string with 0x prefix to Uint8Array', () => {
    const hex = '0x48656c6c6f';
    const expected = new Uint8Array([72, 101, 108, 108, 111]); // "Hello" in ASCII
    const result = hexStringToUint8Array(hex);
    expect(result).toEqual(expected);
  });

  test('should convert hex string without 0x prefix to Uint8Array', () => {
    const hex = '48656c6c6f';
    const expected = new Uint8Array([72, 101, 108, 108, 111]); // "Hello" in ASCII
    const result = hexStringToUint8Array(hex);
    expect(result).toEqual(expected);
  });

  test('should handle odd-length hex strings by padding', () => {
    const hex = '0x123';
    const expected = new Uint8Array([1, 35]); // Padded to "0123"
    const result = hexStringToUint8Array(hex);
    expect(result).toEqual(expected);
  });

  test('should handle empty hex string', () => {
    const hex = '0x';
    const expected = new Uint8Array([]);
    const result = hexStringToUint8Array(hex);
    expect(result).toEqual(expected);
  });

  test('should handle single byte hex', () => {
    const hex = '0xff';
    const expected = new Uint8Array([255]);
    const result = hexStringToUint8Array(hex);
    expect(result).toEqual(expected);
  });

  test('should handle large hex values', () => {
    const hex = '0xdeadbeefcafe1234';
    const expected = new Uint8Array([222, 173, 190, 239, 202, 254, 18, 52]);
    const result = hexStringToUint8Array(hex);
    expect(result).toEqual(expected);
  });

  test('should accept valid decimal-looking hex strings', () => {
    // '56' is valid hex (equals decimal 86)
    const hex = '56';
    const expected = new Uint8Array([86]);
    const result = hexStringToUint8Array(hex);
    expect(result).toEqual(expected);
  });

  test('should throw error for non-hex characters', () => {
    expect(() => hexStringToUint8Array('i am great')).toThrow('Invalid hex string: "i am great"');
    expect(() => hexStringToUint8Array('0xg123')).toThrow('Invalid hex string: "0xg123"');
    expect(() => hexStringToUint8Array('hello')).toThrow('Invalid hex string: "hello"');
    expect(() => hexStringToUint8Array('12z4')).toThrow('Invalid hex string: "12z4"');
  });
});

describe('bigIntToUint8Array', () => {
  test('should convert zero bigint to single zero byte', () => {
    const value = 0n;
    const expected = new Uint8Array([0]);
    const result = bigIntToUint8Array(value);
    expect(result).toEqual(expected);
  });

  test('should convert small positive bigint to Uint8Array', () => {
    const value = 255n;
    const expected = new Uint8Array([255]);
    const result = bigIntToUint8Array(value);
    expect(result).toEqual(expected);
  });

  test('should convert medium bigint to Uint8Array', () => {
    const value = 0x1234n;
    const expected = new Uint8Array([18, 52]);
    const result = bigIntToUint8Array(value);
    expect(result).toEqual(expected);
  });

  test('should convert large bigint to Uint8Array', () => {
    const value = 0xdeadbeefcafe1234n;
    const expected = new Uint8Array([222, 173, 190, 239, 202, 254, 18, 52]);
    const result = bigIntToUint8Array(value);
    expect(result).toEqual(expected);
  });

  test('should handle odd-length hex representation by padding', () => {
    const value = 0x123n; // Hex: 123 -> padded to 0123
    const expected = new Uint8Array([1, 35]);
    const result = bigIntToUint8Array(value);
    expect(result).toEqual(expected);
  });

  test('should handle very large bigint values', () => {
    // Maximum felt252 value is close to 2^251
    const value = 2n ** 250n - 1n;
    const result = bigIntToUint8Array(value);
    // Should produce a Uint8Array of 32 bytes (256 bits)
    expect(result.length).toBeLessThanOrEqual(32);
    // Convert back to verify
    let reconstructed = 0n;
    for (let i = 0; i < result.length; i += 1) {
      reconstructed = reconstructed * 256n + BigInt(result[i]);
    }
    expect(reconstructed).toEqual(value);
  });

  test('should throw error for negative bigint values', () => {
    expect(() => bigIntToUint8Array(-1n)).toThrow(
      'Cannot convert negative bigint -1 to Uint8Array'
    );
    expect(() => bigIntToUint8Array(-255n)).toThrow(
      'Cannot convert negative bigint -255 to Uint8Array'
    );
    expect(() => bigIntToUint8Array(-123456789n)).toThrow(
      'Cannot convert negative bigint -123456789 to Uint8Array'
    );
  });
});

describe('stringToUint8Array', () => {
  test('should handle hex strings with 0x prefix', () => {
    const str = '0x48656c6c6f';
    const expected = new Uint8Array([72, 101, 108, 108, 111]); // "Hello" as hex
    const result = stringToUint8Array(str);
    expect(result).toEqual(expected);
  });

  test('should handle strings that look like hex but without 0x prefix as text', () => {
    const str = 'deadbeef';
    // Without 0x prefix, this is treated as text, not hex
    const expected = new TextEncoder().encode(str);
    const result = stringToUint8Array(str);
    expect(result).toEqual(expected);
  });

  test('should handle decimal strings', () => {
    const str = '256';
    const expected = new Uint8Array([1, 0]); // 256 = 0x0100
    const result = stringToUint8Array(str);
    expect(result).toEqual(expected);
  });

  test('should handle large decimal strings', () => {
    const str = '1234567890';
    const expected = bigIntToUint8Array(1234567890n);
    const result = stringToUint8Array(str);
    expect(result).toEqual(expected);
  });

  test('should handle text strings with ASCII characters', () => {
    const str = 'Hello World';
    const expected = new Uint8Array([72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100]);
    const result = stringToUint8Array(str);
    expect(result).toEqual(expected);
  });

  test('should handle text strings with Unicode characters', () => {
    const str = 'I am cool ☥';
    // UTF-8 encoding: I=73, space=32, a=97, m=109, space=32, c=99, o=111, o=111, l=108, space=32, ☥=E2 98 A5
    const expected = new Uint8Array([73, 32, 97, 109, 32, 99, 111, 111, 108, 32, 226, 152, 165]);
    const result = stringToUint8Array(str);
    expect(result).toEqual(expected);
  });

  test('should handle text with mixed content', () => {
    const str = 'test123!@#';
    // This will be treated as text since it contains non-hex characters
    const expected = new TextEncoder().encode(str);
    const result = stringToUint8Array(str);
    expect(result).toEqual(expected);
  });

  test('should handle empty string', () => {
    const str = '';
    const expected = new Uint8Array([]);
    const result = stringToUint8Array(str);
    expect(result).toEqual(expected);
  });

  test('should handle zero decimal string', () => {
    const str = '0';
    const expected = new Uint8Array([0]);
    const result = stringToUint8Array(str);
    expect(result).toEqual(expected);
  });

  test('should distinguish hex from decimal when ambiguous', () => {
    // '123' could be hex or decimal, but isHex should detect it as hex
    // since it contains only hex-valid characters (0-9, a-f)
    const str = '123';
    // If detected as hex: 0x123 = 291 decimal
    // If detected as decimal: 123 = 0x7B
    // Let's check what it actually does
    const result = stringToUint8Array(str);
    // This depends on how isHex is implemented - if it requires 0x prefix,
    // then '123' would be treated as decimal
    const expectedAsDecimal = bigIntToUint8Array(123n);
    expect(result).toEqual(expectedAsDecimal);
  });
});

describe('uint8ArrayToBigInt', () => {
  test('should convert single zero byte to 0n', () => {
    const data = new Uint8Array([0]);
    const result = uint8ArrayToBigInt(data);
    expect(result).toBe(0n);
  });

  test('should convert small values correctly', () => {
    const data = new Uint8Array([255]);
    const result = uint8ArrayToBigInt(data);
    expect(result).toBe(255n);
  });

  test('should correctly convert 256n and back', () => {
    const value = 256n;
    const bn = uint8ArrayToBigInt(bigIntToUint8Array(value));
    expect(bn).toBe(value); // Verify it matches original
  });

  test('should convert multi-byte values correctly', () => {
    const data = new Uint8Array([1, 0]); // 256 in big-endian
    const result = uint8ArrayToBigInt(data);
    expect(result).toBe(256n);
  });

  test('should convert large values correctly', () => {
    const data = new Uint8Array([222, 173, 190, 239, 202, 254, 18, 52]);
    const result = uint8ArrayToBigInt(data);
    expect(result).toBe(0xdeadbeefcafe1234n);
  });

  test('should handle empty array', () => {
    const data = new Uint8Array([]);
    const result = uint8ArrayToBigInt(data);
    expect(result).toBe(0n);
  });

  test('should handle null/undefined input', () => {
    expect(uint8ArrayToBigInt(null as any)).toBe(0n);
    expect(uint8ArrayToBigInt(undefined as any)).toBe(0n);
  });

  test('should be inverse of bigIntToUint8Array', () => {
    const testValues = [0n, 1n, 255n, 256n, 65535n, 0xdeadbeefn, 2n ** 128n - 1n];

    testValues.forEach((value) => {
      const bytes = bigIntToUint8Array(value);
      const reconstructed = uint8ArrayToBigInt(bytes);
      expect(reconstructed).toBe(value);
    });
  });

  test('should use BIG-ENDIAN byte order', () => {
    // Test various values to confirm big-endian encoding
    // In big-endian, most significant byte comes first

    // 256 = 0x0100 -> [0x01, 0x00] in big-endian
    expect(uint8ArrayToBigInt(new Uint8Array([1, 0]))).toBe(256n);

    // 258 = 0x0102 -> [0x01, 0x02] in big-endian
    expect(uint8ArrayToBigInt(new Uint8Array([1, 2]))).toBe(258n);

    // 0xDEADBEEF = 3735928559 -> [0xDE, 0xAD, 0xBE, 0xEF] in big-endian
    expect(uint8ArrayToBigInt(new Uint8Array([0xde, 0xad, 0xbe, 0xef]))).toBe(0xdeadbeefn);

    // Verify the reverse direction also uses big-endian
    expect(bigIntToUint8Array(256n)).toEqual(new Uint8Array([1, 0]));
    expect(bigIntToUint8Array(0xdeadbeefn)).toEqual(new Uint8Array([0xde, 0xad, 0xbe, 0xef]));
  });
});
