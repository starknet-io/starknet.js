import assert from '../assert';
import { addCompiledFlag, isInstanceOf } from '../helpers';
import { getNext } from '../num';
import { getArrayType, isTypeFelt, isTypeNonZero, isTypeUint } from '../calldata/cairo';
import { type ParsingStrategy } from '../calldata/parser/parsingStrategy.type';
import { CairoType } from './cairoType.interface';
import { type AllowArray } from '../../types';
import { CairoUint512 } from './uint512';
import { CairoUint8 } from './uint8';
import { CairoUint16 } from './uint16';
import { CairoUint32 } from './uint32';
import { CairoUint64 } from './uint64';
import { CairoUint96 } from './uint96';
import { CairoUint128 } from './uint128';
import { CairoUint256 } from './uint256';
import { CairoFelt252 } from './felt';

/**
 * Represents a Cairo Non Zero type.
 *
 * Internal usage class (users are using BigNumberish).
 */
export class CairoNonZero extends CairoType {
  static dynamicSelector = 'CairoNonZero' as const;

  public readonly dynamicSelector = CairoNonZero.dynamicSelector;

  /**
   * CairoType instance representing a Cairo dynamic non zero.
   */
  public readonly content: CairoType;

  /**
   * Cairo dynamic type.
   */
  public readonly contentType: string;

  /**
   * Create a CairoNonZero instance.
   *
   * @param {unknown} content - Input data (BigNumberish, Iterator\<string>, CairoType)
   * @param {string} type - Type string (e.g. core::zeroable::NonZero::\<core::integer::u8>)
   * @param {AllowArray<ParsingStrategy>} parsingStrategy - Parsing strategy for element type handling
   * @example
   * ```typescript
   * const val1 = new CairoNonZero(3, 'core::zeroable::NonZero::<core::integer::u8>', hdParsingStrategy);
   * ```
   */
  constructor(content: unknown, type: string, parsingStrategy: AllowArray<ParsingStrategy>) {
    super();
    this.contentType = type;
    const strategies = Array.isArray(parsingStrategy) ? parsingStrategy : [parsingStrategy];
    if (content && typeof content === 'object' && 'next' in content) {
      // "content" is an iterator
      const parsedContent: CairoType = CairoNonZero.parser(
        content as Iterator<string>,
        type,
        strategies
      );
      this.content = parsedContent;
      return;
    }
    if (content instanceof CairoNonZero) {
      this.content = content.content;
      this.contentType = content.contentType;
      return;
    }
    CairoNonZero.validate(content, type);
    const contentType = CairoNonZero.getNonZeroType(type);

    if (content && typeof content === 'object' && content !== null && 'toApiRequest' in content) {
      // "content" is a CairoType
      this.content = content as CairoType;
      return;
    }
    // not an iterator, not an CairoType -> so is low level data (BigNumberish, array, object, Cairo Enums)

    const strategyConstructorNum = strategies.findIndex(
      (strategy: ParsingStrategy) => strategy.constructors[contentType]
    );
    if (strategyConstructorNum >= 0) {
      const constructor = strategies[strategyConstructorNum].constructors[contentType];
      const cairoInstance = constructor(content, strategies, contentType);
      this.validateValue(cairoInstance);
      this.content = cairoInstance;
      return;
    }
    const strategyDynamicNum = strategies.findIndex((strategy: ParsingStrategy) => {
      const dynamicSelectors = Object.entries(strategy.dynamicSelectors);
      return dynamicSelectors.find(([, selectorFn]) => selectorFn(contentType));
    });
    if (strategyDynamicNum >= 0) {
      const dynamicSelectors = Object.entries(strategies[strategyDynamicNum].dynamicSelectors);
      const matchingSelector = dynamicSelectors.find(([, selectorFn]) => selectorFn(contentType));
      const [selectorName] = matchingSelector as [string, (type: string) => boolean];
      const dynamicConstructor = strategies[strategyDynamicNum].constructors[selectorName];
      if (dynamicConstructor) {
        const cairoInstance = dynamicConstructor(content, strategies, contentType);
        this.validateValue(cairoInstance);
        this.content = cairoInstance;
        return;
      }
    }
    throw new Error(`"${contentType}" is not a valid Cairo type`);
  }

