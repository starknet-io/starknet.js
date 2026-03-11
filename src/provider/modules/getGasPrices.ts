import type { RPC09, RPC0101 } from '../../channel';
import type { BlockIdentifier, BlockWithTxHashes, GasPrices } from '../../types';

export async function getGasPrices(
  channel: RPC09.RpcChannel | RPC0101.RpcChannel,
  blockIdentifier: BlockIdentifier = channel.blockIdentifier
): Promise<GasPrices> {
  const bl = (await channel.getBlockWithTxHashes(blockIdentifier)) as BlockWithTxHashes;
  return {
    l1DataGasPrice: BigInt(bl.l1_data_gas_price.price_in_fri),
    l1GasPrice: BigInt(bl.l1_gas_price.price_in_fri),
    l2GasPrice: BigInt(bl.l2_gas_price.price_in_fri),
  } as GasPrices;
}
