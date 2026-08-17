---
sidebar_position: 8
---

# Proofs (SNIP-36)

[SNIP-36](https://community.starknet.io/t/snip-36-in-protocol-proof-verification/116123) lets you run a Cairo transaction **off-chain**, generate a STARK proof of its execution, and submit only the **verified result** on-chain.

The key benefit: you can execute arbitrary Cairo logic (heavy computation, an age check, a whitelist membership test, a game outcome…) using **private inputs that are never revealed on-chain**, while everyone can still trust the result because it is backed by a proof.

Starknet.js provides the client-side pieces of this flow:

- `account.getSignedTransaction()` — build a signed transaction **without broadcasting it** (the "virtual" transaction sent to the proof server).
- `account.execute(call, { proof, proofFacts })` — submit the on-chain verification transaction, carrying the proof.
- `myCallData.decodeParameters()` — decode the message produced by the proof into a typed JavaScript object.

## Global architecture

The flow involves three actors and three phases:

```text
   YOUR APP (Starknet.js)            PROOF SERVER                STARKNET NETWORK
 ─────────────────────────       ──────────────────────       ────────────────────
 1. getSignedTransaction()
    → virtual INVOKE_TXN_V3
    (signed, NOT broadcast)
                          ──────►  2. generate STARK proof
                                      of the execution
                          ◄──────     { proof, proofFacts,
                                        l2ToL1Messages }
 3. decodeParameters()
    → read the result
 4. execute(verifyCall,
      { proof, proofFacts })  ───────────────────────────►  5. contract verifies
                                                                the proof on-chain
                                                                (online verification)
                                                                and stores the result
```

- **Phase 1 — Build (off-chain).** You build and sign a normal `INVOKE_TXN_V3`, but you never send it to the network. This is the _virtual transaction_.
- **Phase 2 — Prove (proof server).** The virtual transaction is replayed off-chain against a reference block's state, and a proof is generated.
- **Phase 3 — Verify (online, on-chain).** You send a regular transaction that attaches the proof. The target contract verifies it and applies the resulting state change.

### The proof server

Proof generation is a heavy, native operation (it needs roughly **18 GB of RAM** and about **40–50 s** per proof), so it cannot run in a browser. You run a dedicated proof server and call it over HTTP.

The reference implementation maintained by the Starknet Foundation is here:

> 🔗 **[starknet-innovation/snip-36-prover-backend](https://github.com/starknet-innovation/snip-36-prover-backend)**

Follow its README to build and start it. By default it exposes a `POST /prove` endpoint (e.g. on `http://localhost:3030`) that takes a block number and a virtual transaction, and streams back the proof.

## What the contract must provide

This guide focuses on the Starknet.js side, but you need a Cairo contract designed for SNIP-36. At a minimum it must expose two entry points:

- A **proof-generating function** (called _virtually_ by the proof server). It receives the public input and the private input, computes the result, and emits an **L2→L1 message** whose payload carries only the **public** result. The private input is used in the computation but never leaves the off-chain execution.
- An **on-chain verification function** (called normally, with the proof attached). It reads the proof facts injected by the protocol, checks that they match the submitted message, and then applies the state change (store the result, record a nullifier, release funds, etc.).

You do not need to understand the Cairo details to use the SDK — just know that the proof server produces an `l2ToL1Messages` payload that you decode and feed back into the verification call.

## Phase 1 — Build the virtual transaction

Use `account.getSignedTransaction()` to produce a fully signed `INVOKE_TXN_V3` **without** submitting it. The account nonce is left unchanged.

```typescript
import { Account, Contract, CallData, RpcProvider, type BigNumberish } from 'starknet';

const myProvider = new RpcProvider({ nodeUrl: myNodeUrl });
const account0 = new Account({ provider: myProvider, address: accountAddress, signer: privateKey });

const myContract = new Contract({ abi, address: contractAddress, providerOrAccount: account0 });
const myCallData = new CallData(abi);

// public input is revealed ; private input stays secret
const publicInput = { user_id: 1234 };
const privateInput = { super_secret: 100 };

// build the call to the proof-generating function
const virtualCall = myContract.populate('create_proof_of_secret', {
  public_input: publicInput,
  private_input: privateInput,
});

// sign WITHOUT broadcasting → this is the "virtual" transaction
const tx = await account0.getSignedTransaction(virtualCall);

// reference block the proof will be computed against
const currentBlock = await myProvider.getBlockNumber();
```

:::warning Privacy of the private input
If you call `getSignedTransaction()` without providing `resourceBounds`, Starknet.js estimates the fees automatically, which sends the full calldata (**including the private input**) to your RPC node.

If the private input must stay truly secret, set `resourceBounds` manually instead of relying on automatic fee estimation:

```typescript
const tx = await account0.getSignedTransaction(virtualCall, { resourceBounds });
```

:::

## Phase 2 — Request the proof

Send the block number and the virtual transaction to your proof server. The server replies (typically as a Server-Sent Events stream) with:

```typescript
type ProveResult = {
  proof: string; // base64-encoded STARK proof
  proofFacts: BigNumberish[]; // facts injected on-chain during verification
  l2ToL1Messages?: {
    from_address: BigNumberish;
    payload: BigNumberish[];
    to_address: BigNumberish;
  }[];
};
```

A minimal client (`requestProof`) that posts to `/prove` and reads the SSE stream is available here: [RequestProof.ts](https://github.com/PhilippeR26/starknet.js-workshop-typescript/blob/main/src/scripts/Starknet142/Starknet142-Sepolia/RequestProof.ts). In your code it boils down to:

```typescript
const proofRes: ProveResult = await requestProof(currentBlock, tx);

console.log('proof size =', proofRes.proof.length);
console.log('proofFacts =', proofRes.proofFacts);
```

## Phase 3 — Decode the result message

The result computed off-chain is carried in the first L2→L1 message payload, as a flat array of felts. Use `CallData.decodeParameters()` to turn it back into a typed object, using the Cairo type name of the message struct:

```typescript
type L1L2message = {
  user_id: BigNumberish;
  is_whitelisted: boolean;
};

const messageFromProof = myCallData.decodeParameters(
  'proof_of_secret::L1L2message',
  proofRes.l2ToL1Messages![0].payload as string[]
) as L1L2message;

console.log({ messageFromProof }); // { user_id: 1234n, is_whitelisted: true }
```

## Phase 4 — Verify on-chain

Finally, call the contract's verification function with `account.execute()`, passing the `proof` and `proofFacts` in the options. Starknet.js automatically extends the v3 transaction hash with the proof facts, so the protocol can verify the proof.

```typescript
const verifyCall = myContract.populate('verify_proof_of_secret', {
  public_message: messageFromProof,
});

const tx2 = await account0.execute(verifyCall, {
  proof: proofRes.proof,
  proofFacts: proofRes.proofFacts,
});

const receipt = await myProvider.waitForTransaction(tx2.transaction_hash);
console.log('Verification success =', receipt.isSuccess());

// read the result the contract stored after a successful verification
const result = await myContract.read_result();
console.log('is whitelisted, read from contract =', result);
```

:::tip
`account.execute(call, { proof, proofFacts })` keeps the standard `execute()` signature: when `proof`/`proofFacts` are present, the extra `proof_facts_hash` is appended to the transaction hash automatically.
:::

## Full working example

A complete, runnable end-to-end example (build → prove → decode → verify) is available here: [21.testSecretProof.ts](https://github.com/PhilippeR26/starknet.js-workshop-typescript/blob/main/src/scripts/Starknet142/Starknet142-Sepolia/21.testSecretProof.ts).
