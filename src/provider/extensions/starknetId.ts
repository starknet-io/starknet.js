import { BigNumberish } from '../../types';
import { CallData } from '../../utils/calldata';
import { getStarknetIdContract, useDecoded, useEncoded } from '../../utils/starknetId';
import type { ProviderInterface } from '..';

export class StarknetId {
  async getStarkName(address: BigNumberish, StarknetIdContract?: string) {
    return StarknetId.getStarkName(
      // After Mixin, this is ProviderInterface
      (<unknown>this) as ProviderInterface,
      address,
      StarknetIdContract
    );
  }

  public async getAddressFromStarkName(name: string, StarknetIdContract?: string): Promise<string> {
    return StarknetId.getAddressFromStarkName(
      // After Mixin, this is ProviderInterface
      (<unknown>this) as ProviderInterface,
      name,
      StarknetIdContract
    );
  }

  static async getStarkName(
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
        calldata: CallData.compile({
          address,
        }),
      });
      const decimalDomain = hexDomain.map((element) => BigInt(element)).slice(1);

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

  static async getAddressFromStarkName(
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
        calldata: CallData.compile({
          domain: [useEncoded(name.replace('.stark', '')).toString(10)],
        }),
      });

      return addressData[0];
    } catch {
      throw Error('Could not get address from stark name');
    }
  }
}
