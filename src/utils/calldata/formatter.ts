import { isBigInt, isObject } from '../typed';
import { decodeShortString } from '../shortString';

const guard = {
  /**
   * Checks if the data is a BigInt (BN) and throws an error if not.
   *
   * @param {Record<string, any>} data - The data object containing the key to check.
   * @param {Record<string, any>} type - The type definition object.
   * @param {string} key - The key in the data object to check.
   * @throws {Error} If the data type does not match the expected BigInt (BN) type.
   */
  isBN: (data: Record<string, any>, type: Record<string, any>, key: string) => {
    if (!isBigInt(data[key]))
      throw new Error(
        `Data and formatter mismatch on ${key}:${type[key]}, expected response data ${key}:${
          data[key]
        } to be BN instead it is ${typeof data[key]}`
      );
  },
  /**
   * Throws an error for unhandled formatter types.
   *
   * @param {Record<string, any>} data - The data object containing the key.
   * @param {Record<string, any>} type - The type definition object.
   * @param {string} key - The key in the data object to check.
   * @throws {Error} If the formatter encounters an unknown type.
   */
  unknown: (data: Record<string, any>, type: Record<string, any>, key: string) => {
    throw new Error(`Unhandled formatter type on ${key}:${type[key]} for data ${key}:${data[key]}`);
  },
};

/**
 * Formats the given data based on the provided type definition.
 *
 * @param {Record<string, any>} data - The data to be formatted.
 * @param {Record<string, any>} type - The type definition for the data.
 * @param {any} [sameType] - The same type definition to be used (optional).
 * @returns {Record<string, any>} The formatted data.
 *
 * @example
 * // Example 1: Formatting a simple object
 * const data = { value: 1n, name: 2n };
 * const type = { value: 'number', name: 'string' };
 * const formatted = formatter(data, type);
 * // formatted: { value: 1n, name: '2n' }
 *
 * @example
 * // Example 2: Formatting an object with nested structures
 * const data = { test: { id: 1n, value: 30n }, active: 1n };
 * const type = { test: { id: 'number', value: 'number' }, active: 'number' };
 * const formatted = formatter(data, type);
 * // formatted: { test: { id: 1n, value: 30n }, active: 1n }
 *
 * @example
 * // Example 3: Handling arrays in the data object
 * const data = { items: [1n, 2n, 3n], value: 4n };
 * const type = { items: ['number'], value: 'string' };
 * const formatted = formatter(data, type);
 * // formatted: { items: [1n, 2n, 3n], value: '4n' }
 */
export default function formatter(
  data: Record<string, any>,
  type: Record<string, any>,
  sameType?: any
): Record<string, any> {
  // match data element with type element
  return Object.entries(data).reduce(
    (acc, [key, value]: [any, any]) => {
      const elType = sameType ?? type[key];

      if (!(key in type) && !sameType) {
        // no type definition for element return original element
        acc[key] = value;
        return acc;
      }

      if (elType === 'string') {
        if (Array.isArray(data[key])) {
          // long string (felt*)
          const arrayStr = formatter(
            data[key],
            data[key].map((_: any) => elType)
          );
          acc[key] = Object.values(arrayStr).join('');
          return acc;
        }
        guard.isBN(data, type, key);
        acc[key] = decodeShortString(value);
        return acc;
      }
      if (elType === 'number') {
        guard.isBN(data, type, key);
        acc[key] = Number(value);
        return acc;
      }
      if (typeof elType === 'function') {
        acc[key] = elType(value);
        return acc;
      }
      if (Array.isArray(elType)) {
        const arrayObj = formatter(data[key], elType, elType[0]);
        acc[key] = Object.values(arrayObj);
        return acc;
      }
      if (isObject(elType)) {
        acc[key] = formatter(data[key], elType);
        return acc;
      }

      guard.unknown(data, type, key);
      return acc;
    },
    {} as Record<string, any>
  );
}
