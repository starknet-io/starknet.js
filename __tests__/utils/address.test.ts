import {
  addAddressPadding,
  getChecksumAddress,
  validateAndParseAddress,
  validateChecksumAddress,
} from '../../src/utils/address';
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

describe('address checksums', () => {
  test('should be able to calculate checksum address', () => {
    const checksumAddress = getChecksumAddress(
      '0x2fd23d9182193775423497fc0c472e156c57c69e4089a1967fb288a2d84e914'
    );
    expect(checksumAddress).toEqual(
      '0x02FD23D9182193775423497Fc0c472E156C57C69E4089a1967fb288a2D84e914'
    );
  });
  test('should be able to verify checksum address', () => {
    const isValid = validateChecksumAddress(
      '0x02FD23D9182193775423497Fc0c472E156C57C69E4089a1967fb288a2D84e914'
    );
    expect(isValid).toEqual(true);
  });
  test('calculated checksum address should validate', () => {
    const checksumAddress = getChecksumAddress(
      '0x26cb0b500d175111341fabb53bf7fa4f5a0b8c5cbb31896cec1e8383a5edda8'
    );
    const isValid = validateChecksumAddress(checksumAddress);
    expect(isValid).toEqual(true);
  });
});
