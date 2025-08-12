import { CairoByteArray } from '../../../src';
import { CairoBytes31 } from '../../../src/utils/cairoDataTypes/bytes31';
import { CairoFelt252 } from '../../../src/utils/cairoDataTypes/felt';
import { CairoUint32 } from '../../../src/utils/cairoDataTypes/uint32';

describe('CairoByteArray Unit Tests', () => {
  describe('String constructor', () => {
    test('should handle short string (less than 31 bytes)', () => {
      const str = 'Hello, World!';
      const byteArray = new CairoByteArray(str);

      expect(byteArray.data).toEqual([]);
      expect(byteArray.pending_word?.toHexString()).toBe('0x48656c6c6f2c20576f726c6421');
      expect(byteArray.pending_word_len?.toBigInt()).toBe(13n);

      // Verify API request format
      const apiRequest = byteArray.toApiRequest();
      expect(apiRequest[0]).toBe('0x0'); // data length
      expect(apiRequest[1]).toBe('0x48656c6c6f2c20576f726c6421'); // pending_word as hex
      expect(apiRequest[2]).toBe('0xd'); // pending_word_len
    });

    test('should handle exactly 31 bytes string', () => {
      const str = 'This is exactly 31 bytes long!!'; // 31 characters
      const byteArray = new CairoByteArray(str);

      expect(byteArray.data?.length).toBe(1); // 1 CairoBytes31 chunk
      expect(byteArray.pending_word?.toHexString()).toBe('0x0');
      expect(byteArray.pending_word_len?.toBigInt()).toBe(0n);

      // Verify API request format
      const apiRequest = byteArray.toApiRequest();
      expect(apiRequest[0]).toBe('0x1'); // data length
      expect(apiRequest.length).toBe(4); // 1 (length) + 1 (chunk data) + 1 (pending_word) + 1 (pending_word_len)
    });

    test('should handle long string (more than 31 bytes)', () => {
      const str = 'This is a very long string that exceeds 31 bytes limit for testing';
      const byteArray = new CairoByteArray(str);

      expect(byteArray.data?.length).toBe(2); // 2 CairoBytes31 chunks
      expect(byteArray.pending_word?.toHexString()).toBe('0x74696e67'); // "ting"
      expect(byteArray.pending_word_len?.toBigInt()).toBe(4n);

      // Verify API request format
      const apiRequest = byteArray.toApiRequest();
      expect(apiRequest[0]).toBe('0x2'); // data length
      expect(apiRequest.length).toBe(5); // 1 (length) + 2 (chunk data) + 1 (pending_word) + 1 (pending_word_len)
    });

    test('should handle empty string', () => {
      const byteArray = new CairoByteArray('');

      expect(byteArray.data).toEqual([]);
      expect(byteArray.pending_word?.toHexString()).toBe('0x0');
      expect(byteArray.pending_word_len?.toBigInt()).toBe(0n);

      // Verify API request format
      const apiRequest = byteArray.toApiRequest();
      expect(apiRequest[0]).toBe('0x0'); // data length
      expect(apiRequest[1]).toBe('0x0'); // pending_word as hex
      expect(apiRequest[2]).toBe('0x0'); // pending_word_len
    });
  });

  describe('Uint8Array constructor', () => {
    test('should handle Uint8Array with less than 31 bytes', () => {
      const data = new Uint8Array([72, 101, 108, 108, 111]); // "Hello"
      const byteArray = new CairoByteArray(data);

      expect(byteArray.data).toEqual([]);
      expect(byteArray.pending_word?.toHexString()).toBe('0x48656c6c6f');
      expect(byteArray.pending_word_len?.toBigInt()).toBe(5n);
    });

    test('should handle Uint8Array with exactly 31 bytes', () => {
      const data = new Uint8Array(31).fill(65); // 31 'A's
      const byteArray = new CairoByteArray(data);

      expect(byteArray.data?.length).toBe(1); // 1 CairoBytes31 chunk
      expect(byteArray.pending_word?.toHexString()).toBe('0x0');
      expect(byteArray.pending_word_len?.toBigInt()).toBe(0n);
    });

    test('should handle Uint8Array with more than 31 bytes', () => {
      const data = new Uint8Array(40).fill(66); // 40 'B's
      const byteArray = new CairoByteArray(data);

      expect(byteArray.data?.length).toBe(1); // 1 CairoBytes31 chunk
      expect(byteArray.pending_word?.toHexString()).toBe('0x424242424242424242'); // 9 'B's
      expect(byteArray.pending_word_len?.toBigInt()).toBe(9n);
    });

    test('should handle empty Uint8Array', () => {
      const data = new Uint8Array();
      const byteArray = new CairoByteArray(data);

      expect(byteArray.data).toEqual([]);
      expect(byteArray.pending_word?.toHexString()).toBe('0x0');
      expect(byteArray.pending_word_len?.toBigInt()).toBe(0n);
    });
  });

  describe('BigNumberish constructor', () => {
    test('should handle bigint input', () => {
      const bigintValue = 0x48656c6c6fn; // "Hello" in hex
      const byteArray = new CairoByteArray(bigintValue);

      expect(byteArray.data).toEqual([]);
      expect(byteArray.pending_word?.toHexString()).toBe('0x48656c6c6f');
      expect(byteArray.pending_word_len?.toBigInt()).toBe(5n);
      expect(byteArray.decodeUtf8()).toBe('Hello');
      expect(byteArray.toBigInt()).toBe(bigintValue);
      expect(byteArray.toHexString()).toBe('0x48656c6c6f');
    });

    test('should handle number input', () => {
      const numberValue = 0x54657374; // "Test" in hex
      const byteArray = new CairoByteArray(numberValue);

      expect(byteArray.data).toEqual([]);
      expect(byteArray.pending_word?.toHexString()).toBe('0x54657374');
      expect(byteArray.pending_word_len?.toBigInt()).toBe(4n);
      expect(byteArray.decodeUtf8()).toBe('Test');
      expect(byteArray.toBigInt()).toBe(BigInt(numberValue));
      expect(byteArray.toHexString()).toBe('0x54657374');
    });

    test('should handle zero bigint', () => {
      const byteArray = new CairoByteArray(0n);

      expect(byteArray.data).toEqual([]);
      expect(byteArray.pending_word?.toHexString()).toBe('0x0');
      expect(byteArray.pending_word_len?.toBigInt()).toBe(1n); // 0 is represented as 1 byte
      expect(byteArray.decodeUtf8()).toBe('\x00'); // NULL character
      expect(byteArray.toBigInt()).toBe(0n);
      expect(byteArray.toHexString()).toBe('0x0');
    });

    test('should handle zero number', () => {
      const byteArray = new CairoByteArray(0);

      expect(byteArray.data).toEqual([]);
      expect(byteArray.pending_word?.toHexString()).toBe('0x0');
      expect(byteArray.pending_word_len?.toBigInt()).toBe(1n); // 0 is represented as 1 byte
      expect(byteArray.decodeUtf8()).toBe('\x00'); // NULL character
      expect(byteArray.toBigInt()).toBe(0n);
      expect(byteArray.toHexString()).toBe('0x0');
    });

    test('should handle large bigint that spans multiple chunks', () => {
      // Create a bigint that represents more than 31 bytes
      // "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789" = 36 bytes
      const str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let bigintValue = 0n;
      for (let i = 0; i < str.length; i += 1) {
        bigintValue = bigintValue * 256n + BigInt(str.charCodeAt(i));
      }

      const byteArray = new CairoByteArray(bigintValue);

      expect(byteArray.data?.length).toBe(1); // 1 complete chunk
      expect(byteArray.pending_word_len?.toBigInt()).toBe(5n); // 5 remaining bytes
      expect(byteArray.decodeUtf8()).toBe(str);
      expect(byteArray.toBigInt()).toBe(bigintValue);
      expect(byteArray.toHexString()).toBe(`0x${bigintValue.toString(16)}`);
    });

    test('should handle hex string as BigNumberish', () => {
      const hexString = '0x436169726f'; // "Cairo" in hex
      const byteArray = new CairoByteArray(hexString);

      expect(byteArray.data).toEqual([]);
      expect(byteArray.pending_word?.toHexString()).toBe('0x436169726f');
      expect(byteArray.pending_word_len?.toBigInt()).toBe(5n);
      expect(byteArray.decodeUtf8()).toBe('Cairo');
      expect(byteArray.toBigInt()).toBe(0x436169726fn);
      expect(byteArray.toHexString()).toBe('0x436169726f');
    });

    test('should handle decimal string as BigNumberish', () => {
      const decimalString = '1415934836'; // "Test" as decimal
      const byteArray = new CairoByteArray(decimalString);

      expect(byteArray.data).toEqual([]);
      expect(byteArray.pending_word?.toHexString()).toBe('0x54657374');
      expect(byteArray.pending_word_len?.toBigInt()).toBe(4n);
      expect(byteArray.decodeUtf8()).toBe('Test');
      expect(byteArray.toBigInt()).toBe(1415934836n);
      expect(byteArray.toHexString()).toBe('0x54657374');
    });

    test('should handle single byte number', () => {
      const byteArray = new CairoByteArray(65); // 'A'

      expect(byteArray.data).toEqual([]);
      expect(byteArray.pending_word?.toHexString()).toBe('0x41');
      expect(byteArray.pending_word_len?.toBigInt()).toBe(1n);
      expect(byteArray.decodeUtf8()).toBe('A');
      expect(byteArray.toBigInt()).toBe(65n);
      expect(byteArray.toHexString()).toBe('0x41');
    });

    test('should handle exactly 31 bytes as bigint', () => {
      // Create a bigint that represents exactly 31 bytes
      const bytes31 = new Uint8Array(31).fill(0x42); // 31 'B's
      let bigintValue = 0n;
      for (let i = 0; i < bytes31.length; i += 1) {
        bigintValue = bigintValue * 256n + BigInt(bytes31[i]);
      }

      const byteArray = new CairoByteArray(bigintValue);

      expect(byteArray.data?.length).toBe(1); // 1 complete chunk
      expect(byteArray.pending_word?.toHexString()).toBe('0x0');
      expect(byteArray.pending_word_len?.toBigInt()).toBe(0n);
      expect(byteArray.decodeUtf8()).toBe('B'.repeat(31));
      expect(byteArray.toBigInt()).toBe(bigintValue);
      expect(byteArray.toHexString()).toBe(`0x${bigintValue.toString(16)}`);
    });
  });

  describe('Buffer constructor', () => {
    test('should handle Buffer with less than 31 bytes', () => {
      const buffer = Buffer.from('Cairo');
      const byteArray = new CairoByteArray(buffer);

      expect(byteArray.data).toEqual([]);
      expect(byteArray.pending_word?.toHexString()).toBe('0x436169726f');
      expect(byteArray.pending_word_len?.toBigInt()).toBe(5n);
    });

    test('should handle Buffer with exactly 31 bytes', () => {
      const buffer = Buffer.alloc(31, 'X');
      const byteArray = new CairoByteArray(buffer);

      expect(byteArray.data?.length).toBe(1); // 1 CairoBytes31 chunk
      expect(byteArray.pending_word?.toHexString()).toBe('0x0');
      expect(byteArray.pending_word_len?.toBigInt()).toBe(0n);
    });

    test('should handle Buffer with more than 31 bytes', () => {
      const buffer = Buffer.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'); // 36 bytes
      const byteArray = new CairoByteArray(buffer);

      expect(byteArray.data?.length).toBe(1); // 1 CairoBytes31 chunk
      expect(byteArray.pending_word?.toHexString()).toBe('0x3536373839'); // "56789"
      expect(byteArray.pending_word_len?.toBigInt()).toBe(5n);
    });
  });

  describe('Constructor with pending_word parameters', () => {
    test('should handle constructor with all parameters', () => {
      const data = [new CairoBytes31(new Uint8Array([1, 2, 3, 4, 5]))];
      const pendingWord = new CairoFelt252('0xabc');
      const pendingWordLen = new CairoUint32(3);

      const byteArray = new CairoByteArray(data, pendingWord, pendingWordLen);

      expect(byteArray.data).toEqual(data);
      expect(byteArray.pending_word).toBe(pendingWord);
      expect(byteArray.pending_word_len).toBe(pendingWordLen);
    });

    test('should handle constructor with empty data', () => {
      const data: CairoBytes31[] = [];
      const pendingWord = new CairoFelt252('0x123456');
      const pendingWordLen = new CairoUint32(3);

      const byteArray = new CairoByteArray(data, pendingWord, pendingWordLen);

      expect(byteArray.data).toEqual(data);
      expect(byteArray.pending_word).toBe(pendingWord);
      expect(byteArray.pending_word_len).toBe(pendingWordLen);
    });
  });

  describe('toApiRequest method', () => {
    test('should format API request correctly', () => {
      const byteArray = new CairoByteArray('Test');
      const apiRequest = byteArray.toApiRequest();

      expect(apiRequest[0]).toBe('0x0'); // data length (0 chunks)
      expect(apiRequest[1]).toBe('0x54657374'); // pending_word "Test" as hex
      expect(apiRequest[2]).toBe('0x4'); // pending_word_len
    });

    test('should handle data with multiple chunks', () => {
      const longString = 'A'.repeat(35); // 35 'A's
      const byteArray = new CairoByteArray(longString);
      const apiRequest = byteArray.toApiRequest();

      expect(apiRequest[0]).toBe('0x1'); // data length (1 chunk)
      expect(apiRequest.length).toBe(4); // 1 (length) + 1 (chunk data) + 1 (pending_word) + 1 (pending_word_len)
    });

    test('should throw error if not properly initialized', () => {
      const byteArray = new CairoByteArray('test');
      // Force undefined by casting to any to test error handling
      (byteArray as any).data = undefined;

      expect(() => byteArray.toApiRequest()).toThrow('CairoByteArray is not properly initialized');
    });
  });

  describe('decodeUtf8 method', () => {
    test('should decode short string correctly', () => {
      const originalString = 'Hello, World!';
      const byteArray = new CairoByteArray(originalString);
      const decoded = byteArray.decodeUtf8();

      expect(decoded).toBe(originalString);
    });

    test('should decode empty string', () => {
      const byteArray = new CairoByteArray('');
      const decoded = byteArray.decodeUtf8();

      expect(decoded).toBe('');
    });

    test('should decode exactly 31 bytes string', () => {
      const originalString = 'This is exactly 31 bytes long!!';
      const byteArray = new CairoByteArray(originalString);
      const decoded = byteArray.decodeUtf8();

      expect(decoded).toBe(originalString);
    });

    test('should decode long string with multiple chunks', () => {
      const originalString = 'This is a very long string that exceeds 31 bytes limit for testing';
      const byteArray = new CairoByteArray(originalString);
      const decoded = byteArray.decodeUtf8();

      expect(decoded).toBe(originalString);
    });

    test('should decode string with special characters', () => {
      const originalString = 'Special chars: !@#$%^&*()_+-=[]{}|;:\'",.<>/?`~';
      const byteArray = new CairoByteArray(originalString);
      const decoded = byteArray.decodeUtf8();

      expect(decoded).toBe(originalString);
    });

    test('should decode string with unicode characters', () => {
      const originalString = 'Unicode: 你好世界 🚀 émojis';
      const byteArray = new CairoByteArray(originalString);
      const decoded = byteArray.decodeUtf8();

      expect(decoded).toBe(originalString);
    });

    test('should decode string with unicode characters and emojis', () => {
      const originalString = '🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀';
      const byteArray = new CairoByteArray(originalString);
      const decoded = byteArray.decodeUtf8();

      expect(decoded).toBe(originalString);
    });

    test('should decode from Uint8Array input', () => {
      const originalString = 'Test from Uint8Array';
      const encoder = new TextEncoder();
      const data = encoder.encode(originalString);
      const byteArray = new CairoByteArray(data);
      const decoded = byteArray.decodeUtf8();

      expect(decoded).toBe(originalString);
    });

    test('should decode from Buffer input', () => {
      const originalString = 'Test from Buffer';
      const buffer = Buffer.from(originalString);
      const byteArray = new CairoByteArray(buffer);
      const decoded = byteArray.decodeUtf8();

      expect(decoded).toBe(originalString);
    });

    test('should throw error if not properly initialized', () => {
      const byteArray = new CairoByteArray('test');
      // Force undefined by casting to any to test error handling
      (byteArray as any).data = undefined;

      expect(() => byteArray.decodeUtf8()).toThrow('CairoByteArray is not properly initialized');
    });

    test('should handle round-trip encoding and decoding', () => {
      const testStrings = [
        '',
        'a',
        'Short',
        'This is exactly 31 bytes long!!',
        'This is longer than 31 bytes and will be split into multiple chunks',
        'A'.repeat(100),
        'Mixed 123 内容 with 😀 different character sets!',
      ];

      testStrings.forEach((original) => {
        const byteArray = new CairoByteArray(original);
        const decoded = byteArray.decodeUtf8();
        expect(decoded).toBe(original);
      });
    });
  });

  describe('toBigInt method', () => {
    test('should convert empty string to 0n', () => {
      const byteArray = new CairoByteArray('');
      expect(byteArray.toBigInt()).toBe(0n);
    });

    test('should convert short string to bigint', () => {
      const byteArray = new CairoByteArray('Test');
      // 'Test' = 0x54657374
      expect(byteArray.toBigInt()).toBe(0x54657374n);
    });

    test('should convert exactly 31 bytes string to bigint', () => {
      const str = 'This is exactly 31 bytes long!!';
      const byteArray = new CairoByteArray(str);
      // Calculate expected bigint from the string
      let expected = 0n;
      for (let i = 0; i < str.length; i += 1) {
        expected = expected * 256n + BigInt(str.charCodeAt(i));
      }
      expect(byteArray.toBigInt()).toBe(expected);
    });

    test('should convert long string with multiple chunks to bigint', () => {
      const str = 'This is a very long string that exceeds 31 bytes limit for testing';
      const byteArray = new CairoByteArray(str);
      // Calculate expected bigint from the string
      let expected = 0n;
      for (let i = 0; i < str.length; i += 1) {
        expected = expected * 256n + BigInt(str.charCodeAt(i));
      }
      expect(byteArray.toBigInt()).toBe(expected);
    });

    test('should convert single byte to bigint', () => {
      const byteArray = new CairoByteArray('A');
      expect(byteArray.toBigInt()).toBe(0x41n); // 'A' = 0x41
    });

    test('should handle Uint8Array input', () => {
      const data = new Uint8Array([0x48, 0x65, 0x6c, 0x6c, 0x6f]); // "Hello"
      const byteArray = new CairoByteArray(data);
      expect(byteArray.toBigInt()).toBe(0x48656c6c6fn);
    });

    test('should handle Buffer input', () => {
      const buffer = Buffer.from('Cairo');
      const byteArray = new CairoByteArray(buffer);
      expect(byteArray.toBigInt()).toBe(0x436169726fn); // "Cairo"
    });

    test('should throw error if not properly initialized', () => {
      const byteArray = new CairoByteArray('test');
      // Force undefined by casting to any to test error handling
      (byteArray as any).data = undefined;

      expect(() => byteArray.toBigInt()).toThrow('CairoByteArray is not properly initialized');
    });
  });

  describe('is static method', () => {
    test('should return true for valid inputs', () => {
      expect(CairoByteArray.is('Hello')).toBe(true);
      expect(CairoByteArray.is('')).toBe(true);
      expect(CairoByteArray.is(0)).toBe(true);
      expect(CairoByteArray.is(42)).toBe(true);
      expect(CairoByteArray.is(0n)).toBe(true);
      expect(CairoByteArray.is(123n)).toBe(true);
      expect(CairoByteArray.is(new Uint8Array([1, 2, 3]))).toBe(true);
      expect(CairoByteArray.is(Buffer.from('test'))).toBe(true);
      expect(CairoByteArray.is('0xff')).toBe(true);
      expect(CairoByteArray.is('12345')).toBe(true);
    });

    test('should return false for invalid inputs', () => {
      expect(CairoByteArray.is({} as any)).toBe(false);
      expect(CairoByteArray.is([] as any)).toBe(false);
      expect(CairoByteArray.is(null as any)).toBe(false);
      expect(CairoByteArray.is(3.14 as any)).toBe(false);
      expect(CairoByteArray.is(-1)).toBe(false);
      expect(CairoByteArray.is(-1n)).toBe(false);
      expect(CairoByteArray.is(undefined as any)).toBe(false);
      expect(CairoByteArray.is({ data: 'test' } as any)).toBe(false);
      expect(CairoByteArray.is([1, 2, 3] as any)).toBe(false); // Regular arrays not supported
      expect(CairoByteArray.is(NaN as any)).toBe(false);
      expect(CairoByteArray.is(Infinity as any)).toBe(false);
      expect(CairoByteArray.is(-Infinity as any)).toBe(false);
    });
  });

  describe('toHexString method', () => {
    test('should convert empty string to 0x0', () => {
      const byteArray = new CairoByteArray('');
      expect(byteArray.toHexString()).toBe('0x0');
    });

    test('should convert short string to hex', () => {
      const byteArray = new CairoByteArray('Test');
      expect(byteArray.toHexString()).toBe('0x54657374');
    });

    test('should convert single character to hex', () => {
      const byteArray = new CairoByteArray('A');
      expect(byteArray.toHexString()).toBe('0x41');
    });

    test('should convert exactly 31 bytes string to hex', () => {
      const str = 'This is exactly 31 bytes long!!';
      const byteArray = new CairoByteArray(str);
      // Calculate expected hex from the string
      let hex = '0x';
      for (let i = 0; i < str.length; i += 1) {
        hex += str.charCodeAt(i).toString(16).padStart(2, '0');
      }
      expect(byteArray.toHexString()).toBe(hex);
    });

    test('should convert long string with multiple chunks to hex', () => {
      const str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'; // 36 bytes
      const byteArray = new CairoByteArray(str);
      // Calculate expected hex
      let hex = '0x';
      for (let i = 0; i < str.length; i += 1) {
        hex += str.charCodeAt(i).toString(16).padStart(2, '0');
      }
      expect(byteArray.toHexString()).toBe(hex);
    });

    test('should handle Uint8Array input', () => {
      const data = new Uint8Array([0xde, 0xad, 0xbe, 0xef]);
      const byteArray = new CairoByteArray(data);
      expect(byteArray.toHexString()).toBe('0xdeadbeef');
    });

    test('should handle Buffer input', () => {
      const buffer = Buffer.from([0xca, 0xfe, 0xba, 0xbe]);
      const byteArray = new CairoByteArray(buffer);
      expect(byteArray.toHexString()).toBe('0xcafebabe');
    });

    test('should be consistent with toBigInt', () => {
      const testStrings = [
        '',
        'A',
        'Test',
        'Hello, World!',
        'This is exactly 31 bytes long!!',
        'This is longer than 31 bytes and will be split into multiple chunks',
      ];

      testStrings.forEach((str) => {
        const byteArray = new CairoByteArray(str);
        const bigintValue = byteArray.toBigInt();
        const hexValue = byteArray.toHexString();

        // toHexString should be equivalent to '0x' + toBigInt().toString(16)
        const expected = bigintValue === 0n ? '0x0' : `0x${bigintValue.toString(16)}`;
        expect(hexValue).toBe(expected);
      });
    });
  });

  describe('toApiRequest and factoryFromApiResponse', () => {
    test('should serialize and deserialize short message', () => {
      const testMessage = 'Hello, Starknet!';
      const byteArray = new CairoByteArray(testMessage);

      // Serialize to API request format
      const apiRequest = byteArray.toApiRequest();

      // Verify API request structure
      expect(apiRequest).toBeInstanceOf(Array);
      expect(apiRequest[0]).toBe('0x0'); // data length (no complete chunks)
      expect(typeof apiRequest[1]).toBe('string'); // pending_word as hex string
      expect(apiRequest[2]).toBe('0x10'); // pending_word_len

      // Deserialize from API response
      const iterator = apiRequest[Symbol.iterator]();
      const reconstructedByteArray = CairoByteArray.factoryFromApiResponse(iterator);

      // Verify the message is correctly reconstructed
      expect(reconstructedByteArray.decodeUtf8()).toBe(testMessage);
      expect(reconstructedByteArray.toBigInt()).toBe(byteArray.toBigInt());
      expect(reconstructedByteArray.toHexString()).toBe(byteArray.toHexString());
    });

    test('should serialize and deserialize long message (> 31 bytes)', () => {
      const testMessage =
        'This is a very long message that exceeds 31 bytes and will be split into multiple chunks!';
      const byteArray = new CairoByteArray(testMessage);

      // Serialize to API request format
      const apiRequest = byteArray.toApiRequest();

      // Verify API request structure
      expect(apiRequest).toBeInstanceOf(Array);
      expect(Number(apiRequest[0])).toBeGreaterThan(0); // Should have complete chunks

      // Deserialize from API response
      const iterator = apiRequest[Symbol.iterator]();
      const reconstructedByteArray = CairoByteArray.factoryFromApiResponse(iterator);

      // Verify the message is correctly reconstructed
      expect(reconstructedByteArray.decodeUtf8()).toBe(testMessage);
      expect(reconstructedByteArray.toBigInt()).toBe(byteArray.toBigInt());
      expect(reconstructedByteArray.toHexString()).toBe(byteArray.toHexString());
    });

    test('should serialize and deserialize empty message', () => {
      const testMessage = '';
      const byteArray = new CairoByteArray(testMessage);

      // Serialize to API request format
      const apiRequest = byteArray.toApiRequest();

      // Verify API request structure
      expect(apiRequest).toBeInstanceOf(Array);
      expect(apiRequest[0]).toBe('0x0'); // data length
      expect(apiRequest[1]).toBe('0x0'); // pending_word
      expect(apiRequest[2]).toBe('0x0'); // pending_word_len

      // Deserialize from API response
      const iterator = apiRequest[Symbol.iterator]();
      const reconstructedByteArray = CairoByteArray.factoryFromApiResponse(iterator);

      // Verify the message is correctly reconstructed
      expect(reconstructedByteArray.decodeUtf8()).toBe(testMessage);
      expect(reconstructedByteArray.toBigInt()).toBe(0n);
      expect(reconstructedByteArray.toHexString()).toBe('0x0');
    });

    test('should serialize and deserialize with disabled parsers simulation', () => {
      const testMessage = 'Testing disabled parsers';
      const byteArray = new CairoByteArray(testMessage);

      // Simulate contract call with parseRequest: false
      // This is what happens when you call contract.withOptions({parseRequest: false})
      const rawCalldata = byteArray.toApiRequest();

      // Simulate contract response with parseResponse: false
      // This is what you get back when contract.withOptions({parseResponse: false})
      const rawResponse = rawCalldata; // Contract echoes the data back

      // Parse the raw response back to CairoByteArray
      const iterator = rawResponse[Symbol.iterator]();
      const reconstructedByteArray = CairoByteArray.factoryFromApiResponse(iterator);

      // Verify the round trip
      expect(reconstructedByteArray.decodeUtf8()).toBe(testMessage);
      expect(reconstructedByteArray.toBigInt()).toBe(byteArray.toBigInt());
      expect(reconstructedByteArray.toHexString()).toBe(byteArray.toHexString());
    });

    test('should handle multiple serialization/deserialization cycles', () => {
      const testMessages = [
        'First message',
        'Second message with numbers 12345',
        'Third message with symbols !@#$%',
        '',
        'Final message after empty',
      ];

      testMessages.forEach((message) => {
        const byteArray = new CairoByteArray(message);

        // First cycle
        const apiRequest1 = byteArray.toApiRequest();
        const iterator1 = apiRequest1[Symbol.iterator]();
        const reconstructed1 = CairoByteArray.factoryFromApiResponse(iterator1);

        // Second cycle from reconstructed
        const apiRequest2 = reconstructed1.toApiRequest();
        const iterator2 = apiRequest2[Symbol.iterator]();
        const reconstructed2 = CairoByteArray.factoryFromApiResponse(iterator2);

        // Verify consistency across cycles
        expect(reconstructed1.decodeUtf8()).toBe(message);
        expect(reconstructed2.decodeUtf8()).toBe(message);
        expect(reconstructed1.toBigInt()).toBe(byteArray.toBigInt());
        expect(reconstructed2.toBigInt()).toBe(byteArray.toBigInt());
        expect(apiRequest1).toEqual(apiRequest2);
      });
    });
  });
});
