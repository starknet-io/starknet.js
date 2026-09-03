import {
  CairoArray,
  CairoStruct,
  CairoUint8,
  CallData,
  cairoTypeStrategy,
  structStrategy,
  type AbiStruct,
} from '../../../src';

// hand-written rather than taken from a compiled contract: these are unit tests of the class, and
// the abi definition is all it ever reads
const POINT = {
  type: 'struct',
  name: 'test::Point',
  members: [
    { name: 'x', type: 'core::integer::u8' },
    { name: 'y', type: 'core::integer::u32' },
  ],
} as AbiStruct;

const LINE = {
  type: 'struct',
  name: 'test::Line',
  members: [
    { name: 'a', type: 'test::Point' },
    { name: 'b', type: 'test::Point' },
  ],
} as AbiStruct;

const HOLDER = {
  type: 'struct',
  name: 'test::Holder',
  members: [
    { name: 'values', type: 'core::array::Array::<core::integer::u8>' },
    { name: 'pair', type: '(core::integer::u8, core::integer::u8)' },
  ],
} as AbiStruct;

/** The language's types, then the contract's — which is what the second argument is for. */
const S = [cairoTypeStrategy, structStrategy([POINT, LINE, HOLDER])];

/** The felts a struct serializes to, as the hex strings a node would answer with. */
const asResponse = (struct: CairoStruct): string[] =>
  [...struct.toApiRequest()].map((felt) => `0x${BigInt(felt).toString(16)}`);

