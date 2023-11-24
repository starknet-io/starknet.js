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

- Sequencer Devnet [docs](https://0xspaceshard.github.io/starknet-devnet/docs/intro)
- RPC Devnet [repo](https://github.com/0xSpaceShard/starknet-devnet-rs)

Get the Sequencer Devnet with Docker:

```bash
docker pull shardlabs/starknet-devnet:latest
docker run -p 5050:5050 shardlabs/starknet-devnet:latest --seed 0
```

Open a new console tab, go to your starknet.js directory, and run:

```bash
npm run test # all tests
npm run test ./__tests__/contract.test.ts # just one test suite
```

By default, `defaultProvider` tests will be run through the `Sequencer`.

If you want to run `defaultProvider` through the `RPC` run:

```bash
export TEST_RPC_URL = "http://127.0.0.1:5050/rpc"

# only RPC related tests:
npm run test ./__tests__/rpcProvider.test.ts
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
