import { Abi, AbiEntry, AbiEnums, AbiStructs, EventEntry, FunctionAbi } from '../../../types';
import { findConstructor, findResponseParser } from '../../cairoDataTypes/strategyLookup';
import assert from '../../assert';
import { isUndefined } from '../../typed';
import { getAbiEnum, getAbiStruct } from '../calldataUtils';
import {
  cairoTypeStrategy,
  enumStrategy,
  isCairoTypeStrategy,
  structStrategy,
} from './cairoTypeStrategy';
import type { CairoTypeStrategy } from './cairoTypeStrategy.type';
import { AbiParserInterface } from './interface';
import type { ParsingStrategy } from './parsingStrategy';

/**
 * The abi parser for a flat abi written in Cairo 1 vocabulary.
 *
 * It is chosen when `getAbiVersion` answers 1 : the abi has no `interface` entry, and the first
 * function carrying any input or output declares it with a type containing `::`. Two very
 * different things land here.
 *
 * The first is a genuine **Cairo 1.0 / 1.1 contract**, compiled before the abi format grew its
 * `interface` entry — roughly 2023. Those contracts are still on chain and still callable.
 *
 * The second, and by far the most frequent, is an abi someone **wrote or trimmed by hand** : a
 * couple of functions kept for a `decodeParameters` call, a fixture in a test suite. Such an abi
 * is flat whatever the Cairo version of the contract it came from — so a Cairo 2 contract whose
 * abi has been stripped of its `interface` entry is parsed here, not by {@link AbiParser2}. The
 * class is picked on the **shape of the abi**, never on the contract behind it, which is why this
 * one stays busy rather than being a legacy path.
 *
 * What separates it from {@link AbiParser2} is only that shape : where to find a method, and how
 * to flatten the abi. Both speak the same Cairo 1 types, and both are meant to serialize them the
 * same way. {@link AbiParser0} is the one that is genuinely apart.
 * @example
 * ```typescript
 * const abi = [
 *   {
 *     type: 'function',
 *     name: 'get_balance',
 *     inputs: [],
 *     outputs: [{ type: 'core::integer::u256' }],
 *     state_mutability: 'view',
 *   },
 * ];
 * const parser = new AbiParser1(abi);
 * const result = parser.getMethod('get_balance')?.name;
 * // result = "get_balance"
 * ```
 */
export class AbiParser1 implements AbiParserInterface {
  abi: Abi;

  /** The structs the abi declares, read once here rather than at every field. */
  protected readonly structs: AbiStructs;

  /** The enums the abi declares, `core::bool` excepted. */
  protected readonly enums: AbiEnums;

  /**
   * The strategies driving the Cairo type classes, searched in order.
   *
   * The language's own types come first, then the contract's : a struct and a custom enum have no
   * shape to recognize, their abi type being the name the contract chose, so each is registered
   * under that exact name in a strategy built from the abi that declares it.
   */
  parsingStrategies: CairoTypeStrategy[];

  constructor(abi: Abi, parsingStrategy?: ParsingStrategy | CairoTypeStrategy) {
    this.abi = abi;
    this.structs = getAbiStruct(abi);
    this.enums = getAbiEnum(abi);
    // Said rather than ignored: `hdParsingStrategy` and `fastParsingStrategy` are the shape that
    // predates the Cairo type classes, and they now serve Cairo 0 alone. Handed one here, this
    // parser could only drop it and use its own default, which would silently undo whatever the
    // caller meant by passing it.
    assert(
      isUndefined(parsingStrategy) || isCairoTypeStrategy(parsingStrategy),
      'This abi is parsed by the Cairo type classes, which need a CairoTypeStrategy. `hdParsingStrategy` and `fastParsingStrategy` only serve a Cairo 0 abi — use `cairoTypeStrategy` or `fastCairoTypeStrategy`.'
    );
    const base = parsingStrategy ?? cairoTypeStrategy;
    // A name registered here is a direct key, and a direct key always wins over a dynamic
    // selector. So whatever the base strategy can already build has to be left out — an abi
    // declares `Span` as a struct, and registering it would have it read member by member
    // instead of as the array it is. The same guard covers ByteArray, u256, u512, EthAddress,
    // and whichever class comes next.
    const known = (name: string) => findConstructor([base], name) !== undefined;
    this.parsingStrategies = [
      base,
      structStrategy(Object.values(this.structs).filter((struct) => !known(struct.name))),
      enumStrategy(Object.values(this.enums).filter((abiEnum) => !known(abiEnum.name))),
    ];
  }

