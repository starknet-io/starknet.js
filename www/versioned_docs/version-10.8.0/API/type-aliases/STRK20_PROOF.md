# Type Alias: STRK20_PROOF

> **STRK20_PROOF** = `object`

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/wallet-api/components.d.ts:152

SNIP-36-compliant zero-knowledge proof material (an in-protocol stwo-cairo
proof) that must be included with the call when submitting the STRK20
transaction on-chain. When the prepared call was built in simulate mode all
three fields are present but empty.

## Properties

### data

> **data**: `string`

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/wallet-api/components.d.ts:153

---

### output

> **output**: [`FELT`](../Starknet.js-API/namespaces/RPC/type-aliases/FELT.md)[]

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/wallet-api/components.d.ts:154

---

### proof_facts

> **proof_facts**: [`FELT`](../Starknet.js-API/namespaces/RPC/type-aliases/FELT.md)[]

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/wallet-api/components.d.ts:155
