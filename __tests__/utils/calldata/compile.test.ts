import {
  CairoByteArray,
  CairoBytes31,
  CairoCustomEnum,
  CairoFelt252,
  CairoFixedArray,
  CairoInt128,
  CairoOption,
  CairoOptionVariant,
  CairoResult,
  CairoResultVariant,
  CairoUint64,
  CairoUint256,
  CairoUint512,
  CallData,
} from '../../../src';
import { PRIME } from '../../../src/global/constants';
import { byteArrayFromString } from '../../../src/utils/calldata/byteArray';

/**
 * `CallData.compile` without an abi, which walks its argument rather than reading a declared type.
 *
 * The classes of `src/utils/cairoDataTypes` are taken as working here — what each one serializes to
 * is pinned by its own tests. What is asserted below is that this path *reaches* them, and that the
 * structure it builds around them — variant indexes, array lengths, order — is right.
 */
describe('CallData.compile (no abi)', () => {
  describe('a Cairo type instance is serialized by its own class, not enumerated', () => {
    test('CairoByteArray keeps its pending word whole', () => {
      // used to spell the pending word out one felt per byte:
      // ["0","49","50","51","52","53","5"] where ["0","211295614005","5"] is expected
      const byteArray = CairoByteArray.fromText('12345');
      expect(CallData.compile({ v: byteArray })).toEqual(byteArray.toApiRequest());
    });

    test('CairoByteArray longer than one word', () => {
      // 33 bytes: one complete word, then 2 bytes pending
      const byteArray = CairoByteArray.fromText('ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567');
      expect(CallData.compile({ v: byteArray })).toEqual(byteArray.toApiRequest());
      expect(CallData.compile({ v: byteArray })).toHaveLength(4);
    });

    test('CairoBytes31 is one felt, not its 31-byte buffer', () => {
      // used to enumerate the buffer, padding zeros included: 31 felts for ["211295614005"]
      const bytes31 = CairoBytes31.fromText('12345');
      expect(CallData.compile({ v: bytes31 })).toEqual(bytes31.toApiRequest());
      expect(CallData.compile({ v: bytes31 })).toHaveLength(1);
    });

    test('CairoFelt252 is one felt, not its byte buffer', () => {
      const felt = new CairoFelt252('Hello');
      expect(CallData.compile({ v: felt })).toEqual(felt.toApiRequest());
      expect(CallData.compile({ v: felt })).toHaveLength(1);
    });

    test('a negative signed integer becomes its field element', () => {
      // used to throw: the raw -5n reached felt252, which has no negative values
      expect(CallData.compile({ v: new CairoInt128(-5) })).toEqual([(PRIME - 5n).toString()]);
    });

    test('a fixed array carries no length, and not its type string either', () => {
      // used to emit 5 felts: a length in front, and "[core::integer::u32; 3]" as a felt at the end
      const fixedArray = new CairoFixedArray([10, 20, 30], '[core::integer::u32; 3]');
      expect(CallData.compile({ v: fixedArray })).toEqual(['10', '20', '30']);
      // the instance says what the object of its own compile() says
      expect(CallData.compile({ v: fixedArray })).toEqual(
        CallData.compile({ v: fixedArray.compile() })
      );
    });
  });

  describe('nesting, in both directions', () => {
    test('a fixed array of ByteArrays', () => {
      const first = CairoByteArray.fromText('12345');
      const second = CairoByteArray.fromText('ab');
      expect(
        CallData.compile({
          v: new CairoFixedArray([first, second], '[core::byte_array::ByteArray; 2]'),
        })
      ).toEqual([...first.toApiRequest(), ...second.toApiRequest()]);
    });

    test('a fixed array of Options, whose two variants differ in length', () => {
      expect(
        CallData.compile({
          v: new CairoFixedArray(
            [
              new CairoOption(CairoOptionVariant.Some, 12),
              new CairoOption(CairoOptionVariant.None),
            ],
            '[core::option::Option::<core::integer::u32>; 2]'
          ),
        })
      ).toEqual(['0', '12', '1']);
    });

    test('an Option holding a fixed array', () => {
      expect(
        CallData.compile({
          v: new CairoOption(
            CairoOptionVariant.Some,
            new CairoFixedArray([10, 20, 30], '[core::integer::u32; 3]')
          ),
        })
      ).toEqual(['0', '10', '20', '30']);
    });

    test('a Result holding a ByteArray', () => {
      const byteArray = CairoByteArray.fromText('ab');
      expect(CallData.compile({ v: new CairoResult(CairoResultVariant.Ok, byteArray) })).toEqual([
        '0',
        ...byteArray.toApiRequest(),
      ]);
    });

    test('a custom enum whose active variant holds a ByteArray', () => {
      const byteArray = CairoByteArray.fromText('ab');
      expect(CallData.compile({ v: new CairoCustomEnum({ A: undefined, B: byteArray }) })).toEqual([
        '1',
        ...byteArray.toApiRequest(),
      ]);
    });

    test('a dynamic array of ByteArrays keeps its own length in front', () => {
      const first = CairoByteArray.fromText('12345');
      const second = CairoByteArray.fromText('ab');
      expect(CallData.compile({ v: [first, second] })).toEqual([
        '2',
        ...first.toApiRequest(),
        ...second.toApiRequest(),
      ]);
    });

    test('a struct member, next to a plain one', () => {
      const byteArray = CairoByteArray.fromText('ab');
      expect(CallData.compile({ s: { text: byteArray, n: 7 } })).toEqual([
        ...byteArray.toApiRequest(),
        '7',
      ]);
    });

    test('instances passed positionally', () => {
      const byteArray = CairoByteArray.fromText('ab');
      const bytes31 = CairoBytes31.fromText('12345');
      expect(CallData.compile([byteArray, bytes31])).toEqual([
        ...byteArray.toApiRequest(),
        ...bytes31.toApiRequest(),
      ]);
    });
  });

  describe('what already worked keeps working', () => {
    test('the plain object of byteArrayFromString', () => {
      // a different implementation of the same thing, and the one several suites rely on
      expect(CallData.compile({ mess: byteArrayFromString('Take care.') })).toEqual(
        new CairoByteArray('Take care.').toApiRequest()
      );
    });

    test('CairoUint256 gives its two felts, low first', () => {
      const value = 2n ** 130n;
      const uint256 = new CairoUint256(value);
      expect(CallData.compile({ v: uint256 })).toEqual(uint256.toApiRequest());
      // the instance says what the plain { low, high } object says, which is how this path used to
      // reach the right answer, by duck-typing rather than by class
      expect(CallData.compile({ v: uint256 })).toEqual(
        CallData.compile({ v: { low: value % 2n ** 128n, high: value / 2n ** 128n } })
      );
    });

    test('CairoUint512 gives its four limbs, lowest first', () => {
      const uint512 = new CairoUint512(2n ** 300n);
      expect(CallData.compile({ v: uint512 })).toEqual(uint512.toApiRequest());
      expect(CallData.compile({ v: uint512 })).toHaveLength(4);
    });

    test('an unsigned integer instance is one felt', () => {
      const uint64 = new CairoUint64(44);
      expect(CallData.compile({ v: uint64 })).toEqual(uint64.toApiRequest());
    });

    test('a long text is still cut into a ByteArray', () => {
      const text = 'Take care of this rather long string, please.';
      expect(CallData.compile({ v: text })).toEqual(
        CallData.compile({ v: byteArrayFromString(text) })
      );
    });
  });

  describe('an already compiled array stays a Cairo array', () => {
    test('it gains a length, so the instance is what should be passed', () => {
      // a documented limit rather than a bug to route around: a string[] value is read as a Cairo
      // array here, whatever its __compiled__ flag says
      const byteArray = CairoByteArray.fromText('12345');
      expect(CallData.compile({ v: byteArray.toApiRequest() })).toEqual([
        '3',
        ...byteArray.toApiRequest(),
      ]);
    });
  });
});
