---
sidebar_position: 3
---

# Signer

The **Signer** API allows you to sign transactions and messages, and also allows you to get the public key.

## Creating an instance

`new starknet.Signer(keyPair)`

## Signer Methods

signer.**getPubKey**() => _Promise < string >_

Returns public key of the signer

<hr />

signer.**signTransaction**(transactions, transactionsDetail [ , abi ]) => _Promise < Signature >_

Returns signature of the transaction

###### Signature

```
string[]
```

<hr />

signer.**signMessage**(typedData, accountAddress) => _Promise < Signature >_

Returns signature of the transaction

###### Signature

```
string[]
```

<hr />
