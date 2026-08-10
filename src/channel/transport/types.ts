import type { JRPC } from '../../types/api';

/**
 * Carries JSON-RPC envelopes to a node and back, without knowing what the methods mean.
 *
 * The seam sits at the envelope rather than at HTTP, so an implementation is free to use
 * `fetch`, a WebSocket, or anything else. Everything above it — the versioned `RpcChannel`,
 * `RpcProvider`, `Account`, `Contract` — is unaware of which one is in use.
 *
 * **Resolution versus rejection.** `request` resolves with whatever the node answered, error
 * envelopes included: a `{ error: { code, message } }` reply is a completed round trip as far
 * as the transport is concerned, and it is the channel's `errorHandler` that turns it into a
 * typed `RpcError`. `request` rejects only when no answer could be obtained — unreachable node,
 * closed connection, timeout. Application code must see the same errors on every transport.
 *
 * **Id transparency.** A transport may rewrite ids on the wire — a connection shared by several
 * channels needs its own counter, since each channel starts numbering at 0 and two of them would
 * otherwise both emit `1` — but the envelope it resolves with MUST carry the id the caller sent.
 * `BatchClient` correlates its replies on that id. Note that request ids and subscription ids are
 * two different spaces: subscription ids come from the node as decimal strings that routinely
 * exceed `Number.MAX_SAFE_INTEGER`, and must never be coerced to a number.
 *
 * **Batches.** An array in yields an array out. The node may answer in any order, so callers
 * correlate on the id rather than on position.
 */
export interface RpcTransport {
  request(body: JRPC.RequestBody): Promise<JRPC.ResponseBody>;
  request(body: JRPC.RequestBody[]): Promise<JRPC.ResponseBody[]>;
}
