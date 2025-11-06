---
id: 'Contract'
title: 'Class: Contract'
sidebar_label: 'Contract'
sidebar_position: 0
custom_edit_url: null
---

Interface for interacting with Starknet smart contracts

Provides methods for calling contract functions, estimating fees, and managing contract state.
Supports both read-only calls and state-changing invocations.

**`Remarks`**

The interface provides multiple ways to interact with contracts:

- Direct method calls for convenience
- Generic call/invoke methods for flexibility
- Fee estimation and transaction population
- Event parsing and contract validation

## Implements

- [`ContractInterface`](ContractInterface.md)

## Indexable

▪ [key: `string`]: [`AsyncContractFunction`](../modules.md#asynccontractfunction) \| `any`

## Constructors

### constructor

• **new Contract**(`options`): [`Contract`](Contract.md)

#### Parameters

| Name      | Type                                               | Description                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| :-------- | :------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `options` | [`ContractOptions`](../modules.md#contractoptions) | abi: Abi of the contract object (required) - address: address to connect to (required) - providerOrAccount?: Provider or Account to attach to (fallback to defaultProvider) - parseRequest?: compile and validate arguments (optional, default true) - parseResponse?: Parse elements of the response array and structuring them into response object (optional, default true) - parser?: Abi parser (optional, default createAbiParser(options.abi)) |

#### Returns

[`Contract`](Contract.md)

#### Defined in

[src/contract/default.ts:148](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/contract/default.ts#L148)

## Properties

### abi

• **abi**: [`Abi`](../modules.md#abi)

Contract ABI (Application Binary Interface)

#### Implementation of

[ContractInterface](ContractInterface.md).[abi](ContractInterface.md#abi)

#### Defined in

[src/contract/default.ts:107](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/contract/default.ts#L107)

---

### address

• **address**: `string`

Contract address on Starknet

#### Implementation of

[ContractInterface](ContractInterface.md).[address](ContractInterface.md#address)

#### Defined in

[src/contract/default.ts:109](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/contract/default.ts#L109)

---

### providerOrAccount

• **providerOrAccount**: [`ProviderOrAccount`](../modules.md#provideroraccount)

Provider for read operations or Account for write operations

#### Implementation of

[ContractInterface](ContractInterface.md).[providerOrAccount](ContractInterface.md#provideroraccount)

#### Defined in

[src/contract/default.ts:111](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/contract/default.ts#L111)

---

### classHash

• `Optional` **classHash**: `string`

Optional contract class hash for optimization

#### Implementation of

[ContractInterface](ContractInterface.md).[classHash](ContractInterface.md#classhash)

#### Defined in

[src/contract/default.ts:113](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/contract/default.ts#L113)

---

### parseRequest

• **parseRequest**: `boolean`

#### Defined in

[src/contract/default.ts:115](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/contract/default.ts#L115)

---

### parseResponse

• **parseResponse**: `boolean`

#### Defined in

[src/contract/default.ts:117](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/contract/default.ts#L117)

---

### structs

• `Private` **structs**: `Object`

#### Index signature

▪ [name: `string`]: [`AbiStruct`](../modules.md#abistruct)

#### Defined in

[src/contract/default.ts:119](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/contract/default.ts#L119)

---

### events

• `Private` **events**: [`AbiEvents`](../modules.md#abievents)

#### Defined in

[src/contract/default.ts:121](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/contract/default.ts#L121)

---

### functions

• `Readonly` **functions**: `Object`

Contract methods that return promises (async operations)

#### Index signature

▪ [name: `string`]: [`AsyncContractFunction`](../modules.md#asynccontractfunction)

#### Implementation of

[ContractInterface](ContractInterface.md).[functions](ContractInterface.md#functions)

#### Defined in

[src/contract/default.ts:123](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/contract/default.ts#L123)

---

### callStatic

• `Readonly` **callStatic**: `Object`

Contract methods for read-only calls (state queries)

#### Index signature

▪ [name: `string`]: [`AsyncContractFunction`](../modules.md#asynccontractfunction)

#### Implementation of

[ContractInterface](ContractInterface.md).[callStatic](ContractInterface.md#callstatic)

#### Defined in

[src/contract/default.ts:125](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/contract/default.ts#L125)

---

### populateTransaction

• `Readonly` **populateTransaction**: `Object`

Contract methods that return populated transactions for batching

#### Index signature

▪ [name: `string`]: [`ContractFunction`](../modules.md#contractfunction)

#### Implementation of

[ContractInterface](ContractInterface.md).[populateTransaction](ContractInterface.md#populatetransaction)

#### Defined in

[src/contract/default.ts:127](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/contract/default.ts#L127)

---

### estimateFee

• `Readonly` **estimateFee**: `Object`

Contract methods for fee estimation

#### Index signature

▪ [name: `string`]: [`ContractFunction`](../modules.md#contractfunction)

#### Implementation of

[ContractInterface](ContractInterface.md).[estimateFee](ContractInterface.md#estimatefee)

#### Defined in

[src/contract/default.ts:129](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/contract/default.ts#L129)

---

### callData

• `Private` **callData**: [`CallData`](CallData.md)

#### Defined in

[src/contract/default.ts:133](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/contract/default.ts#L133)

---

### withOptionsProps

• `Optional` **withOptionsProps**: [`WithOptions`](../modules.md#withoptions)

#### Defined in

[src/contract/default.ts:135](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/contract/default.ts#L135)

---

### parsingStrategy

• `Private` `Optional` **parsingStrategy**: [`ParsingStrategy`](../modules.md#parsingstrategy)

#### Defined in

[src/contract/default.ts:137](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/contract/default.ts#L137)

## Methods

### factory

▸ **factory**(`params`, `details?`): `Promise`<[`Contract`](Contract.md)\>

Factory method to declare and/or deploy a contract creating a new Contract instance

It handles the entire lifecycle: compiles constructor calldata, optionally declares the contract class,
deploys an instance, and returns a ready-to-use Contract object.

When classHash is provided, it will only deploy the contract without declaring.
When contract is provided without classHash, it will declare and deploy.

#### Parameters

| Name      | Type                                                    | Description                                                                 |
| :-------- | :------------------------------------------------------ | :-------------------------------------------------------------------------- |
| `params`  | [`FactoryParams`](../modules.md#factoryparams)          | Factory parameters containing Contract Class details and deployment options |
| `details` | [`UniversalDetails`](../interfaces/UniversalDetails.md) | -                                                                           |

#### Returns

`Promise`<[`Contract`](Contract.md)\>

Promise that resolves to a deployed Contract instance with address and transaction hash

**`Throws`**

Error if deployment fails or contract_address is not returned

**`Example`**

````typescript
// Declare and deploy an ERC20 contract
const contract = await Contract.factory({
  contract: erc20CompiledContract,
  account: myAccount,
  casm: erc20Casm,
  constructorCalldata: {
    name: 'MyToken',
    symbol: 'MTK',
    decimals: 18,
    initial_supply: { low: 1000000, high: 0 },
    recipient: myAccount.address
  }
});

// Deploy-only mode with existing classHash (ABI will be fetched from network)
const contract2 = await Contract.factory({
  classHash: '0x1234...',
  account: myAccount,
  constructorCalldata: {
    name: 'AnotherToken',
    symbol: 'ATK',
    decimals: 18,
    initial_supply: { low: 2000000, high: 0 },
    recipient: myAccount.address
  }
});

// Deploy-only mode with provided ABI (faster, no network call)
const contract3 = await Contract.factory({
  classHash: '0x1234...',
  abi: erc20Abi,
  account: myAccount,
  constructorCalldata: {
    name: 'ThirdToken',
    symbol: 'TTK',
    decimals: 18,
    initial_supply: { low: 3000000, high: 0 },
    recipient: myAccount.address
  }
});

console.log('Contract deployed at:', contract.address);
```\

#### Defined in

[src/contract/default.ts:494](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/contract/default.ts#L494)

___

### withOptions

▸ **withOptions**(`options`): `this`

Set execution options for subsequent contract interactions

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`WithOptions`](../modules.md#withoptions) | Options to override for contract interactions |

#### Returns

`this`

This contract instance with the specified options applied

**`Example`**

```typescript
contract.withOptions({
  blockIdentifier: 'latest',
  parseResponse: false
});
// Now all subsequent calls use these options
````

#### Implementation of

[ContractInterface](ContractInterface.md).[withOptions](ContractInterface.md#withoptions)

#### Defined in

[src/contract/default.ts:213](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/contract/default.ts#L213)

---

### attach

▸ **attach**(`address`, `abi?`): `void`

Attach the contract to a different address with optional new ABI

#### Parameters

| Name      | Type                       | Description                                       |
| :-------- | :------------------------- | :------------------------------------------------ |
| `address` | `string`                   | New contract address to interact with             |
| `abi?`    | [`Abi`](../modules.md#abi) | Optional new ABI to use (defaults to current ABI) |

#### Returns

`void`

**`Example`**

```typescript
contract.attach('0x123...', newAbi);
// Now contract.address === '0x123...' and uses newAbi
```

#### Implementation of

[ContractInterface](ContractInterface.md).[attach](ContractInterface.md#attach)

#### Defined in

[src/contract/default.ts:218](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/contract/default.ts#L218)

---

### isDeployed

▸ **isDeployed**(): `Promise`<[`Contract`](Contract.md)\>

Verify that a contract is deployed at the current address

#### Returns

`Promise`<[`Contract`](Contract.md)\>

Promise resolving to this contract instance if deployed

**`Throws`**

If no contract is found at the address

**`Example`**

```typescript
try {
  await contract.isDeployed();
  console.log('Contract is deployed');
} catch (error) {
  console.log('Contract not found at address');
}
```

#### Implementation of

[ContractInterface](ContractInterface.md).[isDeployed](ContractInterface.md#isdeployed)

#### Defined in

[src/contract/default.ts:230](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/contract/default.ts#L230)

---

### call

▸ **call**(`method`, `args?`, `«destructured»?`): `Promise`<[`CallResult`](../modules.md#callresult)\>

Call a read-only contract method (view function)

#### Parameters

| Name             | Type                                             | Default value | Description                                                  |
| :--------------- | :----------------------------------------------- | :------------ | :----------------------------------------------------------- |
| `method`         | `string`                                         | `undefined`   | Name of the contract method to call                          |
| `args`           | [`ArgsOrCalldata`](../modules.md#argsorcalldata) | `[]`          | Method arguments as array or calldata                        |
| `«destructured»` | [`CallOptions`](../modules.md#calloptions)       | `{}`          | Call options including block identifier and parsing settings |

#### Returns

`Promise`<[`CallResult`](../modules.md#callresult)\>

Parsed result from the contract method

**`Example`**

```typescript
const balance = await contract.call('balanceOf', [userAddress]);
const name = await contract.call('name', [], { blockIdentifier: 'latest' });
```

#### Implementation of

[ContractInterface](ContractInterface.md).[call](ContractInterface.md#call)

#### Defined in

[src/contract/default.ts:241](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/contract/default.ts#L241)

---

### invoke

▸ **invoke**(`method`, `args`, `options`): `Promise`<[`SuccessfulTransactionReceiptResponseHelper`](../modules.md#successfultransactionreceiptresponsehelper)\>

Invoke a state-changing contract method (external function)

#### Parameters

| Name      | Type                                                                                                                                                                                                                                                                                                                   | Description                                     |
| :-------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------- |
| `method`  | `string`                                                                                                                                                                                                                                                                                                               | Name of the contract method to invoke           |
| `args`    | [`ArgsOrCalldata`](../modules.md#argsorcalldata)                                                                                                                                                                                                                                                                       | Method arguments as array or calldata           |
| `options` | `Pick`<[`CommonContractOptions`](../modules.md#commoncontractoptions), `"parseRequest"`\> & \{ `signature?`: [`Signature`](../modules.md#signature) ; `salt?`: `string` ; `waitForTransaction?`: `boolean` } & `Partial`<[`UniversalDetails`](../interfaces/UniversalDetails.md)\> & \{ `waitForTransaction`: `true` } | Execution options including transaction details |

#### Returns

`Promise`<[`SuccessfulTransactionReceiptResponseHelper`](../modules.md#successfultransactionreceiptresponsehelper)\>

Transaction response with hash

**`Example`**

```typescript
const tx = await contract.invoke('transfer', [recipient, amount]);
const receipt = await provider.waitForTransaction(tx.transaction_hash);
```

#### Implementation of

[ContractInterface](ContractInterface.md).[invoke](ContractInterface.md#invoke)

#### Defined in

[src/contract/default.ts:282](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/contract/default.ts#L282)

▸ **invoke**(`method`, `args`, `options`): `Promise`<\{ `transaction_hash`: `string` }\>

#### Parameters

| Name      | Type                                                                                                                                                                                                                                                                                                                    |
| :-------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `method`  | `string`                                                                                                                                                                                                                                                                                                                |
| `args`    | [`ArgsOrCalldata`](../modules.md#argsorcalldata)                                                                                                                                                                                                                                                                        |
| `options` | `Pick`<[`CommonContractOptions`](../modules.md#commoncontractoptions), `"parseRequest"`\> & \{ `signature?`: [`Signature`](../modules.md#signature) ; `salt?`: `string` ; `waitForTransaction?`: `boolean` } & `Partial`<[`UniversalDetails`](../interfaces/UniversalDetails.md)\> & \{ `waitForTransaction`: `false` } |

#### Returns

`Promise`<\{ `transaction_hash`: `string` }\>

#### Implementation of

ContractInterface.invoke

#### Defined in

[src/contract/default.ts:287](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/contract/default.ts#L287)

▸ **invoke**(`method`, `args?`, `options?`): `Promise`<\{ `transaction_hash`: `string` }\>

#### Parameters

| Name       | Type                                             |
| :--------- | :----------------------------------------------- |
| `method`   | `string`                                         |
| `args?`    | [`ArgsOrCalldata`](../modules.md#argsorcalldata) |
| `options?` | [`ExecuteOptions`](../modules.md#executeoptions) |

#### Returns

`Promise`<\{ `transaction_hash`: `string` }\>

#### Implementation of

ContractInterface.invoke

#### Defined in

[src/contract/default.ts:292](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/contract/default.ts#L292)

---

### estimate

▸ **estimate**(`method`, `args?`, `estimateDetails?`): `Promise`<[`EstimateFeeResponseOverhead`](../modules.md#estimatefeeresponseoverhead)\>

Estimate fee for invoking a contract method

#### Parameters

| Name              | Type                                                    | Default value | Description                                   |
| :---------------- | :------------------------------------------------------ | :------------ | :-------------------------------------------- |
| `method`          | `string`                                                | `undefined`   | Name of the contract method to estimate       |
| `args`            | [`ArgsOrCalldata`](../modules.md#argsorcalldata)        | `[]`          | Method arguments as array or calldata         |
| `estimateDetails` | [`UniversalDetails`](../interfaces/UniversalDetails.md) | `{}`          | Estimation options including block identifier |

#### Returns

`Promise`<[`EstimateFeeResponseOverhead`](../modules.md#estimatefeeresponseoverhead)\>

Fee estimation details

**`Example`**

```typescript
const feeEstimate = await contract.estimate('transfer', [recipient, amount]);
console.log('Estimated fee:', feeEstimate.overall_fee);
```

#### Implementation of

[ContractInterface](ContractInterface.md).[estimate](ContractInterface.md#estimate)

#### Defined in

[src/contract/default.ts:350](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/contract/default.ts#L350)

---

### populate

▸ **populate**(`method`, `args?`): [`Call`](../modules.md#call)

Populate transaction data for a contract method call

#### Parameters

| Name     | Type                               | Default value | Description                           |
| :------- | :--------------------------------- | :------------ | :------------------------------------ |
| `method` | `string`                           | `undefined`   | Name of the contract method           |
| `args`   | [`RawArgs`](../modules.md#rawargs) | `[]`          | Method arguments as array or calldata |

#### Returns

[`Call`](../modules.md#call)

Invocation object for batching or inspection

**`Example`**

```typescript
const invocation = contract.populate('transfer', [recipient, amount]);
// Use in account.execute([invocation1, invocation2, ...])
```

#### Implementation of

[ContractInterface](ContractInterface.md).[populate](ContractInterface.md#populate)

#### Defined in

[src/contract/default.ts:368](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/contract/default.ts#L368)

---

### parseEvents

▸ **parseEvents**(`receipt`): [`ParsedEvents`](../modules.md#parsedevents)

Parse events from a transaction receipt using the contract's ABI

#### Parameters

| Name      | Type                                                                           | Description                                 |
| :-------- | :----------------------------------------------------------------------------- | :------------------------------------------ |
| `receipt` | [`GetTransactionReceiptResponse`](../modules.md#gettransactionreceiptresponse) | Transaction receipt from waitForTransaction |

#### Returns

[`ParsedEvents`](../modules.md#parsedevents)

Array of parsed events with decoded data

**`Example`**

```typescript
const receipt = await provider.waitForTransaction(txHash);
const events = contract.parseEvents(receipt);
events.forEach((event) => {
  console.log('Event:', event.name, event.data);
});
```

#### Implementation of

[ContractInterface](ContractInterface.md).[parseEvents](ContractInterface.md#parseevents)

#### Defined in

[src/contract/default.ts:379](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/contract/default.ts#L379)

---

### isCairo1

▸ **isCairo1**(): `boolean`

Check if the contract is implemented in Cairo 1

#### Returns

`boolean`

True if the contract uses Cairo 1, false for Cairo 0 (legacy)

**`Example`**

```typescript
if (contract.isCairo1()) {
  console.log('Using Cairo 1 features');
}
```

#### Implementation of

[ContractInterface](ContractInterface.md).[isCairo1](ContractInterface.md#iscairo1)

#### Defined in

[src/contract/default.ts:424](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/contract/default.ts#L424)

---

### getVersion

▸ **getVersion**(): `Promise`<[`ContractVersion`](../modules.md#contractversion)\>

Get the Cairo and compiler version of the contract

#### Returns

`Promise`<[`ContractVersion`](../modules.md#contractversion)\>

Object containing cairo version and compiler version

**`Example`**

```typescript
const version = await contract.getVersion();
console.log(`Cairo ${version.cairo}, Compiler ${version.compiler}`);
```

#### Implementation of

[ContractInterface](ContractInterface.md).[getVersion](ContractInterface.md#getversion)

#### Defined in

[src/contract/default.ts:428](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/contract/default.ts#L428)

---

### typedv2

▸ **typedv2**<`TAbi`\>(`tAbi`): [`TypedContractV2`](../modules.md#typedcontractv2)<`TAbi`\>

Create a typed contract instance with full TypeScript support

#### Type parameters

| Name   | Type          |
| :----- | :------------ |
| `TAbi` | extends `Abi` |

#### Parameters

| Name   | Type   | Description                                            |
| :----- | :----- | :----------------------------------------------------- |
| `tAbi` | `TAbi` | The typed ABI interface for compile-time type checking |

#### Returns

[`TypedContractV2`](../modules.md#typedcontractv2)<`TAbi`\>

Typed contract instance with IntelliSense support

**`Example`**

```typescript
const typedContract = contract.typedv2(erc20Abi);
// Now typedContract.transfer() has full type safety
```

#### Implementation of

[ContractInterface](ContractInterface.md).[typedv2](ContractInterface.md#typedv2)

#### Defined in

[src/contract/default.ts:432](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/contract/default.ts#L432)
