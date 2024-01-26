import { cairo } from '../../src';
import { UINT_128_MAX, UINT_256_MAX, bnToUint256, uint256ToBN } from '../../src/utils/uint256';

describe('cairo uint256', () => {
  test('bnToUint256 should not convert -1 from BN to uint256 struct', () => {
    expect(() => {
      bnToUint256(-1n);
    }).toThrow('uint256 must be positive number');
  });

  test('uint256 should not convert -1 to uint256 hex-string struct', () => {
    expect(() => {
      cairo.uint256(-1n);
    }).toThrow('uint256 must be positive number');
  });

  test('uint256 should not convert -1 to uint256 dec struct', () => {
    const uint256 = cairo.uint256(1000n);
    expect(uint256).toMatchInlineSnapshot(`
      Object {
        "high": "0",
        "low": "1000",
      }
    `);
  });

  test('should convert 0 from BN to uint256 struct', () => {
    const uint256 = bnToUint256(0n);
    expect(uint256).toMatchInlineSnapshot(`
      Object {
        "high": "0x0",
        "low": "0x0",
      }
    `);
  });

  test('should convert 1000 from BN to uint256 struct', () => {
    const uint256 = bnToUint256(1000n);
    expect(uint256).toMatchInlineSnapshot(`
      Object {
        "high": "0x0",
        "low": "0x3e8",
      }
    `);
  });

  test('should convert 10^9 from BN to uint256 struct', () => {
    const uint256 = bnToUint256(1000000000n);
    expect(uint256).toMatchInlineSnapshot(`
      Object {
        "high": "0x0",
        "low": "0x3b9aca00",
      }
    `);
  });

  test('should convert 2^128 from BN to uint256 struct', () => {
    const uint256 = bnToUint256(UINT_128_MAX);
    expect(uint256).toMatchInlineSnapshot(`
      Object {
        "high": "0x0",
        "low": "0xffffffffffffffffffffffffffffffff",
      }
    `);
  });

  test('should convert 2^128 + 1 from BN to uint256 struct', () => {
    const uint256 = bnToUint256(UINT_128_MAX + 1n);
    expect(uint256).toMatchInlineSnapshot(`
      Object {
        "high": "0x1",
        "low": "0x0",
      }
    `);
  });

  test('should convert 2^256 - 1 from BN to uint256 struct', () => {
    const uint256 = bnToUint256(UINT_256_MAX);
    expect(uint256).toMatchInlineSnapshot(`
      Object {
        "high": "0xffffffffffffffffffffffffffffffff",
        "low": "0xffffffffffffffffffffffffffffffff",
      }
    `);
  });

  test('should convert 0 from uint256 to BN', () => {
    expect(uint256ToBN({ low: '0x0', high: '0x0' }).toString()).toMatchInlineSnapshot(`"0"`);
  });

  test('should convert 1000 from uint256 to BN', () => {
    expect(uint256ToBN({ low: '0x3e8', high: '0x0' }).toString()).toMatchInlineSnapshot(`"1000"`);
  });

  test('should convert 10^9 from uint256 to BN', () => {
    expect(uint256ToBN({ low: '0x3b9aca00', high: '0x0' }).toString()).toMatchInlineSnapshot(
      `"1000000000"`
    );
  });

  test('should convert 2^128 from uint256 to BN', () => {
    expect(
      uint256ToBN({ low: '0xffffffffffffffffffffffffffffffff', high: '0x0' }).toString()
    ).toEqual(UINT_128_MAX.toString());
  });

  test('should convert 2^128 + 1 from uint256 to BN', () => {
    expect(uint256ToBN({ low: '0x0', high: '0x1' }).toString()).toEqual(
      (UINT_128_MAX + 1n).toString()
    );
  });

  test('should convert 2^256 - 1 from uint256 to BN', () => {
    expect(
      uint256ToBN({
        low: '0xffffffffffffffffffffffffffffffff',
        high: '0xffffffffffffffffffffffffffffffff',
      }).toString()
    ).toEqual(UINT_256_MAX.toString());
  });

  test('should throw if BN over uint256 range', () => {
    expect(() => bnToUint256(UINT_256_MAX + 1n)).toThrowErrorMatchingInlineSnapshot(
      `"Number is too large"`
    );
  });
});
