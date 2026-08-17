import type { NetworkName } from '../../global/constants';

export interface PaymasterOptions extends PaymasterRpcOptions {}

export type PaymasterRpcOptions = {
  nodeUrl?: string | NetworkName;
  headers?: object;
  baseFetch?: WindowOrWorkerGlobalScope['fetch'];
  mute?: boolean;
};
