import { NetworkName } from '../../global/constants';

export interface PaymasterOptions extends PaymasterRpcOptions {}

export type PaymasterRpcOptions = {
  nodeUrl?: string | NetworkName;
  default?: boolean;
  headers?: object;
  baseFetch?: WindowOrWorkerGlobalScope['fetch'];
};
