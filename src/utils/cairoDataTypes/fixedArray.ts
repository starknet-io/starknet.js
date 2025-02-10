import assert from '../assert';

export class CairoFixedArray {
  /**
   * JS array representing a Cairo fixed array.
   */
  public readonly content: any[];

  /**
   * Cairo fixed array type.
   */
  public readonly arrayType: string;

  /**
   * Create an instance representing a Cairo fixed Array.
   * @param {any[]} content JS array representing a Cairo fixed array.
   * @param {string} arrayType Cairo fixed array type.
   */
  constructor(content: any[], arrayType: string) {
    assert(
      CairoFixedArray.isTypeFixedArray(arrayType),
      `The type ${arrayType} is not a Cairo fixed array. Needs [type; length].`
    );
    try {
      CairoFixedArray.getFixedArrayType(arrayType);
    } catch {
      throw new Error(
        `The type ${arrayType} do not includes any content type. Needs [type; length].`
      );
    }
    try {
      CairoFixedArray.getFixedArraySize(arrayType);
    } catch {
      throw new Error(
        `The type ${arrayType} type do not includes any length. Needs [type; length].`
      );
    }
    assert(
      CairoFixedArray.getFixedArraySize(arrayType) === content.length,
      `The ABI type ${arrayType} is expecting ${CairoFixedArray.getFixedArraySize(arrayType)} items. ${content.length} items provided.`
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
    const matchArray = type.match(/(?<=; )\d+(?=\])/);
    if (matchArray === null)
      throw new Error(`ABI type ${type} do not includes a valid number after ';' character.`);
    return Number(matchArray[0]);
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
    const matchArray = type.match(/(?<=\[).+(?=;)/);
    if (matchArray === null)
      throw new Error(`ABI type ${type} do not includes a valid type of data.`);
    return matchArray[0];
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
   *
   * @param {string} type - The type to check.
   * @returns - `true` if the type is a fixed array type, `false` otherwise.
   * ```typescript
   * const result = CairoFixedArray.isTypeFixedArray("[core::integer::u32; 8]");
   * // result = true
   */
  static isTypeFixedArray(type: string) {
    return (
      /^\[.*;\s.*\]$/.test(type) && /(?<=\[).+(?=;)/.test(type) && /(?<=; )\d+(?=\])/.test(type)
    );
  }
}
