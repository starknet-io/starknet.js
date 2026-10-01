import {
  CairoCustomEnum,
  CairoOption,
  CairoOptionVariant,
  CairoResult,
  CairoResultVariant,
  CallData,
} from '../../../src';
import orderPropsByAbi from '../../../src/utils/calldata/propertyOrder';

// the abi lists `x` first, then `y`, in `Point`: each struct below must come back in this order.
const abi = [
  {
    type: 'struct',
    name: 'test::Point',
    members: [
      { name: 'x', type: 'core::integer::u8' },
      { name: 'y', type: 'core::integer::u8' },
    ],
  },
  {
    type: 'struct',
    name: 'test::Holder',
    members: [
      { name: 'p', type: 'test::Point' },
      { name: 'n', type: 'core::integer::u8' },
    ],
  },
  {
    type: 'enum',
    name: 'test::Shape',
    variants: [
      { name: 'Dot', type: 'test::Point' },
      { name: 'Tagged', type: '(core::integer::u8, test::Point)' },
      { name: 'Nothing', type: '()' },
    ],
  },
  {
    type: 'enum',
    name: 'core::result::Result::<test::Point, core::felt252>',
    variants: [
      { name: 'Ok', type: 'test::Point' },
      { name: 'Err', type: 'core::felt252' },
    ],
  },
  {
    type: 'enum',
    name: 'core::result::Result::<core::felt252, test::Point>',
    variants: [
      { name: 'Ok', type: 'core::felt252' },
      { name: 'Err', type: 'test::Point' },
    ],
  },
  {
    type: 'enum',
    name: 'core::result::Result::<test::Point, (core::integer::u8, core::integer::u8)>',
    variants: [
      { name: 'Ok', type: 'test::Point' },
      { name: 'Err', type: '(core::integer::u8, core::integer::u8)' },
    ],
  },
  {
    type: 'enum',
    name: 'core::option::Option::<test::Point>',
    variants: [
      { name: 'Some', type: 'test::Point' },
      { name: 'None', type: '()' },
    ],
  },
];
// the same structs and enums as `new CallData(abi)` reads
const structs = CallData.getAbiStruct(abi);
const enums = CallData.getAbiEnum(abi);

/** Compile `{ v: value }` (the object form) for a function with one parameter `v` of this type. */
const compileNamed = (type: string, value: any) =>
  new CallData([
    ...abi,
    {
      type: 'function',
      name: 'fn',
      inputs: [{ name: 'v', type }],
      outputs: [],
      state_mutability: 'external',
    },
  ]).compile('fn', { v: value });

/** A `Point` written with one property the abi does not declare. */
const pointWithExtra = () => ({ x: 1, y: 2, z: 3 });

