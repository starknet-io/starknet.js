import type { RpcChannel } from '../../channel';
import type { BlockIdentifier, BlockWithTxHashes, GasPrices } from '../../types';

export async function getGasPrices(
  channel: RpcChannel,
  blockIdentifier: BlockIdentifier = channel.blockIdentifier
): Promise<GasPrices> {
  const bl = (await channel.getBlockWithTxHashes(blockIdentifier)) as BlockWithTxHashes;
  return {
    l1DataGasPrice: BigInt(bl.l1_data_gas_price.price_in_fri),
    l1GasPrice: BigInt(bl.l1_gas_price.price_in_fri),
    l2GasPrice: BigInt(bl.l2_gas_price.price_in_fri),
  } as GasPrices;
}
