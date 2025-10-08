import { BigNumberish, CairoBytes31, CairoFelt252 } from '../../../src';
import { addHexPrefix } from '../../../src/utils/encode';

function uint8ArrayToSize(input: Uint8Array | Array<number>, size: number = 31) {
  const output = new Uint8Array(size);
  output.set(input, size - input.length);
  return output;
}

function toHex62(number: BigNumberish) {
  return addHexPrefix(BigInt(number).toString(16).padStart(62, '0'));
}

describe('CairoBytes31 class Unit Tests', () => {
  describe('constructor with different input types', () => {
    test('should handle string input', () => {
      const bytes31 = new CairoBytes31('hello');
      expect(bytes31.data).toBeInstanceOf(Uint8Array);
      expect(bytes31.data).toEqual(uint8ArrayToSize([104, 101, 108, 108, 111]));
    });

    test('should handle empty string', () => {
      const bytes31 = new CairoBytes31('');
      expect(bytes31.data).toEqual(uint8ArrayToSize([]));
    });

    test('should handle Unicode strings', () => {
      const bytes31 = new CairoBytes31('☥');
      // '☥' in UTF-8: [226, 152, 165]
      expect(bytes31.data).toEqual(uint8ArrayToSize([226, 152, 165]));
    });

    test('should handle Buffer input', () => {
      const buffer = Buffer.from([72, 101, 108, 108, 111]); // "Hello"
      const bytes31 = new CairoBytes31(buffer);
      expect(bytes31.data).toEqual(uint8ArrayToSize([72, 101, 108, 108, 111]));
    });

    test('should handle empty Buffer', () => {
      const buffer = Buffer.alloc(0);
      const bytes31 = new CairoBytes31(buffer);
      expect(bytes31.data).toEqual(uint8ArrayToSize([]));
    });

    test('should handle Uint8Array input', () => {
      const uint8Array = new Uint8Array([87, 111, 114, 108, 100]); // "World"
      const bytes31 = new CairoBytes31(uint8Array);
      expect(bytes31.data).toEqual(uint8ArrayToSize(uint8Array));
    });

    test('should handle empty Uint8Array', () => {
      const uint8Array = new Uint8Array([]);
      const bytes31 = new CairoBytes31(uint8Array);
      expect(bytes31.data).toEqual(uint8ArrayToSize([]));
    });

    test('should handle maximum length input (31 bytes)', () => {
      const maxString = 'a'.repeat(31); // 31 ASCII chars = 31 bytes
      const bytes31 = new CairoBytes31(maxString);
      expect(bytes31.data.length).toBe(31);
      expect(() => new CairoBytes31(maxString)).not.toThrow();
    });

    test('should reject invalid input types', () => {
      expect(() => new CairoBytes31(123 as any)).toThrow(
        'Invalid input type for CairoBytes31. Expected string, Buffer, or Uint8Array'
      );
      expect(() => new CairoBytes31({} as any)).toThrow(
        'Invalid input type for CairoBytes31. Expected string, Buffer, or Uint8Array'
      );
      expect(() => new CairoBytes31(null as any)).toThrow(
        'Invalid input type for CairoBytes31. Expected string, Buffer, or Uint8Array'
      );
    });

    test('should reject strings longer than 31 bytes', () => {
      const longString = 'a'.repeat(32); // 32 bytes
      expect(() => new CairoBytes31(longString)).toThrow(
        'Data is too long: 32 bytes (max 31 bytes)'
      );
    });

    test('should reject Unicode strings longer than 31 bytes', () => {
      // Each '☥' is 3 bytes in UTF-8, so 11 of them = 33 bytes
      const longUnicode = '☥'.repeat(11);
      expect(() => new CairoBytes31(longUnicode)).toThrow(
        'Data is too long: 33 bytes (max 31 bytes)'
      );
    });

    test('should reject Buffer longer than 31 bytes', () => {
      const longBuffer = Buffer.alloc(32);
      expect(() => new CairoBytes31(longBuffer)).toThrow(
        'Data is too long: 32 bytes (max 31 bytes)'
      );
    });

    test('should reject Uint8Array longer than 31 bytes', () => {
      const longArray = new Uint8Array(32);
      expect(() => new CairoBytes31(longArray)).toThrow(
        'Data is too long: 32 bytes (max 31 bytes)'
      );
    });
  });

  describe('toBigInt method', () => {
    test('should convert empty data to 0n', () => {
      const bytes31 = new CairoBytes31('');
      expect(bytes31.toBigInt()).toBe(0n);
    });

    test('should convert single byte to bigint', () => {
      const bytes31 = new CairoBytes31('A'); // ASCII 65
      expect(bytes31.toBigInt()).toBe(65n);
    });

    test('should convert multi-byte data to bigint', () => {
      const bytes31 = new CairoBytes31('AB'); // [65, 66] = 0x4142 = 16706
      expect(bytes31.toBigInt()).toBe(0x4142n);
    });

    test('should handle Unicode conversion', () => {
      const bytes31 = new CairoBytes31('☥'); // [226, 152, 165] = 0xe298a5
      expect(bytes31.toBigInt()).toBe(0xe298a5n);
    });

    test('should handle Buffer input conversion', () => {
      const buffer = Buffer.from([1, 2, 3]);
      const bytes31 = new CairoBytes31(buffer);
      expect(bytes31.toBigInt()).toBe(0x010203n);
    });

    test('should handle Uint8Array input conversion', () => {
      const array = new Uint8Array([255, 254, 253]);
      const bytes31 = new CairoBytes31(array);
      expect(bytes31.toBigInt()).toBe(0xfffefdn);
    });
  });

  describe('decodeUtf8 method', () => {
    test('should convert ASCII text back to original string', () => {
      const text = 'hello world';
      const bytes31 = new CairoBytes31(text);
      expect(bytes31.decodeUtf8()).toBe(text);
    });

    test('should convert Unicode text back to original string', () => {
      const text = '☥ 世界';
      const bytes31 = new CairoBytes31(text);
      expect(bytes31.decodeUtf8()).toBe(text);
    });

    test('should handle empty string', () => {
      const bytes31 = new CairoBytes31('');
      expect(bytes31.decodeUtf8()).toBe('');
    });

    test('should handle special characters', () => {
      const text = '!@#$%^&*()_+-=[]{}|;:,.<>?';
      const bytes31 = new CairoBytes31(text);
      expect(bytes31.decodeUtf8()).toBe(text);
    });

    test('should handle whitespace characters', () => {
      const text = 'line1\\nline2\\ttab\\r\\nwindows';
      const bytes31 = new CairoBytes31(text);
      expect(bytes31.decodeUtf8()).toBe(text);
    });

    test('should decode Buffer input as text', () => {
      const buffer = Buffer.from('Hello Buffer', 'utf8');
      const bytes31 = new CairoBytes31(buffer);
      expect(bytes31.decodeUtf8()).toBe('Hello Buffer');
    });

    test('should decode Uint8Array input as text', () => {
      // UTF-8 bytes for "Test"
      const array = new Uint8Array([84, 101, 115, 116]);
      const bytes31 = new CairoBytes31(array);
      expect(bytes31.decodeUtf8()).toBe('Test');
    });
  });

  describe('toHexString method', () => {
    test('should convert empty data to 0x0', () => {
      const bytes31 = new CairoBytes31('');
      expect(bytes31.toHexString()).toBe('0x0');
      expect(bytes31.toHexString('padded')).toBe(toHex62('0x0'));
    });

    test('should convert single character to hex', () => {
      const bytes31 = new CairoBytes31('A'); // ASCII 65 = 0x41
      expect(bytes31.toHexString()).toBe('0x41');
      expect(bytes31.toHexString('padded')).toBe(toHex62('0x41'));
    });

    test('should convert multi-character string to hex', () => {
      const bytes31 = new CairoBytes31('AB'); // [65, 66] = 0x4142
      expect(bytes31.toHexString()).toBe('0x4142');
      expect(bytes31.toHexString('padded')).toBe(toHex62('0x4142'));
    });

    test('should convert Unicode to hex', () => {
      const bytes31 = new CairoBytes31('☥'); // [226, 152, 165] = 0xe298a5
      expect(bytes31.toHexString()).toBe('0xe298a5');
      expect(bytes31.toHexString('padded')).toBe(toHex62('0xe298a5'));
    });

    test('should convert Buffer to hex', () => {
      const buffer = Buffer.from([255, 254]);
      const bytes31 = new CairoBytes31(buffer);
      expect(bytes31.toHexString()).toBe('0xfffe');
      expect(bytes31.toHexString('padded')).toBe(toHex62('0xfffe'));
    });

    test('should convert Uint8Array to hex', () => {
      const array = new Uint8Array([1, 2, 3, 4]);
      const bytes31 = new CairoBytes31(array);
      expect(bytes31.toHexString()).toBe('0x1020304');
      expect(bytes31.toHexString('padded')).toBe(toHex62('0x1020304'));
    });

    test('should handle maximum length data', () => {
      const maxArray = new Uint8Array(31).fill(255); // 31 bytes of 0xff
      const bytes31 = new CairoBytes31(maxArray);
      const expectedHex = `0x${'ff'.repeat(31)}`;
      expect(bytes31.toHexString()).toBe(expectedHex);
      expect(bytes31.toHexString('padded')).toBe(expectedHex);
    });
  });

  describe('toApiRequest method', () => {
    test('should return hex string array for empty data', () => {
      const bytes31 = new CairoBytes31('');
      expect(bytes31.toApiRequest()).toEqual(['0']);
    });

    test('should return hex string array for text data', () => {
      const bytes31 = new CairoBytes31('A'); // ASCII 65
      expect(bytes31.toApiRequest()).toEqual(['65']);
    });

    test('should return hex string array for multi-byte data', () => {
      const bytes31 = new CairoBytes31('AB'); // 0x4142 = 16706
      expect(bytes31.toApiRequest()).toEqual(['16706']);
    });

    test('should return hex string array for Buffer input', () => {
      const buffer = Buffer.from([1, 0]); // 0x0100 = 256
      const bytes31 = new CairoBytes31(buffer);
      expect(bytes31.toApiRequest()).toEqual(['256']);
    });

    test('should return hex string array for large values', () => {
      const array = new Uint8Array([222, 173, 190, 239]); // 0xdeadbeef
      const bytes31 = new CairoBytes31(array);
      expect(bytes31.toApiRequest()).toEqual(['3735928559']);
    });
  });

  describe('validate static method', () => {
    test('should validate valid string inputs', () => {
      expect(() => CairoBytes31.validate('')).not.toThrow();
      expect(() => CairoBytes31.validate('hello')).not.toThrow();
      expect(() => CairoBytes31.validate('a'.repeat(31))).not.toThrow();
      expect(() => CairoBytes31.validate('☥')).not.toThrow();
    });

    test('should validate valid Buffer inputs', () => {
      expect(() => CairoBytes31.validate(Buffer.alloc(0))).not.toThrow();
      expect(() => CairoBytes31.validate(Buffer.from('test'))).not.toThrow();
      expect(() => CairoBytes31.validate(Buffer.alloc(31))).not.toThrow();
    });

    test('should validate valid Uint8Array inputs', () => {
      expect(() => CairoBytes31.validate(new Uint8Array([]))).not.toThrow();
      expect(() => CairoBytes31.validate(new Uint8Array([1, 2, 3]))).not.toThrow();
      expect(() => CairoBytes31.validate(new Uint8Array(31))).not.toThrow();
    });

    test('should reject invalid input types', () => {
      expect(() => CairoBytes31.validate(123 as any)).toThrow(
        'Invalid input type for CairoBytes31. Expected string, Buffer, or Uint8Array'
      );
      expect(() => CairoBytes31.validate({} as any)).toThrow(
        'Invalid input type for CairoBytes31. Expected string, Buffer, or Uint8Array'
      );
      expect(() => CairoBytes31.validate(null as any)).toThrow(
        'Invalid input type for CairoBytes31. Expected string, Buffer, or Uint8Array'
      );
      expect(() => CairoBytes31.validate(undefined as any)).toThrow(
        'Invalid input type for CairoBytes31. Expected string, Buffer, or Uint8Array'
      );
    });

    test('should reject data longer than 31 bytes', () => {
      expect(() => CairoBytes31.validate('a'.repeat(32))).toThrow(
        'Data is too long: 32 bytes (max 31 bytes)'
      );
      expect(() => CairoBytes31.validate(Buffer.alloc(32))).toThrow(
        'Data is too long: 32 bytes (max 31 bytes)'
      );
      expect(() => CairoBytes31.validate(new Uint8Array(32))).toThrow(
        'Data is too long: 32 bytes (max 31 bytes)'
      );
    });

    test('should correctly calculate UTF-8 byte length', () => {
      // Each '☥' is 3 bytes in UTF-8
      const tenSymbols = '☥'.repeat(10); // 30 bytes - should be valid
      const elevenSymbols = '☥'.repeat(11); // 33 bytes - should be invalid

      expect(() => CairoBytes31.validate(tenSymbols)).not.toThrow();
      expect(() => CairoBytes31.validate(elevenSymbols)).toThrow(
        'Data is too long: 33 bytes (max 31 bytes)'
      );
    });
  });

  describe('is static method', () => {
    test('should return true for valid inputs', () => {
      expect(CairoBytes31.is('')).toBe(true);
      expect(CairoBytes31.is('hello')).toBe(true);
      expect(CairoBytes31.is('a'.repeat(31))).toBe(true);
      expect(CairoBytes31.is(Buffer.from('test'))).toBe(true);
      expect(CairoBytes31.is(new Uint8Array([1, 2, 3]))).toBe(true);
    });

    test('should return false for invalid inputs', () => {
      expect(CairoBytes31.is(123 as any)).toBe(false);
      expect(CairoBytes31.is({} as any)).toBe(false);
      expect(CairoBytes31.is(null as any)).toBe(false);
      expect(CairoBytes31.is('a'.repeat(32))).toBe(false);
      expect(CairoBytes31.is(Buffer.alloc(32))).toBe(false);
      expect(CairoBytes31.is(new Uint8Array(32))).toBe(false);
      expect(CairoFelt252.is([] as any)).toBe(false);
      expect(CairoFelt252.is(3.14 as any)).toBe(false);
      expect(CairoFelt252.is(-1)).toBe(false);
      expect(CairoFelt252.is(-1n)).toBe(false);
      expect(CairoFelt252.is(undefined as any)).toBe(false);
    });
  });

  describe('isAbiType static method', () => {
    test('should identify correct ABI type', () => {
      expect(CairoBytes31.isAbiType('core::bytes_31::bytes31')).toBe(true);
      expect(CairoBytes31.isAbiType('bytes31')).toBe(false);
      expect(CairoBytes31.isAbiType('core::felt252')).toBe(false);
      expect(CairoBytes31.isAbiType('core::integer::u256')).toBe(false);
    });
  });

  describe('edge cases and consistency checks', () => {
    test('should handle binary data correctly', () => {
      const binaryData = new Uint8Array([0, 1, 2, 254, 255]);
      const bytes31 = new CairoBytes31(binaryData);
      expect(bytes31.data).toEqual(uint8ArrayToSize(binaryData));
      expect(bytes31.toBigInt()).toBe(0x0102feffn);
    });

    test('should be consistent across different input types for same data', () => {
      const testData = [72, 101, 108, 108, 111]; // "Hello"

      const fromString = new CairoBytes31('Hello');
      const fromBuffer = new CairoBytes31(Buffer.from(testData));
      const fromUint8Array = new CairoBytes31(new Uint8Array(testData));

      expect(fromString.data).toEqual(fromBuffer.data);
      expect(fromBuffer.data).toEqual(fromUint8Array.data);
      expect(fromString.toBigInt()).toBe(fromBuffer.toBigInt());
      expect(fromBuffer.toBigInt()).toBe(fromUint8Array.toBigInt());
      expect(fromString.toHexString()).toBe(fromBuffer.toHexString());
      expect(fromBuffer.toHexString()).toBe(fromUint8Array.toHexString());
    });

    test('should handle round-trip conversions correctly', () => {
      const originalText = 'Test 123 ☥!';
      const bytes31 = new CairoBytes31(originalText);
      expect(bytes31.decodeUtf8()).toBe(originalText);

      const bigintValue = bytes31.toBigInt();
      const hexValue = bytes31.toHexString();
      expect(BigInt(hexValue)).toBe(bigintValue);
    });

    test('should preserve exact byte sequences', () => {
      const testCases = [
        new Uint8Array([0]),
        new Uint8Array([255]),
        new Uint8Array([1, 2, 3, 4, 5]),
        new Uint8Array([0, 255, 128, 64, 32]),
      ];

      testCases.forEach((originalArray) => {
        const bytes31 = new CairoBytes31(originalArray);
        expect(bytes31.data).toEqual(uint8ArrayToSize(originalArray));
      });
    });

    test('should handle boundary conditions', () => {
      // Test with exactly 31 bytes
      const boundary31 = new Uint8Array(31).fill(42);
      expect(() => new CairoBytes31(boundary31)).not.toThrow();

      const bytes31 = new CairoBytes31(boundary31);
      expect(bytes31.data.length).toBe(31);
      expect(bytes31.data.every((byte) => byte === 42)).toBe(true);
    });
  });
});
