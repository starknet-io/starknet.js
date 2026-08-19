import { stringFromByteArray, byteArrayFromString } from '../../../src/utils/calldata/byteArray';

describe('stringFromByteArray', () => {
  test('should return string from Cairo byte array', () => {
    const str = stringFromByteArray({
      data: [],
      pending_word: '0x414243444546474849',
      pending_word_len: 9,
    });
    expect(str).toEqual('ABCDEFGHI');
  });

  test('should decode a pending word whose leading byte is below 0x10', () => {
    // a node returns a felt in its shortest form, so '\tABC' arrives as 0x9414243, not 0x09414243
    const str = stringFromByteArray({
      data: [],
      pending_word: '0x9414243',
      pending_word_len: 4,
    });
    expect(str).toEqual('\tABC');
  });

  test('should decode a character split across the word boundary', () => {
    // A ByteArray cuts its bytes into 31-byte words, so a two-byte character can straddle the cut:
    // 'é' is 0xc3 0xa9, and here its first byte closes the full word while its second one opens the
    // pending word. Neither half is a valid character alone — only decoding the reassembled byte
    // sequence brings 'é' back.
    const str = stringFromByteArray({
      data: [`0x${'78'.repeat(30)}c3`], // 30 × 'x' (0x78), then the first byte of 'é'
      pending_word: '0xa979', //           the second byte of 'é', then 'y' (0x79)
      pending_word_len: 2,
    });
    expect(str).toEqual(`${'x'.repeat(30)}éy`);
  });
});

describe('byteArrayFromString', () => {
  test('should return Cairo byte array from string', () => {
    const byteArray = byteArrayFromString('ABCDEFGHI');
    expect(byteArray).toEqual({
      data: [],
      pending_word: '0x414243444546474849',
      pending_word_len: 9,
    });
  });

  test('should split on byte boundaries, not character boundaries', () => {
    // 20 × 'é' is 20 characters but 40 bytes: one full 31-byte word, then 9 bytes pending
    const byteArray = byteArrayFromString('é'.repeat(20));
    expect(byteArray.data).toHaveLength(1);
    expect(byteArray.pending_word_len).toBe(9);
  });

  test('should round-trip a UTF-8 string', () => {
    const text = 'é'.repeat(20);
    expect(stringFromByteArray(byteArrayFromString(text))).toEqual(text);
  });
});
