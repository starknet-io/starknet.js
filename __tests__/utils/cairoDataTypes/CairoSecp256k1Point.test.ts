import {
  CairoSecp256k1Point,
  SECP256K1_POINT_MAX,
  SECP256K1_POINT_MIN,
  Literal,
} from '../../../src';

// G, the generator of the secp256k1 curve, as one 512-bit number x || y, then as its four limbs
const G =
  0x79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8n;
const G_X_LOW = 0x029bfcdb2dce28d959f2815b16f81798n;
const G_X_HIGH = 0x79be667ef9dcbbac55a06295ce870b07n;
const G_Y_LOW = 0xfd17b448a68554199c47d08ffb10d4b8n;
const G_Y_HIGH = 0x483ada7726a3c4655da4fbfc0e1108a8n;

// an Ethereum public key, x || y, as an uncompressed key reads once its 04 prefix is gone. It is the
// key of __tests__/utils/secp256k1Point.test.ts, where its four limbs are written out too.
const PUB_KEY =
  0x8c7aea7d673a5858bdca128d124fb0765cceb2c16f198f4c14b328aa571331e6f6c87f51d5224d73d118765cb19d7565212f80be5048bff926ba791c17541c92n;

// p, the prime of the secp256k1 curve
const P = 2n ** 256n - 2n ** 32n - 977n;

// Two points on the curve with one small coordinate, computed with @noble/curves and checked with
// y^2 = x^3 + 7 modulo p : (1, Y_OF_X_1) and (X_OF_Y_1, 1). Adding p to the small coordinate still
// fits in 256 bits, which gives a coordinate that is right modulo p but not smaller than p.
const Y_OF_X_1 = 0x4218f20ae6c646b363db68605822fb14264ca8d2587fdd6fbc750d587e76a7een;
const X_OF_Y_1 = 0x1fe1e5ef3fceb5c135ab7741333ce5a6e80d68167653f6b2b24bcbcfaaaff507n;

const NOT_ON_CURVE =
  'Secp256k1Point: this point is not on the secp256k1 curve (y^2 must equal x^3 + 7 modulo p), so a contract would refuse it';
const X_NOT_BELOW_P = 'Secp256k1Point: x must be smaller than p, the prime of the secp256k1 curve';
const Y_NOT_BELOW_P = 'Secp256k1Point: y must be smaller than p, the prime of the secp256k1 curve';

