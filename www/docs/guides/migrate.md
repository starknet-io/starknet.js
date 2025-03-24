---
sidebar_position: 101
---

# Migrate from v6 to v7

This document only covers the features present in v6 which have changed in some significant way in v7.

If you encounter any missing changes, please let us know and we will update this guide.

## Fetch dependencies

`isomorphic-fetch` and `fetch-cookie` have been removed as dependencies.

For users who might require the features of either library, a `baseFetch` override parameter has been enabled for the `RpcProvider` and `RpcChannel` classes, including classes that inherit from them such as `Account` and `WalletAccount`.

```typescript
import makeFetchCookie from 'fetch-cookie';
import isomorphicFetch from 'isomorphic-fetch';

const provider = new RpcProvider({
  baseFetch: makeFetchCookie(isomorphicFetch),
});
```

## ...
