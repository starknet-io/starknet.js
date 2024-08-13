import { ProviderInterface } from '../provider';

export async function supportsInterface(
  provider: ProviderInterface,
  contractAddress: string,
  interfaceId: string
): Promise<boolean> {
  // create a call
  const call = {
    contractAddress,
    entrypoint: 'supports_interface',
    calldata: [interfaceId],
  };
  // call the contract
  try {
    const resp = await provider.callContract(call);
    return BigInt(resp[0]) !== 0n;
  } catch {
    // account not compatible with ERC165 (introspection)
    return false;
  }
}
