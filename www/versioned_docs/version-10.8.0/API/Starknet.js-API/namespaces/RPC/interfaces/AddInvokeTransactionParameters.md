# Interface: AddInvokeTransactionParameters

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/wallet-api/components.d.ts:60

INVOKE_TXN_V3

## See

https://github.com/starkware-libs/starknet-specs/blob/master/api/starknet_api_openrpc.json

## Properties

### calls

> **calls**: [`Call`](../type-aliases/Call.md)[]

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/wallet-api/components.d.ts:64

Calls to invoke by the account

---

### proof?

> `optional` **proof?**: [`STRK20_PROOF`](../../../../type-aliases/STRK20_PROOF.md)

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/wallet-api/components.d.ts:69

Optional SNIP-36-compliant ZK proof. Required when submitting a STRK20 call
produced by wallet_strk20PrepareInvoke; omitted for regular invocations.
