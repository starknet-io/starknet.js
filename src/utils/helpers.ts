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

/**
 * Copy by value of a complex object (including Date, Array, functions or classes)
 * @param {any} obj - object to copy by value
 * @returns {any} copied object.
 */
export function deepCopyWithMethods(obj: any): any {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof Array) return obj.map((item) => deepCopyWithMethods(item));
  if (obj instanceof Function) return obj;
  const cloned = Object.create(Object.getPrototypeOf(obj));
  // eslint-disable-next-line no-restricted-syntax
  for (const key in obj as Object) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(key)) {
      cloned[key] = deepCopyWithMethods(obj[key]);
    }
  }
  return cloned;
}
