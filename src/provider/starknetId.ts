import { BigNumberish } from '../utils/num';
import { compileCalldata } from '../utils/stark';
import { getStarknetIdContract, useDecoded, useEncoded } from '../utils/starknetId';
import { ProviderInterface } from './interface';

export async function getStarkName(
  provider: ProviderInterface,
  address: BigNumberish,
  StarknetIdContract?: string
): Promise<string> {
  const chainId = await provider.getChainId();
  const contract = StarknetIdContract ?? getStarknetIdContract(chainId);

  try {
    const hexDomain = await provider.callContract({
      contractAddress: contract,
      entrypoint: 'address_to_domain',
      calldata: compileCalldata({
        address,
      }),
    });
    const decimalDomain = hexDomain.result.map((element) => BigInt(element)).slice(1);

    const stringDomain = useDecoded(decimalDomain);

    if (!stringDomain) {
      throw Error('Starkname not found');
    }

    return stringDomain;
  } catch (e) {
    if (e instanceof Error && e.message === 'Starkname not found') {
      throw e;
    }
    throw Error('Could not get stark name');
  }
}

export async function getAddressFromStarkName(
  provider: ProviderInterface,
  name: string,
  StarknetIdContract?: string
): Promise<string> {
  const chainId = await provider.getChainId();
  const contract = StarknetIdContract ?? getStarknetIdContract(chainId);

  try {
    const addressData = await provider.callContract({
      contractAddress: contract,
      entrypoint: 'domain_to_address',
      calldata: compileCalldata({
        domain: [useEncoded(name.replace('.stark', '')).toString(10)],
      }),
    });

    return addressData.result[0];
  } catch {
    throw Error('Could not get address from stark name');
  }
}
