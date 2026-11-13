---
sidebar_position: 2
---

# Getting Started

## Installation

```bash
# use the main branch

npm install starknet

# to use latest features (merges in develop branch)

npm install starknet@next
```

## Requirements

- **Node.js 22.12 or later** to use starknet.js. On Node.js 22.0 to 22.11, `import` works but `require('starknet')` fails.
- **Node.js 22.22.2 or later in the 22.x line, 24.15 or later in the 24.x line, or Node.js 26 or later** to work on starknet.js itself: some development tools need these higher versions.
- **TypeScript**: set `moduleResolution` to `bundler` (code built by Vite, webpack...) or `nodenext` (code run by Node.js).
  - The older value `node` (also called `node10`) loses the types that come from get-starknet, such as the wallets: they become `any`. TypeScript 6 reports this value as deprecated, and TypeScript 7 does not accept it.
  - With `node16`, keep `skipLibCheck` at `true` (the value written by `tsc --init`). With `false`, use `nodenext`.

## Running tests locally

Local tests rely on <ins>[Starknet Devnet](https://github.com/starknet-io/starknet-devnet)</ins>, a local testnet emulation.

Launch a Devnet instance and run:

```bash
npm run test # all tests
npm run test ./__tests__/contract.test.ts # just one test suite
```

## Running docs locally

If you want to make changes to the documentation and see how it looks before making a PR:

```bash
cd www
npm install # install docusaurus
npm run start # fires up a local documentation site
```

## Compiling Starknet contracts

Please check the Scarb documentation <ins>[here](https://docs.swmansion.com/scarb/docs/extensions/starknet/contract-target.html)</ins> to compile Starknet contracts.

Additional helpful resources can also be found at <ins>[OpenZeppelin](https://docs.openzeppelin.com/contracts-cairo/)</ins> documentation site.

## Interacting with contracts and accounts

For a basic overview on how to interact with contracts and accounts continue following this guide.

For some more extensive examples visit PhilippeR26's <ins>[workshop](https://github.com/PhilippeR26/starknet.js-workshop-typescript)</ins>.

## Contracts used in the guides

You can find the compiled contracts used in these guides in the <ins>[\_\_mocks\_\_](https://github.com/starknet-io/starknet.js/tree/develop/__mocks__/cairo/)</ins> directory.
