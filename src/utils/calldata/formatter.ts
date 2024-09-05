import { isBigInt } from '../typed';
import { decodeShortString } from '../shortString';

const guard = {
  isBN: (data: Record<string, any>, type: Record<string, any>, key: string) => {
    if (!isBigInt(data[key]))
      throw new Error(
        `Data and formatter mismatch on ${key}:${type[key]}, expected response data ${key}:${
          data[key]
        } to be BN instead it is ${typeof data[key]}`
      );
  },
  unknown: (data: Record<string, any>, type: Record<string, any>, key: string) => {
    throw new Error(`Unhandled formatter type on ${key}:${type[key]} for data ${key}:${data[key]}`);
  },
};

/**
 * Formats the given data based on the provided type definition.
 *
 * @param {any} data - The data to be formatted.
 * @param {any} type - The type definition for the data.
 * @param {any} [sameType] - The same type definition to be used (optional).
 * @returns - The formatted data.
 */
export default function formatter(
  data: Record<string, any>,
  type: Record<string, any>,
  sameType?: any
) {
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
      if (typeof elType === 'object') {
        acc[key] = formatter(data[key], elType);
        return acc;
      }

      guard.unknown(data, type, key);
      return acc;
    },
    {} as Record<string, any>
  );
}
