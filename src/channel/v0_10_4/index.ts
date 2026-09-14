import { SupportedRpcVersion } from '../../global/constants';
import { SubscriptionChannel as SubscriptionChannel_0_10_2 } from '../ws/subscriptionChannel';

export { RpcChannel } from '../rpc_0_10_4';
export type { SubscriptionChannelOptions } from '../ws/subscriptionChannel';

/**
 * Verified against the installed type packages: `starknet-types-0103` and `starknet-types-0104`
 * declare the same five subscription method names. So this exists for the version axis rather
 * than for behaviour — the same reason `rpc_0_10_4.ts` is an eight-line `extends`.
 */
export class SubscriptionChannel extends SubscriptionChannel_0_10_2 {
  override readonly id = 'RPC0.10.4-subscriptions';

  override readonly channelSpecVersion: SupportedRpcVersion = SupportedRpcVersion.v0_10_4;
}
