# Type Alias: STRK20_CALL_AND_PROOF

> **STRK20_CALL_AND_PROOF** = `object`

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/wallet-api/components.d.ts:165

A Starknet call that materializes a STRK20 transaction, together with the
SNIP-36-compliant zero-knowledge proof needed to submit it. When produced in
simulate mode the proof fields are present but empty (proof.data is an empty
string, proof.output and proof.proof_facts are empty arrays); in that case the
call is not submittable on-chain and is only useful for fee estimation or UI
previews.

## Properties

### call

> **call**: [`Call`](Call.md)

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/wallet-api/components.d.ts:166

---

### proof

> **proof**: [`STRK20_PROOF`](../../../../type-aliases/STRK20_PROOF.md)

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/wallet-api/components.d.ts:167