describe('CairoSecp256k1Point class Unit Tests', () => {
  describe('constructor from a single 512-bit value', () => {
    test('should split x into the upper 256 bits and y into the lower ones', () => {
      const point = new CairoSecp256k1Point(G);
      expect(point.xLow).toBe(G_X_LOW);
      expect(point.xHigh).toBe(G_X_HIGH);
      expect(point.yLow).toBe(G_Y_LOW);
      expect(point.yHigh).toBe(G_Y_HIGH);
    });

    test('should split each coordinate into its two limbs', () => {
      const point = new CairoSecp256k1Point(PUB_KEY);
      expect(point.xLow).toBe(0x5cceb2c16f198f4c14b328aa571331e6n);
      expect(point.xHigh).toBe(0x8c7aea7d673a5858bdca128d124fb076n);
      expect(point.yLow).toBe(0x212f80be5048bff926ba791c17541c92n);
      expect(point.yHigh).toBe(0xf6c87f51d5224d73d118765cb19d7565n);
    });

    test('should accept a hexadecimal or decimal string', () => {
      expect(new CairoSecp256k1Point(`0x${G.toString(16)}`).toBigInt()).toBe(G);
      expect(new CairoSecp256k1Point(G.toString(10)).toBigInt()).toBe(G);
    });

    test('should carry a full-width key unchanged', () => {
      expect(new CairoSecp256k1Point(PUB_KEY).toBigInt()).toBe(PUB_KEY);
    });
  });

  describe('constructor from the four limbs', () => {
    test('should keep the limbs in the order a call carries them', () => {
      const point = new CairoSecp256k1Point(G_X_LOW, G_X_HIGH, G_Y_LOW, G_Y_HIGH);
      expect(point.xLow).toBe(G_X_LOW);
      expect(point.xHigh).toBe(G_X_HIGH);
      expect(point.yLow).toBe(G_Y_LOW);
      expect(point.yHigh).toBe(G_Y_HIGH);
    });

    test('should agree with the single-value form', () => {
      expect(new CairoSecp256k1Point(G_X_LOW, G_X_HIGH, G_Y_LOW, G_Y_HIGH).toBigInt()).toBe(G);
      expect(new CairoSecp256k1Point(0, 0, 0, 0).toBigInt()).toBe(0n);
    });
  });

  describe('constructor from a Secp256k1PointStruct', () => {
    test('should read the four named limbs', () => {
      const point = new CairoSecp256k1Point({
        xLow: G_X_LOW,
        xHigh: G_X_HIGH,
        yLow: G_Y_LOW,
        yHigh: G_Y_HIGH,
      });
      expect(point.xLow).toBe(G_X_LOW);
      expect(point.xHigh).toBe(G_X_HIGH);
      expect(point.yLow).toBe(G_Y_LOW);
      expect(point.yHigh).toBe(G_Y_HIGH);
    });

    test('should accept hexadecimal limbs', () => {
      const point = new CairoSecp256k1Point({
        xLow: '0x29bfcdb2dce28d959f2815b16f81798',
        xHigh: '0x79be667ef9dcbbac55a06295ce870b07',
        yLow: '0xfd17b448a68554199c47d08ffb10d4b8',
        yHigh: '0x483ada7726a3c4655da4fbfc0e1108a8',
      });
      expect(point.toBigInt()).toBe(G);
    });

    test('should refuse an object that is not one, reading it as a value instead', () => {
      expect(() => new CairoSecp256k1Point({ xLow: 1 } as any)).toThrow(
        'Unsupported input for Secp256k1Point'
      );
      expect(() => new CairoSecp256k1Point({})).toThrow('Unsupported input for Secp256k1Point');
    });
  });

  describe('range', () => {
    test('should accept the smallest value, which is (0, 0), the point at infinity', () => {
      expect(new CairoSecp256k1Point(SECP256K1_POINT_MIN).toBigInt()).toBe(0n);
    });

    test('should refuse the largest 512-bit value, since its x is not smaller than p', () => {
      expect(() => new CairoSecp256k1Point(SECP256K1_POINT_MAX)).toThrow(X_NOT_BELOW_P);
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
        'Invalid input: a Secp256k1Point cannot be built from text'
      );
      expect(() => new CairoSecp256k1Point([])).toThrow('Unsupported input for Secp256k1Point');
    });

    test('should reject a signed numeric string, which reads as text', () => {
      // a minus sign makes a number of a string for the signed integers only : for every other
      // type, a point included, '-1' is text
      expect(() => new CairoSecp256k1Point('-1')).toThrow(
        'Invalid input: a Secp256k1Point cannot be built from text'
      );
    });

    test("should reject '0x', which holds no digit", () => {
      expect(() => new CairoSecp256k1Point('0x')).toThrow(
        "Invalid input: '0x' holds no hexadecimal digit"
      );
    });

    test('should reject a decimal number', () => {
      expect(() => new CairoSecp256k1Point(1.5)).toThrow(
        'Invalid input: decimal numbers are not supported, only integers'
      );
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
      expect(
        CairoSecp256k1Point.validateProps(
          '0x29bfcdb2dce28d959f2815b16f81798',
          '0x79be667ef9dcbbac55a06295ce870b07',
          '0xfd17b448a68554199c47d08ffb10d4b8',
          '0x483ada7726a3c4655da4fbfc0e1108a8'
        )
      ).toEqual({
        xLow: G_X_LOW,
        xHigh: G_X_HIGH,
        yLow: G_Y_LOW,
        yHigh: G_Y_HIGH,
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

    test('should name the limb that is not a whole number', () => {
      expect(() => CairoSecp256k1Point.validateProps(1.5, 2, 3, 4)).toThrow(
        'xLow must be an integer'
      );
      expect(() => new CairoSecp256k1Point(0, 0, 0, 1.5)).toThrow('yHigh must be an integer');
      expect(() => CairoSecp256k1Point.validateProps('abc', 2, 3, 4)).toThrow(
        'xLow cannot be built from text'
      );
      // '-1' is text here, as for every type but the signed integers
      expect(() => CairoSecp256k1Point.validateProps('-1', 2, 3, 4)).toThrow(
        'xLow cannot be built from text'
      );
      expect(() => CairoSecp256k1Point.validateProps('0x', 2, 3, 4)).toThrow(
        "xLow cannot be '0x', which holds no hexadecimal digit"
      );
      expect(() => CairoSecp256k1Point.validateProps({} as any, 2, 3, 4)).toThrow(
        'xLow must be a BigNumberish'
      );
    });
  });

  describe('validate static method', () => {
    test('should return the checked value', () => {
      expect(CairoSecp256k1Point.validate(`0x${G.toString(16)}`)).toBe(G);
      expect(CairoSecp256k1Point.validate(0n)).toBe(0n);
    });

    test('should throw outside the range', () => {
      expect(() => CairoSecp256k1Point.validate(SECP256K1_POINT_MAX + 1n)).toThrow(
        'input is bigger than SECP256K1_POINT_MAX'
      );
    });
  });

  describe('is static method', () => {
    test('should return true for a point on the curve, and for (0, 0)', () => {
      expect(CairoSecp256k1Point.is(0)).toBe(true);
      expect(CairoSecp256k1Point.is(G)).toBe(true);
      expect(CairoSecp256k1Point.is(PUB_KEY)).toBe(true);
    });

    test('should return false for anything this class refuses', () => {
      expect(CairoSecp256k1Point.is(1n)).toBe(false);
      expect(CairoSecp256k1Point.is(SECP256K1_POINT_MAX)).toBe(false);
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
      expect([...new CairoSecp256k1Point(G).toApiRequest()]).toEqual([
        '3468390537006497937951914270391801752',
        '161825202758953104525843685720298294023',
        '336417762351022071123394393598455764152',
        '96009999919712310848645357523629574312',
      ]);
      expect([...new CairoSecp256k1Point(0n).toApiRequest()]).toEqual(['0', '0', '0', '0']);
    });

    test('should flag the result as compiled', () => {
      const request = new CairoSecp256k1Point(G).toApiRequest();
      expect(request).toHaveProperty('__compiled__', true);
      expect(Object.keys(request)).toEqual(['0', '1', '2', '3']);
    });
  });

  describe('toStruct and toHexString methods', () => {
    test('should return the limbs as unpadded hexadecimal strings', () => {
      expect(new CairoSecp256k1Point(G).toStruct()).toEqual({
        xLow: '0x29bfcdb2dce28d959f2815b16f81798',
        xHigh: '0x79be667ef9dcbbac55a06295ce870b07',
        yLow: '0xfd17b448a68554199c47d08ffb10d4b8',
        yHigh: '0x483ada7726a3c4655da4fbfc0e1108a8',
      });
    });

    test('should return the whole point as one hexadecimal string', () => {
      expect(new CairoSecp256k1Point(G).toHexString()).toBe(
        '0x79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8'
      );
      expect(new CairoSecp256k1Point(0n).toHexString()).toBe('0x0');
    });
  });

  describe('fromHex static method', () => {
    test('should left-pad a short string to 128 hex digits', () => {
      // 65 hex digits : x = 1, then the 64 digits of y
      const point = CairoSecp256k1Point.fromHex(`0x1${Y_OF_X_1.toString(16).padStart(64, '0')}`);
      expect(point.xLow).toBe(1n);
      expect(point.xHigh).toBe(0n);
      expect(point.toBigInt()).toBe(2n ** 256n + Y_OF_X_1);
      expect(CairoSecp256k1Point.fromHex('0x').toBigInt()).toBe(0n);
    });

    test('should read a full-width key', () => {
      expect(CairoSecp256k1Point.fromHex(`0x${PUB_KEY.toString(16)}`).toBigInt()).toBe(PUB_KEY);
    });

    test('should agree with the single-value constructor', () => {
      expect(CairoSecp256k1Point.fromHex(`0x${G.toString(16)}`).toBigInt()).toBe(
        new CairoSecp256k1Point(G).toBigInt()
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

    test('should read a point that is not on the curve as it comes, since a response is not checked', () => {
      // (1, 1), which the constructor refuses
      const point = CairoSecp256k1Point.factoryFromApiResponse(
        ['0x1', '0x0', '0x1', '0x0'].values()
      );
      expect(point).toBeInstanceOf(CairoSecp256k1Point);
      expect(point.toBigInt()).toBe(2n ** 256n + 1n);
    });

    test('should still refuse a felt wider than 128 bits', () => {
      expect(() =>
        CairoSecp256k1Point.factoryFromApiResponse(
          [`0x${(2n ** 128n).toString(16)}`, '0x0', '0x0', '0x0'].values()
        )
      ).toThrow('xLow must fit in 128 bits');
    });
  });

  describe('round-trip consistency', () => {
    test('should survive a serialize then read back cycle', () => {
      [0n, G, PUB_KEY].forEach((value) => {
        const felts = [...new CairoSecp256k1Point(value).toApiRequest()];
        expect(felts).toHaveLength(4);
        expect(CairoSecp256k1Point.factoryFromApiResponse(felts.values()).toBigInt()).toBe(value);
      });
    });
  });

  describe('the curve check', () => {
    test('should accept (0, 0), the point at infinity, in every form', () => {
      expect(new CairoSecp256k1Point(0n).toBigInt()).toBe(0n);
      expect(new CairoSecp256k1Point(0, 0, 0, 0).toBigInt()).toBe(0n);
      expect(new CairoSecp256k1Point({ xLow: 0, xHigh: 0, yLow: 0, yHigh: 0 }).toBigInt()).toBe(0n);
      expect(CairoSecp256k1Point.fromHex('0x0').toBigInt()).toBe(0n);
    });

    test('should refuse a point that is not on the curve, in every form', () => {
      // (1, 1) : 1^2 is not 1^3 + 7
      expect(() => new CairoSecp256k1Point(2n ** 256n + 1n)).toThrow(NOT_ON_CURVE);
      expect(() => new CairoSecp256k1Point(1, 0, 1, 0)).toThrow(NOT_ON_CURVE);
      expect(() => new CairoSecp256k1Point({ xLow: 1, xHigh: 0, yLow: 1, yHigh: 0 })).toThrow(
        NOT_ON_CURVE
      );
      expect(() => CairoSecp256k1Point.fromHex(`0x1${'1'.padStart(64, '0')}`)).toThrow(
        NOT_ON_CURVE
      );
      expect(() => CairoSecp256k1Point.validate(2n ** 256n + 1n)).toThrow(NOT_ON_CURVE);
      expect(() => CairoSecp256k1Point.validateProps(1, 0, 1, 0)).toThrow(NOT_ON_CURVE);
      expect(CairoSecp256k1Point.is(2n ** 256n + 1n)).toBe(false);
    });

    test('should refuse an x that is right modulo p but not smaller than p', () => {
      expect(new CairoSecp256k1Point(2n ** 256n + Y_OF_X_1).toBigInt()).toBe(2n ** 256n + Y_OF_X_1);
      expect(() => new CairoSecp256k1Point((1n + P) * 2n ** 256n + Y_OF_X_1)).toThrow(
        X_NOT_BELOW_P
      );
    });

    test('should refuse a y that is right modulo p but not smaller than p', () => {
      expect(new CairoSecp256k1Point(X_OF_Y_1 * 2n ** 256n + 1n).toBigInt()).toBe(
        X_OF_Y_1 * 2n ** 256n + 1n
      );
      expect(() => new CairoSecp256k1Point(X_OF_Y_1 * 2n ** 256n + 1n + P)).toThrow(Y_NOT_BELOW_P);
    });
  });
});
