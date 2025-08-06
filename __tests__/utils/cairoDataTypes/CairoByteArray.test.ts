import { CairoByteArray } from '../../../src';
import { CairoBytes31 } from '../../../src/utils/cairoDataTypes/bytes31';
import { CairoFelt252 } from '../../../src/utils/cairoDataTypes/felt';
import { CairoUint32 } from '../../../src/utils/cairoDataTypes/uint32';

describe('CairoByteArray Constructor Tests', () => {
  describe('String constructor', () => {
    test('should handle short string (less than 31 bytes)', () => {
      const str = 'Hello, World!';
      const byteArray = new CairoByteArray(str);

      expect(byteArray.data).toEqual([]);
      expect(byteArray.pending_word?.toHexString()).toBe('0x48656c6c6f2c20576f726c6421');
      expect(byteArray.pending_word_len?.toBigInt()).toBe(13n);

      // Verify API request format
      const apiRequest = byteArray.toApiRequest();
      expect(apiRequest[0]).toBe('0'); // data length
      expect(apiRequest[1]).toBe('5735816763073854918203775149089'); // pending_word as decimal
      expect(apiRequest[2]).toBe('13'); // pending_word_len
    });

    test('should handle exactly 31 bytes string', () => {
      const str = 'This is exactly 31 bytes long!!'; // 31 characters
      const byteArray = new CairoByteArray(str);

      expect(byteArray.data?.length).toBe(1); // 1 CairoBytes31 chunk
      expect(byteArray.pending_word?.toHexString()).toBe('0x0');
      expect(byteArray.pending_word_len?.toBigInt()).toBe(0n);

      // Verify API request format
      const apiRequest = byteArray.toApiRequest();
      expect(apiRequest[0]).toBe('1'); // data length
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
      expect(apiRequest[0]).toBe('2'); // data length
      expect(apiRequest.length).toBe(5); // 1 (length) + 2 (chunk data) + 1 (pending_word) + 1 (pending_word_len)
    });

    test('should handle empty string', () => {
      const byteArray = new CairoByteArray('');

      expect(byteArray.data).toEqual([]);
      expect(byteArray.pending_word?.toHexString()).toBe('0x0');
      expect(byteArray.pending_word_len?.toBigInt()).toBe(0n);

      // Verify API request format
      const apiRequest = byteArray.toApiRequest();
      expect(apiRequest[0]).toBe('0'); // data length
      expect(apiRequest[1]).toBe('0'); // pending_word as decimal
      expect(apiRequest[2]).toBe('0'); // pending_word_len
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

      expect(apiRequest[0]).toBe('0'); // data length (0 chunks)
      expect(apiRequest[1]).toBe('1415934836'); // pending_word "Test" as decimal
      expect(apiRequest[2]).toBe('4'); // pending_word_len
    });

    test('should handle data with multiple chunks', () => {
      const longString = 'A'.repeat(35); // 35 'A's
      const byteArray = new CairoByteArray(longString);
      const apiRequest = byteArray.toApiRequest();

      expect(apiRequest[0]).toBe('1'); // data length (1 chunk)
      expect(apiRequest.length).toBe(4); // 1 (length) + 1 (chunk data) + 1 (pending_word) + 1 (pending_word_len)
    });

    test('should throw error if not properly initialized', () => {
      const byteArray = new CairoByteArray('test');
      // Force undefined by casting to any to test error handling
      (byteArray as any).data = undefined;

      expect(() => byteArray.toApiRequest()).toThrow('CairoByteArray is not properly initialized');
    });
  });
});
