import { CairoByteArray } from '../../../src';

describe('CairoByteArray Constructor Tests', () => {
  describe('String constructor', () => {
    test('should handle short string (less than 31 bytes)', () => {
      const str = 'Hello, World!';
      const byteArray = new CairoByteArray(str);

      expect(byteArray.data).toEqual(new Uint8Array());
      expect(byteArray.pending_word).toBe('0x48656c6c6f2c20576f726c6421');
      expect(byteArray.pending_word_len).toBe(13);
    });

    test('should handle exactly 31 bytes string', () => {
      const str = 'This is exactly 31 bytes long!!'; // 31 characters
      const byteArray = new CairoByteArray(str);

      expect(byteArray.data?.length).toBe(31);
      expect(byteArray.pending_word).toBe('0x00');
      expect(byteArray.pending_word_len).toBe(0);
    });

    test('should handle long string (more than 31 bytes)', () => {
      const str = 'This is a very long string that exceeds 31 bytes limit for testing';
      const byteArray = new CairoByteArray(str);

      expect(byteArray.data?.length).toBe(62); // 2 * 31
      expect(byteArray.pending_word).toBe('0x74696e67'); // "ting"
      expect(byteArray.pending_word_len).toBe(4);
    });

    test('should handle empty string', () => {
      const byteArray = new CairoByteArray('');

      expect(byteArray.data).toEqual(new Uint8Array());
      expect(byteArray.pending_word).toBe('0x00');
      expect(byteArray.pending_word_len).toBe(0);
    });
  });

  describe('Uint8Array constructor', () => {
    test('should handle Uint8Array with less than 31 bytes', () => {
      const data = new Uint8Array([72, 101, 108, 108, 111]); // "Hello"
      const byteArray = new CairoByteArray(data);

      expect(byteArray.data).toEqual(new Uint8Array());
      expect(byteArray.pending_word).toBe('0x48656c6c6f');
      expect(byteArray.pending_word_len).toBe(5);
    });

    test('should handle Uint8Array with exactly 31 bytes', () => {
      const data = new Uint8Array(31).fill(65); // 31 'A's
      const byteArray = new CairoByteArray(data);

      expect(byteArray.data?.length).toBe(31);
      expect(byteArray.pending_word).toBe('0x00');
      expect(byteArray.pending_word_len).toBe(0);
    });

    test('should handle Uint8Array with more than 31 bytes', () => {
      const data = new Uint8Array(40).fill(66); // 40 'B's
      const byteArray = new CairoByteArray(data);

      expect(byteArray.data?.length).toBe(31);
      expect(byteArray.pending_word).toBe('0x424242424242424242'); // 9 'B's
      expect(byteArray.pending_word_len).toBe(9);
    });

    test('should handle empty Uint8Array', () => {
      const data = new Uint8Array();
      const byteArray = new CairoByteArray(data);

      expect(byteArray.data).toEqual(new Uint8Array());
      expect(byteArray.pending_word).toBe('0x00');
      expect(byteArray.pending_word_len).toBe(0);
    });
  });

  describe('Buffer constructor', () => {
    test('should handle Buffer with less than 31 bytes', () => {
      const buffer = Buffer.from('Cairo');
      const byteArray = new CairoByteArray(buffer);

      expect(byteArray.data).toEqual(new Uint8Array());
      expect(byteArray.pending_word).toBe('0x436169726f');
      expect(byteArray.pending_word_len).toBe(5);
    });

    test('should handle Buffer with exactly 31 bytes', () => {
      const buffer = Buffer.alloc(31, 'X');
      const byteArray = new CairoByteArray(buffer);

      expect(byteArray.data?.length).toBe(31);
      expect(byteArray.pending_word).toBe('0x00');
      expect(byteArray.pending_word_len).toBe(0);
    });

    test('should handle Buffer with more than 31 bytes', () => {
      const buffer = Buffer.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'); // 36 bytes
      const byteArray = new CairoByteArray(buffer);

      expect(byteArray.data?.length).toBe(31);
      expect(byteArray.pending_word).toBe('0x3536373839'); // "56789"
      expect(byteArray.pending_word_len).toBe(5);
    });
  });

  describe('Constructor with pending_word parameters', () => {
    test('should handle constructor with all parameters', () => {
      const data = new Uint8Array([1, 2, 3, 4, 5]);
      const pendingWord = '0xabc';
      const pendingWordLen = 3;

      const byteArray = new CairoByteArray(data, pendingWord, pendingWordLen);

      expect(byteArray.data).toEqual(data);
      expect(byteArray.pending_word).toBe(pendingWord);
      expect(byteArray.pending_word_len).toBe(pendingWordLen);
    });

    test('should handle constructor with empty data', () => {
      const data = new Uint8Array();
      const pendingWord = '0x123456';
      const pendingWordLen = 3;

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

      expect(apiRequest[0]).toBe('0'); // data length
      expect(apiRequest[1]).toBe('0x54657374'); // pending_word "Test"
      expect(apiRequest[2]).toBe('4'); // pending_word_len
    });

    test('should handle data with multiple chunks', () => {
      const longString = 'A'.repeat(35); // 35 'A's
      const byteArray = new CairoByteArray(longString);
      const apiRequest = byteArray.toApiRequest();

      expect(apiRequest[0]).toBe('31'); // data length (31 bytes)
      expect(apiRequest.length).toBe(31 + 3); // 31 data bytes + length + pending_word + pending_word_len
    });

    test('should throw error if not properly initialized', () => {
      const byteArray = new CairoByteArray('test');
      byteArray.data = undefined;

      expect(() => byteArray.toApiRequest()).toThrow('CairoByteArray is not properly initialized');
    });
  });
});
