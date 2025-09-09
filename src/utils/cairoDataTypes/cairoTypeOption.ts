import assert from '../assert';
import { addCompiledFlag } from '../helpers';
import { getNext } from '../num';
import { type ParsingStrategy, type VariantType } from '../calldata/parser/parsingStrategy';
import { CairoType } from './cairoType.interface';
import { isTypeOption } from '../calldata/cairo';
import { isUndefined } from '../typed';
import { CairoOptionVariant, CairoOption } from '../calldata/enum';

/**
 * Represents a Cairo Option.
 *
 * Key Features:
 * - Internal usage class (users are using "CairoOption" class).
 * - Unified constructor handling user input, API responses, and CairoType instances
 * - Automatic type validation and conversion using parsing strategies
 * - Bi-directional serialization (to/from Starknet API format)
 * - Support for nested types
 * - Direct CallData.compile() integration
 * - Comprehensive type checking and validation
 */
export class CairoTypeOption extends CairoType {
  static dynamicSelector = 'CairoTypeOption' as const;

  public readonly dynamicSelector = CairoTypeOption.dynamicSelector;

  /* CairoType instance representing a Cairo option. */
  public readonly content: CairoType | undefined;

  /* Cairo type of the option. */
  public readonly optionCairoType: string;

  /* True if the current variant is 'Some', false if 'None'. */
  public readonly isVariantSome: boolean;

  /**
   * CairoTypeOption provides a complete implementation for handling Cairo's Option,
   * which have the form "core::option::Option::<element_type>" (e.g., "core::option::Option::<core::integer::u8>").
   * Internal usage class (users are using "CairoOption" class).
   * It supports nested types, type validation, encoding, and parsing from various sources.
   * @param {unknown} content - Input data (array, object, BigNumberish,
   * Iterator<string>, CairoOption, CairoResult, CairoCustomEnum, or CairoType instance).
   * "content" parameter has to be defined when Some variant is selected
   * @param {string} optionCairoType - Cairo option type string (e.g., "core::option::Option::<core::integer::u8>").
   * @param {ParsingStrategy} strategy - Parsing strategy for element type handling (e.g. hdParsingStrategy).
   * @param {CairoOptionVariant | number} [variant] - (optional) variant of the option: CairoOptionVariant.Some (0), or CairoOptionVariant.None (1). If "content" is an iterator, this parameter must be omitted. If "content" is not an iterator, this parameter is mandatory.
   * @param {boolean} [subType=false] - optional. default=false. Use "true" if called in nested CairoOption instances.
   * @example
   * ```typescript
   * import { CairoTypeOption, hdParsingStrategy, CairoOptionVariant } from 'starknet';
   * // Simple Option with Some variant
   * const myOption1 = new CairoTypeOption(123, "core::option::Option::<core::integer::u8>", hdParsingStrategy, CairoOptionVariant.Some);
   * console.log(myOption1.toApiRequest()); // [ '0x01', [ '0x7b' ] ]
   * console.log(myOption1.decompose(hdParsingStrategy)); // CairoOption instance with content 123n and Some variant.
   * // Simple Option with None variant
   * const myOption2 = new CairoTypeOption(undefined, "core::option::Option::<core::integer::u8>", hdParsingStrategy, CairoOptionVariant.None);
   *
   * // Nested Cairo types
   * const myTuple0 = new CairoTuple([234, [1, 2, 3]], "(core::integer::u8, core::array::Array::<core::integer::u8>)", hdParsingStrategy);
   * const myOption3 = new CairoTypeOption(myTuple0, "core::option::Option::<(core::integer::u8, core::array::Array::<core::integer::u8>)>", hdParsingStrategy, CairoOptionVariant.Some);
   * console.log(CallData.compile([myOption3])); // [ "0", "234", "3", "1", "2", "3" ]
   *
   * // From API response
   * const apiData = ['0x0', '0x20'][Symbol.iterator]();
   * const fromApiOption = new CairoTypeOption(apiData, "core::option::Option::<core::integer::u8>", hdParsingStrategy); // CairoOption instance with content 32n and Some variant.
   * ```
   */
  constructor(
    content: unknown,
    optionCairoType: string,
    strategy: ParsingStrategy,
    variant?: CairoOptionVariant | number,
    subType: boolean = false
  ) {
    super();
    this.optionCairoType = optionCairoType;
    if (variant === 0 && isUndefined(content)) {
      throw new Error('"content" parameter has to be defined when Some variant is selected');
    }
    if (variant === 1 && !isUndefined(content)) {
      throw new Error('"content" parameter has to be defined when Some variant is selected');
    }
    if (content && typeof content === 'object' && 'next' in content) {
      // "content" is an iterator
      assert(
        isUndefined(variant),
        'when "content" parameter is an iterator, do not define "variant" parameter.'
      );
      const variantFromIterator = Number(getNext(content as Iterator<string>));
      switch (variantFromIterator) {
        case CairoOptionVariant.Some: {
          const parsedContent: CairoType = CairoTypeOption.parser(
            content as Iterator<string>,
            optionCairoType,
            strategy
          );
          this.content = parsedContent;
          break;
        }
        case CairoOptionVariant.None: {
          this.content = undefined;
          break;
        }
        default: {
          throw new Error('Invalid Option variant in iterator.');
        }
      }
      this.isVariantSome = variantFromIterator === 0;
      return;
    }
    if (content instanceof CairoTypeOption) {
      this.content = content.content;
      this.isVariantSome = content.isVariantSome;
      return;
    }
    CairoTypeOption.validate(content, optionCairoType, variant);
    if (content && typeof content === 'object' && content !== null && 'toApiRequest' in content) {
      // "content" is a CairoType
      this.content = content as CairoType;
      this.isVariantSome = variant === CairoOptionVariant.Some;
      return;
    }
    if (content instanceof CairoOption) {
      // "content" is a CairoOption
      const option = new CairoTypeOption(
        content.unwrap(),
        subType ? CairoTypeOption.getVariantSomeType(optionCairoType) : optionCairoType,
        strategy,
        content.isSome() ? CairoOptionVariant.Some : CairoOptionVariant.None,
        true // recursive sub-type
      );
      this.content = subType ? option : option.content;
      this.isVariantSome = option.isVariantSome;
      return;
    }
    // not an iterator, not an CairoType, neither a CairoOption -> so is low level data (BigNumberish, array, object)
    assert(
      !isUndefined(variant),
      '"variant" parameter is mandatory when creating a new Cairo option from a "CairoType" or raw data.'
    );
    switch (variant) {
      case CairoOptionVariant.Some: {
        const elementType = CairoTypeOption.getVariantSomeType(optionCairoType);
        const constructor = strategy.constructors[elementType];
        if (constructor) {
          this.content = constructor(content, elementType);
        } else {
          const dynamicSelectors = Object.entries(strategy.dynamicSelectors);
          const matchingSelector = dynamicSelectors.find(([, selectorFn]) =>
            selectorFn(elementType)
          );
          if (matchingSelector) {
            const [selectorName] = matchingSelector;
            const dynamicConstructor = strategy.constructors[selectorName];
            if (dynamicConstructor) {
              this.content = dynamicConstructor(content, elementType);
            }
          } else {
            throw new Error(`"${elementType}" is not a valid Cairo type`);
          }
        }
        this.isVariantSome = true;
        break;
      }
      case 1: {
        this.isVariantSome = false;
        this.content = undefined;
        break;
      }
      default: {
        throw new Error('Invalid Option variant.');
      }
    }
  }

