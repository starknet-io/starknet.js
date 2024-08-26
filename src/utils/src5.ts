import { RpcProvider } from '../provider';
import type { BigNumberish } from '../types';
import { toHex } from './num';

/**
 * Implementation of ERC165 introspection.
 * Verify if a contract has implemented some standard functionalities.
 * @param {RpcProvider} provider the provider to access to Starknet.
 * @param {BigNumberish} contractAddress the address of the contract to check.
 * @param {BigNumberish} interfaceId the hash of the functionality to check.
 * @returns {boolean} true if the interfaceId is implemented in this contract.
 * @example
 * ```typescript
 * const snip9InterfaceV2Id = constants.SNIP9_V2_INTERFACE_ID;
 * const result = src5.supportsInterface(myProvider, accountContractAddress, snip9InterfaceV2Id);
 * // result = true
 * ```
 */
export async function supportsInterface(
  provider: RpcProvider,
  contractAddress: BigNumberish,
  interfaceId: BigNumberish
): Promise<boolean> {
  const call = {
    contractAddress: toHex(contractAddress),
    entrypoint: 'supports_interface',
    calldata: [toHex(interfaceId)],
  };
  try {
    const resp = await provider.callContract(call);
    return BigInt(resp[0]) !== 0n;
  } catch {
    // account not compatible with ERC165 (introspection)
    return false;
  }
}
