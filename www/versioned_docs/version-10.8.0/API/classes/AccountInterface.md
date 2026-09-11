# Abstract Class: AccountInterface

Defined in: [src/account/interface.ts:52](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/account/interface.ts#L52)

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

## Constructors

### Constructor

> **new AccountInterface**(): `AccountInterface`

#### Returns

`AccountInterface`

## Properties

### provider

> `abstract` **provider**: [`ProviderInterface`](ProviderInterface.md)

Defined in: [src/account/interface.ts:56](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/account/interface.ts#L56)

Provider instance for blockchain interaction

---

### address

> `abstract` **address**: `string`

Defined in: [src/account/interface.ts:61](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/account/interface.ts#L61)

The address of the account contract on Starknet

---

### signer

> `abstract` **signer**: [`SignerInterface`](SignerInterface.md)

Defined in: [src/account/interface.ts:66](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/account/interface.ts#L66)

Signer instance for signing transactions and messages

---

### cairoVersion

> `abstract` **cairoVersion**: [`CairoVersion`](../type-aliases/CairoVersion.md)

Defined in: [src/account/interface.ts:71](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/account/interface.ts#L71)

Cairo version of the account contract implementation

---

### deployer?

> `abstract` `optional` **deployer?**: [`DeployerInterface`](DeployerInterface.md)

Defined in: [src/account/interface.ts:77](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/account/interface.ts#L77)

Optional deployer instance for custom contract deployment logic

#### Default

```ts
Uses default UDC (Universal Deployer Contract) if not specified
```

## Methods

### estimateInvokeFee()

> `abstract` **estimateInvokeFee**(`calls`, `estimateFeeDetails?`): `Promise`\<[`EstimateFeeResponseOverhead`](../type-aliases/EstimateFeeResponseOverhead.md)\>

Defined in: [src/account/interface.ts:109](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/account/interface.ts#L109)

Estimate fee for executing an INVOKE transaction on Starknet

#### Parameters

##### calls

[`AllowArray`](../type-aliases/AllowArray.md)\<[`Call`](../type-aliases/Call.md)\>

Single call or array of calls to estimate fees for

- .contractAddress - The address of the contract to invoke
- .entrypoint - The function selector of the contract method
- .calldata - The serialized function parameters (defaults to [])

##### estimateFeeDetails?

[`UniversalDetails`](../interfaces/UniversalDetails.md)

Optional details for fee estimation

- .blockIdentifier - Block to estimate against
- .nonce - Account nonce (defaults to current nonce)
- .skipValidate - Skip account validation (default: true)
- .tip - Priority fee tip in fri/wei for faster inclusion
- .accountDeploymentData - Include account deployment
- .paymasterData - Paymaster sponsorship data
- .nonceDataAvailabilityMode - DA mode for nonce
- .feeDataAvailabilityMode - DA mode for fee
- .version - Transaction version (v3 uses fri, v1/v2 use wei)
- .resourceBounds - Resource limits for v3 transactions

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

> `abstract` **estimateDeclareFee**(`contractPayload`, `estimateFeeDetails?`): `Promise`\<[`EstimateFeeResponseOverhead`](../type-aliases/EstimateFeeResponseOverhead.md)\>

Defined in: [src/account/interface.ts:140](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/account/interface.ts#L140)

Estimate fee for executing a DECLARE transaction on Starknet

#### Parameters

##### contractPayload

[`DeclareContractPayload`](../type-aliases/DeclareContractPayload.md)

Contract declaration payload.

- .contract - Compiled contract (Sierra JSON).
- .casm - Compiled Cairo assembly (required for Cairo 1).
- .classHash - Pre-computed class hash (optional optimization).
- .compiledClassHash - Pre-computed CASM hash (alternative to casm).

##### estimateFeeDetails?

[`UniversalDetails`](../interfaces/UniversalDetails.md)

Optional details for fee estimation.

- .blockIdentifier - Block to estimate against.
- .nonce - Account nonce (defaults to current nonce)
- .skipValidate - Skip account validation (default: true)
- .tip - Priority fee tip for faster inclusion
- .version - Transaction version (v3 uses fri, v1/v2 use wei)

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

> `abstract` **estimateAccountDeployFee**(`contractPayload`, `estimateFeeDetails?`): `Promise`\<[`EstimateFeeResponseOverhead`](../type-aliases/EstimateFeeResponseOverhead.md)\>

Defined in: [src/account/interface.ts:167](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/account/interface.ts#L167)

Estimate fee for executing an INVOKE transaction on Starknet

#### Parameters

##### contractPayload

[`DeployAccountContractPayload`](../type-aliases/DeployAccountContractPayload.md)

Single call or array of calls to estimate fees for

- .contractAddress - The address of the contract to invoke
- .entrypoint - The function selector of the contract method
- .calldata - The serialized function parameters (defaults to [])

##### estimateFeeDetails?

[`UniversalDetails`](../interfaces/UniversalDetails.md)

Optional details for fee estimation

- .blockIdentifier - Block to estimate against
- .nonce - Account nonce (defaults to current nonce)
- .skipValidate - Skip account validation (default: true)
- .tip - Priority fee tip in fri/wei for faster inclusion
- .accountDeploymentData - Include account deployment
- .paymasterData - Paymaster sponsorship data
- .nonceDataAvailabilityMode - DA mode for nonce
- .feeDataAvailabilityMode - DA mode for fee
- .version - Transaction version (v3 uses fri, v1/v2 use wei)
- .resourceBounds - Resource limits for v3 transactions

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

> `abstract` **estimateDeployFee**(`deployContractPayload`, `estimateFeeDetails?`): `Promise`\<[`EstimateFeeResponseOverhead`](../type-aliases/EstimateFeeResponseOverhead.md)\>

Defined in: [src/account/interface.ts:194](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/account/interface.ts#L194)

Estimate fee for executing an INVOKE transaction on Starknet

#### Parameters

##### deployContractPayload

[`UniversalDeployerContractPayload`](../type-aliases/UniversalDeployerContractPayload.md) \| [`UniversalDeployerContractPayload`](../type-aliases/UniversalDeployerContractPayload.md)[]

Single call or array of calls to estimate fees for

- .contractAddress - The address of the contract to invoke
- .entrypoint - The function selector of the contract method
- .calldata - The serialized function parameters (defaults to [])

##### estimateFeeDetails?

[`UniversalDetails`](../interfaces/UniversalDetails.md)

Optional details for fee estimation

- .blockIdentifier - Block to estimate against
- .nonce - Account nonce (defaults to current nonce)
- .skipValidate - Skip account validation (default: true)
- .tip - Priority fee tip in fri/wei for faster inclusion
- .accountDeploymentData - Include account deployment
- .paymasterData - Paymaster sponsorship data
- .nonceDataAvailabilityMode - DA mode for nonce
- .feeDataAvailabilityMode - DA mode for fee
- .version - Transaction version (v3 uses fri, v1/v2 use wei)
- .resourceBounds - Resource limits for v3 transactions

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

> `abstract` **estimateFeeBulk**(`invocations`, `details?`): `Promise`\<[`EstimateFeeResponseBulkOverhead`](../type-aliases/EstimateFeeResponseBulkOverhead.md)\>

Defined in: [src/account/interface.ts:218](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/account/interface.ts#L218)

Estimate fee for executing an INVOKE transaction on Starknet

#### Parameters

##### invocations

[`Invocations`](../type-aliases/Invocations.md)

Single call or array of calls to estimate fees for

- .contractAddress - The address of the contract to invoke
- .entrypoint - The function selector of the contract method
- .calldata - The serialized function parameters (defaults to [])

##### details?

[`UniversalDetails`](../interfaces/UniversalDetails.md)

Optional details for fee estimation

- .blockIdentifier - Block to estimate against
- .nonce - Account nonce (defaults to current nonce)
- .skipValidate - Skip account validation (default: true)
- .tip - Priority fee tip in fri/wei for faster inclusion
- .accountDeploymentData - Include account deployment
- .paymasterData - Paymaster sponsorship data
- .nonceDataAvailabilityMode - DA mode for nonce
- .feeDataAvailabilityMode - DA mode for fee
- .version - Transaction version (v3 uses fri, v1/v2 use wei)
- .resourceBounds - Resource limits for v3 transactions

#### Returns

`Promise`\<[`EstimateFeeResponseBulkOverhead`](../type-aliases/EstimateFeeResponseBulkOverhead.md)\>

Fee estimation including overall_fee and resourceBounds

#### Example

```typescript
const fees = await account.estimateFeeBulk([
  { type: 'INVOKE', payload: { contractAddress, entrypoint, calldata } },
  { type: 'DECLARE', payload: { contract, casm } },
]);
```

---

### execute()

> `abstract` **execute**(`transactions`, `transactionsDetail?`): `Promise`\<\{ `transaction_hash`: `string`; \}\>

Defined in: [src/account/interface.ts:247](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/account/interface.ts#L247)

Execute one or multiple calls through the account contract

#### Parameters

##### transactions

[`AllowArray`](../type-aliases/AllowArray.md)\<[`Call`](../type-aliases/Call.md)\>

Single call or array of calls to execute

- .contractAddress - Target contract address
- .entrypoint - Function to invoke on the contract
- .calldata - Function parameters

##### transactionsDetail?

[`InvocationsDetails`](../type-aliases/InvocationsDetails.md)

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

### estimatePaymasterTransactionFee()

> `abstract` **estimatePaymasterTransactionFee**(`calls`, `paymasterDetails`): `Promise`\<[`PaymasterFeeEstimate`](../type-aliases/PaymasterFeeEstimate.md)\>

Defined in: [src/account/interface.ts:274](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/account/interface.ts#L274)

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

### buildPaymasterTransaction()

> `abstract` **buildPaymasterTransaction**(`calls`, `paymasterDetails`): `Promise`\<[`PreparedTransaction`](../type-aliases/PreparedTransaction.md)\>

Defined in: [src/account/interface.ts:295](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/account/interface.ts#L295)

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

### executePaymasterTransaction()

> `abstract` **executePaymasterTransaction**(`calls`, `paymasterDetails`, `maxFeeInGasToken?`): `Promise`\<\{ `transaction_hash`: `string`; \}\>

Defined in: [src/account/interface.ts:323](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/account/interface.ts#L323)

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

### declare()

> `abstract` **declare**(`contractPayload`, `transactionsDetail?`): `Promise`\<\{ `class_hash`: `string`; `transaction_hash`: `string`; \}\>

Defined in: [src/account/interface.ts:351](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/account/interface.ts#L351)

Execute one or multiple calls through the account contract

#### Parameters

##### contractPayload

[`DeclareContractPayload`](../type-aliases/DeclareContractPayload.md)

Single call or array of calls to execute

- .contractAddress - Target contract address
- .entrypoint - Function to invoke on the contract
- .calldata - Function parameters

##### transactionsDetail?

[`InvocationsDetails`](../type-aliases/InvocationsDetails.md)

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

> `abstract` **deploy**(`payload`, `details?`): `Promise`\<[`MultiDeployContractResponse`](../type-aliases/MultiDeployContractResponse.md)\>

Defined in: [src/account/interface.ts:377](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/account/interface.ts#L377)

Execute one or multiple calls through the account contract

#### Parameters

##### payload

[`UniversalDeployerContractPayload`](../type-aliases/UniversalDeployerContractPayload.md) \| [`UniversalDeployerContractPayload`](../type-aliases/UniversalDeployerContractPayload.md)[]

Single call or array of calls to execute

- .contractAddress - Target contract address
- .entrypoint - Function to invoke on the contract
- .calldata - Function parameters

##### details?

[`InvocationsDetails`](../type-aliases/InvocationsDetails.md)

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

> `abstract` **deployContract**(`payload`, `details?`): `Promise`\<[`DeployContractUDCResponse`](../type-aliases/DeployContractUDCResponse.md)\>

Defined in: [src/account/interface.ts:403](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/account/interface.ts#L403)

Execute one or multiple calls through the account contract

#### Parameters

##### payload

[`UniversalDeployerContractPayload`](../type-aliases/UniversalDeployerContractPayload.md) \| [`UniversalDeployerContractPayload`](../type-aliases/UniversalDeployerContractPayload.md)[]

Single call or array of calls to execute

- .contractAddress - Target contract address
- .entrypoint - Function to invoke on the contract
- .calldata - Function parameters

##### details?

[`InvocationsDetails`](../type-aliases/InvocationsDetails.md)

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

> `abstract` **declareAndDeploy**(`payload`, `details?`): `Promise`\<[`DeclareDeployUDCResponse`](../type-aliases/DeclareDeployUDCResponse.md)\>

Defined in: [src/account/interface.ts:437](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/account/interface.ts#L437)

Execute one or multiple calls through the account contract

#### Parameters

##### payload

[`DeclareAndDeployContractPayload`](../type-aliases/DeclareAndDeployContractPayload.md)

Single call or array of calls to execute

- .contractAddress - Target contract address
- .entrypoint - Function to invoke on the contract
- .calldata - Function parameters

##### details?

[`InvocationsDetails`](../type-aliases/InvocationsDetails.md)

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

> `abstract` **deployAccount**(`contractPayload`, `transactionsDetail?`): `Promise`\<[`DeployContractResponse`](../interfaces/DeployContractResponse.md)\>

Defined in: [src/account/interface.ts:466](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/account/interface.ts#L466)

Execute one or multiple calls through the account contract

#### Parameters

##### contractPayload

[`DeployAccountContractPayload`](../type-aliases/DeployAccountContractPayload.md)

Single call or array of calls to execute

- .contractAddress - Target contract address
- .entrypoint - Function to invoke on the contract
- .calldata - Function parameters

##### transactionsDetail?

[`InvocationsDetails`](../type-aliases/InvocationsDetails.md)

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

> `abstract` **signMessage**(`typedData`): `Promise`\<[`Signature`](../type-aliases/Signature.md)\>

Defined in: [src/account/interface.ts:490](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/account/interface.ts#L490)

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

> `abstract` **hashMessage**(`typedData`): `Promise`\<`string`\>

Defined in: [src/account/interface.ts:506](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/account/interface.ts#L506)

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

### getNonce()

> `abstract` **getNonce**(`blockIdentifier?`): `Promise`\<`string`\>

Defined in: [src/account/interface.ts:519](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/account/interface.ts#L519)

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

### declareIfNot()

> `abstract` **declareIfNot**(`contractPayload`, `transactionsDetail?`): `Promise`\<\{ `class_hash`: `string`; `transaction_hash`: `string`; \}\>

Defined in: [src/account/interface.ts:535](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/account/interface.ts#L535)

Declare a contract class if not already declared

#### Parameters

##### contractPayload

[`DeclareContractPayload`](../type-aliases/DeclareContractPayload.md)

Contract declaration payload

##### transactionsDetail?

[`InvocationsDetails`](../type-aliases/InvocationsDetails.md)

Transaction execution options

#### Returns

`Promise`\<\{ `class_hash`: `string`; `transaction_hash`: `string`; \}\>

Declaration result (with empty transaction_hash if already declared)

#### Example

```typescript
const result = await account.declareIfNot({
  contract: compiledContract,
  casm: compiledCasm,
});
```
