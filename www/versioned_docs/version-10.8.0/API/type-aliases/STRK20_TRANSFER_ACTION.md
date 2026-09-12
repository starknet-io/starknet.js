# Type Alias: STRK20_TRANSFER_ACTION

> **STRK20_TRANSFER_ACTION** = `object`

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/wallet-api/components.d.ts:204

Privately transfers funds inside the privacy pool to another registered user.

## Properties

### type

> **type**: `"transfer"`

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/wallet-api/components.d.ts:205

---

### token

> **token**: [`ADDRESS`](../Starknet.js-API/namespaces/RPC/type-aliases/ADDRESS.md)

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/wallet-api/components.d.ts:206

---

### amount

> **amount**: [`FELT`](../Starknet.js-API/namespaces/RPC/type-aliases/FELT.md) \| `"OPEN"`

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/wallet-api/components.d.ts:208

FELT amount in the token's smallest unit, or the literal "OPEN" to create a new open note

---

### recipient

> **recipient**: [`ADDRESS`](../Starknet.js-API/namespaces/RPC/type-aliases/ADDRESS.md)

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/wallet-api/components.d.ts:209
