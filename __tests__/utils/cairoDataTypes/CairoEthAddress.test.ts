import { CairoEthAddress, ETH_ADDRESS } from '../../../src';
import { RANGE_ETH_ADDRESS } from '../../../src/global/constants';

// vitalik.eth, the canonical 40-hex-digit address
const REAL_ADDRESS = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045';

describe('CairoEthAddress class Unit Tests', () => {
  describe('constructor with different input types', () => {
    test('should handle number input', () => {
      expect(new CairoEthAddress(4660).data).toBe(4660n);
      expect(new CairoEthAddress(0).data).toBe(0n);
    });

    test('should handle bigint input', () => {
      expect(new CairoEthAddress(4660n).data).toBe(4660n);
      expect(new CairoEthAddress(0n).data).toBe(0n);
    });

    test('should handle hexadecimal string input', () => {
      expect(new CairoEthAddress('0x1234').data).toBe(4660n);
      expect(new CairoEthAddress('0x0').data).toBe(0n);
    });

    test('should handle decimal string input', () => {
      expect(new CairoEthAddress('4660').data).toBe(4660n);
    });

    test('should handle boolean input', () => {
      expect(new CairoEthAddress(true).data).toBe(1n);
      expect(new CairoEthAddress(false).data).toBe(0n);
    });

    test('should read the same address whatever the input shape', () => {
      const fromHex = new CairoEthAddress('0x1234').toBigInt();
      const fromDecimalString = new CairoEthAddress('4660').toBigInt();
      const fromNumber = new CairoEthAddress(4660).toBigInt();
      const fromBigint = new CairoEthAddress(4660n).toBigInt();

      expect(fromHex).toBe(4660n);
      expect(fromDecimalString).toBe(4660n);
      expect(fromNumber).toBe(4660n);
      expect(fromBigint).toBe(4660n);
    });

    test('should always store a bigint', () => {
      expect(typeof new CairoEthAddress(200).data).toBe('bigint');
    });

    test('should carry a real Ethereum address unchanged', () => {
      const address = new CairoEthAddress(REAL_ADDRESS);
      expect(address.toHexString()).toBe(REAL_ADDRESS.toLowerCase());
    });
  });

  describe('range', () => {
    test('should accept the whole 160-bit range', () => {
      expect(() => new CairoEthAddress(RANGE_ETH_ADDRESS.min)).not.toThrow();
      expect(() => new CairoEthAddress(RANGE_ETH_ADDRESS.max)).not.toThrow();
      expect(new CairoEthAddress(RANGE_ETH_ADDRESS.max).toBigInt()).toBe(RANGE_ETH_ADDRESS.max);
    });

    test('should reject a value one bit too wide', () => {
      expect(() => new CairoEthAddress(RANGE_ETH_ADDRESS.max + 1n)).toThrow(
        `Value is out of EthAddress range [${RANGE_ETH_ADDRESS.min}, ${RANGE_ETH_ADDRESS.max}]`
      );
      expect(() => new CairoEthAddress(2n ** 161n)).toThrow('Value is out of EthAddress range');
    });

    test('should reject an out-of-range decimal string', () => {
      expect(() => new CairoEthAddress((2n ** 162n).toString(10))).toThrow(
        'Value is out of EthAddress range'
      );
    });

    test('should reject a negative value', () => {
      // the message comes from the encoding layer rather than from this class
      expect(() => new CairoEthAddress(-1)).toThrow('Cannot convert negative bigint');
      expect(() => new CairoEthAddress(-1n)).toThrow('Cannot convert negative bigint');
    });
  });

  describe('text is not an address', () => {
    test('should reject free-form text', () => {
      expect(() => new CairoEthAddress('abc')).toThrow(
        'Invalid input: an EthAddress cannot be built from text'
      );
      expect(() => new CairoEthAddress('a')).toThrow(
        'Invalid input: an EthAddress cannot be built from text'
      );
      expect(() => new CairoEthAddress('')).toThrow(
        'Invalid input: an EthAddress cannot be built from text'
      );
    });

    test('should reject a malformed hexadecimal string, which reads as text', () => {
      expect(() => new CairoEthAddress('0xZZ')).toThrow(
        'Invalid input: an EthAddress cannot be built from text'
      );
    });

    test('should reject a signed numeric string, which also reads as text', () => {
      // '-1' is neither hexadecimal nor a whole number, so it is text as far as isText is concerned
      expect(() => new CairoEthAddress('-1')).toThrow(
        'Invalid input: an EthAddress cannot be built from text'
      );
    });
  });

  describe('inputs a felt252 does not read', () => {
    test('should reject null and undefined', () => {
      expect(() => new CairoEthAddress(null)).toThrow('null value is not allowed for felt252');
      expect(() => new CairoEthAddress(undefined)).toThrow(
        'undefined value is not allowed for felt252'
      );
    });

    test('should reject objects and arrays', () => {
      expect(() => new CairoEthAddress({})).toThrow("Unsupported data type 'object' for felt252");
      expect(() => new CairoEthAddress([])).toThrow("Unsupported data type 'object' for felt252");
    });

    test('should reject a symbol', () => {
      expect(() => new CairoEthAddress(Symbol('address'))).toThrow(
        "Unsupported data type 'symbol' for felt252"
      );
    });

    test('should reject a decimal number', () => {
      expect(() => new CairoEthAddress(42.5)).toThrow("42.5 can't be computed by felt()");
    });
  });

  describe('toBigInt method', () => {
    test('should return the stored value', () => {
      [0, 1, 4660, 255].forEach((val) => {
        expect(new CairoEthAddress(val).toBigInt()).toBe(BigInt(val));
      });
    });

    test('should return the maximum address', () => {
      expect(new CairoEthAddress(RANGE_ETH_ADDRESS.max).toBigInt()).toBe(RANGE_ETH_ADDRESS.max);
    });
  });

  describe('toHexString method', () => {
    test('should return an unpadded hexadecimal string', () => {
      expect(new CairoEthAddress(4660).toHexString()).toBe('0x1234');
      expect(new CairoEthAddress(0).toHexString()).toBe('0x0');
    });

    test('should drop leading zeros', () => {
      expect(new CairoEthAddress('0x0034').toHexString()).toBe('0x34');
    });
  });

  describe('toApiRequest method', () => {
    test('should return one decimal-string felt', () => {
      expect([...new CairoEthAddress('0x1234').toApiRequest()]).toEqual(['4660']);
      expect([...new CairoEthAddress(0).toApiRequest()]).toEqual(['0']);
    });

    test('should flag the result as compiled', () => {
      const request = new CairoEthAddress('0x1234').toApiRequest();
      expect(request).toHaveProperty('__compiled__', true);
      // the flag is not enumerable, so it does not show up as an element
      expect(Object.keys(request)).toEqual(['0']);
    });
  });

  describe('validate static method', () => {
    test('should pass for a value in range', () => {
      expect(() => CairoEthAddress.validate('0x1234')).not.toThrow();
      expect(() => CairoEthAddress.validate(RANGE_ETH_ADDRESS.max)).not.toThrow();
    });

    test('should throw for a value out of range', () => {
      expect(() => CairoEthAddress.validate(RANGE_ETH_ADDRESS.max + 1n)).toThrow(
        'Value is out of EthAddress range'
      );
    });

    test('should throw for text', () => {
      expect(() => CairoEthAddress.validate('abc')).toThrow(
        'Invalid input: an EthAddress cannot be built from text'
      );
    });
  });

  describe('is static method', () => {
    test('should return true for a valid address', () => {
      expect(CairoEthAddress.is('0x1234')).toBe(true);
      expect(CairoEthAddress.is(0)).toBe(true);
      expect(CairoEthAddress.is(RANGE_ETH_ADDRESS.max)).toBe(true);
      expect(CairoEthAddress.is(REAL_ADDRESS)).toBe(true);
    });

    test('should return false for anything this class refuses', () => {
      expect(CairoEthAddress.is('abc')).toBe(false);
      expect(CairoEthAddress.is(RANGE_ETH_ADDRESS.max + 1n)).toBe(false);
      expect(CairoEthAddress.is(-1)).toBe(false);
      expect(CairoEthAddress.is(42.5)).toBe(false);
      expect(CairoEthAddress.is(null)).toBe(false);
      expect(CairoEthAddress.is(undefined)).toBe(false);
      expect(CairoEthAddress.is({})).toBe(false);
      expect(CairoEthAddress.is([])).toBe(false);
    });
  });

  describe('isAbiType static method', () => {
    test('should recognise its own abi type', () => {
      expect(CairoEthAddress.abiSelector).toBe(ETH_ADDRESS);
      expect(CairoEthAddress.isAbiType(ETH_ADDRESS)).toBe(true);
      expect(CairoEthAddress.isAbiType('core::starknet::eth_address::EthAddress')).toBe(true);
    });

    test('should reject any other abi type', () => {
      expect(CairoEthAddress.isAbiType('core::felt252')).toBe(false);
      expect(CairoEthAddress.isAbiType('core::integer::u8')).toBe(false);
    });
  });

  describe('factoryFromApiResponse static method', () => {
    test('should read one address off a response', () => {
      const response = ['0x1234'];
      expect(CairoEthAddress.factoryFromApiResponse(response.values()).toBigInt()).toBe(4660n);
    });

    test('should consume exactly one felt per call', () => {
      const iterator = ['0x1', '0x2'].values();
      expect(CairoEthAddress.factoryFromApiResponse(iterator).toBigInt()).toBe(1n);
      expect(CairoEthAddress.factoryFromApiResponse(iterator).toBigInt()).toBe(2n);
    });

    test('should read a real address back', () => {
      const response = [REAL_ADDRESS];
      expect(CairoEthAddress.factoryFromApiResponse(response.values()).toHexString()).toBe(
        REAL_ADDRESS.toLowerCase()
      );
    });
  });

  describe('round-trip consistency', () => {
    test('should survive a serialize then read back cycle', () => {
      [0n, 1n, 4660n, RANGE_ETH_ADDRESS.max].forEach((value) => {
        const felts = [...new CairoEthAddress(value).toApiRequest()];
        expect(CairoEthAddress.factoryFromApiResponse(felts.values()).toBigInt()).toBe(value);
      });
    });
  });
});
