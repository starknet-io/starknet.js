---
sidebar_position: 3
---

# Signer

The **Signer** API allows you to sign transactions and messages, and also allows you to get the public key.

## Creating an instance

`new starknet.Signer(keyPair)`

## Methods

signer.**getPubKey**() => _Promise < string >_

Returns the public key of the signer.

<hr />

signer.**signTransaction**(transactions, transactionsDetail [ , abi ]) => _Promise < Signature >_

Signs a transaction with the starknet private key and returns the signature.

The _transactions_ object for write methods may include any of:

- transactions.**contractAddress** - the address of the contract
- transactions.**entrypoint** - the entrypoint of the contract
- transactions.**calldata** - (defaults to []) the calldata

_abi_ - (optional) the abi of the contract for better displaying

###### _Signature_

```typescript
string[]
```

<hr />

signer.**signMessage**(typedData, accountAddress) => _Promise < Signature >_

Sign an JSON object for off-chain usage with the starknet private key and return the signature. This adds a message prefix so it cant be interchanged with transactions.

_typedData_ - JSON object to be signed
_accountAddress_ - calldata to be passed in deploy constructor

###### _Signature_

```typescript
string[]
```

<hr />

signer.**signDeployAccountTransaction**(transaction) => _Promise < Signature >_

Signs a DEPLOY_ACCOUNT transaction with the starknet private key and returns the signature.

The _transactions_ object for write methods may include any of:

- transactions.**contractAddress** - the address of the contract
- transactions.**constructorCalldata** - calldata to be passed in deploy constructor
- transactions.**addressSalt** - contract address salt
- transactions.**chainId** - the chainId to declare contract on
- transactions.**maxFee** - maxFee for the declare transaction
- transactions.**version** - transaction version
- transactions.**nonce** - Nonce of the declare transaction

###### _Signature_

```typescript
string[]
```

<hr />

signer.**signDeclareTransaction**(transaction, transactionsDetail [ , abi ]) => _Promise < Signature >_

Signs a DECLARE transaction with the starknet private key and returns the signature.

The _transaction_ object for write methods may include any of:

- transactions.**classHash** - computed class hash. Will be replaced by ContractClass in future once class hash is present in CompiledContract
- transactions.**senderAddress** - the address of the sender
- transactions.**chainId** - the chainId to declare contract on
- transactions.**maxFee** - maxFee for the declare transaction
- transactions.**version** - transaction version
- transactions.**nonce** - Nonce of the declare transaction

###### _Signature_

```typescript
string[]
```
