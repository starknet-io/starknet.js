import { SupportedRpcVersion } from '../../global/constants';
import { SubscriptionChannel as SubscriptionChannel_0_10_2 } from '../ws/subscriptionChannel';

export { RpcChannel } from '../rpc_0_10_3';
export type { SubscriptionChannelOptions } from '../ws/subscriptionChannel';

/**
 * Spec 0.10.3 serves the same five subscription methods as 0.10.2, so this exists for the version
 * axis rather than for behaviour — the same reason `rpc_0_10_3.ts` is an eight-line `extends`.
 */
export class SubscriptionChannel extends SubscriptionChannel_0_10_2 {
  override readonly id = 'RPC0.10.3-subscriptions';

  override readonly channelSpecVersion: SupportedRpcVersion = SupportedRpcVersion.v0_10_3;
}
