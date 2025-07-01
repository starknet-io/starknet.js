---
sidebar_position: 1
---

# 🔌 Connect and Interact with a Deployed Contract

Once you have a `Provider` or `Account` initialized, you can interact with contracts deployed on the Starknet network.

To connect to a contract, you primarily need two pieces of information:

- The contract's address.
- The contract's ABI (Application Binary Interface).

The ABI can be obtained from the compiled contract JSON file.

## Loading Contract Artifacts

It's recommended to load the compiled contract information from a local JSON file. Starknet.js provides a custom `json` utility to correctly parse `BigInt` values.

```typescript
import fs from 'fs';
import { json } from 'starknet';

const compiledErc20 = json.parse(
  fs.readFileSync('./compiledContracts/erc20.json').toString('ascii')
);
```

If you don't have the ABI file, you can fetch it from the network using a provider, but this should be done sparingly. It's best to save it locally for future use.

```typescript
import fs from 'fs';
import { json } from 'starknet';

// Note: This is a network intensive operation
const compressedContract = await provider.getClassAt(contractAddress);
fs.writeFileSync('./myAbi.json', json.stringify(compressedContract.abi, undefined, 2));
```

## Connecting to a Contract

To create a contract instance, you provide the ABI, address, and a `Provider` or an `Account`.

- A **Provider** connection is read-only. You can only call view functions.
- An **Account** connection allows you to both read from and write to the contract (i.e., send transactions).

```typescript
import { Contract, Provider, Account } from 'starknet';

// Read-only connection
const provider = new Provider({ rpc: { nodeUrl: 'YOUR_NODE_URL' } });
const erc20Address = '0x...';
const erc20 = new Contract(compiledErc20.abi, erc20Address, provider);

// Read-write connection
const account = new Account(provider, '0x...', '0x...');
const erc20_rw = new Contract(compiledErc20.abi, erc20Address, account);
```

Once connected, the `Contract` object will automatically populate its methods based on the ABI.

## Reading from a Contract (Calls)

If a contract method is a `view` function, calling it will not create a transaction and will return the contract's state.

Starknet.js provides several ways to call a view function. The most direct way is to call the method on the contract instance:

```typescript
// Direct call
const balance = await erc20.balanceOf(my_address);
console.log('Balance is:', balance);
```

This returns the result, with numbers automatically parsed into `BigInt`.

You can also use the generic `call` method, which is useful for dynamic function calls:

```typescript
// Using contract.call()
const balance1 = await erc20.call('balanceOf', [my_address]);
```

## Writing to a Contract (Invokes)

To execute a function that modifies the contract's state (an "invoke"), you must connect the contract to an `Account`.

Similar to calls, the most direct way is to call the method on the instance:

```typescript
// The 'transfer' function will be executed as a transaction
const { transaction_hash } = await erc20_rw.transfer(recipient_address, amount);

// You can wait for the transaction to be accepted
await account.waitForTransaction(transaction_hash);
```

### Passing Arguments

Starknet.js automatically compiles JavaScript data types into Cairo-compatible calldata. You can pass numbers, strings, BigInts, and objects directly.

For a function that takes a struct:

```cairo
// Cairo struct
struct MyStruct {
    a: felt252,
    b: u256,
}
```

You can pass a simple JavaScript object:

```typescript
import { cairo } from 'starknet';

await myContract.my_func({
  a: 123,
  b: cairo.uint256(456),
});
```

The `cairo` helper provides utilities for complex types like `uint256`, `tuple`, etc. However, for many common types, you can use plain JS equivalents:

- `uint256` can be a `BigInt` or an object `{ low: ..., high: ... }`.
- `tuples` can be an object with numeric keys `{ 0: ..., 1: ... }`.

## Advanced Interaction

### Estimating Fees

You can estimate the fee for a transaction before sending it using the `estimateFee` property:

```typescript
const fee = await erc20_rw.estimateFee.transfer(recipient_address, amount);
console.log('Estimated fee:', fee);
```

### Populating Transactions

If you need more control, you can prepare a transaction without executing it. This is useful for building multi-call transactions with `account.execute()`.

```typescript
const transferCall = erc20_rw.populateTransaction.transfer(recipient_address, amount);

// transferCall is now an object: { contractAddress, entrypoint, calldata }
// It can be used in a multicall
const { transaction_hash } = await account.execute([transferCall, ...]);
```

### Call Options (`withOptions`)

For the next call/invoke only, you can provide special options using `withOptions`. This is how you set `resourceBounds` for a V3 transaction.

```typescript
const { transaction_hash } = await myContract
  .withOptions({
    resourceBounds: {
      l1_gas: { max_amount: '0x186a0', max_price_per_unit: '0x1' },
      l2_gas: { max_amount: '0x186a0', max_price_per_unit: '0x1' },
      l1_data_gas: { max_amount: '0x186a0', max_price_per_unit: '0x1' },
    },
  })
  .my_invoke_function(arg1);
```

You can also control request and response parsing with `withOptions`.

### Parsing Transaction Events

The `Contract` instance can parse the events from a transaction receipt for you, based on its ABI:

```typescript
const receipt = await account.waitForTransaction(tx_hash);
const parsedEvents = myContract.parseEvents(receipt);
console.log(parsedEvents);
```

This will return an array of events emitted by `myContract` in that transaction, decoded into readable objects.

## Type-checking and Autocompletion

For an enhanced development experience with full type-safety and autocompletion on your contract methods, you can use `abi-wan-kanabi`.

See [this guide](./automatic_cairo_ABI_parsing.md) for more details.
