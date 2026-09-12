# Class: Deployer

Defined in: [src/deployer/default.ts:18](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/deployer/default.ts#L18)

## Implements

- [`DeployerInterface`](DeployerInterface.md)

## Constructors

### Constructor

> **new Deployer**(`address?`, `entryPoint?`): `Deployer`

Defined in: [src/deployer/default.ts:23](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/deployer/default.ts#L23)

#### Parameters

##### address?

[`BigNumberish`](../type-aliases/BigNumberish.md)

##### entryPoint?

`string`

#### Returns

`Deployer`

## Properties

### address

> `readonly` **address**: [`BigNumberish`](../type-aliases/BigNumberish.md)

Defined in: [src/deployer/default.ts:19](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/deployer/default.ts#L19)

address of the deployer contract

#### Implementation of

[`DeployerInterface`](DeployerInterface.md).[`address`](DeployerInterface.md#address)

---

### entryPoint

> `readonly` **entryPoint**: `string`

Defined in: [src/deployer/default.ts:21](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/deployer/default.ts#L21)

ascii name of the function that deploy a contract

#### Implementation of

[`DeployerInterface`](DeployerInterface.md).[`entryPoint`](DeployerInterface.md#entrypoint)

## Methods

### buildDeployerCall()

> **buildDeployerCall**(`payload`, `address`): [`DeployerCall`](../type-aliases/DeployerCall.md)

Defined in: [src/deployer/default.ts:28](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/deployer/default.ts#L28)

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

#### Implementation of

[`DeployerInterface`](DeployerInterface.md).[`buildDeployerCall`](DeployerInterface.md#builddeployercall)

---

### parseDeployerEvent()

> **parseDeployerEvent**(`txReceipt`): [`DeployContractUDCResponse`](../type-aliases/DeployContractUDCResponse.md)

Defined in: [src/deployer/default.ts:87](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/deployer/default.ts#L87)

Parse Transaction Receipt Event from a Deployer contract transaction and
create DeployContractResponse compatible response with addition of the Deployer Event data

#### Parameters

##### txReceipt

[`InvokeTransactionReceiptResponse`](../type-aliases/InvokeTransactionReceiptResponse.md)

Transaction receipt

#### Returns

[`DeployContractUDCResponse`](../type-aliases/DeployContractUDCResponse.md)

parsed Deployer event data

#### Implementation of

[`DeployerInterface`](DeployerInterface.md).[`parseDeployerEvent`](DeployerInterface.md#parsedeployerevent)
