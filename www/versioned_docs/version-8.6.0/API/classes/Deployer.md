---
id: 'Deployer'
title: 'Class: Deployer'
sidebar_label: 'Deployer'
sidebar_position: 0
custom_edit_url: null
---

## Implements

- [`DeployerInterface`](DeployerInterface.md)

## Constructors

### constructor

• **new Deployer**(`address?`, `entryPoint?`): [`Deployer`](Deployer.md)

#### Parameters

| Name          | Type                                         |
| :------------ | :------------------------------------------- |
| `address?`    | [`BigNumberish`](../modules.md#bignumberish) |
| `entryPoint?` | `string`                                     |

#### Returns

[`Deployer`](Deployer.md)

#### Defined in

[src/deployer/default.ts:23](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/deployer/default.ts#L23)

## Properties

### address

• `Readonly` **address**: [`BigNumberish`](../modules.md#bignumberish)

address of the deployer contract

#### Implementation of

[DeployerInterface](DeployerInterface.md).[address](DeployerInterface.md#address)

#### Defined in

[src/deployer/default.ts:19](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/deployer/default.ts#L19)

---

### entryPoint

• `Readonly` **entryPoint**: `string`

ascii name of the function that deploy a contract

#### Implementation of

[DeployerInterface](DeployerInterface.md).[entryPoint](DeployerInterface.md#entrypoint)

#### Defined in

[src/deployer/default.ts:21](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/deployer/default.ts#L21)

## Methods

### buildDeployerCall

▸ **buildDeployerCall**(`payload`, `address`): [`DeployerCall`](../modules.md#deployercall)

Build a Deployer Call with payload and address

#### Parameters

| Name      | Type                                                                                                                                                                           | Description                                                                                            |
| :-------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------- |
| `payload` | [`UniversalDeployerContractPayload`](../modules.md#universaldeployercontractpayload) \| [`UniversalDeployerContractPayload`](../modules.md#universaldeployercontractpayload)[] | the payload data for the deployer Call. Can be a single payload object or an array of payload objects. |
| `address` | `string`                                                                                                                                                                       | the address to be used in the deployer Call                                                            |

#### Returns

[`DeployerCall`](../modules.md#deployercall)

an object with Calls & addresses

#### Implementation of

[DeployerInterface](DeployerInterface.md).[buildDeployerCall](DeployerInterface.md#builddeployercall)

#### Defined in

[src/deployer/default.ts:28](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/deployer/default.ts#L28)

---

### parseDeployerEvent

▸ **parseDeployerEvent**(`txReceipt`): [`DeployContractUDCResponse`](../modules.md#deploycontractudcresponse)

Parse Transaction Receipt Event from a Deployer contract transaction and
create DeployContractResponse compatible response with addition of the Deployer Event data

#### Parameters

| Name        | Type                                                                                 | Description         |
| :---------- | :----------------------------------------------------------------------------------- | :------------------ |
| `txReceipt` | [`InvokeTransactionReceiptResponse`](../modules.md#invoketransactionreceiptresponse) | Transaction receipt |

#### Returns

[`DeployContractUDCResponse`](../modules.md#deploycontractudcresponse)

parsed Deployer event data

#### Implementation of

[DeployerInterface](DeployerInterface.md).[parseDeployerEvent](DeployerInterface.md#parsedeployerevent)

#### Defined in

[src/deployer/default.ts:83](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/deployer/default.ts#L83)
