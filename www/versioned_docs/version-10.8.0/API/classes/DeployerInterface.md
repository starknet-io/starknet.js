# Abstract Class: DeployerInterface

Defined in: [src/deployer/interface.ts:9](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/deployer/interface.ts#L9)

## Constructors

### Constructor

> **new DeployerInterface**(): `DeployerInterface`

#### Returns

`DeployerInterface`

## Properties

### address

> `abstract` `readonly` **address**: [`BigNumberish`](../type-aliases/BigNumberish.md)

Defined in: [src/deployer/interface.ts:11](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/deployer/interface.ts#L11)

address of the deployer contract

---

### entryPoint

> `abstract` `readonly` **entryPoint**: `string`

Defined in: [src/deployer/interface.ts:14](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/deployer/interface.ts#L14)

ascii name of the function that deploy a contract

## Methods

### buildDeployerCall()

> `abstract` **buildDeployerCall**(`payload`, `address`): [`DeployerCall`](../type-aliases/DeployerCall.md)

Defined in: [src/deployer/interface.ts:22](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/deployer/interface.ts#L22)

Build a Deployer Call with payload and address

#### Parameters

##### payload

[`UniversalDeployerContractPayload`](../type-aliases/UniversalDeployerContractPayload.md) \| [`UniversalDeployerContractPayload`](../type-aliases/UniversalDeployerContractPayload.md)[]

the payload data for the deployer Call. Can be a single payload object or an array of payload objects.

##### address

`string`

the address to be used in the deployer Call

#### Returns

[`DeployerCall`](../type-aliases/DeployerCall.md)

an object with Calls & addresses

---

### parseDeployerEvent()

> `abstract` **parseDeployerEvent**(`txReceipt`): [`DeployContractUDCResponse`](../type-aliases/DeployContractUDCResponse.md)

Defined in: [src/deployer/interface.ts:34](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/deployer/interface.ts#L34)

Parse Transaction Receipt Event from a Deployer contract transaction and
create DeployContractResponse compatible response with addition of the Deployer Event data

#### Parameters

##### txReceipt

[`InvokeTransactionReceiptResponse`](../type-aliases/InvokeTransactionReceiptResponse.md)

Transaction receipt

#### Returns

[`DeployContractUDCResponse`](../type-aliases/DeployContractUDCResponse.md)

parsed Deployer event data
