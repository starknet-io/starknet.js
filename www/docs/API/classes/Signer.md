---
id: 'Signer'
title: 'Class: Signer'
sidebar_label: 'Signer'
sidebar_position: 0
custom_edit_url: null
---

## Implements

- [`SignerInterface`](SignerInterface.md)

## Constructors

### constructor

• **new Signer**(`pk?`)

#### Parameters

| Name | Type                     |
| :--- | :----------------------- |
| `pk` | `string` \| `Uint8Array` |

#### Defined in

[src/signer/default.ts:18](https://github.com/notV4l/starknet.js/blob/c20c3bd/src/signer/default.ts#L18)

## Properties

### pk

• `Protected` **pk**: `string` \| `Uint8Array`

#### Defined in

[src/signer/default.ts:16](https://github.com/notV4l/starknet.js/blob/c20c3bd/src/signer/default.ts#L16)

## Methods

### getPubKey

▸ **getPubKey**(): `Promise`<`string`\>

Method to get the public key of the signer

#### Returns

`Promise`<`string`\>

public key of signer as hex string with 0x prefix

#### Implementation of

[SignerInterface](SignerInterface.md).[getPubKey](SignerInterface.md#getpubkey)

#### Defined in

[src/signer/default.ts:22](https://github.com/notV4l/starknet.js/blob/c20c3bd/src/signer/default.ts#L22)

---

### signMessage

▸ **signMessage**(`typedData`, `accountAddress`): `Promise`<[`Signature`](../modules.md#signature)\>

Sign an JSON object for off-chain usage with the starknet private key and return the signature
This adds a message prefix so it cant be interchanged with transactions

**`Throws`**

if the JSON object is not a valid JSON

#### Parameters

| Name             | Type                                                | Description              |
| :--------------- | :-------------------------------------------------- | :----------------------- |
| `typedData`      | [`TypedData`](../interfaces/typedData.TypedData.md) | JSON object to be signed |
| `accountAddress` | `string`                                            | account                  |

#### Returns

`Promise`<[`Signature`](../modules.md#signature)\>

the signature of the JSON object

#### Implementation of

[SignerInterface](SignerInterface.md).[signMessage](SignerInterface.md#signmessage)

#### Defined in

[src/signer/default.ts:26](https://github.com/notV4l/starknet.js/blob/c20c3bd/src/signer/default.ts#L26)

---

### signTransaction

▸ **signTransaction**(`transactions`, `transactionsDetail`, `abis?`): `Promise`<[`Signature`](../modules.md#signature)\>

Signs a transaction with the starknet private key and returns the signature

#### Parameters

| Name                 | Type                                                                    |
| :------------------- | :---------------------------------------------------------------------- |
| `transactions`       | [`Call`](../modules.md#call)[]                                          |
| `transactionsDetail` | [`InvocationsSignerDetails`](../interfaces/InvocationsSignerDetails.md) |
| `abis?`              | [`Abi`](../modules.md#abi)[]                                            |

#### Returns

`Promise`<[`Signature`](../modules.md#signature)\>

signature

#### Implementation of

[SignerInterface](SignerInterface.md).[signTransaction](SignerInterface.md#signtransaction)

#### Defined in

[src/signer/default.ts:31](https://github.com/notV4l/starknet.js/blob/c20c3bd/src/signer/default.ts#L31)

---

### signDeployAccountTransaction

▸ **signDeployAccountTransaction**(`«destructured»`): `Promise`<[`Signature`](../modules.md#signature)\>

Signs a DEPLOY_ACCOUNT transaction with the starknet private key and returns the signature

#### Parameters

| Name             | Type                                                                     | Description                                                                                                                                                                                                                                                                                                                              |
| :--------------- | :----------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `«destructured»` | [`DeployAccountSignerDetails`](../modules.md#deployaccountsignerdetails) | contractAddress - the computed address of the contract - constructorCalldata - calldata to be passed in deploy constructor - addressSalt - contract address salt - chainId - the chainId to declare contract on - maxFee - maxFee for the declare transaction - version - transaction version - nonce - Nonce of the declare transaction |

#### Returns

`Promise`<[`Signature`](../modules.md#signature)\>

signature

#### Implementation of

[SignerInterface](SignerInterface.md).[signDeployAccountTransaction](SignerInterface.md#signdeployaccounttransaction)

#### Defined in

[src/signer/default.ts:55](https://github.com/notV4l/starknet.js/blob/c20c3bd/src/signer/default.ts#L55)

---

### signDeclareTransaction

▸ **signDeclareTransaction**(`«destructured»`): `Promise`<[`Signature`](../modules.md#signature)\>

Signs a DECLARE transaction with the starknet private key and returns the signature

#### Parameters

| Name             | Type                                                            | Description                                                                                                                                                                                                                                                                                                                                     |
| :--------------- | :-------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `«destructured»` | [`DeclareSignerDetails`](../interfaces/DeclareSignerDetails.md) | classHash - computed class hash. Will be replaced by ContractClass in future once class hash is present in CompiledContract - senderAddress - the address of the sender - chainId - the chainId to declare contract on - maxFee - maxFee for the declare transaction - version - transaction version - nonce - Nonce of the declare transaction |

#### Returns

`Promise`<[`Signature`](../modules.md#signature)\>

signature

#### Implementation of

[SignerInterface](SignerInterface.md).[signDeclareTransaction](SignerInterface.md#signdeclaretransaction)

#### Defined in

[src/signer/default.ts:79](https://github.com/notV4l/starknet.js/blob/c20c3bd/src/signer/default.ts#L79)
