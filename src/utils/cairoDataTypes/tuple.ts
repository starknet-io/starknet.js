import type { AllowArray } from '../../types';
import assert from '../assert';
import { isCairo1Type, isTypeTuple } from '../calldata/cairo';
import extractTupleMemberTypes from '../calldata/tuple';
import type { CairoTypeStrategy } from '../calldata/parser/cairoTypeStrategy.type';
import { addCompiledFlag } from '../helpers';
import { CairoFelt252 } from './felt';
import { isCairoType, type CairoType } from './cairoType.interface';
import { findConstructor, findResponseParser } from './strategyLookup';

/** One member of a tuple type: a bare type, or a name and a type for a Cairo 0 named tuple. */
type TupleMember = string | { name: string; type: string };

/** The type a member stands for, whether or not it carries a name. */
const memberType = (member: TupleMember): string =>
  typeof member === 'string' ? member : member.type;

/**
 * A Cairo tuple : a fixed sequence of values, each of its own type.
 *
 * Its abi type is written `(type1, type2)`, and Cairo 0 also allows naming the members,
 * `(x: felt, y: felt)`. On the wire a tuple is just its members one after the other — unlike an
 * array it carries no length, because its shape is entirely in its type.
 *
 * A tuple holds its members as {@link CairoType} instances rather than as raw values, so a tuple
 * of tuples serializes in one pass : each member is asked for its own felts.
 * @example
 * ```typescript
 * const tuple = new CairoTuple([1, 2], '(core::integer::u8, core::integer::u32)', cairoTypeStrategy);
 * tuple.toApiRequest(); //                  ["1", "2"]     no length prefix
 * tuple.decompose(cairoTypeStrategy); //    { '0': 1n, '1': 2n }
 * ```
 */
export class CairoTuple {
  /**
   * The name this class is registered under in a strategy's `dynamicSelectors`.
   *
   * A tuple type is a shape rather than one string, so it cannot be a key of `constructors` the
   * way `core::integer::u8` is : the selector recognizes the shape, and this names what to build.
   * @example
   * ```typescript
   * const result = CairoTuple.dynamicSelector;
   * // result = "CairoTuple"
   * ```
   */
  static dynamicSelector = 'CairoTuple' as const;

  /**
   * The selector on the instance, which is how a composite holding it knows what built it.
   * @example
   * ```typescript
   * const tuple = new CairoTuple([1], '(core::integer::u8)', cairoTypeStrategy);
   * const result = tuple.dynamicSelector;
   * // result = "CairoTuple"
   * ```
   */
  public readonly dynamicSelector = CairoTuple.dynamicSelector;

  /**
   * The members, each already built as the Cairo type its position declares.
   * @example
   * ```typescript
   * const tuple = new CairoTuple([1, 2], '(core::integer::u8, core::integer::u32)', cairoTypeStrategy);
   * const result = tuple.content.length;
   * // result = 2
   * ```
   */
  public readonly content: CairoType[];

  /**
   * The abi type this tuple was built for.
   * @example
   * ```typescript
   * const tuple = new CairoTuple([1, 2], '(core::integer::u8, core::integer::u32)', cairoTypeStrategy);
   * const result = tuple.tupleType;
   * // result = "(core::integer::u8, core::integer::u32)"
   * ```
   */
  public readonly tupleType: string;

