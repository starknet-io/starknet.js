import { UINT_128_MAX, UINT_256_MAX, bnToUint256, uint256ToBN } from '../../src/utils/uint256';

describe('cairo uint256', () => {
  test('should convert 0 from uint256 to BN', () => {
    expect(uint256ToBN({ low: '0x0', high: '0x0' }).toString()).toMatchInlineSnapshot(`"0"`);
  });

  test('should convert 0 from BN to uint256 struct', () => {
    const uint256 = bnToUint256('0');
    expect(uint256).toMatchInlineSnapshot(`
      Object {
        "high": "0x0",
        "low": "0x0",
      }
    `);
  });

  test('should convert BN under 2^128 to uint256 struct', () => {
    const uint256 = bnToUint256(1000n);
    expect(uint256).toMatchInlineSnapshot(`
      Object {
        "high": "0x0",
        "low": "0x3e8",
      }
    `);
  });

  test('should convert BN over 2^128 to uint256 struct', () => {
    const uint256 = bnToUint256(UINT_128_MAX + 5n);
    expect(uint256).toMatchInlineSnapshot(`
      Object {
        "high": "0x1",
        "low": "0x4",
      }
    `);
  });

  test('should throw if BN over uint256 range', () => {
    expect(() => bnToUint256(UINT_256_MAX + 1n)).toThrowErrorMatchingInlineSnapshot(
      `"Number is too large"`
    );
  });
});
