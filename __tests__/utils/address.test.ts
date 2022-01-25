import { addAddressPadding, validateAndParseAddress } from '../../src/utils/address';
// import { addHexPrefix, removeHexPrefix } from '../../src/utils/encode';

describe('validateAndParseAddress', () => {
  test('should pass when correct starknet address is passed', () => {
    const addr = '0x7ee790591d9fa3efc87067d95a643f8455e0b8190eb8cb7bfd39e4fb7571fdf';

    return expect(validateAndParseAddress(addr)).toEqual(`${addAddressPadding(addr)}`);
  });

  test('should add 0x prefix if not provided', () => {
    const addr = '0x6eff1d71068df8e6677f59a556151c56ed13e14ad431a9bef6fcb3fc5e6fa7';

    return expect(validateAndParseAddress(addr)).toEqual(`${addAddressPadding(addr)}`);
  });
});
