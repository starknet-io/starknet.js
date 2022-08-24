---
sidebar_position: 5
---

# Contract Factory

Contract Factory allow you to deploy contracts to StarkNet. To deploy a Contract, additional information is needed that is not available on a Contract object itself.

## Creating an instance

`new starknet.ContractFactory( compiledContract , providerOrAccount, [ , abi ] )`

Creates a new instance of a ContractFactory for the contract described by the _compiledContract_.

`contractFactory.connect(providerOrAccount)` _for changing the provider or account_

`contractFactory.attach(address)` _for changing the address of the connected contract factory_

## Properties

contractFactory.**abi** => _Abi_

The ABI the contractFactory was constructed with.

contractFactory.**compiledContract** => _CompiledContract_

The compiled contract the contractFactory was constructed with.

contractFactory.**providerOrAccount** => _ProviderInterface | AccountInterface_

Provider or account that are used to interact with the network.

## Methods

contractFactory.**attach**( address ) ⇒ _Contract_

Return an instance of a _Contract_ attached to address. This is the same as using the _Contract_ constructor with address and this _compiledContract_ and _providerOrAccount_ passed in when creating the ContractFactory.

<hr />

contractFactory.**deploy**( constructorCalldata, addressSalt ) ⇒ _Promise < Contract >_

Uses the provider to deploy the Contract with _constructorCalldata_ passed into the constructor and returns a _Contract_ which is attached to the address where this contract will be deployed.

The transaction hash can be found at _contract.deployTransactionHash_, and no interactions should be made until the transaction is resolved.
