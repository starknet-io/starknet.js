---
sidebar_position: 5
---

# Contract Factory

Contract Factory allow you to deploy contracts to StarkNet. To deploy a Contract, additional information is needed that is not available on a Contract object itself.

## Creating an instance

`new starknet.ContractFactory( compiledContract, classHash, account, [ , abi ] )`

Creates a new instance of a ContractFactory for the contract described by the _compiledContract_.

`contractFactory.connect(account)` _for changing the provider or account_

`contractFactory.attach(address)` _for changing the address of the connected contract factory_

## Properties

contractFactory.**compiledContract** => _CompiledContract_ (the compiled contract the contractFactory was constructed with)

contractFactory.**classHash** => _string_ (contract classHash can be obtained using tool for compiling contract)

contractFactory.**account** => _AccountInterface_ (account that are used to interact with the network)

contractFactory.**abi** => _Abi_ (the ABI the contractFactory was constructed with)

## Methods

### attach()

contractFactory.**attach**( address ) ⇒ _Contract_

Return an instance of a _Contract_ attached to address. This is the same as using the _Contract_ constructor with address and this _compiledContract_ and _account_ passed in when creating the ContractFactory.

---

### deploy()

contractFactory.**deploy**( args, addressSalt ) ⇒ _Promise < Contract >_

Uses the provider to deploy the Contract with _args_ passed into the constructor and returns a _Contract_ which is attached to the address where this contract will be deployed.

The transaction hash can be found at _contract.deployTransactionHash_, and no interactions should be made until the transaction is resolved.