  /**
   * Parse data from iterator into CairoType instances using the provided parsing strategy.
   *
   * @param {Iterator<string>} responseIterator - Iterator over string data to parse
   * @param {string} nonZeroType - The dynamic NonZero type (e.g., "core::zeroable::NonZero::\<core::integer::u8>")
   * @param {ParsingStrategy[]} parsingStrategies - The parsing strategy containing constructors and selectors
   * @returns NonZero CairoType instance
   * @private
   */
  private static parser(
    responseIterator: Iterator<string>,
    nonZeroType: string,
    parsingStrategies: ParsingStrategy[]
  ): CairoType {
    const elementType = getArrayType(nonZeroType); // Extract T from core::zeroable::NonZero::<T>

    // First check direct constructors
    const strategyConstructorNum = parsingStrategies.findIndex(
      (strategy: ParsingStrategy) => strategy.constructors[elementType]
    );
    if (strategyConstructorNum >= 0) {
      const constructor = parsingStrategies[strategyConstructorNum].constructors[elementType];
      return constructor(responseIterator, parsingStrategies, elementType);
    }

    // Check dynamic selectors (includes CairoFixedArray, future: tuples, structs, etc.)
    const strategyDynamicNum = parsingStrategies.findIndex((strategy: ParsingStrategy) => {
      const dynamicSelectors = Object.entries(strategy.dynamicSelectors);
      return dynamicSelectors.find(([, selectorFn]) => selectorFn(elementType));
    });
    if (strategyDynamicNum >= 0) {
      const dynamicSelectors = Object.entries(
        parsingStrategies[strategyDynamicNum].dynamicSelectors
      );
      const matchingSelector = dynamicSelectors.find(([, selectorFn]) => selectorFn(elementType));
      const [selectorName] = matchingSelector as [string, (type: string) => boolean];
      const dynamicConstructor = parsingStrategies[strategyDynamicNum].constructors[selectorName];
      if (dynamicConstructor) {
        return dynamicConstructor(responseIterator, parsingStrategies, elementType);
      }
    }
    // Unknown type - collect raw values, defer error
    const rawValues = getNext(responseIterator);
    return rawValues as unknown as CairoType;
  }

  /**
   * Retrieves the Non Zero element type from the given dynamic string.
   * @param {string} type - The Cairo dynamic type.
   * @returns {string} The element type.
   * @example
   * ```typescript
   * const result = CairoNonZero.getNonZeroType("core::zeroable::NonZero::<core::integer::u8>");
   * // result = "core::integer::u8"
   * ```
   */
  static getNonZeroType = (type: string): string => {
    return getArrayType(type);
  };

  /**
   * Validate input data for Cairo Non Zero creation.
   * @param input - Input data to validate
   * @param type - The dynamic type (e.g., "core::zeroable::NonZero::\<core::integer::u8>")
   * @throws Error if input is invalid
   * @example
   * ```typescript
   * CairoArray.validate(1, "core::zeroable::NonZero::<core::integer::u8>"); // passes
   * ```
   */
  static validate(input: unknown, type: string): void {
    // Validate the type format first
    assert(
      CairoNonZero.isAbiType(type),
      `The type ${type} is not a Cairo Non Zero. Needs core::zeroable::NonZero::<T>.`
    );
    // Telegram : https://t.me/sncorestars/11902/45433
    // Author : Ori Ziv (08/apr/2024)
    // "NonZero is only supported for purely numeric types (u*, i* and felt252) and EcPoint."
    //
    // As EcPoint do not includes trait Serde, it can't be seen in an ABI.
    // u512 is not compatible.
    // core::zeroable::NonZero::<i*> seems not to work in Cairo 2.6.3.
    // so, are authorized here : u8, u16, u32, u64, u128, u256 and felt252.
    const baseType = getArrayType(type);
    assert(
      (isTypeUint(baseType) && baseType !== CairoUint512.abiSelector) || isTypeFelt(baseType),
      `Validate: ${baseType} type is not authorized for NonZero type.`
    );
  }

