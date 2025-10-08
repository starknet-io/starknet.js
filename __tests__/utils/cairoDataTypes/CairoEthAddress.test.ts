import { ETH_ADDRESS } from '../../../src';
import { RANGE_ETH_ADDRESS } from '../../../src/global/constants';
import { CairoEthAddress } from '../../../src/utils/cairoDataTypes';

describe('CairoEthAddress class Unit Tests', () => {
  describe('constructor with different input types', () => {
    test('should handle number input', () => {
      const ethAddr = new CairoEthAddress(42);
      expect(ethAddr.data).toBe(42n);
    });

    test('should handle bigint input', () => {
      const ethAddr = new CairoEthAddress(123n);
      expect(ethAddr.data).toBe(123n);
    });

    test('should handle zero values', () => {
      const ethAddrFromNumber = new CairoEthAddress(0);
      const ethAddrFromBigint = new CairoEthAddress(0n);

      expect(ethAddrFromNumber.data).toBe(0n);
      expect(ethAddrFromBigint.data).toBe(0n);
    });

    test('should handle maximum ethAddr value', () => {
      const maxethAddr = RANGE_ETH_ADDRESS.max;
      const ethAddr = new CairoEthAddress(maxethAddr);
      expect(ethAddr.data).toBe(maxethAddr);
    });

    test('should convert number to bigint internally', () => {
      const ethAddr = new CairoEthAddress(200);
      expect(typeof ethAddr.data).toBe('bigint');
      expect(ethAddr.data).toBe(200n);
    });
  });

  describe('validation', () => {
    test('should accept valid ethAddr values', () => {
      expect(() => new CairoEthAddress(0)).not.toThrow();
      expect(() => new CairoEthAddress(128)).not.toThrow();
      expect(() => new CairoEthAddress(255)).not.toThrow();
      expect(() => new CairoEthAddress('100')).not.toThrow();
      expect(() => new CairoEthAddress(100n)).not.toThrow();
    });

    test('should reject negative values', () => {
      expect(() => new CairoEthAddress(-1)).toThrow(
        'Validate: EthAddress arg should be in range [0, 2^160-1]'
      );
      expect(() => new CairoEthAddress(-100n)).toThrow(
        'Validate: EthAddress arg should be in range [0, 2^160-1]'
      );
      expect(() => new CairoEthAddress('-1')).toThrow(
        'Validate: EthAddress arg should be in range [0, 2^160-1]'
      );
    });

    test('should reject values greater than 255', () => {
      expect(() => new CairoEthAddress(RANGE_ETH_ADDRESS.max + 1n)).toThrow(
        'Validate: EthAddress arg should be in range [0, 2^160-1]'
      );
      expect(
        () => new CairoEthAddress('99999999999999999999999999999999999999999999999999999999999999')
      ).toThrow('Validate: EthAddress arg should be in range [0, 2^160-1]');
    });

    test('should handle valid string inputs correctly', () => {
      const ethAddrFromDecString = new CairoEthAddress('200');
      const ethAddrFromHexString = new CairoEthAddress('0xff');

      expect(ethAddrFromDecString.data).toBe(200n);
      expect(ethAddrFromHexString.data).toBe(255n);
    });

    test('should handle edge cases and invalid inputs', () => {
      expect(() => CairoEthAddress.validate(null as any)).toThrow(
        'Invalid input: null or undefined'
      );
      expect(() => CairoEthAddress.validate(undefined as any)).toThrow(
        'Invalid input: null or undefined'
      );
      expect(() => CairoEthAddress.validate({} as any)).toThrow(
        'Invalid input: objects are not supported'
      );
      expect(() => CairoEthAddress.validate([] as any)).toThrow(
        'Invalid input: objects are not supported'
      );
    });

    test('should handle unknown data types properly', () => {
      // Valid unknown data types that can be converted
      expect(() => new CairoEthAddress('100' as unknown)).not.toThrow();
      expect(() => new CairoEthAddress(100 as unknown)).not.toThrow();
      expect(() => new CairoEthAddress(100n as unknown)).not.toThrow();
      expect(() => new CairoEthAddress(true as unknown)).not.toThrow();
      expect(() => new CairoEthAddress(false as unknown)).not.toThrow();

      // Invalid unknown data types
      expect(() => new CairoEthAddress({} as unknown)).toThrow(
        'Invalid input: objects are not supported'
      );
      expect(() => new CairoEthAddress([] as unknown)).toThrow(
        'Invalid input: objects are not supported'
      );
      expect(() => new CairoEthAddress(null as unknown)).toThrow(
        'Invalid input: null or undefined'
      );
      expect(() => new CairoEthAddress(undefined as unknown)).toThrow(
        'Invalid input: null or undefined'
      );
      expect(() => new CairoEthAddress(Symbol('test') as unknown)).toThrow();

      // Out of range values as unknown
      expect(() => new CairoEthAddress((2n ** 161n) as unknown)).toThrow(
        'Validate: EthAddress arg should be in range [0, 2^160-1]'
      );
      expect(() => new CairoEthAddress(-1 as unknown)).toThrow(
        'Validate: EthAddress arg should be in range [0, 2^160-1]'
      );
    });

    test('should reject decimal numbers', () => {
      expect(() => new CairoEthAddress(42.5)).toThrow(
        'Invalid input: decimal numbers are not supported, only integers'
      );
      expect(() => new CairoEthAddress(1.1)).toThrow(
        'Invalid input: decimal numbers are not supported, only integers'
      );
    });

    test('should validate string inputs with out-of-range values', () => {
      expect(() => new CairoEthAddress((2n ** 162n).toString(10))).toThrow(
        'Validate: EthAddress arg should be in range [0, 2^160-1]'
      );
      expect(() => new CairoEthAddress('0xfffffffffffffffffffffffffffffffffffffffffff')).toThrow(
        'Validate: EthAddress arg should be in range [0, 2^160-1]'
      );
    });
  });

  describe('toBigInt method', () => {
    test('should return the stored bigint value', () => {
      const values = [0, 1, 100, 200, 255];
      values.forEach((val) => {
        const ethAddr = new CairoEthAddress(val);
        expect(ethAddr.toBigInt()).toBe(BigInt(val));
      });
    });

    test('should handle zero', () => {
      const ethAddr = new CairoEthAddress(0);
      expect(ethAddr.toBigInt()).toBe(0n);
    });

    test('should handle maximum ethAddr value', () => {
      const ethAddr = new CairoEthAddress(255);
      expect(ethAddr.toBigInt()).toBe(255n);
    });

    test('should handle large values', () => {
      const ethAddr = new CairoEthAddress(200);
      expect(ethAddr.toBigInt()).toBe(200n);
    });
  });

  describe('toHexString method', () => {
    test('should convert zero to hex', () => {
      const ethAddr = new CairoEthAddress(0);
      expect(ethAddr.toHexString()).toBe('0x0');
    });

    test('should convert maximum ethAddr value to hex', () => {
      const ethAddr = new CairoEthAddress(RANGE_ETH_ADDRESS.max);
      expect(ethAddr.toHexString()).toBe('0xffffffffffffffffffffffffffffffffffffffff');
    });

    test('should handle bigint input', () => {
      const ethAddr = new CairoEthAddress(170n);
      expect(ethAddr.toHexString()).toBe('0xaa');
    });
  });

  describe('toApiRequest method', () => {
    test('should return hex string array for zero', () => {
      const ethAddr = new CairoEthAddress(0);
      const result = ethAddr.toApiRequest();
      expect(result).toEqual(['0']);
      expect(result).toHaveProperty('__compiled__', true);
    });

    test('should handle bigint input', () => {
      const ethAddr = new CairoEthAddress(128n);
      const result = ethAddr.toApiRequest();
      expect(result).toEqual(['128']);
      expect(result).toHaveProperty('__compiled__', true);
    });
  });

  describe('validate static method', () => {
    test('should validate correct number inputs', () => {
      expect(() => CairoEthAddress.validate(0)).not.toThrow();
      expect(() => CairoEthAddress.validate(255)).not.toThrow();
    });

    test('should validate correct bigint inputs', () => {
      expect(() => CairoEthAddress.validate(0n)).not.toThrow();
      expect(() => CairoEthAddress.validate(255n)).not.toThrow();
    });

    test('should reject invalid types', () => {
      expect(() => CairoEthAddress.validate(null as any)).toThrow(
        'Invalid input: null or undefined'
      );
      expect(() => CairoEthAddress.validate(undefined as any)).toThrow(
        'Invalid input: null or undefined'
      );
      expect(() => CairoEthAddress.validate({} as any)).toThrow(
        'Invalid input: objects are not supported'
      );
      expect(() => CairoEthAddress.validate([] as any)).toThrow(
        'Invalid input: objects are not supported'
      );
    });

    test('should reject negative values', () => {
      expect(() => CairoEthAddress.validate(-1)).toThrow(
        'Validate: EthAddress arg should be in range [0, 2^160-1]'
      );
      expect(() => CairoEthAddress.validate(-100n)).toThrow(
        'Validate: EthAddress arg should be in range [0, 2^160-1]'
      );
    });

    test('should reject values exceeding ethAddr range', () => {
      expect(() => CairoEthAddress.validate(RANGE_ETH_ADDRESS.max + 1n)).toThrow(
        'Validate: EthAddress arg should be in range [0, 2^160-1]'
      );
    });

    test('should reject decimal numbers', () => {
      expect(() => CairoEthAddress.validate(42.5)).toThrow(
        'Invalid input: decimal numbers are not supported, only integers'
      );
    });
  });

  describe('is static method', () => {
    test('should return true for valid inputs', () => {
      expect(CairoEthAddress.is(0)).toBe(true);
      expect(CairoEthAddress.is(128)).toBe(true);
      expect(CairoEthAddress.is(100n)).toBe(true);
      expect(CairoEthAddress.is('200')).toBe(true);
    });

    test('should return false for invalid inputs', () => {
      expect(CairoEthAddress.is(-1)).toBe(false);
      expect(CairoEthAddress.is(RANGE_ETH_ADDRESS.max + 1n)).toBe(false);
      expect(CairoEthAddress.is(null as any)).toBe(false);
      expect(CairoEthAddress.is(undefined as any)).toBe(false);
      expect(CairoEthAddress.is({} as any)).toBe(false);
      expect(CairoEthAddress.is(42.5)).toBe(false);
    });

    test('should handle unknown data types in is method', () => {
      // Valid unknown types
      expect(CairoEthAddress.is(100 as unknown)).toBe(true);
      expect(CairoEthAddress.is('200' as unknown)).toBe(true);
      expect(CairoEthAddress.is(true as unknown)).toBe(true);
      expect(CairoEthAddress.is(false as unknown)).toBe(true);

      // Invalid unknown types
      expect(CairoEthAddress.is({} as unknown)).toBe(false);
      expect(CairoEthAddress.is([] as unknown)).toBe(false);
      expect(CairoEthAddress.is(null as unknown)).toBe(false);
      expect(CairoEthAddress.is(undefined as unknown)).toBe(false);
      expect(CairoEthAddress.is(Symbol('test') as unknown)).toBe(false);
      expect(CairoEthAddress.is((RANGE_ETH_ADDRESS.max + 1n) as unknown)).toBe(false); // out of range
      expect(CairoEthAddress.is(-1 as unknown)).toBe(false); // out of range
    });
  });

  describe('isAbiType static method', () => {
    test('should identify correct ABI type', () => {
      expect(CairoEthAddress.isAbiType(ETH_ADDRESS)).toBe(true);
      expect(CairoEthAddress.isAbiType('core::integer::u16')).toBe(false);
      expect(CairoEthAddress.isAbiType('core::integer::u32')).toBe(false);
      expect(CairoEthAddress.isAbiType('felt252')).toBe(false);
    });
  });

  describe('edge cases and consistency checks', () => {
    test('should handle boundary values correctly', () => {
      const minethAddr = new CairoEthAddress(0);
      const maxethAddr = new CairoEthAddress(RANGE_ETH_ADDRESS.max);

      expect(minethAddr.data).toBe(0n);
      expect(maxethAddr.data).toBe(RANGE_ETH_ADDRESS.max);
      expect(minethAddr.toBigInt()).toBe(0n);
      expect(maxethAddr.toBigInt()).toBe(RANGE_ETH_ADDRESS.max);
    });

    test('should maintain consistency across methods', () => {
      const values = [0, 1, 100, 200, 255];
      values.forEach((val) => {
        const ethAddr = new CairoEthAddress(val);
        const bigintVal = ethAddr.toBigInt();
        const apiRequest = ethAddr.toApiRequest();

        expect(bigintVal).toBe(BigInt(val));
        expect(apiRequest[0]).toBe(val.toString(10));
      });
    });

    test('should handle number and bigint inputs consistently', () => {
      const testValues = [0, 50, 100, 200, 255];
      testValues.forEach((val) => {
        const ethAddrFromNumber = new CairoEthAddress(val);
        const ethAddrFromBigint = new CairoEthAddress(BigInt(val));

        expect(ethAddrFromNumber.data).toBe(ethAddrFromBigint.data);
        expect(ethAddrFromNumber.toBigInt()).toBe(ethAddrFromBigint.toBigInt());
        expect(ethAddrFromNumber.toHexString()).toBe(ethAddrFromBigint.toHexString());
      });
    });

    test('should preserve exact values without precision loss', () => {
      const ethAddr = new CairoEthAddress(255);
      expect(ethAddr.toBigInt()).toBe(255n);
      expect(Number(ethAddr.toBigInt())).toBe(255);
    });
  });

  describe('String handling', () => {
    describe('Hex strings', () => {
      test('should handle hex strings with 0x prefix', () => {
        const ethAddr = new CairoEthAddress('0xff');
        expect(ethAddr.data).toBe(255n);
      });
    });

    describe('Decimal strings', () => {
      test('should handle decimal strings', () => {
        const ethAddr = new CairoEthAddress('200');
        expect(ethAddr.data).toBe(200n);
      });

      test('should handle zero as decimal string', () => {
        const ethAddr = new CairoEthAddress('0');
        expect(ethAddr.data).toBe(0n);
      });

      test('should handle max ethAddr as decimal string', () => {
        const ethAddr = new CairoEthAddress('255');
        expect(ethAddr.data).toBe(255n);
      });
    });
  });

  describe('Static methods', () => {
    describe('validate method', () => {
      test('should validate valid ethAddr range', () => {
        expect(() => CairoEthAddress.validate(0)).not.toThrow();
        expect(() => CairoEthAddress.validate(255)).not.toThrow();
        expect(() => CairoEthAddress.validate(128)).not.toThrow();
      });

      test('should reject out-of-range values', () => {
        expect(() => CairoEthAddress.validate(-1)).toThrow();
        expect(() => CairoEthAddress.validate(RANGE_ETH_ADDRESS.max + 1n)).toThrow();
      });
    });

    describe('is method', () => {
      test('should return true for valid values', () => {
        expect(CairoEthAddress.is(0)).toBe(true);
        expect(CairoEthAddress.is(255)).toBe(true);
        expect(CairoEthAddress.is('128')).toBe(true);
      });

      test('should return false for invalid values', () => {
        expect(CairoEthAddress.is(-1)).toBe(false);
        expect(CairoEthAddress.is(RANGE_ETH_ADDRESS.max + 1n)).toBe(false);
        expect(CairoEthAddress.is(null as any)).toBe(false);
      });
    });

    describe('isAbiType method', () => {
      test('should return true for correct ABI selector', () => {
        expect(CairoEthAddress.isAbiType(ETH_ADDRESS)).toBe(true);
      });

      test('should return false for incorrect ABI selector', () => {
        expect(CairoEthAddress.isAbiType('core::integer::u16')).toBe(false);
        expect(CairoEthAddress.isAbiType('felt252')).toBe(false);
      });
    });

    describe('factoryFromApiResponse method', () => {
      test('should create CairoEthAddress from API response iterator', () => {
        const mockIterator = {
          next: jest.fn().mockReturnValue({ value: '0x42', done: false }),
        };
        const ethAddr = CairoEthAddress.factoryFromApiResponse(mockIterator as any);
        expect(ethAddr.data).toBe(0x42n);
      });

      test('should handle hex string from API response', () => {
        const mockIterator = {
          next: jest.fn().mockReturnValue({ value: '0xff', done: false }),
        };
        const ethAddr = CairoEthAddress.factoryFromApiResponse(mockIterator as any);
        expect(ethAddr.data).toBe(255n);
      });

      test('should handle max ethAddr value from API response', () => {
        const mockIterator = {
          next: jest.fn().mockReturnValue({ value: '255', done: false }),
        };
        const ethAddr = CairoEthAddress.factoryFromApiResponse(mockIterator as any);
        expect(ethAddr.data).toBe(255n);
      });
    });
  });

  describe('Round-trip consistency', () => {
    test('should maintain consistency between constructor types', () => {
      const testValue = 200;
      const ethAddrFromNumber = new CairoEthAddress(testValue);
      const ethAddrFromBigint = new CairoEthAddress(BigInt(testValue));
      const ethAddrFromString = new CairoEthAddress(testValue.toString());

      expect(ethAddrFromNumber.toBigInt()).toBe(ethAddrFromBigint.toBigInt());
      expect(ethAddrFromNumber.toBigInt()).toBe(ethAddrFromString.toBigInt());
      expect(ethAddrFromBigint.toBigInt()).toBe(ethAddrFromString.toBigInt());
    });

    test('should handle string-to-bigint-to-string round trips', () => {
      const originalValue = 200;
      const ethAddr = new CairoEthAddress(originalValue);
      const bigintValue = ethAddr.toBigInt();
      const newethAddr = new CairoEthAddress(bigintValue);

      expect(newethAddr.toBigInt()).toBe(BigInt(originalValue));
      expect(newethAddr.data).toBe(ethAddr.data);
    });
  });
});
