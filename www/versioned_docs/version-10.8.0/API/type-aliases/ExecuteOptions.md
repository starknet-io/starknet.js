# Type Alias: ExecuteOptions

> **ExecuteOptions** = `Pick`\<[`CommonContractOptions`](CommonContractOptions.md), `"parseRequest"`\> & `object` & `Partial`\<[`UniversalDetails`](../interfaces/UniversalDetails.md)\>

Defined in: [src/contract/types/index.type.ts:98](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/contract/types/index.type.ts#L98)

## Type Declaration

### signature?

> `optional` **signature?**: [`Signature`](Signature.md)

Used when invoking with only provider

### salt?

> `optional` **salt?**: `string`

Deployer contract salt

### paymasterDetails?

> `optional` **paymasterDetails?**: [`PaymasterDetails`](../interfaces/PaymasterDetails.md)

### maxFeeInGasToken?

> `optional` **maxFeeInGasToken?**: [`BigNumberish`](BigNumberish.md)

### waitForTransaction?

> `optional` **waitForTransaction?**: `boolean`

Wait for transaction to be included in a block

#### Default

```ts
false;
```
