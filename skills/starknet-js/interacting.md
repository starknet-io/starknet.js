# Providers, accounts, contracts, transactions (starknet.js v10)

## RpcProvider

```ts
import { RpcProvider, constants, BlockTag } from 'starknet';

const provider = new RpcProvider({ nodeUrl: 'https://…/rpc/v0_10' }); // default channel: RPC 0.10
const provider09 = new RpcProvider({ nodeUrl: '…/rpc/v0_9', specVersion: '0.9.0' });
const auto = await RpcProvider.create({ nodeUrl }); // queries the node, picks the right channel
const sepolia = new RpcProvider(); // random public Sepolia node
const mainnet = new RpcProvider({ nodeUrl: constants.NetworkName.SN_MAIN });
```

- The constructor does NOT read the RPC version from the URL: pass `specVersion` or use `RpcProvider.create()`.
- v10 talks RPC spec **0.9 and 0.10** (v8: 0.8/0.9; v7: 0.7/0.8). Devnet: `http://127.0.0.1:5050/rpc`.
- Useful: `getSpecVersion()`, `getBlock('latest')`, `getClassAt(addr)` (→ `{ abi }`), `getNonceForAddress`, `getEvents`, `waitForTransaction`.
- Batching: `new RpcProvider({ batch: 0 })` merges concurrent requests into one HTTP call.
- Errors: `catch (e) { if (e instanceof RpcError && e.isType('CONTRACT_NOT_FOUND')) … }`.

## Account

```ts
import { Account, EthSigner } from 'starknet';

const account = new Account({
  provider,
  address: accountAddress,
  signer: privateKey, // string | Uint8Array | SignerInterface (e.g. new EthSigner(pk))
  // optional: cairoVersion: '1', paymaster, deployer (defaultDeployer | legacyDeployer),
  // defaultTipType: 'recommendedTip' | 'minTip' | 'maxTip' | 'averageTip' | 'medianTip' | 'modeTip' | 'p90Tip' | 'p95Tip'
});
```

Only V3 transactions (STRK fees). Fee control per call via details object: `{ tip, resourceBounds, nonce, blockIdentifier }`.

```ts
// fees: estimate then reuse
const { resourceBounds } = await account.estimateInvokeFee(calls);
const tipStats = await provider.getEstimateTip();
const res = await account.execute(calls, { resourceBounds, tip: tipStats.recommendedTip });

// multicall — atomic, single transaction, ordered
const res2 = await account.execute([call1, call2, call3]);
await provider.waitForTransaction(res2.transaction_hash);
```

Other: `account.getNonce()`, `account.signMessage(typedData)`, `account.getSignedTransaction(calls)` (build without sending), `account.executeFromOutside` (SNIP-9), `account.executePaymasterTransaction` (SNIP-29 gas in any token).

## Contract

```ts
import { Contract, json } from 'starknet';
// parse compiled artifacts with json.parse (handles bigints), NOT JSON.parse
const sierra = json.parse(fs.readFileSync('./x.contract_class.json').toString('ascii'));

const myContract = new Contract({
  abi: sierra.abi,
  address: contractAddress,
  providerOrAccount: account, // Provider = read-only; Account = read-write
});
```

- Read (view fn): `const v = await myContract.get_balance(addr);` — parsed JS value (see calldata.md).
- Write: `const { transaction_hash } = await myContract.transfer(to, amount);` then `waitForTransaction`.
- `myContract.withOptions({ blockIdentifier, tip, resourceBounds, parseRequest, parseResponse, formatResponse, waitForTransaction }).fn(args)` — applies to the **next call only**. With `waitForTransaction: true`, `invoke` waits and returns the successful receipt (throws on failure).
- `myContract.estimateFee.transfer(to, amount)` → `{ resourceBounds, … }`.
- `myContract.populate('fn', args)` → `Call` for multicall; `myContract.compile('fn', args)` → `Calldata` (v10).
- Dynamic name: `await myContract[fnName](...args)`. Check deployment: `await myContract.isDeployed()`.
- Typed ABI (autocompletion): `const typed = myContract.typedv2(myAbiAsConst);` (abi-wan-kanabi).

## Receipts

```ts
const txR = await provider.waitForTransaction(transaction_hash);
txR.isSuccess();
txR.isReverted();
txR.isError();
txR.match({
  success: (r) => console.log('ok', r),
  reverted: (r) => console.log('reverted', r.revert_reason),
  _: () => console.log('other'),
});
if (txR.isSuccess()) {
  const receipt = txR.value;
} // raw receipt (events, actual_fee, …)
```

## Declare & deploy

```ts
// one-shot: declare (if needed) + deploy + ready-to-use instance
const myContract = await Contract.factory({
  contract: sierra,
  casm, // or: classHash (+ optional abi) for deploy-only
  account,
  constructorCalldata: { name: 'MyToken', symbol: 'MTK' }, // ABI-checked
  // salt, unique: false → predictable address
});

// fine-grained account methods
const d = await account.declareIfNot({ contract: sierra, casm }); // '' tx hash if known
const dep = await account.deployContract({ classHash, constructorCalldata, abi }); // via UDC
const both = await account.declareAndDeploy({ contract: sierra, casm, constructorCalldata });
const newAcc = await account.deployAccount({ classHash, constructorCalldata, addressSalt });
```

Address precomputation: `hash.calculateContractAddressFromHash(salt, classHash, constructorCalldata, deployerOrZero)`.

## Events

```ts
// from a receipt (contract must have emitted them)
const events = myContract.parseEvents(txR); // [{ EventName: { field: value } }]

// searching blocks
const keyFilter = [[num.toHex(hash.starknetKeccak('EventPanic'))], ['0x8']];
// semantics: [[A,B],[C]] = (key0 = A or B) AND (key1 = C); [[]] = no filter on that key
const chunk = await provider.getEvents({
  address,
  from_block: { block_number: n0 },
  to_block: { block_number: n1 },
  keys: keyFilter,
  chunk_size: 100,
  // loop with continuation_token: chunk.continuation_token until undefined
});
```

Caution: events defined in a Cairo component without `#[flat]` carry extra leading key hashes — shift the filter accordingly.

## Fast consecutive transactions (gaming)

FastExecute plugin (installed by default) + `blockIdentifier: BlockTag.PRE_CONFIRMED` on the provider (RPC ≥ 0.9): `account.fastExecute(call, { tip }, { retries: 30, retryInterval: 500 })` → `{ isReady, … }` in 2–3 s instead of >10 s. Not for deployments; heavy on the node.

## Utilities cheat-sheet

```ts
hash.getSelectorFromName('transfer'); // entrypoint selector
hash.starknetKeccak('EventName'); // event key (bigint)
stark.randomAddress(); // random salt/private key material
encode.addHexPrefix / removeHexPrefix;
num.toHex(bn);
num.toBigInt(x);
num.hexToDecimalString(h);
shortString / byteArray / cairo / uint256; // see calldata.md
```

## Version compatibility (node RPC spec ↔ starknet.js)

| RPC spec | starknet.js       |
| -------- | ----------------- |
| 0.7.x    | v6 / v7           |
| 0.8.x    | v7 / v8           |
| 0.9.x    | v8 / v9 / v10     |
| 0.10.x   | v9 (0.10.0) / v10 |

Starknet ≥ 0.14 (v8+): V3-only transactions, pre-confirmed block state, mandatory tips.
