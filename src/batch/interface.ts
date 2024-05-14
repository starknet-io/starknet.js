import { RPC } from '../types';
import { JRPC } from '../types/api';

export type BatchClientOptions = {
  nodeUrl: string;
  headers: object;
  interval: number;
};

export abstract class BatchClientInterface {
  /**
   * Fetch batched JSON-RPC requests
   *
   * @param body - JSON-RPC request body
   * @returns JSON-RPC response
   */
  public abstract fetch<T extends keyof RPC.Methods>(
    method: T,
    params?: RPC.Methods[T]['params'],
    id?: string | number
  ): Promise<
    JRPC.ResponseBody & {
      result?: RPC.Methods[T]['result'];
      error?: JRPC.Error;
    }
  >;
}
