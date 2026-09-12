# Type Alias: ContractOptions

> **ContractOptions** = `object` & [`CommonContractOptions`](CommonContractOptions.md)

Defined in: [src/contract/types/index.type.ts:82](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/contract/types/index.type.ts#L82)

## Type Declaration

### abi

> **abi**: [`Abi`](Abi.md)

### address

> **address**: `string`

### providerOrAccount?

> `optional` **providerOrAccount?**: [`ProviderOrAccount`](ProviderOrAccount.md)

Connect account to read and write methods
Connect provider to read methods

#### Default

```ts
creates a new RpcProvider if not provided
```

### classHash?

> `optional` **classHash?**: `string`

Class hash of the contract
