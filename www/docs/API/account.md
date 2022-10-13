---
sidebar_position: 2
---

# Account

An Account extends <ins>[`Provider`](/docs/API/provider)</ins> and inherits all of its methods.

It also introduces new methods that allow Accounts to create and verify signatures with a custom <ins>[`Signer`](/docs/API/signer)</ins>.

This API is the primary way to interact with an account contract on StarkNet.

## Creating an instance

To create a new instance of the Account, first an account contract must be deployed. Also there needs to be a Provider instance that will be passed in the constructor and key pair for the account.

`new starknet.Account(Provider, address, starkKeyPair)`

## Properties

account.**address** => _string_

The address of the account contract.

## Methods

account.**getNonce()** => _Promise < BigNumberish >_

Gets the new Nonce of the connected account for the next transaction.

<hr />

account.**estimateInvokeFee**(calls [ , options ]) => _Promise < EstimateFeeResponse >_

Gets the estimated fee for the call(s).

The _options_ object may include any of:

- options.**blockIdentifier** - Block Identifier for the transaction
- options.**nonce** - Nonce for the transaction

###### _EstimateFeeResponse_

```typescript
{
  overall_fee: BN;
  gas_consumed?: BN;
  gas_price?: BN;
}
```

<hr />

account.**estimateDeclareFee**(contractPayload [ , options ]) => _Promise < EstimateFeeResponse >_

Gets the estimated fee for the declare transaction.

The _options_ object may include any of:

- options.**blockIdentifier** - Block Identifier for the transaction
- options.**nonce** - Nonce for the transaction

###### _EstimateFeeResponse_

```typescript
{
  overall_fee: BN;
  gas_consumed?: BN;
  gas_price?: BN;
}
```

<hr />

account.**execute**(calls [ , abi , transactionsDetail ]) => _Promise < AddTransactionResponse >_

Executes one or multiple calls using the account contract.

The _transactionsDetail_ object may include any of:

- transactionsDetail.**maxFee** - Max Fee that that will be used to execute the call(s)
- transactionsDetail.**nonce** - Nonce for the transaction
- transactionsDetail.**version** - Version for the transaction (default is 1)

###### _AddTransactionResponse_

```typescript
{
  transaction_hash: string;
};
```

<hr />

account.**declare**(payload [ , transactionsDetail ]) => _Promise < DeclareContractResponse >_

The _transactionsDetail_ object may include any of:

- transactionsDetail.**contract** - The compiled contract
- transactionsDetail.**classHash** - Hash of the compiled contract

Declares a contract on Starknet.

> _Note:_ Once the classHash is included in CompiledContract, this parameter can be removed. Currently it can be pre-computed from starknet-cli.

Example:

```typescript
const declareTx = await account.declare({
  contract: compiledErc20,
  // classHash is pre-computed from starknet-cli
  classHash: '0x54328a1075b8820eb43caf0caa233923148c983742402dcfc38541dd843d01a',
});
```

###### _DeclareContractResponse_

```typescript
{
  transaction_hash: string;
  class_hash: string;
};
```

<hr/>

account.**signMessage**(typedData) => _Promise < Signature >_

Creates a signature from the passed data.

###### _Signature_

```typescript
string[];
```

<hr />

account.**hashMessage**(typedData) => _Promise < string >_

Creates a hash from the passed data.

<hr />

account.**verifyMessageHash**(hash, signature) => _Promise < boolean >_

Verify a signature of a given hash.

> **WARNING**
>
> This method is not recommended, use `verifyMessage` instead

<hr />

account.**verifyMessage**(typedData, signature) => _Promise < boolean >_

Verify a signature of a JSON object.

<hr />
