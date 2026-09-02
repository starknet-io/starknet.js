import { CallData } from '../../../src';
import { CairoTuple } from '../../../src/utils/cairoDataTypes/tuple';
import { CairoUint8 } from '../../../src/utils/cairoDataTypes/uint8';
import { cairoTypeStrategy } from '../../../src/utils/calldata/parser/cairoTypeStrategy';

const S = cairoTypeStrategy;
const PAIR = '(core::integer::u8, core::integer::u32)';
const NESTED = '((core::integer::u8, core::integer::u8), core::integer::u32)';
const DEEP = '(((core::integer::u8, core::integer::u8), core::integer::u8), core::integer::u8)';

/** The felts a tuple serializes to, as the hex strings a node would answer with. */
const asResponse = (tuple: CairoTuple): string[] =>
  [...tuple.toApiRequest()].map((felt) => `0x${BigInt(felt).toString(16)}`);

describe('CairoTuple class Unit Tests', () => {
  describe('construction from the values a caller passes', () => {
    test('should build from an array', () => {
      expect([...new CairoTuple([1, 2], PAIR, S).toApiRequest()]).toEqual(['1', '2']);
    });

    test('should build from an object keyed by position', () => {
      expect([...new CairoTuple({ 0: 1, 1: 2 }, PAIR, S).toApiRequest()]).toEqual(['1', '2']);
    });

    test('should build from an object keyed by anything, in insertion order', () => {
      expect([...new CairoTuple({ a: 1, b: 2 }, PAIR, S).toApiRequest()]).toEqual(['1', '2']);
    });

    test('should take a member that is already built', () => {
      expect([...new CairoTuple([new CairoUint8(1), 2], PAIR, S).toApiRequest()]).toEqual([
        '1',
        '2',
      ]);
    });

    test('should copy a tuple handed to it whole', () => {
      const copy = new CairoTuple(new CairoTuple([1, 2], PAIR, S), PAIR, S);
      expect([...copy.toApiRequest()]).toEqual(['1', '2']);
      expect(copy.tupleType).toBe(PAIR);
    });

    test('should hold a single member without turning it into a bare value', () => {
      const single = new CairoTuple([42], '(core::integer::u8)', S);
      expect(single.content).toHaveLength(1);
      expect([...single.toApiRequest()]).toEqual(['42']);
    });

    test('should read every input shape a felt252 accepts', () => {
      const mixed = new CairoTuple(
        [1, '2', 3n],
        '(core::felt252, core::felt252, core::felt252)',
        S
      );
      expect([...mixed.toApiRequest()]).toEqual(['1', '2', '3']);
    });

    test('should hold members of different types', () => {
      const mixed = new CairoTuple(
        [1, 'ab', 2n, true],
        '(core::integer::u8, core::felt252, core::integer::u256, core::bool)',
        S
      );
      // 'ab' is text, so felt252 takes its UTF-8 bytes; a u256 spreads over two felts
      expect([...mixed.toApiRequest()]).toEqual(['1', '24930', '2', '0', '1']);
    });

    test('should hold as many members as the type declares', () => {
      const size = 50;
      const type = `(${Array(size).fill('core::integer::u8').join(', ')})`;
      const values = Array.from({ length: size }, (_, index) => index + 1);
      const felts = [...new CairoTuple(values, type, S).toApiRequest()];
      expect(felts).toHaveLength(size);
      expect(felts[0]).toBe('1');
      expect(felts[size - 1]).toBe('50');
    });

    test('should refuse a member the strategy does not know', () => {
      expect(() => new CairoTuple([1], '(core::foo::Bar)', S)).toThrow(
        '"core::foo::Bar" is not a valid Cairo type'
      );
    });

    test('should refuse a member count the type does not declare', () => {
      expect(() => new CairoTuple([1, 2], '(core::integer::u8)', S)).toThrow(
        'ABI type (core::integer::u8): expected 1 items, got 2 items.'
      );
    });
  });

  describe('construction from a response', () => {
    test('should read the members off the iterator', () => {
      expect([...new CairoTuple(['0x1', '0x2'].values(), PAIR, S).toApiRequest()]).toEqual([
        '1',
        '2',
      ]);
    });

    test('should consume exactly what the type declares, leaving the rest', () => {
      const iterator = ['0x1', '0x2', '0x9'].values();
      // eslint-disable-next-line no-new
      new CairoTuple(iterator, PAIR, S);
      expect(iterator.next().value).toBe('0x9');
    });
  });

  describe('nesting', () => {
    test('should build a tuple of tuples', () => {
      expect([...new CairoTuple([[1, 2], 3], NESTED, S).toApiRequest()]).toEqual(['1', '2', '3']);
    });

    test('should nest as deep as the type goes', () => {
      expect([...new CairoTuple([[[1, 2], 3], 4], DEEP, S).toApiRequest()]).toEqual([
        '1',
        '2',
        '3',
        '4',
      ]);
    });

    test('should read a nested tuple back off a flat response', () => {
      // nothing in the felts says where the inner tuple ends; only the type does
      const tuple = new CairoTuple(['0x1', '0x2', '0x3'].values(), NESTED, S);
      expect(tuple.decompose(S)).toEqual({ 0: { 0: 1n, 1: 2n }, 1: 3n });
    });

    test('should accept an inner tuple that is already built', () => {
      const inner = new CairoTuple([1, 2], '(core::integer::u8, core::integer::u8)', S);
      expect([...new CairoTuple([inner, 3], NESTED, S).toApiRequest()]).toEqual(['1', '2', '3']);
    });
  });

  describe('the empty tuple', () => {
    test('should have no members', () => {
      expect(CairoTuple.getTupleElementTypes('()')).toEqual([]);
      expect([...new CairoTuple([], '()', S).toApiRequest()]).toEqual([]);
      expect(new CairoTuple([], '()', S).decompose(S)).toEqual({});
    });
  });

  describe('reading a tuple type', () => {
    test('should split a Cairo 1 tuple into its member types', () => {
      expect(CairoTuple.getTupleElementTypes(PAIR)).toEqual([
        'core::integer::u8',
        'core::integer::u32',
      ]);
    });

    test('should keep a nested member whole', () => {
      expect(CairoTuple.getTupleElementTypes(NESTED)).toEqual([
        '(core::integer::u8, core::integer::u8)',
        'core::integer::u32',
      ]);
    });

    test('should split a Cairo 0 named tuple into names and types', () => {
      expect(CairoTuple.getTupleElementTypes('(x:felt, y:felt)')).toEqual([
        { name: 'x', type: 'felt' },
        { name: 'y', type: 'felt' },
      ]);
    });

    test('should name the members, or number them when the type does not', () => {
      expect(CairoTuple.extractTupleMembersNames(PAIR)).toEqual(['0', '1']);
      expect(CairoTuple.extractTupleMembersNames('(x:felt, y:felt)')).toEqual(['x', 'y']);
    });

    test('a Cairo 0 named tuple is read but cannot be built by this strategy', () => {
      // the members are named and typed correctly, but 'felt' is a Cairo 0 type name and the
      // strategy only registers the Cairo 1 ones, so there is nothing to build the member with
      expect(() => new CairoTuple([1, 2], '(x:felt, y:felt)', S)).toThrow(
        '"felt" is not a valid Cairo type'
      );
    });
  });

  describe('the guard against a type that does not survive being split', () => {
    test('should refuse a Cairo 1 type whose members do not recompose it', () => {
      // without this, the parser eats the character after the comma and hands back a member type
      // that does not exist: ["core::integer::u8", "ore::integer::u32"]
      expect(() =>
        CairoTuple.getTupleElementTypes('(core::integer::u8,core::integer::u32)')
      ).toThrow('is not a valid Cairo type (its members do not recompose it');
    });

    test('should refuse it at construction too', () => {
      expect(() => new CairoTuple([1, 2], '(core::integer::u8,core::integer::u32)', S)).toThrow(
        'is not a valid Cairo type (its members do not recompose it'
      );
    });

    test('should leave alone a nested generic whose own comma carries no space', () => {
      // read by bracket matching rather than by commas, so it comes back whole and is valid
      expect(
        CairoTuple.getTupleElementTypes(
          '(core::result::Result::<core::integer::u8,core::integer::u8>, core::integer::u8)'
        )
      ).toEqual([
        'core::result::Result::<core::integer::u8,core::integer::u8>',
        'core::integer::u8',
      ]);
    });

    test('should leave alone a Cairo 0 tuple, which is split with every space stripped', () => {
      expect(CairoTuple.getTupleElementTypes('(x:felt,y:felt)')).toEqual([
        { name: 'x', type: 'felt' },
        { name: 'y', type: 'felt' },
      ]);
    });
  });

  describe('validate, is and isAbiType', () => {
    test('should accept an array or an object for a tuple type', () => {
      expect(() => CairoTuple.validate([1, 2], PAIR)).not.toThrow();
      expect(() => CairoTuple.validate({ 0: 1, 1: 2 }, PAIR)).not.toThrow();
    });

    test('should refuse a type that is not a tuple', () => {
      expect(() => CairoTuple.validate([1, 2], 'core::integer::u8')).toThrow(
        'The type core::integer::u8 is not a Cairo tuple. Expected format: (type1, type2, ...)'
      );
    });

    test('should refuse an input that is neither an array nor an object', () => {
      expect(() => CairoTuple.validate('nope', PAIR)).toThrow(
        'Invalid input: expected Array or Object, got string'
      );
    });

    test('is should be the non-throwing form of validate', () => {
      expect(CairoTuple.is([1, 2], PAIR)).toBe(true);
      expect(CairoTuple.is('nope', PAIR)).toBe(false);
      expect(CairoTuple.is([1, 2], 'core::integer::u8')).toBe(false);
    });

    test('isAbiType should recognise every tuple shape', () => {
      expect(CairoTuple.isAbiType(PAIR)).toBe(true);
      expect(CairoTuple.isAbiType(NESTED)).toBe(true);
      expect(CairoTuple.isAbiType('(x:felt, y:felt)')).toBe(true);
      expect(CairoTuple.isAbiType('()')).toBe(true);
      expect(CairoTuple.isAbiType('(a)')).toBe(true);
      expect(CairoTuple.isAbiType('(very::long::type::name)')).toBe(true);
    });

    test('isAbiType should refuse anything that is not one', () => {
      expect(CairoTuple.isAbiType('core::integer::u32')).toBe(false);
      expect(CairoTuple.isAbiType('[core::integer::u32; 8]')).toBe(false);
      expect(CairoTuple.isAbiType('[type; 0]')).toBe(false);
      expect(CairoTuple.isAbiType('tuple_but_no_parens')).toBe(false);
    });
  });

  describe('the dynamic selector', () => {
    test('should name the class, on the class and on an instance', () => {
      expect(CairoTuple.dynamicSelector).toBe('CairoTuple');
      expect(new CairoTuple([1, 2], PAIR, S).dynamicSelector).toBe('CairoTuple');
    });

    test('should be registered in the strategy, which is what makes nesting work', () => {
      expect(S.dynamicSelectors[CairoTuple.dynamicSelector](PAIR)).toBe(true);
      expect(S.dynamicSelectors[CairoTuple.dynamicSelector]('core::integer::u8')).toBe(false);
      expect(typeof S.constructors[CairoTuple.dynamicSelector]).toBe('function');
      expect(typeof S.response[CairoTuple.dynamicSelector]).toBe('function');
    });

    test('should refuse to build without the abi type it stands for', () => {
      expect(() => S.constructors[CairoTuple.dynamicSelector]([1, 2], S)).toThrow(
        'A CairoTuple cannot be built without the abi type it stands for'
      );
    });
  });

  describe('toApiRequest method', () => {
    test('should carry no length prefix', () => {
      // the whole difference with an array: a tuple's size is in its type, not on the wire
      expect([...new CairoTuple([1, 2], PAIR, S).toApiRequest()]).toHaveLength(2);
    });

    test('should flag the result as compiled', () => {
      expect(new CairoTuple([1, 2], PAIR, S).toApiRequest()).toHaveProperty('__compiled__', true);
    });
  });

  describe('CallData.compile integration', () => {
    test('should serialize an instance as its members, with no length prefix', () => {
      expect(CallData.compile([new CairoTuple([10, 20], PAIR, S)] as any)).toEqual(['10', '20']);
    });

    test('should sit alongside ordinary values', () => {
      expect(CallData.compile([new CairoTuple([10, 20], PAIR, S), 30, 'test'] as any)).toEqual([
        '10',
        '20',
        '30',
        '1952805748',
      ]);
    });

    test('should flatten a nested tuple among others', () => {
      expect(
        CallData.compile([
          new CairoTuple([1, 2], PAIR, S),
          new CairoTuple([[5, 6], 7], NESTED, S),
        ] as any)
      ).toEqual(['1', '2', '5', '6', '7']);
    });
  });

  describe('compile static method', () => {
    test('should key the members by position', () => {
      expect(CairoTuple.compile([10, 20, 30])).toEqual({ 0: 10, 1: 20, 2: 30 });
    });
  });

  describe('decompose method', () => {
    test('should return the members keyed by position', () => {
      expect(new CairoTuple([1, 2], PAIR, S).decompose(S)).toEqual({ 0: 1n, 1: 2n });
    });

    test('should decompose each level of a nested tuple', () => {
      expect(new CairoTuple([[[1, 2], 3], 4], DEEP, S).decompose(S)).toEqual({
        0: { 0: { 0: 1n, 1: 2n }, 1: 3n },
        1: 4n,
      });
    });
  });

  describe('round-trip consistency', () => {
    test('should survive a serialize then read back cycle', () => {
      const cases: [string, any[]][] = [
        [PAIR, [1, 2]],
        ['(core::integer::u8)', [42]],
        [NESTED, [[1, 2], 3]],
        [DEEP, [[[1, 2], 3], 4]],
      ];
      cases.forEach(([type, values]) => {
        const tuple = new CairoTuple(values, type, S);
        const readBack = new CairoTuple(asResponse(tuple).values(), type, S);
        expect(readBack.decompose(S)).toEqual(tuple.decompose(S));
      });
    });
  });
});
