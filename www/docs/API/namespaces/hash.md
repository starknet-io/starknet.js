---
id: 'hash'
title: 'Namespace: hash'
sidebar_label: 'hash'
sidebar_position: 0
custom_edit_url: null
---

## Namespaces

- [poseidon](hash.poseidon.md)

## Variables

### transactionVersion

• `Const` **transactionVersion**: `1n`

#### Defined in

[src/utils/hash.ts:17](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/utils/hash.ts#L17)

---

### feeTransactionVersion

• `Const` **feeTransactionVersion**: `bigint`

#### Defined in

[src/utils/hash.ts:18](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/utils/hash.ts#L18)

## Functions

### keccakBn

▸ **keccakBn**(`value`): `string`

#### Parameters

| Name    | Type                                  |
| :------ | :------------------------------------ |
| `value` | [`BigNumberish`](num.md#bignumberish) |

#### Returns

`string`

#### Defined in

[src/utils/hash.ts:20](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/utils/hash.ts#L20)

---

### starknetKeccak

▸ **starknetKeccak**(`value`): `bigint`

Function to get the starknet keccak hash from a string

[Reference](https://github.com/starkware-libs/cairo-lang/blob/master/src/starkware/starknet/public/abi.py#L17-L22)

#### Parameters

| Name    | Type     | Description                                         |
| :------ | :------- | :-------------------------------------------------- |
| `value` | `string` | string you want to get the starknetKeccak hash from |

#### Returns

`bigint`

starknet keccak hash as BigNumber

#### Defined in

[src/utils/hash.ts:37](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/utils/hash.ts#L37)

---

### getSelectorFromName

▸ **getSelectorFromName**(`funcName`): `string`

Function to get the hex selector from a given function name

[Reference](https://github.com/starkware-libs/cairo-lang/blob/master/src/starkware/starknet/public/abi.py#L25-L26)

#### Parameters

| Name       | Type     | Description                 |
| :--------- | :------- | :-------------------------- |
| `funcName` | `string` | selectors abi function name |

#### Returns

`string`

hex selector of given abi function name

#### Defined in

[src/utils/hash.ts:50](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/utils/hash.ts#L50)

---

### getSelector

▸ **getSelector**(`value`): `string`

Function to get hex selector from function name, decimal string or hex string

#### Parameters

| Name    | Type     | Description                            |
| :------ | :------- | :------------------------------------- |
| `value` | `string` | hex string \| decimal string \| string |

#### Returns

`string`

Hex selector

#### Defined in

[src/utils/hash.ts:60](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/utils/hash.ts#L60)

---

### computeHashOnElements

▸ **computeHashOnElements**(`data`): `string`

#### Parameters

| Name   | Type                                    |
| :----- | :-------------------------------------- |
| `data` | [`BigNumberish`](num.md#bignumberish)[] |

#### Returns

`string`

#### Defined in

[src/utils/hash.ts:70](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/utils/hash.ts#L70)

---

### calculateTransactionHashCommon

▸ **calculateTransactionHashCommon**(`txHashPrefix`, `version`, `contractAddress`, `entryPointSelector`, `calldata`, `maxFee`, `chainId`, `additionalData?`): `string`

#### Parameters

| Name                 | Type                                                                   | Default value |
| :------------------- | :--------------------------------------------------------------------- | :------------ |
| `txHashPrefix`       | [`TransactionHashPrefix`](../enums/constants.TransactionHashPrefix.md) | `undefined`   |
| `version`            | [`BigNumberish`](num.md#bignumberish)                                  | `undefined`   |
| `contractAddress`    | [`BigNumberish`](num.md#bignumberish)                                  | `undefined`   |
| `entryPointSelector` | [`BigNumberish`](num.md#bignumberish)                                  | `undefined`   |
| `calldata`           | [`BigNumberish`](num.md#bignumberish)[]                                | `undefined`   |
| `maxFee`             | [`BigNumberish`](num.md#bignumberish)                                  | `undefined`   |
| `chainId`            | [`StarknetChainId`](../enums/constants.StarknetChainId.md)             | `undefined`   |
| `additionalData`     | [`BigNumberish`](num.md#bignumberish)[]                                | `[]`          |

#### Returns

`string`

#### Defined in

[src/utils/hash.ts:79](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/utils/hash.ts#L79)

---

### calculateDeployTransactionHash

▸ **calculateDeployTransactionHash**(`contractAddress`, `constructorCalldata`, `version`, `chainId`): `string`

#### Parameters

| Name                  | Type                                                       |
| :-------------------- | :--------------------------------------------------------- |
| `contractAddress`     | [`BigNumberish`](num.md#bignumberish)                      |
| `constructorCalldata` | [`BigNumberish`](num.md#bignumberish)[]                    |
| `version`             | [`BigNumberish`](num.md#bignumberish)                      |
| `chainId`             | [`StarknetChainId`](../enums/constants.StarknetChainId.md) |

#### Returns

`string`

#### Defined in

[src/utils/hash.ts:103](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/utils/hash.ts#L103)

---

### calculateDeclareTransactionHash

▸ **calculateDeclareTransactionHash**(`classHash`, `senderAddress`, `version`, `maxFee`, `chainId`, `nonce`): `string`

#### Parameters

| Name            | Type                                                       |
| :-------------- | :--------------------------------------------------------- |
| `classHash`     | `string`                                                   |
| `senderAddress` | [`BigNumberish`](num.md#bignumberish)                      |
| `version`       | [`BigNumberish`](num.md#bignumberish)                      |
| `maxFee`        | [`BigNumberish`](num.md#bignumberish)                      |
| `chainId`       | [`StarknetChainId`](../enums/constants.StarknetChainId.md) |
| `nonce`         | [`BigNumberish`](num.md#bignumberish)                      |

#### Returns

`string`

#### Defined in

[src/utils/hash.ts:120](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/utils/hash.ts#L120)

---

### calculateDeployAccountTransactionHash

▸ **calculateDeployAccountTransactionHash**(`contractAddress`, `classHash`, `constructorCalldata`, `salt`, `version`, `maxFee`, `chainId`, `nonce`): `string`

#### Parameters

| Name                  | Type                                                       |
| :-------------------- | :--------------------------------------------------------- |
| `contractAddress`     | [`BigNumberish`](num.md#bignumberish)                      |
| `classHash`           | [`BigNumberish`](num.md#bignumberish)                      |
| `constructorCalldata` | [`BigNumberish`](num.md#bignumberish)[]                    |
| `salt`                | [`BigNumberish`](num.md#bignumberish)                      |
| `version`             | [`BigNumberish`](num.md#bignumberish)                      |
| `maxFee`              | [`BigNumberish`](num.md#bignumberish)                      |
| `chainId`             | [`StarknetChainId`](../enums/constants.StarknetChainId.md) |
| `nonce`               | [`BigNumberish`](num.md#bignumberish)                      |

#### Returns

`string`

#### Defined in

[src/utils/hash.ts:140](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/utils/hash.ts#L140)

---

### calculateTransactionHash

▸ **calculateTransactionHash**(`contractAddress`, `version`, `calldata`, `maxFee`, `chainId`, `nonce`): `string`

#### Parameters

| Name              | Type                                                       |
| :---------------- | :--------------------------------------------------------- |
| `contractAddress` | [`BigNumberish`](num.md#bignumberish)                      |
| `version`         | [`BigNumberish`](num.md#bignumberish)                      |
| `calldata`        | [`BigNumberish`](num.md#bignumberish)[]                    |
| `maxFee`          | [`BigNumberish`](num.md#bignumberish)                      |
| `chainId`         | [`StarknetChainId`](../enums/constants.StarknetChainId.md) |
| `nonce`           | [`BigNumberish`](num.md#bignumberish)                      |

#### Returns

`string`

#### Defined in

[src/utils/hash.ts:164](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/utils/hash.ts#L164)

---

### calculateContractAddressFromHash

▸ **calculateContractAddressFromHash**(`salt`, `classHash`, `constructorCalldata`, `deployerAddress`): `string`

#### Parameters

| Name                  | Type                                       |
| :-------------------- | :----------------------------------------- |
| `salt`                | [`BigNumberish`](num.md#bignumberish)      |
| `classHash`           | [`BigNumberish`](num.md#bignumberish)      |
| `constructorCalldata` | [`RawCalldata`](../modules.md#rawcalldata) |
| `deployerAddress`     | [`BigNumberish`](num.md#bignumberish)      |

#### Returns

`string`

#### Defined in

[src/utils/hash.ts:184](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/utils/hash.ts#L184)

---

### default

▸ **default**(`compiledContract`): `string`

#### Parameters

| Name               | Type                                                 |
| :----------------- | :--------------------------------------------------- |
| `compiledContract` | [`CompiledContract`](../modules.md#compiledcontract) |

#### Returns

`string`

#### Defined in

[src/utils/hash.ts:215](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/utils/hash.ts#L215)

---

### computeContractClassHash

▸ **computeContractClassHash**(`contract`): `string`

#### Parameters

| Name       | Type                                                             |
| :--------- | :--------------------------------------------------------------- |
| `contract` | `string` \| [`CompiledContract`](../modules.md#compiledcontract) |

#### Returns

`string`

#### Defined in

[src/utils/hash.ts:248](https://github.com/PhilippeR26/starknet.js/blob/689c0e5/src/utils/hash.ts#L248)
