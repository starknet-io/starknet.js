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

[src/signer/default.ts:19](https://github.com/0xs34n/starknet.js/blob/develop/src/signer/default.ts#L19)

## Properties

### pk

• `Protected` **pk**: `string` \| `Uint8Array`

#### Defined in

[src/signer/default.ts:17](https://github.com/0xs34n/starknet.js/blob/develop/src/signer/default.ts#L17)

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

[src/signer/default.ts:23](https://github.com/0xs34n/starknet.js/blob/develop/src/signer/default.ts#L23)

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

[src/signer/default.ts:27](https://github.com/0xs34n/starknet.js/blob/develop/src/signer/default.ts#L27)

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

[src/signer/default.ts:32](https://github.com/0xs34n/starknet.js/blob/develop/src/signer/default.ts#L32)

---

### signDeployAccountTransaction

▸ **signDeployAccountTransaction**(`«destructured»`): `Promise`<`SignatureType`\>

Signs a DEPLOY_ACCOUNT transaction with the starknet private key and returns the signature

#### Parameters

| Name             | Type                                                                     | Description                                                                                                                                                                                                                                                                                                                              |
| :--------------- | :----------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `«destructured»` | [`DeployAccountSignerDetails`](../modules.md#deployaccountsignerdetails) | contractAddress - the computed address of the contract - constructorCalldata - calldata to be passed in deploy constructor - addressSalt - contract address salt - chainId - the chainId to declare contract on - maxFee - maxFee for the declare transaction - version - transaction version - nonce - Nonce of the declare transaction |

#### Returns

`Promise`<`SignatureType`\>

signature

#### Implementation of

[SignerInterface](SignerInterface.md).[signDeployAccountTransaction](SignerInterface.md#signdeployaccounttransaction)

#### Defined in

[src/signer/default.ts:56](https://github.com/0xs34n/starknet.js/blob/develop/src/signer/default.ts#L56)

---

### signDeclareTransaction

▸ **signDeclareTransaction**(`«destructured»`): `Promise`<`SignatureType`\>

Signs a DECLARE transaction with the starknet private key and returns the signature

#### Parameters

| Name             | Type                                                            | Description                                                                                                                                                                                                                                                                                                                                     |
| :--------------- | :-------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `«destructured»` | [`DeclareSignerDetails`](../interfaces/DeclareSignerDetails.md) | classHash - computed class hash. Will be replaced by ContractClass in future once class hash is present in CompiledContract - senderAddress - the address of the sender - chainId - the chainId to declare contract on - maxFee - maxFee for the declare transaction - version - transaction version - nonce - Nonce of the declare transaction |

#### Returns

`Promise`<`SignatureType`\>

signature

#### Implementation of

[SignerInterface](SignerInterface.md).[signDeclareTransaction](SignerInterface.md#signdeclaretransaction)

#### Defined in

[src/signer/default.ts:80](https://github.com/0xs34n/starknet.js/blob/develop/src/signer/default.ts#L80)
