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
