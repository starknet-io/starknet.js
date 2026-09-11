# Type Alias: STRK20_SHADOW_ACCOUNT_INVOKE_ACTION

> **STRK20_SHADOW_ACCOUNT_INVOKE_ACTION** = `object`

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/wallet-api/components.d.ts:253

Invokes one or more contract calls through the user's STRK20 shadow account
for a dapp, routed via the shadow account anonymizer. The shadow account is
selected by (dapp_name, nonce); each nonce maps to a distinct, deterministic
shadow account. The proceeds of the calls are settled into the open notes
created by transfer actions with amount "OPEN" in the same transaction, so the
usual rule applies: the number of open notes filled by this action must match
the number of open notes created in the transaction.

## Properties

### type

> **type**: `"shadow_account_invoke"`

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/wallet-api/components.d.ts:254

---

### dapp_name

> **dapp_name**: [`STRK20_DAPP_NAME`](../../../../type-aliases/STRK20_DAPP_NAME.md)

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/wallet-api/components.d.ts:256

The dapp that scopes the shadow account

---

### nonce

> **nonce**: [`FELT`](FELT.md)

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/wallet-api/components.d.ts:258

The shadow account nonce; each nonce selects a distinct shadow account for this user + dapp

---

### calls

> **calls**: [`Call`](Call.md)[]

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/wallet-api/components.d.ts:260

The contract calls to execute through the shadow account, in order (min 1).

---

### collect_policy

> **collect_policy**: [`STRK20_COLLECT_POLICY`](../../../../type-aliases/STRK20_COLLECT_POLICY.md)

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/wallet-api/components.d.ts:265

A single policy applied to every open note this action settles: how much of
the shadow account's balance each note collects.
