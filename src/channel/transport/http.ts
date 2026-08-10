import type { RpcProviderOptions } from '../../types';
import type { JRPC } from '../../types/api';
import { stringify } from '../../utils/json';
import type { RpcTransport } from './types';

export type HttpTransportOptions = {
  nodeUrl: string;
  headers?: object;
  baseFetch: NonNullable<RpcProviderOptions['baseFetch']>;
};

/**
 * POSTs a JSON-RPC body and returns the raw HTTP response.
 *
 * Shared by `HttpTransport` and `RpcChannel.fetch()` so the two cannot drift apart: the channel
 * keeps a method that hands back a real `Response`, while the transport is only interested in
 * the parsed envelope.
 *
 * @internal
 */
export function postJsonRpc(
  options: HttpTransportOptions,
  body: JRPC.RequestBody | JRPC.RequestBody[]
) {
  return options.baseFetch(options.nodeUrl, {
    method: 'POST',
    body: stringify(body),
    headers: options.headers as Record<string, string>,
  });
}

/**
 * The default transport: one POST per request, no connection to keep alive.
 *
 * `nodeUrl`, `headers` and `baseFetch` are read once at construction, as `BatchClient` has
 * always done.
 */
export class HttpTransport implements RpcTransport {
  private readonly options: HttpTransportOptions;

  constructor(options: HttpTransportOptions) {
    this.options = options;
  }

  public request(body: JRPC.RequestBody): Promise<JRPC.ResponseBody>;
  public request(body: JRPC.RequestBody[]): Promise<JRPC.ResponseBody[]>;
  public async request(
    body: JRPC.RequestBody | JRPC.RequestBody[]
  ): Promise<JRPC.ResponseBody | JRPC.ResponseBody[]> {
    const response = await postJsonRpc(this.options, body);
    return response.json();
  }
}
