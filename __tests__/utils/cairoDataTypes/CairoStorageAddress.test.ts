import { CairoStorageAddress, CallData, cairoTypeStrategy } from '../../../src';
import { PRIME } from '../../../src/global/constants';
import namingSierra from '../../../__mocks__/starknetId/naming/naming.sierra.json';

// A storage address is a felt narrower than the field: the Cairo StorageAddress type holds
// [0, 2^251), the same range as a class hash.
const STORAGE_ADDRESS_TYPE = 'core::starknet::storage_access::StorageAddress';

describe('CairoStorageAddress', () => {
  describe('accepted inputs', () => {
    test('should read a number, a decimal string and a hex string as the same address', () => {
      expect(new CairoStorageAddress(4660).toBigInt()).toBe(4660n);
      expect(new CairoStorageAddress('4660').toBigInt()).toBe(4660n);
      expect(new CairoStorageAddress('0x1234').toBigInt()).toBe(4660n);
    });

    test('should accept a value up to 2^251 - 1', () => {
      expect(new CairoStorageAddress(2n ** 251n - 1n).toBigInt()).toBe(2n ** 251n - 1n);
    });
  });

  describe('refused inputs', () => {
    const outOfRange =
      'Value is out of StorageAddress range [0, 3618502788666131106986593281521497120414687020801267626233049500247285301247]';

    test('should refuse 2^251 and above, although the field goes further', () => {
      expect(() => new CairoStorageAddress(2n ** 251n)).toThrow(outOfRange);
      expect(() => new CairoStorageAddress(PRIME - 1n)).toThrow(outOfRange);
    });

    test('should refuse a negative number as out of range', () => {
      expect(() => new CairoStorageAddress(-1)).toThrow(outOfRange);
      expect(() => new CairoStorageAddress(-1n)).toThrow(outOfRange);
    });

    test('should refuse a decimal number', () => {
      expect(() => new CairoStorageAddress(1.5)).toThrow(
        'Invalid input: decimal numbers are not supported, only integers'
      );
    });

    test("should refuse '0x', rather than read an empty value as 0", () => {
      expect(() => new CairoStorageAddress('0x')).toThrow(
        "Invalid input: '0x' holds no hexadecimal digit"
      );
    });

    test('should refuse text', () => {
      expect(() => new CairoStorageAddress('abc')).toThrow(
        'Invalid input: a StorageAddress cannot be built from text'
      );
    });

    test('should refuse a signed numeric string, which is text for an address', () => {
      // a minus sign makes a number of a string for the signed integers only
      expect(() => new CairoStorageAddress('-1')).toThrow(
        'Invalid input: a StorageAddress cannot be built from text'
      );
    });

    test('should refuse null and objects', () => {
      expect(() => new CairoStorageAddress(null)).toThrow('null value is not allowed for felt252');
      expect(() => new CairoStorageAddress({})).toThrow(
        "Unsupported data type 'object' for felt252"
      );
    });
  });

  describe('is', () => {
    test('should answer false wherever the constructor throws', () => {
      expect(CairoStorageAddress.is('0x1234')).toBe(true);
      expect(CairoStorageAddress.is(2n ** 251n - 1n)).toBe(true);
      expect(CairoStorageAddress.is(2n ** 251n)).toBe(false);
      expect(CairoStorageAddress.is(PRIME)).toBe(false);
      expect(CairoStorageAddress.is(-1)).toBe(false);
      expect(CairoStorageAddress.is(1.5)).toBe(false);
      expect(CairoStorageAddress.is('abc')).toBe(false);
      expect(CairoStorageAddress.is(null)).toBe(false);
    });
  });

  describe('serialization and reading back', () => {
    test('should answer to its own abi type only', () => {
      expect(CairoStorageAddress.abiSelector).toBe(STORAGE_ADDRESS_TYPE);
      expect(CairoStorageAddress.isAbiType(STORAGE_ADDRESS_TYPE)).toBe(true);
      expect(CairoStorageAddress.isAbiType('core::felt252')).toBe(false);
    });

    test('should serialize to one decimal-string felt, flagged as compiled', () => {
      const calldata = new CairoStorageAddress('0x1234').toApiRequest();
      expect([...calldata]).toEqual(['4660']);
      expect(calldata).toHaveProperty('__compiled__', true);
    });

    test('should write its hexadecimal form without padding', () => {
      expect(new CairoStorageAddress(4660).toHexString()).toBe('0x1234');
      expect(new CairoStorageAddress('0x0034').toHexString()).toBe('0x34');
    });

    test('should read one felt off a response', () => {
      const response = ['0x1234'];
      const address = CairoStorageAddress.factoryFromApiResponse(response.values());
      expect(address.toBigInt()).toBe(4660n);
    });

    test('should read back what it serialized', () => {
      const [felt] = new CairoStorageAddress('0x1234').toApiRequest();
      const response = [`0x${BigInt(felt).toString(16)}`]; // a node answers in hexadecimal
      const address = CairoStorageAddress.factoryFromApiResponse(response.values());
      expect(address.toBigInt()).toBe(4660n);
    });

    test('should be registered in the default strategy, in both directions', () => {
      const build = cairoTypeStrategy.constructors[STORAGE_ADDRESS_TYPE];
      const read = cairoTypeStrategy.response[STORAGE_ADDRESS_TYPE];
      const built = build('0x1234', cairoTypeStrategy);
      expect([...built.toApiRequest()]).toEqual(['4660']);
      expect(read(built, cairoTypeStrategy)).toBe(4660n);
    });
  });

  describe('in a contract call', () => {
    test('should serialize the StorageAddress argument of the Starknet ID naming contract', () => {
      // storage_read(address_domain: u32, address: StorageAddress) -> felt252
      const calldata = new CallData(namingSierra.abi).compile('storage_read', {
        address_domain: 0,
        address: '0x1234',
      });
      expect([...calldata]).toEqual(['0', '4660']);
    });
  });
});
