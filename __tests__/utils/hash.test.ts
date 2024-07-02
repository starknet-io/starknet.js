import { keccakBn, starknetKeccak, getSelectorFromName, getSelector } from '../../src/utils/hash';

describe('keccakBn', () => {
  test('should properly calculate the Keccak hash', () => {
    expect(keccakBn('0xabc')).toBe(
      '0x11cf08aac85935e32397f410e48217a127b6855d41b1e3877eb4179c0904b77'
    );
  });
});

describe('starknetKeccak', () => {
  test('should properly calculate the starknet BigInt Keccak hash', () => {
    expect(starknetKeccak('test').toString()).toBe(
      '61835310290161785288773114225739080147441215596947647498723774891619563096'
    );
  });
});

describe('getSelectorFromName', () => {
  test('should properly calculate the selector', () => {
    expect(getSelectorFromName('myFunction')).toBe(
      '0xc14cfe23f3fa7ce7b1f8db7d7682305b1692293f71a61cc06637f0d8d8b6c8'
    );
  });
});

describe('getSelector', () => {
  test('should return the proper selector when provided a function name', () => {
    expect(getSelector('myFunction')).toBe(
      '0xc14cfe23f3fa7ce7b1f8db7d7682305b1692293f71a61cc06637f0d8d8b6c8'
    );
  });

  test('should return the proper selector when provided a hex-string', () => {
    expect(getSelector('0x123abc')).toBe('0x123abc');
  });

  test('should return the proper selector when provided a decimal string', () => {
    expect(getSelector('123456')).toBe('0x1e240');
  });
});
