---
sidebar_position: 4
---

# Contract

Contracts can do data transformations in JavaScript based on an ABI. They can also call and invoke to StarkNet through a provided Signer.

Contracts allow you to transform Cairo values, like `Uint256` to `BigNumber`. It could also allow users to pass their own transformers, similar to `JSON.parse`.

## Creating an instance

`new starknet.Contract(abi, address, providerOrAccount)`

`contract.attach(address)` _for changing the address of the connected contract_

`contract.connect(providerOrAccount)` _for changing the provider or account_

## Properties

contract.**abi** => _Abi_

The ABI the contract was constructed with.

contract.**address** => _string_

The address the contract was constructed/connected with.

contract.**providerOrAccount** => _ProviderInterface | AccountInterface_

Provider or account that are used to interact with the network.

contract.**deployTransactionHash** => _string | null_

If the Contract object is the result of a ContractFactory deployment, this is the transaction which was used to deploy the contract.

## Methods

contract.**attach**(address) => void

Saves the address of the contract deployed on network that will be used for interaction.

_address_ - address of the contract.

<br></br>

contract.**connect**(providerOrAccount) => void

Attaches to new Provider or Account

<br></br>

contract.**deployed**() => _Promise < Contract >_

If the Contract object is the result of a ContractFactory deployment, this method will wait for the transaction to be resolved.

<br></br>

contract.**call**(method, args, options) => _Promise < Result >_

Calls a method on a contract.

<br></br>

contract.**invoke**(method, args, options) => _Promise < InvokeFunctionResponse >_

Invokes a method on a contract.

<br></br>

contract.**estimate**(method, args, options) => _Promise < any >_

Estimates a method on a contract.

<br></br>

contract.**populate**(method, args, options) => _Invocation_

## Meta-Class

A Meta-Class is a Class which has any of its properties determined at run-time. The Contract object uses a Contract's ABI to determine what methods are available, so the following sections describe the generic ways to interact with the properties added at run-time during the Contract constructor.

### Read-Only Methods(constant)

A constant method (denoted view in Cairo) is read-only and evaluates a small amount of Cairo code against the current blockchain state. It is therefore free and does not require any fee, but cannot make changes to the blockchain state...

contract.**METHOD_NAME**(...args [ , overrides ]) => _Promise < Result >_

The type of the result depends on the ABI. Result object will be returned with each parameter available positionally and if the parameter is named, it will also be available by its name.

The _overrides_ object for a read-only method may include:

- overrides.**blockIdentifier**

### Write Methods (non-constant)

A non-constant method requires a transaction to be signed and requires payment in the form of a fee to be paid.

contract.**METHOD_NAME**(...args [ , overrides ]) => _Promise < AddTransactionResponse >_

Returns a _AddTransactionResponse_ for the transaction after it is sent to the network. This requires that Contract has a signer.

The _overrides_ object for write methods may include any of:

- overrides.**signature** - Signature that will be used for the transaction
- overrides.**maxFee** - Max Fee for the transaction
- overrides.**nonce** - Nonce for the transaction

### Write Methods Analysis

There are several options to analyze properties and results of a write method without actually executing it.

contract.estimateGas.**METHOD_NAME**( ...args ) => _Promise < EstimateFeeResponse >_

Returns the estimate units of gas that would be required to execute the METHOD_NAME with args and overrides.

contract.populateTransaction.**METHOD_NAME**( ...args [ , overrides ] ) ⇒ _Call_

Returns an _Call_ object which represents the transaction that would need to be signed and submitted to the network to execute METHOD_NAME with args and overrides.

The overrides are identical to the overrides above for write methods.
