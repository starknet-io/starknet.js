import { isBN } from 'bn.js';

import { decodeShortString } from '../shortString';

const guard = {
  isBN: (data: any, type: any, key: any) => {
    if (!isBN(data[key]))
      throw new Error(
        `Data and formatter mismatch on ${key}:${type[key]}, expected response data ${key}:${
          data[key]
        } to be BN instead it is ${typeof data[key]}`
      );
  },
  unknown: (data: any, type: any, key: any) => {
    throw new Error(`Unhandled formatter type on ${key}:${type[key]} for data ${key}:${data[key]}`);
  },
};

export default function formatter(data: any, type: any) {
  // match data element with type element
  return Object.entries(data).reduce((acc, [key, value]: [any, any]) => {
    if (!(key in type)) {
      // no type definition for element return original element
      acc[key] = value;
      return acc;
    }

    if (type[key] === 'string') {
      guard.isBN(data, type, key);
      acc[key] = decodeShortString(value.toString(16));
      return acc;
    }
    if (type[key] === 'number') {
      guard.isBN(data, type, key);
      acc[key] = value.toNumber();
      return acc;
    }
    if (typeof type[key] === 'function') {
      acc[key] = type[key](value);
      return acc;
    }
    if (Array.isArray(type[key])) {
      const arrayObj = formatter(data[key], type[key]);
      acc[key] = Object.values(arrayObj);
      return acc;
    }
    if (typeof type[key] === 'object') {
      acc[key] = formatter(data[key], type[key]);
      return acc;
    }

    guard.unknown(data, type, key);
    return acc;
  }, {} as any);
}
