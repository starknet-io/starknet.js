# Class: WalletAccount

Defined in: [src/wallet/account.ts:41](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/wallet/account.ts#L41)

Interface for interacting with Starknet account contracts

Provides account-specific functionality including:

- Transaction execution and signing
- Fee estimation for various transaction types
- Contract deployment through UDC (Universal Deployer Contract)
- Paymaster support for sponsored transactions
- EIP-712 message signing

## Remarks

Implementations of this interface typically handle the complexities of:

- Nonce management
- Transaction signing with the account's private key
- Interaction with the account contract's **execute** entrypoint

## Extends

- [`Account`](Account.md)

## Constructors

### Constructor

> **new WalletAccount**(`options`): `WalletAccount`

Defined in: [src/wallet/account.ts:44](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/wallet/account.ts#L44)

#### Parameters

##### options

`WalletAccountV4Options`

#### Returns

`WalletAccount`

#### Overrides

[`Account`](Account.md).[`constructor`](Account.md#constructor)

## Properties

### walletProvider

> **walletProvider**: `StarknetWalletProvider`

Defined in: [src/wallet/account.ts:42](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/wallet/account.ts#L42)

---

### provider

> **provider**: [`RpcProvider`](RpcProvider.md)

Defined in: [src/account/default.ts:106](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/account/default.ts#L106)

Provider instance for blockchain interaction

#### Inherited from

[`Account`](Account.md).[`provider`](Account.md#provider)

---

### signer

> **signer**: [`SignerInterface`](SignerInterface.md)

Defined in: [src/account/default.ts:108](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/account/default.ts#L108)

Signer instance for signing transactions and messages

#### Inherited from

[`Account`](Account.md).[`signer`](Account.md#signer)

---

### address

> **address**: `string`

Defined in: [src/account/default.ts:110](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/account/default.ts#L110)

The address of the account contract on Starknet

#### Inherited from

[`Account`](Account.md).[`address`](Account.md#address)

---

### cairoVersion

> **cairoVersion**: [`CairoVersion`](../type-aliases/CairoVersion.md)

Defined in: [src/account/default.ts:112](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/account/default.ts#L112)

Cairo version of the account contract implementation

#### Inherited from

[`Account`](Account.md).[`cairoVersion`](Account.md#cairoversion)

---

### transactionVersion

> `readonly` **transactionVersion**: `"0x3"`

Defined in: [src/account/default.ts:114](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/account/default.ts#L114)

#### Inherited from

[`Account`](Account.md).[`transactionVersion`](Account.md#transactionversion)

---

### paymaster

> **paymaster**: [`PaymasterInterface`](PaymasterInterface.md)

Defined in: [src/account/default.ts:116](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/account/default.ts#L116)

#### Inherited from

[`Account`](Account.md).[`paymaster`](Account.md#paymaster)

---

### deployer

> **deployer**: [`Deployer`](Deployer.md)

Defined in: [src/account/default.ts:118](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/account/default.ts#L118)

Optional deployer instance for custom contract deployment logic

#### Default

```ts
Uses default UDC (Universal Deployer Contract) if not specified
```

#### Inherited from

[`Account`](Account.md).[`deployer`](Account.md#deployer)

---

### defaultTipType

> **defaultTipType**: [`TipType`](../type-aliases/TipType.md)

Defined in: [src/account/default.ts:120](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/account/default.ts#L120)

#### Inherited from

[`Account`](Account.md).[`defaultTipType`](Account.md#defaulttiptype)

---

### accountPluginManager

> `readonly` **accountPluginManager**: [`PluginManager`](PluginManager.md)

Defined in: [src/account/default.ts:123](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/account/default.ts#L123)

**`Internal`**

Account-level plugin management

#### Inherited from

[`Account`](Account.md).[`accountPluginManager`](Account.md#accountpluginmanager)

---

### deploySelf

> **deploySelf**: (`contractPayload`, `details`) => `Promise`\<[`DeployContractResponse`](../interfaces/DeployContractResponse.md)\>

Defined in: [src/account/default.ts:559](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/account/default.ts#L559)

ACCOUNT METHODS

#### Parameters

##### contractPayload

[`DeployAccountContractPayload`](../type-aliases/DeployAccountContractPayload.md)

##### details?

[`UniversalDetails`](../interfaces/UniversalDetails.md) = `{}`

#### Returns

`Promise`\<[`DeployContractResponse`](../interfaces/DeployContractResponse.md)\>

#### Example

```typescript
const deployment = await account.deployAccount({
  classHash: accountClassHash,
  constructorCalldata: { publicKey: pubKey },
  addressSalt: pubKey,
});
```

#### Inherited from

[`Account`](Account.md).[`deploySelf`](Account.md#deployself)

## Methods

### connect()

> `static` **connect**(`provider`, `walletProvider`, `cairoVersion?`, `paymaster?`, `silentMode?`): `Promise`\<`WalletAccount`\>

Defined in: [src/wallet/account.ts:159](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/wallet/account.ts#L159)

#### Parameters

##### provider

[`ProviderInterface`](ProviderInterface.md) \| [`ProviderOptions`](../interfaces/ProviderOptions.md)

##### walletProvider

`StarknetWalletProvider`

##### cairoVersion?

[`CairoVersion`](../type-aliases/CairoVersion.md)

##### paymaster?

[`PaymasterOptions`](../interfaces/PaymasterOptions.md) \| [`PaymasterInterface`](PaymasterInterface.md)

##### silentMode?

`boolean` = `false`

#### Returns

`Promise`\<`WalletAccount`\>

---

### connectSilent()

> `static` **connectSilent**(`provider`, `walletProvider`, `cairoVersion?`, `paymaster?`): `Promise`\<`WalletAccount`\>

Defined in: [src/wallet/account.ts:176](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/wallet/account.ts#L176)

#### Parameters

##### provider

[`ProviderInterface`](ProviderInterface.md) \| [`ProviderOptions`](../interfaces/ProviderOptions.md)

##### walletProvider

`StarknetWalletProvider`

##### cairoVersion?

[`CairoVersion`](../type-aliases/CairoVersion.md)

##### paymaster?

[`PaymasterOptions`](../interfaces/PaymasterOptions.md) \| [`PaymasterInterface`](PaymasterInterface.md)

#### Returns

`Promise`\<`WalletAccount`\>

---

### onAccountChange()

> **onAccountChange**(`callback`): `void`

Defined in: [src/wallet/account.ts:66](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/wallet/account.ts#L66)

WALLET EVENTS

#### Parameters

##### callback

[`AccountChangeEventHandler`](../Starknet.js-API/namespaces/RPC/type-aliases/AccountChangeEventHandler.md)

#### Returns

`void`

---

### onNetworkChanged()

> **onNetworkChanged**(`callback`): `void`

Defined in: [src/wallet/account.ts:70](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/wallet/account.ts#L70)

#### Parameters

##### callback

[`NetworkChangeEventHandler`](../Starknet.js-API/namespaces/RPC/type-aliases/NetworkChangeEventHandler.md)

#### Returns

`void`

---

### requestAccounts()

> **requestAccounts**(`silentMode?`): `Promise`\<`string`[]\>

Defined in: [src/wallet/account.ts:77](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/wallet/account.ts#L77)

WALLET SPECIFIC METHODS

#### Parameters

##### silentMode?

`boolean` = `false`

#### Returns

`Promise`\<`string`[]\>

---

### getPermissions()

> **getPermissions**(): `Promise`\<`"accounts"`[]\>

Defined in: [src/wallet/account.ts:81](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/wallet/account.ts#L81)

#### Returns

`Promise`\<`"accounts"`[]\>

---

### switchStarknetChain()

> **switchStarknetChain**(`chainId`): `Promise`\<`boolean`\>

Defined in: [src/wallet/account.ts:85](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/wallet/account.ts#L85)

#### Parameters

##### chainId

`"0x534e5f4d41494e"` \| `"0x534e5f5345504f4c4941"`

#### Returns

`Promise`\<`boolean`\>

---

### watchAsset()

> **watchAsset**(`asset`): `Promise`\<`boolean`\>

Defined in: [src/wallet/account.ts:89](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/wallet/account.ts#L89)

#### Parameters

##### asset

[`WatchAssetParameters`](../Starknet.js-API/namespaces/RPC/interfaces/WatchAssetParameters.md)

#### Returns

`Promise`\<`boolean`\>

---

### addStarknetChain()

> **addStarknetChain**(`chain`): `Promise`\<`boolean`\>

Defined in: [src/wallet/account.ts:93](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/wallet/account.ts#L93)

#### Parameters

##### chain

[`AddStarknetChainParameters`](../Starknet.js-API/namespaces/RPC/interfaces/AddStarknetChainParameters.md)

#### Returns

`Promise`\<`boolean`\>

---

### execute()

> **execute**(`calls`): `Promise`\<[`AddInvokeTransactionResult`](../Starknet.js-API/namespaces/RPC/interfaces/AddInvokeTransactionResult.md)\>

Defined in: [src/wallet/account.ts:100](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/wallet/account.ts#L100)

ACCOUNT METHODS

#### Parameters

##### calls

[`AllowArray`](../type-aliases/AllowArray.md)\<[`Call`](../type-aliases/Call.md)\>

#### Returns

`Promise`\<[`AddInvokeTransactionResult`](../Starknet.js-API/namespaces/RPC/interfaces/AddInvokeTransactionResult.md)\>

#### Overrides

[`Account`](Account.md).[`execute`](Account.md#execute)

---

### declare()

> **declare**(`payload`): `Promise`\<[`AddDeclareTransactionResult`](../Starknet.js-API/namespaces/RPC/interfaces/AddDeclareTransactionResult.md)\>

Defined in: [src/wallet/account.ts:117](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/wallet/account.ts#L117)

ACCOUNT METHODS

#### Parameters

##### payload

[`DeclareContractPayload`](../type-aliases/DeclareContractPayload.md)

#### Returns

`Promise`\<[`AddDeclareTransactionResult`](../Starknet.js-API/namespaces/RPC/interfaces/AddDeclareTransactionResult.md)\>

#### Example

```typescript
const declareResult = await account.declare({
  contract: compiledSierra,
  casm: compiledCasm,
});
```

#### Overrides

[`Account`](Account.md).[`declare`](Account.md#declare)

---

### deploy()

> **deploy**(`payload`): `Promise`\<[`MultiDeployContractResponse`](../type-aliases/MultiDeployContractResponse.md)\>

Defined in: [src/wallet/account.ts:143](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/wallet/account.ts#L143)

ACCOUNT METHODS

#### Parameters

##### payload

[`UniversalDeployerContractPayload`](../type-aliases/UniversalDeployerContractPayload.md) \| [`UniversalDeployerContractPayload`](../type-aliases/UniversalDeployerContractPayload.md)[]

#### Returns

`Promise`\<[`MultiDeployContractResponse`](../type-aliases/MultiDeployContractResponse.md)\>

#### Example

```typescript
const deployment = await account.deploy([
  { classHash: erc20ClassHash, constructorCalldata: [name, symbol] },
  { classHash: nftClassHash, unique: true },
]);
```

#### Overrides

[`Account`](Account.md).[`deploy`](Account.md#deploy)

---

### signMessage()

> **signMessage**(`typedData`): `Promise`\<[`SIGNATURE`](../Starknet.js-API/namespaces/RPC/type-aliases/SIGNATURE.md)\>

Defined in: [src/wallet/account.ts:155](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/wallet/account.ts#L155)

Sign a typed data message for off-chain verification

#### Parameters

##### typedData

[`TypedData`](../Starknet.js-API/namespaces/RPC/interfaces/TypedData.md)

EIP-712 style typed data structure

#### Returns

`Promise`\<[`SIGNATURE`](../Starknet.js-API/namespaces/RPC/type-aliases/SIGNATURE.md)\>

Signature array [r, s]

#### Remarks

- Includes domain separation to prevent signature reuse
- Compatible with Starknet's signature verification
- Cannot be used to sign transactions

#### Example

```typescript
const signature = await account.signMessage({
  domain: { name: 'MyDapp', chainId: 'SN_MAIN' },
  types: { ... },
  primaryType: 'Message',
  message: { content: 'Hello Starknet!' }
});
```

#### Overrides

[`Account`](Account.md).[`signMessage`](Account.md#signmessage)

---

### getNonce()

> **getNonce**(`blockIdentifier?`): `Promise`\<`string`\>

Defined in: [src/account/default.ts:161](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/account/default.ts#L161)

Get the current nonce of the account

#### Parameters

##### blockIdentifier?

[`BlockIdentifier`](../type-aliases/BlockIdentifier.md)

Block to query nonce at (default: 'latest' tag)

#### Returns

`Promise`\<`string`\>

Account nonce as hex string

#### Example

```typescript
const nonce = await account.getNonce();
const historicalNonce = await account.getNonce('latest');
```

#### Inherited from

[`Account`](Account.md).[`getNonce`](Account.md#getnonce)

---

### getNonceSafe()

> `protected` **getNonceSafe**(`nonce?`): `Promise`\<`bigint`\>

Defined in: [src/account/default.ts:165](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/account/default.ts#L165)

#### Parameters

##### nonce?

[`BigNumberish`](../type-aliases/BigNumberish.md)

#### Returns

`Promise`\<`bigint`\>

#### Inherited from

[`Account`](Account.md).[`getNonceSafe`](Account.md#getnoncesafe)

---

### getCairoVersion()

> **getCairoVersion**(`classHash?`): `Promise`\<[`CairoVersion`](../type-aliases/CairoVersion.md)\>

Defined in: [src/account/default.ts:178](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/account/default.ts#L178)

Retrieves the Cairo version from the network and sets `cairoVersion` if not already set in the constructor.

#### Parameters

##### classHash?

`string`

if provided detects Cairo version from classHash, otherwise from the account address

#### Returns

`Promise`\<[`CairoVersion`](../type-aliases/CairoVersion.md)\>

#### Inherited from

[`Account`](Account.md).[`getCairoVersion`](Account.md#getcairoversion)

---

### estimateInvokeFee()

> **estimateInvokeFee**(`calls`, `details?`): `Promise`\<[`EstimateFeeResponseOverhead`](../type-aliases/EstimateFeeResponseOverhead.md)\>

Defined in: [src/account/default.ts:188](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/account/default.ts#L188)

Estimate fee for executing an INVOKE transaction on Starknet

#### Parameters

##### calls

[`AllowArray`](../type-aliases/AllowArray.md)\<[`Call`](../type-aliases/Call.md)\>

Single call or array of calls to estimate fees for

- .contractAddress - The address of the contract to invoke
- .entrypoint - The function selector of the contract method
- .calldata - The serialized function parameters (defaults to [])

##### details?

[`UniversalDetails`](../interfaces/UniversalDetails.md) = `{}`

#### Returns

`Promise`\<[`EstimateFeeResponseOverhead`](../type-aliases/EstimateFeeResponseOverhead.md)\>

Fee estimation including overall_fee and resourceBounds

#### Example

```typescript
const fee = await account.estimateInvokeFee({
  contractAddress: '0x123...',
  entrypoint: 'transfer',
  calldata: [recipient, amount],
});
```

#### Inherited from

[`Account`](Account.md).[`estimateInvokeFee`](Account.md#estimateinvokefee)

---

### estimateDeclareFee()

> **estimateDeclareFee**(`payload`, `details?`): `Promise`\<[`EstimateFeeResponseOverhead`](../type-aliases/EstimateFeeResponseOverhead.md)\>

Defined in: [src/account/default.ts:198](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/account/default.ts#L198)

Estimate fee for executing a DECLARE transaction on Starknet

#### Parameters

##### payload

[`DeclareContractPayload`](../type-aliases/DeclareContractPayload.md)

##### details?

[`UniversalDetails`](../interfaces/UniversalDetails.md) = `{}`

#### Returns

`Promise`\<[`EstimateFeeResponseOverhead`](../type-aliases/EstimateFeeResponseOverhead.md)\>

Fee estimation including overall_fee and resourceBounds

#### Example

```typescript
const fee = await account.estimateDeclareFee({
  contract: compiledContract,
  casm: compiledCasm,
});
```

#### Inherited from

[`Account`](Account.md).[`estimateDeclareFee`](Account.md#estimatedeclarefee)

---

### estimateAccountDeployFee()

> **estimateAccountDeployFee**(`contractPayload`, `details?`): `Promise`\<[`EstimateFeeResponseOverhead`](../type-aliases/EstimateFeeResponseOverhead.md)\>

Defined in: [src/account/default.ts:217](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/account/default.ts#L217)

Estimate fee for executing an INVOKE transaction on Starknet

#### Parameters

##### contractPayload

[`DeployAccountContractPayload`](../type-aliases/DeployAccountContractPayload.md)

Single call or array of calls to estimate fees for

- .contractAddress - The address of the contract to invoke
- .entrypoint - The function selector of the contract method
- .calldata - The serialized function parameters (defaults to [])

##### details?

[`UniversalDetails`](../interfaces/UniversalDetails.md) = `{}`

#### Returns

`Promise`\<[`EstimateFeeResponseOverhead`](../type-aliases/EstimateFeeResponseOverhead.md)\>

Fee estimation including overall_fee and resourceBounds

#### Example

```typescript
const fee = await account.estimateAccountDeployFee({
  classHash: accountClassHash,
  constructorCalldata: { publicKey },
  addressSalt: publicKey,
});
```

#### Inherited from

[`Account`](Account.md).[`estimateAccountDeployFee`](Account.md#estimateaccountdeployfee)

---

### estimateDeployFee()

> **estimateDeployFee**(`payload`, `details?`): `Promise`\<[`EstimateFeeResponseOverhead`](../type-aliases/EstimateFeeResponseOverhead.md)\>

Defined in: [src/account/default.ts:247](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/account/default.ts#L247)

Estimate fee for executing an INVOKE transaction on Starknet

#### Parameters

##### payload

[`UniversalDeployerContractPayload`](../type-aliases/UniversalDeployerContractPayload.md) \| [`UniversalDeployerContractPayload`](../type-aliases/UniversalDeployerContractPayload.md)[]

Single call or array of calls to estimate fees for

- .contractAddress - The address of the contract to invoke
- .entrypoint - The function selector of the contract method
- .calldata - The serialized function parameters (defaults to [])

##### details?

[`UniversalDetails`](../interfaces/UniversalDetails.md) = `{}`

#### Returns

`Promise`\<[`EstimateFeeResponseOverhead`](../type-aliases/EstimateFeeResponseOverhead.md)\>

Fee estimation including overall_fee and resourceBounds

#### Example

```typescript
const fee = await account.estimateDeployFee({
  classHash: contractClassHash,
  constructorCalldata: [param1, param2],
  unique: true,
});
```

#### Inherited from

[`Account`](Account.md).[`estimateDeployFee`](Account.md#estimatedeployfee)

---

### estimateFeeBulk()

> **estimateFeeBulk**(`invocations`, `details?`): `Promise`\<[`EstimateFeeBulk`](../type-aliases/EstimateFeeBulk.md)\>

Defined in: [src/account/default.ts:255](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/account/default.ts#L255)

Estimate fee for executing an INVOKE transaction on Starknet

#### Parameters

##### invocations

[`Invocations`](../type-aliases/Invocations.md)

Single call or array of calls to estimate fees for

- .contractAddress - The address of the contract to invoke
- .entrypoint - The function selector of the contract method
- .calldata - The serialized function parameters (defaults to [])

##### details?

[`UniversalDetails`](../interfaces/UniversalDetails.md) = `{}`

#### Returns

`Promise`\<[`EstimateFeeBulk`](../type-aliases/EstimateFeeBulk.md)\>

Fee estimation including overall_fee and resourceBounds

#### Example

```typescript
const fees = await account.estimateFeeBulk([
  { type: 'INVOKE', payload: { contractAddress, entrypoint, calldata } },
  { type: 'DECLARE', payload: { contract, casm } },
]);
```

#### Inherited from

[`Account`](Account.md).[`estimateFeeBulk`](Account.md#estimatefeebulk)

---

### simulateTransaction()

> **simulateTransaction**(`invocations`, `details?`): `Promise`\<[`SimulateTransactionOverheadResponse`](../type-aliases/SimulateTransactionOverheadResponse.md)\>

Defined in: [src/account/default.ts:285](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/account/default.ts#L285)

#### Parameters

##### invocations

[`Invocations`](../type-aliases/Invocations.md)

##### details?

[`SimulateTransactionDetails`](../type-aliases/SimulateTransactionDetails.md) = `{}`

#### Returns

`Promise`\<[`SimulateTransactionOverheadResponse`](../type-aliases/SimulateTransactionOverheadResponse.md)\>

#### Inherited from

[`Account`](Account.md).[`simulateTransaction`](Account.md#simulatetransaction)

---

### getSignedTransaction()

> **getSignedTransaction**(`transactions`, `transactionsDetail?`): `Promise`\<[`INVOKE_TXN_V3`](../Starknet.js-API/namespaces/RPC/type-aliases/INVOKE_TXN_V3.md)\>

Defined in: [src/account/default.ts:420](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/account/default.ts#L420)

Build a signed INVOKE_TXN_V3 transaction without submitting it to the network.

Produces a fully signed transaction object that can be inspected, stored,
or submitted later via `provider.channel.sendTransaction()`.
Main usage is to send a virtual transaction to a proof server.
Fees are estimated automatically if not provided.

#### Parameters

##### transactions

[`AllowArray`](../type-aliases/AllowArray.md)\<[`Call`](../type-aliases/Call.md)\>

Single call or array of calls to include in the transaction

##### transactionsDetail?

[`UniversalDetails`](../interfaces/UniversalDetails.md) = `{}`

Transaction execution options

#### Returns

`Promise`\<[`INVOKE_TXN_V3`](../Starknet.js-API/namespaces/RPC/type-aliases/INVOKE_TXN_V3.md)\>

A fully signed `RPC.INVOKE_TXN_V3` object, ready to broadcast

#### Remarks

- Unlike `execute()`, this method does **not** submit the transaction ; the account nonce is unchanged after the call.
- The `afterExecute` plugin hook is intentionally **not** triggered.
- The returned object can be broadcast with `provider.channel.sendTransaction()`.

#### Example

```typescript
const signedTx = await account.getSignedTransaction({
  contractAddress: erc20Address,
  entrypoint: 'transfer',
  calldata: [recipient, amount, 0],
});
```

#### Inherited from

[`Account`](Account.md).[`getSignedTransaction`](Account.md#getsignedtransaction)

---

### declareIfNot()

> **declareIfNot**(`payload`, `transactionsDetail?`): `Promise`\<\{ `class_hash`: `string`; `transaction_hash`: `string`; \}\>

Defined in: [src/account/default.ts:451](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/account/default.ts#L451)

First check if contract is already declared, if not declare it
If contract already declared returned transaction_hash is ''.
Method will pass even if contract is already declared

#### Parameters

##### payload

[`DeclareContractPayload`](../type-aliases/DeclareContractPayload.md)

##### transactionsDetail?

[`UniversalDetails`](../interfaces/UniversalDetails.md) = `{}`

(optional)

#### Returns

`Promise`\<\{ `class_hash`: `string`; `transaction_hash`: `string`; \}\>

#### Inherited from

[`Account`](Account.md).[`declareIfNot`](Account.md#declareifnot)

---

### deployContract()

> **deployContract**(`payload`, `details?`): `Promise`\<[`DeployContractUDCResponse`](../type-aliases/DeployContractUDCResponse.md)\>

Defined in: [src/account/default.ts:532](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/account/default.ts#L532)

ACCOUNT METHODS

#### Parameters

##### payload

[`UniversalDeployerContractPayload`](../type-aliases/UniversalDeployerContractPayload.md) \| [`UniversalDeployerContractPayload`](../type-aliases/UniversalDeployerContractPayload.md)[]

##### details?

[`UniversalDetails`](../interfaces/UniversalDetails.md) & [`waitForTransactionOptions`](../type-aliases/waitForTransactionOptions.md) = `{}`

Transaction execution options

#### Returns

`Promise`\<[`DeployContractUDCResponse`](../type-aliases/DeployContractUDCResponse.md)\>

#### Example

```typescript
const result = await account.deployContract({
  classHash: contractClassHash,
  constructorCalldata: params,
});
console.log('Deployed at:', result.address);
```

#### Inherited from

[`Account`](Account.md).[`deployContract`](Account.md#deploycontract)

---

### declareAndDeploy()

> **declareAndDeploy**(`payload`, `details?`): `Promise`\<[`DeclareDeployUDCResponse`](../type-aliases/DeclareDeployUDCResponse.md)\>

Defined in: [src/account/default.ts:543](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/account/default.ts#L543)

ACCOUNT METHODS

#### Parameters

##### payload

[`DeclareAndDeployContractPayload`](../type-aliases/DeclareAndDeployContractPayload.md)

##### details?

[`UniversalDetails`](../interfaces/UniversalDetails.md) & [`waitForTransactionOptions`](../type-aliases/waitForTransactionOptions.md) = `{}`

Transaction execution options

#### Returns

`Promise`\<[`DeclareDeployUDCResponse`](../type-aliases/DeclareDeployUDCResponse.md)\>

#### Example

```typescript
const result = await account.declareAndDeploy({
  contract: compiledContract,
  casm: compiledCasm,
  constructorCalldata: [param1, param2],
});
```

#### Inherited from

[`Account`](Account.md).[`declareAndDeploy`](Account.md#declareanddeploy)

---

### deployAccount()

> **deployAccount**(`contractPayload`, `details?`): `Promise`\<[`DeployContractResponse`](../interfaces/DeployContractResponse.md)\>

Defined in: [src/account/default.ts:561](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/account/default.ts#L561)

ACCOUNT METHODS

#### Parameters

##### contractPayload

[`DeployAccountContractPayload`](../type-aliases/DeployAccountContractPayload.md)

##### details?

[`UniversalDetails`](../interfaces/UniversalDetails.md) = `{}`

#### Returns

`Promise`\<[`DeployContractResponse`](../interfaces/DeployContractResponse.md)\>

#### Example

```typescript
const deployment = await account.deployAccount({
  classHash: accountClassHash,
  constructorCalldata: { publicKey: pubKey },
  addressSalt: pubKey,
});
```

#### Inherited from

[`Account`](Account.md).[`deployAccount`](Account.md#deployaccount)

---

### hashMessage()

> **hashMessage**(`typedData`): `Promise`\<`string`\>

Defined in: [src/account/default.ts:648](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/account/default.ts#L648)

Hash a typed data message using Pedersen hash

#### Parameters

##### typedData

[`TypedData`](../Starknet.js-API/namespaces/RPC/interfaces/TypedData.md)

EIP-712 style typed data structure

#### Returns

`Promise`\<`string`\>

Message hash as hex string

#### Remarks

- Uses Pedersen hash function (not Keccak)
- Includes domain separation
- Result can be used for signature verification

#### Example

```typescript
const messageHash = await account.hashMessage(typedData);
```

#### Inherited from

[`Account`](Account.md).[`hashMessage`](Account.md#hashmessage)

---

### getSnip9Version()

> **getSnip9Version**(): `Promise`\<`"0"` \| `"1"` \| `"2"`\>

Defined in: [src/account/default.ts:661](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/account/default.ts#L661)

Verify if an account is compatible with SNIP-9 outside execution, and with which version of this standard.

#### Returns

`Promise`\<`"0"` \| `"1"` \| `"2"`\>

Not compatible, V1, V2.

#### Example

```typescript
const result = myAccount.getSnip9Version();
// result = "V1"
```

#### Inherited from

[`Account`](Account.md).[`getSnip9Version`](Account.md#getsnip9version)

---

### isValidSnip9Nonce()

> **isValidSnip9Nonce**(`nonce`): `Promise`\<`boolean`\>

Defined in: [src/account/default.ts:682](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/account/default.ts#L682)

Verify if a SNIP-9 nonce has not yet been used by the account.

#### Parameters

##### nonce

[`BigNumberish`](../type-aliases/BigNumberish.md)

SNIP-9 nonce to test.

#### Returns

`Promise`\<`boolean`\>

true if SNIP-9 nonce not yet used.

#### Example

```typescript
const result = myAccount.isValidSnip9Nonce(1234);
// result = true
```

#### Inherited from

[`Account`](Account.md).[`isValidSnip9Nonce`](Account.md#isvalidsnip9nonce)

---

### getSnip9Nonce()

> **getSnip9Nonce**(): `Promise`\<`string`\>

Defined in: [src/account/default.ts:706](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/account/default.ts#L706)

Outside transaction needs a specific SNIP-9 nonce, that we get in this function.
A SNIP-9 nonce can be any number not yet used ; no ordering is needed.

#### Returns

`Promise`\<`string`\>

an Hex string of a SNIP-9 nonce.

#### Example

```typescript
const result = myAccount.getSnip9Nonce();
// result = "0x28a612590dbc36927933c8ee0f357eee639c8b22b3d3aa86949eed3ada4ac55"
```

#### Inherited from

[`Account`](Account.md).[`getSnip9Nonce`](Account.md#getsnip9nonce)

---

### getOutsideTransaction()

> **getOutsideTransaction**(`options`, `calls`, `version?`, `nonce?`): `Promise`\<[`OutsideTransaction`](../interfaces/OutsideTransaction.md)\>

Defined in: [src/account/default.ts:743](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/account/default.ts#L743)

Creates an object containing transaction(s) that can be executed by an other account with` Account.executeFromOutside()`, called Outside Transaction.

#### Parameters

##### options

[`OutsideExecutionOptions`](../interfaces/OutsideExecutionOptions.md)

Parameters of the transaction(s).

##### calls

[`AllowArray`](../type-aliases/AllowArray.md)\<[`Call`](../type-aliases/Call.md)\>

Transaction(s) to execute.

##### version?

`"0"` \| `"1"` \| `"2"`

SNIP-9 version of the Account that creates the outside transaction.

##### nonce?

[`BigNumberish`](../type-aliases/BigNumberish.md)

Outside Nonce.

#### Returns

`Promise`\<[`OutsideTransaction`](../interfaces/OutsideTransaction.md)\>

and object that can be used in `Account.executeFromOutside()`

#### Example

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

#### Inherited from

[`Account`](Account.md).[`getOutsideTransaction`](Account.md#getoutsidetransaction)

---

### executeFromOutside()

> **executeFromOutside**(`outsideTransaction`, `opts?`): `Promise`\<\{ `transaction_hash`: `string`; \}\>

Defined in: [src/account/default.ts:803](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/account/default.ts#L803)

An account B executes a transaction that has been signed by an account A.
Fees are paid by B.

#### Parameters

##### outsideTransaction

[`AllowArray`](../type-aliases/AllowArray.md)\<[`OutsideTransaction`](../interfaces/OutsideTransaction.md)\>

the signed transaction generated by `Account.getOutsideTransaction()`.

##### opts?

[`UniversalDetails`](../interfaces/UniversalDetails.md)

same options than `Account.execute()`.

#### Returns

`Promise`\<\{ `transaction_hash`: `string`; \}\>

same response than `Account.execute()`.

#### Example

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

#### Inherited from

[`Account`](Account.md).[`executeFromOutside`](Account.md#executefromoutside)

---

### buildInvocation()

> **buildInvocation**(`call`, `details`): `Promise`\<[`Invocation`](../type-aliases/Invocation.md)\>

Defined in: [src/account/default.ts:839](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/account/default.ts#L839)

#### Parameters

##### call

[`Call`](../type-aliases/Call.md)[]

##### details

[`InvocationsSignerDetails`](../type-aliases/InvocationsSignerDetails.md)

#### Returns

`Promise`\<[`Invocation`](../type-aliases/Invocation.md)\>

#### Inherited from

[`Account`](Account.md).[`buildInvocation`](Account.md#buildinvocation)

---

### buildDeclarePayload()

> **buildDeclarePayload**(`payload`, `details`): `Promise`\<[`DeclareContractTransaction`](../type-aliases/DeclareContractTransaction.md)\>

Defined in: [src/account/default.ts:854](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/account/default.ts#L854)

#### Parameters

##### payload

[`DeclareContractPayload`](../type-aliases/DeclareContractPayload.md)

##### details

[`InvocationsSignerDetails`](../type-aliases/InvocationsSignerDetails.md)

#### Returns

`Promise`\<[`DeclareContractTransaction`](../type-aliases/DeclareContractTransaction.md)\>

#### Inherited from

[`Account`](Account.md).[`buildDeclarePayload`](Account.md#builddeclarepayload)

---

### buildAccountDeployPayload()

> **buildAccountDeployPayload**(`__namedParameters`, `details`): `Promise`\<[`DeployAccountContractTransaction`](../type-aliases/DeployAccountContractTransaction.md)\>

Defined in: [src/account/default.ts:889](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/account/default.ts#L889)

#### Parameters

##### \_\_namedParameters

[`DeployAccountContractPayload`](../type-aliases/DeployAccountContractPayload.md)

##### details

[`InvocationsSignerDetails`](../type-aliases/InvocationsSignerDetails.md)

#### Returns

`Promise`\<[`DeployAccountContractTransaction`](../type-aliases/DeployAccountContractTransaction.md)\>

#### Inherited from

[`Account`](Account.md).[`buildAccountDeployPayload`](Account.md#buildaccountdeploypayload)

---

### buildPaymasterTransaction()

> **buildPaymasterTransaction**(`calls`, `paymasterDetails`): `Promise`\<[`PreparedTransaction`](../type-aliases/PreparedTransaction.md)\>

Defined in: [src/account/default.ts:1042](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/account/default.ts#L1042)

Estimate fees for a paymaster-sponsored transaction

#### Parameters

##### calls

[`Call`](../type-aliases/Call.md)[]

Array of calls to be sponsored

- .contractAddress - Target contract address
- .entrypoint - Function to invoke
- .calldata - Function parameters

##### paymasterDetails

[`PaymasterDetails`](../interfaces/PaymasterDetails.md)

Paymaster configuration

- .feeMode - Sponsorship mode: 'sponsored' or gas token
- .deploymentData - Account deployment data if needed
- .timeBounds - Valid execution time window

#### Returns

`Promise`\<[`PreparedTransaction`](../type-aliases/PreparedTransaction.md)\>

Fee estimates in both STRK and gas token

#### Example

```typescript
const prepared = await account.buildPaymasterTransaction(calls, {
  feeMode: { mode: 'default', gasToken: ETH_ADDRESS },
});
```

#### Inherited from

[`Account`](Account.md).[`buildPaymasterTransaction`](Account.md#buildpaymastertransaction)

---

### estimatePaymasterTransactionFee()

> **estimatePaymasterTransactionFee**(`calls`, `paymasterDetails`): `Promise`\<[`PaymasterFeeEstimate`](../type-aliases/PaymasterFeeEstimate.md)\>

Defined in: [src/account/default.ts:1081](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/account/default.ts#L1081)

Estimate fees for a paymaster-sponsored transaction

#### Parameters

##### calls

[`Call`](../type-aliases/Call.md)[]

Array of calls to be sponsored

- .contractAddress - Target contract address
- .entrypoint - Function to invoke
- .calldata - Function parameters

##### paymasterDetails

[`PaymasterDetails`](../interfaces/PaymasterDetails.md)

Paymaster configuration

- .feeMode - Sponsorship mode: 'sponsored' or gas token
- .deploymentData - Account deployment data if needed
- .timeBounds - Valid execution time window

#### Returns

`Promise`\<[`PaymasterFeeEstimate`](../type-aliases/PaymasterFeeEstimate.md)\>

Fee estimates in both STRK and gas token

#### Example

```typescript
const fees = await account.estimatePaymasterTransactionFee(
  [{ contractAddress, entrypoint, calldata }],
  { feeMode: { mode: 'sponsored' } }
);
```

#### Inherited from

[`Account`](Account.md).[`estimatePaymasterTransactionFee`](Account.md#estimatepaymastertransactionfee)

---

### preparePaymasterTransaction()

> **preparePaymasterTransaction**(`preparedTransaction`): `Promise`\<[`ExecutableUserTransaction`](../type-aliases/ExecutableUserTransaction.md)\>

Defined in: [src/account/default.ts:1089](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/account/default.ts#L1089)

#### Parameters

##### preparedTransaction

[`PreparedTransaction`](../type-aliases/PreparedTransaction.md)

#### Returns

`Promise`\<[`ExecutableUserTransaction`](../type-aliases/ExecutableUserTransaction.md)\>

#### Inherited from

[`Account`](Account.md).[`preparePaymasterTransaction`](Account.md#preparepaymastertransaction)

---

### executePaymasterTransaction()

> **executePaymasterTransaction**(`calls`, `paymasterDetails`, `maxFeeInGasToken?`): `Promise`\<\{ `transaction_hash`: `string`; \}\>

Defined in: [src/account/default.ts:1132](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/account/default.ts#L1132)

Execute a paymaster-sponsored transaction

#### Parameters

##### calls

[`Call`](../type-aliases/Call.md)[]

Array of calls to execute

##### paymasterDetails

[`PaymasterDetails`](../interfaces/PaymasterDetails.md)

Paymaster configuration

- .feeMode - 'sponsored' or gas token payment
- .deploymentData - Deploy account if needed
- .timeBounds - Execution validity window (UNIX timestamps)

##### maxFeeInGasToken?

[`BigNumberish`](../type-aliases/BigNumberish.md)

Maximum acceptable fee in gas token

#### Returns

`Promise`\<\{ `transaction_hash`: `string`; \}\>

Transaction hash if successful

#### Throws

If gas token price exceeds maxFeeInGasToken

#### Throws

If transaction parameters are modified by paymaster

#### Example

```typescript
const txHash = await account.executePaymasterTransaction(
  calls,
  { feeMode: { mode: 'sponsored' }, timeBounds: { executeBefore: Date.now() / 1000 + 3600 } },
  maxFeeETH
);
```

#### Inherited from

[`Account`](Account.md).[`executePaymasterTransaction`](Account.md#executepaymastertransaction)

---

### getStarkName()

> **getStarkName**(`address?`, `StarknetIdContract?`): `Promise`\<`string`\>

Defined in: [src/plugins/starknet-id/index.ts:40](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/plugins/starknet-id/index.ts#L40)

#### Parameters

##### address?

[`BigNumberish`](../type-aliases/BigNumberish.md)

##### StarknetIdContract?

`string`

#### Returns

`Promise`\<`string`\>

#### Inherited from

[`Account`](Account.md).[`getStarkName`](Account.md#getstarkname)

---

### getAddressFromStarkName()

> **getAddressFromStarkName**(`name`, `StarknetIdContract?`): `Promise`\<`string`\>

Defined in: [src/plugins/starknet-id/index.ts:41](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/plugins/starknet-id/index.ts#L41)

#### Parameters

##### name

`string`

##### StarknetIdContract?

`string`

#### Returns

`Promise`\<`string`\>

#### Inherited from

[`Account`](Account.md).[`getAddressFromStarkName`](Account.md#getaddressfromstarkname)

---

### getStarkProfile()

> **getStarkProfile**(`address`, `StarknetIdContract?`, `StarknetIdIdentityContract?`, `StarknetIdVerifierContract?`, `StarknetIdPfpContract?`, `StarknetIdPopContract?`, `StarknetIdMulticallContract?`): `Promise`\<[`StarkProfile`](../type-aliases/StarkProfile.md)\>

Defined in: [src/plugins/starknet-id/index.ts:42](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/plugins/starknet-id/index.ts#L42)

#### Parameters

##### address

[`BigNumberish`](../type-aliases/BigNumberish.md)

##### StarknetIdContract?

`string`

##### StarknetIdIdentityContract?

`string`

##### StarknetIdVerifierContract?

`string`

##### StarknetIdPfpContract?

`string`

##### StarknetIdPopContract?

`string`

##### StarknetIdMulticallContract?

`string`

#### Returns

`Promise`\<[`StarkProfile`](../type-aliases/StarkProfile.md)\>

#### Inherited from

[`Account`](Account.md).[`getStarkProfile`](Account.md#getstarkprofile)

---

### getBrotherName()

> **getBrotherName**(`address`, `BrotherIdContract?`): `Promise`\<`string`\>

Defined in: [src/plugins/brother-id/index.ts:47](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/plugins/brother-id/index.ts#L47)

#### Parameters

##### address

[`BigNumberish`](../type-aliases/BigNumberish.md)

##### BrotherIdContract?

`string`

#### Returns

`Promise`\<`string`\>

#### Inherited from

[`Account`](Account.md).[`getBrotherName`](Account.md#getbrothername)

---

### getAddressFromBrotherName()

> **getAddressFromBrotherName**(`name`, `BrotherIdContract?`): `Promise`\<`string`\>

Defined in: [src/plugins/brother-id/index.ts:48](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/plugins/brother-id/index.ts#L48)

#### Parameters

##### name

`string`

##### BrotherIdContract?

`string`

#### Returns

`Promise`\<`string`\>

#### Inherited from

[`Account`](Account.md).[`getAddressFromBrotherName`](Account.md#getaddressfrombrothername)

---

### getBrotherProfile()

> **getBrotherProfile**(`address`, `BrotherIdContract?`): `Promise`\<[`BrotherProfile`](../interfaces/BrotherProfile.md)\>

Defined in: [src/plugins/brother-id/index.ts:49](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/plugins/brother-id/index.ts#L49)

#### Parameters

##### address

[`BigNumberish`](../type-aliases/BigNumberish.md)

##### BrotherIdContract?

`string`

#### Returns

`Promise`\<[`BrotherProfile`](../interfaces/BrotherProfile.md)\>

#### Inherited from

[`Account`](Account.md).[`getBrotherProfile`](Account.md#getbrotherprofile)

---

### fastExecute()

> **fastExecute**(`transactions`, `transactionsDetail?`, `waitDetail?`): `Promise`\<[`FastExecuteResponse`](../type-aliases/FastExecuteResponse.md)\>

Defined in: [src/plugins/fast-execute/types.ts:119](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/plugins/fast-execute/types.ts#L119)

Execute one or multiple calls through the account contract,
responding as soon as a new transaction is possible with the same account.
Useful for gaming usage where rapid consecutive transactions are needed.

This method requires the provider to be initialized with `pre_confirmed` blockIdentifier option.
RPC 0.9 minimum.

In a normal `account.execute()` call followed by `provider.waitForTransaction()`, you have immediate access
to the events and transaction report. Here, we process consecutive transactions faster, but events and
transaction reports are not available immediately.

As a consequence of the above, do not use contract/account deployment with this method.

#### Parameters

##### transactions

`any`

Single call or array of calls to execute

##### transactionsDetail?

`any`

Transaction execution options

##### waitDetail?

[`FastWaitForTransactionOptions`](../type-aliases/FastWaitForTransactionOptions.md)

Options to scan the
network for the next possible transaction. `retries` is the number of times to retry (default: 50),
`retryInterval` is the time in ms between retries (default: 500).

#### Returns

`Promise`\<[`FastExecuteResponse`](../type-aliases/FastExecuteResponse.md)\>

Response containing the transaction result and status for the next
transaction. If `isReady` is true, you can execute the next transaction immediately. If false,
timeout has been reached before the next transaction was possible.

#### Example

```typescript
const myProvider = new RpcProvider({
  nodeUrl: url,
  blockIdentifier: BlockTag.PRE_CONFIRMED,
});
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

// if resp.isReady is true, you can launch immediately a new tx
if (resp.isReady) {
  // send next transaction
}
```

#### Inherited from

[`Account`](Account.md).[`fastExecute`](Account.md#fastexecute)
