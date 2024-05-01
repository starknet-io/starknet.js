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
  const result = await provider.callContract(call);
  return result.length !== 0 && result[0] === '0x01';
};