  /**
   * Check the arguments of a method before any of them is serialized — which here is nothing.
   *
   * The Cairo type classes refuse what does not fit as they build it, so the check and the
   * serialization are the same pass. Running one beforehand would build every argument twice and
   * raise on the first of the two, with the same message.
   *
   * `CallData.validate`, whose whole purpose is to check without producing calldata, does so by
   * compiling and discarding the result.
   * @example
   * ```typescript
   * const method = {
   *   type: 'function',
   *   name: 'f',
   *   inputs: [{ name: 'x', type: 'core::integer::u8' }],
   *   outputs: [],
   *   state_mutability: 'view',
   * };
   * new AbiParser1(abi).validateRequestFields(method, [300]);
   * // returns, although 300 does not fit a u8: it is `compile` that refuses it
   * ```
   */
  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
  public validateRequestFields(_abiMethod: FunctionAbi, _args: any[]): void {}

  /**
   * Serialize one argument to the felts a contract call carries.
   *
   * The abi entry is passed whole rather than just its type, because the error messages name the
   * field : `ABI expected parameter tokens to be array, got abc`.
   * @param {unknown} value the argument to serialize
   * @param {AbiEntry} input the abi entry this argument stands for
   * @returns {string | string[]} the felts, one string for a single-felt type
   * @throws {Error} when the value does not fit the declared type
   * @example
   * ```typescript
   * const parser = new AbiParser1(abi);
   * const result = parser.parseRequestField(44, { name: 'x', type: 'core::integer::u8' });
   * // result = ["44"]
   * ```
   */
  public parseRequestField(value: unknown, input: AbiEntry): string | string[] {
    const build = findConstructor(this.parsingStrategies, input.type);
    if (!build) {
      throw new Error(`Parser for ${input.type} not found`);
    }
    return build(value, this.parsingStrategies, input.type).toApiRequest();
  }

  /**
   * Read one value off a contract response, advancing the iterator past it.
   *
   * The `parsedResult` the interface allows is not taken : it exists for a Cairo 0 array, whose
   * length is a separate output read just before it. A Cairo 1 array carries its own.
   * @param {Iterator<string>} responseIterator the response felts, positioned on this value
   * @param {AbiEntry | EventEntry} output the abi entry describing what to read
   * @returns {any} the value, as the plain JS type the caller reads
   * @example
   * ```typescript
   * const parser = new AbiParser1(abi);
   * const response = ['0x2c'].values();
   * const result = parser.parseResponse(response, { name: 'x', type: 'core::integer::u8' });
   * // result = 44n
   * ```
   */
  public parseResponse(responseIterator: Iterator<string>, output: AbiEntry | EventEntry): any {
    const build = findConstructor(this.parsingStrategies, output.type);
    if (!build) {
      throw new Error(`Parser for ${output.type} not found`);
    }
    const instance = build(responseIterator, this.parsingStrategies, output.type);
    // a composite is read back by whatever built it, which its `dynamicSelector` names; a leaf by
    // its own abi type, there being one entry per type
    const parserName =
      'dynamicSelector' in instance
        ? (instance as { dynamicSelector: string }).dynamicSelector
        : output.type;
    const read = findResponseParser(this.parsingStrategies, parserName);
    if (!read) {
      throw new Error(`Parser for ${parserName} not found`);
    }
    return read(instance, this.parsingStrategies);
  }

  /**
   * How many arguments a caller has to provide for this method.
   *
   * Every input is one argument. The `_len` inputs a Cairo 0 array is declared with used to be
   * discounted here, back when this class served a Cairo 0 abi too; {@link AbiParser0} took that
   * over when it was split off, and a Cairo 1 array is one input carrying its own length.
   * @param {FunctionAbi} abiMethod the method to measure
   * @returns {number} the number of arguments expected
   * @example
   * ```typescript
   * const method = {
   *   type: 'function',
   *   name: 'transfer',
   *   inputs: [
   *     { name: 'to', type: 'core::starknet::contract_address::ContractAddress' },
   *     { name: 'amount', type: 'core::integer::u256' },
   *   ],
   *   outputs: [],
   *   state_mutability: 'external',
   * };
   * const result = new AbiParser1(abi).methodInputsLength(method);
   * // result = 2
   * ```
   */
  public methodInputsLength(abiMethod: FunctionAbi) {
    return abiMethod.inputs.length;
  }

  /**
   * get method definition from abi
   * @param name string
   * @returns FunctionAbi | undefined
   */
  public getMethod(name: string): FunctionAbi | undefined {
    return this.abi.find((it) => it.name === name);
  }

  /**
   * Get Abi in legacy format
   * @returns Abi
   */
  public getLegacyFormat() {
    return this.abi;
  }
}
