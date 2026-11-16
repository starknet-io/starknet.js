import { SupportedRpcVersion } from '../global/constants';
import { RpcChannel as RpcChannel_0_10_4 } from './rpc_0_10_4';

export class RpcChannel extends RpcChannel_0_10_4 {
  override readonly id = 'RPC0.10.5';

  override readonly channelSpecVersion: SupportedRpcVersion = SupportedRpcVersion.v0_10_5;
}