  /**
   * Build a tuple, from values a caller passed or from the felts of a response.
   *
   * The three inputs a member can take are all accepted : a raw value, which the strategy turns
   * into the type its position declares; an instance already built, which is taken as it stands;
   * and the response iterator, which is read member by member.
   *
   * A named Cairo 0 tuple also accepts an object keyed by those names, and any tuple accepts one
   * keyed by position — `{ 0: 1, 1: 2 }` says what `[1, 2]` says.
   * @param {unknown} content the members, as an array, an object, or the response iterator
   * @param {string} tupleType the abi type, `(type1, type2)`
   * @param {AllowArray<CairoTypeStrategy>} parsingStrategy how to build each member
   * @throws {Error} when the type is not a tuple, when the member count does not match, or when a
   * member type no strategy knows is met
   * @example
   * ```typescript
   * const fromArray = new CairoTuple([1, 2], '(core::integer::u8, core::integer::u32)', cairoTypeStrategy);
   * fromArray.toApiRequest(); // ["1", "2"]
   *
   * const fromResponse = new CairoTuple(
   *   ['0x1', '0x2'].values(),
   *   '(core::integer::u8, core::integer::u32)',
   *   cairoTypeStrategy
   * );
   * fromResponse.toApiRequest(); // ["1", "2"]
   * ```
   */
  constructor(content: unknown, tupleType: string, parsingStrategy: AllowArray<CairoTypeStrategy>) {
    this.tupleType = tupleType;
    const strategies = Array.isArray(parsingStrategy) ? parsingStrategy : [parsingStrategy];

    if (content && typeof content === 'object' && 'next' in content) {
      this.content = CairoTuple.parser(content as Iterator<string>, tupleType, strategies);
      return;
    }
    if (content instanceof CairoTuple) {
      this.content = content.content;
      this.tupleType = content.tupleType;
      return;
    }

    CairoTuple.validate(content, tupleType);
    const memberTypes = CairoTuple.getTupleElementTypes(tupleType).map(memberType);
    const values = CairoTuple.extractValuesArray(content, tupleType);
    assert(
      values.length === memberTypes.length,
      `ABI type ${tupleType}: expected ${memberTypes.length} items, got ${values.length} items.`
    );

    this.content = values.map((value, index) => {
      if (isCairoType(value)) {
        return value;
      }
      const build = findConstructor(strategies, memberTypes[index]);
      if (!build) {
        throw new Error(`"${memberTypes[index]}" is not a valid Cairo type`);
      }
      return build(value, strategies, memberTypes[index]);
    });
  }

  /**
   * Read a tuple off a response, one member after another.
   *
   * Nothing marks where a tuple ends on the wire, so the type is what says how many felts to
   * take : each member consumes what it needs and leaves the iterator on the next one. A member
   * type no strategy knows is read as a felt252 rather than guessed at.
   * @param {Iterator<string>} responseIterator the response felts, positioned on this tuple
   * @param {string} tupleType the abi type, `(type1, type2)`
   * @param {CairoTypeStrategy[]} strategies how to build each member
   * @returns {CairoType[]} the members that were read
   * @example
   * ```typescript
   * // called from the constructor when it is handed an iterator
   * const tuple = new CairoTuple(
   *   ['0x1', '0x2'].values(),
   *   '(core::integer::u8, core::integer::u32)',
   *   cairoTypeStrategy
   * );
   * tuple.toApiRequest();
   * // ["1", "2"]
   * ```
   */
  private static parser(
    responseIterator: Iterator<string>,
    tupleType: string,
    strategies: CairoTypeStrategy[]
  ): CairoType[] {
    return CairoTuple.getTupleElementTypes(tupleType)
      .map(memberType)
      .map((type) => {
        const build =
          findConstructor(strategies, type) ??
          findConstructor(strategies, CairoFelt252.abiSelector);
        if (!build) {
          throw new Error(`No parser found for element type: ${type} in parsing strategy`);
        }
        return build(responseIterator, strategies, type);
      });
  }

  /**
   * Line the members up in the order the type declares, whatever shape the input took.
   *
   * An array is already in order. An object is read by the member names for a named tuple, and by
   * position otherwise — `{ 0: 1, 1: 2 }` and `{ a: 1, b: 2 }` both give `[1, 2]`, the second one
   * relying on the insertion order JavaScript keeps for string keys.
   * @param {unknown} input the members, as an array or an object
   * @param {string} tupleType the abi type, which names the members of a Cairo 0 named tuple
   * @returns {any[]} the members in the order the type declares
   * @example
   * ```typescript
   * // called from the constructor
   * const byPosition = new CairoTuple({ 0: 1, 1: 2 }, '(core::integer::u8, core::integer::u32)', cairoTypeStrategy);
   * byPosition.toApiRequest();
   * // ["1", "2"]
   * ```
   */
  private static extractValuesArray(input: unknown, tupleType: string): any[] {
    if (Array.isArray(input)) {
      return input;
    }
    const inputObject = input as Record<string, any>;
    const members = CairoTuple.getTupleElementTypes(tupleType);

    const named = members.filter((member) => typeof member === 'object') as {
      name: string;
      type: string;
    }[];
    if (named.length === members.length && named.every((member) => member.name in inputObject)) {
      return named.map((member) => inputObject[member.name]);
    }

    const keys = Object.keys(inputObject);
    if (keys.length > 0 && keys.every((key) => /^\d+$/.test(key))) {
      return keys
        .sort((left, right) => Number(left) - Number(right))
        .map((key) => inputObject[key]);
    }
    return Object.values(inputObject);
  }

