/**
 * Adds a non-enumerable __compiled__ property to an array to mark it as compiled for API requests
 * @param compiled - The string array to mark as compiled
 * @returns The same array with __compiled__ property added
 */
export function addCompiledFlag<T extends string[]>(compiled: T): T {
  Object.defineProperty(compiled, '__compiled__', {
    enumerable: false,
    writable: false,
    value: true,
  });
  return compiled;
}

export function deepCopy<T>(obj: T): T {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  // Handle Date objects
  if (obj instanceof Date) {
    return new Date(obj.getTime()) as any;
  }

  // Handle arrays
  if (Array.isArray(obj)) {
    const copyArr = [] as any[];
    obj.forEach((value) => copyArr.push(deepCopy(value)));
    return copyArr as any;
  }

  // Handle plain objects
  const copyObj = { ...obj } as { [key: string]: any };
  Object.keys(copyObj).forEach((key) => {
    copyObj[key] = deepCopy(copyObj[key]);
  });

  return copyObj as T;
}
