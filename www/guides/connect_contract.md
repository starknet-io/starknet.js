---
sidebar_position: 5
---
# 🔌 Connect a deployed contract :
Once your provider initialized, you can connect a contract already deployed in the network.  
You need 2 data :
- the address of the contract
- the ABI file of the contract (or the compiled contract file, that includes the abi)  
>If you don't have the abi file, the `provider.getcode()` command can help you.

```typescript
import { Provider, Contract,json } from "starknet";
```
## Get the abi from a compiled file :
If you have the compiled file of the contract, use this code to recover all data, including ABI :
```typescript
const compiledContract = json.parse(fs.readFileSync("./compiledContracts/test.json").toString("ascii"));
```
## Connect the contract :

```typescript
// intialize provider
const provider = new Provider({ sequencer: { baseUrl:"goerli-alpha"  } });
// initialize deployed contract
const testAddress = "0x7667469b8e93faa642573078b6bf8c790d3a6184b2a1bb39c5c923a732862e1";
const compiledTest = json.parse(fs.readFileSync("./compiledContracts/test.json").toString("ascii"));
// connect the contract
const myTestContract = new Contract(compiledTest.abi, testAddress, provider);
```
