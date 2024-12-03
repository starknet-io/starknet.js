import { stringify } from '../json';
import { RPC, RpcProviderOptions } from '../../types';
import { JRPC } from '../../types/api';

export type BatchClientOptions = {
  nodeUrl: string;
  headers: object;
  interval: number;
  baseFetch: NonNullable<RpcProviderOptions['baseFetch']>;
};

export class BatchClient {
  public nodeUrl: string;

  public headers: object;

  public interval: number;

  public requestId: number = 0;

  private pendingRequests: Record<string | number, JRPC.RequestBody> = {};

  private batchPromises: Record<string | number, Promise<JRPC.ResponseBody[]>> = {};

  private delayTimer?: NodeJS.Timeout;

  private delayPromise?: Promise<void>;

  private delayPromiseResolve?: () => void;

  private baseFetch: BatchClientOptions['baseFetch'];

  constructor(options: BatchClientOptions) {
    this.nodeUrl = options.nodeUrl;
    this.headers = options.headers;
    this.interval = options.interval;
    this.baseFetch = options.baseFetch;
  }

  private async wait(): Promise<void> {
    // If the promise is not set, create a new one and store the resolve function
    if (!this.delayPromise || !this.delayPromiseResolve) {
      this.delayPromise = new Promise((resolve) => {
        this.delayPromiseResolve = resolve;
      });
    }

    if (this.delayTimer) {
      clearTimeout(this.delayTimer);
      this.delayTimer = undefined;
    }

    this.delayTimer = setTimeout(() => {
      if (this.delayPromiseResolve) {
        this.delayPromiseResolve();

        // Reset the promise and resolve function so that a new promise is created next time
        this.delayPromise = undefined;
        this.delayPromiseResolve = undefined;
      }
    }, this.interval);

    return this.delayPromise;
  }

  private addPendingRequest<T extends keyof RPC.Methods>(
    method: T,
    params?: RPC.Methods[T]['params'],
    id?: string | number
  ) {
    const request: JRPC.RequestBody = {
      id: id ?? `batched_${(this.requestId += 1)}`,
      jsonrpc: '2.0',
      method,
      params: params ?? undefined,
    };

    this.pendingRequests[request.id] = request;

    return request.id;
  }

  private async sendBatch(requests: JRPC.RequestBody[]) {
    const raw = await this.baseFetch(this.nodeUrl, {
      method: 'POST',
      body: stringify(requests),
      headers: this.headers as Record<string, string>,
    });

    return raw.json();
  }

  /**
   * Automatically batches and fetches JSON-RPC calls in a single request.
   * @param method Method to call
   * @param params Method parameters
   * @param id JSON-RPC Request ID
   * @returns JSON-RPC Response
   */
  public async fetch<
    T extends keyof RPC.Methods,
    TResponse extends JRPC.ResponseBody & {
      result?: RPC.Methods[T]['result'];
      error?: JRPC.Error;
    },
  >(method: T, params?: RPC.Methods[T]['params'], id?: string | number): Promise<TResponse> {
    const requestId = this.addPendingRequest(method, params, id);

    // Wait for the interval to pass before sending the batch
    await this.wait();

    // Get the pending requests and clear the object
    const requests = this.pendingRequests;
    this.pendingRequests = {};

    // If there is no promise for this batch, create one and send the batch
    if (!this.batchPromises[requestId]) {
      const promise = this.sendBatch(Object.values(requests));
      Object.keys(requests).forEach((key) => {
        this.batchPromises[key] = promise;
      });
    }

    const results = await this.batchPromises[requestId];
    delete this.batchPromises[requestId];

    // Find this request in the results and return it
    const result = results.find((res: any) => res.id === requestId);
    if (!result) throw new Error(`Couldn't find the result for the request. Method: ${method}`);

    return result as TResponse;
  }
}
