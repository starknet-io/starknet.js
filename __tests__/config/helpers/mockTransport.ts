import type { JRPC } from '../../../src/types/api';

/**
 * Spies on the transport a channel builds for itself, so a test can answer for the node.
 *
 * This is the mocking seam that replaced `jest.spyOn(channel, 'fetch')`: `fetchEndpoint` no
 * longer goes through `fetch()`, and the envelope is a more faithful thing to assert on than
 * the old positional `(method, params, id)` call.
 */
export const spyOnTransport = (channel: object): jest.SpyInstance =>
  jest.spyOn((channel as any).transport, 'request');

/** A successful JSON-RPC reply. The id is irrelevant outside of a batch. */
export const rpcResult = (result: unknown): JRPC.ResponseBody =>
  ({ jsonrpc: '2.0', id: 1, result }) as JRPC.ResponseBody;

/** A protocol-error reply — resolved by the transport, turned into an RpcError by the channel. */
export const rpcErrorReply = (code: number, message: string): JRPC.ResponseBody =>
  ({ jsonrpc: '2.0', id: 1, error: { code, message } }) as JRPC.ResponseBody;

/** The envelope a spied transport was asked to send on its first call. */
export const sentEnvelope = (spy: jest.SpyInstance): JRPC.RequestBody => spy.mock.calls[0][0];
