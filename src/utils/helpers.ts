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
