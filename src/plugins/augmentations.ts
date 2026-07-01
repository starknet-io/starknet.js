// Default plugin methods are surfaced on the public `RpcProvider` and `Account`
// types via same-module declaration merging, declared directly next to each
// class:
//   - src/provider/rpc.ts      -> interface RpcProvider extends ...ProviderMethods
//   - src/account/default.ts   -> interface Account extends ...AccountMethods
//
// This replaces the previous `declare module '../provider/rpc'` /
// `declare module '../account/default'` augmentations: cross-module
// augmentation with relative paths is erased when tsup bundles every `.d.ts`
// into a single declaration file, so the methods were invisible to consumers
// of the published package.

export {};
