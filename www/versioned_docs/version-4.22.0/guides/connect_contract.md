---
sidebar_position: 5
---

# 🔌 Connect a deployed contract

Once your provider is initialized, you can connect a contract already deployed in the network.

You need 2 data:

- the address of the contract
- the ABI file of the contract (or the compiled contract file, that includes the abi)

> If you don't have the abi file, the `provider.getClassAt()` command can help you.

> When possible, prefer to read the compiled contract from a local Json file, as it's much more faster, using the `json.parse` util provided by Starknet.js, as shown below.

## Get the abi from a compiled file

```typescript
import { Provider, Contract, json } from "starknet";
```

If you have the compiled file of the contract, use this code to recover all data, including ABI:

```typescript
const compiledContract = json.parse(fs.readFileSync("./compiledContracts/test.json").toString("ascii"));
```

> Note the `json.parse` util provided by Starknet.js

## Connect the contract

```typescript
// initialize provider
const provider = new Provider({ sequencer: { baseUrl:"goerli-alpha"  } });

// initialize deployed contract
const testAddress = "0x7667469b8e93faa642573078b6bf8c790d3a6184b2a1bb39c5c923a732862e1";
const compiledTest = json.parse(fs.readFileSync("./compiledContracts/test.json").toString("ascii"));

// connect the contract
const myTestContract = new Contract(compiledTest.abi, testAddress, provider);
```
