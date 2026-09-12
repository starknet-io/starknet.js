# Type Alias: PROVE_TRANSACTION_RESULT

> **PROVE_TRANSACTION_RESULT** = `object`

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/proving-api/components.d.ts:5

The result of proving a transaction

## Properties

### proof

> **proof**: [`PROOF`](../../../type-aliases/PROOF.md)

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/proving-api/components.d.ts:6

---

### proof_facts

> **proof_facts**: [`PROOF_FACTS`](../../../type-aliases/PROOF_FACTS.md)

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/proving-api/components.d.ts:7

---

### l2_to_l1_messages

> **l2_to_l1_messages**: [`MSG_TO_L1`](../../../type-aliases/MSG_TO_L1.md)[]

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/proving-api/components.d.ts:8

---

### additional_data?

> `optional` **additional_data?**: `Record`\<`string`, `unknown`\>

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/proving-api/components.d.ts:15

Opaque side-channel attached alongside the proof and relayed verbatim by the prover
from the external blocking check service. Optional; omitted from the response when absent.
The prover does not interpret its contents — concrete keys (e.g. a screening signature
under `signature`) are defined by the producing service, not by this API.
