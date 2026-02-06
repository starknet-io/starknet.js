---
id: 'AccountInterface'
title: 'Class: AccountInterface'
sidebar_label: 'AccountInterface'
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

- [`ProviderInterface`](ProviderInterface.md)

  ↳ **`AccountInterface`**

## Implemented by

- [`Account`](Account.md)
- [`WalletAccount`](WalletAccount.md)
- [`WalletAccountV5`](WalletAccountV5.md)

## Constructors

### constructor

• **new AccountInterface**(): [`AccountInterface`](AccountInterface.md)

#### Returns

[`AccountInterface`](AccountInterface.md)

#### Inherited from

[ProviderInterface](ProviderInterface.md).[constructor](ProviderInterface.md#constructor)

## Properties

### address

• `Abstract` **address**: `string`

The address of the account contract on Starknet

#### Defined in

[src/account/interface.ts:56](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/account/interface.ts#L56)

---

### signer

• `Abstract` **signer**: [`SignerInterface`](SignerInterface.md)

Signer instance for signing transactions and messages

#### Defined in

[src/account/interface.ts:61](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/account/interface.ts#L61)

---

### cairoVersion

• `Abstract` **cairoVersion**: [`CairoVersion`](../modules.md#cairoversion)

Cairo version of the account contract implementation

#### Defined in

[src/account/interface.ts:66](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/account/interface.ts#L66)

---

### deployer

• `Optional` `Abstract` **deployer**: [`DeployerInterface`](DeployerInterface.md)

Optional deployer instance for custom contract deployment logic

**`Default`**

```ts
Uses default UDC (Universal Deployer Contract) if not specified
```

#### Defined in

[src/account/interface.ts:72](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/account/interface.ts#L72)

---

### channel

• `Abstract` **channel**: [`RpcChannel`](RPC09.RpcChannel.md) \| [`RpcChannel`](RPC010.RpcChannel.md)

#### Inherited from

[ProviderInterface](ProviderInterface.md).[channel](ProviderInterface.md#channel)

#### Defined in

[src/provider/interface.ts:47](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/provider/interface.ts#L47)

---

### responseParser

• `Abstract` **responseParser**: [`RPCResponseParser`](RPCResponseParser.md)

#### Inherited from

[ProviderInterface](ProviderInterface.md).[responseParser](ProviderInterface.md#responseparser)

#### Defined in

[src/provider/interface.ts:49](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/provider/interface.ts#L49)

## Methods

### estimateInvokeFee

▸ **estimateInvokeFee**(`calls`, `estimateFeeDetails?`): `Promise`\<[`EstimateFeeResponseOverhead`](../modules.md#estimatefeeresponseoverhead)\>

Estimate fee for executing an INVOKE transaction on Starknet

#### Parameters

| Name                  | Type                                                                     | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| :-------------------- | :----------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `calls`               | [`AllowArray`](../modules.md#allowarray)\<[`Call`](../modules.md#call)\> | Single call or array of calls to estimate fees for - .contractAddress - The address of the contract to invoke - .entrypoint - The function selector of the contract method - .calldata - The serialized function parameters (defaults to [])                                                                                                                                                                                                                                                                                                                                        |
| `estimateFeeDetails?` | [`UniversalDetails`](../interfaces/UniversalDetails.md)                  | Optional details for fee estimation - .blockIdentifier - Block to estimate against - .nonce - Account nonce (defaults to current nonce) - .skipValidate - Skip account validation (default: true) - .tip - Priority fee tip in fri/wei for faster inclusion - .accountDeploymentData - Include account deployment - .paymasterData - Paymaster sponsorship data - .nonceDataAvailabilityMode - DA mode for nonce - .feeDataAvailabilityMode - DA mode for fee - .version - Transaction version (v3 uses fri, v1/v2 use wei) - .resourceBounds - Resource limits for v3 transactions |

#### Returns

`Promise`\<[`EstimateFeeResponseOverhead`](../modules.md#estimatefeeresponseoverhead)\>

Fee estimation including overall_fee and resourceBounds

**`Example`**

```typescript
const fee = await account.estimateInvokeFee({
  contractAddress: '0x123...',
  entrypoint: 'transfer',
  calldata: [recipient, amount],
});
```

#### Defined in

[src/account/interface.ts:104](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/account/interface.ts#L104)

---

### estimateDeclareFee

▸ **estimateDeclareFee**(`contractPayload`, `estimateFeeDetails?`): `Promise`\<[`EstimateFeeResponseOverhead`](../modules.md#estimatefeeresponseoverhead)\>

Estimate fee for executing a DECLARE transaction on Starknet

#### Parameters

| Name                  | Type                                                             | Description                                                                                                                                                                                                                                                                                                      |
| :-------------------- | :--------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `contractPayload`     | [`DeclareContractPayload`](../modules.md#declarecontractpayload) | Contract declaration payload. - .contract - Compiled contract (Sierra JSON). - .casm - Compiled Cairo assembly (required for Cairo 1). - .classHash - Pre-computed class hash (optional optimization). - .compiledClassHash - Pre-computed CASM hash (alternative to casm).                                      |
| `estimateFeeDetails?` | [`UniversalDetails`](../interfaces/UniversalDetails.md)          | Optional details for fee estimation. - .blockIdentifier - Block to estimate against. - .nonce - Account nonce (defaults to current nonce) - .skipValidate - Skip account validation (default: true) - .tip - Priority fee tip for faster inclusion - .version - Transaction version (v3 uses fri, v1/v2 use wei) |

#### Returns

`Promise`\<[`EstimateFeeResponseOverhead`](../modules.md#estimatefeeresponseoverhead)\>

Fee estimation including overall_fee and resourceBounds

**`Example`**

```typescript
const fee = await account.estimateDeclareFee({
  contract: compiledContract,
  casm: compiledCasm,
});
```

#### Defined in

[src/account/interface.ts:135](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/account/interface.ts#L135)

---

### estimateAccountDeployFee

▸ **estimateAccountDeployFee**(`contractPayload`, `estimateFeeDetails?`): `Promise`\<[`EstimateFeeResponseOverhead`](../modules.md#estimatefeeresponseoverhead)\>

Estimate fee for executing an INVOKE transaction on Starknet

#### Parameters

| Name                  | Type                                                                         | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| :-------------------- | :--------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `contractPayload`     | [`DeployAccountContractPayload`](../modules.md#deployaccountcontractpayload) | Single call or array of calls to estimate fees for - .contractAddress - The address of the contract to invoke - .entrypoint - The function selector of the contract method - .calldata - The serialized function parameters (defaults to [])                                                                                                                                                                                                                                                                                                                                        |
| `estimateFeeDetails?` | [`UniversalDetails`](../interfaces/UniversalDetails.md)                      | Optional details for fee estimation - .blockIdentifier - Block to estimate against - .nonce - Account nonce (defaults to current nonce) - .skipValidate - Skip account validation (default: true) - .tip - Priority fee tip in fri/wei for faster inclusion - .accountDeploymentData - Include account deployment - .paymasterData - Paymaster sponsorship data - .nonceDataAvailabilityMode - DA mode for nonce - .feeDataAvailabilityMode - DA mode for fee - .version - Transaction version (v3 uses fri, v1/v2 use wei) - .resourceBounds - Resource limits for v3 transactions |

#### Returns

`Promise`\<[`EstimateFeeResponseOverhead`](../modules.md#estimatefeeresponseoverhead)\>

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

#### Defined in

[src/account/interface.ts:162](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/account/interface.ts#L162)

---

### estimateDeployFee

▸ **estimateDeployFee**(`deployContractPayload`, `estimateFeeDetails?`): `Promise`\<[`EstimateFeeResponseOverhead`](../modules.md#estimatefeeresponseoverhead)\>

Estimate fee for executing an INVOKE transaction on Starknet

#### Parameters

| Name                    | Type                                                                                                                                                                           | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| :---------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `deployContractPayload` | [`UniversalDeployerContractPayload`](../modules.md#universaldeployercontractpayload) \| [`UniversalDeployerContractPayload`](../modules.md#universaldeployercontractpayload)[] | Single call or array of calls to estimate fees for - .contractAddress - The address of the contract to invoke - .entrypoint - The function selector of the contract method - .calldata - The serialized function parameters (defaults to [])                                                                                                                                                                                                                                                                                                                                        |
| `estimateFeeDetails?`   | [`UniversalDetails`](../interfaces/UniversalDetails.md)                                                                                                                        | Optional details for fee estimation - .blockIdentifier - Block to estimate against - .nonce - Account nonce (defaults to current nonce) - .skipValidate - Skip account validation (default: true) - .tip - Priority fee tip in fri/wei for faster inclusion - .accountDeploymentData - Include account deployment - .paymasterData - Paymaster sponsorship data - .nonceDataAvailabilityMode - DA mode for nonce - .feeDataAvailabilityMode - DA mode for fee - .version - Transaction version (v3 uses fri, v1/v2 use wei) - .resourceBounds - Resource limits for v3 transactions |

#### Returns

`Promise`\<[`EstimateFeeResponseOverhead`](../modules.md#estimatefeeresponseoverhead)\>

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

#### Defined in

[src/account/interface.ts:189](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/account/interface.ts#L189)

---

### estimateFeeBulk

▸ **estimateFeeBulk**(`invocations`, `details?`): `Promise`\<[`EstimateFeeResponseBulkOverhead`](../modules.md#estimatefeeresponsebulkoverhead)\>

Estimate fee for executing an INVOKE transaction on Starknet

#### Parameters

| Name          | Type                                                    | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| :------------ | :------------------------------------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `invocations` | [`Invocations`](../modules.md#invocations)              | Single call or array of calls to estimate fees for - .contractAddress - The address of the contract to invoke - .entrypoint - The function selector of the contract method - .calldata - The serialized function parameters (defaults to [])                                                                                                                                                                                                                                                                                                                                        |
| `details?`    | [`UniversalDetails`](../interfaces/UniversalDetails.md) | Optional details for fee estimation - .blockIdentifier - Block to estimate against - .nonce - Account nonce (defaults to current nonce) - .skipValidate - Skip account validation (default: true) - .tip - Priority fee tip in fri/wei for faster inclusion - .accountDeploymentData - Include account deployment - .paymasterData - Paymaster sponsorship data - .nonceDataAvailabilityMode - DA mode for nonce - .feeDataAvailabilityMode - DA mode for fee - .version - Transaction version (v3 uses fri, v1/v2 use wei) - .resourceBounds - Resource limits for v3 transactions |

#### Returns

`Promise`\<[`EstimateFeeResponseBulkOverhead`](../modules.md#estimatefeeresponsebulkoverhead)\>

Array of fee estimations for each transaction

Fee estimation including overall_fee and resourceBounds

**`Example`**

```typescript
const fees = await account.estimateFeeBulk([
  { type: 'INVOKE', payload: { contractAddress, entrypoint, calldata } },
  { type: 'DECLARE', payload: { contract, casm } },
]);
```

#### Defined in

[src/account/interface.ts:213](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/account/interface.ts#L213)

---

### execute

▸ **execute**(`transactions`, `transactionsDetail?`): `Promise`\<\{ `transaction_hash`: `string` }\>

Execute one or multiple calls through the account contract

#### Parameters

| Name                  | Type                                                                     | Description                                                                                                                                                                                                                                      |
| :-------------------- | :----------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `transactions`        | [`AllowArray`](../modules.md#allowarray)\<[`Call`](../modules.md#call)\> | Single call or array of calls to execute - .contractAddress - Target contract address - .entrypoint - Function to invoke on the contract - .calldata - Function parameters                                                                       |
| `transactionsDetail?` | [`InvocationsDetails`](../modules.md#invocationsdetails)                 | Transaction execution options - .nonce - Override account nonce - .maxFee - Maximum fee for v1/v2 transactions - .resourceBounds - Resource limits for v3 transactions - .tip - Priority fee tip - .version - Force specific transaction version |

#### Returns

`Promise`\<\{ `transaction_hash`: `string` }\>

Transaction hash and response

**`Example`**

```typescript
const result = await account.execute([
  { contractAddress: token, entrypoint: 'transfer', calldata: [to, amount] },
  { contractAddress: nft, entrypoint: 'mint', calldata: [recipient] },
]);
```

#### Defined in

[src/account/interface.ts:242](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/account/interface.ts#L242)

---

### estimatePaymasterTransactionFee

▸ **estimatePaymasterTransactionFee**(`calls`, `paymasterDetails`): `Promise`\<[`PaymasterFeeEstimate`](../modules.md#paymasterfeeestimate)\>

Estimate fees for a paymaster-sponsored transaction

#### Parameters

| Name               | Type                                                    | Description                                                                                                                                                                       |
| :----------------- | :------------------------------------------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `calls`            | [`Call`](../modules.md#call)[]                          | Array of calls to be sponsored - .contractAddress - Target contract address - .entrypoint - Function to invoke - .calldata - Function parameters                                  |
| `paymasterDetails` | [`PaymasterDetails`](../interfaces/PaymasterDetails.md) | Paymaster configuration - .feeMode - Sponsorship mode: 'sponsored' or gas token - .deploymentData - Account deployment data if needed - .timeBounds - Valid execution time window |

#### Returns

`Promise`\<[`PaymasterFeeEstimate`](../modules.md#paymasterfeeestimate)\>

Fee estimates in both STRK and gas token

**`Example`**

```typescript
const fees = await account.estimatePaymasterTransactionFee(
  [{ contractAddress, entrypoint, calldata }],
  { feeMode: { mode: 'sponsored' } }
);
```

#### Defined in

[src/account/interface.ts:269](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/account/interface.ts#L269)

---

### buildPaymasterTransaction

▸ **buildPaymasterTransaction**(`calls`, `paymasterDetails`): `Promise`\<[`PreparedTransaction`](../modules.md#preparedtransaction)\>

Estimate fees for a paymaster-sponsored transaction

#### Parameters

| Name               | Type                                                    | Description                                                                                                                                                                       |
| :----------------- | :------------------------------------------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `calls`            | [`Call`](../modules.md#call)[]                          | Array of calls to be sponsored - .contractAddress - Target contract address - .entrypoint - Function to invoke - .calldata - Function parameters                                  |
| `paymasterDetails` | [`PaymasterDetails`](../interfaces/PaymasterDetails.md) | Paymaster configuration - .feeMode - Sponsorship mode: 'sponsored' or gas token - .deploymentData - Account deployment data if needed - .timeBounds - Valid execution time window |

#### Returns

`Promise`\<[`PreparedTransaction`](../modules.md#preparedtransaction)\>

Prepared transaction with typed data for signing

Fee estimates in both STRK and gas token

**`Example`**

```typescript
const prepared = await account.buildPaymasterTransaction(calls, {
  feeMode: { mode: 'default', gasToken: ETH_ADDRESS },
});
```

#### Defined in

[src/account/interface.ts:290](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/account/interface.ts#L290)

---

### executePaymasterTransaction

▸ **executePaymasterTransaction**(`calls`, `paymasterDetails`, `maxFeeInGasToken?`): `Promise`\<\{ `transaction_hash`: `string` }\>

Execute a paymaster-sponsored transaction

#### Parameters

| Name                | Type                                                    | Description                                                                                                                                                                    |
| :------------------ | :------------------------------------------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `calls`             | [`Call`](../modules.md#call)[]                          | Array of calls to execute                                                                                                                                                      |
| `paymasterDetails`  | [`PaymasterDetails`](../interfaces/PaymasterDetails.md) | Paymaster configuration - .feeMode - 'sponsored' or gas token payment - .deploymentData - Deploy account if needed - .timeBounds - Execution validity window (UNIX timestamps) |
| `maxFeeInGasToken?` | [`BigNumberish`](../modules.md#bignumberish)            | Maximum acceptable fee in gas token                                                                                                                                            |

#### Returns

`Promise`\<\{ `transaction_hash`: `string` }\>

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

#### Defined in

[src/account/interface.ts:318](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/account/interface.ts#L318)

---

### declare

▸ **declare**(`contractPayload`, `transactionsDetail?`): `Promise`\<\{ `class_hash`: `string` ; `transaction_hash`: `string` }\>

Execute one or multiple calls through the account contract

#### Parameters

| Name                  | Type                                                             | Description                                                                                                                                                                                                                                      |
| :-------------------- | :--------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `contractPayload`     | [`DeclareContractPayload`](../modules.md#declarecontractpayload) | Single call or array of calls to execute - .contractAddress - Target contract address - .entrypoint - Function to invoke on the contract - .calldata - Function parameters                                                                       |
| `transactionsDetail?` | [`InvocationsDetails`](../modules.md#invocationsdetails)         | Transaction execution options - .nonce - Override account nonce - .maxFee - Maximum fee for v1/v2 transactions - .resourceBounds - Resource limits for v3 transactions - .tip - Priority fee tip - .version - Force specific transaction version |

#### Returns

`Promise`\<\{ `class_hash`: `string` ; `transaction_hash`: `string` }\>

Declaration transaction hash and class hash

Transaction hash and response

**`Example`**

```typescript
const declareResult = await account.declare({
  contract: compiledSierra,
  casm: compiledCasm,
});
```

#### Defined in

[src/account/interface.ts:346](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/account/interface.ts#L346)

---

### deploy

▸ **deploy**(`payload`, `details?`): `Promise`\<[`MultiDeployContractResponse`](../modules.md#multideploycontractresponse)\>

Execute one or multiple calls through the account contract

#### Parameters

| Name       | Type                                                                                                                                                                           | Description                                                                                                                                                                                                                                      |
| :--------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `payload`  | [`UniversalDeployerContractPayload`](../modules.md#universaldeployercontractpayload) \| [`UniversalDeployerContractPayload`](../modules.md#universaldeployercontractpayload)[] | Single call or array of calls to execute - .contractAddress - Target contract address - .entrypoint - Function to invoke on the contract - .calldata - Function parameters                                                                       |
| `details?` | [`InvocationsDetails`](../modules.md#invocationsdetails)                                                                                                                       | Transaction execution options - .nonce - Override account nonce - .maxFee - Maximum fee for v1/v2 transactions - .resourceBounds - Resource limits for v3 transactions - .tip - Priority fee tip - .version - Force specific transaction version |

#### Returns

`Promise`\<[`MultiDeployContractResponse`](../modules.md#multideploycontractresponse)\>

Deployed contract addresses and transaction hash

Transaction hash and response

**`Example`**

```typescript
const deployment = await account.deploy([
  { classHash: erc20ClassHash, constructorCalldata: [name, symbol] },
  { classHash: nftClassHash, unique: true },
]);
```

#### Defined in

[src/account/interface.ts:372](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/account/interface.ts#L372)

---

### deployContract

▸ **deployContract**(`payload`, `details?`): `Promise`\<[`DeployContractUDCResponse`](../modules.md#deploycontractudcresponse)\>

Execute one or multiple calls through the account contract

#### Parameters

| Name       | Type                                                                                                                                                                           | Description                                                                                                                                                                                                                                      |
| :--------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `payload`  | [`UniversalDeployerContractPayload`](../modules.md#universaldeployercontractpayload) \| [`UniversalDeployerContractPayload`](../modules.md#universaldeployercontractpayload)[] | Single call or array of calls to execute - .contractAddress - Target contract address - .entrypoint - Function to invoke on the contract - .calldata - Function parameters                                                                       |
| `details?` | [`InvocationsDetails`](../modules.md#invocationsdetails)                                                                                                                       | Transaction execution options - .nonce - Override account nonce - .maxFee - Maximum fee for v1/v2 transactions - .resourceBounds - Resource limits for v3 transactions - .tip - Priority fee tip - .version - Force specific transaction version |

#### Returns

`Promise`\<[`DeployContractUDCResponse`](../modules.md#deploycontractudcresponse)\>

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

#### Defined in

[src/account/interface.ts:398](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/account/interface.ts#L398)

---

### declareAndDeploy

▸ **declareAndDeploy**(`payload`, `details?`): `Promise`\<[`DeclareDeployUDCResponse`](../modules.md#declaredeployudcresponse)\>

Execute one or multiple calls through the account contract

#### Parameters

| Name       | Type                                                                               | Description                                                                                                                                                                                                                                      |
| :--------- | :--------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `payload`  | [`DeclareAndDeployContractPayload`](../modules.md#declareanddeploycontractpayload) | Single call or array of calls to execute - .contractAddress - Target contract address - .entrypoint - Function to invoke on the contract - .calldata - Function parameters                                                                       |
| `details?` | [`InvocationsDetails`](../modules.md#invocationsdetails)                           | Transaction execution options - .nonce - Override account nonce - .maxFee - Maximum fee for v1/v2 transactions - .resourceBounds - Resource limits for v3 transactions - .tip - Priority fee tip - .version - Force specific transaction version |

#### Returns

`Promise`\<[`DeclareDeployUDCResponse`](../modules.md#declaredeployudcresponse)\>

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

#### Defined in

[src/account/interface.ts:432](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/account/interface.ts#L432)

---

### deployAccount

▸ **deployAccount**(`contractPayload`, `transactionsDetail?`): `Promise`\<[`DeployContractResponse`](../interfaces/DeployContractResponse.md)\>

Execute one or multiple calls through the account contract

#### Parameters

| Name                  | Type                                                                         | Description                                                                                                                                                                                                                                      |
| :-------------------- | :--------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `contractPayload`     | [`DeployAccountContractPayload`](../modules.md#deployaccountcontractpayload) | Single call or array of calls to execute - .contractAddress - Target contract address - .entrypoint - Function to invoke on the contract - .calldata - Function parameters                                                                       |
| `transactionsDetail?` | [`InvocationsDetails`](../modules.md#invocationsdetails)                     | Transaction execution options - .nonce - Override account nonce - .maxFee - Maximum fee for v1/v2 transactions - .resourceBounds - Resource limits for v3 transactions - .tip - Priority fee tip - .version - Force specific transaction version |

#### Returns

`Promise`\<[`DeployContractResponse`](../interfaces/DeployContractResponse.md)\>

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

#### Defined in

[src/account/interface.ts:461](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/account/interface.ts#L461)

---

### signMessage

▸ **signMessage**(`typedData`): `Promise`\<[`Signature`](../modules.md#signature)\>

Sign a typed data message for off-chain verification

#### Parameters

| Name        | Type                                                                | Description                        |
| :---------- | :------------------------------------------------------------------ | :--------------------------------- |
| `typedData` | [`TypedData`](../interfaces/RPC.RPCSPEC010.WALLET_API.TypedData.md) | EIP-712 style typed data structure |

#### Returns

`Promise`\<[`Signature`](../modules.md#signature)\>

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

#### Defined in

[src/account/interface.ts:485](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/account/interface.ts#L485)

---

### hashMessage

▸ **hashMessage**(`typedData`): `Promise`\<`string`\>

Hash a typed data message using Pedersen hash

#### Parameters

| Name        | Type                                                                | Description                        |
| :---------- | :------------------------------------------------------------------ | :--------------------------------- |
| `typedData` | [`TypedData`](../interfaces/RPC.RPCSPEC010.WALLET_API.TypedData.md) | EIP-712 style typed data structure |

#### Returns

`Promise`\<`string`\>

Message hash as hex string

**`Remarks`**

- Uses Pedersen hash function (not Keccak)
- Includes domain separation
- Result can be used for signature verification

**`Example`**

```typescript
const messageHash = await account.hashMessage(typedData);
```

#### Defined in

[src/account/interface.ts:501](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/account/interface.ts#L501)

---

### getNonce

▸ **getNonce**(`blockIdentifier?`): `Promise`\<`string`\>

Get the current nonce of the account

#### Parameters

| Name               | Type                                               | Description                                     |
| :----------------- | :------------------------------------------------- | :---------------------------------------------- |
| `blockIdentifier?` | [`BlockIdentifier`](../modules.md#blockidentifier) | Block to query nonce at (default: 'latest' tag) |

#### Returns

`Promise`\<`string`\>

Account nonce as hex string

**`Example`**

```typescript
const nonce = await account.getNonce();
const historicalNonce = await account.getNonce('latest');
```

#### Defined in

[src/account/interface.ts:514](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/account/interface.ts#L514)

---

### declareIfNot

▸ **declareIfNot**(`contractPayload`, `transactionsDetail?`): `Promise`\<\{ `class_hash`: `string` ; `transaction_hash`: `string` }\>

Declare a contract class if not already declared

#### Parameters

| Name                  | Type                                                             | Description                   |
| :-------------------- | :--------------------------------------------------------------- | :---------------------------- |
| `contractPayload`     | [`DeclareContractPayload`](../modules.md#declarecontractpayload) | Contract declaration payload  |
| `transactionsDetail?` | [`InvocationsDetails`](../modules.md#invocationsdetails)         | Transaction execution options |

#### Returns

`Promise`\<\{ `class_hash`: `string` ; `transaction_hash`: `string` }\>

Declaration result (with empty transaction_hash if already declared)

**`Example`**

```typescript
const result = await account.declareIfNot({
  contract: compiledContract,
  casm: compiledCasm,
});
```

#### Defined in

[src/account/interface.ts:530](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/account/interface.ts#L530)

---

### getChainId

▸ **getChainId**(): `Promise`\<`"0x534e5f4d41494e"` \| `"0x534e5f5345504f4c4941"`\>

Gets the Starknet chain Id

#### Returns

`Promise`\<`"0x534e5f4d41494e"` \| `"0x534e5f5345504f4c4941"`\>

the chain Id

#### Inherited from

[ProviderInterface](ProviderInterface.md).[getChainId](ProviderInterface.md#getchainid)

#### Defined in

[src/provider/interface.ts:56](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/provider/interface.ts#L56)

---

### callContract

▸ **callContract**(`call`, `blockIdentifier?`): `Promise`\<[`CallContractResponse`](../modules.md#callcontractresponse)\>

Calls a function on the Starknet contract.

#### Parameters

| Name               | Type                                               | Description              |
| :----------------- | :------------------------------------------------- | :----------------------- |
| `call`             | [`Call`](../modules.md#call)                       | transaction to be called |
| `blockIdentifier?` | [`BlockIdentifier`](../modules.md#blockidentifier) | block identifier         |

#### Returns

`Promise`\<[`CallContractResponse`](../modules.md#callcontractresponse)\>

the result of the function on the smart contract.

#### Inherited from

[ProviderInterface](ProviderInterface.md).[callContract](ProviderInterface.md#callcontract)

#### Defined in

[src/provider/interface.ts:65](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/provider/interface.ts#L65)

---

### getBlock

▸ **getBlock**(): `Promise`\<\{ `transactions`: `string`[] ; `block_number`: `number` ; `timestamp`: `number` ; `sequencer_address`: `string` ; `l1_gas_price`: [`RESOURCE_PRICE`](../namespaces/RPC.RPCSPEC010.API.md#resource_price) ; `l2_gas_price`: [`RESOURCE_PRICE`](../namespaces/RPC.RPCSPEC010.API.md#resource_price) ; `l1_data_gas_price`: [`RESOURCE_PRICE`](../namespaces/RPC.RPCSPEC010.API.md#resource_price) ; `l1_da_mode`: [`L1_DA_MODE`](../namespaces/RPC.RPCSPEC010.API.md#l1_da_mode) ; `starknet_version`: `string` }\>

Gets the block information

#### Returns

`Promise`\<\{ `transactions`: `string`[] ; `block_number`: `number` ; `timestamp`: `number` ; `sequencer_address`: `string` ; `l1_gas_price`: [`RESOURCE_PRICE`](../namespaces/RPC.RPCSPEC010.API.md#resource_price) ; `l2_gas_price`: [`RESOURCE_PRICE`](../namespaces/RPC.RPCSPEC010.API.md#resource_price) ; `l1_data_gas_price`: [`RESOURCE_PRICE`](../namespaces/RPC.RPCSPEC010.API.md#resource_price) ; `l1_da_mode`: [`L1_DA_MODE`](../namespaces/RPC.RPCSPEC010.API.md#l1_da_mode) ; `starknet_version`: `string` }\>

the block object

#### Inherited from

[ProviderInterface](ProviderInterface.md).[getBlock](ProviderInterface.md#getblock)

#### Defined in

[src/provider/interface.ts:75](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/provider/interface.ts#L75)

▸ **getBlock**(`blockIdentifier`): `Promise`\<\{ `transactions`: `string`[] ; `block_number`: `number` ; `timestamp`: `number` ; `sequencer_address`: `string` ; `l1_gas_price`: [`RESOURCE_PRICE`](../namespaces/RPC.RPCSPEC010.API.md#resource_price) ; `l2_gas_price`: [`RESOURCE_PRICE`](../namespaces/RPC.RPCSPEC010.API.md#resource_price) ; `l1_data_gas_price`: [`RESOURCE_PRICE`](../namespaces/RPC.RPCSPEC010.API.md#resource_price) ; `l1_da_mode`: [`L1_DA_MODE`](../namespaces/RPC.RPCSPEC010.API.md#l1_da_mode) ; `starknet_version`: `string` }\>

#### Parameters

| Name              | Type              |
| :---------------- | :---------------- |
| `blockIdentifier` | `"pre_confirmed"` |

#### Returns

`Promise`\<\{ `transactions`: `string`[] ; `block_number`: `number` ; `timestamp`: `number` ; `sequencer_address`: `string` ; `l1_gas_price`: [`RESOURCE_PRICE`](../namespaces/RPC.RPCSPEC010.API.md#resource_price) ; `l2_gas_price`: [`RESOURCE_PRICE`](../namespaces/RPC.RPCSPEC010.API.md#resource_price) ; `l1_data_gas_price`: [`RESOURCE_PRICE`](../namespaces/RPC.RPCSPEC010.API.md#resource_price) ; `l1_da_mode`: [`L1_DA_MODE`](../namespaces/RPC.RPCSPEC010.API.md#l1_da_mode) ; `starknet_version`: `string` }\>

#### Inherited from

[ProviderInterface](ProviderInterface.md).[getBlock](ProviderInterface.md#getblock)

#### Defined in

[src/provider/interface.ts:76](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/provider/interface.ts#L76)

▸ **getBlock**(`blockIdentifier`): `Promise`\<\{ `status`: [`EBlockStatus`](../namespaces/RPC.RPCSPEC010.API.md#eblockstatus) ; `block_hash`: `string` ; `parent_hash`: `string` ; `block_number`: `number` ; `new_root`: `string` ; `timestamp`: `number` ; `sequencer_address`: `string` ; `l1_gas_price`: [`RESOURCE_PRICE`](../namespaces/RPC.RPCSPEC010.API.md#resource_price) ; `l2_gas_price`: [`RESOURCE_PRICE`](../namespaces/RPC.RPCSPEC010.API.md#resource_price) ; `l1_data_gas_price`: [`RESOURCE_PRICE`](../namespaces/RPC.RPCSPEC010.API.md#resource_price) ; `l1_da_mode`: [`L1_DA_MODE`](../namespaces/RPC.RPCSPEC010.API.md#l1_da_mode) ; `starknet_version`: `string` ; `event_commitment`: `string` ; `transaction_commitment`: `string` ; `receipt_commitment`: `string` ; `state_diff_commitment`: `string` ; `event_count`: `number` ; `transaction_count`: `number` ; `state_diff_length`: `number` ; `transactions`: `string`[] }\>

#### Parameters

| Name              | Type       |
| :---------------- | :--------- |
| `blockIdentifier` | `"latest"` |

#### Returns

`Promise`\<\{ `status`: [`EBlockStatus`](../namespaces/RPC.RPCSPEC010.API.md#eblockstatus) ; `block_hash`: `string` ; `parent_hash`: `string` ; `block_number`: `number` ; `new_root`: `string` ; `timestamp`: `number` ; `sequencer_address`: `string` ; `l1_gas_price`: [`RESOURCE_PRICE`](../namespaces/RPC.RPCSPEC010.API.md#resource_price) ; `l2_gas_price`: [`RESOURCE_PRICE`](../namespaces/RPC.RPCSPEC010.API.md#resource_price) ; `l1_data_gas_price`: [`RESOURCE_PRICE`](../namespaces/RPC.RPCSPEC010.API.md#resource_price) ; `l1_da_mode`: [`L1_DA_MODE`](../namespaces/RPC.RPCSPEC010.API.md#l1_da_mode) ; `starknet_version`: `string` ; `event_commitment`: `string` ; `transaction_commitment`: `string` ; `receipt_commitment`: `string` ; `state_diff_commitment`: `string` ; `event_count`: `number` ; `transaction_count`: `number` ; `state_diff_length`: `number` ; `transactions`: `string`[] }\>

#### Inherited from

[ProviderInterface](ProviderInterface.md).[getBlock](ProviderInterface.md#getblock)

#### Defined in

[src/provider/interface.ts:77](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/provider/interface.ts#L77)

▸ **getBlock**(`blockIdentifier`): `Promise`\<[`GetBlockResponse`](../modules.md#getblockresponse)\>

#### Parameters

| Name              | Type                                               |
| :---------------- | :------------------------------------------------- |
| `blockIdentifier` | [`BlockIdentifier`](../modules.md#blockidentifier) |

#### Returns

`Promise`\<[`GetBlockResponse`](../modules.md#getblockresponse)\>

#### Inherited from

[ProviderInterface](ProviderInterface.md).[getBlock](ProviderInterface.md#getblock)

#### Defined in

[src/provider/interface.ts:78](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/provider/interface.ts#L78)

---

### getClassAt

▸ **getClassAt**(`contractAddress`, `blockIdentifier?`): `Promise`\<[`ContractClassResponse`](../modules.md#contractclassresponse)\>

Gets the contract class of the deployed contract.

#### Parameters

| Name               | Type                                               | Description      |
| :----------------- | :------------------------------------------------- | :--------------- |
| `contractAddress`  | [`BigNumberish`](../modules.md#bignumberish)       | contract address |
| `blockIdentifier?` | [`BlockIdentifier`](../modules.md#blockidentifier) | block identifier |

#### Returns

`Promise`\<[`ContractClassResponse`](../modules.md#contractclassresponse)\>

Contract class of compiled contract

#### Inherited from

[ProviderInterface](ProviderInterface.md).[getClassAt](ProviderInterface.md#getclassat)

#### Defined in

[src/provider/interface.ts:87](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/provider/interface.ts#L87)

---

### getL1GasPrice

▸ **getL1GasPrice**(`blockIdentifier?`): `Promise`\<`string`\>

Gets the price of l1 gas in the block

#### Parameters

| Name               | Type                                               | Description      |
| :----------------- | :------------------------------------------------- | :--------------- |
| `blockIdentifier?` | [`BlockIdentifier`](../modules.md#blockidentifier) | block identifier |

#### Returns

`Promise`\<`string`\>

gas price of the block

#### Inherited from

[ProviderInterface](ProviderInterface.md).[getL1GasPrice](ProviderInterface.md#getl1gasprice)

#### Defined in

[src/provider/interface.ts:98](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/provider/interface.ts#L98)

---

### getL1MessageHash

▸ **getL1MessageHash**(`l2TxHash`): `Promise`\<`string`\>

Get L1 message hash from L2 transaction hash

#### Parameters

| Name       | Type                                         | Description         |
| :--------- | :------------------------------------------- | :------------------ |
| `l2TxHash` | [`BigNumberish`](../modules.md#bignumberish) | L2 transaction hash |

#### Returns

`Promise`\<`string`\>

Hex string of L1 message hash

**`Example`**

In Sepolia Testnet :

```typescript
const result = provider.getL1MessageHash(
  '0x28dfc05eb4f261b37ddad451ff22f1d08d4e3c24dc646af0ec69fa20e096819'
);
// result = '0x55b3f8b6e607fffd9b4d843dfe8f9b5c05822cd94fcad8797deb01d77805532a'
```

#### Inherited from

[ProviderInterface](ProviderInterface.md).[getL1MessageHash](ProviderInterface.md#getl1messagehash)

#### Defined in

[src/provider/interface.ts:111](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/provider/interface.ts#L111)

---

### getClassHashAt

▸ **getClassHashAt**(`contractAddress`, `blockIdentifier?`): `Promise`\<`string`\>

Returns the contract class hash in the given block for the contract deployed at the given address

#### Parameters

| Name               | Type                                               | Description      |
| :----------------- | :------------------------------------------------- | :--------------- |
| `contractAddress`  | [`BigNumberish`](../modules.md#bignumberish)       | contract address |
| `blockIdentifier?` | [`BlockIdentifier`](../modules.md#blockidentifier) | block identifier |

#### Returns

`Promise`\<`string`\>

Class hash

#### Inherited from

[ProviderInterface](ProviderInterface.md).[getClassHashAt](ProviderInterface.md#getclasshashat)

#### Defined in

[src/provider/interface.ts:120](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/provider/interface.ts#L120)

---

### getClassByHash

▸ **getClassByHash**(`classHash`): `Promise`\<[`ContractClassResponse`](../modules.md#contractclassresponse)\>

Returns the contract class deployed under the given class hash.

#### Parameters

| Name        | Type                                         | Description |
| :---------- | :------------------------------------------- | :---------- |
| `classHash` | [`BigNumberish`](../modules.md#bignumberish) | class hash  |

#### Returns

`Promise`\<[`ContractClassResponse`](../modules.md#contractclassresponse)\>

Contract class of compiled contract

#### Inherited from

[ProviderInterface](ProviderInterface.md).[getClassByHash](ProviderInterface.md#getclassbyhash)

#### Defined in

[src/provider/interface.ts:131](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/provider/interface.ts#L131)

---

### getNonceForAddress

▸ **getNonceForAddress**(`contractAddress`, `blockIdentifier?`): `Promise`\<`string`\>

Returns the nonce associated with the given address in the given block

#### Parameters

| Name               | Type                                               | Description      |
| :----------------- | :------------------------------------------------- | :--------------- |
| `contractAddress`  | [`BigNumberish`](../modules.md#bignumberish)       | contract address |
| `blockIdentifier?` | [`BlockIdentifier`](../modules.md#blockidentifier) | -                |

#### Returns

`Promise`\<`string`\>

the hex nonce

#### Inherited from

[ProviderInterface](ProviderInterface.md).[getNonceForAddress](ProviderInterface.md#getnonceforaddress)

#### Defined in

[src/provider/interface.ts:139](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/provider/interface.ts#L139)

---

### getStorageAt

▸ **getStorageAt**(`contractAddress`, `key`, `blockIdentifier?`): `Promise`\<`string`\>

Get the value of the storage (contract's variable) at the given address and key

#### Parameters

| Name               | Type                                               | Description                                                 |
| :----------------- | :------------------------------------------------- | :---------------------------------------------------------- |
| `contractAddress`  | [`BigNumberish`](../modules.md#bignumberish)       |                                                             |
| `key`              | [`BigNumberish`](../modules.md#bignumberish)       | from getStorageVarAddress('\<STORAGE_VARIABLE_NAME>') (WIP) |
| `blockIdentifier?` | [`BlockIdentifier`](../modules.md#blockidentifier) | block identifier                                            |

#### Returns

`Promise`\<`string`\>

the value of the storage variable

#### Inherited from

[ProviderInterface](ProviderInterface.md).[getStorageAt](ProviderInterface.md#getstorageat)

#### Defined in

[src/provider/interface.ts:152](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/provider/interface.ts#L152)

---

### getTransaction

▸ **getTransaction**(`transactionHash`): `Promise`\<[`TransactionWithHash`](../modules.md#transactionwithhash)\>

Gets the transaction information from a tx id.

#### Parameters

| Name              | Type                                         |
| :---------------- | :------------------------------------------- |
| `transactionHash` | [`BigNumberish`](../modules.md#bignumberish) |

#### Returns

`Promise`\<[`TransactionWithHash`](../modules.md#transactionwithhash)\>

the transaction object `{ transaction_id, status, transaction, block_number?, block_number?, transaction_index?, transaction_failure_reason? }`

#### Inherited from

[ProviderInterface](ProviderInterface.md).[getTransaction](ProviderInterface.md#gettransaction)

#### Defined in

[src/provider/interface.ts:164](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/provider/interface.ts#L164)

---

### getTransactionReceipt

▸ **getTransactionReceipt**(`transactionHash`): `Promise`\<[`GetTransactionReceiptResponse`](../modules.md#gettransactionreceiptresponse)\>

Gets the transaction receipt from a tx hash.

#### Parameters

| Name              | Type                                         |
| :---------------- | :------------------------------------------- |
| `transactionHash` | [`BigNumberish`](../modules.md#bignumberish) |

#### Returns

`Promise`\<[`GetTransactionReceiptResponse`](../modules.md#gettransactionreceiptresponse)\>

the transaction receipt object

#### Inherited from

[ProviderInterface](ProviderInterface.md).[getTransactionReceipt](ProviderInterface.md#gettransactionreceipt)

#### Defined in

[src/provider/interface.ts:172](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/provider/interface.ts#L172)

---

### deployAccountContract

▸ **deployAccountContract**(`payload`, `details`): `Promise`\<[`DeployContractResponse`](../interfaces/DeployContractResponse.md)\>

Deploys a given compiled Account contract (json) to starknet

#### Parameters

| Name      | Type                                                                         | Description                                                                                       |
| :-------- | :--------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------ |
| `payload` | [`DeployAccountContractPayload`](../modules.md#deployaccountcontractpayload) | payload to be deployed containing: - compiled contract code - constructor calldata - address salt |
| `details` | [`InvocationsDetailsWithNonce`](../modules.md#invocationsdetailswithnonce)   | -                                                                                                 |

#### Returns

`Promise`\<[`DeployContractResponse`](../interfaces/DeployContractResponse.md)\>

a confirmation of sending a transaction on the starknet contract

#### Inherited from

[ProviderInterface](ProviderInterface.md).[deployAccountContract](ProviderInterface.md#deployaccountcontract)

#### Defined in

[src/provider/interface.ts:185](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/provider/interface.ts#L185)

---

### invokeFunction

▸ **invokeFunction**(`invocation`, `details`): `Promise`\<\{ `transaction_hash`: `string` }\>

Invokes a function on starknet

#### Parameters

| Name         | Type                                                                       | Description                                                                                                                                                                                                                                            |
| :----------- | :------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `invocation` | [`Invocation`](../modules.md#invocation)                                   | the invocation object containing: - contractAddress - the address of the contract - entrypoint - (optional) the entrypoint of the contract - calldata - (optional, defaults to []) the calldata - signature - (optional, defaults to []) the signature |
| `details`    | [`InvocationsDetailsWithNonce`](../modules.md#invocationsdetailswithnonce) | optional details containing: - nonce - optional nonce - version - optional version - maxFee - optional maxFee                                                                                                                                          |

#### Returns

`Promise`\<\{ `transaction_hash`: `string` }\>

response from addTransaction

#### Inherited from

[ProviderInterface](ProviderInterface.md).[invokeFunction](ProviderInterface.md#invokefunction)

#### Defined in

[src/provider/interface.ts:204](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/provider/interface.ts#L204)

---

### declareContract

▸ **declareContract**(`transaction`, `details`): `Promise`\<\{ `class_hash`: `string` ; `transaction_hash`: `string` }\>

Declares a given compiled contract (json) to starknet

#### Parameters

| Name          | Type                                                                       | Description                                                                                          |
| :------------ | :------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------- |
| `transaction` | [`DeclareContractTransaction`](../modules.md#declarecontracttransaction)   | transaction payload to be deployed containing: - compiled contract code - sender address - signature |
| `details`     | [`InvocationsDetailsWithNonce`](../modules.md#invocationsdetailswithnonce) | Invocation Details containing: - nonce - optional version - optional maxFee                          |

#### Returns

`Promise`\<\{ `class_hash`: `string` ; `transaction_hash`: `string` }\>

a confirmation of sending a transaction on the starknet contract

#### Inherited from

[ProviderInterface](ProviderInterface.md).[declareContract](ProviderInterface.md#declarecontract)

#### Defined in

[src/provider/interface.ts:221](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/provider/interface.ts#L221)

---

### getInvokeEstimateFee

▸ **getInvokeEstimateFee**(`invocation`, `details`, `blockIdentifier?`, `skipValidate?`): `Promise`\<[`EstimateFeeResponseOverhead`](../modules.md#estimatefeeresponseoverhead)\>

Estimates the fee for a given INVOKE transaction

#### Parameters

| Name               | Type                                                                       | Description                                                                                                                                                                                                                                            |
| :----------------- | :------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `invocation`       | [`Invocation`](../modules.md#invocation)                                   | the invocation object containing: - contractAddress - the address of the contract - entrypoint - (optional) the entrypoint of the contract - calldata - (optional, defaults to []) the calldata - signature - (optional, defaults to []) the signature |
| `details`          | [`InvocationsDetailsWithNonce`](../modules.md#invocationsdetailswithnonce) | optional details containing: - nonce - optional nonce - version - optional version                                                                                                                                                                     |
| `blockIdentifier?` | [`BlockIdentifier`](../modules.md#blockidentifier)                         | (optional) block identifier                                                                                                                                                                                                                            |
| `skipValidate?`    | `boolean`                                                                  | (optional) skip cairo **validate** method                                                                                                                                                                                                              |

#### Returns

`Promise`\<[`EstimateFeeResponseOverhead`](../modules.md#estimatefeeresponseoverhead)\>

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

#### Inherited from

[ProviderInterface](ProviderInterface.md).[getInvokeEstimateFee](ProviderInterface.md#getinvokeestimatefee)

#### Defined in

[src/provider/interface.ts:249](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/provider/interface.ts#L249)

---

### getDeclareEstimateFee

▸ **getDeclareEstimateFee**(`transaction`, `details`, `blockIdentifier?`, `skipValidate?`): `Promise`\<[`EstimateFeeResponseOverhead`](../modules.md#estimatefeeresponseoverhead)\>

Estimates the fee for a given DECLARE transaction

#### Parameters

| Name               | Type                                                                       | Description                                                                                                                           |
| :----------------- | :------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| `transaction`      | [`DeclareContractTransaction`](../modules.md#declarecontracttransaction)   | transaction payload to be declared containing: - compiled contract code - sender address - signature - (defaults to []) the signature |
| `details`          | [`InvocationsDetailsWithNonce`](../modules.md#invocationsdetailswithnonce) | optional details containing: - nonce - version - optional version - optional maxFee                                                   |
| `blockIdentifier?` | [`BlockIdentifier`](../modules.md#blockidentifier)                         | (optional) block identifier                                                                                                           |
| `skipValidate?`    | `boolean`                                                                  | (optional) skip cairo **validate** method                                                                                             |

#### Returns

`Promise`\<[`EstimateFeeResponseOverhead`](../modules.md#estimatefeeresponseoverhead)\>

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

#### Inherited from

[ProviderInterface](ProviderInterface.md).[getDeclareEstimateFee](ProviderInterface.md#getdeclareestimatefee)

#### Defined in

[src/provider/interface.ts:279](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/provider/interface.ts#L279)

---

### getDeployAccountEstimateFee

▸ **getDeployAccountEstimateFee**(`transaction`, `details`, `blockIdentifier?`, `skipValidate?`): `Promise`\<[`EstimateFeeResponseOverhead`](../modules.md#estimatefeeresponseoverhead)\>

Estimates the fee for a given DEPLOY_ACCOUNT transaction

#### Parameters

| Name               | Type                                                                                 | Description                                                                                                                                 |
| :----------------- | :----------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------ |
| `transaction`      | [`DeployAccountContractTransaction`](../modules.md#deployaccountcontracttransaction) | transaction payload to be deployed containing: - classHash - constructorCalldata - addressSalt - signature - (defaults to []) the signature |
| `details`          | [`InvocationsDetailsWithNonce`](../modules.md#invocationsdetailswithnonce)           | optional details containing: - nonce - version - optional version - optional maxFee                                                         |
| `blockIdentifier?` | [`BlockIdentifier`](../modules.md#blockidentifier)                                   | (optional) block identifier                                                                                                                 |
| `skipValidate?`    | `boolean`                                                                            | (optional) skip cairo **validate** method                                                                                                   |

#### Returns

`Promise`\<[`EstimateFeeResponseOverhead`](../modules.md#estimatefeeresponseoverhead)\>

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

#### Inherited from

[ProviderInterface](ProviderInterface.md).[getDeployAccountEstimateFee](ProviderInterface.md#getdeployaccountestimatefee)

#### Defined in

[src/provider/interface.ts:310](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/provider/interface.ts#L310)

---

### getEstimateFeeBulk

▸ **getEstimateFeeBulk**(`invocations`, `options?`): `Promise`\<[`EstimateFeeResponseBulkOverhead`](../modules.md#estimatefeeresponsebulkoverhead)\>

Estimates the fee for a list of INVOKE transaction

#### Parameters

| Name          | Type                                                                   | Description                                                              |
| :------------ | :--------------------------------------------------------------------- | :----------------------------------------------------------------------- |
| `invocations` | [`AccountInvocations`](../modules.md#accountinvocations)               | AccountInvocations - Complete invocations array with account details     |
| `options?`    | [`getEstimateFeeBulkOptions`](../modules.md#getestimatefeebulkoptions) | getEstimateFeeBulkOptions - (optional) blockIdentifier - BlockIdentifier |

#### Returns

`Promise`\<[`EstimateFeeResponseBulkOverhead`](../modules.md#estimatefeeresponsebulkoverhead)\>

the estimated fee

#### Inherited from

[ProviderInterface](ProviderInterface.md).[getEstimateFeeBulk](ProviderInterface.md#getestimatefeebulk)

#### Defined in

[src/provider/interface.ts:325](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/provider/interface.ts#L325)

---

### waitForTransaction

▸ **waitForTransaction**(`txHash`, `options?`): `Promise`\<[`GetTransactionReceiptResponse`](../modules.md#gettransactionreceiptresponse)\>

Wait for the transaction to be accepted

#### Parameters

| Name       | Type                                                                   | Description                                                                                                                              |
| :--------- | :--------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------- |
| `txHash`   | [`BigNumberish`](../modules.md#bignumberish)                           | transaction hash                                                                                                                         |
| `options?` | [`waitForTransactionOptions`](../modules.md#waitfortransactionoptions) | waitForTransactionOptions - (optional) retryInterval: number \| undefined; - (optional) successStates: TransactionStatus[] \| undefined; |

#### Returns

`Promise`\<[`GetTransactionReceiptResponse`](../modules.md#gettransactionreceiptresponse)\>

GetTransactionReceiptResponse

#### Inherited from

[ProviderInterface](ProviderInterface.md).[waitForTransaction](ProviderInterface.md#waitfortransaction)

#### Defined in

[src/provider/interface.ts:338](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/provider/interface.ts#L338)

---

### getSimulateTransaction

▸ **getSimulateTransaction**(`invocations`, `options?`): `Promise`\<[`SimulateTransactionOverheadResponse`](../modules.md#simulatetransactionoverheadresponse)\>

Simulates the transaction and returns the transaction trace and estimated fee.

#### Parameters

| Name          | Type                                                                           | Description                                                                                                                                                                                       |
| :------------ | :----------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `invocations` | [`AccountInvocations`](../modules.md#accountinvocations)                       | AccountInvocations - Complete invocations array with account details                                                                                                                              |
| `options?`    | [`getSimulateTransactionOptions`](../modules.md#getsimulatetransactionoptions) | getSimulateTransactionOptions - (optional) blockIdentifier - block identifier - (optional) skipValidate - skip cairo **validate** method - (optional) skipExecute - skip cairo **execute** method |

#### Returns

`Promise`\<[`SimulateTransactionOverheadResponse`](../modules.md#simulatetransactionoverheadresponse)\>

an array of transaction trace and estimated fee

#### Inherited from

[ProviderInterface](ProviderInterface.md).[getSimulateTransaction](ProviderInterface.md#getsimulatetransaction)

#### Defined in

[src/provider/interface.ts:353](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/provider/interface.ts#L353)

---

### getStateUpdate

▸ **getStateUpdate**(`blockIdentifier?`): `Promise`\<[`StateUpdateResponse`](../modules.md#stateupdateresponse)\>

Gets the state changes in a specific block (result of executing the requested block)

#### Parameters

| Name               | Type                                               | Description      |
| :----------------- | :------------------------------------------------- | :--------------- |
| `blockIdentifier?` | [`BlockIdentifier`](../modules.md#blockidentifier) | block identifier |

#### Returns

`Promise`\<[`StateUpdateResponse`](../modules.md#stateupdateresponse)\>

StateUpdateResponse

#### Inherited from

[ProviderInterface](ProviderInterface.md).[getStateUpdate](ProviderInterface.md#getstateupdate)

#### Defined in

[src/provider/interface.ts:364](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/provider/interface.ts#L364)

---

### getBlockStateUpdate

▸ **getBlockStateUpdate**(): `Promise`\<\{ `block_hash`: `string` ; `new_root`: `string` ; `old_root`: `string` ; `state_diff`: \{ `storage_diffs`: \{ `address`: `string` ; `storage_entries`: \{ `key`: `string` ; `value`: `string` }[] }[] ; `deprecated_declared_classes`: `string`[] ; `declared_classes`: \{ `class_hash`: `string` ; `compiled_class_hash`: `string` }[] ; `deployed_contracts`: \{ `address`: `string` ; `class_hash`: `string` }[] ; `replaced_classes`: \{ `contract_address`: `string` ; `class_hash`: `string` }[] ; `nonces`: \{ `nonce`: `string` ; `contract_address`: `string` }[] ; `migrated_compiled_classes`: `undefined` \| \{ `class_hash`: `string` ; `compiled_class_hash`: `string` }[] } }\>

Gets the state changes in a specific block (result of executing the requested block)
Alternative method name for getStateUpdate with specific overloads

#### Returns

`Promise`\<\{ `block_hash`: `string` ; `new_root`: `string` ; `old_root`: `string` ; `state_diff`: \{ `storage_diffs`: \{ `address`: `string` ; `storage_entries`: \{ `key`: `string` ; `value`: `string` }[] }[] ; `deprecated_declared_classes`: `string`[] ; `declared_classes`: \{ `class_hash`: `string` ; `compiled_class_hash`: `string` }[] ; `deployed_contracts`: \{ `address`: `string` ; `class_hash`: `string` }[] ; `replaced_classes`: \{ `contract_address`: `string` ; `class_hash`: `string` }[] ; `nonces`: \{ `nonce`: `string` ; `contract_address`: `string` }[] ; `migrated_compiled_classes`: `undefined` \| \{ `class_hash`: `string` ; `compiled_class_hash`: `string` }[] } }\>

StateUpdateResponse

#### Inherited from

[ProviderInterface](ProviderInterface.md).[getBlockStateUpdate](ProviderInterface.md#getblockstateupdate)

#### Defined in

[src/provider/interface.ts:372](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/provider/interface.ts#L372)

▸ **getBlockStateUpdate**(`blockIdentifier`): `Promise`\<\{ `block_hash`: `never` ; `state_diff`: \{ `storage_diffs`: \{ `address`: `string` ; `storage_entries`: \{ `key`: `string` ; `value`: `string` }[] }[] ; `deprecated_declared_classes`: `string`[] ; `declared_classes`: \{ `class_hash`: `string` ; `compiled_class_hash`: `string` }[] ; `deployed_contracts`: \{ `address`: `string` ; `class_hash`: `string` }[] ; `replaced_classes`: \{ `contract_address`: `string` ; `class_hash`: `string` }[] ; `nonces`: \{ `nonce`: `string` ; `contract_address`: `string` }[] ; `migrated_compiled_classes`: `undefined` \| \{ `class_hash`: `string` ; `compiled_class_hash`: `string` }[] } ; `old_root`: `undefined` \| `string` }\>

#### Parameters

| Name              | Type              |
| :---------------- | :---------------- |
| `blockIdentifier` | `"pre_confirmed"` |

#### Returns

`Promise`\<\{ `block_hash`: `never` ; `state_diff`: \{ `storage_diffs`: \{ `address`: `string` ; `storage_entries`: \{ `key`: `string` ; `value`: `string` }[] }[] ; `deprecated_declared_classes`: `string`[] ; `declared_classes`: \{ `class_hash`: `string` ; `compiled_class_hash`: `string` }[] ; `deployed_contracts`: \{ `address`: `string` ; `class_hash`: `string` }[] ; `replaced_classes`: \{ `contract_address`: `string` ; `class_hash`: `string` }[] ; `nonces`: \{ `nonce`: `string` ; `contract_address`: `string` }[] ; `migrated_compiled_classes`: `undefined` \| \{ `class_hash`: `string` ; `compiled_class_hash`: `string` }[] } ; `old_root`: `undefined` \| `string` }\>

#### Inherited from

[ProviderInterface](ProviderInterface.md).[getBlockStateUpdate](ProviderInterface.md#getblockstateupdate)

#### Defined in

[src/provider/interface.ts:373](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/provider/interface.ts#L373)

▸ **getBlockStateUpdate**(`blockIdentifier`): `Promise`\<\{ `block_hash`: `string` ; `new_root`: `string` ; `old_root`: `string` ; `state_diff`: \{ `storage_diffs`: \{ `address`: `string` ; `storage_entries`: \{ `key`: `string` ; `value`: `string` }[] }[] ; `deprecated_declared_classes`: `string`[] ; `declared_classes`: \{ `class_hash`: `string` ; `compiled_class_hash`: `string` }[] ; `deployed_contracts`: \{ `address`: `string` ; `class_hash`: `string` }[] ; `replaced_classes`: \{ `contract_address`: `string` ; `class_hash`: `string` }[] ; `nonces`: \{ `nonce`: `string` ; `contract_address`: `string` }[] ; `migrated_compiled_classes`: `undefined` \| \{ `class_hash`: `string` ; `compiled_class_hash`: `string` }[] } }\>

#### Parameters

| Name              | Type       |
| :---------------- | :--------- |
| `blockIdentifier` | `"latest"` |

#### Returns

`Promise`\<\{ `block_hash`: `string` ; `new_root`: `string` ; `old_root`: `string` ; `state_diff`: \{ `storage_diffs`: \{ `address`: `string` ; `storage_entries`: \{ `key`: `string` ; `value`: `string` }[] }[] ; `deprecated_declared_classes`: `string`[] ; `declared_classes`: \{ `class_hash`: `string` ; `compiled_class_hash`: `string` }[] ; `deployed_contracts`: \{ `address`: `string` ; `class_hash`: `string` }[] ; `replaced_classes`: \{ `contract_address`: `string` ; `class_hash`: `string` }[] ; `nonces`: \{ `nonce`: `string` ; `contract_address`: `string` }[] ; `migrated_compiled_classes`: `undefined` \| \{ `class_hash`: `string` ; `compiled_class_hash`: `string` }[] } }\>

#### Inherited from

[ProviderInterface](ProviderInterface.md).[getBlockStateUpdate](ProviderInterface.md#getblockstateupdate)

#### Defined in

[src/provider/interface.ts:376](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/provider/interface.ts#L376)

▸ **getBlockStateUpdate**(`blockIdentifier?`): `Promise`\<[`StateUpdateResponse`](../modules.md#stateupdateresponse)\>

#### Parameters

| Name               | Type                                               |
| :----------------- | :------------------------------------------------- |
| `blockIdentifier?` | [`BlockIdentifier`](../modules.md#blockidentifier) |

#### Returns

`Promise`\<[`StateUpdateResponse`](../modules.md#stateupdateresponse)\>

#### Inherited from

[ProviderInterface](ProviderInterface.md).[getBlockStateUpdate](ProviderInterface.md#getblockstateupdate)

#### Defined in

[src/provider/interface.ts:377](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/provider/interface.ts#L377)

---

### getContractVersion

▸ **getContractVersion**(`contractAddress`, `classHash?`, `options?`): `Promise`\<[`ContractVersion`](../modules.md#contractversion)\>

Gets the contract version from the provided address

#### Parameters

| Name              | Type                                                                   | Description                                                                                                                                                          |
| :---------------- | :--------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `contractAddress` | [`BigNumberish`](../modules.md#bignumberish)                           | string                                                                                                                                                               |
| `classHash?`      | `undefined`                                                            | undefined                                                                                                                                                            |
| `options?`        | [`getContractVersionOptions`](../modules.md#getcontractversionoptions) | getContractVersionOptions - (optional) compiler - (default true) extract compiler version using type tactic from abi - (optional) blockIdentifier - block identifier |

#### Returns

`Promise`\<[`ContractVersion`](../modules.md#contractversion)\>

#### Inherited from

[ProviderInterface](ProviderInterface.md).[getContractVersion](ProviderInterface.md#getcontractversion)

#### Defined in

[src/provider/interface.ts:389](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/provider/interface.ts#L389)

▸ **getContractVersion**(`contractAddress`, `classHash`, `options?`): `Promise`\<[`ContractVersion`](../modules.md#contractversion)\>

Gets the contract version from the provided address

#### Parameters

| Name              | Type                                                                   | Description                                                                                                                                                          |
| :---------------- | :--------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `contractAddress` | `undefined`                                                            | undefined                                                                                                                                                            |
| `classHash`       | [`BigNumberish`](../modules.md#bignumberish)                           |                                                                                                                                                                      |
| `options?`        | [`getContractVersionOptions`](../modules.md#getcontractversionoptions) | getContractVersionOptions - (optional) compiler - (default true) extract compiler version using type tactic from abi - (optional) blockIdentifier - block identifier |

#### Returns

`Promise`\<[`ContractVersion`](../modules.md#contractversion)\>

#### Inherited from

[ProviderInterface](ProviderInterface.md).[getContractVersion](ProviderInterface.md#getcontractversion)

#### Defined in

[src/provider/interface.ts:403](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/provider/interface.ts#L403)

---

### getBlockLatestAccepted

▸ **getBlockLatestAccepted**(): `Promise`\<\{ `block_hash`: `string` ; `block_number`: `number` }\>

Get the most recent accepted block hash and number

#### Returns

`Promise`\<\{ `block_hash`: `string` ; `block_number`: `number` }\>

Object containing block hash and number

#### Inherited from

[ProviderInterface](ProviderInterface.md).[getBlockLatestAccepted](ProviderInterface.md#getblocklatestaccepted)

#### Defined in

[src/provider/interface.ts:414](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/provider/interface.ts#L414)

---

### getBlockNumber

▸ **getBlockNumber**(): `Promise`\<`number`\>

Get the most recent accepted block number

#### Returns

`Promise`\<`number`\>

Number of the latest block

#### Inherited from

[ProviderInterface](ProviderInterface.md).[getBlockNumber](ProviderInterface.md#getblocknumber)

#### Defined in

[src/provider/interface.ts:420](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/provider/interface.ts#L420)

---

### getBlockWithTxHashes

▸ **getBlockWithTxHashes**(`blockIdentifier?`): `Promise`\<`any`\>

Get block information with transaction hashes

#### Parameters

| Name               | Type                                               | Description      |
| :----------------- | :------------------------------------------------- | :--------------- |
| `blockIdentifier?` | [`BlockIdentifier`](../modules.md#blockidentifier) | block identifier |

#### Returns

`Promise`\<`any`\>

Block with transaction hashes

#### Inherited from

[ProviderInterface](ProviderInterface.md).[getBlockWithTxHashes](ProviderInterface.md#getblockwithtxhashes)

#### Defined in

[src/provider/interface.ts:427](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/provider/interface.ts#L427)

---

### getBlockWithTxs

▸ **getBlockWithTxs**(`blockIdentifier?`): `Promise`\<`any`\>

Get block information with full transactions

#### Parameters

| Name               | Type                                               | Description      |
| :----------------- | :------------------------------------------------- | :--------------- |
| `blockIdentifier?` | [`BlockIdentifier`](../modules.md#blockidentifier) | block identifier |

#### Returns

`Promise`\<`any`\>

Block with full transactions

#### Inherited from

[ProviderInterface](ProviderInterface.md).[getBlockWithTxs](ProviderInterface.md#getblockwithtxs)

#### Defined in

[src/provider/interface.ts:434](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/provider/interface.ts#L434)

---

### getBlockWithReceipts

▸ **getBlockWithReceipts**(`blockIdentifier?`): `Promise`\<`any`\>

Get block information with transaction receipts

#### Parameters

| Name               | Type                                               | Description      |
| :----------------- | :------------------------------------------------- | :--------------- |
| `blockIdentifier?` | [`BlockIdentifier`](../modules.md#blockidentifier) | block identifier |

#### Returns

`Promise`\<`any`\>

Block with transaction receipts

#### Inherited from

[ProviderInterface](ProviderInterface.md).[getBlockWithReceipts](ProviderInterface.md#getblockwithreceipts)

#### Defined in

[src/provider/interface.ts:441](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/provider/interface.ts#L441)

---

### getBlockTransactionsTraces

▸ **getBlockTransactionsTraces**(`blockIdentifier?`): `Promise`\<`any`\>

Get transaction traces for all transactions in a block

#### Parameters

| Name               | Type                                               | Description      |
| :----------------- | :------------------------------------------------- | :--------------- |
| `blockIdentifier?` | [`BlockIdentifier`](../modules.md#blockidentifier) | block identifier |

#### Returns

`Promise`\<`any`\>

Array of transaction traces

#### Inherited from

[ProviderInterface](ProviderInterface.md).[getBlockTransactionsTraces](ProviderInterface.md#getblocktransactionstraces)

#### Defined in

[src/provider/interface.ts:448](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/provider/interface.ts#L448)

---

### getBlockTransactionCount

▸ **getBlockTransactionCount**(`blockIdentifier?`): `Promise`\<`number`\>

Get the number of transactions in a block

#### Parameters

| Name               | Type                                               | Description      |
| :----------------- | :------------------------------------------------- | :--------------- |
| `blockIdentifier?` | [`BlockIdentifier`](../modules.md#blockidentifier) | block identifier |

#### Returns

`Promise`\<`number`\>

Transaction count

#### Inherited from

[ProviderInterface](ProviderInterface.md).[getBlockTransactionCount](ProviderInterface.md#getblocktransactioncount)

#### Defined in

[src/provider/interface.ts:455](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/provider/interface.ts#L455)

---

### waitForBlock

▸ **waitForBlock**(`blockIdentifier?`, `retryInterval?`): `Promise`\<`void`\>

Pause execution until a specified block is created

#### Parameters

| Name               | Type                                               | Description                                   |
| :----------------- | :------------------------------------------------- | :-------------------------------------------- |
| `blockIdentifier?` | [`BlockIdentifier`](../modules.md#blockidentifier) | block number or tag                           |
| `retryInterval?`   | `number`                                           | milliseconds between requests (default: 5000) |

#### Returns

`Promise`\<`void`\>

**`Example`**

```typescript
await provider.waitForBlock(12345);
await provider.waitForBlock('latest');
```

#### Inherited from

[ProviderInterface](ProviderInterface.md).[waitForBlock](ProviderInterface.md#waitforblock)

#### Defined in

[src/provider/interface.ts:467](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/provider/interface.ts#L467)

---

### getTransactionByHash

▸ **getTransactionByHash**(`txHash`): `Promise`\<[`TransactionWithHash`](../modules.md#transactionwithhash)\>

Gets the transaction information from a tx hash (alias for getTransaction)

#### Parameters

| Name     | Type                                         | Description      |
| :------- | :------------------------------------------- | :--------------- |
| `txHash` | [`BigNumberish`](../modules.md#bignumberish) | transaction hash |

#### Returns

`Promise`\<[`TransactionWithHash`](../modules.md#transactionwithhash)\>

Transaction information

#### Inherited from

[ProviderInterface](ProviderInterface.md).[getTransactionByHash](ProviderInterface.md#gettransactionbyhash)

#### Defined in

[src/provider/interface.ts:478](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/provider/interface.ts#L478)

---

### getTransactionByBlockIdAndIndex

▸ **getTransactionByBlockIdAndIndex**(`blockIdentifier`, `index`): `Promise`\<[`TransactionWithHash`](../modules.md#transactionwithhash)\>

Gets transaction by block identifier and index

#### Parameters

| Name              | Type                                               | Description                    |
| :---------------- | :------------------------------------------------- | :----------------------------- |
| `blockIdentifier` | [`BlockIdentifier`](../modules.md#blockidentifier) | block identifier               |
| `index`           | `number`                                           | transaction index in the block |

#### Returns

`Promise`\<[`TransactionWithHash`](../modules.md#transactionwithhash)\>

Transaction information

#### Inherited from

[ProviderInterface](ProviderInterface.md).[getTransactionByBlockIdAndIndex](ProviderInterface.md#gettransactionbyblockidandindex)

#### Defined in

[src/provider/interface.ts:486](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/provider/interface.ts#L486)

---

### getTransactionTrace

▸ **getTransactionTrace**(`txHash`): `Promise`\<[`TRANSACTION_TRACE`](../namespaces/RPC.RPCSPEC09.API.md#transaction_trace) \| [`TRANSACTION_TRACE`](../namespaces/RPC.RPCSPEC010.API.md#transaction_trace)\>

Gets the transaction trace

#### Parameters

| Name     | Type                                         | Description      |
| :------- | :------------------------------------------- | :--------------- |
| `txHash` | [`BigNumberish`](../modules.md#bignumberish) | transaction hash |

#### Returns

`Promise`\<[`TRANSACTION_TRACE`](../namespaces/RPC.RPCSPEC09.API.md#transaction_trace) \| [`TRANSACTION_TRACE`](../namespaces/RPC.RPCSPEC010.API.md#transaction_trace)\>

Transaction trace

#### Inherited from

[ProviderInterface](ProviderInterface.md).[getTransactionTrace](ProviderInterface.md#gettransactiontrace)

#### Defined in

[src/provider/interface.ts:496](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/provider/interface.ts#L496)

---

### getTransactionStatus

▸ **getTransactionStatus**(`transactionHash`): `Promise`\<`any`\>

Get the status of a transaction

#### Parameters

| Name              | Type                                         | Description      |
| :---------------- | :------------------------------------------- | :--------------- |
| `transactionHash` | [`BigNumberish`](../modules.md#bignumberish) | transaction hash |

#### Returns

`Promise`\<`any`\>

Transaction status

#### Inherited from

[ProviderInterface](ProviderInterface.md).[getTransactionStatus](ProviderInterface.md#gettransactionstatus)

#### Defined in

[src/provider/interface.ts:505](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/provider/interface.ts#L505)

---

### fetch

▸ **fetch**(`method`, `params?`, `id?`): `Promise`\<`any`\>

Direct RPC method call

#### Parameters

| Name      | Type                 | Description       |
| :-------- | :------------------- | :---------------- |
| `method`  | `string`             | RPC method name   |
| `params?` | `object`             | method parameters |
| `id?`     | `string` \| `number` | request ID        |

#### Returns

`Promise`\<`any`\>

RPC response

#### Inherited from

[ProviderInterface](ProviderInterface.md).[fetch](ProviderInterface.md#fetch)

#### Defined in

[src/provider/interface.ts:515](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/provider/interface.ts#L515)

---

### readSpecVersion

▸ **readSpecVersion**(): `undefined` \| `string`

Read channel spec version

#### Returns

`undefined` \| `string`

Spec version string or undefined if not set

#### Inherited from

[ProviderInterface](ProviderInterface.md).[readSpecVersion](ProviderInterface.md#readspecversion)

#### Defined in

[src/provider/interface.ts:521](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/provider/interface.ts#L521)

---

### getSpecVersion

▸ **getSpecVersion**(): `Promise`\<`string`\>

Get channel spec version

#### Returns

`Promise`\<`string`\>

Promise resolving to spec version

#### Inherited from

[ProviderInterface](ProviderInterface.md).[getSpecVersion](ProviderInterface.md#getspecversion)

#### Defined in

[src/provider/interface.ts:527](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/provider/interface.ts#L527)

---

### setUpSpecVersion

▸ **setUpSpecVersion**(): `Promise`\<`string`\>

Setup channel spec version and return it

#### Returns

`Promise`\<`string`\>

Promise resolving to spec version

#### Inherited from

[ProviderInterface](ProviderInterface.md).[setUpSpecVersion](ProviderInterface.md#setupspecversion)

#### Defined in

[src/provider/interface.ts:533](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/provider/interface.ts#L533)

---

### getClass

▸ **getClass**(`classHash`, `blockIdentifier?`): `Promise`\<[`ContractClassResponse`](../modules.md#contractclassresponse)\>

Get contract class by hash with optional block identifier

#### Parameters

| Name               | Type                                               | Description      |
| :----------------- | :------------------------------------------------- | :--------------- |
| `classHash`        | [`BigNumberish`](../modules.md#bignumberish)       | class hash       |
| `blockIdentifier?` | [`BlockIdentifier`](../modules.md#blockidentifier) | block identifier |

#### Returns

`Promise`\<[`ContractClassResponse`](../modules.md#contractclassresponse)\>

Contract class

#### Inherited from

[ProviderInterface](ProviderInterface.md).[getClass](ProviderInterface.md#getclass)

#### Defined in

[src/provider/interface.ts:542](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/provider/interface.ts#L542)

---

### estimateMessageFee

▸ **estimateMessageFee**(`message`, `blockIdentifier?`): `Promise`\<[`MESSAGE_FEE_ESTIMATE`](../namespaces/RPC.RPCSPEC09.API.md#message_fee_estimate) \| [`FEE_ESTIMATE`](../namespaces/RPC.RPCSPEC010.API.md#fee_estimate)\>

Estimate the fee for a message from L1

#### Parameters

| Name               | Type                                                            | Description      |
| :----------------- | :-------------------------------------------------------------- | :--------------- |
| `message`          | [`MSG_FROM_L1`](../namespaces/RPC.RPCSPEC09.API.md#msg_from_l1) | L1 message       |
| `blockIdentifier?` | [`BlockIdentifier`](../modules.md#blockidentifier)              | block identifier |

#### Returns

`Promise`\<[`MESSAGE_FEE_ESTIMATE`](../namespaces/RPC.RPCSPEC09.API.md#message_fee_estimate) \| [`FEE_ESTIMATE`](../namespaces/RPC.RPCSPEC010.API.md#fee_estimate)\>

Fee estimate

#### Inherited from

[ProviderInterface](ProviderInterface.md).[estimateMessageFee](ProviderInterface.md#estimatemessagefee)

#### Defined in

[src/provider/interface.ts:553](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/provider/interface.ts#L553)

---

### getSyncingStats

▸ **getSyncingStats**(): `Promise`\<`any`\>

Get node synchronization status

#### Returns

`Promise`\<`any`\>

Sync status or false if not syncing

#### Inherited from

[ProviderInterface](ProviderInterface.md).[getSyncingStats](ProviderInterface.md#getsyncingstats)

#### Defined in

[src/provider/interface.ts:562](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/provider/interface.ts#L562)

---

### getEvents

▸ **getEvents**(`eventFilter`): `Promise`\<[`EVENTS_CHUNK`](../namespaces/RPC.RPCSPEC09.API.md#events_chunk) \| [`EVENTS_CHUNK`](../namespaces/RPC.RPCSPEC010.API.md#events_chunk)\>

Get events matching the given filter

#### Parameters

| Name          | Type                                                                                                                                | Description  |
| :------------ | :---------------------------------------------------------------------------------------------------------------------------------- | :----------- |
| `eventFilter` | [`EventFilter`](../namespaces/RPC.RPCSPEC09.API.md#eventfilter) \| [`EventFilter`](../namespaces/RPC.RPCSPEC010.API.md#eventfilter) | event filter |

#### Returns

`Promise`\<[`EVENTS_CHUNK`](../namespaces/RPC.RPCSPEC09.API.md#events_chunk) \| [`EVENTS_CHUNK`](../namespaces/RPC.RPCSPEC010.API.md#events_chunk)\>

Events and pagination info

#### Inherited from

[ProviderInterface](ProviderInterface.md).[getEvents](ProviderInterface.md#getevents)

#### Defined in

[src/provider/interface.ts:569](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/provider/interface.ts#L569)

---

### verifyMessageInStarknet

▸ **verifyMessageInStarknet**(`message`, `signature`, `accountAddress`, `signatureVerificationFunctionName?`, `signatureVerificationResponse?`): `Promise`\<`boolean`\>

Verify in Starknet a signature of a TypedData object or of a given hash.

#### Parameters

| Name                                        | Type                                                                                                                | Description                                                               |
| :------------------------------------------ | :------------------------------------------------------------------------------------------------------------------ | :------------------------------------------------------------------------ |
| `message`                                   | [`TypedData`](../interfaces/RPC.RPCSPEC010.WALLET_API.TypedData.md) \| [`BigNumberish`](../modules.md#bignumberish) | TypedData object to be verified, or message hash to be verified.          |
| `signature`                                 | [`Signature`](../modules.md#signature)                                                                              | signature of the message.                                                 |
| `accountAddress`                            | [`BigNumberish`](../modules.md#bignumberish)                                                                        | address of the account that has signed the message.                       |
| `signatureVerificationFunctionName?`        | `string`                                                                                                            | if account contract with non standard account verification function name. |
| `signatureVerificationResponse?`            | `Object`                                                                                                            | if account contract with non standard response of verification function.  |
| `signatureVerificationResponse.okResponse`  | `string`[]                                                                                                          | -                                                                         |
| `signatureVerificationResponse.nokResponse` | `string`[]                                                                                                          | -                                                                         |
| `signatureVerificationResponse.error`       | `string`[]                                                                                                          | -                                                                         |

#### Returns

`Promise`\<`boolean`\>

```typescript
const myTypedMessage: TypedMessage = .... ;
const messageHash = typedData.getMessageHash(myTypedMessage,accountAddress);
const sign: WeierstrassSignatureType = ec.starkCurve.sign(messageHash, privateKey);
const accountAddress = "0x43b7240d227aa2fb8434350b3321c40ac1b88c7067982549e7609870621b535";
const result1 = await myRpcProvider.verifyMessageInStarknet(myTypedMessage, sign, accountAddress);
const result2 = await myRpcProvider.verifyMessageInStarknet(messageHash, sign, accountAddress);
// result1 = result2 = true
```

#### Inherited from

[ProviderInterface](ProviderInterface.md).[verifyMessageInStarknet](ProviderInterface.md#verifymessageinstarknet)

#### Defined in

[src/provider/interface.ts:591](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/provider/interface.ts#L591)

---

### isClassDeclared

▸ **isClassDeclared**(`contractClassIdentifier`, `blockIdentifier?`): `Promise`\<`boolean`\>

Test if class is already declared

#### Parameters

| Name                      | Type                                                               | Description               |
| :------------------------ | :----------------------------------------------------------------- | :------------------------ |
| `contractClassIdentifier` | [`ContractClassIdentifier`](../modules.md#contractclassidentifier) | contract class identifier |
| `blockIdentifier?`        | [`BlockIdentifier`](../modules.md#blockidentifier)                 | block identifier          |

#### Returns

`Promise`\<`boolean`\>

true if class is declared

#### Inherited from

[ProviderInterface](ProviderInterface.md).[isClassDeclared](ProviderInterface.md#isclassdeclared)

#### Defined in

[src/provider/interface.ts:609](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/provider/interface.ts#L609)

---

### prepareInvocations

▸ **prepareInvocations**(`invocations`): `Promise`\<[`Invocations`](../modules.md#invocations)\>

Build bulk invocations with auto-detect declared class

#### Parameters

| Name          | Type                                       | Description          |
| :------------ | :----------------------------------------- | :------------------- |
| `invocations` | [`Invocations`](../modules.md#invocations) | array of invocations |

#### Returns

`Promise`\<[`Invocations`](../modules.md#invocations)\>

Prepared invocations

#### Inherited from

[ProviderInterface](ProviderInterface.md).[prepareInvocations](ProviderInterface.md#prepareinvocations)

#### Defined in

[src/provider/interface.ts:619](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/provider/interface.ts#L619)

---

### getL1MessagesStatus

▸ **getL1MessagesStatus**(`transactionHash`): `Promise`\<[`L1L2MessagesStatus`](../namespaces/RPC.RPCSPEC09.API.md#l1l2messagesstatus) \| [`L1L2MessagesStatus`](../namespaces/RPC.RPCSPEC010.API.md#l1l2messagesstatus)\>

Get L1 messages status for a transaction

#### Parameters

| Name              | Type                                         | Description         |
| :---------------- | :------------------------------------------- | :------------------ |
| `transactionHash` | [`BigNumberish`](../modules.md#bignumberish) | L1 transaction hash |

#### Returns

`Promise`\<[`L1L2MessagesStatus`](../namespaces/RPC.RPCSPEC09.API.md#l1l2messagesstatus) \| [`L1L2MessagesStatus`](../namespaces/RPC.RPCSPEC010.API.md#l1l2messagesstatus)\>

L1 message status

#### Inherited from

[ProviderInterface](ProviderInterface.md).[getL1MessagesStatus](ProviderInterface.md#getl1messagesstatus)

#### Defined in

[src/provider/interface.ts:626](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/provider/interface.ts#L626)

---

### getStorageProof

▸ **getStorageProof**(`classHashes`, `contractAddresses`, `contractsStorageKeys`, `blockIdentifier?`): `Promise`\<[`StorageProof`](../namespaces/RPC.RPCSPEC010.API.md#storageproof)\>

Get Merkle paths in state tries

#### Parameters

| Name                   | Type                                                                                   | Description        |
| :--------------------- | :------------------------------------------------------------------------------------- | :----------------- |
| `classHashes`          | [`BigNumberish`](../modules.md#bignumberish)[]                                         | class hashes       |
| `contractAddresses`    | [`BigNumberish`](../modules.md#bignumberish)[]                                         | contract addresses |
| `contractsStorageKeys` | [`CONTRACT_STORAGE_KEYS`](../namespaces/RPC.RPCSPEC010.API.md#contract_storage_keys)[] | storage keys       |
| `blockIdentifier?`     | [`BlockIdentifier`](../modules.md#blockidentifier)                                     | block identifier   |

#### Returns

`Promise`\<[`StorageProof`](../namespaces/RPC.RPCSPEC010.API.md#storageproof)\>

Storage proof

#### Inherited from

[ProviderInterface](ProviderInterface.md).[getStorageProof](ProviderInterface.md#getstorageproof)

#### Defined in

[src/provider/interface.ts:638](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/provider/interface.ts#L638)

---

### getCompiledCasm

▸ **getCompiledCasm**(`classHash`): `Promise`\<[`CASM_COMPILED_CONTRACT_CLASS`](../namespaces/RPC.RPCSPEC010.API.md#casm_compiled_contract_class)\>

Get compiled CASM contract class

#### Parameters

| Name        | Type                                         | Description |
| :---------- | :------------------------------------------- | :---------- |
| `classHash` | [`BigNumberish`](../modules.md#bignumberish) | class hash  |

#### Returns

`Promise`\<[`CASM_COMPILED_CONTRACT_CLASS`](../namespaces/RPC.RPCSPEC010.API.md#casm_compiled_contract_class)\>

Compiled CASM contract class

#### Inherited from

[ProviderInterface](ProviderInterface.md).[getCompiledCasm](ProviderInterface.md#getcompiledcasm)

#### Defined in

[src/provider/interface.ts:650](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/provider/interface.ts#L650)

---

### getEstimateTip

▸ **getEstimateTip**(`blockIdentifier?`, `options?`): `Promise`\<[`TipEstimate`](../modules.md#tipestimate)\>

Get transaction tip estimation based on network analysis

#### Parameters

| Name               | Type                                                     | Description                      |
| :----------------- | :------------------------------------------------------- | :------------------------------- |
| `blockIdentifier?` | [`BlockIdentifier`](../modules.md#blockidentifier)       | block identifier to analyze from |
| `options?`         | [`TipAnalysisOptions`](../modules.md#tipanalysisoptions) | tip analysis options             |

#### Returns

`Promise`\<[`TipEstimate`](../modules.md#tipestimate)\>

Tip estimation with statistics

**`Example`**

```typescript
const tipEstimate = await provider.getEstimateTip('latest', {
  maxBlocks: 10,
  minTxsNecessary: 5,
});
console.log('Recommended tip:', tipEstimate.recommendedTip);
```

#### Inherited from

[ProviderInterface](ProviderInterface.md).[getEstimateTip](ProviderInterface.md#getestimatetip)

#### Defined in

[src/provider/interface.ts:668](https://github.com/starknet-io/starknet.js/blob/v9.2.1/src/provider/interface.ts#L668)