  /**
   * Split a tuple type into its members.
   *
   * The reading itself is done by the tuple parser the request and response parsers already
   * share, so both worlds see the same members. Only the empty tuple is handled here : that
   * parser answers `['']` for `()` in the Cairo 0 form, which would stand for one member rather
   * than none.
   * @param {string} tupleType the abi type to split
   * @returns {TupleMember[]} the members, named ones as `{ name, type }`
   * A Cairo 1 type is also checked for having survived the split : the members are put back
   * together and compared to what came in. That parser walks the string assuming members are
   * separated by `', '`, so a comma without its space makes it eat the next character and hand
   * back a member type that does not exist — silently. Recomposing catches exactly that, and
   * nothing else : a nested `Result::<u8,u8>` is read by bracket matching rather than by commas,
   * comes back whole, and is left alone.
   *
   * Cairo 0 has no such check, and needs none : every space is stripped before that type is
   * split, so there is nothing to compare against.
   * @param {string} tupleType the abi type to split
   * @returns {TupleMember[]} the members, named ones as `{ name, type }`
   * @throws {Error} when a Cairo 1 tuple type does not survive being split and put back together
   * @example
   * ```typescript
   * const result = CairoTuple.getTupleElementTypes('(core::integer::u8, core::integer::u32)');
   * // result = ["core::integer::u8", "core::integer::u32"]
   * const result2 = CairoTuple.getTupleElementTypes('(x:felt, y:felt)');
   * // result2 = [{ name: "x", type: "felt" }, { name: "y", type: "felt" }]
   * const result3 = CairoTuple.getTupleElementTypes('()');
   * // result3 = []
   * CairoTuple.getTupleElementTypes('(core::integer::u8,core::integer::u32)');
   * // throws Error('"(core::integer::u8,core::integer::u32)" is not a valid Cairo type
   * //              (its members do not recompose it, usually a missing space after a comma)')
   * ```
   */
  static getTupleElementTypes(tupleType: string): TupleMember[] {
    if (tupleType.replace(/\s/g, '') === '()') {
      return [];
    }
    const members = extractTupleMemberTypes(tupleType) as TupleMember[];
    if (isCairo1Type(tupleType) && `(${members.join(', ')})` !== tupleType) {
      throw new Error(
        `"${tupleType}" is not a valid Cairo type (its members do not recompose it, usually a missing space after a comma)`
      );
    }
    return members;
  }

  /**
   * The names of the members, or their positions when the tuple does not name them.
   * @param {string} type the abi type to read
   * @returns {string[]} one name per member
   * @example
   * ```typescript
   * const result = CairoTuple.extractTupleMembersNames('(core::integer::u8, core::integer::u32)');
   * // result = ["0", "1"]
   * const result2 = CairoTuple.extractTupleMembersNames('(x:felt, y:felt)');
   * // result2 = ["x", "y"]
   * ```
   */
  static extractTupleMembersNames(type: string): string[] {
    return CairoTuple.getTupleElementTypes(type).map((member, index) =>
      typeof member === 'string' ? index.toString() : member.name
    );
  }

  /**
   * Throw unless this input can be read as a tuple of this type.
   *
   * Only the shape is checked here — a tuple type, and members given as a list or an object. What
   * each member is worth is the business of the class its position declares, and is checked when
   * that member is built.
   * @param {unknown} input the members to check
   * @param {string} tupleType the abi type they are meant for
   * @throws {Error} when the type is not a tuple, or the input is neither an array nor an object
   * @example
   * ```typescript
   * CairoTuple.validate([1, 2], '(core::integer::u8, core::integer::u32)'); // passes
   * CairoTuple.validate([1, 2], 'core::integer::u8');
   * // throws Error("The type core::integer::u8 is not a Cairo tuple. Expected format: (type1, type2, ...)")
   * ```
   */
  static validate(input: unknown, tupleType: string): void {
    assert(
      CairoTuple.isAbiType(tupleType),
      `The type ${tupleType} is not a Cairo tuple. Expected format: (type1, type2, ...)`
    );
    assert(
      Array.isArray(input) || (typeof input === 'object' && input !== null),
      `Invalid input: expected Array or Object, got ${typeof input}`
    );
  }

