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

Example devnet version is `0.5.3`.

Get devnet with docker:

```bash
docker pull shardlabs/starknet-devnet:0.5.3
docker run -p 5050:5050 shardlabs/starknet-devnet:0.5.3 --seed 0
```

Open new console tab, go to your starknet.js directory and run:

```bash
npm run test # all tests
npm run test ./__tests__/contract.test.ts # just one test suite
```

By default `defaultProvider` tests will be ran through the `Sequencer`.

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

Please check the Starknet documentation <ins>[here](https://www.cairo-lang.org/docs/hello_starknet/intro.html)</ins> to compile Starknet contracts.

Additional helpful resources can also be found at <ins>[OpenZeppelin](https://docs.openzeppelin.com/contracts-cairo/0.6.1/)</ins> documentation site.

## Full example with account & erc20 deployments

Please take a look at our workshop using OpenZeppelin contracts <ins>[here](https://github.com/starknet-io/starknet.js-workshop)</ins>.

Example with Argent contract <ins>[here](https://github.com/starknet-io/starknet.js-account)</ins>.

## Contracts used in the guides

You can find the compiled contracts used in these guides in `compiled_contracts` directory.
