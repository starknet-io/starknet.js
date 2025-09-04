export * from './lib';
export * from '../provider/types/index.type';
export * from '../account/types/index.type';
export * from './cairoEnum';
export * from './calldata';
export * from '../contract/types/index.type';
export * from './errors';
export * from './outsideExecution';
export * from './signer';
export * from '../utils/transactionReceipt/transactionReceipt.type';
export * from './typedData';
export * from '../paymaster/types/index.type';
export * from '../deployer/types/index.type';

export * as RPC from './api';

// ensures a Buffer type is available for development environments without Node.js types
declare global {
  interface Buffer<TArrayBuffer extends ArrayBufferLike = ArrayBufferLike>
    // @ts-ignore - docs
    extends Uint8Array<TArrayBuffer> {}
}
