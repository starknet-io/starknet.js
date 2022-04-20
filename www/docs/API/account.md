---
sidebar_position: 2
---

# Account

An Account extends <ins>[`Provider`](/docs/API/provider)</ins> and inherits all of its methods.

It also introduces new methods that allow Accounts to create and verify signatures with a custom <ins>[`Signer`](/docs/API/signer)</ins>.

This API is the primary way to interact with an account contract on StarkNet.

## Creating an instance

For creating new instance of Account, account contract must be deployed. Also there needs to be a Provider instance that will be passed in the constructor and key pair for the account.

`new starknet.Account(Provider, address, starkKeyPair)`

## Account Properties

contract.**address** => _string_

The address of the account contract

## Account methods

account.**getNonce()** => _Promise < string >_

Gets new Nonce for the next transaction

<hr />

account.**estimateFee**(calls [ , options ]) => _Promise < EstimateFeeResponse >_

Gets the estimated fee for the call(s)

The _options_ object may include any of:

- options.**blockIdentifier** - Block Identifier for the transaction
- options.**nonce** - Nonce for the transaction

###### EstimateFeeResponse

```
{
  amount: number;
  unit: string;
}
```

<hr />

account.**execute**(calls [ , abi , transactionsDetail ]) => _Promise < AddTransactionResponse >_

Executes one or multiple calls using the account contract

The _transactionsDetail_ object may include any of:

- transactionsDetail.**maxFee** - Max Fee that that will be used to execute the call(s)
- transactionsDetail.**nonce** - Nonce for the transaction
- transactionsDetail.**version** - Version for the transaction (default is 0)

###### AddTransactionResponse

```
{
  code: 'TRANSACTION_RECEIVED';
  transaction_hash: string;
  address?: string;
};
```

<hr />

account.**signMessage**(typedData) => _Promise < Signature >_

Creates a signature from the passed data

###### Signature

```
string[];
```

<hr />

account.**hashMessage**(typedData) => _Promise < string >_

Creates a hash from the passed data

<hr />

account.**verifyMessageHash**(hash, signature) => _Promise < boolean >_

Verify a signature of a given hash

**WARNING** This method is not recommended, use verifyMessage instead

<hr />

account.**verifyMessage**(typedData, signature) => _Promise < boolean >_

Verify a signature of a JSON object

<hr />
