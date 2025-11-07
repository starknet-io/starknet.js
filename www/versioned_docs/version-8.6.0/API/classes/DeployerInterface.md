---
id: 'DeployerInterface'
title: 'Class: DeployerInterface'
sidebar_label: 'DeployerInterface'
sidebar_position: 0
custom_edit_url: null
---

## Implemented by

- [`Deployer`](Deployer.md)

## Constructors

### constructor

• **new DeployerInterface**(): [`DeployerInterface`](DeployerInterface.md)

#### Returns

[`DeployerInterface`](DeployerInterface.md)

## Properties

### address

• `Readonly` `Abstract` **address**: [`BigNumberish`](../modules.md#bignumberish)

address of the deployer contract

#### Defined in

[src/deployer/interface.ts:11](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/deployer/interface.ts#L11)

---

### entryPoint

• `Readonly` `Abstract` **entryPoint**: `string`

ascii name of the function that deploy a contract

#### Defined in

[src/deployer/interface.ts:14](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/deployer/interface.ts#L14)

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

#### Defined in

[src/deployer/interface.ts:22](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/deployer/interface.ts#L22)

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

#### Defined in

[src/deployer/interface.ts:35](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/deployer/interface.ts#L35)
