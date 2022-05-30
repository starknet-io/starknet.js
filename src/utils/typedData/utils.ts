import { TypedData } from './types';

/**
 * Validates that `data` matches the EIP-712 JSON schema.
 *
 * @param {any} data
 * @return {boolean}
 */
export const validateTypedData = (data: unknown): data is TypedData => {
  const typedData = data as TypedData;

  // Validate that the data matches the EIP-712 JSON schema
  const valid = Boolean(typedData.types && typedData.primaryType && typedData.message);

  return valid;
};
