import { CairoFelt252 } from '../../../src/utils/cairoDataTypes/felt';
import { uint8ArrayToBigInt } from '../../../src/utils/encode';

describe('CairoFelt252 class Unit Tests', () => {
  describe('constructor with different input types', () => {
    test('should handle bigint values', () => {
      const felt = new CairoFelt252(123n);
      expect(felt.toBigInt()).toBe(123n);

      const largeFelt = new CairoFelt252(2n ** 200n);
      expect(largeFelt.toBigInt()).toBe(2n ** 200n);
    });

    test('should handle number values', () => {
      const felt = new CairoFelt252(456);
      expect(felt.toBigInt()).toBe(456n);

      const zeroFelt = new CairoFelt252(0);
      expect(zeroFelt.toBigInt()).toBe(0n);
    });

    test('should handle boolean values', () => {
      const trueFelt = new CairoFelt252(true);
      expect(trueFelt.toBigInt()).toBe(1n);

      const falseFelt = new CairoFelt252(false);
      expect(falseFelt.toBigInt()).toBe(0n);
    });

    test('should handle hex strings', () => {
      const felt = new CairoFelt252('0x123');
      expect(felt.toBigInt()).toBe(291n); // 0x123 = 291

      const largeFelt = new CairoFelt252('0xdeadbeef');
      expect(largeFelt.toBigInt()).toBe(0xdeadbeefn);
    });

    test('should handle decimal strings', () => {
      const felt = new CairoFelt252('789');
      expect(felt.toBigInt()).toBe(789n);

      const zeroFelt = new CairoFelt252('0');
      expect(zeroFelt.toBigInt()).toBe(0n);
    });

    test('should handle ASCII text strings', () => {
      const felt = new CairoFelt252('hello');
      // 'hello' as UTF-8 bytes: [104, 101, 108, 108, 111]
      // As hex: 0x68656c6c6f = 448378203247
      expect(felt.toBigInt()).toBe(448378203247n);
    });

    test('should handle Unicode text strings', () => {
      // Test emoji
      const emojiFelt = new CairoFelt252('☥');
      // '☥' in UTF-8: [226, 152, 165] = 0xe298a5
      expect(emojiFelt.toBigInt()).toBe(0xe298a5n);

      // Test Chinese characters
      const chineseFelt = new CairoFelt252('世');
      // '世' in UTF-8: [228, 184, 150] = 0xe4b896
      expect(chineseFelt.toBigInt()).toBe(0xe4b896n);
    });

    test('should handle mixed Unicode strings', () => {
      const felt = new CairoFelt252('Hi☥');
      // 'Hi☥' in UTF-8: [72, 105, 226, 152, 165]
      // As hex: 0x4869e298a5
      expect(felt.toBigInt()).toBe(0x4869e298a5n);
    });

    test('should handle text strings up to felt252 byte limit', () => {
      // Felt252 max is about 2^251, which is roughly 31 bytes
      // Use a text string with non-numeric characters
      const maxString = 'abcdefghijklmnopqrstuvwxyz12345'; // 31 ASCII chars = 31 bytes
      expect(() => new CairoFelt252(maxString)).not.toThrow();

      const felt = new CairoFelt252(maxString);
      const bytes = new TextEncoder().encode(maxString);
      expect(bytes.length).toBe(31); // Verify it's 31 bytes
      const expectedValue = uint8ArrayToBigInt(bytes);
      expect(felt.toBigInt()).toBe(expectedValue);
    });

    test('should reject text strings that exceed felt252 range', () => {
      // Very long strings will exceed the felt252 maximum value
      const veryLongString =
        'This is a very long string that exceeds 31 characters easily and will definitely exceed the felt252 maximum value when converted to a bigint';

      // Should throw during validation
      expect(() => new CairoFelt252(veryLongString)).toThrow(/out of felt252 range/);
    });
  });

  describe('data storage as Uint8Array', () => {
    test('should store data as Uint8Array', () => {
      const felt = new CairoFelt252(256n);
      expect(felt.data).toBeInstanceOf(Uint8Array);
      expect(felt.data).toEqual(new Uint8Array([1, 0])); // Big-endian
    });

    test('should use big-endian byte order', () => {
      const felt = new CairoFelt252(0x0102n);
      expect(felt.data).toEqual(new Uint8Array([1, 2]));
    });
  });

  describe('toBigInt method', () => {
    test('should correctly convert back to bigint', () => {
      const testValues = [0n, 1n, 255n, 256n, 65535n, 2n ** 100n];

      testValues.forEach((value) => {
        const felt = new CairoFelt252(value);
        expect(felt.toBigInt()).toBe(value);
      });
    });
  });

  describe('toHexString method', () => {
    test('should convert bigint values to hex string', () => {
      const felt = new CairoFelt252(255n);
      expect(felt.toHexString()).toBe('0xff');
    });

    test('should convert number values to hex string', () => {
      const felt = new CairoFelt252(256);
      expect(felt.toHexString()).toBe('0x100');
    });

    test('should convert zero to hex string', () => {
      const felt = new CairoFelt252(0n);
      expect(felt.toHexString()).toBe('0x0');
    });

    test('should convert large values to hex string', () => {
      const felt = new CairoFelt252(0xdeadbeefn);
      expect(felt.toHexString()).toBe('0xdeadbeef');
    });

    test('should convert hex string input back to same hex format', () => {
      const originalHex = '0x123abc';
      const felt = new CairoFelt252(originalHex);
      expect(felt.toHexString()).toBe(originalHex);
    });

    test('should convert decimal string to hex', () => {
      const felt = new CairoFelt252('255');
      expect(felt.toHexString()).toBe('0xff');
    });

    test('should convert text strings to hex representation', () => {
      const felt = new CairoFelt252('A'); // ASCII 65 = 0x41
      expect(felt.toHexString()).toBe('0x41');
    });

    test('should convert Unicode text to hex', () => {
      const felt = new CairoFelt252('☥'); // UTF-8: [226, 152, 165] = 0xe298a5
      expect(felt.toHexString()).toBe('0xe298a5');
    });

    test('should convert boolean values to hex', () => {
      const trueFelt = new CairoFelt252(true);
      expect(trueFelt.toHexString()).toBe('0x1');

      const falseFelt = new CairoFelt252(false);
      expect(falseFelt.toHexString()).toBe('0x0');
    });

    test('should handle very large felt252 values', () => {
      // Test with a large value close to felt252 max
      const largeValue = 2n ** 200n;
      const felt = new CairoFelt252(largeValue);
      expect(felt.toHexString()).toBe(`0x${largeValue.toString(16)}`);
    });

    test('should be consistent with toBigInt conversion', () => {
      const testValues = [0n, 1n, 255n, 256n, 65535n, 0xdeadbeefn];

      testValues.forEach((value) => {
        const felt = new CairoFelt252(value);
        const hexString = felt.toHexString();
        const backToBigInt = BigInt(hexString);
        expect(backToBigInt).toBe(value);
      });
    });
  });

  describe('toUnicode method', () => {
    test('should convert ASCII text back to original string', () => {
      const text = 'hello';
      const felt = new CairoFelt252(text);
      expect(felt.decodeUtf8()).toBe(text);
    });

    test('should convert Unicode emoji back to original', () => {
      const emoji = '☥';
      const felt = new CairoFelt252(emoji);
      expect(felt.decodeUtf8()).toBe(emoji);
    });

    test('should convert Chinese characters back to original', () => {
      const chinese = '世界';
      const felt = new CairoFelt252(chinese);
      expect(felt.decodeUtf8()).toBe(chinese);
    });

    test('should convert mixed Unicode text back to original', () => {
      const mixed = 'Hello ☥ 世界!';
      const felt = new CairoFelt252(mixed);
      expect(felt.decodeUtf8()).toBe(mixed);
    });

    test('should handle special characters correctly', () => {
      const special = '!@#$%^&*()_+-=[]{}|;:,.<>?';
      const felt = new CairoFelt252(special);
      expect(felt.decodeUtf8()).toBe(special);
    });

    test('should handle newlines, tabs, and spaces', () => {
      const whitespace = 'line1\nline2\ttab\r\nwindows';
      const felt = new CairoFelt252(whitespace);
      expect(felt.decodeUtf8()).toBe(whitespace);
    });

    test('should return empty string for zero value', () => {
      const felt = new CairoFelt252(0n);
      // 0n becomes single byte [0], which decodes to null character
      expect(felt.decodeUtf8()).toBe('\x00');
    });

    test('should return empty string for empty string input', () => {
      const felt = new CairoFelt252('');
      expect(felt.decodeUtf8()).toBe('');
    });

    test('should decode hex string inputs as raw bytes, not as text', () => {
      // When we pass a hex string, it's converted to bytes representing the number
      const felt = new CairoFelt252('0x48656c6c6f'); // This is "Hello" in hex
      // The bytes stored are [72, 101, 108, 108, 111] which decode to "Hello"
      expect(felt.decodeUtf8()).toBe('Hello');
    });

    test('should decode decimal string inputs as raw bytes', () => {
      // Decimal string '65' becomes bigint 65n, which is byte [65], which is 'A' in ASCII
      const felt = new CairoFelt252('65');
      expect(felt.decodeUtf8()).toBe('A');
    });

    test('should handle all printable ASCII characters', () => {
      // Test a subset of printable ASCII characters that fit in felt252
      const printableAscii = 'Hello World!@#$%^&*()';
      const felt = new CairoFelt252(printableAscii);
      expect(felt.decodeUtf8()).toBe(printableAscii);
    });

    test('should handle multi-byte UTF-8 sequences', () => {
      // Test various multi-byte UTF-8 characters that fit in felt252
      const multiByteChars = '€£¥§©';
      const felt = new CairoFelt252(multiByteChars);
      expect(felt.decodeUtf8()).toBe(multiByteChars);
    });

    test('should preserve text through round-trip conversion', () => {
      const testStrings = [
        'Simple ASCII',
        'Ûñïçödé テキスト',
        '🎉🎊🎈', // Emojis
        'مرحبا بالعالم', // Arabic
        'Здравствуй мир', // Russian
        '你好世界', // Chinese
        '🇦🇺🇦🇺',
      ];

      testStrings.forEach((text) => {
        const felt = new CairoFelt252(text);
        expect(felt.decodeUtf8()).toBe(text);
      });
    });

    test('should decode bigint inputs as their byte representation', () => {
      // BigInt 0x41 = 65 = byte [65] = 'A'
      const felt1 = new CairoFelt252(65n);
      expect(felt1.decodeUtf8()).toBe('A');

      // BigInt 0x4142 = 16706 = bytes [65, 66] = 'AB'
      const felt2 = new CairoFelt252(0x4142n);
      expect(felt2.decodeUtf8()).toBe('AB');
    });

    test('should decode boolean inputs correctly', () => {
      const trueFelt = new CairoFelt252(true);
      expect(trueFelt.decodeUtf8()).toBe('\x01'); // byte value 1

      const falseFelt = new CairoFelt252(false);
      expect(falseFelt.decodeUtf8()).toBe('\x00'); // byte value 0
    });
  });

  describe('toApiRequest method', () => {
    test('should return decimal string array', () => {
      const felt = new CairoFelt252(123n);
      expect(felt.toApiRequest()).toEqual(['123']);

      const largeFelt = new CairoFelt252(2n ** 200n);
      expect(largeFelt.toApiRequest()).toEqual([
        '1606938044258990275541962092341162602522202993782792835301376',
      ]);
    });
  });

  describe('validate static method', () => {
    test('should validate valid inputs', () => {
      expect(() => CairoFelt252.validate(123n)).not.toThrow();
      expect(() => CairoFelt252.validate(456)).not.toThrow();
      expect(() => CairoFelt252.validate('0x789')).not.toThrow();
      expect(() => CairoFelt252.validate('1000')).not.toThrow();
      expect(() => CairoFelt252.validate('hello')).not.toThrow();
      expect(() => CairoFelt252.validate(true)).not.toThrow();
    });

    test('should reject invalid inputs', () => {
      expect(() => CairoFelt252.validate({} as any)).toThrow();
      expect(() => CairoFelt252.validate([] as any)).toThrow();
      expect(() => CairoFelt252.validate(null as any)).toThrow();
      expect(() => CairoFelt252.validate(undefined as any)).toThrow();
      expect(() => CairoFelt252.validate(3.14 as any)).toThrow();
    });

    test('should reject values outside felt252 range', () => {
      const PRIME = 2n ** 251n + 17n * 2n ** 192n + 1n;

      // Value smaller than PRIME should be accepted
      expect(() => CairoFelt252.validate(PRIME - 1n)).not.toThrow(/out of felt252 range/);

      // Min value should be accepted
      expect(() => CairoFelt252.validate(0n)).not.toThrow(/out of felt252 range/);

      // Value equal to PRIME should be rejected
      expect(() => CairoFelt252.validate(PRIME)).toThrow(/out of felt252 range/);

      // Value greater than PRIME should be rejected
      expect(() => CairoFelt252.validate(PRIME + 1n)).toThrow(/out of felt252 range/);

      // Negative values should be rejected
      expect(() => CairoFelt252.validate(-1n)).toThrow(
        /Cannot convert negative bigint -1 to Uint8Array/
      );

      // each flag is 8 byte, so this should be 32 bytes what is out of felt range
      expect(() => CairoFelt252.validate('🇦🇺🇦🇺🇦🇺🇦🇺')).toThrow(/out of felt252 range/);
    });
  });

  describe('is static method', () => {
    test('should return true for valid inputs', () => {
      expect(CairoFelt252.is(123n)).toBe(true);
      expect(CairoFelt252.is(456)).toBe(true);
      expect(CairoFelt252.is('0x789')).toBe(true);
      expect(CairoFelt252.is('hello')).toBe(true);
      expect(CairoFelt252.is(true)).toBe(true);
    });

    test('should return false for invalid inputs', () => {
      expect(CairoFelt252.is({} as any)).toBe(false);
      expect(CairoFelt252.is([] as any)).toBe(false);
      expect(CairoFelt252.is(null as any)).toBe(false);
      expect(CairoFelt252.is(3.14 as any)).toBe(false);
      expect(CairoFelt252.is(-1)).toBe(false);
      expect(CairoFelt252.is(-1n)).toBe(false);
      expect(CairoFelt252.is(undefined as any)).toBe(false);

      const PRIME = 2n ** 251n + 17n * 2n ** 192n + 1n;
      expect(CairoFelt252.is(PRIME)).toBe(false);
    });
  });

  describe('isAbiType static method', () => {
    test('should identify correct ABI type', () => {
      expect(CairoFelt252.isAbiType('core::felt252')).toBe(true);
      expect(CairoFelt252.isAbiType('felt252')).toBe(false);
      expect(CairoFelt252.isAbiType('core::integer::u256')).toBe(false);
    });
  });

  describe('edge cases', () => {
    test('should handle empty string', () => {
      const felt = new CairoFelt252('');
      expect(felt.toBigInt()).toBe(0n);
    });

    test('should handle single character strings', () => {
      const felt = new CairoFelt252('A');
      // 'A' = 65 in ASCII/UTF-8
      expect(felt.toBigInt()).toBe(65n);
    });

    test('should handle special characters', () => {
      const felt = new CairoFelt252('!@#$%');
      const bytes = new TextEncoder().encode('!@#$%');
      const expectedValue = uint8ArrayToBigInt(bytes);
      expect(felt.toBigInt()).toBe(expectedValue);
    });

    test('should handle newlines and tabs', () => {
      const felt = new CairoFelt252('line1\nline2\t');
      const bytes = new TextEncoder().encode('line1\nline2\t');
      const expectedValue = uint8ArrayToBigInt(bytes);
      expect(felt.toBigInt()).toBe(expectedValue);
    });
  });

  describe('consistency checks', () => {
    test('should be reversible for all input types', () => {
      const testCases = [123n, 456, true, false, '0x789', '1000', 'hello', 'Unicode ☥ test 世界'];

      testCases.forEach((input) => {
        const felt = new CairoFelt252(input);
        const asBytes = felt.data;
        const asBigInt = felt.toBigInt();
        const backToBytes = new CairoFelt252(asBigInt).data;

        expect(backToBytes).toEqual(asBytes);
      });
    });

    test('should produce consistent results for equivalent inputs', () => {
      // These should all produce the same result
      const felt1 = new CairoFelt252(256n);
      const felt2 = new CairoFelt252(256);
      const felt3 = new CairoFelt252('256');
      const felt4 = new CairoFelt252('0x100');

      expect(felt1.toBigInt()).toBe(256n);
      expect(felt2.toBigInt()).toBe(256n);
      expect(felt3.toBigInt()).toBe(256n);
      expect(felt4.toBigInt()).toBe(256n);

      expect(felt1.data).toEqual(felt2.data);
      expect(felt2.data).toEqual(felt3.data);
      expect(felt3.data).toEqual(felt4.data);
    });
  });
});
