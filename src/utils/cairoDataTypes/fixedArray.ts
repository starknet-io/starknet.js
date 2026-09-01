import assert from '../assert';

/**
 * A Cairo fixed array : a known number of items, all of the same type.
 *
 * Its abi type is written `[itemType; length]`, and both halves matter — the length is part of the
 * type, so an array of the wrong size is refused rather than padded or cut. Unlike the other classes
 * here this one does not serialize itself : {@link CairoFixedArray.compile} turns it into the struct
 * `CallData.compile` expects, where each index is a key.
 * @example
 * ```typescript
 * const fArray = new CairoFixedArray([10, 20, 30], '[core::integer::u32; 3]');
 * const result = fArray.compile();
 * // result = { '0': 10, '1': 20, '2': 30 }
 * ```
 */
export class CairoFixedArray {
  /**
   * JS array representing a Cairo fixed array.
   * @example
   * ```typescript
   * const result = new CairoFixedArray([10, 20, 30], '[core::integer::u32; 3]').content;
   * // result = [10, 20, 30]
   * ```
   */
  public readonly content: any[];

  /**
   * Cairo fixed array type.
   * @example
   * ```typescript
   * const result = new CairoFixedArray([10, 20, 30], '[core::integer::u32; 3]').arrayType;
   * // result = "[core::integer::u32; 3]"
   * ```
   */
  public readonly arrayType: string;

  /**
   * Split a `[itemType; length]` type into its two halves, or say it is not one.
   *
   * The separator is the **last** `'; '` of the string, so a fixed array of fixed arrays splits on
   * its outer level and its inner type comes back whole. A type that is not bracketed, that has no
   * item type, or whose length is not made of digits is not one : `undefined` comes back, and it is
   * the callers that decide whether to raise.
   * @param {string} type the abi type to split
   * @returns {{itemType: string, size: string} | undefined} the two halves, or undefined
   * @example
   * ```typescript
   * // called from within the class
   * CairoFixedArray.parseFixedArrayType('[core::integer::u32; 8]');
   * // { itemType: 'core::integer::u32', size: '8' }
   * CairoFixedArray.parseFixedArrayType('[[core::integer::u8; 2]; 3]');
   * // { itemType: '[core::integer::u8; 2]', size: '3' }     the inner array, kept whole
   * CairoFixedArray.parseFixedArrayType('core::integer::u32');
   * // undefined
   * ```
   */
  private static parseFixedArrayType(type: string) {
    if (!type.startsWith('[') || !type.endsWith(']')) {
      return undefined;
    }

    const separator = type.lastIndexOf('; ');
    const itemType = type.slice(1, separator);
    const size = type.slice(separator + 2, -1);

    if (
      separator <= 1 ||
      size.length === 0 ||
      ![...size].every((char) => char >= '0' && char <= '9')
    ) {
      return undefined;
    }

    return { itemType, size };
  }

  /**
   * Create an instance representing a Cairo fixed Array.
   *
   * The type is checked first, then the item count against the length the type declares : an array
   * whose size does not match is refused, since that size is part of the type.
   * @param {any[]} content JS array representing a Cairo fixed array.
   * @param {string} arrayType Cairo fixed array type.
   * @throws {Error} when the type is not a `[type; length]`, or when the item count does not match
   * @example
   * ```typescript
   * const result = new CairoFixedArray([10, 20, 30], '[core::integer::u32; 3]').content;
   * // result = [10, 20, 30]
   * new CairoFixedArray([10, 20], '[core::integer::u32; 3]');
   * // throws Error("The ABI type [core::integer::u32; 3] is expecting 3 items. 2 items provided.")
   * ```
   */
  constructor(content: any[], arrayType: string) {
    assert(
      CairoFixedArray.isTypeFixedArray(arrayType),
      `The type ${arrayType} is not a Cairo fixed array. Needs [type; length].`
    );

    // the assert above already had `parseFixedArrayType` read the type, and this reads it again on
    // the same string : both halves are there, so this cannot raise.
    const arraySize = CairoFixedArray.getFixedArraySize(arrayType);
    assert(
      arraySize === content.length,
      `The ABI type ${arrayType} is expecting ${arraySize} items. ${content.length} items provided.`
    );
    this.content = content;
    this.arrayType = arrayType;
  }

