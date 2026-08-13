import { RPC09, RPC0103 } from '../channel';
import {
  ReconnectingWsTransport,
  type ReconnectingWsTransportOptions,
  type WsTransport,
} from '../channel/transport';
import { config } from '../global/config';
import { SupportedRpcVersion } from '../global/constants';
import { logger } from '../global/logger';
import { LibraryError } from '../utils/errors';
import { isSupportedSpecVersion, isVersion } from '../utils/resolve';
import type { RpcProviderOptions } from '../types';
import { RpcProvider } from './rpc';

/**
 * Everything {@link WebSocketProvider} accepts: the provider options, the socket options of
 * {@link ReconnectingWsTransport}, and the subscription-channel options.
 */
export type WebSocketProviderOptions = RpcProviderOptions &
  Omit<Partial<ReconnectingWsTransportOptions>, 'nodeUrl'> &
  // Derived rather than restated, so an option added to the subscription channel reaches this
  // provider without a second edit. `transport` is excluded because it is settled below.
  Omit<RPC0103.SubscriptionChannelOptions, 'transport'> & {
    /**
     * An already-built transport to borrow. Mutually exclusive with `nodeUrl`, and the form to
     * use in React: the socket lives at module scope while components own only subscriptions.
     */
    transport?: WsTransport;
  };

/** The subscription channel of a given spec version. */
type AnySubscriptionChannel = RPC09.SubscriptionChannel | RPC0103.SubscriptionChannel;

/**
 * An `RpcProvider` whose requests and subscriptions share one WebSocket.
 *
 * The two axes are orthogonal: this is the same versioned `RpcChannel` the HTTP provider uses,
 * handed a different transport, paired with the `SubscriptionChannel` of the same spec version.
 * Pairing them here is what makes a version mismatch impossible — the request side and the
 * subscription side are resolved once, from one value.
 *
 * WebSocket stays opt-in. `RpcProvider` over HTTP remains the default, and in a browser the
 * socket earns its keep through subscriptions rather than through requests, where HTTP/2
 * keep-alive already amortizes connection setup.
 * @example
 * ```typescript
 * const provider = await WebSocketProvider.create({ nodeUrl: 'wss://…/rpc/v0_10' });
 * const block = await provider.getBlockNumber();
 * const sub = await provider.subscriptions.subscribeNewHeads();
 * ```
 */
export class WebSocketProvider extends RpcProvider {
  /** The socket both channels write to. Owned by this provider only when it built it. */
  public readonly transport: WsTransport;

  /** The `starknet_subscribe*` surface, on the same spec version as `channel`. */
  public readonly subscriptions: AnySubscriptionChannel;

  constructor(options: WebSocketProviderOptions) {
    const transport = options.transport ?? WebSocketProvider.buildTransport(options);
    super({ ...options, transport });
    this.transport = transport;
    this.subscriptions = WebSocketProvider.buildSubscriptionChannel(options, transport);
  }

  /**
   * Closes the socket when the provider leaves a `using` scope.
   *
   * Written as a normal method rather than a computed class member on purpose: a computed
   * `[Symbol.dispose]` is evaluated while the class is being defined, so on a runtime without the
   * symbol — older browsers the IIFE build targets — the whole module would throw on load, for
   * callers who never asked for `using`. Assigning to the prototype behind a guard keeps the
   * failure confined to the feature that needs it.
   */
  public dispose(): void {
    this.transport.close();
  }

  private static buildTransport(options: WebSocketProviderOptions): WsTransport {
    if (!options.nodeUrl) {
      throw new LibraryError('WebSocketProvider requires either a nodeUrl or a transport');
    }
    return new ReconnectingWsTransport({
      ...options,
      nodeUrl: options.nodeUrl,
    });
  }

  /**
   * Resolves the subscription channel the same way `RpcProvider` resolves its request channel
   * (`rpc.ts`), branch for branch including the `config.get('rpcVersion')` fallback. Any
   * divergence here would pair channels of two different specs on one socket, which is exactly
   * what the per-version namespaces exist to prevent.
   */
  private static buildSubscriptionChannel(
    options: WebSocketProviderOptions,
    transport: WsTransport
  ): AnySubscriptionChannel {
    const channelOptions = { transport, maxBufferSize: options.maxBufferSize };

    const forVersion = (specVersion: string): AnySubscriptionChannel => {
      if (isVersion('0.9', specVersion)) return new RPC09.SubscriptionChannel(channelOptions);
      if (isVersion('0.10', specVersion)) return new RPC0103.SubscriptionChannel(channelOptions);
      throw new LibraryError(`unsupported subscription channel for spec version: ${specVersion}`);
    };

    if (options.specVersion) return forVersion(options.specVersion);
    return forVersion(config.get('rpcVersion'));
  }

  /**
   * Probes the node for its spec version, then builds the matching pair of channels.
   *
   * The transport is created before the probe and handed to the result, so the socket survives
   * the probe channel being discarded — the reason the transport is a separate value at all.
   */
  // `this` is deliberately untyped. The base declares `create` with a `this` constructor type so
  // that a mixin-expanded class is generated; repeating that here with a narrower constructor
  // makes the derived static side unassignable to the base's. Mirroring the base's parameter and
  // return shapes keeps the override legal, and the cast below is checked by the tests.
  //
  // `T` defaults to `WebSocketProvider` because untying `this` also unties the inference: with no
  // contextual type, `T` would otherwise fall back to its constraint and hand the caller a plain
  // `RpcProvider`, on which `subscriptions` does not exist. An annotated target still wins.
  static async create<T extends RpcProvider = WebSocketProvider>(
    this: any,
    optionsOrProvider?: RpcProviderOptions
  ): Promise<T> {
    const options = (optionsOrProvider ?? {}) as WebSocketProviderOptions;
    const transport = options.transport ?? WebSocketProvider.buildTransport(options);
    const probe = new RPC09.RpcChannel({ ...options, transport });
    const spec = await probe.getSpecVersion();

    // Optimistic Warning in case of the patch version
    if (!isSupportedSpecVersion(spec)) {
      logger.warn(`Using incompatible node spec version ${spec}`);
    }

    if (isVersion('0.9', spec)) {
      return new this({ ...options, transport, specVersion: SupportedRpcVersion.v0_9_0 }) as T;
    }
    if (isVersion('0.10', spec)) {
      return new this({ ...options, transport, specVersion: SupportedRpcVersion.v0_10_3 }) as T;
    }

    throw new LibraryError(
      `Provided RPC node specification version ${spec} is not compatible with the SDK. SDK supported RPC versions ${Object.keys(SupportedRpcVersion).toString()}`
    );
  }
}

// Guarded: see `dispose()`. A runtime without `Symbol.dispose` simply does not get `using`
// support, instead of failing to load the module at all.
if (typeof Symbol.dispose !== 'undefined') {
  (WebSocketProvider.prototype as any)[Symbol.dispose] = WebSocketProvider.prototype.dispose;
}

declare module './ws' {
  interface WebSocketProvider {
    [Symbol.dispose](): void;
  }
}
