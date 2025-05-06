---
sidebar_position: 2
---

# What is Starknet.js ?

Starknet.js is a library that helps connect your website or your Decentralized Application (DAPP) to the blockchain-based Starknet network, using JavaScript / TypeScript.

## Overview

![](./pictures/starknet-js-chart.png)

Some important topics that have to be understood:

- You can connect your DAPP to several networks:

  - [Starknet mainnet](https://starkscan.co) (Layer 2 of [Ethereum network](https://etherscan.io/) ).
  - [Starknet testnet](https://sepolia.starkscan.co/) (Layer 2 of [Sepolia network](https://sepolia.etherscan.io/) (testnet of Ethereum)).
  - [Starknet-devnet](https://github.com/0xSpaceShard/starknet-devnet-rs) (your local Starknet network, for developers).

  and also to some more specific solutions:

  - private customized version of Starknet.
  - local Starknet node (connected to mainnet or testnet).

> Understanding what Starknet is and how it works is necessary. Then, you can learn how to interact with it using Starknet.js. So, at this stage, you should be aware of the content of the [Starknet official doc](https://docs.starknet.io/documentation/) and [the Starknet Book](https://book.starknet.io/).

- The `RpcChannel` and `RpcProvider` classes and their methods are used for low-level communication with an RPC node.
- Your DAPP will mainly interact with `Account` and `Contract` class instances; they use underlying `RpcProvider` connections to provide high-level methods for interacting with their Starknet namesakes, accounts and contracts.
- `Signer` and `Utils` objects contain many useful functions for interaction with Starknet.js.
- The `Contract` object is mainly used to read the memory of a blockchain contract.
- The `Account` object is the most useful:
  - as a wallet, to store your tokens.
  - as a way to pay the fees to the network, and to be able to write in its memory.
