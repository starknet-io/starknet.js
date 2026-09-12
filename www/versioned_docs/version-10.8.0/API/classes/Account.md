# Class: Account

Defined in: [src/account/default.ts:102](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/account/default.ts#L102)

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

- [`StarknetIdAccountMethods`](../interfaces/StarknetIdAccountMethods.md).[`BrotherIdProviderMethods`](../interfaces/BrotherIdProviderMethods.md).[`FastExecuteAccountMethods`](../interfaces/FastExecuteAccountMethods.md)

## Extended by

- [`WalletAccount`](WalletAccount.md)
- [`WalletAccountV5`](WalletAccountV5.md)

## Implements

- [`AccountInterface`](AccountInterface.md)

## Constructors

### Constructor

> **new Account**(`options`): `Account`

Defined in: [src/account/default.ts:125](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/account/default.ts#L125)

#### Parameters

##### options

[`AccountOptions`](../type-aliases/AccountOptions.md)

#### Returns

`Account`

#### Inherited from

`StarknetIdAccountMethods.constructor`

## Properties

### provider

> **provider**: [`RpcProvider`](RpcProvider.md)

Defined in: [src/account/default.ts:106](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/account/default.ts#L106)

Provider instance for blockchain interaction

#### Implementation of

[`AccountInterface`](AccountInterface.md).[`provider`](AccountInterface.md#provider)

---

### signer

> **signer**: [`SignerInterface`](SignerInterface.md)

Defined in: [src/account/default.ts:108](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/account/default.ts#L108)

Signer instance for signing transactions and messages

#### Implementation of

[`AccountInterface`](AccountInterface.md).[`signer`](AccountInterface.md#signer)

---

### address

> **address**: `string`

Defined in: [src/account/default.ts:110](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/account/default.ts#L110)

The address of the account contract on Starknet

#### Implementation of

[`AccountInterface`](AccountInterface.md).[`address`](AccountInterface.md#address)

---

### cairoVersion

> **cairoVersion**: [`CairoVersion`](../type-aliases/CairoVersion.md)

Defined in: [src/account/default.ts:112](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/account/default.ts#L112)

Cairo version of the account contract implementation

#### Implementation of

[`AccountInterface`](AccountInterface.md).[`cairoVersion`](AccountInterface.md#cairoversion)

---

### transactionVersion

> `readonly` **transactionVersion**: `"0x3"`

Defined in: [src/account/default.ts:114](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/account/default.ts#L114)

---

### paymaster

> **paymaster**: [`PaymasterInterface`](PaymasterInterface.md)

Defined in: [src/account/default.ts:116](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/account/default.ts#L116)

---

### deployer

> **deployer**: [`Deployer`](Deployer.md)

Defined in: [src/account/default.ts:118](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/account/default.ts#L118)

Optional deployer instance for custom contract deployment logic

#### Default

```ts
Uses default UDC (Universal Deployer Contract) if not specified
```

#### Implementation of

[`AccountInterface`](AccountInterface.md).[`deployer`](AccountInterface.md#deployer)

---

### defaultTipType

> **defaultTipType**: [`TipType`](../type-aliases/TipType.md)

Defined in: [src/account/default.ts:120](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/account/default.ts#L120)

---

### accountPluginManager

> `readonly` **accountPluginManager**: [`PluginManager`](PluginManager.md)

Defined in: [src/account/default.ts:123](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/account/default.ts#L123)

**`Internal`**

Account-level plugin management

---

### deploySelf

> **deploySelf**: (`contractPayload`, `details`) => `Promise`\<[`DeployContractResponse`](../interfaces/DeployContractResponse.md)\>

Defined in: [src/account/default.ts:559](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/account/default.ts#L559)

Execute one or multiple calls through the account contract

#### Parameters

##### contractPayload

[`DeployAccountContractPayload`](../type-aliases/DeployAccountContractPayload.md)

Single call or array of calls to execute

- .contractAddress - Target contract address
- .entrypoint - Function to invoke on the contract
- .calldata - Function parameters

##### details?

[`UniversalDetails`](../interfaces/UniversalDetails.md) = `{}`

Transaction execution options

- .nonce - Override account nonce
- .maxFee - Maximum fee for v1/v2 transactions
- .resourceBounds - Resource limits for v3 transactions
- .tip - Priority fee tip
- .version - Force specific transaction version

#### Returns

`Promise`\<[`DeployContractResponse`](../interfaces/DeployContractResponse.md)\>

Transaction hash and response

#### Example

```typescript
const deployment = await account.deployAccount({
  classHash: accountClassHash,
  constructorCalldata: { publicKey: pubKey },
  addressSalt: pubKey,
});
```

## Methods

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

---

### getNonceSafe()

> `protected` **getNonceSafe**(`nonce?`): `Promise`\<`bigint`\>

Defined in: [src/account/default.ts:165](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/account/default.ts#L165)

#### Parameters

##### nonce?

[`BigNumberish`](../type-aliases/BigNumberish.md)

#### Returns

`Promise`\<`bigint`\>

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

---

### execute()

> **execute**(`transactions`, `transactionsDetail?`): `Promise`\<\{ `transaction_hash`: `string`; \}\>

Defined in: [src/account/default.ts:365](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/account/default.ts#L365)

Execute one or multiple calls through the account contract

#### Parameters

##### transactions

[`AllowArray`](../type-aliases/AllowArray.md)\<[`Call`](../type-aliases/Call.md)\>

Single call or array of calls to execute

- .contractAddress - Target contract address
- .entrypoint - Function to invoke on the contract
- .calldata - Function parameters

##### transactionsDetail?

[`UniversalDetails`](../interfaces/UniversalDetails.md) = `{}`

Transaction execution options

- .nonce - Override account nonce
- .maxFee - Maximum fee for v1/v2 transactions
- .resourceBounds - Resource limits for v3 transactions
- .tip - Priority fee tip
- .version - Force specific transaction version

#### Returns

`Promise`\<\{ `transaction_hash`: `string`; \}\>

Transaction hash and response

#### Example

```typescript
const result = await account.execute([
  { contractAddress: token, entrypoint: 'transfer', calldata: [to, amount] },
  { contractAddress: nft, entrypoint: 'mint', calldata: [recipient] },
]);
```

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

---

### declare()

> **declare**(`payload`, `details?`): `Promise`\<\{ `class_hash`: `string`; `transaction_hash`: `string`; \}\>

Defined in: [src/account/default.ts:470](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/account/default.ts#L470)

Execute one or multiple calls through the account contract

#### Parameters

##### payload

[`DeclareContractPayload`](../type-aliases/DeclareContractPayload.md)

Single call or array of calls to execute

- .contractAddress - Target contract address
- .entrypoint - Function to invoke on the contract
- .calldata - Function parameters

##### details?

[`UniversalDetails`](../interfaces/UniversalDetails.md) = `{}`

Transaction execution options

- .nonce - Override account nonce
- .maxFee - Maximum fee for v1/v2 transactions
- .resourceBounds - Resource limits for v3 transactions
- .tip - Priority fee tip
- .version - Force specific transaction version

#### Returns

`Promise`\<\{ `class_hash`: `string`; `transaction_hash`: `string`; \}\>

Transaction hash and response

#### Example

```typescript
const declareResult = await account.declare({
  contract: compiledSierra,
  casm: compiledCasm,
});
```

---

### deploy()

> **deploy**(`payload`, `details?`): `Promise`\<[`MultiDeployContractResponse`](../type-aliases/MultiDeployContractResponse.md)\>

Defined in: [src/account/default.ts:519](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/account/default.ts#L519)

Execute one or multiple calls through the account contract

#### Parameters

##### payload

[`UniversalDeployerContractPayload`](../type-aliases/UniversalDeployerContractPayload.md) \| [`UniversalDeployerContractPayload`](../type-aliases/UniversalDeployerContractPayload.md)[]

Single call or array of calls to execute

- .contractAddress - Target contract address
- .entrypoint - Function to invoke on the contract
- .calldata - Function parameters

##### details?

[`UniversalDetails`](../interfaces/UniversalDetails.md) = `{}`

Transaction execution options

- .nonce - Override account nonce
- .maxFee - Maximum fee for v1/v2 transactions
- .resourceBounds - Resource limits for v3 transactions
- .tip - Priority fee tip
- .version - Force specific transaction version

#### Returns

`Promise`\<[`MultiDeployContractResponse`](../type-aliases/MultiDeployContractResponse.md)\>

Transaction hash and response

#### Example

```typescript
const deployment = await account.deploy([
  { classHash: erc20ClassHash, constructorCalldata: [name, symbol] },
  { classHash: nftClassHash, unique: true },
]);
```

---

### deployContract()

> **deployContract**(`payload`, `details?`): `Promise`\<[`DeployContractUDCResponse`](../type-aliases/DeployContractUDCResponse.md)\>

Defined in: [src/account/default.ts:532](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/account/default.ts#L532)

Execute one or multiple calls through the account contract

#### Parameters

##### payload

[`UniversalDeployerContractPayload`](../type-aliases/UniversalDeployerContractPayload.md) \| [`UniversalDeployerContractPayload`](../type-aliases/UniversalDeployerContractPayload.md)[]

Single call or array of calls to execute

- .contractAddress - Target contract address
- .entrypoint - Function to invoke on the contract
- .calldata - Function parameters

##### details?

[`UniversalDetails`](../interfaces/UniversalDetails.md) & [`waitForTransactionOptions`](../type-aliases/waitForTransactionOptions.md) = `{}`

Transaction execution options

- .nonce - Override account nonce
- .maxFee - Maximum fee for v1/v2 transactions
- .resourceBounds - Resource limits for v3 transactions
- .tip - Priority fee tip
- .version - Force specific transaction version

#### Returns

`Promise`\<[`DeployContractUDCResponse`](../type-aliases/DeployContractUDCResponse.md)\>

Transaction hash and response

#### Example

```typescript
const result = await account.deployContract({
  classHash: contractClassHash,
  constructorCalldata: params,
});
console.log('Deployed at:', result.address);
```

---

### declareAndDeploy()

> **declareAndDeploy**(`payload`, `details?`): `Promise`\<[`DeclareDeployUDCResponse`](../type-aliases/DeclareDeployUDCResponse.md)\>

Defined in: [src/account/default.ts:543](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/account/default.ts#L543)

Execute one or multiple calls through the account contract

#### Parameters

##### payload

[`DeclareAndDeployContractPayload`](../type-aliases/DeclareAndDeployContractPayload.md)

Single call or array of calls to execute

- .contractAddress - Target contract address
- .entrypoint - Function to invoke on the contract
- .calldata - Function parameters

##### details?

[`UniversalDetails`](../interfaces/UniversalDetails.md) & [`waitForTransactionOptions`](../type-aliases/waitForTransactionOptions.md) = `{}`

Transaction execution options

- .nonce - Override account nonce
- .maxFee - Maximum fee for v1/v2 transactions
- .resourceBounds - Resource limits for v3 transactions
- .tip - Priority fee tip
- .version - Force specific transaction version

#### Returns

`Promise`\<[`DeclareDeployUDCResponse`](../type-aliases/DeclareDeployUDCResponse.md)\>

Transaction hash and response

#### Example

```typescript
const result = await account.declareAndDeploy({
  contract: compiledContract,
  casm: compiledCasm,
  constructorCalldata: [param1, param2],
});
```

---

### deployAccount()

> **deployAccount**(`contractPayload`, `details?`): `Promise`\<[`DeployContractResponse`](../interfaces/DeployContractResponse.md)\>

Defined in: [src/account/default.ts:561](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/account/default.ts#L561)

Execute one or multiple calls through the account contract

#### Parameters

##### contractPayload

[`DeployAccountContractPayload`](../type-aliases/DeployAccountContractPayload.md)

Single call or array of calls to execute

- .contractAddress - Target contract address
- .entrypoint - Function to invoke on the contract
- .calldata - Function parameters

##### details?

[`UniversalDetails`](../interfaces/UniversalDetails.md) = `{}`

Transaction execution options

- .nonce - Override account nonce
- .maxFee - Maximum fee for v1/v2 transactions
- .resourceBounds - Resource limits for v3 transactions
- .tip - Priority fee tip
- .version - Force specific transaction version

#### Returns

`Promise`\<[`DeployContractResponse`](../interfaces/DeployContractResponse.md)\>

Transaction hash and response

#### Example

```typescript
const deployment = await account.deployAccount({
  classHash: accountClassHash,
  constructorCalldata: { publicKey: pubKey },
  addressSalt: pubKey,
});
```

---

### signMessage()

> **signMessage**(`typedData`): `Promise`\<[`Signature`](../type-aliases/Signature.md)\>

Defined in: [src/account/default.ts:632](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/account/default.ts#L632)

Sign a typed data message for off-chain verification

#### Parameters

##### typedData

[`TypedData`](../Starknet.js-API/namespaces/RPC/interfaces/TypedData.md)

EIP-712 style typed data structure

#### Returns

`Promise`\<[`Signature`](../type-aliases/Signature.md)\>

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

---

### preparePaymasterTransaction()

> **preparePaymasterTransaction**(`preparedTransaction`): `Promise`\<[`ExecutableUserTransaction`](../type-aliases/ExecutableUserTransaction.md)\>

Defined in: [src/account/default.ts:1089](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/account/default.ts#L1089)

#### Parameters

##### preparedTransaction

[`PreparedTransaction`](../type-aliases/PreparedTransaction.md)

#### Returns

`Promise`\<[`ExecutableUserTransaction`](../type-aliases/ExecutableUserTransaction.md)\>

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

[`StarknetIdAccountMethods`](../interfaces/StarknetIdAccountMethods.md).[`getStarkName`](../interfaces/StarknetIdAccountMethods.md#getstarkname)

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

[`StarknetIdAccountMethods`](../interfaces/StarknetIdAccountMethods.md).[`getAddressFromStarkName`](../interfaces/StarknetIdAccountMethods.md#getaddressfromstarkname)

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

[`StarknetIdAccountMethods`](../interfaces/StarknetIdAccountMethods.md).[`getStarkProfile`](../interfaces/StarknetIdAccountMethods.md#getstarkprofile)

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

[`BrotherIdProviderMethods`](../interfaces/BrotherIdProviderMethods.md).[`getBrotherName`](../interfaces/BrotherIdProviderMethods.md#getbrothername)

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

[`BrotherIdProviderMethods`](../interfaces/BrotherIdProviderMethods.md).[`getAddressFromBrotherName`](../interfaces/BrotherIdProviderMethods.md#getaddressfrombrothername)

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

[`BrotherIdProviderMethods`](../interfaces/BrotherIdProviderMethods.md).[`getBrotherProfile`](../interfaces/BrotherIdProviderMethods.md#getbrotherprofile)

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

[`FastExecuteAccountMethods`](../interfaces/FastExecuteAccountMethods.md).[`fastExecute`](../interfaces/FastExecuteAccountMethods.md#fastexecute)
