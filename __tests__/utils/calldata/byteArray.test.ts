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
});
