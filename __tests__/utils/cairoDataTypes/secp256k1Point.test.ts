/* eslint-disable no-new, no-bitwise, @typescript-eslint/no-unused-vars, no-underscore-dangle */
import {
  CairoSecp256k1Point,
  SECP256K1_POINT_MAX,
  SECP256K1_POINT_MIN,
} from '../../../src/utils/cairoDataTypes/secp256k1Point';
import { UINT_128_MAX } from '../../../src/utils/cairoDataTypes/uint256';

describe('CairoSecp256k1Point', () => {
  const ethPubKey =
    '0x8c7aea7d673a5858bdca128d124fb0765cceb2c16f198f4c14b328aa571331e6f6c87f51d5224d73d118765cb19d7565212f80be5048bff926ba791c17541c92';
  const expectedLimbs = {
    xLow: BigInt('0x5cceb2c16f198f4c14b328aa571331e6'),
    xHigh: BigInt('0x8c7aea7d673a5858bdca128d124fb076'),
    yLow: BigInt('0x212f80be5048bff926ba791c17541c92'),
    yHigh: BigInt('0xf6c87f51d5224d73d118765cb19d7565'),
  };

  describe('constructor', () => {
    test('should create from BigNumberish input', () => {
      const point = new CairoSecp256k1Point(ethPubKey);
      expect(point.xLow).toBe(expectedLimbs.xLow);
      expect(point.xHigh).toBe(expectedLimbs.xHigh);
      expect(point.yLow).toBe(expectedLimbs.yLow);
      expect(point.yHigh).toBe(expectedLimbs.yHigh);
    });

    test('should create from Secp256k1PointStruct', () => {
      const point = new CairoSecp256k1Point(expectedLimbs);
      expect(point.xLow).toBe(expectedLimbs.xLow);
      expect(point.xHigh).toBe(expectedLimbs.xHigh);
      expect(point.yLow).toBe(expectedLimbs.yLow);
      expect(point.yHigh).toBe(expectedLimbs.yHigh);
    });

    test('should create from direct limb values', () => {
      const point = new CairoSecp256k1Point(
        expectedLimbs.xLow,
        expectedLimbs.xHigh,
        expectedLimbs.yLow,
        expectedLimbs.yHigh
      );
      expect(point.xLow).toBe(expectedLimbs.xLow);
      expect(point.xHigh).toBe(expectedLimbs.xHigh);
      expect(point.yLow).toBe(expectedLimbs.yLow);
      expect(point.yHigh).toBe(expectedLimbs.yHigh);
    });

    test('should create from string input', () => {
      const point = new CairoSecp256k1Point('123456789');
      expect(point.toBigInt()).toBe(123456789n);
    });

    test('should create from number input', () => {
      const point = new CairoSecp256k1Point(123456789);
      expect(point.toBigInt()).toBe(123456789n);
    });

    test('should throw for incorrect parameters', () => {
      expect(() => new (CairoSecp256k1Point as any)()).toThrow(
        'Incorrect Secp256k1Point constructor parameters'
      );
      expect(() => new (CairoSecp256k1Point as any)(1, 2)).toThrow(
        'Incorrect Secp256k1Point constructor parameters'
      );
      expect(() => new (CairoSecp256k1Point as any)(1, 2, 3, 4, 5)).toThrow(
        'Incorrect Secp256k1Point constructor parameters'
      );
    });
  });

  describe('validation', () => {
    test('should validate valid inputs', () => {
      expect(() => CairoSecp256k1Point.validate(0)).not.toThrow();
      expect(() => CairoSecp256k1Point.validate(SECP256K1_POINT_MAX)).not.toThrow();
      expect(() => CairoSecp256k1Point.validate(ethPubKey)).not.toThrow();
    });

    test('should reject null and undefined', () => {
      expect(() => CairoSecp256k1Point.validate(null)).toThrow(
        'null value is not allowed for Secp256k1Point'
      );
      expect(() => CairoSecp256k1Point.validate(undefined)).toThrow(
        'undefined value is not allowed for Secp256k1Point'
      );
    });

    test('should reject values outside range', () => {
      expect(() => CairoSecp256k1Point.validate(-1)).toThrow(
        'input is smaller than SECP256K1_POINT_MIN'
      );
      expect(() => CairoSecp256k1Point.validate(SECP256K1_POINT_MAX + 1n)).toThrow(
        'input is bigger than SECP256K1_POINT_MAX'
      );
    });

    test('should reject invalid types', () => {
      expect(() => CairoSecp256k1Point.validate({})).toThrow(
        "Unsupported data type 'object' for Secp256k1Point"
      );
      expect(() => CairoSecp256k1Point.validate([])).toThrow(
        "Unsupported data type 'object' for Secp256k1Point"
      );
      expect(() => CairoSecp256k1Point.validate(true)).toThrow(
        "Unsupported data type 'boolean' for Secp256k1Point"
      );
    });

    test('should validate limb props', () => {
      expect(() => CairoSecp256k1Point.validateProps(0, 0, 0, 0)).not.toThrow();
      expect(() =>
        CairoSecp256k1Point.validateProps(UINT_128_MAX, UINT_128_MAX, UINT_128_MAX, UINT_128_MAX)
      ).not.toThrow();
    });

    test('should reject invalid limb props', () => {
      expect(() => CairoSecp256k1Point.validateProps(null as any, 0, 0, 0)).toThrow(
        'xLow cannot be null'
      );
      expect(() => CairoSecp256k1Point.validateProps(0, undefined as any, 0, 0)).toThrow(
        'xHigh cannot be undefined'
      );
      expect(() => CairoSecp256k1Point.validateProps(-1, 0, 0, 0)).toThrow(
        'xLow must be non-negative'
      );
      expect(() => CairoSecp256k1Point.validateProps(0, 0, 0, UINT_128_MAX + 1n)).toThrow(
        'yHigh must fit in 128 bits'
      );
    });
  });

  describe('static methods', () => {
    test('is() should correctly identify valid values', () => {
      expect(CairoSecp256k1Point.is(0)).toBe(true);
      expect(CairoSecp256k1Point.is(ethPubKey)).toBe(true);
      expect(CairoSecp256k1Point.is(SECP256K1_POINT_MAX)).toBe(true);
      expect(CairoSecp256k1Point.is(-1)).toBe(false);
      expect(CairoSecp256k1Point.is(SECP256K1_POINT_MAX + 1n)).toBe(false);
      expect(CairoSecp256k1Point.is(null)).toBe(false);
      expect(CairoSecp256k1Point.is({})).toBe(false);
    });

    test('isAbiType() should correctly identify type', () => {
      expect(CairoSecp256k1Point.isAbiType('core::starknet::secp256k1::Secp256k1Point')).toBe(true);
      expect(CairoSecp256k1Point.isAbiType('core::integer::u256')).toBe(false);
      expect(CairoSecp256k1Point.isAbiType('felt252')).toBe(false);
    });

    test('factoryFromApiResponse() should create from iterator', () => {
      const values = [
        '0x5cceb2c16f198f4c14b328aa571331e6',
        '0x8c7aea7d673a5858bdca128d124fb076',
        '0x212f80be5048bff926ba791c17541c92',
        '0xf6c87f51d5224d73d118765cb19d7565',
      ];
      const iterator = values[Symbol.iterator]();
      const point = CairoSecp256k1Point.factoryFromApiResponse(iterator);

      expect(point.xLow).toBe(expectedLimbs.xLow);
      expect(point.xHigh).toBe(expectedLimbs.xHigh);
      expect(point.yLow).toBe(expectedLimbs.yLow);
      expect(point.yHigh).toBe(expectedLimbs.yHigh);
    });

    test('fromHex() should create from hex string', () => {
      const cleanHex = ethPubKey.slice(2); // Remove 0x prefix
      const point = CairoSecp256k1Point.fromHex(ethPubKey);

      expect(point.toBigInt()).toBe(BigInt(ethPubKey));
    });

    test('fromHex() should handle various hex formats', () => {
      const shortHex = '0x123';
      const point = CairoSecp256k1Point.fromHex(shortHex);
      expect(point.toBigInt()).toBe(BigInt(shortHex));
    });

    test('fromHex() should reject invalid hex strings', () => {
      const tooLongHex = `0x${'1'.repeat(129)}`; // 129 chars = more than 512 bits
      expect(() => CairoSecp256k1Point.fromHex(tooLongHex)).toThrow(
        'Hex string must represent exactly 512 bits (128 hex characters)'
      );
    });
  });

  describe('instance methods', () => {
    let point: CairoSecp256k1Point;

    beforeEach(() => {
      point = new CairoSecp256k1Point(ethPubKey);
    });

    test('toBigInt() should return correct bigint', () => {
      expect(point.toBigInt()).toBe(BigInt(ethPubKey));
    });

    test('toStruct() should return correct structure', () => {
      const struct = point.toStruct();
      expect(struct.xLow).toBe('0x5cceb2c16f198f4c14b328aa571331e6');
      expect(struct.xHigh).toBe('0x8c7aea7d673a5858bdca128d124fb076');
      expect(struct.yLow).toBe('0x212f80be5048bff926ba791c17541c92');
      expect(struct.yHigh).toBe('0xf6c87f51d5224d73d118765cb19d7565');
    });

    test('toHexString() should return correct hex', () => {
      expect(point.toHexString()).toBe(ethPubKey);
    });

    test('toApiRequest() should return correct felt array', () => {
      const apiRequest = point.toApiRequest();
      expect(apiRequest).toHaveLength(4);
      // CairoFelt returns decimal strings, not hex
      expect(apiRequest[0]).toBe(BigInt('0x5cceb2c16f198f4c14b328aa571331e6').toString());
      expect(apiRequest[1]).toBe(BigInt('0x8c7aea7d673a5858bdca128d124fb076').toString());
      expect(apiRequest[2]).toBe(BigInt('0x212f80be5048bff926ba791c17541c92').toString());
      expect(apiRequest[3]).toBe(BigInt('0xf6c87f51d5224d73d118765cb19d7565').toString());
      // Should have compiled flag
      expect((apiRequest as any).__compiled__).toBe(true);
    });
  });

  describe('edge cases and limb splitting', () => {
    test('should handle zero correctly', () => {
      const point = new CairoSecp256k1Point(0);
      expect(point.xLow).toBe(0n);
      expect(point.xHigh).toBe(0n);
      expect(point.yLow).toBe(0n);
      expect(point.yHigh).toBe(0n);
      expect(point.toBigInt()).toBe(0n);
    });

    test('should handle maximum value correctly', () => {
      const point = new CairoSecp256k1Point(SECP256K1_POINT_MAX);
      expect(point.xLow).toBe(UINT_128_MAX);
      expect(point.xHigh).toBe(UINT_128_MAX);
      expect(point.yLow).toBe(UINT_128_MAX);
      expect(point.yHigh).toBe(UINT_128_MAX);
      expect(point.toBigInt()).toBe(SECP256K1_POINT_MAX);
    });

    test('should correctly split and reconstruct values', () => {
      const testValues = [
        0n,
        1n,
        UINT_128_MAX,
        UINT_128_MAX + 1n,
        (1n << 256n) - 1n, // Max for first 256 bits
        1n << 256n, // First bit of second 256 bits
        SECP256K1_POINT_MAX,
      ];

      testValues.forEach((value) => {
        const point = new CairoSecp256k1Point(value);
        expect(point.toBigInt()).toBe(value);
      });
    });

    test('should maintain bit layout consistency', () => {
      // Test that the limb layout matches the expected coordinate format
      const point = new CairoSecp256k1Point(ethPubKey);
      const reconstructed = point.toBigInt();
      expect(reconstructed).toBe(BigInt(ethPubKey));
    });
  });

  describe('abiSelector', () => {
    test('should have correct abi selector', () => {
      expect(CairoSecp256k1Point.abiSelector).toBe('core::starknet::secp256k1::Secp256k1Point');
    });
  });
});
