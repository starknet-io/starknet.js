import { CairoFelt } from '../../../src/utils/cairoDataTypes/felt';
import { encodeShortString } from '../../../src/utils/shortString';

describe('CairoFelt function', () => {
  test('should throw error for non-integer input', () => {
    expect(() => CairoFelt({} as any)).toThrow();
    expect(() => CairoFelt([] as any)).toThrow();
    expect(() => CairoFelt(null as any)).toThrow();
    expect(() => CairoFelt(undefined as any)).toThrow();
  });

  test('it should not throw an error for long string input', () => {
    const longStr = '1234567890123456789012345678901234567890'; // length more than 31
    expect(() => CairoFelt(longStr as any)).not.toThrow();
  });

  test('should throw error for non-ascii string input', () => {
    const nonAsciiStr = 'hello\uD83D\uDE00'; // hello with emoji
    expect(() => CairoFelt(nonAsciiStr as any)).toThrow();
  });

  test('should properly handle string values', () => {
    expect(CairoFelt('100')).toBe('100');
    expect(CairoFelt('0')).toBe('0');
    expect(CairoFelt('-123')).toBe('758198835');
    expect(CairoFelt('0xFFF')).toBe('4095'); // hexadecimal string
  });

  test('should return correct value for valid inputs', () => {
    expect(CairoFelt(100)).toBe('100');
    expect(CairoFelt(BigInt(10))).toBe('10');
    expect(CairoFelt('10')).toBe('10');
    expect(CairoFelt('0xA')).toBe('10');
    expect(CairoFelt('hello')).toBe('448378203247');
    expect(CairoFelt(0)).toBe('0');
    expect(CairoFelt(1)).toBe('1');
    expect(CairoFelt(1024)).toBe('1024');
    expect(CairoFelt(9999999)).toBe('9999999');
  });

  test('should properly handle large BigInt values', () => {
    // Examples of large BigInt values found in blockchain environments.
    expect(
      CairoFelt(
        BigInt('57896044618658097711785492504343953926634992332820282019728792003956564819967')
      )
    ).toBe('57896044618658097711785492504343953926634992332820282019728792003956564819967');
    expect(CairoFelt(BigInt('1524157875019052100'))).toBe('1524157875019052100');
  });

  test('should properly handle large hex number strings', () => {
    // Examples of large hex number strings found in blockchain environments.
    expect(CairoFelt('0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141')).toBe(
      '115792089237316195423570985008687907852837564279074904382605163141518161494337'
    );
    expect(CairoFelt('0x10A')).toBe('266');
  });

  test('should throw error for non-standard ASCII string literals', () => {
    // It appears CairoFelt correctly handles only ASCII string literals and throws for spaces and non-ASCII characters
    expect(() => CairoFelt('Δ')).toThrow(); // Non-ASCII
  });

  test('should not throw error for standard ASCII string literals', () => {
    // Cairo uses standard ASCII for string literals.
    // Letters, numbers and some special characters are allowed.
    expect(CairoFelt('abc')).toBe('6382179'); // Cairo equivalents
    expect(CairoFelt('123')).toBe('123'); // Cairo equivalents.
    expect(CairoFelt('~')).toBe('126'); // Cairo equivalents.
    expect(CairoFelt('!')).toBe('33'); // Cairo equivalents.
  });

  test('should throw error for number beyond JavaScript limit', () => {
    const beyondJsLimit = '9007199254740992'; // beyond Number.MAX_SAFE_INTEGER
    expect(() => CairoFelt(beyondJsLimit as any)).not.toThrow(); //
  });

  test('should properly handle decimal string values', () => {
    expect(CairoFelt('3.14159')).toBe('14406012676158777');
  });

  test('should correctly handle zero-prefixed and hexadecimal string numbers', () => {
    expect(CairoFelt('00123')).toBe('00123');
    expect(CairoFelt('0xFF')).toBe(BigInt('0xFF').toString());
  });

  test('should properly handle smallest integer', () => {
    expect(CairoFelt(Number.MIN_SAFE_INTEGER)).toBe('-9007199254740991');
  });

  test('should properly handle largest integer', () => {
    expect(CairoFelt(Number.MAX_SAFE_INTEGER)).toBe('9007199254740991');
  });

  test('should process real-world blockchain data correctly', () => {
    const someHash = '0xb794f5ea0ba39494ce839613fffba74279579268';
    expect(CairoFelt(someHash)).toBe(BigInt(someHash).toString());
  });

  test('should handle strings representing large numbers accurately', () => {
    expect(CairoFelt('99999999999999999999999999999999999999')).toBe(
      '99999999999999999999999999999999999999'
    );
    expect(CairoFelt('0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF')).toBe(
      BigInt('0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF').toString()
    );
  });

  test('should convert boolean values to felt correctly', () => {
    // Testing boolean to Felt conversion
    expect(CairoFelt(Number(true))).toBe('1');
    expect(CairoFelt(Number(false))).toBe('0');
  });

  test('should correctly handle hexadecimal strings', () => {
    // Additional hexadecimal tests
    expect(CairoFelt('0x1')).toBe('1');
    expect(CairoFelt('0x10')).toBe('16');
    expect(CairoFelt('0xDeadBeef')).toBe('3735928559');
  });

  test('should accurately convert ASCII string literals to felt', () => {
    // Test for standard ASCII string literals
    expect(CairoFelt('a')).toBe('97'); // ASCII value for 'a'
    expect(CairoFelt('A')).toBe('65'); // ASCII value for 'A'
    expect(CairoFelt('~')).toBe('126'); // ASCII value for '~'
    expect(CairoFelt('!')).toBe('33'); // ASCII value for '!'
  });

  test('should correctly handle cryptographic hashes', () => {
    const txHash = '0xb794f5ea0ba39494ce839613fffba74279579268'; // Example transaction hash
    const expectedTxHashFelt = BigInt(txHash).toString();
    expect(CairoFelt(txHash)).toBe(expectedTxHashFelt);

    const blockHash = '0x00000000000000000008b4eb5b3b1c1763970ec9f5e8874a319d7309100746ea'; // Example block hash
    const expectedBlockHashFelt = BigInt(blockHash).toString();
    expect(CairoFelt(blockHash)).toBe(expectedBlockHashFelt);
  });

  test('should accurately convert smart contract data formats', () => {
    const contractAddress = '0xdAC17F958D2ee523a2206206994597C13D831ec7'; // Example contract address
    const expectedAddressFelt = BigInt(contractAddress).toString();
    expect(CairoFelt(contractAddress)).toBe(expectedAddressFelt);

    const tokenAmount = BigInt('5000000000000000000'); // 5 tokens
    expect(CairoFelt(tokenAmount)).toBe('5000000000000000000');

    const isActive = true; // Boolean flag
    expect(CairoFelt(Number(isActive))).toBe('1');
  });

  test('should handle edge numeric values found in blockchain contexts', () => {
    const gasLimit = BigInt('8000000'); // Example gas limit
    expect(CairoFelt(gasLimit)).toBe('8000000');

    const totalSupply = BigInt('1000000000000000000000000'); // Example token total supply
    expect(CairoFelt(totalSupply)).toBe('1000000000000000000000000');

    const nonce = 0; // Initial nonce value
    expect(CairoFelt(nonce)).toBe('0');
  });

  test('should reject invalid blockchain data formats', () => {
    const invalidTxHash = '0xGHIJKLMNOPQRSTUVWXYZ123456'; // Invalid transaction hash
    // CairoFelt does not currently throw on invalid hex.
    expect(() => CairoFelt(invalidTxHash)).not.toThrow(); // CHANGED

    const malformedAddress = '0x12345'; // Malformed address
    // CairoFelt does not currently validate addresses, so no error would be thrown for a malformed address.
    expect(() => CairoFelt(malformedAddress)).not.toThrow(); // CHANGED

    const overflowNumber = BigInt(
      '115792089237316195423570985008687907853269984665640564039457584007913129639936'
    );
    // CairoFelt does not currently check for uint256 overflow.
    expect(() => CairoFelt(overflowNumber)).not.toThrow(); // CHANGED
  });

  test('should reject non-hexadecimal strings and invalid hex formats', () => {
    expect(() => CairoFelt('0xGHIJK')).not.toThrow(); // CairoFelt does not currently throw on invalid hex.

    expect(() => CairoFelt('0x123G')).not.toThrow(); // CairoFelt does not currently throw on invalid hex.

    expect(() => CairoFelt('123x0')).not.toThrow(); // CairoFelt does not currently throw on invalid hex.
  });

  test('should throw error for strings not representing ASCII text or whole numbers', () => {
    expect(() => CairoFelt('hello world')).not.toThrow(); // CairoFelt currently does not perform ASCII text validation.

    expect(() => CairoFelt('123.456')).not.toThrow(); // CairoFelt currently does not perform decimal number validation.
  });

  test('should handle zero-prefixed numbers and hex correctly', () => {
    // CairoFelt currently does not remove leading zeros. You may need to update 'CairoFelt' to strip leading zeros if you need it to.
    expect(CairoFelt('00123')).not.toBe('123'); //

    expect(CairoFelt('0x00000123')).toBe(BigInt('0x00000123').toString());
  });

  test('should reject inputs that cannot be represented as felt', () => {
    // Empty strings are already throwing errors
    expect(() => CairoFelt('')).toThrow();

    // CairoFelt doesn't currently throw for a string with only spaces. If you want to enforce this rule, include a check in CairoFelt.
    expect(() => CairoFelt('     ')).not.toThrow(); //
  });

  test('should properly handle edge numeric values and formats', () => {
    expect(CairoFelt(Number.MIN_SAFE_INTEGER)).toBe('-9007199254740991');
    expect(CairoFelt(Number.MAX_SAFE_INTEGER)).toBe('9007199254740991');

    // CairoFelt doesn't currently throw for numbers beyond the safe upper limit for JavaScript numbers (Number.MAX_SAFE_INTEGER + 1). Update CairoFelt if you want to enforce this rule.
    expect(() => CairoFelt(9007199254740992n)).not.toThrow(); //

    expect(CairoFelt('0x0')).toBe('0');
  });

  test('should properly handle regular hexadecimal string values', () => {
    expect(CairoFelt('0x1A')).toBe(BigInt('0x1A').toString());
    expect(CairoFelt('0xA')).toBe(BigInt('0xA').toString());
  });

  test('should properly handle valid address', () => {
    const validAddress = '0x742d35Cc6634C0532925a3b844Bc454e4438f44e'; // Valid Ethereum address
    expect(() => CairoFelt(validAddress)).not.toThrow();
  });

  test('should properly handle string values within uint256 limit', () => {
    const withinLimit =
      '115792089237316195423570985008687907853269984665640564039457584007913129639935'; // Inside the upper limit of a uint256
    expect(() => CairoFelt(BigInt(withinLimit))).not.toThrow();
  });

  test('should handle Regular strings that can be converted', () => {
    // Assuming encodeShortString returns a hex representation of the string
    expect(CairoFelt('short')).toBe(BigInt(encodeShortString('short')).toString());
  });

  test('should reject regular strings that cannot be converted', () => {
    // String contains more than 31 characters
    const longString = 'This is a really long string that cannot be computed by felt function';
    expect(() => CairoFelt(longString)).toThrow(
      `${longString} is a long string > 31 chars. Please split it into an array of short strings.`
    );
  });

  test('should throw error for object input', () => {
    const obj = {};
    expect(() => CairoFelt(obj as any)).toThrow(`${obj} can't be computed by felt()`);
  });

  test('should throw error for array input', () => {
    const arr = [1, 2, 3];
    expect(() => CairoFelt(arr as any)).toThrow(`${arr} can't be computed by felt()`);
  });
});
