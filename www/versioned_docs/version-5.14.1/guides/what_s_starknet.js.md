---
sidebar_position: 2
---

# What is Starknet.js ?

Starknet.js is a library that helps to connect your website or your Decentralized Application (DAPP) to the blockchain-based Starknet network, using JavaScript / TypeScript language.

## Overview

![](./pictures/starknet-js-chart.png)

Some important topics that have to be understood:

- You can connect your DAPP to several networks:

  - [Starknet mainnet](https://starkscan.co) (Layer 2 of [Ethereum network](https://etherscan.io/) ).
  - [Starknet testnet 1](https://testnet.starkscan.co/) & [testnet 2](https://testnet-2.starkscan.co/) (Layer 2 of [Goerli network](https://goerli.etherscan.io/) (testnet of Ethereum)).
  - [Starknet-devnet](https://shard-labs.github.io/starknet-devnet/docs/intro) (your local Starknet network, for developers).

  and also to some more specific solutions:

  - private customized version of Starknet.
  - local Starknet node (connected to mainnet or testnet).

> Understand what is Starknet and how it works is necessary. Then, you can learn how to interact with it using Starknet.js. So, at this stage, you should be aware of the content of the [Starknet official doc](https://docs.starknet.io/documentation/) and [the Starknet Book](https://book.starknet.io/).

- Only the `Provider` object is talking directly to the network - your DAPP will talk mainly to `Account` and `Contract` objects. You will define with the `Provider` with which network you want to work. You can ask the Provider some low level data of the network (block, timestamp, ...).
- `Signer` and `Utils` objects contain many useful functions for the interaction with Starknet.js.
- The `Contract` object is mainly used to read the memory of a blockchain contract.
- The `Account` object is the most useful:
  - as wallet, to store your tokens.
  - as a way to pay the fees to the network, to be able to write in its memory.
