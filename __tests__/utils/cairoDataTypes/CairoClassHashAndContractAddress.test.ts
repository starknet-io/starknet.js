import { CairoClassHash, CairoContractAddress, Literal } from '../../../src';
import { validateAndParseAddress } from '../../../src/utils/address';
import { ADDR_BOUND, PRIME } from '../../../src/global/constants';
import { cairoTypeStrategy as S } from '../../../src/utils/calldata/parser/cairoTypeStrategy';

/** An address written the way a node writes it, so that beta's own validator will read it. */
const padded = (value: bigint) => `0x${value.toString(16).padStart(64, '0')}`;

describe('CairoClassHash and CairoContractAddress Unit Tests', () => {
  describe.each([
    ['CairoClassHash', CairoClassHash, Literal.ClassHash],
    ['CairoContractAddress', CairoContractAddress, Literal.ContractAddress],
  ] as const)('%s', (_name, CairoType, abiSelector) => {
    test('should read the same value from a number, a decimal string and a hex string', () => {
      expect(new CairoType('0x1234').toBigInt()).toBe(4660n);
      expect(new CairoType(4660).toBigInt()).toBe(4660n);
      expect(new CairoType('4660').toBigInt()).toBe(4660n);
    });

    test('should answer to its own abi type and no other', () => {
      expect(CairoType.abiSelector).toBe(abiSelector);
      expect(CairoType.isAbiType(abiSelector)).toBe(true);
      expect(CairoType.isAbiType('core::felt252')).toBe(false);
    });

    test('should serialize to one decimal-string felt', () => {
      expect([...new CairoType('0x1234').toApiRequest()]).toEqual(['4660']);
      expect(new CairoType('0x1234').toApiRequest()).toHaveProperty('__compiled__', true);
    });

    test('should return an unpadded hexadecimal string', () => {
      expect(new CairoType(4660).toHexString()).toBe('0x1234');
      expect(new CairoType('0x0034').toHexString()).toBe('0x34');
    });

    test('should refuse text, as an EthAddress does', () => {
      expect(() => new CairoType('abc')).toThrow('cannot be built from text');
      expect(CairoType.is('abc')).toBe(false);
    });

    test('should refuse what a felt252 refuses', () => {
      expect(() => new CairoType(null)).toThrow('null value is not allowed for felt252');
      expect(() => new CairoType({})).toThrow("Unsupported data type 'object' for felt252");
      expect(CairoType.is(null)).toBe(false);
    });

    test('should read one felt off a response', () => {
      expect(CairoType.factoryFromApiResponse(['0x1234'].values()).toBigInt()).toBe(4660n);
    });

    test('should be registered in the strategy, in both directions', () => {
      expect(typeof S.constructors[abiSelector]).toBe('function');
      expect(typeof S.response[abiSelector]).toBe('function');
      const built = S.constructors[abiSelector]('0x1234', S);
      expect([...built.toApiRequest()]).toEqual(['4660']);
      expect(S.response[abiSelector](built, S)).toBe(4660n);
    });

    test('should survive a serialize then read back cycle', () => {
      const felts = [...new CairoType('0x1234').toApiRequest()].map(
        (felt) => `0x${BigInt(felt).toString(16)}`
      );
      expect(CairoType.factoryFromApiResponse(felts.values()).toBigInt()).toBe(4660n);
    });
  });

  describe('the two bounds differ, and only one of them binds', () => {
    test('a contract address stops at ADDR_BOUND, which is narrower than the field', () => {
      expect(ADDR_BOUND).toBeLessThan(PRIME);
      expect(new CairoContractAddress(ADDR_BOUND - 1n).toBigInt()).toBe(ADDR_BOUND - 1n);
      expect(() => new CairoContractAddress(ADDR_BOUND)).toThrow(
        'Value is out of ContractAddress range'
      );
      expect(() => new CairoContractAddress(PRIME - 1n)).toThrow(
        'Value is out of ContractAddress range'
      );
    });

    test('a class hash stops only at the field, being a hash output', () => {
      expect(new CairoClassHash(PRIME - 1n).toBigInt()).toBe(PRIME - 1n);
      // wider than an address may be, which is the whole difference between the two
      expect(new CairoClassHash(ADDR_BOUND).toBigInt()).toBe(ADDR_BOUND);
      expect(() => new CairoClassHash(PRIME)).toThrow('is out of felt252 range');
    });
  });

  describe('agreement with the address validator already in the library', () => {
    test.each([
      ['ADDR_BOUND - 1', ADDR_BOUND - 1n],
      ['ADDR_BOUND', ADDR_BOUND],
      ['2 ** 251', 2n ** 251n],
    ])('should say what validateAndParseAddress says about %s', (_label, value) => {
      const acceptedHere = CairoContractAddress.is(value);
      let acceptedThere: boolean;
      try {
        validateAndParseAddress(padded(value));
        acceptedThere = true;
      } catch {
        acceptedThere = false;
      }
      expect(acceptedHere).toBe(acceptedThere);
    });
  });
});
