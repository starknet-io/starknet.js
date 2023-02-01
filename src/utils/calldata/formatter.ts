import { decodeShortString } from '../shortString';

export default function formatter(data: any, type: any) {
  return Object.entries(type).reduce((acc, [key, value]) => {
    if (value === 'string') {
      acc[key] = decodeShortString(data[key].toString(16));
      return acc;
    }
    if (value === 'number') {
      acc[key] = data[key].toNumber();
      return acc;
    }
    // object formatter is function
    if (typeof value === 'function') {
      acc[key] = value(data[key]);
      return acc;
    }
    if (Array.isArray(value)) {
      const arrayObj = formatter(data[key], type[key]);
      acc[key] = Object.values(arrayObj);
      return acc;
    }
    if (typeof value === 'object') {
      acc[key] = formatter(data[key], type[key]);
      return acc;
    }

    acc[key] = data[key];
    return acc;
  }, {} as any);
}
