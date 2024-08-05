# Starknet.js API

## Provider

The Provider [**API**](./classes/RpcProvider.md) allows you to interact with the Starknet network, without signing transactions or messages.

Typically, these are _read_ calls on the blockchain.

Guide is [**here**](../guides/provider_instance.md).

## Account

Account extends Provider and inherits all of its methods.

It also introduces new methods that allow Accounts to create and verify signatures with a custom [`Signer`](./classes/Signer), declare and deploy Contracts and new Accounts.

This [**API**](./classes/Account.md) is the primary way to interact with an account contract on Starknet.

Guide is [**here**](../guides/account/create_account.md).

## Contract

Contract's [**API**](./classes/Contract.md) manages interactions with a smart contract based on a supplied ABI. It issues call and invoke requests to Starknet and applies appropriate data transformations to represent Cairo types in JavaScript.

Contracts allow you to transform Cairo values, like `Uint256` to `BigNumber`. It could also allow users to pass their own transformers, similar to `JSON.parse`.

Guide is [**here**](../guides/contracts/create_contract.md).

## Signer

The Signer [**API**](./classes/Signer.md) allows you to sign transactions and messages, and also allows you to get the public key.
