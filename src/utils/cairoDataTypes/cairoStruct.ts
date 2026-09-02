import type { AbiStruct, AllowArray } from '../../types';
import assert from '../assert';
import { isCairo1Type, isLen } from '../calldata/cairo';
import type { CairoTypeStrategy } from '../calldata/parser/cairoTypeStrategy.type';
import { addCompiledFlag } from '../helpers';
import { isCairoType, type CairoType } from './cairoType.interface';
import { findConstructor, findResponseParser } from './strategyLookup';

/**
 * A Cairo struct : a fixed set of named members, each of its own type.
 *
 * Unlike a tuple or an array, a struct has no shape to recognize — its abi type is just the name
 * the contract gave it, `my_contract::Point`, which looks like any other type. So there is no
 * `isAbiType` here : a struct is found by its exact name among a strategy's constructors, and the
 * strategy that carries those names is built from the abi that declares them.
 *
 * On the wire a struct is its members one after another, with nothing in front — its shape is
 * entirely in the abi, exactly as a tuple's is in its type.
 * @example
 * ```typescript
 * const point: AbiStruct = {
 *   type: 'struct',
 *   name: 'test::Point',
 *   members: [
 *     { name: 'x', type: 'core::integer::u8' },
 *     { name: 'y', type: 'core::integer::u32' },
 *   ],
 * };
 * const strategies = [cairoTypeStrategy, structStrategy([point])];
 * const struct = new CairoStruct({ x: 1, y: 2 }, point, strategies);
 * struct.toApiRequest(); //          ["1", "2"]
 * struct.decompose(strategies); //   { x: 1n, y: 2n }
 * ```
 */
export class CairoStruct {
  /**
   * The name this struct is registered under, which is the name the abi gave it.
   *
   * Every other composite has one selector for the whole class; a struct has one per struct, so
   * this is set from the abi rather than declared on the class.
   * @example
   * ```typescript
   * const struct = new CairoStruct({ x: 1, y: 2 }, point, strategies);
   * const result = struct.dynamicSelector;
   * // result = "test::Point"
   * ```
   */
  public readonly dynamicSelector: string;

  /**
   * The members, each already built as the type the abi declares for it.
   * @example
   * ```typescript
   * const result = new CairoStruct({ x: 1, y: 2 }, point, strategies).content.length;
   * // result = 2
   * ```
   */
  public readonly content: CairoType[];

  /**
   * The abi definition this struct was built from.
   * @example
   * ```typescript
   * const result = new CairoStruct({ x: 1, y: 2 }, point, strategies).abiStruct.name;
   * // result = "test::Point"
   * ```
   */
  public readonly abiStruct: AbiStruct;

