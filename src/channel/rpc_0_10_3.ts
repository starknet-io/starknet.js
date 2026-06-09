import { SupportedRpcVersion } from '../global/constants';
import { RpcChannel as RpcChannel_0_10_2 } from './rpc_0_10_2';

export class RpcChannel extends RpcChannel_0_10_2 {
  override readonly id = 'RPC0.10.3';

  override readonly channelSpecVersion: SupportedRpcVersion = SupportedRpcVersion.v0_10_3;
}