describe('CairoStruct class Unit Tests', () => {
  describe('construction from the values a caller passes', () => {
    test('should read an object by the abi member names, in the abi order', () => {
      const struct = new CairoStruct({ y: 2, x: 1 }, POINT, S);
      expect([...struct.toApiRequest()]).toEqual(['1', '2']);
      expect(struct.decompose(S)).toEqual({ x: 1n, y: 2n });
    });

    test('should take an array as already being in that order', () => {
      const struct = new CairoStruct([1, 2], POINT, S);
      expect([...struct.toApiRequest()]).toEqual(['1', '2']);
      expect(struct.decompose(S)).toEqual({ x: 1n, y: 2n });
    });

    test('should take a member that is already built', () => {
      expect([...new CairoStruct([new CairoUint8(1), 2], POINT, S).toApiRequest()]).toEqual([
        '1',
        '2',
      ]);
    });

    test('should copy a struct handed to it whole', () => {
      const copy = new CairoStruct(new CairoStruct({ x: 1, y: 2 }, POINT, S), POINT, S);
      expect([...copy.toApiRequest()]).toEqual(['1', '2']);
      expect(copy.abiStruct.name).toBe('test::Point');
      expect(copy.dynamicSelector).toBe('test::Point');
    });

    test('should accept a single strategy where the members need no other', () => {
      // the struct itself is given by argument, so only its members are looked up, and here they
      // are all types of the language
      expect([...new CairoStruct({ x: 1, y: 2 }, POINT, cairoTypeStrategy).toApiRequest()]).toEqual(
        ['1', '2']
      );
    });

    test('should refuse an object that is missing a member', () => {
      expect(() => new CairoStruct({ x: 1, z: 2 }, POINT, S)).toThrow(
        'Your object needs a property with key : y .'
      );
    });

    test('should refuse a member count the abi does not declare', () => {
      expect(() => new CairoStruct([1], POINT, S)).toThrow(
        'Invalid input: expected 2 members, got 1'
      );
      expect(() => new CairoStruct([1, 2, 3], POINT, S)).toThrow(
        'Invalid input: expected 2 members, got 3'
      );
    });

    test('should refuse a member type no strategy knows', () => {
      const unknown = {
        type: 'struct',
        name: 'test::Unknown',
        members: [{ name: 'a', type: 'core::foo::Bar' }],
      } as AbiStruct;
      expect(() => new CairoStruct({ a: 1 }, unknown, S)).toThrow(
        '"core::foo::Bar" is not a valid Cairo type'
      );
    });
  });

  describe('construction from a response', () => {
    test('should read the members off the iterator', () => {
      const struct = new CairoStruct(['0x0', '0x64'].values(), POINT, S);
      expect([...struct.toApiRequest()]).toEqual(['0', '100']);
      expect(struct.decompose(S)).toEqual({ x: 0n, y: 100n });
    });

    test('should consume exactly what the abi declares, leaving the rest', () => {
      const iterator = ['0x1', '0x2', '0x9'].values();
      // eslint-disable-next-line no-new
      new CairoStruct(iterator, POINT, S);
      expect(iterator.next().value).toBe('0x9');
    });
  });

  describe('nesting', () => {
    test('should hold another struct, found by its exact name', () => {
      const line = new CairoStruct({ a: { x: 1, y: 2 }, b: { x: 3, y: 4 } }, LINE, S);
      expect([...line.toApiRequest()]).toEqual(['1', '2', '3', '4']);
      expect(line.decompose(S)).toEqual({ a: { x: 1n, y: 2n }, b: { x: 3n, y: 4n } });
    });

    test('should read a nested struct back off a flat response', () => {
      const line = new CairoStruct(['0x1', '0x2', '0x3', '0x4'].values(), LINE, S);
      expect(line.decompose(S)).toEqual({ a: { x: 1n, y: 2n }, b: { x: 3n, y: 4n } });
    });

    test('should hold an array and a tuple, each keeping its own shape', () => {
      const holder = new CairoStruct({ values: [1, 2, 3], pair: [4, 5] }, HOLDER, S);
      // the array carries its length, the tuple does not
      expect([...holder.toApiRequest()]).toEqual(['3', '1', '2', '3', '4', '5']);
      expect(holder.decompose(S)).toEqual({ values: [1n, 2n, 3n], pair: { 0: 4n, 1: 5n } });
    });

    test('should sit inside an array in turn', () => {
      const array = new CairoArray(
        [
          { x: 1, y: 2 },
          { x: 3, y: 4 },
        ],
        'core::array::Array::<test::Point>',
        S
      );
      expect([...array.toApiRequest()]).toEqual(['2', '1', '2', '3', '4']);
      expect(array.decompose(S)).toEqual([
        { x: 1n, y: 2n },
        { x: 3n, y: 4n },
      ]);
    });
  });

  describe('reading an abi definition', () => {
    test('should give the member types and names, in the abi order', () => {
      expect(CairoStruct.getStructMembersTypes(POINT)).toEqual([
        'core::integer::u8',
        'core::integer::u32',
      ]);
      expect(CairoStruct.extractStructMembersNames(POINT)).toEqual(['x', 'y']);
    });
  });

  describe('validate and is', () => {
    test('should check the member count against the abi', () => {
      expect(() => CairoStruct.validate({ x: 1, y: 2 }, POINT)).not.toThrow();
      expect(() => CairoStruct.validate([1], POINT)).toThrow(
        'Invalid input: expected 2 members, got 1'
      );
    });

    test('should check only the shape when there is no abi to check against', () => {
      expect(() => CairoStruct.validate({ anything: 1 })).not.toThrow();
      expect(() => CairoStruct.validate([1, 2, 3])).not.toThrow();
      expect(() => CairoStruct.validate('nope')).toThrow(
        'Invalid input: expected Array or Object, got string'
      );
    });

    test('should refuse an abi entry that is not a struct', () => {
      const notAStruct = { type: 'enum', name: 'test::E', members: [] } as unknown as AbiStruct;
      expect(() => CairoStruct.validate({ a: 1 }, notAStruct)).toThrow(
        'Invalid ABI: expected struct, got enum'
      );
    });

    test('is should be the non-throwing form of validate', () => {
      expect(CairoStruct.is({ x: 1, y: 2 }, POINT)).toBe(true);
      expect(CairoStruct.is([1], POINT)).toBe(false);
      expect(CairoStruct.is('nope')).toBe(false);
    });
  });

  describe('a struct has no abi type to recognise', () => {
    test('should not offer an isAbiType, unlike every other composite', () => {
      // its abi type is the name the contract chose, which looks like any other type; it is found
      // by exact name in a strategy instead, which is what structStrategy builds
      expect('isAbiType' in CairoStruct).toBe(false);
    });
  });

  describe('structStrategy', () => {
    test('should key one entry per struct, by its abi name', () => {
      const strategy = structStrategy([POINT, LINE]);
      expect(Object.keys(strategy.constructors)).toEqual(['test::Point', 'test::Line']);
      expect(Object.keys(strategy.response)).toEqual(['test::Point', 'test::Line']);
    });

    test('should add no dynamic selector, which would shadow every other type', () => {
      expect(structStrategy([POINT]).dynamicSelectors).toEqual({});
    });

    test('should build and read back through those entries', () => {
      const strategy = structStrategy([POINT]);
      const built = strategy.constructors['test::Point']({ x: 1, y: 2 }, S);
      expect([...built.toApiRequest()]).toEqual(['1', '2']);
      expect(strategy.response['test::Point'](built, S)).toEqual({ x: 1n, y: 2n });
    });
  });

  describe('toApiRequest method', () => {
    test('should carry no length prefix, as a tuple does not', () => {
      expect([...new CairoStruct({ x: 1, y: 2 }, POINT, S).toApiRequest()]).toHaveLength(2);
    });

    test('should flag the result as compiled', () => {
      expect(new CairoStruct({ x: 1, y: 2 }, POINT, S).toApiRequest()).toHaveProperty(
        '__compiled__',
        true
      );
    });
  });

  describe('CallData.compile integration', () => {
    test('should serialize an instance as its members', () => {
      expect(CallData.compile([new CairoStruct({ x: 1, y: 2 }, POINT, S)] as any)).toEqual([
        '1',
        '2',
      ]);
    });
  });

  describe('round-trip consistency', () => {
    test('should survive a serialize then read back cycle', () => {
      const cases: [AbiStruct, any][] = [
        [POINT, { x: 1, y: 2 }],
        [LINE, { a: { x: 1, y: 2 }, b: { x: 3, y: 4 } }],
        [HOLDER, { values: [1, 2, 3], pair: [4, 5] }],
      ];
      cases.forEach(([abi, values]) => {
        const struct = new CairoStruct(values, abi, S);
        const readBack = new CairoStruct(asResponse(struct).values(), abi, S);
        expect(readBack.decompose(S)).toEqual(struct.decompose(S));
      });
    });
  });
});
