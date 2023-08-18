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
export const tAbi = [
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

Later on, to use it in our code, we have 2 options.

### Option 1

```js
import { tAbi } from '../__mocks__/hello';
import { TypedContract } from '../src';

let cairo1Contract: TypedContract<typeof tAbi>; // tAbi is your Cairo contract ABI
```

After that, you can use `cairo1Contract` in your code as you would before, but with autocomplete and type checking!

For example:

```js
const tx = await cairo1Contract.increase_balance(100);
```

### Option 2

```js
import { tAbi } from '../__mocks__/hello';

// ...

let cairo1Contract = new Contract(compiledHelloSierra.abi, dd.deploy.contract_address, account);

let cairo1ContractTyped = cairo1Contract.typed(tAbi);

cairo1ContractTyped.test_bool();
```
