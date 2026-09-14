export {
  /**
   * @deprecated Use {@link RpcProvider} instead. `Provider` is an alias of it, kept only for
   * backward compatibility, and will be removed in a future major version. The two are the same
   * class, so the migration is a rename: no behavior changes.
   */
  RpcProvider as Provider,
} from './rpc';
export { LibraryError, RpcError } from '../utils/errors';
export * from './interface';
export * from './rpc';
export * from './ws';
export * from './modules';
