---
id: 'Account'
title: 'Class: Account'
sidebar_label: 'Account'
sidebar_position: 0
custom_edit_url: null
---

Interface for interacting with Starknet account contracts

Extends ProviderInterface to provide account-specific functionality including:

- Transaction execution and signing
- Fee estimation for various transaction types
- Contract deployment through UDC (Universal Deployer Contract)
- Paymaster support for sponsored transactions
- EIP-712 message signing

**`Remarks`**

Implementations of this interface typically handle the complexities of:

- Nonce management
- Transaction signing with the account's private key
- Interaction with the account contract's **execute** entrypoint

## Hierarchy

- [`Provider`](Provider.md)

  ↳ **`Account`**

  ↳↳ [`WalletAccount`](WalletAccount.md)

## Implements

- [`AccountInterface`](AccountInterface.md)

## Constructors

### constructor

• **new Account**(`options`): [`Account`](Account.md)

#### Parameters

| Name      | Type                                             |
| :-------- | :----------------------------------------------- |
| `options` | [`AccountOptions`](../modules.md#accountoptions) |

#### Returns

[`Account`](Account.md)

#### Overrides

[Provider](Provider.md).[constructor](Provider.md#constructor)

#### Defined in

[src/account/default.ts:110](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/account/default.ts#L110)

## Properties

### signer

• **signer**: [`SignerInterface`](SignerInterface.md)

Signer instance for signing transactions and messages

#### Implementation of

[AccountInterface](AccountInterface.md).[signer](AccountInterface.md#signer)

#### Defined in

[src/account/default.ts:96](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/account/default.ts#L96)

---

### address

• **address**: `string`

The address of the account contract on Starknet

#### Implementation of

[AccountInterface](AccountInterface.md).[address](AccountInterface.md#address)

#### Defined in

[src/account/default.ts:98](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/account/default.ts#L98)

---

### cairoVersion

• **cairoVersion**: [`CairoVersion`](../modules.md#cairoversion)

Cairo version of the account contract implementation

#### Implementation of

[AccountInterface](AccountInterface.md).[cairoVersion](AccountInterface.md#cairoversion)

#### Defined in

[src/account/default.ts:100](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/account/default.ts#L100)

---

### transactionVersion

• `Readonly` **transactionVersion**: `"0x3"`

#### Defined in

[src/account/default.ts:102](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/account/default.ts#L102)

---

### paymaster

• **paymaster**: [`PaymasterInterface`](PaymasterInterface.md)

#### Defined in

[src/account/default.ts:104](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/account/default.ts#L104)

---

### deployer

• **deployer**: [`Deployer`](Deployer.md)

Optional deployer instance for custom contract deployment logic

**`Default`**

```ts
Uses default UDC (Universal Deployer Contract) if not specified
```

#### Implementation of

[AccountInterface](AccountInterface.md).[deployer](AccountInterface.md#deployer)

#### Defined in

[src/account/default.ts:106](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/account/default.ts#L106)

---

### defaultTipType

• **defaultTipType**: [`TipType`](../modules.md#tiptype)

#### Defined in

[src/account/default.ts:108](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/account/default.ts#L108)

---

### deploySelf

• **deploySelf**: (`__namedParameters`: [`DeployAccountContractPayload`](../modules.md#deployaccountcontractpayload), `details`: [`UniversalDetails`](../interfaces/UniversalDetails.md)) => `Promise`<[`DeployContractResponse`](../interfaces/DeployContractResponse.md)\>

#### Type declaration

▸ (`«destructured»`, `details?`): `Promise`<[`DeployContractResponse`](../interfaces/DeployContractResponse.md)\>

##### Parameters

| Name             | Type                                                                         |
| :--------------- | :--------------------------------------------------------------------------- |
| `«destructured»` | [`DeployAccountContractPayload`](../modules.md#deployaccountcontractpayload) |
| `details`        | [`UniversalDetails`](../interfaces/UniversalDetails.md)                      |

##### Returns

`Promise`<[`DeployContractResponse`](../interfaces/DeployContractResponse.md)\>

#### Defined in

[src/account/default.ts:505](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/account/default.ts#L505)

---

### responseParser

• **responseParser**: [`RPCResponseParser`](RPCResponseParser.md)

#### Implementation of

[AccountInterface](AccountInterface.md).[responseParser](AccountInterface.md#responseparser)

#### Inherited from

[Provider](Provider.md).[responseParser](Provider.md#responseparser)

#### Defined in

[src/provider/rpc.ts:62](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L62)

---

### channel

• **channel**: [`RpcChannel`](RPC08.RpcChannel.md) \| [`RpcChannel`](RPC09.RpcChannel.md)

#### Implementation of

[AccountInterface](AccountInterface.md).[channel](AccountInterface.md#channel)

#### Inherited from

[Provider](Provider.md).[channel](Provider.md#channel)

#### Defined in

[src/provider/rpc.ts:64](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L64)

---

### getStateUpdate

• **getStateUpdate**: () => `Promise`<\{ `block_hash`: `string` ; `new_root`: `string` ; `old_root`: `string` ; `state_diff`: \{ `storage_diffs`: \{ `address`: `string` ; `storage_entries`: \{ `key`: `string` ; `value`: `string` }[] }[] ; `deprecated_declared_classes`: `string`[] ; `declared_classes`: \{ `class_hash`: `string` ; `compiled_class_hash`: `string` }[] ; `deployed_contracts`: \{ `address`: `string` ; `class_hash`: `string` }[] ; `replaced_classes`: \{ `contract_address`: `string` ; `class_hash`: `string` }[] ; `nonces`: \{ `nonce`: `string` ; `contract_address`: `string` }[] } }\>(`blockIdentifier`: `"pre_confirmed"`) => `Promise`<[`PRE_CONFIRMED_STATE_UPDATE`](../namespaces/RPC.RPCSPEC09.API.md#pre_confirmed_state_update)\>(`blockIdentifier`: `"latest"`) => `Promise`<\{ `block_hash`: `string` ; `new_root`: `string` ; `old_root`: `string` ; `state_diff`: \{ `storage_diffs`: \{ `address`: `string` ; `storage_entries`: \{ `key`: `string` ; `value`: `string` }[] }[] ; `deprecated_declared_classes`: `string`[] ; `declared_classes`: \{ `class_hash`: `string` ; `compiled_class_hash`: `string` }[] ; `deployed_contracts`: \{ `address`: `string` ; `class_hash`: `string` }[] ; `replaced_classes`: \{ `contract_address`: `string` ; `class_hash`: `string` }[] ; `nonces`: \{ `nonce`: `string` ; `contract_address`: `string` }[] } }\>(`blockIdentifier?`: [`BlockIdentifier`](../modules.md#blockidentifier)) => `Promise`<[`StateUpdateResponse`](../modules.md#stateupdateresponse)\>

#### Type declaration

▸ (): `Promise`<\{ `block_hash`: `string` ; `new_root`: `string` ; `old_root`: `string` ; `state_diff`: \{ `storage_diffs`: \{ `address`: `string` ; `storage_entries`: \{ `key`: `string` ; `value`: `string` }[] }[] ; `deprecated_declared_classes`: `string`[] ; `declared_classes`: \{ `class_hash`: `string` ; `compiled_class_hash`: `string` }[] ; `deployed_contracts`: \{ `address`: `string` ; `class_hash`: `string` }[] ; `replaced_classes`: \{ `contract_address`: `string` ; `class_hash`: `string` }[] ; `nonces`: \{ `nonce`: `string` ; `contract_address`: `string` }[] } }\>

##### Returns

`Promise`<\{ `block_hash`: `string` ; `new_root`: `string` ; `old_root`: `string` ; `state_diff`: \{ `storage_diffs`: \{ `address`: `string` ; `storage_entries`: \{ `key`: `string` ; `value`: `string` }[] }[] ; `deprecated_declared_classes`: `string`[] ; `declared_classes`: \{ `class_hash`: `string` ; `compiled_class_hash`: `string` }[] ; `deployed_contracts`: \{ `address`: `string` ; `class_hash`: `string` }[] ; `replaced_classes`: \{ `contract_address`: `string` ; `class_hash`: `string` }[] ; `nonces`: \{ `nonce`: `string` ; `contract_address`: `string` }[] } }\>

▸ (`blockIdentifier`): `Promise`<[`PRE_CONFIRMED_STATE_UPDATE`](../namespaces/RPC.RPCSPEC09.API.md#pre_confirmed_state_update)\>

##### Parameters

| Name              | Type              |
| :---------------- | :---------------- |
| `blockIdentifier` | `"pre_confirmed"` |

##### Returns

`Promise`<[`PRE_CONFIRMED_STATE_UPDATE`](../namespaces/RPC.RPCSPEC09.API.md#pre_confirmed_state_update)\>

▸ (`blockIdentifier`): `Promise`<\{ `block_hash`: `string` ; `new_root`: `string` ; `old_root`: `string` ; `state_diff`: \{ `storage_diffs`: \{ `address`: `string` ; `storage_entries`: \{ `key`: `string` ; `value`: `string` }[] }[] ; `deprecated_declared_classes`: `string`[] ; `declared_classes`: \{ `class_hash`: `string` ; `compiled_class_hash`: `string` }[] ; `deployed_contracts`: \{ `address`: `string` ; `class_hash`: `string` }[] ; `replaced_classes`: \{ `contract_address`: `string` ; `class_hash`: `string` }[] ; `nonces`: \{ `nonce`: `string` ; `contract_address`: `string` }[] } }\>

##### Parameters

| Name              | Type       |
| :---------------- | :--------- |
| `blockIdentifier` | `"latest"` |

##### Returns

`Promise`<\{ `block_hash`: `string` ; `new_root`: `string` ; `old_root`: `string` ; `state_diff`: \{ `storage_diffs`: \{ `address`: `string` ; `storage_entries`: \{ `key`: `string` ; `value`: `string` }[] }[] ; `deprecated_declared_classes`: `string`[] ; `declared_classes`: \{ `class_hash`: `string` ; `compiled_class_hash`: `string` }[] ; `deployed_contracts`: \{ `address`: `string` ; `class_hash`: `string` }[] ; `replaced_classes`: \{ `contract_address`: `string` ; `class_hash`: `string` }[] ; `nonces`: \{ `nonce`: `string` ; `contract_address`: `string` }[] } }\>

▸ (`blockIdentifier?`): `Promise`<[`StateUpdateResponse`](../modules.md#stateupdateresponse)\>

##### Parameters

| Name               | Type                                               |
| :----------------- | :------------------------------------------------- |
| `blockIdentifier?` | [`BlockIdentifier`](../modules.md#blockidentifier) |

##### Returns

`Promise`<[`StateUpdateResponse`](../modules.md#stateupdateresponse)\>

#### Implementation of

[AccountInterface](AccountInterface.md).[getStateUpdate](AccountInterface.md#getstateupdate)

#### Inherited from

[Provider](Provider.md).[getStateUpdate](Provider.md#getstateupdate)

#### Defined in

[src/provider/rpc.ts:256](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L256)

## Methods

### getStarkName

▸ **getStarkName**(`provider`, `address`, `StarknetIdContract?`): `Promise`<`string`\>

#### Parameters

| Name                  | Type                                         |
| :-------------------- | :------------------------------------------- |
| `provider`            | [`ProviderInterface`](ProviderInterface.md)  |
| `address`             | [`BigNumberish`](../modules.md#bignumberish) |
| `StarknetIdContract?` | `string`                                     |

#### Returns

`Promise`<`string`\>

#### Inherited from

[Provider](Provider.md).[getStarkName](Provider.md#getstarkname)

#### Defined in

[src/provider/extensions/starknetId.ts:62](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/extensions/starknetId.ts#L62)

---

### getAddressFromStarkName

▸ **getAddressFromStarkName**(`provider`, `name`, `StarknetIdContract?`): `Promise`<`string`\>

#### Parameters

| Name                  | Type                                        |
| :-------------------- | :------------------------------------------ |
| `provider`            | [`ProviderInterface`](ProviderInterface.md) |
| `name`                | `string`                                    |
| `StarknetIdContract?` | `string`                                    |

#### Returns

`Promise`<`string`\>

#### Inherited from

[Provider](Provider.md).[getAddressFromStarkName](Provider.md#getaddressfromstarkname)

#### Defined in

[src/provider/extensions/starknetId.ts:96](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/extensions/starknetId.ts#L96)

---

### getStarkProfile

▸ **getStarkProfile**(`provider`, `address`, `StarknetIdContract?`, `StarknetIdIdentityContract?`, `StarknetIdVerifierContract?`, `StarknetIdPfpContract?`, `StarknetIdPopContract?`, `StarknetIdMulticallContract?`): `Promise`<[`StarkProfile`](../modules.md#starkprofile)\>

#### Parameters

| Name                           | Type                                         |
| :----------------------------- | :------------------------------------------- |
| `provider`                     | [`ProviderInterface`](ProviderInterface.md)  |
| `address`                      | [`BigNumberish`](../modules.md#bignumberish) |
| `StarknetIdContract?`          | `string`                                     |
| `StarknetIdIdentityContract?`  | `string`                                     |
| `StarknetIdVerifierContract?`  | `string`                                     |
| `StarknetIdPfpContract?`       | `string`                                     |
| `StarknetIdPopContract?`       | `string`                                     |
| `StarknetIdMulticallContract?` | `string`                                     |

#### Returns

`Promise`<[`StarkProfile`](../modules.md#starkprofile)\>

#### Inherited from

[Provider](Provider.md).[getStarkProfile](Provider.md#getstarkprofile)

#### Defined in

[src/provider/extensions/starknetId.ts:128](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/extensions/starknetId.ts#L128)

---

### getBrotherName

▸ **getBrotherName**(`provider`, `address`, `BrotherIdContract?`): `Promise`<`string`\>

Static implementation of getBrotherName

#### Parameters

| Name                 | Type                                         | Description                       |
| :------------------- | :------------------------------------------- | :-------------------------------- |
| `provider`           | [`ProviderInterface`](ProviderInterface.md)  | The provider interface            |
| `address`            | [`BigNumberish`](../modules.md#bignumberish) | The address to get the domain for |
| `BrotherIdContract?` | `string`                                     | Optional contract address         |

#### Returns

`Promise`<`string`\>

The domain name with .brother suffix

#### Inherited from

[Provider](Provider.md).[getBrotherName](Provider.md#getbrothername)

#### Defined in

[src/provider/extensions/brotherId.ts:148](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/extensions/brotherId.ts#L148)

---

### getAddressFromBrotherName

▸ **getAddressFromBrotherName**(`provider`, `name`, `BrotherIdContract?`): `Promise`<`string`\>

Static implementation of getAddressFromBrotherName

#### Parameters

| Name                 | Type                                        | Description               |
| :------------------- | :------------------------------------------ | :------------------------ |
| `provider`           | [`ProviderInterface`](ProviderInterface.md) | The provider interface    |
| `name`               | `string`                                    | The domain name           |
| `BrotherIdContract?` | `string`                                    | Optional contract address |

#### Returns

`Promise`<`string`\>

The resolver address

#### Inherited from

[Provider](Provider.md).[getAddressFromBrotherName](Provider.md#getaddressfrombrothername)

#### Defined in

[src/provider/extensions/brotherId.ts:186](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/extensions/brotherId.ts#L186)

---

### getBrotherProfile

▸ **getBrotherProfile**(`provider`, `address`, `BrotherIdContract?`): `Promise`<`BrotherProfile`\>

Static implementation of getBrotherProfile

#### Parameters

| Name                 | Type                                         | Description                        |
| :------------------- | :------------------------------------------- | :--------------------------------- |
| `provider`           | [`ProviderInterface`](ProviderInterface.md)  | The provider interface             |
| `address`            | [`BigNumberish`](../modules.md#bignumberish) | The address to get the profile for |
| `BrotherIdContract?` | `string`                                     | Optional contract address          |

#### Returns

`Promise`<`BrotherProfile`\>

The complete Brother profile

#### Inherited from

[Provider](Provider.md).[getBrotherProfile](Provider.md#getbrotherprofile)

#### Defined in

[src/provider/extensions/brotherId.ts:226](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/extensions/brotherId.ts#L226)

---

### getNonce

▸ **getNonce**(`blockIdentifier?`): `Promise`<`string`\>

Get the current nonce of the account

#### Parameters

| Name               | Type                                               | Description                                  |
| :----------------- | :------------------------------------------------- | :------------------------------------------- |
| `blockIdentifier?` | [`BlockIdentifier`](../modules.md#blockidentifier) | Block to query nonce at (default: 'pending') |

#### Returns

`Promise`<`string`\>

Account nonce as hex string

**`Example`**

```typescript
const nonce = await account.getNonce();
const historicalNonce = await account.getNonce('latest');
```

#### Implementation of

[AccountInterface](AccountInterface.md).[getNonce](AccountInterface.md#getnonce)

#### Defined in

[src/account/default.ts:146](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/account/default.ts#L146)

---

### getNonceSafe

▸ **getNonceSafe**(`nonce?`): `Promise`<`bigint`\>

#### Parameters

| Name     | Type                                         |
| :------- | :------------------------------------------- |
| `nonce?` | [`BigNumberish`](../modules.md#bignumberish) |

#### Returns

`Promise`<`bigint`\>

#### Defined in

[src/account/default.ts:150](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/account/default.ts#L150)

---

### getCairoVersion

▸ **getCairoVersion**(`classHash?`): `Promise`<[`CairoVersion`](../modules.md#cairoversion)\>

Retrieves the Cairo version from the network and sets `cairoVersion` if not already set in the constructor.

#### Parameters

| Name         | Type     | Description                                                                          |
| :----------- | :------- | :----------------------------------------------------------------------------------- |
| `classHash?` | `string` | if provided detects Cairo version from classHash, otherwise from the account address |

#### Returns

`Promise`<[`CairoVersion`](../modules.md#cairoversion)\>

#### Defined in

[src/account/default.ts:163](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/account/default.ts#L163)

---

### estimateInvokeFee

▸ **estimateInvokeFee**(`calls`, `details?`): `Promise`<[`EstimateFeeResponseOverhead`](../modules.md#estimatefeeresponseoverhead)\>

Estimate fee for executing an INVOKE transaction on Starknet

#### Parameters

| Name      | Type                                                                    | Description                                        |
| :-------- | :---------------------------------------------------------------------- | :------------------------------------------------- |
| `calls`   | [`AllowArray`](../modules.md#allowarray)<[`Call`](../modules.md#call)\> | Single call or array of calls to estimate fees for |
| `details` | [`UniversalDetails`](../interfaces/UniversalDetails.md)                 | Optional details for fee estimation                |

#### Returns

`Promise`<[`EstimateFeeResponseOverhead`](../modules.md#estimatefeeresponseoverhead)\>

Fee estimation including overall_fee and resourceBounds

**`Example`**

```typescript
const fee = await account.estimateInvokeFee({
  contractAddress: '0x123...',
  entrypoint: 'transfer',
  calldata: [recipient, amount],
});
```

#### Implementation of

[AccountInterface](AccountInterface.md).[estimateInvokeFee](AccountInterface.md#estimateinvokefee)

#### Defined in

[src/account/default.ts:173](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/account/default.ts#L173)

---

### estimateDeclareFee

▸ **estimateDeclareFee**(`payload`, `details?`): `Promise`<[`EstimateFeeResponseOverhead`](../modules.md#estimatefeeresponseoverhead)\>

Estimate fee for executing a DECLARE transaction on Starknet

#### Parameters

| Name      | Type                                                             | Description                         |
| :-------- | :--------------------------------------------------------------- | :---------------------------------- |
| `payload` | [`DeclareContractPayload`](../modules.md#declarecontractpayload) | Contract declaration payload        |
| `details` | [`UniversalDetails`](../interfaces/UniversalDetails.md)          | Optional details for fee estimation |

#### Returns

`Promise`<[`EstimateFeeResponseOverhead`](../modules.md#estimatefeeresponseoverhead)\>

Fee estimation including overall_fee and resourceBounds

**`Example`**

```typescript
const fee = await account.estimateDeclareFee({
  contract: compiledContract,
  casm: compiledCasm,
});
```

#### Implementation of

[AccountInterface](AccountInterface.md).[estimateDeclareFee](AccountInterface.md#estimatedeclarefee)

#### Defined in

[src/account/default.ts:183](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/account/default.ts#L183)

---

### estimateAccountDeployFee

▸ **estimateAccountDeployFee**(`«destructured»`, `details?`): `Promise`<[`EstimateFeeResponseOverhead`](../modules.md#estimatefeeresponseoverhead)\>

Estimate fee for executing an INVOKE transaction on Starknet

#### Parameters

| Name             | Type                                                                         | Description                                        |
| :--------------- | :--------------------------------------------------------------------------- | :------------------------------------------------- |
| `«destructured»` | [`DeployAccountContractPayload`](../modules.md#deployaccountcontractpayload) | Single call or array of calls to estimate fees for |
| `details`        | [`UniversalDetails`](../interfaces/UniversalDetails.md)                      | Optional details for fee estimation                |

#### Returns

`Promise`<[`EstimateFeeResponseOverhead`](../modules.md#estimatefeeresponseoverhead)\>

Fee estimation including overall_fee and resourceBounds

Fee estimation including overall_fee and resourceBounds

**`Example`**

```typescript
const fee = await account.estimateAccountDeployFee({
  classHash: accountClassHash,
  constructorCalldata: { publicKey },
  addressSalt: publicKey,
});
```

#### Implementation of

[AccountInterface](AccountInterface.md).[estimateAccountDeployFee](AccountInterface.md#estimateaccountdeployfee)

#### Defined in

[src/account/default.ts:202](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/account/default.ts#L202)

---

### estimateDeployFee

▸ **estimateDeployFee**(`payload`, `details?`): `Promise`<[`EstimateFeeResponseOverhead`](../modules.md#estimatefeeresponseoverhead)\>

Estimate fee for executing an INVOKE transaction on Starknet

#### Parameters

| Name      | Type                                                                                                                                                                           | Description                                        |
| :-------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------- |
| `payload` | [`UniversalDeployerContractPayload`](../modules.md#universaldeployercontractpayload) \| [`UniversalDeployerContractPayload`](../modules.md#universaldeployercontractpayload)[] | Single call or array of calls to estimate fees for |
| `details` | [`UniversalDetails`](../interfaces/UniversalDetails.md)                                                                                                                        | Optional details for fee estimation                |

#### Returns

`Promise`<[`EstimateFeeResponseOverhead`](../modules.md#estimatefeeresponseoverhead)\>

Fee estimation for the deployment transaction

Fee estimation including overall_fee and resourceBounds

**`Example`**

```typescript
const fee = await account.estimateDeployFee({
  classHash: contractClassHash,
  constructorCalldata: [param1, param2],
  unique: true,
});
```

#### Implementation of

[AccountInterface](AccountInterface.md).[estimateDeployFee](AccountInterface.md#estimatedeployfee)

#### Defined in

[src/account/default.ts:232](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/account/default.ts#L232)

---

### estimateFeeBulk

▸ **estimateFeeBulk**(`invocations`, `details?`): `Promise`<[`EstimateFeeBulk`](../modules.md#estimatefeebulk)\>

Estimate fee for executing an INVOKE transaction on Starknet

#### Parameters

| Name          | Type                                                    | Description                                        |
| :------------ | :------------------------------------------------------ | :------------------------------------------------- |
| `invocations` | [`Invocations`](../modules.md#invocations)              | Single call or array of calls to estimate fees for |
| `details`     | [`UniversalDetails`](../interfaces/UniversalDetails.md) | Optional details for fee estimation                |

#### Returns

`Promise`<[`EstimateFeeBulk`](../modules.md#estimatefeebulk)\>

Array of fee estimations for each transaction

Fee estimation including overall_fee and resourceBounds

**`Example`**

```typescript
const fees = await account.estimateFeeBulk([
  { type: 'INVOKE', payload: { contractAddress, entrypoint, calldata } },
  { type: 'DECLARE', payload: { contract, casm } },
]);
```

#### Implementation of

[AccountInterface](AccountInterface.md).[estimateFeeBulk](AccountInterface.md#estimatefeebulk)

#### Defined in

[src/account/default.ts:240](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/account/default.ts#L240)

---

### simulateTransaction

▸ **simulateTransaction**(`invocations`, `details?`): `Promise`<[`SimulateTransactionOverheadResponse`](../modules.md#simulatetransactionoverheadresponse)\>

#### Parameters

| Name          | Type                                                                     |
| :------------ | :----------------------------------------------------------------------- |
| `invocations` | [`Invocations`](../modules.md#invocations)                               |
| `details`     | [`SimulateTransactionDetails`](../modules.md#simulatetransactiondetails) |

#### Returns

`Promise`<[`SimulateTransactionOverheadResponse`](../modules.md#simulatetransactionoverheadresponse)\>

#### Defined in

[src/account/default.ts:270](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/account/default.ts#L270)

---

### execute

▸ **execute**(`transactions`, `transactionsDetail?`): `Promise`<\{ `transaction_hash`: `string` }\>

Execute one or multiple calls through the account contract

#### Parameters

| Name                 | Type                                                                    | Description                              |
| :------------------- | :---------------------------------------------------------------------- | :--------------------------------------- |
| `transactions`       | [`AllowArray`](../modules.md#allowarray)<[`Call`](../modules.md#call)\> | Single call or array of calls to execute |
| `transactionsDetail` | [`UniversalDetails`](../interfaces/UniversalDetails.md)                 | Transaction execution options            |

#### Returns

`Promise`<\{ `transaction_hash`: `string` }\>

Transaction hash and response

**`Example`**

```typescript
const result = await account.execute([
  { contractAddress: token, entrypoint: 'transfer', calldata: [to, amount] },
  { contractAddress: nft, entrypoint: 'mint', calldata: [recipient] },
]);
```

#### Implementation of

[AccountInterface](AccountInterface.md).[execute](AccountInterface.md#execute)

#### Defined in

[src/account/default.ts:298](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/account/default.ts#L298)

---

### fastExecute

▸ **fastExecute**(`transactions`, `transactionsDetail?`, `waitDetail?`): `Promise`<[`fastExecuteResponse`](../modules.md#fastexecuteresponse)\>

Execute one or multiple calls through the account contract,
responding as soon as a new transaction is possible with the same account.
Useful for gaming usage.

- This method requires the provider to be initialized with `pre_confirmed` blockIdentifier option.
- Rpc 0.9 minimum.
- In a normal myAccount.execute() call, followed by myProvider.waitForTransaction(), you have an immediate access to the events and to the transaction report. Here, we are processing consecutive transactions faster, but events & transaction reports are not available immediately.
- As a consequence of the previous point, do not use contract/account deployment with this method.

#### Parameters

| Name                  | Type                                                                           | Description                                                                                                                                                  |
| :-------------------- | :----------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `transactions`        | [`AllowArray`](../modules.md#allowarray)<[`Call`](../modules.md#call)\>        | Single call or array of calls to execute                                                                                                                     |
| `transactionsDetail?` | [`UniversalDetails`](../interfaces/UniversalDetails.md)                        | Transaction execution options                                                                                                                                |
| `waitDetail?`         | [`fastWaitForTransactionOptions`](../modules.md#fastwaitfortransactionoptions) | options to scan the network for the next possible transaction. `retries` is the number of times to retry, `retryInterval` is the time in ms between retries. |

#### Returns

`Promise`<[`fastExecuteResponse`](../modules.md#fastexecuteresponse)\>

Response containing the transaction result and status for the next transaction. If `isReady` is true, you can execute the next transaction. If false, timeout has been reached before the next transaction was possible.

**`Example`**

```typescript
const myProvider = new RpcProvider({ nodeUrl: url, blockIdentifier: BlockTag.PRE_CONFIRMED });
const myAccount = new Account({
  provider: myProvider,
  address: accountAddress0,
  signer: privateKey0,
});
const resp = await myAccount.fastExecute(
  call,
  { tip: recommendedTip },
  { retries: 30, retryInterval: 500 }
);
// if resp.isReady is true, you can launch immediately a new tx.
```

#### Defined in

[src/account/default.ts:363](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/account/default.ts#L363)

---

### declareIfNot

▸ **declareIfNot**(`payload`, `transactionsDetail?`): `Promise`<\{ `class_hash`: `string` ; `transaction_hash`: `string` }\>

First check if contract is already declared, if not declare it
If contract already declared returned transaction_hash is ''.
Method will pass even if contract is already declared

#### Parameters

| Name                 | Type                                                             | Description |
| :------------------- | :--------------------------------------------------------------- | :---------- |
| `payload`            | [`DeclareContractPayload`](../modules.md#declarecontractpayload) | -           |
| `transactionsDetail` | [`UniversalDetails`](../interfaces/UniversalDetails.md)          | (optional)  |

#### Returns

`Promise`<\{ `class_hash`: `string` ; `transaction_hash`: `string` }\>

#### Implementation of

[AccountInterface](AccountInterface.md).[declareIfNot](AccountInterface.md#declareifnot)

#### Defined in

[src/account/default.ts:397](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/account/default.ts#L397)

---

### declare

▸ **declare**(`payload`, `details?`): `Promise`<\{ `class_hash`: `string` ; `transaction_hash`: `string` }\>

Execute one or multiple calls through the account contract

#### Parameters

| Name      | Type                                                             | Description                              |
| :-------- | :--------------------------------------------------------------- | :--------------------------------------- |
| `payload` | [`DeclareContractPayload`](../modules.md#declarecontractpayload) | Single call or array of calls to execute |
| `details` | [`UniversalDetails`](../interfaces/UniversalDetails.md)          | Transaction execution options            |

#### Returns

`Promise`<\{ `class_hash`: `string` ; `transaction_hash`: `string` }\>

Declaration transaction hash and class hash

Transaction hash and response

**`Example`**

```typescript
const declareResult = await account.declare({
  contract: compiledSierra,
  casm: compiledCasm,
});
```

#### Implementation of

[AccountInterface](AccountInterface.md).[declare](AccountInterface.md#declare)

#### Defined in

[src/account/default.ts:416](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/account/default.ts#L416)

---

### deploy

▸ **deploy**(`payload`, `details?`): `Promise`<[`MultiDeployContractResponse`](../modules.md#multideploycontractresponse)\>

Execute one or multiple calls through the account contract

#### Parameters

| Name      | Type                                                                                                                                                                           | Description                              |
| :-------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------- |
| `payload` | [`UniversalDeployerContractPayload`](../modules.md#universaldeployercontractpayload) \| [`UniversalDeployerContractPayload`](../modules.md#universaldeployercontractpayload)[] | Single call or array of calls to execute |
| `details` | [`UniversalDetails`](../interfaces/UniversalDetails.md)                                                                                                                        | Transaction execution options            |

#### Returns

`Promise`<[`MultiDeployContractResponse`](../modules.md#multideploycontractresponse)\>

Deployed contract addresses and transaction hash

Transaction hash and response

**`Example`**

```typescript
const deployment = await account.deploy([
  { classHash: erc20ClassHash, constructorCalldata: [name, symbol] },
  { classHash: nftClassHash, unique: true },
]);
```

#### Implementation of

[AccountInterface](AccountInterface.md).[deploy](AccountInterface.md#deploy)

#### Defined in

[src/account/default.ts:465](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/account/default.ts#L465)

---

### deployContract

▸ **deployContract**(`payload`, `details?`): `Promise`<[`DeployContractUDCResponse`](../modules.md#deploycontractudcresponse)\>

Execute one or multiple calls through the account contract

#### Parameters

| Name      | Type                                                                                                                                                                           | Description                              |
| :-------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------- |
| `payload` | [`UniversalDeployerContractPayload`](../modules.md#universaldeployercontractpayload) \| [`UniversalDeployerContractPayload`](../modules.md#universaldeployercontractpayload)[] | Single call or array of calls to execute |
| `details` | [`UniversalDetails`](../interfaces/UniversalDetails.md) & [`waitForTransactionOptions`](../modules.md#waitfortransactionoptions)                                               | Transaction execution options            |

#### Returns

`Promise`<[`DeployContractUDCResponse`](../modules.md#deploycontractudcresponse)\>

Deployment result with contract address and UDC event details

Deployed contract addresses and transaction hash

**`Remarks`**

This method waits for transaction confirmation before returning

**`Example`**

```typescript
const result = await account.deployContract({
  classHash: contractClassHash,
  constructorCalldata: params,
});
console.log('Deployed at:', result.address);
```

#### Implementation of

[AccountInterface](AccountInterface.md).[deployContract](AccountInterface.md#deploycontract)

#### Defined in

[src/account/default.ts:478](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/account/default.ts#L478)

---

### declareAndDeploy

▸ **declareAndDeploy**(`payload`, `details?`): `Promise`<[`DeclareDeployUDCResponse`](../modules.md#declaredeployudcresponse)\>

Execute one or multiple calls through the account contract

#### Parameters

| Name      | Type                                                                                                                             | Description                              |
| :-------- | :------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------- |
| `payload` | [`DeclareAndDeployContractPayload`](../modules.md#declareanddeploycontractpayload)                                               | Single call or array of calls to execute |
| `details` | [`UniversalDetails`](../interfaces/UniversalDetails.md) & [`waitForTransactionOptions`](../modules.md#waitfortransactionoptions) | Transaction execution options            |

#### Returns

`Promise`<[`DeclareDeployUDCResponse`](../modules.md#declaredeployudcresponse)\>

Declaration and deployment results

Transaction hash and response

**`Remarks`**

- Automatically skips declaration if contract is already declared
- Waits for both transactions to complete
- Does not support batch operations

**`Example`**

```typescript
const result = await account.declareAndDeploy({
  contract: compiledContract,
  casm: compiledCasm,
  constructorCalldata: [param1, param2],
});
```

#### Implementation of

[AccountInterface](AccountInterface.md).[declareAndDeploy](AccountInterface.md#declareanddeploy)

#### Defined in

[src/account/default.ts:489](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/account/default.ts#L489)

---

### deployAccount

▸ **deployAccount**(`«destructured»`, `details?`): `Promise`<[`DeployContractResponse`](../interfaces/DeployContractResponse.md)\>

Execute one or multiple calls through the account contract

#### Parameters

| Name             | Type                                                                         | Description                              |
| :--------------- | :--------------------------------------------------------------------------- | :--------------------------------------- |
| `«destructured»` | [`DeployAccountContractPayload`](../modules.md#deployaccountcontractpayload) | Single call or array of calls to execute |
| `details`        | [`UniversalDetails`](../interfaces/UniversalDetails.md)                      | Transaction execution options            |

#### Returns

`Promise`<[`DeployContractResponse`](../interfaces/DeployContractResponse.md)\>

Deployment transaction hash and contract address

Transaction hash and response

**`Remarks`**

Used for deploying the account contract when using a pre-funded address

**`Example`**

```typescript
const deployment = await account.deployAccount({
  classHash: accountClassHash,
  constructorCalldata: { publicKey: pubKey },
  addressSalt: pubKey,
});
```

#### Implementation of

[AccountInterface](AccountInterface.md).[deployAccount](AccountInterface.md#deployaccount)

#### Defined in

[src/account/default.ts:507](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/account/default.ts#L507)

---

### signMessage

▸ **signMessage**(`typedData`): `Promise`<[`Signature`](../modules.md#signature)\>

Sign a typed data message for off-chain verification

#### Parameters

| Name        | Type                                                               | Description                        |
| :---------- | :----------------------------------------------------------------- | :--------------------------------- |
| `typedData` | [`TypedData`](../interfaces/RPC.RPCSPEC09.WALLET_API.TypedData.md) | EIP-712 style typed data structure |

#### Returns

`Promise`<[`Signature`](../modules.md#signature)\>

Signature array [r, s]

**`Remarks`**

- Includes domain separation to prevent signature reuse
- Compatible with Starknet's signature verification
- Cannot be used to sign transactions

**`Example`**

```typescript
const signature = await account.signMessage({
  domain: { name: 'MyDapp', chainId: 'SN_MAIN' },
  types: { ... },
  primaryType: 'Message',
  message: { content: 'Hello Starknet!' }
});
```

#### Implementation of

[AccountInterface](AccountInterface.md).[signMessage](AccountInterface.md#signmessage)

#### Defined in

[src/account/default.ts:578](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/account/default.ts#L578)

---

### hashMessage

▸ **hashMessage**(`typedData`): `Promise`<`string`\>

Hash a typed data message using Pedersen hash

#### Parameters

| Name        | Type                                                               | Description                        |
| :---------- | :----------------------------------------------------------------- | :--------------------------------- |
| `typedData` | [`TypedData`](../interfaces/RPC.RPCSPEC09.WALLET_API.TypedData.md) | EIP-712 style typed data structure |

#### Returns

`Promise`<`string`\>

Message hash as hex string

**`Remarks`**

- Uses Pedersen hash function (not Keccak)
- Includes domain separation
- Result can be used for signature verification

**`Example`**

```typescript
const messageHash = await account.hashMessage(typedData);
```

#### Implementation of

[AccountInterface](AccountInterface.md).[hashMessage](AccountInterface.md#hashmessage)

#### Defined in

[src/account/default.ts:582](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/account/default.ts#L582)

---

### getSnip9Version

▸ **getSnip9Version**(): `Promise`<`"0"` \| `"1"` \| `"2"`\>

Verify if an account is compatible with SNIP-9 outside execution, and with which version of this standard.

#### Returns

`Promise`<`"0"` \| `"1"` \| `"2"`\>

Not compatible, V1, V2.

**`Example`**

```typescript
const result = myAccount.getSnip9Version();
// result = "V1"
```

#### Defined in

[src/account/default.ts:595](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/account/default.ts#L595)

---

### isValidSnip9Nonce

▸ **isValidSnip9Nonce**(`nonce`): `Promise`<`boolean`\>

Verify if a SNIP-9 nonce has not yet been used by the account.

#### Parameters

| Name    | Type                                         | Description           |
| :------ | :------------------------------------------- | :-------------------- |
| `nonce` | [`BigNumberish`](../modules.md#bignumberish) | SNIP-9 nonce to test. |

#### Returns

`Promise`<`boolean`\>

true if SNIP-9 nonce not yet used.

**`Example`**

```typescript
const result = myAccount.isValidSnip9Nonce(1234);
// result = true
```

#### Defined in

[src/account/default.ts:616](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/account/default.ts#L616)

---

### getSnip9Nonce

▸ **getSnip9Nonce**(): `Promise`<`string`\>

Outside transaction needs a specific SNIP-9 nonce, that we get in this function.
A SNIP-9 nonce can be any number not yet used ; no ordering is needed.

#### Returns

`Promise`<`string`\>

an Hex string of a SNIP-9 nonce.

**`Example`**

```typescript
const result = myAccount.getSnip9Nonce();
// result = "0x28a612590dbc36927933c8ee0f357eee639c8b22b3d3aa86949eed3ada4ac55"
```

#### Defined in

[src/account/default.ts:640](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/account/default.ts#L640)

---

### getOutsideTransaction

▸ **getOutsideTransaction**(`options`, `calls`, `version?`, `nonce?`): `Promise`<[`OutsideTransaction`](../interfaces/OutsideTransaction.md)\>

Creates an object containing transaction(s) that can be executed by an other account with` Account.executeFromOutside()`, called Outside Transaction.

#### Parameters

| Name       | Type                                                                    | Description                                                         |
| :--------- | :---------------------------------------------------------------------- | :------------------------------------------------------------------ |
| `options`  | [`OutsideExecutionOptions`](../interfaces/OutsideExecutionOptions.md)   | Parameters of the transaction(s).                                   |
| `calls`    | [`AllowArray`](../modules.md#allowarray)<[`Call`](../modules.md#call)\> | Transaction(s) to execute.                                          |
| `version?` | `"0"` \| `"1"` \| `"2"`                                                 | SNIP-9 version of the Account that creates the outside transaction. |
| `nonce?`   | [`BigNumberish`](../modules.md#bignumberish)                            | Outside Nonce.                                                      |

#### Returns

`Promise`<[`OutsideTransaction`](../interfaces/OutsideTransaction.md)\>

and object that can be used in `Account.executeFromOutside()`

**`Example`**

```typescript
const now_seconds = Math.floor(Date.now() / 1000);
const callOptions: OutsideExecutionOptions = {
  caller: executorAccount.address,
  execute_after: now_seconds - 3600,
  execute_before: now_seconds + 3600,
};
const call1: Call = {
  contractAddress: ethAddress,
  entrypoint: 'transfer',
  calldata: {
    recipient: recipientAccount.address,
    amount: cairo.uint256(100),
  },
};
const outsideTransaction1: OutsideTransaction = await signerAccount.getOutsideTransaction(
  callOptions,
  call3
);
// result = {
// outsideExecution: {
// caller: '0x64b48806902a367c8598f4f95c305e8c1a1acba5f082d294a43793113115691',
// nonce: '0x28a612590dbc36927933c8ee0f357eee639c8b22b3d3aa86949eed3ada4ac55',
// execute_after: 1723650229, execute_before: 1723704229, calls: [[Object]] },
// signature: Signature {
// r: 67518627037915514985321278857825384106482999609634873287406612756843916814n,
// s: 737198738569840639192844101690009498983611654458636624293579534560862067709n, recovery: 0 },
// signerAddress: '0x655f8fd7c4013c07cf12a92184aa6c314d181443913e21f7e209a18f0c78492',
// version: '2'
// }
```

#### Defined in

[src/account/default.ts:677](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/account/default.ts#L677)

---

### executeFromOutside

▸ **executeFromOutside**(`outsideTransaction`, `opts?`): `Promise`<\{ `transaction_hash`: `string` }\>

An account B executes a transaction that has been signed by an account A.
Fees are paid by B.

#### Parameters

| Name                 | Type                                                                                                   | Description                                                            |
| :------------------- | :----------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------- |
| `outsideTransaction` | [`AllowArray`](../modules.md#allowarray)<[`OutsideTransaction`](../interfaces/OutsideTransaction.md)\> | the signed transaction generated by `Account.getOutsideTransaction()`. |
| `opts?`              | [`UniversalDetails`](../interfaces/UniversalDetails.md)                                                | same options than `Account.execute()`.                                 |

#### Returns

`Promise`<\{ `transaction_hash`: `string` }\>

same response than `Account.execute()`.

**`Example`**

```typescript
const outsideTransaction1: OutsideTransaction = await signerAccount.getOutsideTransaction(
  callOptions,
  call1
);
const outsideTransaction2: OutsideTransaction = await signerAccount.getOutsideTransaction(
  callOptions4,
  call4
);
const result = await myAccount.executeFromOutside([outsideTransaction1, outsideTransaction2]);
// result = { transaction_hash: '0x11233...`}
```

#### Defined in

[src/account/default.ts:737](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/account/default.ts#L737)

---

### resolveDetailsWithTip

▸ **resolveDetailsWithTip**(`details`): `Promise`<[`UniversalDetails`](../interfaces/UniversalDetails.md) & \{ `tip`: [`BigNumberish`](../modules.md#bignumberish) }\>

Helper method to resolve details with tip estimation

#### Parameters

| Name      | Type                                                    |
| :-------- | :------------------------------------------------------ |
| `details` | [`UniversalDetails`](../interfaces/UniversalDetails.md) |

#### Returns

`Promise`<[`UniversalDetails`](../interfaces/UniversalDetails.md) & \{ `tip`: [`BigNumberish`](../modules.md#bignumberish) }\>

#### Defined in

[src/account/default.ts:753](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/account/default.ts#L753)

---

### resolveTransactionVersion

▸ **resolveTransactionVersion**(`providedVersion?`): [`ETransactionVersion3`](../namespaces/RPC.RPCSPEC09.API.md#etransactionversion3)

Helper method to resolve transaction version

#### Parameters

| Name               | Type                                         |
| :----------------- | :------------------------------------------- |
| `providedVersion?` | [`BigNumberish`](../modules.md#bignumberish) |

#### Returns

[`ETransactionVersion3`](../namespaces/RPC.RPCSPEC09.API.md#etransactionversion3)

#### Defined in

[src/account/default.ts:766](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/account/default.ts#L766)

---

### buildInvocation

▸ **buildInvocation**(`call`, `details`): `Promise`<[`Invocation`](../modules.md#invocation)\>

#### Parameters

| Name      | Type                                                                 |
| :-------- | :------------------------------------------------------------------- |
| `call`    | [`Call`](../modules.md#call)[]                                       |
| `details` | [`InvocationsSignerDetails`](../modules.md#invocationssignerdetails) |

#### Returns

`Promise`<[`Invocation`](../modules.md#invocation)\>

#### Defined in

[src/account/default.ts:773](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/account/default.ts#L773)

---

### buildDeclarePayload

▸ **buildDeclarePayload**(`payload`, `details`): `Promise`<[`DeclareContractTransaction`](../modules.md#declarecontracttransaction)\>

#### Parameters

| Name      | Type                                                                 |
| :-------- | :------------------------------------------------------------------- |
| `payload` | [`DeclareContractPayload`](../modules.md#declarecontractpayload)     |
| `details` | [`InvocationsSignerDetails`](../modules.md#invocationssignerdetails) |

#### Returns

`Promise`<[`DeclareContractTransaction`](../modules.md#declarecontracttransaction)\>

#### Defined in

[src/account/default.ts:788](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/account/default.ts#L788)

---

### buildAccountDeployPayload

▸ **buildAccountDeployPayload**(`«destructured»`, `details`): `Promise`<[`DeployAccountContractTransaction`](../modules.md#deployaccountcontracttransaction)\>

#### Parameters

| Name             | Type                                                                         |
| :--------------- | :--------------------------------------------------------------------------- |
| `«destructured»` | [`DeployAccountContractPayload`](../modules.md#deployaccountcontractpayload) |
| `details`        | [`InvocationsSignerDetails`](../modules.md#invocationssignerdetails)         |

#### Returns

`Promise`<[`DeployAccountContractTransaction`](../modules.md#deployaccountcontracttransaction)\>

#### Defined in

[src/account/default.ts:823](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/account/default.ts#L823)

---

### accountInvocationsFactory

▸ **accountInvocationsFactory**(`invocations`, `details`): `Promise`<[\{ `type`: `"INVOKE"` } & [`CallDetails`](../modules.md#calldetails) & \{ signature?: Signature \| undefined; } & InvocationsDetailsWithNonce]\>

Build account invocations with proper typing based on transaction type

#### Parameters

| Name          | Type                                                                                                           |
| :------------ | :------------------------------------------------------------------------------------------------------------- |
| `invocations` | [\{ `type`: `"INVOKE"` ; `payload`: [`AllowArray`](../modules.md#allowarray)<[`Call`](../modules.md#call)\> }] |
| `details`     | [`AccountInvocationsFactoryDetails`](../modules.md#accountinvocationsfactorydetails)                           |

#### Returns

`Promise`<[\{ `type`: `"INVOKE"` } & [`CallDetails`](../modules.md#calldetails) & \{ signature?: Signature \| undefined; } & InvocationsDetailsWithNonce]\>

#### Defined in

[src/account/default.ts:861](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/account/default.ts#L861)

▸ **accountInvocationsFactory**(`invocations`, `details`): `Promise`<[\{ `type`: `"DECLARE"` } & [`DeclareContractTransaction`](../modules.md#declarecontracttransaction) & [`InvocationsDetailsWithNonce`](../modules.md#invocationsdetailswithnonce)]\>

#### Parameters

| Name          | Type                                                                                                     |
| :------------ | :------------------------------------------------------------------------------------------------------- |
| `invocations` | [\{ `type`: `"DECLARE"` ; `payload`: [`DeclareContractPayload`](../modules.md#declarecontractpayload) }] |
| `details`     | [`AccountInvocationsFactoryDetails`](../modules.md#accountinvocationsfactorydetails)                     |

#### Returns

`Promise`<[\{ `type`: `"DECLARE"` } & [`DeclareContractTransaction`](../modules.md#declarecontracttransaction) & [`InvocationsDetailsWithNonce`](../modules.md#invocationsdetailswithnonce)]\>

#### Defined in

[src/account/default.ts:867](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/account/default.ts#L867)

▸ **accountInvocationsFactory**(`invocations`, `details`): `Promise`<[\{ `type`: `"DEPLOY_ACCOUNT"` } & `Omit`<[`DeployAccountContractPayload`](../modules.md#deployaccountcontractpayload), `"contractAddress"`\> & \{ signature?: Signature \| undefined; } & InvocationsDetailsWithNonce]\>

#### Parameters

| Name          | Type                                                                                                                        |
| :------------ | :-------------------------------------------------------------------------------------------------------------------------- |
| `invocations` | [\{ `type`: `"DEPLOY_ACCOUNT"` ; `payload`: [`DeployAccountContractPayload`](../modules.md#deployaccountcontractpayload) }] |
| `details`     | [`AccountInvocationsFactoryDetails`](../modules.md#accountinvocationsfactorydetails)                                        |

#### Returns

`Promise`<[\{ `type`: `"DEPLOY_ACCOUNT"` } & `Omit`<[`DeployAccountContractPayload`](../modules.md#deployaccountcontractpayload), `"contractAddress"`\> & \{ signature?: Signature \| undefined; } & InvocationsDetailsWithNonce]\>

#### Defined in

[src/account/default.ts:876](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/account/default.ts#L876)

▸ **accountInvocationsFactory**(`invocations`, `details`): `Promise`<[`AccountInvocations`](../modules.md#accountinvocations)\>

#### Parameters

| Name          | Type                                                                                 |
| :------------ | :----------------------------------------------------------------------------------- |
| `invocations` | [`Invocations`](../modules.md#invocations)                                           |
| `details`     | [`AccountInvocationsFactoryDetails`](../modules.md#accountinvocationsfactorydetails) |

#### Returns

`Promise`<[`AccountInvocations`](../modules.md#accountinvocations)\>

#### Defined in

[src/account/default.ts:887](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/account/default.ts#L887)

---

### buildPaymasterTransaction

▸ **buildPaymasterTransaction**(`calls`, `paymasterDetails`): `Promise`<[`PreparedTransaction`](../modules.md#preparedtransaction)\>

Estimate fees for a paymaster-sponsored transaction

#### Parameters

| Name               | Type                                                    | Description                    |
| :----------------- | :------------------------------------------------------ | :----------------------------- |
| `calls`            | [`Call`](../modules.md#call)[]                          | Array of calls to be sponsored |
| `paymasterDetails` | [`PaymasterDetails`](../interfaces/PaymasterDetails.md) | Paymaster configuration        |

#### Returns

`Promise`<[`PreparedTransaction`](../modules.md#preparedtransaction)\>

Prepared transaction with typed data for signing

Fee estimates in both STRK and gas token

**`Example`**

```typescript
const prepared = await account.buildPaymasterTransaction(calls, {
  feeMode: { mode: 'default', gasToken: ETH_ADDRESS },
});
```

#### Implementation of

[AccountInterface](AccountInterface.md).[buildPaymasterTransaction](AccountInterface.md#buildpaymastertransaction)

#### Defined in

[src/account/default.ts:976](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/account/default.ts#L976)

---

### estimatePaymasterTransactionFee

▸ **estimatePaymasterTransactionFee**(`calls`, `paymasterDetails`): `Promise`<[`PaymasterFeeEstimate`](../modules.md#paymasterfeeestimate)\>

Estimate fees for a paymaster-sponsored transaction

#### Parameters

| Name               | Type                                                    | Description                    |
| :----------------- | :------------------------------------------------------ | :----------------------------- |
| `calls`            | [`Call`](../modules.md#call)[]                          | Array of calls to be sponsored |
| `paymasterDetails` | [`PaymasterDetails`](../interfaces/PaymasterDetails.md) | Paymaster configuration        |

#### Returns

`Promise`<[`PaymasterFeeEstimate`](../modules.md#paymasterfeeestimate)\>

Fee estimates in both STRK and gas token

**`Example`**

```typescript
const fees = await account.estimatePaymasterTransactionFee(
  [{ contractAddress, entrypoint, calldata }],
  { feeMode: { mode: 'sponsored' } }
);
```

#### Implementation of

[AccountInterface](AccountInterface.md).[estimatePaymasterTransactionFee](AccountInterface.md#estimatepaymastertransactionfee)

#### Defined in

[src/account/default.ts:1015](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/account/default.ts#L1015)

---

### preparePaymasterTransaction

▸ **preparePaymasterTransaction**(`preparedTransaction`): `Promise`<[`ExecutableUserTransaction`](../modules.md#executableusertransaction)\>

#### Parameters

| Name                  | Type                                                       |
| :-------------------- | :--------------------------------------------------------- |
| `preparedTransaction` | [`PreparedTransaction`](../modules.md#preparedtransaction) |

#### Returns

`Promise`<[`ExecutableUserTransaction`](../modules.md#executableusertransaction)\>

#### Defined in

[src/account/default.ts:1023](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/account/default.ts#L1023)

---

### executePaymasterTransaction

▸ **executePaymasterTransaction**(`calls`, `paymasterDetails`, `maxFeeInGasToken?`): `Promise`<\{ `transaction_hash`: `string` }\>

Execute a paymaster-sponsored transaction

#### Parameters

| Name                | Type                                                    | Description                         |
| :------------------ | :------------------------------------------------------ | :---------------------------------- |
| `calls`             | [`Call`](../modules.md#call)[]                          | Array of calls to execute           |
| `paymasterDetails`  | [`PaymasterDetails`](../interfaces/PaymasterDetails.md) | Paymaster configuration             |
| `maxFeeInGasToken?` | [`BigNumberish`](../modules.md#bignumberish)            | Maximum acceptable fee in gas token |

#### Returns

`Promise`<\{ `transaction_hash`: `string` }\>

Transaction hash if successful

**`Throws`**

If gas token price exceeds maxFeeInGasToken

**`Throws`**

If transaction parameters are modified by paymaster

**`Example`**

```typescript
const txHash = await account.executePaymasterTransaction(
  calls,
  { feeMode: { mode: 'sponsored' }, timeBounds: { executeBefore: Date.now() / 1000 + 3600 } },
  maxFeeETH
);
```

#### Implementation of

[AccountInterface](AccountInterface.md).[executePaymasterTransaction](AccountInterface.md#executepaymastertransaction)

#### Defined in

[src/account/default.ts:1066](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/account/default.ts#L1066)

---

### getStarkName

▸ **getStarkName**(`address?`, `StarknetIdContract?`): `Promise`<`string`\>

Get the Starknet ID for an address

#### Parameters

| Name                  | Type                                         | Description                                 |
| :-------------------- | :------------------------------------------- | :------------------------------------------ |
| `address`             | [`BigNumberish`](../modules.md#bignumberish) | The address to get the Starknet ID for      |
| `StarknetIdContract?` | `string`                                     | The Starknet ID contract address (optional) |

#### Returns

`Promise`<`string`\>

The Starknet ID for the address

#### Overrides

[Provider](Provider.md).[getStarkName](Provider.md#getstarkname-1)

#### Defined in

[src/account/default.ts:1104](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/account/default.ts#L1104)

---

### fetch

▸ **fetch**(`method`, `params?`, `id?`): `Promise`<`Response`\>

Direct RPC method call

#### Parameters

| Name      | Type                 | Default value | Description       |
| :-------- | :------------------- | :------------ | :---------------- |
| `method`  | `string`             | `undefined`   | RPC method name   |
| `params?` | `object`             | `undefined`   | method parameters |
| `id`      | `string` \| `number` | `0`           | request ID        |

#### Returns

`Promise`<`Response`\>

RPC response

#### Implementation of

[AccountInterface](AccountInterface.md).[fetch](AccountInterface.md#fetch)

#### Inherited from

[Provider](Provider.md).[fetch](Provider.md#fetch)

#### Defined in

[src/provider/rpc.ts:128](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L128)

---

### getChainId

▸ **getChainId**(): `Promise`<`"0x534e5f4d41494e"` \| `"0x534e5f5345504f4c4941"`\>

Gets the Starknet chain Id

#### Returns

`Promise`<`"0x534e5f4d41494e"` \| `"0x534e5f5345504f4c4941"`\>

the chain Id

#### Implementation of

[AccountInterface](AccountInterface.md).[getChainId](AccountInterface.md#getchainid)

#### Inherited from

[Provider](Provider.md).[getChainId](Provider.md#getchainid)

#### Defined in

[src/provider/rpc.ts:132](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L132)

---

### readSpecVersion

▸ **readSpecVersion**(): `undefined` \| `"0.8.1"` \| `"0.9.0"`

Read channel spec version

#### Returns

`undefined` \| `"0.8.1"` \| `"0.9.0"`

Spec version string or undefined if not set

#### Implementation of

[AccountInterface](AccountInterface.md).[readSpecVersion](AccountInterface.md#readspecversion)

#### Inherited from

[Provider](Provider.md).[readSpecVersion](Provider.md#readspecversion)

#### Defined in

[src/provider/rpc.ts:136](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L136)

---

### getSpecVersion

▸ **getSpecVersion**(): `Promise`<`string`\>

Get channel spec version

#### Returns

`Promise`<`string`\>

Promise resolving to spec version

#### Implementation of

[AccountInterface](AccountInterface.md).[getSpecVersion](AccountInterface.md#getspecversion)

#### Inherited from

[Provider](Provider.md).[getSpecVersion](Provider.md#getspecversion)

#### Defined in

[src/provider/rpc.ts:140](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L140)

---

### setUpSpecVersion

▸ **setUpSpecVersion**(): `Promise`<`"0.8.1"` \| `"0.9.0"`\>

Setup channel spec version and return it

#### Returns

`Promise`<`"0.8.1"` \| `"0.9.0"`\>

Promise resolving to spec version

#### Implementation of

[AccountInterface](AccountInterface.md).[setUpSpecVersion](AccountInterface.md#setupspecversion)

#### Inherited from

[Provider](Provider.md).[setUpSpecVersion](Provider.md#setupspecversion)

#### Defined in

[src/provider/rpc.ts:144](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L144)

---

### getNonceForAddress

▸ **getNonceForAddress**(`contractAddress`, `blockIdentifier?`): `Promise`<`string`\>

Returns the nonce associated with the given address in the given block

#### Parameters

| Name               | Type                                               | Description      |
| :----------------- | :------------------------------------------------- | :--------------- |
| `contractAddress`  | [`BigNumberish`](../modules.md#bignumberish)       | contract address |
| `blockIdentifier?` | [`BlockIdentifier`](../modules.md#blockidentifier) | -                |

#### Returns

`Promise`<`string`\>

the hex nonce

#### Implementation of

[AccountInterface](AccountInterface.md).[getNonceForAddress](AccountInterface.md#getnonceforaddress)

#### Inherited from

[Provider](Provider.md).[getNonceForAddress](Provider.md#getnonceforaddress)

#### Defined in

[src/provider/rpc.ts:148](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L148)

---

### getBlock

▸ **getBlock**(): `Promise`<\{ `transactions`: `string`[] ; `parent_hash`: `string` ; `timestamp`: `number` ; `sequencer_address`: `string` ; `l1_gas_price`: [`RESOURCE_PRICE`](../namespaces/RPC.RPCSPEC08.API.md#resource_price) ; `l2_gas_price`: [`RESOURCE_PRICE`](../namespaces/RPC.RPCSPEC08.API.md#resource_price) ; `l1_data_gas_price`: [`RESOURCE_PRICE`](../namespaces/RPC.RPCSPEC08.API.md#resource_price) ; `l1_da_mode`: [`L1_DA_MODE`](../namespaces/RPC.RPCSPEC08.API.md#l1_da_mode) ; `starknet_version`: `string` }\>

Gets the block information

#### Returns

`Promise`<\{ `transactions`: `string`[] ; `parent_hash`: `string` ; `timestamp`: `number` ; `sequencer_address`: `string` ; `l1_gas_price`: [`RESOURCE_PRICE`](../namespaces/RPC.RPCSPEC08.API.md#resource_price) ; `l2_gas_price`: [`RESOURCE_PRICE`](../namespaces/RPC.RPCSPEC08.API.md#resource_price) ; `l1_data_gas_price`: [`RESOURCE_PRICE`](../namespaces/RPC.RPCSPEC08.API.md#resource_price) ; `l1_da_mode`: [`L1_DA_MODE`](../namespaces/RPC.RPCSPEC08.API.md#l1_da_mode) ; `starknet_version`: `string` }\>

the block object

#### Implementation of

[AccountInterface](AccountInterface.md).[getBlock](AccountInterface.md#getblock)

#### Inherited from

[Provider](Provider.md).[getBlock](Provider.md#getblock)

#### Defined in

[src/provider/rpc.ts:155](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L155)

▸ **getBlock**(`blockIdentifier`): `Promise`<\{ `transactions`: `string`[] ; `parent_hash`: `string` ; `timestamp`: `number` ; `sequencer_address`: `string` ; `l1_gas_price`: [`RESOURCE_PRICE`](../namespaces/RPC.RPCSPEC08.API.md#resource_price) ; `l2_gas_price`: [`RESOURCE_PRICE`](../namespaces/RPC.RPCSPEC08.API.md#resource_price) ; `l1_data_gas_price`: [`RESOURCE_PRICE`](../namespaces/RPC.RPCSPEC08.API.md#resource_price) ; `l1_da_mode`: [`L1_DA_MODE`](../namespaces/RPC.RPCSPEC08.API.md#l1_da_mode) ; `starknet_version`: `string` }\>

#### Parameters

| Name              | Type              |
| :---------------- | :---------------- |
| `blockIdentifier` | `"pre_confirmed"` |

#### Returns

`Promise`<\{ `transactions`: `string`[] ; `parent_hash`: `string` ; `timestamp`: `number` ; `sequencer_address`: `string` ; `l1_gas_price`: [`RESOURCE_PRICE`](../namespaces/RPC.RPCSPEC08.API.md#resource_price) ; `l2_gas_price`: [`RESOURCE_PRICE`](../namespaces/RPC.RPCSPEC08.API.md#resource_price) ; `l1_data_gas_price`: [`RESOURCE_PRICE`](../namespaces/RPC.RPCSPEC08.API.md#resource_price) ; `l1_da_mode`: [`L1_DA_MODE`](../namespaces/RPC.RPCSPEC08.API.md#l1_da_mode) ; `starknet_version`: `string` }\>

#### Implementation of

[AccountInterface](AccountInterface.md).[getBlock](AccountInterface.md#getblock)

#### Inherited from

[Provider](Provider.md).[getBlock](Provider.md#getblock)

#### Defined in

[src/provider/rpc.ts:156](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L156)

▸ **getBlock**(`blockIdentifier`): `Promise`<\{ `status`: [`EBlockStatus`](../namespaces/RPC.RPCSPEC09.API.md#eblockstatus) ; `block_hash`: `string` ; `parent_hash`: `string` ; `block_number`: `number` ; `new_root`: `string` ; `timestamp`: `number` ; `sequencer_address`: `string` ; `l1_gas_price`: [`RESOURCE_PRICE`](../namespaces/RPC.RPCSPEC09.API.md#resource_price) ; `l2_gas_price`: [`RESOURCE_PRICE`](../namespaces/RPC.RPCSPEC09.API.md#resource_price) ; `l1_data_gas_price`: [`RESOURCE_PRICE`](../namespaces/RPC.RPCSPEC09.API.md#resource_price) ; `l1_da_mode`: [`L1_DA_MODE`](../namespaces/RPC.RPCSPEC09.API.md#l1_da_mode) ; `starknet_version`: `string` ; `transactions`: `string`[] }\>

#### Parameters

| Name              | Type       |
| :---------------- | :--------- |
| `blockIdentifier` | `"latest"` |

#### Returns

`Promise`<\{ `status`: [`EBlockStatus`](../namespaces/RPC.RPCSPEC09.API.md#eblockstatus) ; `block_hash`: `string` ; `parent_hash`: `string` ; `block_number`: `number` ; `new_root`: `string` ; `timestamp`: `number` ; `sequencer_address`: `string` ; `l1_gas_price`: [`RESOURCE_PRICE`](../namespaces/RPC.RPCSPEC09.API.md#resource_price) ; `l2_gas_price`: [`RESOURCE_PRICE`](../namespaces/RPC.RPCSPEC09.API.md#resource_price) ; `l1_data_gas_price`: [`RESOURCE_PRICE`](../namespaces/RPC.RPCSPEC09.API.md#resource_price) ; `l1_da_mode`: [`L1_DA_MODE`](../namespaces/RPC.RPCSPEC09.API.md#l1_da_mode) ; `starknet_version`: `string` ; `transactions`: `string`[] }\>

#### Implementation of

[AccountInterface](AccountInterface.md).[getBlock](AccountInterface.md#getblock)

#### Inherited from

[Provider](Provider.md).[getBlock](Provider.md#getblock)

#### Defined in

[src/provider/rpc.ts:157](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L157)

▸ **getBlock**(`blockIdentifier`): `Promise`<[`GetBlockResponse`](../modules.md#getblockresponse)\>

#### Parameters

| Name              | Type                                               |
| :---------------- | :------------------------------------------------- |
| `blockIdentifier` | [`BlockIdentifier`](../modules.md#blockidentifier) |

#### Returns

`Promise`<[`GetBlockResponse`](../modules.md#getblockresponse)\>

#### Implementation of

[AccountInterface](AccountInterface.md).[getBlock](AccountInterface.md#getblock)

#### Inherited from

[Provider](Provider.md).[getBlock](Provider.md#getblock)

#### Defined in

[src/provider/rpc.ts:158](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L158)

---

### getBlockLatestAccepted

▸ **getBlockLatestAccepted**(): `Promise`<[`BlockHashAndNumber`](../namespaces/RPC.RPCSPEC08.API.md#blockhashandnumber)\>

Get the most recent accepted block hash and number

#### Returns

`Promise`<[`BlockHashAndNumber`](../namespaces/RPC.RPCSPEC08.API.md#blockhashandnumber)\>

Object containing block hash and number

#### Implementation of

[AccountInterface](AccountInterface.md).[getBlockLatestAccepted](AccountInterface.md#getblocklatestaccepted)

#### Inherited from

[Provider](Provider.md).[getBlockLatestAccepted](Provider.md#getblocklatestaccepted)

#### Defined in

[src/provider/rpc.ts:165](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L165)

---

### getBlockNumber

▸ **getBlockNumber**(): `Promise`<`number`\>

Get the most recent accepted block number

#### Returns

`Promise`<`number`\>

Number of the latest block

#### Implementation of

[AccountInterface](AccountInterface.md).[getBlockNumber](AccountInterface.md#getblocknumber)

#### Inherited from

[Provider](Provider.md).[getBlockNumber](Provider.md#getblocknumber)

#### Defined in

[src/provider/rpc.ts:169](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L169)

---

### getBlockWithTxHashes

▸ **getBlockWithTxHashes**(`blockIdentifier?`): `Promise`<`OnlyFirst`<[`BLOCK_WITH_TX_HASHES`](../namespaces/RPC.RPCSPEC08.API.md#block_with_tx_hashes), \{ `status`: [`BLOCK_STATUS`](../namespaces/RPC.RPCSPEC08.API.md#block_status) } & [`BLOCK_HEADER`](../namespaces/RPC.RPCSPEC08.API.md#block_header) & [`BLOCK_BODY_WITH_TX_HASHES`](../namespaces/RPC.RPCSPEC08.API.md#block_body_with_tx_hashes) & [`PENDING_BLOCK_HEADER`](../namespaces/RPC.RPCSPEC08.API.md#pending_block_header)\> \| `OnlyFirst`<[`PENDING_BLOCK_WITH_TX_HASHES`](../namespaces/RPC.RPCSPEC08.API.md#pending_block_with_tx_hashes), \{ `status`: [`BLOCK_STATUS`](../namespaces/RPC.RPCSPEC08.API.md#block_status) } & [`BLOCK_HEADER`](../namespaces/RPC.RPCSPEC08.API.md#block_header) & [`BLOCK_BODY_WITH_TX_HASHES`](../namespaces/RPC.RPCSPEC08.API.md#block_body_with_tx_hashes) & [`PENDING_BLOCK_HEADER`](../namespaces/RPC.RPCSPEC08.API.md#pending_block_header)\> \| `OnlyFirst`<[`BLOCK_WITH_TX_HASHES`](../namespaces/RPC.RPCSPEC09.API.md#block_with_tx_hashes), \{ `status`: [`EBlockStatus`](../namespaces/RPC.RPCSPEC09.API.md#eblockstatus) } & [`BLOCK_HEADER`](../namespaces/RPC.RPCSPEC09.API.md#block_header) & [`BLOCK_BODY_WITH_TX_HASHES`](../namespaces/RPC.RPCSPEC09.API.md#block_body_with_tx_hashes) & [`PRE_CONFIRMED_BLOCK_HEADER`](../namespaces/RPC.RPCSPEC09.API.md#pre_confirmed_block_header)\> \| `OnlyFirst`<[`PRE_CONFIRMED_BLOCK_WITH_TX_HASHES`](../namespaces/RPC.RPCSPEC09.API.md#pre_confirmed_block_with_tx_hashes), \{ `status`: [`EBlockStatus`](../namespaces/RPC.RPCSPEC09.API.md#eblockstatus) } & [`BLOCK_HEADER`](../namespaces/RPC.RPCSPEC09.API.md#block_header) & [`BLOCK_BODY_WITH_TX_HASHES`](../namespaces/RPC.RPCSPEC09.API.md#block_body_with_tx_hashes) & [`PRE_CONFIRMED_BLOCK_HEADER`](../namespaces/RPC.RPCSPEC09.API.md#pre_confirmed_block_header)\>\>

Get block information with transaction hashes

#### Parameters

| Name               | Type                                               | Description      |
| :----------------- | :------------------------------------------------- | :--------------- |
| `blockIdentifier?` | [`BlockIdentifier`](../modules.md#blockidentifier) | block identifier |

#### Returns

`Promise`<`OnlyFirst`<[`BLOCK_WITH_TX_HASHES`](../namespaces/RPC.RPCSPEC08.API.md#block_with_tx_hashes), \{ `status`: [`BLOCK_STATUS`](../namespaces/RPC.RPCSPEC08.API.md#block_status) } & [`BLOCK_HEADER`](../namespaces/RPC.RPCSPEC08.API.md#block_header) & [`BLOCK_BODY_WITH_TX_HASHES`](../namespaces/RPC.RPCSPEC08.API.md#block_body_with_tx_hashes) & [`PENDING_BLOCK_HEADER`](../namespaces/RPC.RPCSPEC08.API.md#pending_block_header)\> \| `OnlyFirst`<[`PENDING_BLOCK_WITH_TX_HASHES`](../namespaces/RPC.RPCSPEC08.API.md#pending_block_with_tx_hashes), \{ `status`: [`BLOCK_STATUS`](../namespaces/RPC.RPCSPEC08.API.md#block_status) } & [`BLOCK_HEADER`](../namespaces/RPC.RPCSPEC08.API.md#block_header) & [`BLOCK_BODY_WITH_TX_HASHES`](../namespaces/RPC.RPCSPEC08.API.md#block_body_with_tx_hashes) & [`PENDING_BLOCK_HEADER`](../namespaces/RPC.RPCSPEC08.API.md#pending_block_header)\> \| `OnlyFirst`<[`BLOCK_WITH_TX_HASHES`](../namespaces/RPC.RPCSPEC09.API.md#block_with_tx_hashes), \{ `status`: [`EBlockStatus`](../namespaces/RPC.RPCSPEC09.API.md#eblockstatus) } & [`BLOCK_HEADER`](../namespaces/RPC.RPCSPEC09.API.md#block_header) & [`BLOCK_BODY_WITH_TX_HASHES`](../namespaces/RPC.RPCSPEC09.API.md#block_body_with_tx_hashes) & [`PRE_CONFIRMED_BLOCK_HEADER`](../namespaces/RPC.RPCSPEC09.API.md#pre_confirmed_block_header)\> \| `OnlyFirst`<[`PRE_CONFIRMED_BLOCK_WITH_TX_HASHES`](../namespaces/RPC.RPCSPEC09.API.md#pre_confirmed_block_with_tx_hashes), \{ `status`: [`EBlockStatus`](../namespaces/RPC.RPCSPEC09.API.md#eblockstatus) } & [`BLOCK_HEADER`](../namespaces/RPC.RPCSPEC09.API.md#block_header) & [`BLOCK_BODY_WITH_TX_HASHES`](../namespaces/RPC.RPCSPEC09.API.md#block_body_with_tx_hashes) & [`PRE_CONFIRMED_BLOCK_HEADER`](../namespaces/RPC.RPCSPEC09.API.md#pre_confirmed_block_header)\>\>

Block with transaction hashes

#### Implementation of

[AccountInterface](AccountInterface.md).[getBlockWithTxHashes](AccountInterface.md#getblockwithtxhashes)

#### Inherited from

[Provider](Provider.md).[getBlockWithTxHashes](Provider.md#getblockwithtxhashes)

#### Defined in

[src/provider/rpc.ts:173](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L173)

---

### getBlockWithTxs

▸ **getBlockWithTxs**(`blockIdentifier?`): `Promise`<`OnlyFirst`<[`BLOCK_WITH_TXS`](../namespaces/RPC.RPCSPEC08.API.md#block_with_txs), \{ `status`: [`BLOCK_STATUS`](../namespaces/RPC.RPCSPEC08.API.md#block_status) } & [`BLOCK_HEADER`](../namespaces/RPC.RPCSPEC08.API.md#block_header) & [`BLOCK_BODY_WITH_TXS`](../namespaces/RPC.RPCSPEC08.API.md#block_body_with_txs) & [`PENDING_BLOCK_HEADER`](../namespaces/RPC.RPCSPEC08.API.md#pending_block_header)\> \| `OnlyFirst`<[`PENDING_BLOCK_WITH_TXS`](../namespaces/RPC.RPCSPEC08.API.md#pending_block_with_txs), \{ `status`: [`BLOCK_STATUS`](../namespaces/RPC.RPCSPEC08.API.md#block_status) } & [`BLOCK_HEADER`](../namespaces/RPC.RPCSPEC08.API.md#block_header) & [`BLOCK_BODY_WITH_TXS`](../namespaces/RPC.RPCSPEC08.API.md#block_body_with_txs) & [`PENDING_BLOCK_HEADER`](../namespaces/RPC.RPCSPEC08.API.md#pending_block_header)\> \| `OnlyFirst`<[`BLOCK_WITH_TXS`](../namespaces/RPC.RPCSPEC09.API.md#block_with_txs), \{ `status`: [`EBlockStatus`](../namespaces/RPC.RPCSPEC09.API.md#eblockstatus) } & [`BLOCK_HEADER`](../namespaces/RPC.RPCSPEC09.API.md#block_header) & [`BLOCK_BODY_WITH_TXS`](../namespaces/RPC.RPCSPEC09.API.md#block_body_with_txs) & [`PRE_CONFIRMED_BLOCK_HEADER`](../namespaces/RPC.RPCSPEC09.API.md#pre_confirmed_block_header)\> \| `OnlyFirst`<[`PRE_CONFIRMED_BLOCK_WITH_TXS`](../namespaces/RPC.RPCSPEC09.API.md#pre_confirmed_block_with_txs), \{ `status`: [`EBlockStatus`](../namespaces/RPC.RPCSPEC09.API.md#eblockstatus) } & [`BLOCK_HEADER`](../namespaces/RPC.RPCSPEC09.API.md#block_header) & [`BLOCK_BODY_WITH_TXS`](../namespaces/RPC.RPCSPEC09.API.md#block_body_with_txs) & [`PRE_CONFIRMED_BLOCK_HEADER`](../namespaces/RPC.RPCSPEC09.API.md#pre_confirmed_block_header)\>\>

Get block information with full transactions

#### Parameters

| Name               | Type                                               | Description      |
| :----------------- | :------------------------------------------------- | :--------------- |
| `blockIdentifier?` | [`BlockIdentifier`](../modules.md#blockidentifier) | block identifier |

#### Returns

`Promise`<`OnlyFirst`<[`BLOCK_WITH_TXS`](../namespaces/RPC.RPCSPEC08.API.md#block_with_txs), \{ `status`: [`BLOCK_STATUS`](../namespaces/RPC.RPCSPEC08.API.md#block_status) } & [`BLOCK_HEADER`](../namespaces/RPC.RPCSPEC08.API.md#block_header) & [`BLOCK_BODY_WITH_TXS`](../namespaces/RPC.RPCSPEC08.API.md#block_body_with_txs) & [`PENDING_BLOCK_HEADER`](../namespaces/RPC.RPCSPEC08.API.md#pending_block_header)\> \| `OnlyFirst`<[`PENDING_BLOCK_WITH_TXS`](../namespaces/RPC.RPCSPEC08.API.md#pending_block_with_txs), \{ `status`: [`BLOCK_STATUS`](../namespaces/RPC.RPCSPEC08.API.md#block_status) } & [`BLOCK_HEADER`](../namespaces/RPC.RPCSPEC08.API.md#block_header) & [`BLOCK_BODY_WITH_TXS`](../namespaces/RPC.RPCSPEC08.API.md#block_body_with_txs) & [`PENDING_BLOCK_HEADER`](../namespaces/RPC.RPCSPEC08.API.md#pending_block_header)\> \| `OnlyFirst`<[`BLOCK_WITH_TXS`](../namespaces/RPC.RPCSPEC09.API.md#block_with_txs), \{ `status`: [`EBlockStatus`](../namespaces/RPC.RPCSPEC09.API.md#eblockstatus) } & [`BLOCK_HEADER`](../namespaces/RPC.RPCSPEC09.API.md#block_header) & [`BLOCK_BODY_WITH_TXS`](../namespaces/RPC.RPCSPEC09.API.md#block_body_with_txs) & [`PRE_CONFIRMED_BLOCK_HEADER`](../namespaces/RPC.RPCSPEC09.API.md#pre_confirmed_block_header)\> \| `OnlyFirst`<[`PRE_CONFIRMED_BLOCK_WITH_TXS`](../namespaces/RPC.RPCSPEC09.API.md#pre_confirmed_block_with_txs), \{ `status`: [`EBlockStatus`](../namespaces/RPC.RPCSPEC09.API.md#eblockstatus) } & [`BLOCK_HEADER`](../namespaces/RPC.RPCSPEC09.API.md#block_header) & [`BLOCK_BODY_WITH_TXS`](../namespaces/RPC.RPCSPEC09.API.md#block_body_with_txs) & [`PRE_CONFIRMED_BLOCK_HEADER`](../namespaces/RPC.RPCSPEC09.API.md#pre_confirmed_block_header)\>\>

Block with full transactions

#### Implementation of

[AccountInterface](AccountInterface.md).[getBlockWithTxs](AccountInterface.md#getblockwithtxs)

#### Inherited from

[Provider](Provider.md).[getBlockWithTxs](Provider.md#getblockwithtxs)

#### Defined in

[src/provider/rpc.ts:177](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L177)

---

### waitForBlock

▸ **waitForBlock**(`blockIdentifier?`, `retryInterval?`): `Promise`<`void`\>

Pause execution until a specified block is created

#### Parameters

| Name              | Type                                               | Default value     | Description                                   |
| :---------------- | :------------------------------------------------- | :---------------- | :-------------------------------------------- |
| `blockIdentifier` | [`BlockIdentifier`](../modules.md#blockidentifier) | `BlockTag.LATEST` | block number or tag                           |
| `retryInterval`   | `number`                                           | `5000`            | milliseconds between requests (default: 5000) |

#### Returns

`Promise`<`void`\>

**`Example`**

```typescript
await provider.waitForBlock(12345);
await provider.waitForBlock('latest');
```

#### Implementation of

[AccountInterface](AccountInterface.md).[waitForBlock](AccountInterface.md#waitforblock)

#### Inherited from

[Provider](Provider.md).[waitForBlock](Provider.md#waitforblock)

#### Defined in

[src/provider/rpc.ts:181](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L181)

---

### getL1GasPrice

▸ **getL1GasPrice**(`blockIdentifier?`): `Promise`<`string`\>

Gets the price of l1 gas in the block

#### Parameters

| Name               | Type                                               | Description      |
| :----------------- | :------------------------------------------------- | :--------------- |
| `blockIdentifier?` | [`BlockIdentifier`](../modules.md#blockidentifier) | block identifier |

#### Returns

`Promise`<`string`\>

gas price of the block

#### Implementation of

[AccountInterface](AccountInterface.md).[getL1GasPrice](AccountInterface.md#getl1gasprice)

#### Inherited from

[Provider](Provider.md).[getL1GasPrice](Provider.md#getl1gasprice)

#### Defined in

[src/provider/rpc.ts:212](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L212)

---

### getGasPrices

▸ **getGasPrices**(`blockIdentifier?`): `Promise`<[`GasPrices`](../modules.md#gasprices)\>

Get the gas prices related to a block.

#### Parameters

| Name               | Type                                               | Description                                                               |
| :----------------- | :------------------------------------------------- | :------------------------------------------------------------------------ |
| `blockIdentifier?` | [`BlockIdentifier`](../modules.md#blockidentifier) | Optional. Can be 'pending', 'latest' or a block number (an integer type). |

#### Returns

`Promise`<[`GasPrices`](../modules.md#gasprices)\>

an object with l1DataGasPrice, l1GasPrice, l2GasPrice properties (all bigint type).

**`Example`**

```ts
const result = await myProvider.getGasPrices();
// result = { l1DataGasPrice: 3039n, l1GasPrice: 55590341542890n, l2GasPrice: 8441845008n }
```

#### Inherited from

[Provider](Provider.md).[getGasPrices](Provider.md#getgasprices)

#### Defined in

[src/provider/rpc.ts:228](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L228)

---

### getL1MessageHash

▸ **getL1MessageHash**(`l2TxHash`): `Promise`<`string`\>

Get L1 message hash from L2 transaction hash

#### Parameters

| Name       | Type                                         | Description         |
| :--------- | :------------------------------------------- | :------------------ |
| `l2TxHash` | [`BigNumberish`](../modules.md#bignumberish) | L2 transaction hash |

#### Returns

`Promise`<`string`\>

Hex string of L1 message hash

**`Example`**

In Sepolia Testnet :

```typescript
const result = provider.getL1MessageHash(
  '0x28dfc05eb4f261b37ddad451ff22f1d08d4e3c24dc646af0ec69fa20e096819'
);
// result = '0x55b3f8b6e607fffd9b4d843dfe8f9b5c05822cd94fcad8797deb01d77805532a'
```

#### Implementation of

[AccountInterface](AccountInterface.md).[getL1MessageHash](AccountInterface.md#getl1messagehash)

#### Inherited from

[Provider](Provider.md).[getL1MessageHash](Provider.md#getl1messagehash)

#### Defined in

[src/provider/rpc.ts:236](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L236)

---

### getBlockWithReceipts

▸ **getBlockWithReceipts**(`blockIdentifier?`): `Promise`<`OnlyFirst`<[`BLOCK_WITH_RECEIPTS`](../namespaces/RPC.RPCSPEC08.API.md#block_with_receipts), \{ `status`: [`BLOCK_STATUS`](../namespaces/RPC.RPCSPEC08.API.md#block_status) } & [`BLOCK_HEADER`](../namespaces/RPC.RPCSPEC08.API.md#block_header) & [`BLOCK_BODY_WITH_RECEIPTS`](../namespaces/RPC.RPCSPEC08.API.md#block_body_with_receipts) & [`PENDING_BLOCK_HEADER`](../namespaces/RPC.RPCSPEC08.API.md#pending_block_header)\> \| `OnlyFirst`<[`PENDING_BLOCK_WITH_RECEIPTS`](../namespaces/RPC.RPCSPEC08.API.md#pending_block_with_receipts), \{ `status`: [`BLOCK_STATUS`](../namespaces/RPC.RPCSPEC08.API.md#block_status) } & [`BLOCK_HEADER`](../namespaces/RPC.RPCSPEC08.API.md#block_header) & [`BLOCK_BODY_WITH_RECEIPTS`](../namespaces/RPC.RPCSPEC08.API.md#block_body_with_receipts) & [`PENDING_BLOCK_HEADER`](../namespaces/RPC.RPCSPEC08.API.md#pending_block_header)\> \| `OnlyFirst`<[`BLOCK_WITH_RECEIPTS`](../namespaces/RPC.RPCSPEC09.API.md#block_with_receipts), \{ `status`: [`EBlockStatus`](../namespaces/RPC.RPCSPEC09.API.md#eblockstatus) } & [`BLOCK_HEADER`](../namespaces/RPC.RPCSPEC09.API.md#block_header) & [`BLOCK_BODY_WITH_RECEIPTS`](../namespaces/RPC.RPCSPEC09.API.md#block_body_with_receipts) & [`PRE_CONFIRMED_BLOCK_HEADER`](../namespaces/RPC.RPCSPEC09.API.md#pre_confirmed_block_header)\> \| `OnlyFirst`<[`PRE_CONFIRMED_BLOCK_WITH_RECEIPTS`](../namespaces/RPC.RPCSPEC09.API.md#pre_confirmed_block_with_receipts), \{ `status`: [`EBlockStatus`](../namespaces/RPC.RPCSPEC09.API.md#eblockstatus) } & [`BLOCK_HEADER`](../namespaces/RPC.RPCSPEC09.API.md#block_header) & [`BLOCK_BODY_WITH_RECEIPTS`](../namespaces/RPC.RPCSPEC09.API.md#block_body_with_receipts) & [`PRE_CONFIRMED_BLOCK_HEADER`](../namespaces/RPC.RPCSPEC09.API.md#pre_confirmed_block_header)\>\>

Get block information with transaction receipts

#### Parameters

| Name               | Type                                               | Description      |
| :----------------- | :------------------------------------------------- | :--------------- |
| `blockIdentifier?` | [`BlockIdentifier`](../modules.md#blockidentifier) | block identifier |

#### Returns

`Promise`<`OnlyFirst`<[`BLOCK_WITH_RECEIPTS`](../namespaces/RPC.RPCSPEC08.API.md#block_with_receipts), \{ `status`: [`BLOCK_STATUS`](../namespaces/RPC.RPCSPEC08.API.md#block_status) } & [`BLOCK_HEADER`](../namespaces/RPC.RPCSPEC08.API.md#block_header) & [`BLOCK_BODY_WITH_RECEIPTS`](../namespaces/RPC.RPCSPEC08.API.md#block_body_with_receipts) & [`PENDING_BLOCK_HEADER`](../namespaces/RPC.RPCSPEC08.API.md#pending_block_header)\> \| `OnlyFirst`<[`PENDING_BLOCK_WITH_RECEIPTS`](../namespaces/RPC.RPCSPEC08.API.md#pending_block_with_receipts), \{ `status`: [`BLOCK_STATUS`](../namespaces/RPC.RPCSPEC08.API.md#block_status) } & [`BLOCK_HEADER`](../namespaces/RPC.RPCSPEC08.API.md#block_header) & [`BLOCK_BODY_WITH_RECEIPTS`](../namespaces/RPC.RPCSPEC08.API.md#block_body_with_receipts) & [`PENDING_BLOCK_HEADER`](../namespaces/RPC.RPCSPEC08.API.md#pending_block_header)\> \| `OnlyFirst`<[`BLOCK_WITH_RECEIPTS`](../namespaces/RPC.RPCSPEC09.API.md#block_with_receipts), \{ `status`: [`EBlockStatus`](../namespaces/RPC.RPCSPEC09.API.md#eblockstatus) } & [`BLOCK_HEADER`](../namespaces/RPC.RPCSPEC09.API.md#block_header) & [`BLOCK_BODY_WITH_RECEIPTS`](../namespaces/RPC.RPCSPEC09.API.md#block_body_with_receipts) & [`PRE_CONFIRMED_BLOCK_HEADER`](../namespaces/RPC.RPCSPEC09.API.md#pre_confirmed_block_header)\> \| `OnlyFirst`<[`PRE_CONFIRMED_BLOCK_WITH_RECEIPTS`](../namespaces/RPC.RPCSPEC09.API.md#pre_confirmed_block_with_receipts), \{ `status`: [`EBlockStatus`](../namespaces/RPC.RPCSPEC09.API.md#eblockstatus) } & [`BLOCK_HEADER`](../namespaces/RPC.RPCSPEC09.API.md#block_header) & [`BLOCK_BODY_WITH_RECEIPTS`](../namespaces/RPC.RPCSPEC09.API.md#block_body_with_receipts) & [`PRE_CONFIRMED_BLOCK_HEADER`](../namespaces/RPC.RPCSPEC09.API.md#pre_confirmed_block_header)\>\>

Block with transaction receipts

#### Implementation of

[AccountInterface](AccountInterface.md).[getBlockWithReceipts](AccountInterface.md#getblockwithreceipts)

#### Inherited from

[Provider](Provider.md).[getBlockWithReceipts](Provider.md#getblockwithreceipts)

#### Defined in

[src/provider/rpc.ts:252](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L252)

---

### getBlockStateUpdate

▸ **getBlockStateUpdate**(): `Promise`<\{ `block_hash`: `string` ; `new_root`: `string` ; `old_root`: `string` ; `state_diff`: \{ `storage_diffs`: \{ `address`: `string` ; `storage_entries`: \{ `key`: `string` ; `value`: `string` }[] }[] ; `deprecated_declared_classes`: `string`[] ; `declared_classes`: \{ `class_hash`: `string` ; `compiled_class_hash`: `string` }[] ; `deployed_contracts`: \{ `address`: `string` ; `class_hash`: `string` }[] ; `replaced_classes`: \{ `contract_address`: `string` ; `class_hash`: `string` }[] ; `nonces`: \{ `nonce`: `string` ; `contract_address`: `string` }[] } }\>

Gets the state changes in a specific block (result of executing the requested block)
Alternative method name for getStateUpdate with specific overloads

#### Returns

`Promise`<\{ `block_hash`: `string` ; `new_root`: `string` ; `old_root`: `string` ; `state_diff`: \{ `storage_diffs`: \{ `address`: `string` ; `storage_entries`: \{ `key`: `string` ; `value`: `string` }[] }[] ; `deprecated_declared_classes`: `string`[] ; `declared_classes`: \{ `class_hash`: `string` ; `compiled_class_hash`: `string` }[] ; `deployed_contracts`: \{ `address`: `string` ; `class_hash`: `string` }[] ; `replaced_classes`: \{ `contract_address`: `string` ; `class_hash`: `string` }[] ; `nonces`: \{ `nonce`: `string` ; `contract_address`: `string` }[] } }\>

StateUpdateResponse

#### Implementation of

[AccountInterface](AccountInterface.md).[getBlockStateUpdate](AccountInterface.md#getblockstateupdate)

#### Inherited from

[Provider](Provider.md).[getBlockStateUpdate](Provider.md#getblockstateupdate)

#### Defined in

[src/provider/rpc.ts:258](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L258)

▸ **getBlockStateUpdate**(`blockIdentifier`): `Promise`<[`PRE_CONFIRMED_STATE_UPDATE`](../namespaces/RPC.RPCSPEC09.API.md#pre_confirmed_state_update)\>

#### Parameters

| Name              | Type              |
| :---------------- | :---------------- |
| `blockIdentifier` | `"pre_confirmed"` |

#### Returns

`Promise`<[`PRE_CONFIRMED_STATE_UPDATE`](../namespaces/RPC.RPCSPEC09.API.md#pre_confirmed_state_update)\>

#### Implementation of

[AccountInterface](AccountInterface.md).[getBlockStateUpdate](AccountInterface.md#getblockstateupdate)

#### Inherited from

[Provider](Provider.md).[getBlockStateUpdate](Provider.md#getblockstateupdate)

#### Defined in

[src/provider/rpc.ts:259](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L259)

▸ **getBlockStateUpdate**(`blockIdentifier`): `Promise`<\{ `block_hash`: `string` ; `new_root`: `string` ; `old_root`: `string` ; `state_diff`: \{ `storage_diffs`: \{ `address`: `string` ; `storage_entries`: \{ `key`: `string` ; `value`: `string` }[] }[] ; `deprecated_declared_classes`: `string`[] ; `declared_classes`: \{ `class_hash`: `string` ; `compiled_class_hash`: `string` }[] ; `deployed_contracts`: \{ `address`: `string` ; `class_hash`: `string` }[] ; `replaced_classes`: \{ `contract_address`: `string` ; `class_hash`: `string` }[] ; `nonces`: \{ `nonce`: `string` ; `contract_address`: `string` }[] } }\>

#### Parameters

| Name              | Type       |
| :---------------- | :--------- |
| `blockIdentifier` | `"latest"` |

#### Returns

`Promise`<\{ `block_hash`: `string` ; `new_root`: `string` ; `old_root`: `string` ; `state_diff`: \{ `storage_diffs`: \{ `address`: `string` ; `storage_entries`: \{ `key`: `string` ; `value`: `string` }[] }[] ; `deprecated_declared_classes`: `string`[] ; `declared_classes`: \{ `class_hash`: `string` ; `compiled_class_hash`: `string` }[] ; `deployed_contracts`: \{ `address`: `string` ; `class_hash`: `string` }[] ; `replaced_classes`: \{ `contract_address`: `string` ; `class_hash`: `string` }[] ; `nonces`: \{ `nonce`: `string` ; `contract_address`: `string` }[] } }\>

#### Implementation of

[AccountInterface](AccountInterface.md).[getBlockStateUpdate](AccountInterface.md#getblockstateupdate)

#### Inherited from

[Provider](Provider.md).[getBlockStateUpdate](Provider.md#getblockstateupdate)

#### Defined in

[src/provider/rpc.ts:262](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L262)

▸ **getBlockStateUpdate**(`blockIdentifier?`): `Promise`<[`StateUpdateResponse`](../modules.md#stateupdateresponse)\>

#### Parameters

| Name               | Type                                               |
| :----------------- | :------------------------------------------------- |
| `blockIdentifier?` | [`BlockIdentifier`](../modules.md#blockidentifier) |

#### Returns

`Promise`<[`StateUpdateResponse`](../modules.md#stateupdateresponse)\>

#### Implementation of

[AccountInterface](AccountInterface.md).[getBlockStateUpdate](AccountInterface.md#getblockstateupdate)

#### Inherited from

[Provider](Provider.md).[getBlockStateUpdate](Provider.md#getblockstateupdate)

#### Defined in

[src/provider/rpc.ts:263](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L263)

---

### getBlockTransactionsTraces

▸ **getBlockTransactionsTraces**(`blockIdentifier?`): `Promise`<[`BlockTransactionsTraces`](../namespaces/RPC.RPCSPEC08.API.md#blocktransactionstraces) \| [`BlockTransactionsTraces`](../namespaces/RPC.RPCSPEC09.API.md#blocktransactionstraces)\>

Get transaction traces for all transactions in a block

#### Parameters

| Name               | Type                                               | Description      |
| :----------------- | :------------------------------------------------- | :--------------- |
| `blockIdentifier?` | [`BlockIdentifier`](../modules.md#blockidentifier) | block identifier |

#### Returns

`Promise`<[`BlockTransactionsTraces`](../namespaces/RPC.RPCSPEC08.API.md#blocktransactionstraces) \| [`BlockTransactionsTraces`](../namespaces/RPC.RPCSPEC09.API.md#blocktransactionstraces)\>

Array of transaction traces

#### Implementation of

[AccountInterface](AccountInterface.md).[getBlockTransactionsTraces](AccountInterface.md#getblocktransactionstraces)

#### Inherited from

[Provider](Provider.md).[getBlockTransactionsTraces](Provider.md#getblocktransactionstraces)

#### Defined in

[src/provider/rpc.ts:268](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L268)

---

### getBlockTransactionCount

▸ **getBlockTransactionCount**(`blockIdentifier?`): `Promise`<`number`\>

Get the number of transactions in a block

#### Parameters

| Name               | Type                                               | Description      |
| :----------------- | :------------------------------------------------- | :--------------- |
| `blockIdentifier?` | [`BlockIdentifier`](../modules.md#blockidentifier) | block identifier |

#### Returns

`Promise`<`number`\>

Transaction count

#### Implementation of

[AccountInterface](AccountInterface.md).[getBlockTransactionCount](AccountInterface.md#getblocktransactioncount)

#### Inherited from

[Provider](Provider.md).[getBlockTransactionCount](Provider.md#getblocktransactioncount)

#### Defined in

[src/provider/rpc.ts:272](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L272)

---

### getTransaction

▸ **getTransaction**(`txHash`): `Promise`<[`TXN_WITH_HASH`](../namespaces/RPC.RPCSPEC08.API.md#txn_with_hash)\>

Gets the transaction information from a tx id.

#### Parameters

| Name     | Type                                         |
| :------- | :------------------------------------------- |
| `txHash` | [`BigNumberish`](../modules.md#bignumberish) |

#### Returns

`Promise`<[`TXN_WITH_HASH`](../namespaces/RPC.RPCSPEC08.API.md#txn_with_hash)\>

the transaction object { transaction_id, status, transaction, block_number?, block_number?, transaction_index?, transaction_failure_reason? }

#### Implementation of

[AccountInterface](AccountInterface.md).[getTransaction](AccountInterface.md#gettransaction)

#### Inherited from

[Provider](Provider.md).[getTransaction](Provider.md#gettransaction)

#### Defined in

[src/provider/rpc.ts:276](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L276)

---

### getTransactionByHash

▸ **getTransactionByHash**(`txHash`): `Promise`<[`TXN_WITH_HASH`](../namespaces/RPC.RPCSPEC08.API.md#txn_with_hash)\>

Gets the transaction information from a tx hash (alias for getTransaction)

#### Parameters

| Name     | Type                                         | Description      |
| :------- | :------------------------------------------- | :--------------- |
| `txHash` | [`BigNumberish`](../modules.md#bignumberish) | transaction hash |

#### Returns

`Promise`<[`TXN_WITH_HASH`](../namespaces/RPC.RPCSPEC08.API.md#txn_with_hash)\>

Transaction information

#### Implementation of

[AccountInterface](AccountInterface.md).[getTransactionByHash](AccountInterface.md#gettransactionbyhash)

#### Inherited from

[Provider](Provider.md).[getTransactionByHash](Provider.md#gettransactionbyhash)

#### Defined in

[src/provider/rpc.ts:280](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L280)

---

### getTransactionByBlockIdAndIndex

▸ **getTransactionByBlockIdAndIndex**(`blockIdentifier`, `index`): `Promise`<[`TXN_WITH_HASH`](../namespaces/RPC.RPCSPEC08.API.md#txn_with_hash)\>

Gets transaction by block identifier and index

#### Parameters

| Name              | Type                                               | Description                    |
| :---------------- | :------------------------------------------------- | :----------------------------- |
| `blockIdentifier` | [`BlockIdentifier`](../modules.md#blockidentifier) | block identifier               |
| `index`           | `number`                                           | transaction index in the block |

#### Returns

`Promise`<[`TXN_WITH_HASH`](../namespaces/RPC.RPCSPEC08.API.md#txn_with_hash)\>

Transaction information

#### Implementation of

[AccountInterface](AccountInterface.md).[getTransactionByBlockIdAndIndex](AccountInterface.md#gettransactionbyblockidandindex)

#### Inherited from

[Provider](Provider.md).[getTransactionByBlockIdAndIndex](Provider.md#gettransactionbyblockidandindex)

#### Defined in

[src/provider/rpc.ts:284](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L284)

---

### getTransactionReceipt

▸ **getTransactionReceipt**(`txHash`): `Promise`<[`GetTransactionReceiptResponse`](../modules.md#gettransactionreceiptresponse)\>

Gets the transaction receipt from a tx hash.

#### Parameters

| Name     | Type                                         |
| :------- | :------------------------------------------- |
| `txHash` | [`BigNumberish`](../modules.md#bignumberish) |

#### Returns

`Promise`<[`GetTransactionReceiptResponse`](../modules.md#gettransactionreceiptresponse)\>

the transaction receipt object

#### Implementation of

[AccountInterface](AccountInterface.md).[getTransactionReceipt](AccountInterface.md#gettransactionreceipt)

#### Inherited from

[Provider](Provider.md).[getTransactionReceipt](Provider.md#gettransactionreceipt)

#### Defined in

[src/provider/rpc.ts:288](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L288)

---

### getTransactionTrace

▸ **getTransactionTrace**(`txHash`): `Promise`<[`TRANSACTION_TRACE`](../namespaces/RPC.RPCSPEC08.API.md#transaction_trace) \| [`TRANSACTION_TRACE`](../namespaces/RPC.RPCSPEC09.API.md#transaction_trace)\>

Gets the transaction trace

#### Parameters

| Name     | Type                                         | Description      |
| :------- | :------------------------------------------- | :--------------- |
| `txHash` | [`BigNumberish`](../modules.md#bignumberish) | transaction hash |

#### Returns

`Promise`<[`TRANSACTION_TRACE`](../namespaces/RPC.RPCSPEC08.API.md#transaction_trace) \| [`TRANSACTION_TRACE`](../namespaces/RPC.RPCSPEC09.API.md#transaction_trace)\>

Transaction trace

#### Implementation of

[AccountInterface](AccountInterface.md).[getTransactionTrace](AccountInterface.md#gettransactiontrace)

#### Inherited from

[Provider](Provider.md).[getTransactionTrace](Provider.md#gettransactiontrace)

#### Defined in

[src/provider/rpc.ts:295](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L295)

---

### getTransactionStatus

▸ **getTransactionStatus**(`transactionHash`): `Promise`<[`TXN_STATUS_RESULT`](../namespaces/RPC.RPCSPEC08.API.md#txn_status_result) \| [`TXN_STATUS_RESULT`](../namespaces/RPC.RPCSPEC09.API.md#txn_status_result)\>

Get the status of a transaction

#### Parameters

| Name              | Type                                         | Description      |
| :---------------- | :------------------------------------------- | :--------------- |
| `transactionHash` | [`BigNumberish`](../modules.md#bignumberish) | transaction hash |

#### Returns

`Promise`<[`TXN_STATUS_RESULT`](../namespaces/RPC.RPCSPEC08.API.md#txn_status_result) \| [`TXN_STATUS_RESULT`](../namespaces/RPC.RPCSPEC09.API.md#txn_status_result)\>

Transaction status

#### Implementation of

[AccountInterface](AccountInterface.md).[getTransactionStatus](AccountInterface.md#gettransactionstatus)

#### Inherited from

[Provider](Provider.md).[getTransactionStatus](Provider.md#gettransactionstatus)

#### Defined in

[src/provider/rpc.ts:301](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L301)

---

### getSimulateTransaction

▸ **getSimulateTransaction**(`invocations`, `options?`): `Promise`<[`SimulateTransactionOverheadResponse`](../modules.md#simulatetransactionoverheadresponse)\>

Simulates the transaction and returns the transaction trace and estimated fee.

#### Parameters

| Name          | Type                                                                           | Description                                                                                                                                                                                       |
| :------------ | :----------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `invocations` | [`AccountInvocations`](../modules.md#accountinvocations)                       | AccountInvocations - Complete invocations array with account details                                                                                                                              |
| `options?`    | [`getSimulateTransactionOptions`](../modules.md#getsimulatetransactionoptions) | getSimulateTransactionOptions - (optional) blockIdentifier - block identifier - (optional) skipValidate - skip cairo **validate** method - (optional) skipExecute - skip cairo **execute** method |

#### Returns

`Promise`<[`SimulateTransactionOverheadResponse`](../modules.md#simulatetransactionoverheadresponse)\>

an array of transaction trace and estimated fee

#### Implementation of

[AccountInterface](AccountInterface.md).[getSimulateTransaction](AccountInterface.md#getsimulatetransaction)

#### Inherited from

[Provider](Provider.md).[getSimulateTransaction](Provider.md#getsimulatetransaction)

#### Defined in

[src/provider/rpc.ts:305](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L305)

---

### waitForTransaction

▸ **waitForTransaction**(`txHash`, `options?`): `Promise`<[`GetTransactionReceiptResponse`](../modules.md#gettransactionreceiptresponse)\>

Wait for the transaction to be accepted

#### Parameters

| Name       | Type                                                                   | Description                                                                                                                              |
| :--------- | :--------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------- |
| `txHash`   | [`BigNumberish`](../modules.md#bignumberish)                           | transaction hash                                                                                                                         |
| `options?` | [`waitForTransactionOptions`](../modules.md#waitfortransactionoptions) | waitForTransactionOptions - (optional) retryInterval: number \| undefined; - (optional) successStates: TransactionStatus[] \| undefined; |

#### Returns

`Promise`<[`GetTransactionReceiptResponse`](../modules.md#gettransactionreceiptresponse)\>

GetTransactionReceiptResponse

#### Implementation of

[AccountInterface](AccountInterface.md).[waitForTransaction](AccountInterface.md#waitfortransaction)

#### Inherited from

[Provider](Provider.md).[waitForTransaction](Provider.md#waitfortransaction)

#### Defined in

[src/provider/rpc.ts:315](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L315)

---

### fastWaitForTransaction

▸ **fastWaitForTransaction**(`txHash`, `address`, `initNonce`, `options?`): `Promise`<`boolean`\>

Wait up until a new transaction is possible with same the account.
This method is fast, but Events and transaction report are not yet
available. Useful for gaming activity.

- only rpc 0.9 and onwards.

#### Parameters

| Name        | Type                                                                           | Description                                                                                               |
| :---------- | :----------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------- |
| `txHash`    | [`BigNumberish`](../modules.md#bignumberish)                                   | transaction hash                                                                                          |
| `address`   | `string`                                                                       | address of the account                                                                                    |
| `initNonce` | [`BigNumberish`](../modules.md#bignumberish)                                   | initial nonce of the account (before the transaction).                                                    |
| `options?`  | [`fastWaitForTransactionOptions`](../modules.md#fastwaitfortransactionoptions) | options to scan the network for the next possible transaction. `retries` is the number of times to retry. |

#### Returns

`Promise`<`boolean`\>

Returns true if the next transaction is possible,
false if the timeout has been reached,
throw an error in case of provider communication.

#### Inherited from

[Provider](Provider.md).[fastWaitForTransaction](Provider.md#fastwaitfortransaction)

#### Defined in

[src/provider/rpc.ts:340](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L340)

---

### getStorageAt

▸ **getStorageAt**(`contractAddress`, `key`, `blockIdentifier?`): `Promise`<`string`\>

Get the value of the storage (contract's variable) at the given address and key

#### Parameters

| Name               | Type                                               | Description                                                |
| :----------------- | :------------------------------------------------- | :--------------------------------------------------------- |
| `contractAddress`  | [`BigNumberish`](../modules.md#bignumberish)       |                                                            |
| `key`              | [`BigNumberish`](../modules.md#bignumberish)       | from getStorageVarAddress('<STORAGE_VARIABLE_NAME>') (WIP) |
| `blockIdentifier?` | [`BlockIdentifier`](../modules.md#blockidentifier) | block identifier                                           |

#### Returns

`Promise`<`string`\>

the value of the storage variable

#### Implementation of

[AccountInterface](AccountInterface.md).[getStorageAt](AccountInterface.md#getstorageat)

#### Inherited from

[Provider](Provider.md).[getStorageAt](Provider.md#getstorageat)

#### Defined in

[src/provider/rpc.ts:358](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L358)

---

### getClassHashAt

▸ **getClassHashAt**(`contractAddress`, `blockIdentifier?`): `Promise`<`string`\>

Returns the contract class hash in the given block for the contract deployed at the given address

#### Parameters

| Name               | Type                                               | Description      |
| :----------------- | :------------------------------------------------- | :--------------- |
| `contractAddress`  | [`BigNumberish`](../modules.md#bignumberish)       | contract address |
| `blockIdentifier?` | [`BlockIdentifier`](../modules.md#blockidentifier) | block identifier |

#### Returns

`Promise`<`string`\>

Class hash

#### Implementation of

[AccountInterface](AccountInterface.md).[getClassHashAt](AccountInterface.md#getclasshashat)

#### Inherited from

[Provider](Provider.md).[getClassHashAt](Provider.md#getclasshashat)

#### Defined in

[src/provider/rpc.ts:366](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L366)

---

### getClassByHash

▸ **getClassByHash**(`classHash`): `Promise`<[`LegacyContractClass`](../modules.md#legacycontractclass) \| `Omit`<[`CompiledSierra`](../modules.md#compiledsierra), `"sierra_program_debug_info"`\>\>

Returns the contract class deployed under the given class hash.

#### Parameters

| Name        | Type                                         | Description |
| :---------- | :------------------------------------------- | :---------- |
| `classHash` | [`BigNumberish`](../modules.md#bignumberish) | class hash  |

#### Returns

`Promise`<[`LegacyContractClass`](../modules.md#legacycontractclass) \| `Omit`<[`CompiledSierra`](../modules.md#compiledsierra), `"sierra_program_debug_info"`\>\>

Contract class of compiled contract

#### Implementation of

[AccountInterface](AccountInterface.md).[getClassByHash](AccountInterface.md#getclassbyhash)

#### Inherited from

[Provider](Provider.md).[getClassByHash](Provider.md#getclassbyhash)

#### Defined in

[src/provider/rpc.ts:370](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L370)

---

### getClass

▸ **getClass**(`classHash`, `blockIdentifier?`): `Promise`<[`LegacyContractClass`](../modules.md#legacycontractclass) \| `Omit`<[`CompiledSierra`](../modules.md#compiledsierra), `"sierra_program_debug_info"`\>\>

Get contract class by hash with optional block identifier

#### Parameters

| Name               | Type                                               | Description      |
| :----------------- | :------------------------------------------------- | :--------------- |
| `classHash`        | [`BigNumberish`](../modules.md#bignumberish)       | class hash       |
| `blockIdentifier?` | [`BlockIdentifier`](../modules.md#blockidentifier) | block identifier |

#### Returns

`Promise`<[`LegacyContractClass`](../modules.md#legacycontractclass) \| `Omit`<[`CompiledSierra`](../modules.md#compiledsierra), `"sierra_program_debug_info"`\>\>

Contract class

#### Implementation of

[AccountInterface](AccountInterface.md).[getClass](AccountInterface.md#getclass)

#### Inherited from

[Provider](Provider.md).[getClass](Provider.md#getclass)

#### Defined in

[src/provider/rpc.ts:374](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L374)

---

### getClassAt

▸ **getClassAt**(`contractAddress`, `blockIdentifier?`): `Promise`<[`LegacyContractClass`](../modules.md#legacycontractclass) \| `Omit`<[`CompiledSierra`](../modules.md#compiledsierra), `"sierra_program_debug_info"`\>\>

Gets the contract class of the deployed contract.

#### Parameters

| Name               | Type                                               | Description      |
| :----------------- | :------------------------------------------------- | :--------------- |
| `contractAddress`  | [`BigNumberish`](../modules.md#bignumberish)       | contract address |
| `blockIdentifier?` | [`BlockIdentifier`](../modules.md#blockidentifier) | block identifier |

#### Returns

`Promise`<[`LegacyContractClass`](../modules.md#legacycontractclass) \| `Omit`<[`CompiledSierra`](../modules.md#compiledsierra), `"sierra_program_debug_info"`\>\>

Contract class of compiled contract

#### Implementation of

[AccountInterface](AccountInterface.md).[getClassAt](AccountInterface.md#getclassat)

#### Inherited from

[Provider](Provider.md).[getClassAt](Provider.md#getclassat)

#### Defined in

[src/provider/rpc.ts:380](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L380)

---

### getContractVersion

▸ **getContractVersion**(`contractAddress`, `classHash?`, `options?`): `Promise`<[`ContractVersion`](../modules.md#contractversion)\>

Gets the contract version from the provided address

#### Parameters

| Name              | Type                                                                   | Description                                                                                                                                                          |
| :---------------- | :--------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `contractAddress` | [`BigNumberish`](../modules.md#bignumberish)                           | string                                                                                                                                                               |
| `classHash?`      | `undefined`                                                            | undefined                                                                                                                                                            |
| `options?`        | [`getContractVersionOptions`](../modules.md#getcontractversionoptions) | getContractVersionOptions - (optional) compiler - (default true) extract compiler version using type tactic from abi - (optional) blockIdentifier - block identifier |

#### Returns

`Promise`<[`ContractVersion`](../modules.md#contractversion)\>

#### Implementation of

[AccountInterface](AccountInterface.md).[getContractVersion](AccountInterface.md#getcontractversion)

#### Inherited from

[Provider](Provider.md).[getContractVersion](Provider.md#getcontractversion)

#### Defined in

[src/provider/rpc.ts:386](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L386)

▸ **getContractVersion**(`contractAddress`, `classHash`, `options?`): `Promise`<[`ContractVersion`](../modules.md#contractversion)\>

Gets the contract version from the provided address

#### Parameters

| Name              | Type                                                                   | Description                                                                                                                                                          |
| :---------------- | :--------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `contractAddress` | `undefined`                                                            | undefined                                                                                                                                                            |
| `classHash`       | [`BigNumberish`](../modules.md#bignumberish)                           |                                                                                                                                                                      |
| `options?`        | [`getContractVersionOptions`](../modules.md#getcontractversionoptions) | getContractVersionOptions - (optional) compiler - (default true) extract compiler version using type tactic from abi - (optional) blockIdentifier - block identifier |

#### Returns

`Promise`<[`ContractVersion`](../modules.md#contractversion)\>

#### Implementation of

[AccountInterface](AccountInterface.md).[getContractVersion](AccountInterface.md#getcontractversion)

#### Inherited from

[Provider](Provider.md).[getContractVersion](Provider.md#getcontractversion)

#### Defined in

[src/provider/rpc.ts:391](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L391)

---

### getInvokeEstimateFee

▸ **getInvokeEstimateFee**(`invocation`, `details`, `blockIdentifier?`, `skipValidate?`): `Promise`<[`EstimateFeeResponseOverhead`](../modules.md#estimatefeeresponseoverhead)\>

Estimates the fee for a given INVOKE transaction

#### Parameters

| Name               | Type                                                                       | Description                                                                                                                                                                                                                                            |
| :----------------- | :------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `invocation`       | [`Invocation`](../modules.md#invocation)                                   | the invocation object containing: - contractAddress - the address of the contract - entrypoint - (optional) the entrypoint of the contract - calldata - (optional, defaults to []) the calldata - signature - (optional, defaults to []) the signature |
| `details`          | [`InvocationsDetailsWithNonce`](../modules.md#invocationsdetailswithnonce) | optional details containing: - nonce - optional nonce - version - optional version                                                                                                                                                                     |
| `blockIdentifier?` | [`BlockIdentifier`](../modules.md#blockidentifier)                         | (optional) block identifier                                                                                                                                                                                                                            |
| `skipValidate?`    | `boolean`                                                                  | (optional) skip cairo **validate** method                                                                                                                                                                                                              |

#### Returns

`Promise`<[`EstimateFeeResponseOverhead`](../modules.md#estimatefeeresponseoverhead)\>

the estimated fee

**`Deprecated`**

Consider using getEstimateFeeBulk for multiple transactions

**`Example`**

```typescript
const feeEstimate = await provider.getInvokeEstimateFee(invocation, details);
// Equivalent to:
const [feeEstimate] = await provider.getEstimateFeeBulk(
  [{ type: ETransactionType.INVOKE, ...invocation, ...details }],
  options
);
```

**`Alias`**

getEstimateFeeBulk - This method is an alias that calls getEstimateFeeBulk with a single transaction

#### Implementation of

[AccountInterface](AccountInterface.md).[getInvokeEstimateFee](AccountInterface.md#getinvokeestimatefee)

#### Inherited from

[Provider](Provider.md).[getInvokeEstimateFee](Provider.md#getinvokeestimatefee)

#### Defined in

[src/provider/rpc.ts:424](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L424)

---

### getDeclareEstimateFee

▸ **getDeclareEstimateFee**(`invocation`, `details`, `blockIdentifier?`, `skipValidate?`): `Promise`<[`EstimateFeeResponseOverhead`](../modules.md#estimatefeeresponseoverhead)\>

Estimates the fee for a given DECLARE transaction

#### Parameters

| Name               | Type                                                                       | Description                                                                                                                           |
| :----------------- | :------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| `invocation`       | [`DeclareContractTransaction`](../modules.md#declarecontracttransaction)   | transaction payload to be declared containing: - compiled contract code - sender address - signature - (defaults to []) the signature |
| `details`          | [`InvocationsDetailsWithNonce`](../modules.md#invocationsdetailswithnonce) | optional details containing: - nonce - version - optional version - optional maxFee                                                   |
| `blockIdentifier?` | [`BlockIdentifier`](../modules.md#blockidentifier)                         | (optional) block identifier                                                                                                           |
| `skipValidate?`    | `boolean`                                                                  | (optional) skip cairo **validate** method                                                                                             |

#### Returns

`Promise`<[`EstimateFeeResponseOverhead`](../modules.md#estimatefeeresponseoverhead)\>

the estimated fee

**`Deprecated`**

Consider using getEstimateFeeBulk for multiple transactions

**`Example`**

```typescript
const feeEstimate = await provider.getDeclareEstimateFee(transaction, details);
// Equivalent to:
const [feeEstimate] = await provider.getEstimateFeeBulk(
  [{ type: ETransactionType.DECLARE, ...transaction, ...details }],
  options
);
```

**`Alias`**

getEstimateFeeBulk - This method is an alias that calls getEstimateFeeBulk with a single transaction

#### Implementation of

[AccountInterface](AccountInterface.md).[getDeclareEstimateFee](AccountInterface.md#getdeclareestimatefee)

#### Inherited from

[Provider](Provider.md).[getDeclareEstimateFee](Provider.md#getdeclareestimatefee)

#### Defined in

[src/provider/rpc.ts:438](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L438)

---

### getDeployAccountEstimateFee

▸ **getDeployAccountEstimateFee**(`invocation`, `details`, `blockIdentifier?`, `skipValidate?`): `Promise`<[`EstimateFeeResponseOverhead`](../modules.md#estimatefeeresponseoverhead)\>

Estimates the fee for a given DEPLOY_ACCOUNT transaction

#### Parameters

| Name               | Type                                                                                 | Description                                                                                                                                 |
| :----------------- | :----------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------ |
| `invocation`       | [`DeployAccountContractTransaction`](../modules.md#deployaccountcontracttransaction) | transaction payload to be deployed containing: - classHash - constructorCalldata - addressSalt - signature - (defaults to []) the signature |
| `details`          | [`InvocationsDetailsWithNonce`](../modules.md#invocationsdetailswithnonce)           | optional details containing: - nonce - version - optional version - optional maxFee                                                         |
| `blockIdentifier?` | [`BlockIdentifier`](../modules.md#blockidentifier)                                   | (optional) block identifier                                                                                                                 |
| `skipValidate?`    | `boolean`                                                                            | (optional) skip cairo **validate** method                                                                                                   |

#### Returns

`Promise`<[`EstimateFeeResponseOverhead`](../modules.md#estimatefeeresponseoverhead)\>

the estimated fee

**`Deprecated`**

Consider using getEstimateFeeBulk for multiple transactions

**`Example`**

```typescript
const feeEstimate = await provider.getDeployAccountEstimateFee(transaction, details);
// Equivalent to:
const [feeEstimate] = await provider.getEstimateFeeBulk(
  [{ type: ETransactionType.DEPLOY_ACCOUNT, ...transaction, ...details }],
  options
);
```

**`Alias`**

getEstimateFeeBulk - This method is an alias that calls getEstimateFeeBulk with a single transaction

#### Implementation of

[AccountInterface](AccountInterface.md).[getDeployAccountEstimateFee](AccountInterface.md#getdeployaccountestimatefee)

#### Inherited from

[Provider](Provider.md).[getDeployAccountEstimateFee](Provider.md#getdeployaccountestimatefee)

#### Defined in

[src/provider/rpc.ts:452](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L452)

---

### getEstimateFeeBulk

▸ **getEstimateFeeBulk**(`invocations`, `options?`): `Promise`<[`EstimateFeeResponseBulkOverhead`](../modules.md#estimatefeeresponsebulkoverhead)\>

Estimates the fee for a list of INVOKE transaction

#### Parameters

| Name          | Type                                                                   | Description                                                              |
| :------------ | :--------------------------------------------------------------------- | :----------------------------------------------------------------------- |
| `invocations` | [`AccountInvocations`](../modules.md#accountinvocations)               | AccountInvocations - Complete invocations array with account details     |
| `options?`    | [`getEstimateFeeBulkOptions`](../modules.md#getestimatefeebulkoptions) | getEstimateFeeBulkOptions - (optional) blockIdentifier - BlockIdentifier |

#### Returns

`Promise`<[`EstimateFeeResponseBulkOverhead`](../modules.md#estimatefeeresponsebulkoverhead)\>

the estimated fee

#### Implementation of

[AccountInterface](AccountInterface.md).[getEstimateFeeBulk](AccountInterface.md#getestimatefeebulk)

#### Inherited from

[Provider](Provider.md).[getEstimateFeeBulk](Provider.md#getestimatefeebulk)

#### Defined in

[src/provider/rpc.ts:466](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L466)

---

### invokeFunction

▸ **invokeFunction**(`functionInvocation`, `details`): `Promise`<\{ `transaction_hash`: `string` }\>

Invokes a function on starknet

#### Parameters

| Name                 | Type                                                                       | Description                                                                                                                                                                                                                                            |
| :------------------- | :------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `functionInvocation` | [`Invocation`](../modules.md#invocation)                                   | the invocation object containing: - contractAddress - the address of the contract - entrypoint - (optional) the entrypoint of the contract - calldata - (optional, defaults to []) the calldata - signature - (optional, defaults to []) the signature |
| `details`            | [`InvocationsDetailsWithNonce`](../modules.md#invocationsdetailswithnonce) | optional details containing: - nonce - optional nonce - version - optional version - maxFee - optional maxFee                                                                                                                                          |

#### Returns

`Promise`<\{ `transaction_hash`: `string` }\>

response from addTransaction

#### Implementation of

[AccountInterface](AccountInterface.md).[invokeFunction](AccountInterface.md#invokefunction)

#### Inherited from

[Provider](Provider.md).[invokeFunction](Provider.md#invokefunction)

#### Defined in

[src/provider/rpc.ts:475](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L475)

---

### declareContract

▸ **declareContract**(`transaction`, `details`): `Promise`<\{ `class_hash`: `string` ; `transaction_hash`: `string` }\>

Declares a given compiled contract (json) to starknet

#### Parameters

| Name          | Type                                                                       | Description                                                                                          |
| :------------ | :------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------- |
| `transaction` | [`DeclareContractTransaction`](../modules.md#declarecontracttransaction)   | transaction payload to be deployed containing: - compiled contract code - sender address - signature |
| `details`     | [`InvocationsDetailsWithNonce`](../modules.md#invocationsdetailswithnonce) | Invocation Details containing: - nonce - optional version - optional maxFee                          |

#### Returns

`Promise`<\{ `class_hash`: `string` ; `transaction_hash`: `string` }\>

a confirmation of sending a transaction on the starknet contract

#### Implementation of

[AccountInterface](AccountInterface.md).[declareContract](AccountInterface.md#declarecontract)

#### Inherited from

[Provider](Provider.md).[declareContract](Provider.md#declarecontract)

#### Defined in

[src/provider/rpc.ts:482](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L482)

---

### deployAccountContract

▸ **deployAccountContract**(`transaction`, `details`): `Promise`<\{ `contract_address`: `string` ; `transaction_hash`: `string` }\>

Deploys a given compiled Account contract (json) to starknet

#### Parameters

| Name          | Type                                                                                 | Description                                                                                       |
| :------------ | :----------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------ |
| `transaction` | [`DeployAccountContractTransaction`](../modules.md#deployaccountcontracttransaction) | payload to be deployed containing: - compiled contract code - constructor calldata - address salt |
| `details`     | [`InvocationsDetailsWithNonce`](../modules.md#invocationsdetailswithnonce)           | -                                                                                                 |

#### Returns

`Promise`<\{ `contract_address`: `string` ; `transaction_hash`: `string` }\>

a confirmation of sending a transaction on the starknet contract

#### Implementation of

[AccountInterface](AccountInterface.md).[deployAccountContract](AccountInterface.md#deployaccountcontract)

#### Inherited from

[Provider](Provider.md).[deployAccountContract](Provider.md#deployaccountcontract)

#### Defined in

[src/provider/rpc.ts:489](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L489)

---

### callContract

▸ **callContract**(`call`, `blockIdentifier?`): `Promise`<`string`[]\>

Calls a function on the Starknet contract.

#### Parameters

| Name               | Type                                               | Description              |
| :----------------- | :------------------------------------------------- | :----------------------- |
| `call`             | [`Call`](../modules.md#call)                       | transaction to be called |
| `blockIdentifier?` | [`BlockIdentifier`](../modules.md#blockidentifier) | block identifier         |

#### Returns

`Promise`<`string`[]\>

the result of the function on the smart contract.

#### Implementation of

[AccountInterface](AccountInterface.md).[callContract](AccountInterface.md#callcontract)

#### Inherited from

[Provider](Provider.md).[callContract](Provider.md#callcontract)

#### Defined in

[src/provider/rpc.ts:496](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L496)

---

### estimateMessageFee

▸ **estimateMessageFee**(`message`, `blockIdentifier?`): `Promise`<[`FEE_ESTIMATE`](../namespaces/RPC.RPCSPEC08.API.md#fee_estimate) \| [`MESSAGE_FEE_ESTIMATE`](../namespaces/RPC.RPCSPEC09.API.md#message_fee_estimate)\>

Estimate the fee for a message from L1

#### Parameters

| Name               | Type                                                            | Description      |
| :----------------- | :-------------------------------------------------------------- | :--------------- |
| `message`          | [`MSG_FROM_L1`](../namespaces/RPC.RPCSPEC09.API.md#msg_from_l1) | L1 message       |
| `blockIdentifier?` | [`BlockIdentifier`](../modules.md#blockidentifier)              | block identifier |

#### Returns

`Promise`<[`FEE_ESTIMATE`](../namespaces/RPC.RPCSPEC08.API.md#fee_estimate) \| [`MESSAGE_FEE_ESTIMATE`](../namespaces/RPC.RPCSPEC09.API.md#message_fee_estimate)\>

Fee estimate

#### Implementation of

[AccountInterface](AccountInterface.md).[estimateMessageFee](AccountInterface.md#estimatemessagefee)

#### Inherited from

[Provider](Provider.md).[estimateMessageFee](Provider.md#estimatemessagefee)

#### Defined in

[src/provider/rpc.ts:500](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L500)

---

### getSyncingStats

▸ **getSyncingStats**(): `Promise`<[`Syncing`](../namespaces/RPC.RPCSPEC08.API.md#syncing)\>

Get node synchronization status

#### Returns

`Promise`<[`Syncing`](../namespaces/RPC.RPCSPEC08.API.md#syncing)\>

Sync status or false if not syncing

#### Implementation of

[AccountInterface](AccountInterface.md).[getSyncingStats](AccountInterface.md#getsyncingstats)

#### Inherited from

[Provider](Provider.md).[getSyncingStats](Provider.md#getsyncingstats)

#### Defined in

[src/provider/rpc.ts:507](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L507)

---

### getEvents

▸ **getEvents**(`eventFilter`): `Promise`<[`EVENTS_CHUNK`](../namespaces/RPC.RPCSPEC08.API.md#events_chunk) \| [`EVENTS_CHUNK`](../namespaces/RPC.RPCSPEC09.API.md#events_chunk)\>

Get events matching the given filter

#### Parameters

| Name          | Type                                                                                                                               | Description  |
| :------------ | :--------------------------------------------------------------------------------------------------------------------------------- | :----------- |
| `eventFilter` | [`EventFilter`](../namespaces/RPC.RPCSPEC08.API.md#eventfilter) \| [`EventFilter`](../namespaces/RPC.RPCSPEC09.API.md#eventfilter) | event filter |

#### Returns

`Promise`<[`EVENTS_CHUNK`](../namespaces/RPC.RPCSPEC08.API.md#events_chunk) \| [`EVENTS_CHUNK`](../namespaces/RPC.RPCSPEC09.API.md#events_chunk)\>

Events and pagination info

#### Implementation of

[AccountInterface](AccountInterface.md).[getEvents](AccountInterface.md#getevents)

#### Inherited from

[Provider](Provider.md).[getEvents](Provider.md#getevents)

#### Defined in

[src/provider/rpc.ts:511](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L511)

---

### verifyMessageInStarknet

▸ **verifyMessageInStarknet**(`message`, `signature`, `accountAddress`, `signatureVerificationFunctionName?`, `signatureVerificationResponse?`): `Promise`<`boolean`\>

Verify in Starknet a signature of a TypedData object or of a given hash.

#### Parameters

| Name                                        | Type                                                                                                               | Description                                                               |
| :------------------------------------------ | :----------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------ |
| `message`                                   | [`TypedData`](../interfaces/RPC.RPCSPEC09.WALLET_API.TypedData.md) \| [`BigNumberish`](../modules.md#bignumberish) | TypedData object to be verified, or message hash to be verified.          |
| `signature`                                 | [`Signature`](../modules.md#signature)                                                                             | signature of the message.                                                 |
| `accountAddress`                            | [`BigNumberish`](../modules.md#bignumberish)                                                                       | address of the account that has signed the message.                       |
| `signatureVerificationFunctionName?`        | `string`                                                                                                           | if account contract with non standard account verification function name. |
| `signatureVerificationResponse?`            | `Object`                                                                                                           | if account contract with non standard response of verification function.  |
| `signatureVerificationResponse.okResponse`  | `string`[]                                                                                                         | -                                                                         |
| `signatureVerificationResponse.nokResponse` | `string`[]                                                                                                         | -                                                                         |
| `signatureVerificationResponse.error`       | `string`[]                                                                                                         | -                                                                         |

#### Returns

`Promise`<`boolean`\>

```typescript
const myTypedMessage: TypedMessage = .... ;
const messageHash = typedData.getMessageHash(myTypedMessage,accountAddress);
const sign: WeierstrassSignatureType = ec.starkCurve.sign(messageHash, privateKey);
const accountAddress = "0x43b7240d227aa2fb8434350b3321c40ac1b88c7067982549e7609870621b535";
const result1 = await myRpcProvider.verifyMessageInStarknet(myTypedMessage, sign, accountAddress);
const result2 = await myRpcProvider.verifyMessageInStarknet(messageHash, sign, accountAddress);
// result1 = result2 = true
```

#### Implementation of

[AccountInterface](AccountInterface.md).[verifyMessageInStarknet](AccountInterface.md#verifymessageinstarknet)

#### Inherited from

[Provider](Provider.md).[verifyMessageInStarknet](Provider.md#verifymessageinstarknet)

#### Defined in

[src/provider/rpc.ts:523](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L523)

---

### isClassDeclared

▸ **isClassDeclared**(`contractClassIdentifier`, `blockIdentifier?`): `Promise`<`boolean`\>

Test if class is already declared

#### Parameters

| Name                      | Type                                                               | Description               |
| :------------------------ | :----------------------------------------------------------------- | :------------------------ |
| `contractClassIdentifier` | [`ContractClassIdentifier`](../modules.md#contractclassidentifier) | contract class identifier |
| `blockIdentifier?`        | [`BlockIdentifier`](../modules.md#blockidentifier)                 | block identifier          |

#### Returns

`Promise`<`boolean`\>

true if class is declared

#### Implementation of

[AccountInterface](AccountInterface.md).[isClassDeclared](AccountInterface.md#isclassdeclared)

#### Inherited from

[Provider](Provider.md).[isClassDeclared](Provider.md#isclassdeclared)

#### Defined in

[src/provider/rpc.ts:540](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L540)

---

### prepareInvocations

▸ **prepareInvocations**(`invocations`): `Promise`<[`Invocations`](../modules.md#invocations)\>

Build bulk invocations with auto-detect declared class

#### Parameters

| Name          | Type                                       | Description          |
| :------------ | :----------------------------------------- | :------------------- |
| `invocations` | [`Invocations`](../modules.md#invocations) | array of invocations |

#### Returns

`Promise`<[`Invocations`](../modules.md#invocations)\>

Prepared invocations

#### Implementation of

[AccountInterface](AccountInterface.md).[prepareInvocations](AccountInterface.md#prepareinvocations)

#### Inherited from

[Provider](Provider.md).[prepareInvocations](Provider.md#prepareinvocations)

#### Defined in

[src/provider/rpc.ts:568](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L568)

---

### getL1MessagesStatus

▸ **getL1MessagesStatus**(`transactionHash`): `Promise`<[`L1L2MessagesStatus`](../namespaces/RPC.RPCSPEC08.API.md#l1l2messagesstatus) \| [`L1L2MessagesStatus`](../namespaces/RPC.RPCSPEC09.API.md#l1l2messagesstatus)\>

Get L1 messages status for a transaction

#### Parameters

| Name              | Type                                         | Description         |
| :---------------- | :------------------------------------------- | :------------------ |
| `transactionHash` | [`BigNumberish`](../modules.md#bignumberish) | L1 transaction hash |

#### Returns

`Promise`<[`L1L2MessagesStatus`](../namespaces/RPC.RPCSPEC08.API.md#l1l2messagesstatus) \| [`L1L2MessagesStatus`](../namespaces/RPC.RPCSPEC09.API.md#l1l2messagesstatus)\>

L1 message status

#### Implementation of

[AccountInterface](AccountInterface.md).[getL1MessagesStatus](AccountInterface.md#getl1messagesstatus)

#### Inherited from

[Provider](Provider.md).[getL1MessagesStatus](Provider.md#getl1messagesstatus)

#### Defined in

[src/provider/rpc.ts:589](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L589)

---

### getStorageProof

▸ **getStorageProof**(`classHashes`, `contractAddresses`, `contractsStorageKeys`, `blockIdentifier?`): `Promise`<[`StorageProof`](../namespaces/RPC.RPCSPEC09.API.md#storageproof)\>

Get Merkle paths in state tries

#### Parameters

| Name                   | Type                                                                                  | Description        |
| :--------------------- | :------------------------------------------------------------------------------------ | :----------------- |
| `classHashes`          | [`BigNumberish`](../modules.md#bignumberish)[]                                        | class hashes       |
| `contractAddresses`    | [`BigNumberish`](../modules.md#bignumberish)[]                                        | contract addresses |
| `contractsStorageKeys` | [`CONTRACT_STORAGE_KEYS`](../namespaces/RPC.RPCSPEC09.API.md#contract_storage_keys)[] | storage keys       |
| `blockIdentifier?`     | [`BlockIdentifier`](../modules.md#blockidentifier)                                    | block identifier   |

#### Returns

`Promise`<[`StorageProof`](../namespaces/RPC.RPCSPEC09.API.md#storageproof)\>

Storage proof

#### Implementation of

[AccountInterface](AccountInterface.md).[getStorageProof](AccountInterface.md#getstorageproof)

#### Inherited from

[Provider](Provider.md).[getStorageProof](Provider.md#getstorageproof)

#### Defined in

[src/provider/rpc.ts:595](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L595)

---

### getCompiledCasm

▸ **getCompiledCasm**(`classHash`): `Promise`<[`CASM_COMPILED_CONTRACT_CLASS`](../namespaces/RPC.RPCSPEC09.API.md#casm_compiled_contract_class)\>

Get compiled CASM contract class

#### Parameters

| Name        | Type                                         | Description |
| :---------- | :------------------------------------------- | :---------- |
| `classHash` | [`BigNumberish`](../modules.md#bignumberish) | class hash  |

#### Returns

`Promise`<[`CASM_COMPILED_CONTRACT_CLASS`](../namespaces/RPC.RPCSPEC09.API.md#casm_compiled_contract_class)\>

Compiled CASM contract class

#### Implementation of

[AccountInterface](AccountInterface.md).[getCompiledCasm](AccountInterface.md#getcompiledcasm)

#### Inherited from

[Provider](Provider.md).[getCompiledCasm](Provider.md#getcompiledcasm)

#### Defined in

[src/provider/rpc.ts:609](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L609)

---

### getEstimateTip

▸ **getEstimateTip**(`blockIdentifier?`, `options?`): `Promise`<[`TipEstimate`](../modules.md#tipestimate)\>

Get transaction tip estimation based on network analysis

#### Parameters

| Name               | Type                                                     | Description                      |
| :----------------- | :------------------------------------------------------- | :------------------------------- |
| `blockIdentifier?` | [`BlockIdentifier`](../modules.md#blockidentifier)       | block identifier to analyze from |
| `options`          | [`TipAnalysisOptions`](../modules.md#tipanalysisoptions) | tip analysis options             |

#### Returns

`Promise`<[`TipEstimate`](../modules.md#tipestimate)\>

Tip estimation with statistics

**`Example`**

```typescript
const tipEstimate = await provider.getEstimateTip('latest', {
  maxBlocks: 10,
  minTxsNecessary: 5,
});
console.log('Recommended tip:', tipEstimate.recommendedTip);
```

#### Implementation of

[AccountInterface](AccountInterface.md).[getEstimateTip](AccountInterface.md#getestimatetip)

#### Inherited from

[Provider](Provider.md).[getEstimateTip](Provider.md#getestimatetip)

#### Defined in

[src/provider/rpc.ts:613](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/rpc.ts#L613)

---

### getAddressFromStarkName

▸ **getAddressFromStarkName**(`name`, `StarknetIdContract?`): `Promise`<`string`\>

#### Parameters

| Name                  | Type     |
| :-------------------- | :------- |
| `name`                | `string` |
| `StarknetIdContract?` | `string` |

#### Returns

`Promise`<`string`\>

#### Inherited from

[Provider](Provider.md).[getAddressFromStarkName](Provider.md#getaddressfromstarkname-1)

#### Defined in

[src/provider/extensions/starknetId.ts:31](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/extensions/starknetId.ts#L31)

---

### getStarkProfile

▸ **getStarkProfile**(`address`, `StarknetIdContract?`, `StarknetIdIdentityContract?`, `StarknetIdVerifierContract?`, `StarknetIdPfpContract?`, `StarknetIdPopContract?`, `StarknetIdMulticallContract?`): `Promise`<[`StarkProfile`](../modules.md#starkprofile)\>

#### Parameters

| Name                           | Type                                         |
| :----------------------------- | :------------------------------------------- |
| `address`                      | [`BigNumberish`](../modules.md#bignumberish) |
| `StarknetIdContract?`          | `string`                                     |
| `StarknetIdIdentityContract?`  | `string`                                     |
| `StarknetIdVerifierContract?`  | `string`                                     |
| `StarknetIdPfpContract?`       | `string`                                     |
| `StarknetIdPopContract?`       | `string`                                     |
| `StarknetIdMulticallContract?` | `string`                                     |

#### Returns

`Promise`<[`StarkProfile`](../modules.md#starkprofile)\>

#### Inherited from

[Provider](Provider.md).[getStarkProfile](Provider.md#getstarkprofile-1)

#### Defined in

[src/provider/extensions/starknetId.ts:40](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/extensions/starknetId.ts#L40)

---

### getBrotherName

▸ **getBrotherName**(`address`, `BrotherIdContract?`): `Promise`<`string`\>

Gets the primary Brother domain name for an address

#### Parameters

| Name                 | Type                                         | Description                       |
| :------------------- | :------------------------------------------- | :-------------------------------- |
| `address`            | [`BigNumberish`](../modules.md#bignumberish) | The address to get the domain for |
| `BrotherIdContract?` | `string`                                     | Optional contract address         |

#### Returns

`Promise`<`string`\>

The domain name with .brother suffix

#### Inherited from

[Provider](Provider.md).[getBrotherName](Provider.md#getbrothername-1)

#### Defined in

[src/provider/extensions/brotherId.ts:99](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/extensions/brotherId.ts#L99)

---

### getAddressFromBrotherName

▸ **getAddressFromBrotherName**(`name`, `BrotherIdContract?`): `Promise`<`string`\>

Gets the address associated with a Brother domain name

#### Parameters

| Name                 | Type     | Description                                       |
| :------------------- | :------- | :------------------------------------------------ |
| `name`               | `string` | The domain name (with or without .brother suffix) |
| `BrotherIdContract?` | `string` | Optional contract address                         |

#### Returns

`Promise`<`string`\>

The resolver address for the domain

#### Inherited from

[Provider](Provider.md).[getAddressFromBrotherName](Provider.md#getaddressfrombrothername-1)

#### Defined in

[src/provider/extensions/brotherId.ts:114](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/extensions/brotherId.ts#L114)

---

### getBrotherProfile

▸ **getBrotherProfile**(`address`, `BrotherIdContract?`): `Promise`<`BrotherProfile`\>

Gets the complete profile information for a Brother domain

#### Parameters

| Name                 | Type                                         | Description                        |
| :------------------- | :------------------------------------------- | :--------------------------------- |
| `address`            | [`BigNumberish`](../modules.md#bignumberish) | The address to get the profile for |
| `BrotherIdContract?` | `string`                                     | Optional contract address          |

#### Returns

`Promise`<`BrotherProfile`\>

The complete Brother profile information

#### Inherited from

[Provider](Provider.md).[getBrotherProfile](Provider.md#getbrotherprofile-1)

#### Defined in

[src/provider/extensions/brotherId.ts:132](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/provider/extensions/brotherId.ts#L132)
