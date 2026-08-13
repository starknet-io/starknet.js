import type { RpcProviderOptions } from '../../types';
import type { JRPC } from '../../types/api';
import { stringify } from '../../utils/json';
import type { RpcTransport } from './types';

/** What {@link HttpTransport} needs to POST an envelope. */
export type HttpTransportOptions = {
  /**
   * The HTTP endpoint of the Starknet node.
   * @example 'https://starknet-sepolia.public.blastapi.io/rpc/v0_10'
   */
  nodeUrl: string;
  /** Extra headers sent with every request, an API key for instance. */
  headers?: object;
  /** The `fetch` implementation to use. */
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
 *
 * You rarely build one yourself — `RpcProvider` does it from its own options. Pass it explicitly
 * only to share it, or to give several providers the same configured `fetch`.
 * @example
 * ```typescript
 * const transport = new HttpTransport({
 *   nodeUrl: 'https://starknet-sepolia.public.blastapi.io/rpc/v0_10',
 *   baseFetch: fetch,
 * });
 * const myProvider = new RpcProvider({ transport });
 * ```
 */
export class HttpTransport implements RpcTransport {
  private readonly options: HttpTransportOptions;

  constructor(options: HttpTransportOptions) {
    this.options = options;
  }

  /**
   * POSTs the envelope and resolves with the parsed answer. See {@link RpcTransport.request} for
   * the contract every transport honours.
   * @param body - A request envelope, or an array of them for a batch.
   * @returns The response envelope, or an array of them.
   */
  public request(body: JRPC.RequestBody): Promise<JRPC.ResponseBody>;
  public request(body: JRPC.RequestBody[]): Promise<JRPC.ResponseBody[]>;
  public async request(
    body: JRPC.RequestBody | JRPC.RequestBody[]
  ): Promise<JRPC.ResponseBody | JRPC.ResponseBody[]> {
    const response = await postJsonRpc(this.options, body);
    return response.json();
  }
}
