/**
 * Asserts that the given condition is true, otherwise throws an error with an optional message.
 * @param {boolean} condition - The condition to check.
 * @param {string} [message] - The optional message to include in the error.
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