  /**
   * Parse data from iterator into CairoType instances using the provided parsing strategy.
   *
   * This is the core parsing logic that consumes data sequentially from an iterator and
   * converts it into proper CairoType instances. It handles:
   * - Direct constructors (primitive types like u8, u256, etc.)
   * - Dynamic selectors (complex types like nested fixed arrays)
   * - Unknown types (stored as raw strings for later error handling)
   *
   * @param {Iterator<string>} responseIterator - Iterator over string data to parse
   * @param {string} someVariantCairoType - The Cairo option type (e.g., "core::option::Option::<core::integer::u8>")
   * @param {ParsingStrategy} strategy - The parsing strategy containing constructors and selectors
   * @returns {CairoType} Array of parsed CairoType instances
   * @private
   */
  private static parser(
    responseIterator: Iterator<string>,
    someVariantCairoType: string,
    strategy: ParsingStrategy
  ): CairoType {
    const elementType = CairoTypeOption.getVariantSomeType(someVariantCairoType);
    const constructor = strategy.constructors[elementType];
    if (constructor) {
      return constructor(responseIterator, elementType);
    }
    const dynamicSelectors = Object.entries(strategy.dynamicSelectors);
    const matchingSelector = dynamicSelectors.find(([, selectorFn]) => selectorFn(elementType));

    if (matchingSelector) {
      const [selectorName] = matchingSelector;
      const dynamicConstructor = strategy.constructors[selectorName];
      if (dynamicConstructor) {
        return dynamicConstructor(responseIterator, elementType);
      }
    }
    // Unknown type - collect raw values, defer error
    const rawValues = getNext(responseIterator);
    return rawValues as unknown as CairoType;
  }

  /**
   * Retrieve the Cairo content type from a Cairo option type.
   * @param {string} type - The Cairo option type string.
   * @returns {string} The Some Cairo type of the Cairo option.
   * @example
   * ```typescript
   * const result = CairoTypeOption.getVariantSomeType("core::option::Option::<core::integer::u8>");
   * // result = "core::integer::u8"
   * ```
   */
  static getVariantSomeType = (type: string) => {
    const matchArray = type.match(/(?<=<).+(?=>)/);
    if (matchArray === null)
      throw new Error(`ABI type ${type} do not includes a valid type of data.`);
    return matchArray[0];
  };

