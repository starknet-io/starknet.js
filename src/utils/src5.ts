import { ProviderInterface } from '../provider';

export const supportsInterface = async (
  provider: ProviderInterface,
  contractAddress: string,
  interfaceId: string
): Promise<boolean> => {
  // create a call
  const call = {
    contractAddress,
    entrypoint: 'supports_interface',
    calldata: [interfaceId],
  };
  // call the contract
  const resp = await provider.callContract(call);
  return BigInt(resp[0]) !== 0n;
};
