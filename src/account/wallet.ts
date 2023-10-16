import { RpcMessage } from 'get-starknet-core';

import { AllowArray, Call } from '..';

// ---- TT Request Handler
type RpcCall = Omit<RpcMessage, 'result'>;

export class WalletAccount /* implements AccountInterface  */ {
  public address?: string;

  public starknetWindowObject?: StarknetWindowObject; // Should be ConnectedStarknetWindowObject

  public async connect(options?: ConnectOptions) {
    const starknetWindowObject = await connect(options);
    if (!starknetWindowObject) {
      throw Error('StarknetWindowObject is null');
    }
    if (!starknetWindowObject.isConnected) {
      throw Error('StarknetWindowObject need to be connected to the wallet');
    }

    this.starknetWindowObject = starknetWindowObject;
  }

  public async execute(calls: AllowArray<Call>) {
    const req2: RpcCall = {
      type: 'starknet_addInvokeTransaction',
      params: {
        calls,
      },
    };
    return this.starknetWindowObject.request(req2);
  }
}
