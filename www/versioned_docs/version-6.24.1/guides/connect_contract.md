---
sidebar_position: 5
---

# 🔌 Connect a deployed contract

Once your provider is initialized, you can connect a contract already deployed in the network.

You need 2 pieces of data:

- the address of the contract
- the ABI file of the contract (or the compiled/compressed contract file, that includes the abi)

> If you don't have the abi file, the `provider.getClassAt()` and `provider.getClassByHash()` commands will recover the compressed contract file. As these methods generate a significant workload for the sequencer/node, it's recommended to store the result on your computer to be able to reuse it later without using the provider each time:

```typescript
import fs from 'fs';

const compressedContract = await provider.getClassAt(addrContract);
fs.writeFileSync('./myAbi.json', json.stringify(compressedContract.abi, undefined, 2));
```

> When possible, prefer to read the compiled contract from a local Json file, as it's much more faster, using the `json.parse` util provided by Starknet.js, as shown below.

## Get the abi from a compiled/compressed file

```typescript
import { RpcProvider, Contract, json } from 'starknet';
```

If you have the compiled/compressed file of the contract, use this code to recover all data, including the ABI:

```typescript
const compiledContract = json.parse(
  fs.readFileSync('./compiledContracts/test.json').toString('ascii')
);
```

> Note the `json.parse` util provided by Starknet.js

## Connect to the contract

```typescript
// initialize provider
const provider = new RpcProvider({ nodeUrl: `${myNodeUrl}` });

// initialize deployed contract
const testAddress = '0x7667469b8e93faa642573078b6bf8c790d3a6184b2a1bb39c5c923a732862e1';
const compiledTest = json.parse(fs.readFileSync('./compiledContracts/test.json').toString('ascii'));

// connect the contract
const myTestContract = new Contract(compiledTest.abi, testAddress, provider);
```

## Typechecking and autocompletion

If you want to have typechecking and autocompletion for your contracts functions calls and catch typing errors early, you can use Abiwan!

See [this guide](./automatic_cairo_ABI_parsing.md) for more details.
