import {
  CairoClassHash,
  CairoContractAddress,
  Literal,
  cairoTypeStrategy,
  validateAndParseAddress,
} from '../../../src';
import { ADDR_BOUND, PRIME, RANGE_CLASS_HASH } from '../../../src/global/constants';

// The two classes differ by their bound only, and both are narrower than the field. A contract
// address stops below ADDR_BOUND (2^251 - 256), the bound of the protocol, while a class hash
// stops below 2^251, the bound of the Cairo ClassHash type.

describe('CairoContractAddress', () => {
  describe('accepted inputs', () => {
    test('should read a number, a decimal string and a hex string as the same address', () => {
      expect(new CairoContractAddress(4660).toBigInt()).toBe(4660n);
      expect(new CairoContractAddress('4660').toBigInt()).toBe(4660n);
      expect(new CairoContractAddress('0x1234').toBigInt()).toBe(4660n);
    });

    test('should accept a value up to ADDR_BOUND - 1', () => {
      expect(new CairoContractAddress(ADDR_BOUND - 1n).toBigInt()).toBe(ADDR_BOUND - 1n);
    });
  });

  describe('refused inputs', () => {
    test('should refuse ADDR_BOUND and above, although the field goes further', () => {
      expect(() => new CairoContractAddress(ADDR_BOUND)).toThrow(
        'Value is out of ContractAddress range'
      );
      expect(() => new CairoContractAddress(PRIME - 1n)).toThrow(
        'Value is out of ContractAddress range'
      );
    });

    test('should refuse a negative number as out of range', () => {
      expect(() => new CairoContractAddress(-1)).toThrow('Value is out of ContractAddress range');
      expect(() => new CairoContractAddress(-1n)).toThrow('Value is out of ContractAddress range');
    });

    test('should refuse a decimal number', () => {
      expect(() => new CairoContractAddress(1.5)).toThrow(
        'Invalid input: decimal numbers are not supported, only integers'
      );
    });

    test("should refuse '0x', rather than read an empty value as the zero address", () => {
      expect(() => new CairoContractAddress('0x')).toThrow(
        "Invalid input: '0x' holds no hexadecimal digit"
      );
    });

    test('should refuse text', () => {
      expect(() => new CairoContractAddress('abc')).toThrow(
        'Invalid input: a ContractAddress cannot be built from text'
      );
    });

    test('should refuse a signed numeric string, which is text for an address', () => {
      // a minus sign makes a number of a string for the signed integers only
      expect(() => new CairoContractAddress('-1')).toThrow(
        'Invalid input: a ContractAddress cannot be built from text'
      );
    });

    test('should refuse null and objects', () => {
      expect(() => new CairoContractAddress(null)).toThrow('null value is not allowed for felt252');
      expect(() => new CairoContractAddress({})).toThrow(
        "Unsupported data type 'object' for felt252"
      );
    });
  });

  describe('is', () => {
    test('should answer false wherever the constructor throws', () => {
      expect(CairoContractAddress.is('0x1234')).toBe(true);
      expect(CairoContractAddress.is(ADDR_BOUND)).toBe(false);
      expect(CairoContractAddress.is(-1)).toBe(false);
      expect(CairoContractAddress.is(1.5)).toBe(false);
      expect(CairoContractAddress.is('abc')).toBe(false);
      expect(CairoContractAddress.is(null)).toBe(false);
    });

    test('should draw the bound where validateAndParseAddress draws it', () => {
      // validateAndParseAddress reads the 64-digit form a node writes
      const fromNode = (value: bigint) => `0x${value.toString(16).padStart(64, '0')}`;

      expect(CairoContractAddress.is(ADDR_BOUND - 1n)).toBe(true);
      expect(() => validateAndParseAddress(fromNode(ADDR_BOUND - 1n))).not.toThrow();

      expect(CairoContractAddress.is(ADDR_BOUND)).toBe(false);
      expect(() => validateAndParseAddress(fromNode(ADDR_BOUND))).toThrow();

      expect(CairoContractAddress.is(2n ** 251n)).toBe(false);
      expect(() => validateAndParseAddress(fromNode(2n ** 251n))).toThrow();
    });
  });

  describe('serialization and reading back', () => {
    test('should answer to its own abi type only', () => {
      expect(CairoContractAddress.abiSelector).toBe(Literal.ContractAddress);
      expect(CairoContractAddress.isAbiType(Literal.ContractAddress)).toBe(true);
      expect(CairoContractAddress.isAbiType('core::felt252')).toBe(false);
    });

    test('should serialize to one decimal-string felt, flagged as compiled', () => {
      const calldata = new CairoContractAddress('0x1234').toApiRequest();
      expect([...calldata]).toEqual(['4660']);
      expect(calldata).toHaveProperty('__compiled__', true);
    });

    test('should write its hexadecimal form without padding', () => {
      expect(new CairoContractAddress(4660).toHexString()).toBe('0x1234');
      expect(new CairoContractAddress('0x0034').toHexString()).toBe('0x34');
    });

    test('should read one felt off a response', () => {
      const response = ['0x1234'];
      const address = CairoContractAddress.factoryFromApiResponse(response.values());
      expect(address.toBigInt()).toBe(4660n);
    });

    test('should read back what it serialized', () => {
      const [felt] = new CairoContractAddress('0x1234').toApiRequest();
      const response = [`0x${BigInt(felt).toString(16)}`]; // a node answers in hexadecimal
      const address = CairoContractAddress.factoryFromApiResponse(response.values());
      expect(address.toBigInt()).toBe(4660n);
    });

    test('should be registered in the default strategy, in both directions', () => {
      const build = cairoTypeStrategy.constructors[Literal.ContractAddress];
      const read = cairoTypeStrategy.response[Literal.ContractAddress];
      const built = build('0x1234', cairoTypeStrategy);
      expect([...built.toApiRequest()]).toEqual(['4660']);
      expect(read(built, cairoTypeStrategy)).toBe(4660n);
    });
  });
});

