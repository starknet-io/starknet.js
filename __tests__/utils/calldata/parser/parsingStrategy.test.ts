import { Abi, CallData } from '../../../../src';
import { PRIME } from '../../../../src/global/constants';
import { fastParsingStrategy } from '../../../../src/utils/calldata/parser/parsingStrategy';

const fn = (type: string) => ({
  type: 'function',
  name: 'fn',
  inputs: [{ name: 'v', type }],
  outputs: [{ type }],
  state_mutability: 'view',
});

/** A real abi declares EthAddress as a struct, and the named form takes another branch without it. */
const ETH_ADDRESS_STRUCT = {
  type: 'struct',
  name: 'core::starknet::eth_address::EthAddress',
  members: [{ name: 'address', type: 'core::felt252' }],
};

/** A Cairo 1 abi, parsed by AbiParser1. */
const abiV1 = (type: string): Abi => [ETH_ADDRESS_STRUCT, fn(type)] as Abi;

/** The same, behind an interface, which is what sends it to AbiParser2. */
const abiV2 = (type: string): Abi =>
  [ETH_ADDRESS_STRUCT, { type: 'interface', name: 'test::ITest', items: [fn(type)] }] as Abi;

/** Both parser versions carry the same default, so both are worth asserting. */
const abiVersions: [string, (type: string) => Abi][] = [
  ['AbiParser1', abiV1],
  ['AbiParser2', abiV2],
];

describe('the default parsing strategy', () => {
  describe.each(abiVersions)('%s', (_name, abiFor) => {
    test('reads a negative signed integer back as a negative number', () => {
      // on the wire a negative is a field element; only the declared type turns it back
      const onTheWire = `0x${(PRIME - 5n).toString(16)}`;
      expect(new CallData(abiFor('core::integer::i128')).parse('fn', [onTheWire])).toBe(-5n);
      expect(new CallData(abiFor('core::integer::i8')).parse('fn', [onTheWire])).toBe(-5n);
    });

    test('refuses an out-of-range unsigned value instead of serializing it', () => {
      // the argument array form runs no field validation, so the declared type is the only
      // thing standing between an out-of-range value and the calldata
      expect(() => new CallData(abiFor('core::integer::u8')).compile('fn', [256])).toThrow();
      expect(() => new CallData(abiFor('core::integer::u64')).compile('fn', [2n ** 64n])).toThrow();
    });

    test('decodes an out-of-range response rather than refusing it', () => {
      // deliberate, and the counterpart of the test above: the same value that is refused on the
      // way out is returned on the way in. A node's answer is not the caller's mistake to catch,
      // and decodeParameters is the tool for reading felts back as a chosen type
      expect(new CallData(abiFor('core::integer::u8')).parse('fn', ['0x123456'])).toBe(1193046n);
      expect(
        new CallData(abiFor('core::integer::u64')).parse('fn', [`0x${(2n ** 64n).toString(16)}`])
      ).toBe(2n ** 64n);
    });

    test('leaves ordinary values alone', () => {
      expect(new CallData(abiFor('core::integer::u64')).compile('fn', [44])).toEqual(['44']);
      expect(new CallData(abiFor('core::felt252')).parse('fn', ['0x2a'])).toBe(42n);
      expect(new CallData(abiFor('core::integer::u128')).parse('fn', ['0x2a'])).toBe(42n);
    });
  });

  describe('every unsigned type bounds a request, whatever the call form', () => {
    /** each type with the smallest value that does not fit in it */
    const bounds: [string, bigint][] = [
      ['core::integer::u8', 2n ** 8n],
      ['core::integer::u16', 2n ** 16n],
      ['core::integer::u32', 2n ** 32n],
      ['core::integer::u64', 2n ** 64n],
      ['core::integer::u96', 2n ** 96n],
      ['core::integer::u128', 2n ** 128n],
      ['core::starknet::eth_address::EthAddress', 2n ** 160n],
    ];

    // u32 and EthAddress had no branch of their own and fell to felt252, which only bounds the
    // field; u96 had one but no case in the named form's validator
    test.each(bounds)('%s refuses the first value that does not fit', (type, tooBig) => {
      const callData = new CallData(abiV2(type));
      expect(() => callData.compile('fn', [tooBig])).toThrow();
      expect(() => callData.compile('fn', { v: tooBig })).toThrow();
    });

    // the other half: a bound that refuses everything would pass the test above
    test.each(bounds)('%s accepts the largest value that fits', (type, tooBig) => {
      const callData = new CallData(abiV2(type));
      const largest = [(tooBig - 1n).toString()];
      expect(callData.compile('fn', [tooBig - 1n])).toEqual(largest);
      expect(callData.compile('fn', { v: tooBig - 1n })).toEqual(largest);
    });
  });

  describe('what opting into the fast strategy gives up', () => {
    const fast = (type: string) => new CallData(abiV2(type), fastParsingStrategy);

    test('a negative signed integer comes back as its raw field element', () => {
      const onTheWire = `0x${(PRIME - 5n).toString(16)}`;
      expect(fast('core::integer::i128').parse('fn', [onTheWire])).toBe(PRIME - 5n);
    });

    test('an out-of-range unsigned value reaches the calldata', () => {
      expect(fast('core::integer::u8').compile('fn', [256])).toEqual(['256']);
    });

    test('but ordinary values say exactly what the default says', () => {
      expect(fast('core::integer::u64').compile('fn', [44])).toEqual(['44']);
      expect(fast('core::felt252').parse('fn', ['0x2a'])).toBe(42n);
    });
  });
});

