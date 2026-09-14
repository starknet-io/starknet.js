import {
  CairoSecp256k1Point,
  SECP256K1_POINT_MAX,
  SECP256K1_POINT_MIN,
  Literal,
} from '../../../src';

// a full-width 512-bit value, x || y, as an uncompressed public key reads once its 04 prefix is gone
const PUB_KEY = BigInt(`0x${'1a'.repeat(64)}`);

/** Recompose the 512-bit value the four limbs stand for, x in the upper 256 bits. */
const limbsToValue = (xLow: bigint, xHigh: bigint, yLow: bigint, yHigh: bigint) =>
  (xHigh * 2n ** 128n + xLow) * 2n ** 256n + yHigh * 2n ** 128n + yLow;

describe('CairoSecp256k1Point class Unit Tests', () => {
  describe('constructor from a single 512-bit value', () => {
    test('should split x into the upper 256 bits and y into the lower ones', () => {
      const point = new CairoSecp256k1Point(1n);
      expect(point.xLow).toBe(0n);
      expect(point.xHigh).toBe(0n);
      expect(point.yLow).toBe(1n);
      expect(point.yHigh).toBe(0n);
    });

    test('should split each coordinate into its two limbs', () => {
      const value = limbsToValue(1n, 2n, 3n, 4n);
      const point = new CairoSecp256k1Point(value);
      expect(point.xLow).toBe(1n);
      expect(point.xHigh).toBe(2n);
      expect(point.yLow).toBe(3n);
      expect(point.yHigh).toBe(4n);
    });

    test('should accept a hexadecimal or decimal string', () => {
      expect(new CairoSecp256k1Point('0x1234').toBigInt()).toBe(4660n);
      expect(new CairoSecp256k1Point('4660').toBigInt()).toBe(4660n);
    });

    test('should carry a full-width key unchanged', () => {
      expect(new CairoSecp256k1Point(PUB_KEY).toBigInt()).toBe(PUB_KEY);
    });
  });

  describe('constructor from the four limbs', () => {
    test('should keep the limbs in the order a call carries them', () => {
      const point = new CairoSecp256k1Point(1, 2, 3, 4);
      expect(point.xLow).toBe(1n);
      expect(point.xHigh).toBe(2n);
      expect(point.yLow).toBe(3n);
      expect(point.yHigh).toBe(4n);
    });

    test('should agree with the single-value form', () => {
      expect(new CairoSecp256k1Point(0, 0, 1, 0).toBigInt()).toBe(1n);
      expect(new CairoSecp256k1Point(0, 0, 3, 0).toBigInt()).toBe(3n);
    });
  });

  describe('constructor from a Secp256k1PointStruct', () => {
    test('should read the four named limbs', () => {
      const point = new CairoSecp256k1Point({ xLow: 1, xHigh: 2, yLow: 3, yHigh: 4 });
      expect(point.xLow).toBe(1n);
      expect(point.xHigh).toBe(2n);
      expect(point.yLow).toBe(3n);
      expect(point.yHigh).toBe(4n);
    });

    test('should accept hexadecimal limbs', () => {
      const point = new CairoSecp256k1Point({
        xLow: '0x1',
        xHigh: '0x2',
        yLow: '0x3',
        yHigh: '0x4',
      });
      expect(point.toBigInt()).toBe(limbsToValue(1n, 2n, 3n, 4n));
    });

    test('should refuse an object that is not one, reading it as a value instead', () => {
      expect(() => new CairoSecp256k1Point({ xLow: 1 } as any)).toThrow(
        'Unsupported input for Secp256k1Point'
      );
      expect(() => new CairoSecp256k1Point({})).toThrow('Unsupported input for Secp256k1Point');
    });
  });

  describe('range', () => {
    test('should accept the whole 512-bit range', () => {
      expect(() => new CairoSecp256k1Point(SECP256K1_POINT_MIN)).not.toThrow();
      expect(new CairoSecp256k1Point(SECP256K1_POINT_MAX).toBigInt()).toBe(SECP256K1_POINT_MAX);
    });

    test('should reject a value one bit too wide', () => {
      expect(() => new CairoSecp256k1Point(SECP256K1_POINT_MAX + 1n)).toThrow(
        'input is bigger than SECP256K1_POINT_MAX'
      );
    });

    test('should reject a negative value', () => {
      expect(() => new CairoSecp256k1Point(-1)).toThrow(
        'input is smaller than SECP256K1_POINT_MIN'
      );
    });

    test('should expose the two bounds', () => {
      expect(SECP256K1_POINT_MAX).toBe(2n ** 512n - 1n);
      expect(SECP256K1_POINT_MIN).toBe(0n);
    });
  });

  describe('inputs this class does not read', () => {
    test('should reject null and undefined', () => {
      expect(() => new CairoSecp256k1Point(null)).toThrow(
        'null value is not allowed for Secp256k1Point'
      );
      expect(() => new CairoSecp256k1Point(undefined)).toThrow(
        'undefined value is not allowed for Secp256k1Point'
      );
    });

    test('should reject text and arrays', () => {
      expect(() => new CairoSecp256k1Point('abc')).toThrow(
        "Unsupported input for Secp256k1Point. Expected a number, a bigint, or a string spelling one, received 'string'"
      );
      expect(() => new CairoSecp256k1Point([])).toThrow('Unsupported input for Secp256k1Point');
    });

    test('should reject a decimal number', () => {
      // the message comes from BigInt itself: isBigNumberish lets a non-integer number through
      expect(() => new CairoSecp256k1Point(1.5)).toThrow('cannot be converted to a BigInt');
    });

    test('should reject any argument count other than 1 or 4', () => {
      expect(() => new (CairoSecp256k1Point as any)()).toThrow(
        'Incorrect Secp256k1Point constructor parameters'
      );
      expect(() => new (CairoSecp256k1Point as any)(1, 2)).toThrow(
        'Incorrect Secp256k1Point constructor parameters'
      );
      expect(() => new (CairoSecp256k1Point as any)(1, 2, 3)).toThrow(
        'Incorrect Secp256k1Point constructor parameters'
      );
    });
  });

  describe('validateProps static method', () => {
    test('should return the four limbs as bigints', () => {
      expect(CairoSecp256k1Point.validateProps(1, 2, 3, 4)).toEqual({
        xLow: 1n,
        xHigh: 2n,
        yLow: 3n,
        yHigh: 4n,
      });
    });

    test('should name the limb that is too wide', () => {
      expect(() => CairoSecp256k1Point.validateProps(2n ** 128n, 2, 3, 4)).toThrow(
        'xLow must fit in 128 bits'
      );
      expect(() => CairoSecp256k1Point.validateProps(1, 2, 3, 2n ** 128n)).toThrow(
        'yHigh must fit in 128 bits'
      );
    });

    test('should name the limb that is negative or missing', () => {
      expect(() => CairoSecp256k1Point.validateProps(-1, 2, 3, 4)).toThrow(
        'xLow must be non-negative'
      );
      expect(() => CairoSecp256k1Point.validateProps(null as any, 2, 3, 4)).toThrow(
        'xLow cannot be null'
      );
    });
  });

  describe('validate static method', () => {
    test('should return the checked value', () => {
      expect(CairoSecp256k1Point.validate('0x1234')).toBe(4660n);
      expect(CairoSecp256k1Point.validate(SECP256K1_POINT_MAX)).toBe(SECP256K1_POINT_MAX);
    });

    test('should throw outside the range', () => {
      expect(() => CairoSecp256k1Point.validate(SECP256K1_POINT_MAX + 1n)).toThrow(
        'input is bigger than SECP256K1_POINT_MAX'
      );
    });
  });

  describe('is static method', () => {
    test('should return true for a value that fits in 512 bits', () => {
      expect(CairoSecp256k1Point.is(0)).toBe(true);
      expect(CairoSecp256k1Point.is(PUB_KEY)).toBe(true);
      expect(CairoSecp256k1Point.is(SECP256K1_POINT_MAX)).toBe(true);
    });

    test('should return false for anything this class refuses', () => {
      expect(CairoSecp256k1Point.is(SECP256K1_POINT_MAX + 1n)).toBe(false);
      expect(CairoSecp256k1Point.is(-1)).toBe(false);
      expect(CairoSecp256k1Point.is('abc')).toBe(false);
      expect(CairoSecp256k1Point.is(null)).toBe(false);
      expect(CairoSecp256k1Point.is({})).toBe(false);
    });
  });

  describe('isAbiType static method', () => {
    test('should recognise its own abi type', () => {
      expect(CairoSecp256k1Point.abiSelector).toBe(Literal.Secp256k1Point);
      expect(CairoSecp256k1Point.isAbiType('core::starknet::secp256k1::Secp256k1Point')).toBe(true);
    });

    test('should reject any other abi type', () => {
      expect(CairoSecp256k1Point.isAbiType('core::felt252')).toBe(false);
    });
  });

  describe('toApiRequest method', () => {
    test('should return the four limbs as decimal strings', () => {
      expect([
        ...new CairoSecp256k1Point({ xLow: 1, xHigh: 2, yLow: 3, yHigh: 4 }).toApiRequest(),
      ]).toEqual(['1', '2', '3', '4']);
      expect([...new CairoSecp256k1Point(1n).toApiRequest()]).toEqual(['0', '0', '1', '0']);
    });

    test('should flag the result as compiled', () => {
      const request = new CairoSecp256k1Point(1n).toApiRequest();
      expect(request).toHaveProperty('__compiled__', true);
      expect(Object.keys(request)).toEqual(['0', '1', '2', '3']);
    });
  });

  describe('toStruct and toHexString methods', () => {
    test('should return the limbs as unpadded hexadecimal strings', () => {
      expect(new CairoSecp256k1Point({ xLow: 1, xHigh: 2, yLow: 3, yHigh: 4 }).toStruct()).toEqual({
        xLow: '0x1',
        xHigh: '0x2',
        yLow: '0x3',
        yHigh: '0x4',
      });
    });

    test('should return the whole point as one hexadecimal string', () => {
      expect(new CairoSecp256k1Point(4660n).toHexString()).toBe('0x1234');
    });
  });

  describe('fromHex static method', () => {
    test('should left-pad a short string to 128 hex digits', () => {
      expect([...CairoSecp256k1Point.fromHex('0x1').toApiRequest()]).toEqual(['0', '0', '1', '0']);
      expect(CairoSecp256k1Point.fromHex('0x').toBigInt()).toBe(0n);
    });

    test('should read a full-width key', () => {
      expect(CairoSecp256k1Point.fromHex(`0x${'1a'.repeat(64)}`).toBigInt()).toBe(PUB_KEY);
    });

    test('should agree with the single-value constructor', () => {
      expect(CairoSecp256k1Point.fromHex('0x1234').toBigInt()).toBe(
        new CairoSecp256k1Point(4660n).toBigInt()
      );
    });

    test('should refuse a string wider than 512 bits', () => {
      expect(() => CairoSecp256k1Point.fromHex(`0x${'a'.repeat(129)}`)).toThrow(
        'Hex string must represent exactly 512 bits (128 hex characters)'
      );
    });
  });

  describe('factoryFromApiResponse static method', () => {
    test('should read four felts in the order a call carries them', () => {
      const point = CairoSecp256k1Point.factoryFromApiResponse(
        ['0x1', '0x2', '0x3', '0x4'].values()
      );
      expect(point.xLow).toBe(1n);
      expect(point.xHigh).toBe(2n);
      expect(point.yLow).toBe(3n);
      expect(point.yHigh).toBe(4n);
    });

    test('should consume exactly four felts per call', () => {
      const iterator = ['0x0', '0x0', '0x1', '0x0', '0x0', '0x0', '0x2', '0x0'].values();
      expect(CairoSecp256k1Point.factoryFromApiResponse(iterator).toBigInt()).toBe(1n);
      expect(CairoSecp256k1Point.factoryFromApiResponse(iterator).toBigInt()).toBe(2n);
    });
  });

  describe('round-trip consistency', () => {
    test('should survive a serialize then read back cycle', () => {
      [0n, 1n, 4660n, PUB_KEY, SECP256K1_POINT_MAX].forEach((value) => {
        const felts = [...new CairoSecp256k1Point(value).toApiRequest()];
        expect(felts).toHaveLength(4);
        expect(CairoSecp256k1Point.factoryFromApiResponse(felts.values()).toBigInt()).toBe(value);
      });
    });
  });
});
