# Type Alias: STRK20_ACTION

> **STRK20_ACTION** = [`STRK20_DEPOSIT_ACTION`](../../../../type-aliases/STRK20_DEPOSIT_ACTION.md) \| [`STRK20_WITHDRAW_ACTION`](../../../../type-aliases/STRK20_WITHDRAW_ACTION.md) \| [`STRK20_TRANSFER_ACTION`](../../../../type-aliases/STRK20_TRANSFER_ACTION.md) \| [`STRK20_INVOKE_ACTION`](../../../../type-aliases/STRK20_INVOKE_ACTION.md) \| [`STRK20_SHADOW_ACCOUNT_INVOKE_ACTION`](STRK20_SHADOW_ACCOUNT_INVOKE_ACTION.md)

Defined in: node_modules/@starknet-io/starknet-types-0104/dist/types/wallet-api/components.d.ts:271

A single action to perform via the STRK20 privacy protocol. The `type` field
discriminates the variant.
