import { BatchClientOptions } from './interface';
import { DelayedAction } from './delayedAction';
import { stringify } from '../utils/json';
import { RPC } from '../types';
import { JRPC } from '../types/api';

export class BatchClient extends DelayedAction {
  public nodeUrl: string;

  public headers: object;

  public interval: number;

  public requestId: number = 0;

  private pendingRequests: Record<string | number, JRPC.RequestBody> = {};

  private batchPromise?: Promise<any>;

  constructor(options: BatchClientOptions) {
    super(options.interval);

    this.nodeUrl = options.nodeUrl;
    this.headers = options.headers;
    this.interval = options.interval;
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
    const raw = await fetch(this.nodeUrl, {
      method: 'POST',
      body: stringify(requests),
      headers: this.headers as Record<string, string>,
    });

    return raw.json();
  }

  public async fetch<T extends keyof RPC.Methods>(
    method: T,
    params?: RPC.Methods[T]['params'],
    id?: string | number
  ) {
    const requestId = this.addPendingRequest(method, params, id);

    await this.wait();

    const requests = this.pendingRequests;
    this.pendingRequests = {};

    if (!this.batchPromise) {
      this.batchPromise = this.sendBatch(Object.values(requests));
    }
    const results = await this.batchPromise;
    this.batchPromise = undefined;

    return results.find((result: any) => result.id === requestId);
  }
}
