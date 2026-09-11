# Type Alias: STRK20_INVOKE_ACTION

> **STRK20_INVOKE_ACTION** = `object`

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/wallet-api/components.d.ts:218

Invokes an arbitrary contract entry point as part of the same STRK20
transaction. Calldata items may be literal felts or wallet-resolved
placeholders that the wallet substitutes during action assembly:
${openNoteIds[N]} for the ID of the Nth open note (the Nth transfer action with
amount "OPEN"), or ${poolAddress} for the privacy pool address.

## Properties

### type

> **type**: `"invoke"`

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/wallet-api/components.d.ts:219

---

### contract

> **contract**: [`ADDRESS`](../Starknet.js-API/namespaces/RPC/type-aliases/ADDRESS.md)

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/wallet-api/components.d.ts:220

---

### calldata

> **calldata**: [`STRK20_CALLDATA_ITEM`](STRK20_CALLDATA_ITEM.md)[]

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/wallet-api/components.d.ts:221
