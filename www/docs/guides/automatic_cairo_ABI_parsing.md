---
sidebar_position: 18
---

# Automatic TypeScript parsing of Cairo ABI-s

Starknet.js has integrated [Abi-Wan-Kanabi](https://github.com/keep-starknet-strange/abi-wan-kanabi), the standalone TypeScript parser for Cairo smart contracts.

It enables on-the-fly typechecking and autocompletion for contract calls directly in TypeScript. Developers can now catch typing mistakes early, prior to executing a call on-chain, thus enhancing the overall DAPP development experience.

## Supported Cairo ABI-s

Please take a look on the Abi-Wan [documentation](https://github.com/keep-starknet-strange/abi-wan-kanabi#cairo-versions) for a list of supported Cairo ABI-s.

## Usage

First, you need to wrap your ABI in a array and export it as a `const`.

Example:

```js
export const ABI = [
  {
    type: 'function',
    name: 'increase_balance',
    inputs: [
      {
        name: 'amount',
        type: 'core::felt252',
      },
    ],
    outputs: [],
    state_mutability: 'external',
  },
] as const;
```

Later on, to use it in our code:

```js
import { Contract, RpcProvider, constants } from 'starknet';

const address = "YOUR_ADDRESS_HERE";
const provider = new RpcProvider({ nodeUrl: `${yourNodeUrl}` });
const contract = new Contract(ABI, address, provider).typedv2(ABI);

// Notice the autocompletion and typechecking in your editor
const result = await contract.increase_balance(100);
```

After that, you can use `contract` in your code as you would before, but with autocompletion and typechecking!

### Generate `abi.ts` from the contract class

If you have your contract class in a Json file, you can use the abiwan CLI to generate the `abi.ts` typescript file

```bash
npx abi-wan-kanabi --input /path/to/contract_class.json --output /path/to/abi.ts
```

### Usage for deployed contracts

Let's say you want to interact with the [Ekubo: Core](https://starkscan.co/contract/0x00000005dd3d2f4429af886cd1a3b08289dbcea99a294197e9eb43b0e0325b4b) contract

You need to first get the **ABI** of the contract and export it in a typescript file, you can do so using one command combining both [`starkli`](https://github.com/xJonathanLEI/starkli) (tested with version 0.2.3) and `npx abi-wan-kanabi`:

```bash
starkli class-at "0x00000005dd3d2f4429af886cd1a3b08289dbcea99a294197e9eb43b0e0325b4b" --network mainnet | npx abi-wan-kanabi --input /dev/stdin --output abi.ts
```

```typescript
import { Contract, RpcProvider, constants } from "starknet";
import { ABI } from "./abi";

const address = "0x00000005dd3d2f4429af886cd1a3b08289dbcea99a294197e9eb43b0e0325b4b";
const provider = new RpcProvider({ nodeUrl: constants.NetworkName.SN_MAIN });
const contract = new Contract(ABI, address, provider).typedv2(ABI);

// Notice the types inferred for the parameter and the returned value
const primary_inteface_id = contract.get_primary_interface_id()
const protocol_fees_collected = contract.get_protocol_fees_collected('0x1')
```
