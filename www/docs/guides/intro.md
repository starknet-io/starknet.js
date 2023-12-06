---
sidebar_position: 1
---

# Getting Started

## Installation

```bash
# use the main branch

npm install starknet

# to use latest features (merges in develop branch)

npm install starknet@next
```

## Running test locally

### With Devnet

- RPC Devnet [repo](https://github.com/0xSpaceShard/starknet-devnet-rs)

Launch the development net.

Open a new console tab, go to your starknet.js directory, and run:

```bash
npm run test # all tests
npm run test ./__tests__/contract.test.ts # just one test suite
```

## Running docs locally

If you want to change documentation and see how it looks before making a PR:

```bash
cd www
npm install # install docusaurus
npm run start # fires up a local documentation site
```

## Compiling Starknet Contracts

Please check the Starknet documentation <ins>[here](https://docs.starknet.io/documentation/quick_start/declare_a_smart_contract/#compiling_a_smart_contract)</ins> to compile Starknet contracts.

Additional helpful resources can also be found at <ins>[OpenZeppelin](https://docs.openzeppelin.com/contracts-cairo/0.6.1/)</ins> documentation site.

## Interacting with contracts and accounts

For a basic overview on how to interact with contracts and accounts continue following this guide.

For some more extensive examples visit PhilippeR26's <ins>[workshop](https://github.com/PhilippeR26/starknet.js-workshop-typescript)</ins>.

## Contracts used in the guides

You can find the compiled contracts used in these guides in the <ins>[compiled_contracts](https://github.com/starknet-io/starknet.js/tree/develop/www/docs/guides/compiled_contracts)</ins> directory.
