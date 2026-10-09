import { RpcProvider } from './rpc';

// Declarations, not `export { RpcProvider as Provider }`: the build drops the JSDoc of an export
// specifier from `dist/index.d.ts`, so users would never see the deprecation.

/**
 * @deprecated Use {@link RpcProvider} instead. `Provider` is an alias of it, kept only for
 * backward compatibility, and will be removed in a future major version. The two are the same
 * class, so the migration is a rename: no behavior changes.
 */
export const Provider = RpcProvider;

/**
 * @deprecated Use {@link RpcProvider} instead. `Provider` is an alias of it, kept only for
 * backward compatibility, and will be removed in a future major version. The two are the same
 * class, so the migration is a rename: no behavior changes.
 */
export type Provider = RpcProvider;

export { LibraryError, RpcError } from '../utils/errors';
export * from './interface';
export * from './rpc';
export * from './ws';
export * from './modules';
