import { CairoByteArray } from '../../../src/utils/cairoDataTypes/byteArray';

describe('CairoByteArray.stringFromByteArray', () => {
  test('should return string from Cairo byte array', () => {
    const str = CairoByteArray.stringFromByteArray({
      data: [],
      pending_word: '0x414243444546474849',
      pending_word_len: 9,
    });
    expect(str).toEqual('ABCDEFGHI');
  });
});

describe('CairoByteArray.byteArrayFromString', () => {
  test('should return Cairo byte array from string', () => {
    const byteArray = CairoByteArray.byteArrayFromString('ABCDEFGHI');
    expect(byteArray).toEqual({
      data: [],
      pending_word: '0x414243444546474849',
      pending_word_len: 9,
    });
  });
});