  /**
   * Validate that the CairoType instance has a non-zero value.
   * @param {CairoType} cairoInstance - The CairoType instance to validate
   * @throws Error if the value is zero or type is not authorized
   * @private
   */
  validateValue(cairoInstance: CairoType): void {
    const nonZeroUints = [
      CairoUint8,
      CairoUint16,
      CairoUint32,
      CairoUint64,
      CairoUint96,
      CairoUint128,
      CairoUint256,
      CairoFelt252,
    ];
    if (isInstanceOf(cairoInstance, nonZeroUints)) {
      assert(
        (cairoInstance as CairoType & { toBigInt: Function }).toBigInt() > 0n,
        'ValidateValue: value 0 is not authorized in NonZero type.'
      );
      return;
    }
    throw new Error(`ValidateValue: ${cairoInstance} is not authorized for NonZero type.`);
  }

  /**
   * Check if input data is valid for CairoNonZero creation.
   * @param input - Input data to check
   * @param type - The dynamic type (e.g. "core::zeroable::NonZero::\<core::integer::u8>")
   * @returns true if valid, false otherwise
   * @example
   * ```typescript
   * const isValid1 = CairoArray.is(1, "core::zeroable::NonZero::<core::integer::u8>"); // true
   * ```
   */
  static is(input: unknown, type: string): boolean {
    try {
      CairoNonZero.validate(input, type);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Checks if the given string represents a valid Cairo dynamic Non Zero type format.
   *
   * A valid dynamic type must follow the pattern: `core::zeroable::NonZero::<T>`
   * where T is a restricted list of Cairo types.
   *
   * @param type - The type string to validate
   * @returns `true` if the type is a valid dynamic format, `false` otherwise
   * @example
   * ```typescript
   * CairoArray.isAbiType("core::zeroable::NonZero::<core::integer::u8>");     // true
   * ```
   */
  static isAbiType(type: string): boolean {
    return isTypeNonZero(type);
  }

  /**
   * Serialize the Cairo dynamic NonZero into decimal string for Starknet API requests.
   *
   * @returns {string[]} Array of decimal strings ready for API requests
   * @example
   * ```typescript
   * const dynArray = new CairoNonZero(2, "core::zeroable::NonZero::<core::integer::u8>", strategy);
   * const result = dynArray.toApiRequest(); // ['2']
   * ```
   */
  public toApiRequest(): string[] {
    // Start with array length
    const result = this.content.toApiRequest();
    return addCompiledFlag(result);
  }

  /**
   * Decompose the dynamic NonZero into final parsed value.
   *
   * @param {AllowArray<ParsingStrategy>} strategyDecompose - Parsing strategy for response parsing
   * @returns A value (BigInt)
   * @example
   * ```typescript
   * const dynArray = new CairoNonZero(2, 'core::zeroable::NonZero::<core::integer::u8>', hdParsingStrategy);
   * const parsed = dynArray.decompose(hdParsingStrategy); // 2n
   * ```
   */
  public decompose(strategyDecompose: AllowArray<ParsingStrategy>): any[] {
    // Use response parsers to get final parsed values (for API response parsing)
    const strategies = Array.isArray(strategyDecompose) ? strategyDecompose : [strategyDecompose];
    const elementType = getArrayType(this.contentType);
    // For raw string values (unsupported types), throw error
    if (typeof this.content === 'string') {
      throw new Error(`No parser found for element type: ${elementType} in parsing strategy`);
    }
    let parserName: string = elementType;
    if (this.content instanceof CairoType) {
      if ('dynamicSelector' in this.content) {
        // dynamic recursive CairoType
        parserName = (this.content as any).dynamicSelector;
      }
    }
    const strategyDecomposeNum = strategies.findIndex(
      (strategy: ParsingStrategy) => strategy.response[parserName]
    );
    const responseParser = strategies[strategyDecomposeNum].response[parserName];
    if (responseParser) {
      return responseParser(this.content, strategies);
    }

    throw new Error(
      `No response parser found for element type: ${elementType} in parsing strategy`
    );
  }
}
