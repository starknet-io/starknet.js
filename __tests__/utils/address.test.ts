import { validateAndParseAddress } from '../../src/utils/address';

describe('validateAndParseAddress', () => {
  test('should pass when correct starknet address is passed', () => {
    const addr = '0x07ee790591d9fa3efc87067d95a643f8455e0b8190eb8cb7bfd39e4fb7571fdf';

    return expect(validateAndParseAddress(addr)).toEqual(addr);
  });

  test('should add 0x prefix if not provided', () => {
    const addr = '07ee790591d9fa3efc87067d95a643f8455e0b8190eb8cb7bfd39e4fb7571fdf';

    return expect(validateAndParseAddress(addr)).toEqual(`0x${addr}`);
  });
});