  /**
   * Retrieves the array size from the given type string representing a Cairo fixed array.
   * @param {string} type - The Cairo fixed array type.
   * @returns {number} The array size.
   * @example
   * ```typescript
   * const result = CairoFixedArray.getFixedArraySize("[core::integer::u32; 8]");
   * // result = 8
   * ```
   */
  static getFixedArraySize(type: string) {
    const fixedArrayType = CairoFixedArray.parseFixedArrayType(type);
    if (!fixedArrayType)
      throw new Error(`ABI type ${type} do not includes a valid number after ';' character.`);
    return Number(fixedArrayType.size);
  }

  /**
   * Retrieves the Cairo fixed array size from the CairoFixedArray instance.
   * @returns {number} The fixed array size.
   * @example
   * ```typescript
   * const fArray = new CairoFixedArray([10,20,30], "[core::integer::u32; 3]");
   * const result = fArray.getFixedArraySize();
   * // result = 3
   * ```
   */
  getFixedArraySize() {
    return CairoFixedArray.getFixedArraySize(this.arrayType);
  }

  /**
   * Retrieve the Cairo content type from a Cairo fixed array type.
   * @param {string} type - The type string.
   * @returns {string} The fixed-array type.
   * @example
   * ```typescript
   * const result = CairoFixedArray.getFixedArrayType("[core::integer::u32; 8]");
   * // result = "core::integer::u32"
   * ```
   */
  static getFixedArrayType = (type: string) => {
    const fixedArrayType = CairoFixedArray.parseFixedArrayType(type);
    if (!fixedArrayType) throw new Error(`ABI type ${type} do not includes a valid type of data.`);
    return fixedArrayType.itemType;
  };

  /**
   * Retrieve the Cairo content type of the Cairo fixed array.
   * @returns {string} The fixed-array content type.
   * @example
   * ```typescript
   * const fArray = new CairoFixedArray([10,20,30], "[core::integer::u32; 3]");
   * const result = fArray.getFixedArrayType();
   * // result = "core::integer::u32"
   * ```
   */
  getFixedArrayType() {
    return CairoFixedArray.getFixedArrayType(this.arrayType);
  }

  /**
   * Create an object from a Cairo fixed array.
   * Be sure to have an array length conform to the ABI.
   * To be used with CallData.compile().
   * @param {Array<any>} input JS array representing a Cairo fixed array.
   * @returns {Object} a specific struct representing a fixed Array.
   * @example
   * ```typescript
   * const result = CairoFixedArray.compile([10,20,30]);
   * // result = { '0': 10, '1': 20, '2': 30 }
   * ```
   */
  static compile(input: Array<any>): Object {
    return input.reduce((acc: any, item: any, idx: number) => {
      acc[idx] = item;
      return acc;
    }, {});
  }

  /**
   * Generate an object from the Cairo fixed array instance.
   * To be used with CallData.compile().
   * @returns a specific struct representing a fixed array.
   * @example
   * ```typescript
   * const fArray = new CairoFixedArray([10,20,30], "[core::integer::u32; 3]");
   * const result = fArray.compile();
   * // result = { '0': 10, '1': 20, '2': 30 }
   * ```
   */
  public compile(): Object {
    return CairoFixedArray.compile(this.content);
  }

  /**
   * Checks if the given Cairo type is a fixed-array type.
   * structure: [string; number]
   * @param {string} type - The type to check.
   * @returns {boolean} `true` if the type is a fixed array type, `false` otherwise.
   * @example
   * ```typescript
   * const result = CairoFixedArray.isTypeFixedArray("[core::integer::u32; 8]");
   * // result = true
   * ```
   */
  static isTypeFixedArray(type: string) {
    return CairoFixedArray.parseFixedArrayType(type) !== undefined;
  }
}
