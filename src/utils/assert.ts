/**
 * Asserts that the given condition is true, otherwise throws an error with an optional message.
 * @param {boolean} condition - The condition to check.
 * @param {string} [message] - The optional message to include in the error or method to call.
 * @throws {Error} Throws an error if the condition is false.
 * @example
 * ```typescript
 * const address = '0xa7ee790591d9fa3efc87067d95a643f8455e0b8190eb8cb7bfd39e4fb7571fdf';
 * assert(/^(0x)?[0-9a-fA-F]{64}$/.test(address), 'Invalid address format');
 * ```
 */
export default function assert(condition: boolean, message?: string): asserts condition {
  if (!condition) {
    throw new Error(message || 'Assertion failure');
  }
}

/**
 * Asserts that the given condition is true, otherwise call the method.
 * @param condition
 * @param method
 */
export function assertX(condition: boolean, method: () => void): asserts condition {
  if (!condition) {
    if (method.length === 0) {
      method(); // Call the method if it's a function with no arguments
    } else {
      throw new Error('AssertionX failure: message function should not require arguments');
    }
  }
}