const BOOL = 'core::bool';
const ETH_ADDRESS_TYPE = 'core::starknet::eth_address::EthAddress';
const SECP256K1_POINT = 'core::starknet::secp256k1::Secp256k1Point';

/**
 * The four felts a point occupies, worked out here rather than with the library's own helpers, so
 * that the assertion is an independent oracle and not the implementation compared to itself.
 */
const expectedLimbs = (value: bigint): string[] => {
  const x = value / 2n ** 256n;
  const y = value % 2n ** 256n;
  return [
    (x % 2n ** 128n).toString(),
    (x / 2n ** 128n).toString(),
    (y % 2n ** 128n).toString(),
    (y / 2n ** 128n).toString(),
  ];
};

describe('the leaf types the strategy now carries', () => {
  const PUB_KEY = BigInt(`0x${'1a'.repeat(64)}`);

  describe('core::bool', () => {
    test('serializes the two values a bool has', () => {
      const callData = new CallData(abiV2(BOOL));
      expect(callData.compile('fn', [true])).toEqual(['1']);
      expect(callData.compile('fn', [false])).toEqual(['0']);
    });

    test('refuses a number that is neither 0 nor 1, where it used to be serialized', () => {
      // the argument array form runs no field validation, so before this type had a branch of its
      // own it fell to the felt252 default and 5 reached the calldata as the felt 5
      expect(() => new CallData(abiV2(BOOL)).compile('fn', [5])).toThrow(
        'Only values 0 or 1 are possible in a core::bool, received 5'
      );
    });

    test('accepts the two numbers a bool occupies, in the array form', () => {
      expect(new CallData(abiV2(BOOL)).compile('fn', [1])).toEqual(['1']);
      expect(new CallData(abiV2(BOOL)).compile('fn', [0])).toEqual(['0']);
    });

    test('still asks for a real boolean in the named form, which validates fields first', () => {
      // the two gates do not agree, and deliberately so: validateFields is stricter than the class
      expect(new CallData(abiV2(BOOL)).compile('fn', { v: true })).toEqual(['1']);
      expect(() => new CallData(abiV2(BOOL)).compile('fn', { v: 1 })).toThrow();
    });

    test('reads a bool back as a boolean', () => {
      const callData = new CallData(abiV2(BOOL));
      expect(callData.parse('fn', ['0x1'])).toBe(true);
      expect(callData.parse('fn', ['0x0'])).toBe(false);
    });

    test('the fast strategy lets a non-bool through, as it does for the integers', () => {
      expect(new CallData(abiV2(BOOL), fastParsingStrategy).compile('fn', [5])).toEqual(['5']);
    });
  });

  describe('core::starknet::eth_address::EthAddress', () => {
    test('serializes an address, whatever the input shape', () => {
      const callData = new CallData(abiV2(ETH_ADDRESS_TYPE));
      expect(callData.compile('fn', ['0x1234'])).toEqual(['4660']);
      expect(callData.compile('fn', [4660])).toEqual(['4660']);
    });

    test('refuses text, where it used to be encoded as its UTF-8 bytes', () => {
      expect(() => new CallData(abiV2(ETH_ADDRESS_TYPE)).compile('fn', ['abc'])).toThrow(
        'Invalid input: an EthAddress cannot be built from text'
      );
    });

    test('reads an address back as a number', () => {
      expect(new CallData(abiV2(ETH_ADDRESS_TYPE)).parse('fn', ['0x1234'])).toBe(4660n);
    });
  });

  describe('core::starknet::secp256k1::Secp256k1Point', () => {
    test.each(abiVersions)('%s emits four felts, x then y', (_name, abiFor) => {
      const callData = new CallData(abiFor(SECP256K1_POINT));
      expect(callData.compile('fn', [PUB_KEY])).toEqual(expectedLimbs(PUB_KEY));
      expect(callData.compile('fn', [1n])).toEqual(['0', '0', '1', '0']);
    });

    test('both strategies emit the same four felts, since this is not a check', () => {
      const value = PUB_KEY;
      expect(new CallData(abiV2(SECP256K1_POINT)).compile('fn', [value])).toEqual(
        expectedLimbs(value)
      );
      expect(
        new CallData(abiV2(SECP256K1_POINT), fastParsingStrategy).compile('fn', [value])
      ).toEqual(expectedLimbs(value));
    });

    test('reads a point back as the single number it stands for', () => {
      const felts = expectedLimbs(PUB_KEY).map((d) => `0x${BigInt(d).toString(16)}`);
      expect(new CallData(abiV2(SECP256K1_POINT)).parse('fn', felts)).toBe(PUB_KEY);
      expect(new CallData(abiV2(SECP256K1_POINT), fastParsingStrategy).parse('fn', felts)).toBe(
        PUB_KEY
      );
    });

    test('refuses a value wider than 512 bits, where the felts used to be corrupted', () => {
      // padStart does not truncate, so an oversized value used to shift the slices and produce
      // four felts that stood for something else entirely
      expect(() => new CallData(abiV2(SECP256K1_POINT)).compile('fn', [2n ** 512n])).toThrow(
        'input is bigger than SECP256K1_POINT_MAX'
      );
    });
  });
});