  /**
   * Build a struct, from values a caller passed or from the felts of a response.
   *
   * An object is read by the member names the abi declares, in the abi's order — so the order the
   * caller wrote them in does not matter. An array is taken as already being in that order.
   * @param {unknown} content the members, as an object, an array, or the response iterator
   * @param {AbiStruct} abiStruct the abi definition of this struct
   * @param {AllowArray<CairoTypeStrategy>} parsingStrategy how to build each member, which must
   * carry this struct's own name for a struct that holds another
   * @throws {Error} when a member is missing, when the count does not match, or when a member
   * type no strategy knows is met
   * @example
   * ```typescript
   * new CairoStruct({ x: 1, y: 2 }, point, strategies).toApiRequest(); // ["1", "2"]
   * new CairoStruct({ y: 2, x: 1 }, point, strategies).toApiRequest(); // ["1", "2"]  abi order
   * new CairoStruct([1, 2], point, strategies).toApiRequest(); //        ["1", "2"]
   * ```
   */
  constructor(
    content: unknown,
    abiStruct: AbiStruct,
    parsingStrategy: AllowArray<CairoTypeStrategy>
  ) {
    this.abiStruct = abiStruct;
    this.dynamicSelector = abiStruct.name;
    const strategies = Array.isArray(parsingStrategy) ? parsingStrategy : [parsingStrategy];

    if (content && typeof content === 'object' && 'next' in content) {
      this.content = CairoStruct.parser(content as Iterator<string>, abiStruct, strategies);
      return;
    }
    if (content instanceof CairoStruct) {
      this.content = content.content;
      this.abiStruct = content.abiStruct;
      this.dynamicSelector = content.dynamicSelector;
      return;
    }

    CairoStruct.validate(content, abiStruct);
    const memberTypes = CairoStruct.getStructMembersTypes(abiStruct);
    this.content = CairoStruct.extractValuesArray(content, abiStruct).map((value, index) => {
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
   * Read a struct off a response, one member after another.
   *
   * Nothing marks where a struct ends on the wire, so the abi is what says how many felts to take
   * and what each of them is.
   * @param {Iterator<string>} responseIterator the response felts, positioned on this struct
   * @param {AbiStruct} abiStruct the abi definition of this struct
   * @param {CairoTypeStrategy[]} strategies how to build each member
   * @returns {CairoType[]} the members that were read
   * @throws {Error} when a member type is one no strategy knows
   * @example
   * ```typescript
   * // called from the constructor when it is handed an iterator
   * const struct = new CairoStruct(['0x1', '0x2'].values(), point, strategies);
   * struct.decompose(strategies);
   * // { x: 1n, y: 2n }
   * ```
   */
  private static parser(
    responseIterator: Iterator<string>,
    abiStruct: AbiStruct,
    strategies: CairoTypeStrategy[]
  ): CairoType[] {
    return CairoStruct.getStructMembersTypes(abiStruct).map((memberType) => {
      const build = findConstructor(strategies, memberType);
      if (!build) {
        throw new Error(`No parser found for element type: ${memberType} in parsing strategy`);
      }
      return build(responseIterator, strategies, memberType);
    });
  }

  /**
   * Line the members up in the order the abi declares, whatever shape the input took.
   *
   * An array is already in that order. An object is read member by member, and one that is
   * missing raises — except a Cairo 0 length member, which a contract derives rather than
   * receives.
   * @param {unknown} input the members, as an array or an object
   * @param {AbiStruct} abiStruct the abi definition, which gives the names and their order
   * @returns {any[]} the members in the abi's order
   * @throws {Error} when the object has no property for a member the abi declares
   * @example
   * ```typescript
   * // called from the constructor
   * new CairoStruct({ y: 2, x: 1 }, point, strategies).toApiRequest();
   * // ["1", "2"]     read in the abi's order, not the object's
   * ```
   */
  private static extractValuesArray(input: unknown, abiStruct: AbiStruct): any[] {
    if (Array.isArray(input)) {
      return input;
    }
    const inputObject = input as Record<string, any>;
    return abiStruct.members.map((member) => {
      const missing = typeof inputObject[member.name] === 'undefined';
      if (missing && (isCairo1Type(member.type) || !isLen(member.name))) {
        throw new Error(`Your object needs a property with key : ${member.name} .`);
      }
      return inputObject[member.name];
    });
  }

  /**
   * The types of the members, in the abi's order.
   * @param {AbiStruct} abiStruct the abi definition to read
   * @returns {string[]} one type per member
   * @example
   * ```typescript
   * const result = CairoStruct.getStructMembersTypes(point);
   * // result = ["core::integer::u8", "core::integer::u32"]
   * ```
   */
  static getStructMembersTypes(abiStruct: AbiStruct): string[] {
    return abiStruct.members.map((member) => member.type);
  }

  /**
   * The names of the members, in the abi's order.
   * @param {AbiStruct} abiStruct the abi definition to read
   * @returns {string[]} one name per member
   * @example
   * ```typescript
   * const result = CairoStruct.extractStructMembersNames(point);
   * // result = ["x", "y"]
   * ```
   */
  static extractStructMembersNames(abiStruct: AbiStruct): string[] {
    return abiStruct.members.map((member) => member.name);
  }

  /**
   * Throw unless this input can be read as this struct.
   *
   * Given an abi, the member count is checked too : a struct is a fixed set, so a list of the
   * wrong size is refused rather than padded or cut. Without one, only the shape is checked.
   * @param {unknown} input the members to check
   * @param {AbiStruct} [abiStruct] the abi definition, when there is one to check against
   * @throws {Error} when the input is neither an array nor an object, when the abi is not a
   * struct, or when the member count does not match
   * @example
   * ```typescript
   * CairoStruct.validate({ x: 1, y: 2 }, point); // passes
   * CairoStruct.validate([1], point);
   * // throws Error("Invalid input: expected 2 members, got 1")
   * ```
   */
  static validate(input: unknown, abiStruct?: AbiStruct): void {
    assert(
      Array.isArray(input) || (typeof input === 'object' && input !== null),
      `Invalid input: expected Array or Object, got ${typeof input}`
    );
    if (!abiStruct) {
      return;
    }
    assert(abiStruct.type === 'struct', `Invalid ABI: expected struct, got ${abiStruct.type}`);
    const count = Array.isArray(input) ? input.length : Object.keys(input).length;
    assert(
      abiStruct.members.length === count,
      `Invalid input: expected ${abiStruct.members.length} members, got ${count}`
    );
  }

  /**
   * Can this input be read as this struct?
   *
   * The non-throwing form of {@link CairoStruct.validate}.
   * @param {unknown} input the members to test
   * @param {AbiStruct} [abiStruct] the abi definition, when there is one to check against
   * @returns {boolean} true when the shape fits
   * @example
   * ```typescript
   * const result = CairoStruct.is({ x: 1, y: 2 }, point);
   * // result = true
   * const result2 = CairoStruct.is([1], point);
   * // result2 = false     (one member short)
   * ```
   */
  static is(input: unknown, abiStruct?: AbiStruct): boolean {
    try {
      CairoStruct.validate(input, abiStruct);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Serialize to the felts a contract call carries.
   *
   * The members follow one another with nothing in front, as a tuple's do : what a struct holds
   * is said by the abi, not by the calldata.
   * @returns {string[]} the members' felts, in the abi's order, flagged as compiled
   * @example
   * ```typescript
   * const result = new CairoStruct({ x: 1, y: 2 }, point, strategies).toApiRequest();
   * // result = ["1", "2"]
   * ```
   */
  public toApiRequest(): string[] {
    return addCompiledFlag(this.content.flatMap((member) => member.toApiRequest()));
  }

  /**
   * Read the struct back as the plain object a caller reads.
   *
   * Each member is handed to the strategy entry for its type — or for what built it, when that is
   * a composite, which is what its `dynamicSelector` says. The result is keyed by member name.
   * @param {AllowArray<CairoTypeStrategy>} strategyDecompose how to read each member back
   * @returns {Object} the members' values, keyed by name
   * @throws {Error} when no strategy can read a member back
   * @example
   * ```typescript
   * const result = new CairoStruct({ x: 1, y: 2 }, point, strategies).decompose(strategies);
   * // result = { x: 1n, y: 2n }
   * ```
   */
  public decompose(strategyDecompose: AllowArray<CairoTypeStrategy>): Object {
    const strategies = Array.isArray(strategyDecompose) ? strategyDecompose : [strategyDecompose];
    const memberTypes = CairoStruct.getStructMembersTypes(this.abiStruct);
    const names = CairoStruct.extractStructMembersNames(this.abiStruct);

    const values = this.content.map((member, index) => {
      const parserName =
        'dynamicSelector' in member
          ? (member as { dynamicSelector: string }).dynamicSelector
          : memberTypes[index];
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