describe('CairoClassHash', () => {
  describe('accepted inputs', () => {
    test('should read a number, a decimal string and a hex string as the same hash', () => {
      expect(new CairoClassHash(4660).toBigInt()).toBe(4660n);
      expect(new CairoClassHash('4660').toBigInt()).toBe(4660n);
      expect(new CairoClassHash('0x1234').toBigInt()).toBe(4660n);
    });

    test('should accept a value up to 2^251 - 1, wider than an address may be', () => {
      expect(new CairoClassHash(ADDR_BOUND).toBigInt()).toBe(ADDR_BOUND);
      expect(new CairoClassHash(2n ** 251n - 1n).toBigInt()).toBe(2n ** 251n - 1n);
    });
  });

  describe('refused inputs', () => {
    const outOfRange = `Value is out of ClassHash range [${RANGE_CLASS_HASH.min}, ${RANGE_CLASS_HASH.max}]`;

    test('should refuse 2^251 and above, although the field goes further', () => {
      expect(() => new CairoClassHash(2n ** 251n)).toThrow(outOfRange);
      expect(() => new CairoClassHash(PRIME - 1n)).toThrow(outOfRange);
    });

    test('should refuse a negative number as out of range', () => {
      expect(() => new CairoClassHash(-1)).toThrow(outOfRange);
      expect(() => new CairoClassHash(-1n)).toThrow(outOfRange);
    });

    test('should refuse a decimal number', () => {
      expect(() => new CairoClassHash(1.5)).toThrow(
        'Invalid input: decimal numbers are not supported, only integers'
      );
    });

    test("should refuse '0x', rather than read an empty value as 0", () => {
      expect(() => new CairoClassHash('0x')).toThrow(
        "Invalid input: '0x' holds no hexadecimal digit"
      );
    });

    test('should refuse text', () => {
      expect(() => new CairoClassHash('abc')).toThrow(
        'Invalid input: a ClassHash cannot be built from text'
      );
    });

    test('should refuse a signed numeric string, which is text for a hash', () => {
      // a minus sign makes a number of a string for the signed integers only
      expect(() => new CairoClassHash('-1')).toThrow(
        'Invalid input: a ClassHash cannot be built from text'
      );
    });

    test('should refuse null and objects', () => {
      expect(() => new CairoClassHash(null)).toThrow('null value is not allowed for felt252');
      expect(() => new CairoClassHash({})).toThrow("Unsupported data type 'object' for felt252");
    });
  });

  describe('is', () => {
    test('should answer false wherever the constructor throws', () => {
      expect(CairoClassHash.is('0x1234')).toBe(true);
      expect(CairoClassHash.is(ADDR_BOUND)).toBe(true);
      expect(CairoClassHash.is(2n ** 251n - 1n)).toBe(true);
      expect(CairoClassHash.is(2n ** 251n)).toBe(false);
      expect(CairoClassHash.is(PRIME)).toBe(false);
      expect(CairoClassHash.is(-1)).toBe(false);
      expect(CairoClassHash.is(1.5)).toBe(false);
      expect(CairoClassHash.is('abc')).toBe(false);
      expect(CairoClassHash.is(null)).toBe(false);
    });
  });

  describe('serialization and reading back', () => {
    test('should answer to its own abi type only', () => {
      expect(CairoClassHash.abiSelector).toBe(Literal.ClassHash);
      expect(CairoClassHash.isAbiType(Literal.ClassHash)).toBe(true);
      expect(CairoClassHash.isAbiType('core::felt252')).toBe(false);
    });

    test('should serialize to one decimal-string felt, flagged as compiled', () => {
      const calldata = new CairoClassHash('0x1234').toApiRequest();
      expect([...calldata]).toEqual(['4660']);
      expect(calldata).toHaveProperty('__compiled__', true);
    });

    test('should write its hexadecimal form without padding', () => {
      expect(new CairoClassHash(4660).toHexString()).toBe('0x1234');
      expect(new CairoClassHash('0x0034').toHexString()).toBe('0x34');
    });

    test('should read one felt off a response', () => {
      const response = ['0x1234'];
      const hash = CairoClassHash.factoryFromApiResponse(response.values());
      expect(hash.toBigInt()).toBe(4660n);
    });

    test('should read back what it serialized', () => {
      const [felt] = new CairoClassHash('0x1234').toApiRequest();
      const response = [`0x${BigInt(felt).toString(16)}`]; // a node answers in hexadecimal
      const hash = CairoClassHash.factoryFromApiResponse(response.values());
      expect(hash.toBigInt()).toBe(4660n);
    });

    test('should be registered in the default strategy, in both directions', () => {
      const build = cairoTypeStrategy.constructors[Literal.ClassHash];
      const read = cairoTypeStrategy.response[Literal.ClassHash];
      const built = build('0x1234', cairoTypeStrategy);
      expect([...built.toApiRequest()]).toEqual(['4660']);
      expect(read(built, cairoTypeStrategy)).toBe(4660n);
    });
  });
});
