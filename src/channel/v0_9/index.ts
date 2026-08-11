import { SupportedRpcVersion } from '../../global/constants';
import { SubscriptionChannel as SubscriptionChannel_0_10_2 } from '../ws/subscriptionChannel';

export { RpcChannel } from '../rpc_0_9_0';
export type { SubscriptionChannelOptions } from '../ws/subscriptionChannel';

/**
 * Verified against the installed type packages: `starknet-types-09` and `starknet-types-0103`
 * expose the same five subscription method names. Params and result types differ; the method set
 * does not. So this is a trivial `extends`, and the axis exists for the day a version adds one.
 */
export class SubscriptionChannel extends SubscriptionChannel_0_10_2 {
  override readonly id = 'RPC0.9.0-subscriptions';

  override readonly channelSpecVersion: SupportedRpcVersion = SupportedRpcVersion.v0_9_0;
}