// `toEqual` ignores the order of the keys of an object, so the tests compare `Object.entries`:
// an array, where the order matters.
describe('orderPropsByAbi', () => {
  describe('CairoCustomEnum', () => {
    test('a struct in the active variant gets the abi order', () => {
      const ordered = orderPropsByAbi(
        { shape: new CairoCustomEnum({ Dot: { y: 2, x: 1 } }) },
        [{ name: 'shape', type: 'test::Shape' }],
        structs,
        enums
      ) as { shape: CairoCustomEnum };

      expect(Object.entries(ordered.shape.unwrap())).toEqual([
        ['x', 1],
        ['y', 2],
      ]);
    });

    test('a struct inside a tuple of the active variant gets the abi order', () => {
      const ordered = orderPropsByAbi(
        { shape: new CairoCustomEnum({ Tagged: { 0: 7, 1: { y: 2, x: 1 } } }) },
        [{ name: 'shape', type: 'test::Shape' }],
        structs,
        enums
      ) as { shape: CairoCustomEnum };

      expect(Object.entries(ordered.shape.unwrap()[1])).toEqual([
        ['x', 1],
        ['y', 2],
      ]);
    });

    test('a unit variant comes back as it was given', () => {
      const ordered = orderPropsByAbi(
        { shape: new CairoCustomEnum({ Nothing: {} }) },
        [{ name: 'shape', type: 'test::Shape' }],
        structs,
        enums
      ) as { shape: CairoCustomEnum };

      expect(ordered.shape.activeVariant()).toBe('Nothing');
      expect(ordered.shape.unwrap()).toStrictEqual({});
    });

    // not refused here: `CairoTypeCustomEnum` refuses it later, when it builds the value
    test('a variant the abi does not declare comes back as it was given', () => {
      const ordered = orderPropsByAbi(
        { shape: new CairoCustomEnum({ Unknown: { y: 2, x: 1 } }) },
        [{ name: 'shape', type: 'test::Shape' }],
        structs,
        enums
      ) as { shape: CairoCustomEnum };

      expect(ordered.shape.activeVariant()).toBe('Unknown');
      expect(Object.entries(ordered.shape.unwrap())).toEqual([
        ['y', 2],
        ['x', 1],
      ]);
    });
  });

  describe('CairoResult', () => {
    test('a struct in Ok gets the abi order', () => {
      const ordered = orderPropsByAbi(
        { outcome: new CairoResult(CairoResultVariant.Ok, { y: 2, x: 1 }) },
        [{ name: 'outcome', type: 'core::result::Result::<test::Point, core::felt252>' }],
        structs,
        enums
      ) as { outcome: CairoResult<any, any> };

      expect(Object.entries(ordered.outcome.unwrap())).toEqual([
        ['x', 1],
        ['y', 2],
      ]);
    });

    test('a struct in Err gets the abi order', () => {
      const ordered = orderPropsByAbi(
        { outcome: new CairoResult(CairoResultVariant.Err, { y: 2, x: 1 }) },
        [{ name: 'outcome', type: 'core::result::Result::<core::felt252, test::Point>' }],
        structs,
        enums
      ) as { outcome: CairoResult<any, any> };

      expect(Object.entries(ordered.outcome.unwrap())).toEqual([
        ['x', 1],
        ['y', 2],
      ]);
    });

    // the tuple type has its own comma: it must not be taken for the comma between Ok and Err
    test('a struct in Ok gets the abi order when the Err type is a tuple', () => {
      const ordered = orderPropsByAbi(
        { outcome: new CairoResult(CairoResultVariant.Ok, { y: 2, x: 1 }) },
        [
          {
            name: 'outcome',
            type: 'core::result::Result::<test::Point, (core::integer::u8, core::integer::u8)>',
          },
        ],
        structs,
        enums
      ) as { outcome: CairoResult<any, any> };

      expect(Object.entries(ordered.outcome.unwrap())).toEqual([
        ['x', 1],
        ['y', 2],
      ]);
    });

    // an abi written by hand may have no `variants` list. The order is not checked here: the
    // value is put in order later, when it is built.
    test('an abi entry without variants lets the content through', () => {
      const enumsWithoutVariants = CallData.getAbiEnum([
        { type: 'enum', name: 'core::result::Result::<test::Point, core::felt252>' },
      ]);

      const ordered = orderPropsByAbi(
        { outcome: new CairoResult(CairoResultVariant.Ok, { y: 2, x: 1 }) },
        [{ name: 'outcome', type: 'core::result::Result::<test::Point, core::felt252>' }],
        structs,
        enumsWithoutVariants
      ) as { outcome: CairoResult<any, any> };

      expect(ordered.outcome.unwrap()).toEqual({ x: 1, y: 2 });
    });
  });

  describe('CairoOption', () => {
    test('a struct in Some gets the abi order', () => {
      const ordered = orderPropsByAbi(
        { maybe: new CairoOption(CairoOptionVariant.Some, { y: 2, x: 1 }) },
        [{ name: 'maybe', type: 'core::option::Option::<test::Point>' }],
        structs,
        enums
      ) as { maybe: CairoOption<any> };

      expect(Object.entries(ordered.maybe.unwrap())).toEqual([
        ['x', 1],
        ['y', 2],
      ]);
    });
  });

  // the object form ignores a property that the abi does not declare. The array form refuses it:
  // it gives the value directly to the Cairo type classes.
  describe('a property the abi does not declare', () => {
    test('is ignored in the argument itself', () => {
      expect(compileNamed('test::Point', pointWithExtra())).toEqual(['1', '2']);
    });

    test('is ignored in a member of a plain struct', () => {
      expect(compileNamed('test::Holder', { p: pointWithExtra(), n: 9 })).toEqual(['1', '2', '9']);
    });

    test('is ignored in an item of a plain array', () => {
      const type = 'core::array::Array::<test::Point>';
      expect(compileNamed(type, [pointWithExtra()])).toEqual(['1', '1', '2']);
    });

    test('is ignored in the Some of a CairoOption', () => {
      const value = new CairoOption(CairoOptionVariant.Some, pointWithExtra());
      expect(compileNamed('core::option::Option::<test::Point>', value)).toEqual(['0', '1', '2']);
    });

    test('is ignored in the Ok of a CairoResult', () => {
      const value = new CairoResult(CairoResultVariant.Ok, pointWithExtra());
      const type = 'core::result::Result::<test::Point, core::felt252>';
      expect(compileNamed(type, value)).toEqual(['0', '1', '2']);
    });

    test('is ignored in the Ok of a CairoResult whose Err type is a tuple', () => {
      const value = new CairoResult(CairoResultVariant.Ok, pointWithExtra());
      const type = 'core::result::Result::<test::Point, (core::integer::u8, core::integer::u8)>';
      expect(compileNamed(type, value)).toEqual(['0', '1', '2']);
    });

    test('is ignored in the Err of a CairoResult', () => {
      const value = new CairoResult(CairoResultVariant.Err, pointWithExtra());
      const type = 'core::result::Result::<core::felt252, test::Point>';
      expect(compileNamed(type, value)).toEqual(['1', '1', '2']);
    });

    test('is ignored in the active variant of a CairoCustomEnum', () => {
      const value = new CairoCustomEnum({ Dot: pointWithExtra() });
      expect(compileNamed('test::Shape', value)).toEqual(['0', '1', '2']);
    });
  });
});