  /**
   * Can this input be read as a tuple of this type?
   *
   * The non-throwing form of {@link CairoTuple.validate}.
   * @param {unknown} input the members to test
   * @param {string} tupleType the abi type they are meant for
   * @returns {boolean} true when the shape fits
   * @example
   * ```typescript
   * const result = CairoTuple.is([1, 2], '(core::integer::u8, core::integer::u32)');
   * // result = true
   * const result2 = CairoTuple.is('nope', '(core::integer::u8, core::integer::u32)');
   * // result2 = false
   * ```
   */
  static is(input: unknown, tupleType: string): boolean {
    try {
      CairoTuple.validate(input, tupleType);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Is this abi type a tuple?
   * @param {string} type the abi type to test
   * @returns {boolean} true for `(type1, type2)`, named or not, nested or not
   * @example
   * ```typescript
   * const result = CairoTuple.isAbiType('(core::integer::u8, core::integer::u32)');
   * // result = true
   * const result2 = CairoTuple.isAbiType('core::integer::u32');
   * // result2 = false
   * ```
   */
  static isAbiType(type: string): boolean {
    return isTypeTuple(type);
  }

  /**
   * Serialize to the felts a contract call carries.
   *
   * The members follow one another with nothing in front : a tuple carries no length, since its
   * type already says how many members it has and what each of them is.
   * @returns {string[]} the members' felts, in order, flagged as compiled
   * @example
   * ```typescript
   * const tuple = new CairoTuple([1, 2], '(core::integer::u8, core::integer::u32)', cairoTypeStrategy);
   * const result = tuple.toApiRequest();
   * // result = ["1", "2"]
   * ```
   */
  public toApiRequest(): string[] {
    return addCompiledFlag(this.content.flatMap((member) => member.toApiRequest()));
  }

  /**
   * Turn a list into the object `CallData.compile` reads a tuple from.
   * @param {Array<any>} input the members, in order
   * @returns {Object} the members keyed by position
   * @example
   * ```typescript
   * const result = CairoTuple.compile([10, 20, 30]);
   * // result = { '0': 10, '1': 20, '2': 30 }
   * ```
   */
  static compile(input: Array<any>): Object {
    return input.reduce((acc: any, item: any, index: number) => {
      acc[index] = item;
      return acc;
    }, {});
  }

  /**
   * Read the tuple back as the plain values a caller reads.
   *
   * Each member is handed to the strategy entry for its type — or for what built it, when that is
   * a composite, which is what its `dynamicSelector` says. The result is keyed by member name for
   * a Cairo 0 named tuple, and by position otherwise.
   * @param {AllowArray<CairoTypeStrategy>} strategyDecompose how to read each member back
   * @returns {Object} the members' values, keyed by name or by position
   * @throws {Error} when no strategy can read a member back
   * @example
   * ```typescript
   * const tuple = new CairoTuple([1, 2], '(core::integer::u8, core::integer::u32)', cairoTypeStrategy);
   * const result = tuple.decompose(cairoTypeStrategy);
   * // result = { '0': 1n, '1': 2n }
   * ```
   */
  public decompose(strategyDecompose: AllowArray<CairoTypeStrategy>): Object {
    const strategies = Array.isArray(strategyDecompose) ? strategyDecompose : [strategyDecompose];
    const members = CairoTuple.getTupleElementTypes(this.tupleType);
    const names = CairoTuple.extractTupleMembersNames(this.tupleType);

    const values = this.content.map((member, index) => {
      const parserName =
        'dynamicSelector' in member
          ? (member as { dynamicSelector: string }).dynamicSelector
          : memberType(members[index]);
      const read = findResponseParser(strategies, parserName);
      if (!read) {
        throw new Error(
          `No response parser found for element type: ${parserName} in parsing strategy`
        );
      }
      return read(member, strategies);
    });

    return Object.fromEntries(names.map((name, index) => [name, values[index]]));
  }
}