  /**
   * Validate input data for CairoTypeOption creation.
   * @param {unknown} input - Input data to validate
   * @param {string} type - The Cairo option type string (e.g., "core::option::Option::<core::integer::u8>")
   * @throws Error if input is invalid
   * @example
   * ```typescript
   * CairoTypeOption.validate(200, "core::option::Option::<core::integer::u16>", CairoOptionVariant.Some); // passes
   * CairoTypeOption.validate(200, "wrong", 3); // throws
   * ```
   */
  static validate(input: unknown, type: string, variant: VariantType | undefined): void {
    assert(
      CairoTypeOption.isAbiType(type),
      `The type ${type} is not a Cairo option. Needs core::option::Option::<type>.`
    );
    if (!isUndefined(variant)) {
      const numberVariant = Number(variant);
      assert(
        [0, 1].includes(numberVariant),
        'In Cairo option, only 0 or 1 variants are authorized.'
      );
    }
  }

  /**
   * Check if input data is valid for CairoTypeOption creation.
   * @param {unknown} input - Input data to check
   * @param {string} type - The Cairo option type (e.g., "core::option::Option::<core::integer::u8>")
   * @returns {boolean} true if valid, false otherwise
   * @example
   * ```typescript
   * const isValid1 = CairoTypeOption.is(200, "core::option::Option::<core::integer::u16>", CairoOptionVariant.Some"); // true
   * const isValid2 = CairoTypeOption.is(200, "wrong", 3); // false
   * ```
   */
  static is(input: unknown, type: string, variant: VariantType): boolean {
    try {
      CairoTypeOption.validate(input, type, variant);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Checks if the given string represents a valid Cairo option type format.
   *
   * A valid Cairo option type must follow the pattern: "core::option::Option::<element_type>"
   * where element_type is any valid Cairo type.
   * @param {string} type - The type string to validate
   * @returns {boolean} `true` if the type is a valid Cairo option format, `false` otherwise
   * @example
   * ```typescript
   * CairoTypeOption.isAbiType("core::option::Option::<core::integer::u16>");     // true
   * ```
   */
  static isAbiType(type: string): boolean {
    return isTypeOption(type);
  }

  /**
   * Serialize the Cairo option into hex strings for Starknet API requests.
   *
   * Converts all CairoType elements in this Cairo option into their hex string representation
   * by calling toApiRequest(). This is used when
   * sending data to the Starknet network.
   *
   * @returns {string[]} Array of hex strings ready for API requests
   * @example
   * ```typescript
   * const myOption = new CairoTypeOption(8, "core::option::Option::<core::integer::u8>", strategy, CairoOptionVariant.Some);
   * const result = myOption.toApiRequest(); // ['0x0', '0x8']
   * ```
   */
  public toApiRequest(): string[] {
    const result = [this.isVariantSome ? '0x00' : '0x01'];
    if (this.isVariantSome) {
      result.push(this.content!.toApiRequest());
    }
    return addCompiledFlag(result.flat());
  }

  private decomposeSome(strategy: ParsingStrategy): any {
    const { content } = this;
    const elementType = CairoTypeOption.getVariantSomeType(this.optionCairoType);
    // For raw string values (unsupported types), throw error
    if (typeof content === 'string') {
      throw new Error(`No parser found for element type: ${elementType} in parsing strategy`);
    }
    let parserName: string = elementType;
    if (content instanceof CairoType) {
      if (Object.hasOwn(content, 'dynamicSelector')) {
        // dynamic recursive CairoType
        parserName = (content as any).dynamicSelector;
      }
    }
    const responseParser = strategy.response[parserName];
    if (responseParser) {
      return responseParser(content as CairoType);
    }

    // No response parser found - throw error instead of fallback magic
    throw new Error(
      `No response parser found for element type: ${elementType} in parsing strategy`
    );
  }

  /**
   * Decompose the CairoTypeOption instance into a CairoOption instance.
   *
   * Transforms CairoType instances into their final parsed values using the strategy's
   * response parsers (e.g., CairoUint8 → BigInt). This method is used primarily for
   * parsing API responses into user-friendly formats.
   *
   * @param {ParsingStrategy} strategy - Parsing strategy for response parsing
   * @returns {CairoOption<any>} a CairoOptionInstance, with parsed variant (BigInt, numbers, nested arrays, etc.)
   * @example
   * ```typescript
   * const myOption = new CairoTypedOption([0, 3], "core::option::Option::<core::integer::u8>", hdParsingStrategy, CairoOptionVariant.Some);
   * const parsed = myOption.decompose(hdParsingStrategy); // CairoOption{ Some: 3n }
   * ```
   */
  public decompose(strategy: ParsingStrategy): CairoOption<any> {
    if (this.isVariantSome) {
      const someContent = this.decomposeSome(strategy);
      return new CairoOption<any>(CairoOptionVariant.Some, someContent);
    }
    return new CairoOption<any>(CairoOptionVariant.None);
  }
}
