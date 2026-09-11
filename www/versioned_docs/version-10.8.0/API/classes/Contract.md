# Class: Contract

Defined in: [src/contract/default.ts:111](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/contract/default.ts#L111)

Interface for interacting with Starknet smart contracts

Provides methods for calling contract functions, estimating fees, and managing contract state.
Supports both read-only calls and state-changing invocations.

## Remarks

The interface provides multiple ways to interact with contracts:

- Direct method calls for convenience
- Generic call/invoke methods for flexibility
- Fee estimation and transaction population
- Event parsing and contract validation

## Implements

- [`ContractInterface`](ContractInterface.md)

## Indexable

> \[`key`: `string`\]: `any`

## Constructors

### Constructor

> **new Contract**(`options`): `Contract`

Defined in: [src/contract/default.ts:194](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/contract/default.ts#L194)

#### Parameters

##### options

[`ContractOptions`](../type-aliases/ContractOptions.md)

abi: Abi of the contract object (required)

- address: address to connect to (required)
- providerOrAccount?: Provider or Account to attach to (optional, creates default RpcProvider on first use with auto node detection)
- parseRequest?: compile and validate arguments (optional, default true)
- parseResponse?: Parse elements of the response array and structuring them into response object (optional, default true)
- parser?: Abi parser (optional, default createAbiParser(options.abi))

#### Returns

`Contract`

## Properties

### abi

> **abi**: [`Abi`](../type-aliases/Abi.md)

Defined in: [src/contract/default.ts:112](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/contract/default.ts#L112)

Contract ABI (Application Binary Interface)

#### Implementation of

[`ContractInterface`](ContractInterface.md).[`abi`](ContractInterface.md#abi)

---

### address

> **address**: `string`

Defined in: [src/contract/default.ts:114](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/contract/default.ts#L114)

Contract address on Starknet

#### Implementation of

[`ContractInterface`](ContractInterface.md).[`address`](ContractInterface.md#address)

---

### providerOrAccount?

> `optional` **providerOrAccount?**: [`ProviderOrAccount`](../type-aliases/ProviderOrAccount.md)

Defined in: [src/contract/default.ts:116](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/contract/default.ts#L116)

Provider for read operations or Account for write operations
Optional - a default RpcProvider will be created on first async operation if not provided

#### Implementation of

[`ContractInterface`](ContractInterface.md).[`providerOrAccount`](ContractInterface.md#provideroraccount)

---

### classHash?

> `optional` **classHash?**: `string`

Defined in: [src/contract/default.ts:118](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/contract/default.ts#L118)

Optional contract class hash for optimization

#### Implementation of

[`ContractInterface`](ContractInterface.md).[`classHash`](ContractInterface.md#classhash)

---

### parseRequest

> **parseRequest**: `boolean`

Defined in: [src/contract/default.ts:120](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/contract/default.ts#L120)

---

### parseResponse

> **parseResponse**: `boolean`

Defined in: [src/contract/default.ts:122](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/contract/default.ts#L122)

---

### functions

> `readonly` **functions**: `object`

Defined in: [src/contract/default.ts:130](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/contract/default.ts#L130)

Contract methods that return promises (async operations)

#### Index Signature

\[`name`: `string`\]: [`AsyncContractFunction`](../type-aliases/AsyncContractFunction.md)

#### Implementation of

[`ContractInterface`](ContractInterface.md).[`functions`](ContractInterface.md#functions)

---

### callStatic

> `readonly` **callStatic**: `object`

Defined in: [src/contract/default.ts:132](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/contract/default.ts#L132)

Contract methods for read-only calls (state queries)

#### Index Signature

\[`name`: `string`\]: [`AsyncContractFunction`](../type-aliases/AsyncContractFunction.md)

#### Implementation of

[`ContractInterface`](ContractInterface.md).[`callStatic`](ContractInterface.md#callstatic)

---

### populateTransaction

> `readonly` **populateTransaction**: `object`

Defined in: [src/contract/default.ts:134](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/contract/default.ts#L134)

Contract methods that return populated transactions for batching

#### Index Signature

\[`name`: `string`\]: [`ContractFunction`](../type-aliases/ContractFunction.md)

#### Implementation of

[`ContractInterface`](ContractInterface.md).[`populateTransaction`](ContractInterface.md#populatetransaction)

---

### estimateFee

> `readonly` **estimateFee**: `object`

Defined in: [src/contract/default.ts:136](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/contract/default.ts#L136)

Contract methods for fee estimation

#### Index Signature

\[`name`: `string`\]: [`ContractFunction`](../type-aliases/ContractFunction.md)

#### Implementation of

[`ContractInterface`](ContractInterface.md).[`estimateFee`](ContractInterface.md#estimatefee)

---

### withOptionsProps?

> `optional` **withOptionsProps?**: [`WithOptions`](../type-aliases/WithOptions.md)

Defined in: [src/contract/default.ts:142](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/contract/default.ts#L142)

## Methods

### factory()

> `static` **factory**(`params`, `details?`): `Promise`\<`Contract`\>

Defined in: [src/contract/default.ts:545](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/contract/default.ts#L545)

Factory method to declare and/or deploy a contract creating a new Contract instance

It handles the entire lifecycle: compiles constructor calldata, optionally declares the contract class,
deploys an instance, and returns a ready-to-use Contract object.

When classHash is provided, it will only deploy the contract without declaring.
When contract is provided without classHash, it will declare and deploy.

#### Parameters

##### params

[`FactoryParams`](../type-aliases/FactoryParams.md)

Factory parameters containing Contract Class details and deployment options

##### details?

[`UniversalDetails`](../interfaces/UniversalDetails.md) = `{}`

#### Returns

`Promise`\<`Contract`\>

Promise that resolves to a deployed Contract instance with address and transaction hash

#### Throws

Error if deployment fails or contract_address is not returned

#### Example

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

***

### withOptions()

> **withOptions**(`options`): `this`

Defined in: [src/contract/default.ts:259](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/contract/default.ts#L259)

Set execution options for subsequent contract interactions

#### Parameters

##### options

[`WithOptions`](../type-aliases/WithOptions.md)

Options to override for contract interactions

#### Returns

`this`

This contract instance with the specified options applied

#### Example

```typescript
contract.withOptions({
  blockIdentifier: 'latest',
  parseResponse: false
});
// Now all subsequent calls use these options
````

#### Implementation of

[`ContractInterface`](ContractInterface.md).[`withOptions`](ContractInterface.md#withoptions)

---

### attach()

> **attach**(`address`, `abi?`): `void`

Defined in: [src/contract/default.ts:264](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/contract/default.ts#L264)

Attach the contract to a different address with optional new ABI

#### Parameters

##### address

`string`

New contract address to interact with

##### abi?

[`Abi`](../type-aliases/Abi.md)

Optional new ABI to use (defaults to current ABI)

#### Returns

`void`

#### Example

```typescript
contract.attach('0x123...', newAbi);
// Now contract.address === '0x123...' and uses newAbi
```

#### Implementation of

[`ContractInterface`](ContractInterface.md).[`attach`](ContractInterface.md#attach)

---

### isDeployed()

> **isDeployed**(): `Promise`\<`Contract`\>

Defined in: [src/contract/default.ts:276](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/contract/default.ts#L276)

Verify that a contract is deployed at the current address

#### Returns

`Promise`\<`Contract`\>

Promise resolving to this contract instance if deployed

#### Throws

If no contract is found at the address

#### Example

```typescript
try {
  await contract.isDeployed();
  console.log('Contract is deployed');
} catch (error) {
  console.log('Contract not found at address');
}
```

#### Implementation of

[`ContractInterface`](ContractInterface.md).[`isDeployed`](ContractInterface.md#isdeployed)

---

### call()

> **call**(`method`, `args?`, `options?`): `Promise`\<[`CallResult`](../type-aliases/CallResult.md)\>

Defined in: [src/contract/default.ts:288](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/contract/default.ts#L288)

Call a read-only contract method (view function)

#### Parameters

##### method

`string`

Name of the contract method to call

##### args?

[`ArgsOrCalldata`](../type-aliases/ArgsOrCalldata.md) = `[]`

Method arguments as array or calldata

##### options?

[`CallOptions`](../type-aliases/CallOptions.md) = `{}`

Call options including block identifier and parsing settings

#### Returns

`Promise`\<[`CallResult`](../type-aliases/CallResult.md)\>

Parsed result from the contract method

#### Example

```typescript
const balance = await contract.call('balanceOf', [userAddress]);
const name = await contract.call('name', [], { blockIdentifier: 'latest' });
```

#### Implementation of

[`ContractInterface`](ContractInterface.md).[`call`](ContractInterface.md#call)

---

### invoke()

#### Call Signature

> **invoke**(`method`, `args`, `options`): `Promise`\<[`SuccessfulTransactionReceiptResponseHelper`](../type-aliases/SuccessfulTransactionReceiptResponseHelper.md)\>

Defined in: [src/contract/default.ts:330](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/contract/default.ts#L330)

Invoke a state-changing contract method (external function)

##### Parameters

###### method

`string`

Name of the contract method to invoke

###### args

[`ArgsOrCalldata`](../type-aliases/ArgsOrCalldata.md)

Method arguments as array or calldata

###### options

`Pick`\<[`CommonContractOptions`](../type-aliases/CommonContractOptions.md), `"parseRequest"`\> & `object` & `Partial`\<[`UniversalDetails`](../interfaces/UniversalDetails.md)\> & `object`

Execution options including transaction details

##### Returns

`Promise`\<[`SuccessfulTransactionReceiptResponseHelper`](../type-aliases/SuccessfulTransactionReceiptResponseHelper.md)\>

Transaction response with hash

##### Example

```typescript
const tx = await contract.invoke('transfer', [recipient, amount]);
const receipt = await provider.waitForTransaction(tx.transaction_hash);
```

##### Implementation of

[`ContractInterface`](ContractInterface.md).[`invoke`](ContractInterface.md#invoke)

#### Call Signature

> **invoke**(`method`, `args`, `options`): `Promise`\<\{ `transaction_hash`: `string`; \}\>

Defined in: [src/contract/default.ts:335](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/contract/default.ts#L335)

##### Parameters

###### method

`string`

###### args

[`ArgsOrCalldata`](../type-aliases/ArgsOrCalldata.md)

###### options

`Pick`\<[`CommonContractOptions`](../type-aliases/CommonContractOptions.md), `"parseRequest"`\> & `object` & `Partial`\<[`UniversalDetails`](../interfaces/UniversalDetails.md)\> & `object`

##### Returns

`Promise`\<\{ `transaction_hash`: `string`; \}\>

##### Implementation of

`ContractInterface.invoke`

#### Call Signature

> **invoke**(`method`, `args?`, `options?`): `Promise`\<\{ `transaction_hash`: `string`; \}\>

Defined in: [src/contract/default.ts:340](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/contract/default.ts#L340)

##### Parameters

###### method

`string`

###### args?

[`ArgsOrCalldata`](../type-aliases/ArgsOrCalldata.md)

###### options?

[`ExecuteOptions`](../type-aliases/ExecuteOptions.md)

##### Returns

`Promise`\<\{ `transaction_hash`: `string`; \}\>

##### Implementation of

`ContractInterface.invoke`

---

### estimate()

> **estimate**(`method`, `args?`, `estimateDetails?`): `Promise`\<[`EstimateFeeResponseOverhead`](../type-aliases/EstimateFeeResponseOverhead.md) \| [`PaymasterFeeEstimate`](../type-aliases/PaymasterFeeEstimate.md)\>

Defined in: [src/contract/default.ts:416](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/contract/default.ts#L416)

Estimate fee for invoking a contract method

#### Parameters

##### method

`string`

Name of the contract method to estimate

##### args?

[`ArgsOrCalldata`](../type-aliases/ArgsOrCalldata.md) = `[]`

Method arguments as array or calldata

##### estimateDetails?

[`ExecuteOptions`](../type-aliases/ExecuteOptions.md) = `{}`

#### Returns

`Promise`\<[`EstimateFeeResponseOverhead`](../type-aliases/EstimateFeeResponseOverhead.md) \| [`PaymasterFeeEstimate`](../type-aliases/PaymasterFeeEstimate.md)\>

Fee estimation details

#### Example

```typescript
const feeEstimate = await contract.estimate('transfer', [recipient, amount]);
console.log('Estimated fee:', feeEstimate.overall_fee);
```

#### Implementation of

[`ContractInterface`](ContractInterface.md).[`estimate`](ContractInterface.md#estimate)

---

### compile()

> **compile**(`method`, `args?`): [`Calldata`](../type-aliases/Calldata.md)

Defined in: [src/contract/default.ts:447](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/contract/default.ts#L447)

Compile the calldata for a contract method, using the contract abi.

Unlike [populate](ContractInterface.md#populate), this returns only the compiled `Calldata` array, without wrapping it
in an `Invocation` object (no `contractAddress` nor `entrypoint`). It is the contract-bound
equivalent of `myCallData.compile(method, args)`.

If `args` is already a compiled `Calldata`, it is returned as-is without recompilation.

#### Parameters

##### method

`string`

Name of the contract method, as defined in the abi

##### args?

[`RawArgs`](../type-aliases/RawArgs.md) = `[]`

Method arguments as array (in abi order) or object (free order), or an already
compiled calldata

#### Returns

[`Calldata`](../type-aliases/Calldata.md)

The compiled calldata

#### Example

```typescript
// 'amount' is a u256: the abi splits it into 2 felts automatically
const calldata = contract.compile('transfer', { recipient: '0x123', amount: 100n });
// calldata = ['0x123', '100', '0']
```

#### Implementation of

[`ContractInterface`](ContractInterface.md).[`compile`](ContractInterface.md#compile)

---

### populate()

> **populate**(`method`, `args?`): [`Call`](../type-aliases/Call.md)

Defined in: [src/contract/default.ts:451](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/contract/default.ts#L451)

Populate transaction data for a contract method call

#### Parameters

##### method

`string`

Name of the contract method

##### args?

[`RawArgs`](../type-aliases/RawArgs.md) = `[]`

Method arguments as array or calldata

#### Returns

[`Call`](../type-aliases/Call.md)

Invocation object for batching or inspection

#### Example

```typescript
const invocation = contract.populate('transfer', [recipient, amount]);
// Use in account.execute([invocation1, invocation2, ...])
```

#### Implementation of

[`ContractInterface`](ContractInterface.md).[`populate`](ContractInterface.md#populate)

---

### parseEvents()

> **parseEvents**(`receipt`): [`ParsedEvents`](../type-aliases/ParsedEvents.md)

Defined in: [src/contract/default.ts:459](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/contract/default.ts#L459)

Parse events from a transaction receipt using the contract's ABI

#### Parameters

##### receipt

[`GetTransactionReceiptResponse`](../type-aliases/GetTransactionReceiptResponse.md)

Transaction receipt from waitForTransaction

#### Returns

[`ParsedEvents`](../type-aliases/ParsedEvents.md)

Array of parsed events with decoded data

#### Example

```typescript
const receipt = await provider.waitForTransaction(txHash);
const events = contract.parseEvents(receipt);
events.forEach((event) => {
  console.log('Event:', event.name, event.data);
});
```

#### Implementation of

[`ContractInterface`](ContractInterface.md).[`parseEvents`](ContractInterface.md#parseevents)

---

### isCairo1()

> **isCairo1**(): `boolean`

Defined in: [src/contract/default.ts:474](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/contract/default.ts#L474)

Check if the contract is implemented in Cairo 1

#### Returns

`boolean`

True if the contract uses Cairo 1, false for Cairo 0 (legacy)

#### Example

```typescript
if (contract.isCairo1()) {
  console.log('Using Cairo 1 features');
}
```

#### Implementation of

[`ContractInterface`](ContractInterface.md).[`isCairo1`](ContractInterface.md#iscairo1)

---

### getVersion()

> **getVersion**(): `Promise`\<[`ContractVersion`](../type-aliases/ContractVersion.md)\>

Defined in: [src/contract/default.ts:478](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/contract/default.ts#L478)

Get the Cairo and compiler version of the contract

#### Returns

`Promise`\<[`ContractVersion`](../type-aliases/ContractVersion.md)\>

Object containing cairo version and compiler version

#### Example

```typescript
const version = await contract.getVersion();
console.log(`Cairo ${version.cairo}, Compiler ${version.compiler}`);
```

#### Implementation of

[`ContractInterface`](ContractInterface.md).[`getVersion`](ContractInterface.md#getversion)

---

### typedv2()

> **typedv2**\<`TAbi`\>(`tAbi`): [`TypedContractV2`](../type-aliases/TypedContractV2.md)\<`TAbi`\>

Defined in: [src/contract/default.ts:483](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/contract/default.ts#L483)

Create a typed contract instance with full TypeScript support

#### Type Parameters

##### TAbi

`TAbi` _extends_ `Abi`

#### Parameters

##### tAbi

`TAbi`

The typed ABI interface for compile-time type checking

#### Returns

[`TypedContractV2`](../type-aliases/TypedContractV2.md)\<`TAbi`\>

Typed contract instance with IntelliSense support

#### Example

```typescript
const typedContract = contract.typedv2(erc20Abi);
// Now typedContract.transfer() has full type safety
```

#### Implementation of

[`ContractInterface`](ContractInterface.md).[`typedv2`](ContractInterface.md#typedv2)
