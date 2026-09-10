import { SupportedRpcVersion } from '../global/constants';
import { RpcChannel as RpcChannel_0_10_3 } from './rpc_0_10_3';

export class RpcChannel extends RpcChannel_0_10_3 {
  override readonly id = 'RPC0.10.4';

  override readonly channelSpecVersion: SupportedRpcVersion = SupportedRpcVersion.v0_10_4;
}
