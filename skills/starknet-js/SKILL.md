---
name: starknet-js
description: Use when writing or debugging JavaScript/TypeScript that interacts with Starknet through the starknet.js SDK — building Call objects or calldata, encoding/decoding Cairo types (felt252, u256, structs, arrays, spans, ByteArray, Option/Result/custom enums), or working with contracts, accounts, providers, transactions, fees, deployment, or events.
---

# starknet.js

Official JS/TS SDK for Starknet. This skill targets **starknet.js v10** (API valid for v9, mostly for v8).

**Do not trust training-data memory of starknet.js**: it is typically v5/v6-era and wrong. Constructors now take option objects, only V3 transactions exist (STRK fees, no `maxFee`), and calldata helpers changed. When this skill and memory disagree, the skill wins.

Layer model: `Account` (signs & submits) wraps `RpcProvider` (parses, retries) wraps `RpcChannel` (raw JSON-RPC).

## Reference files

- **[calldata.md](calldata.md)** — REQUIRED reading before encoding or decoding anything: Call/calldata construction, wire format of every Cairo type, enums (Option/Result/custom), ByteArray, string auto-detection traps, response parsing, `decodeParameters`. All examples verified against v10.4.0.
- **[interacting.md](interacting.md)** — providers, accounts, contracts, multicall, fees/tips, declare/deploy, receipts, events, RPC-version compatibility.

## Non-negotiable v8+ rules

- Only **V3** transactions (INVOKE/DECLARE/DEPLOY_ACCOUNT); fees paid in STRK via `resourceBounds` + `tip`. Never suggest `maxFee` or V1/V2.
- Constructors take an options object: `new Account({ provider, address, signer })`, `new Contract({ abi, address, providerOrAccount })`, `new RpcProvider({ nodeUrl })`.
- Never prepend an array length to calldata arrays — the library adds it.

## Quick reference

| Task                      | API                                                                                                                    |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Connect to node           | `new RpcProvider({ nodeUrl })` — or `await RpcProvider.create({ nodeUrl })` to auto-detect RPC version                 |
| Account                   | `new Account({ provider, address, signer: privateKey })`                                                               |
| Contract                  | `new Contract({ abi, address, providerOrAccount })`                                                                    |
| Read                      | `await myContract.my_view_fn(arg1, arg2)` → parsed JS value                                                            |
| Write                     | `const { transaction_hash } = await myContract.my_fn(args)` then `await provider.waitForTransaction(transaction_hash)` |
| Build a Call              | `myContract.populate('fn', { ...args })` → `{ contractAddress, entrypoint, calldata }`                                 |
| Compile calldata (ABI)    | `myContract.compile('fn', args)` or `new CallData(abi).compile('fn', args)`                                            |
| Compile calldata (no ABI) | `CallData.compile(args)` — several traps, see calldata.md                                                              |
| Multicall                 | `await account.execute([call1, call2])`                                                                                |
| Decode raw felts          | `new CallData(abi).decodeParameters('core::…::Type', feltArray)`                                                       |
| Events                    | `myContract.parseEvents(receipt)`, `provider.getEvents({ ... })`                                                       |
| Deploy                    | `await Contract.factory({ contract, casm, account, constructorCalldata })`                                             |

## Top mistakes (from outdated model knowledge)

| Mistake                                              | Fix                                                                      |
| ---------------------------------------------------- | ------------------------------------------------------------------------ |
| `new Account(provider, address, pk)` positional      | Options object (see above)                                               |
| `maxFee`, V1/V2 transactions, ETH fees               | V3 only; `resourceBounds` from `estimateInvokeFee`, `tip`                |
| Manually prepending `array_len`                      | Never — automatic                                                        |
| `CallData.compile([myU256Bigint])` gives 1 felt      | Use `cairo.uint256(n)` without ABI; a plain bigint is fine only with ABI |
| `new CairoCustomEnum({ OnlyActive: v })` without ABI | Without ABI, list ALL variants (`undefined` for inactive)                |
| Expecting `.res`-style result objects                | Cairo 1 returns the value directly (bigint, object, array, enum class)   |
