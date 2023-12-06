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

[src/utils/hash.ts:30](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/utils/hash.ts#L30)

---

### transactionVersion_2

• `Const` **transactionVersion_2**: `2n`

#### Defined in

[src/utils/hash.ts:31](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/utils/hash.ts#L31)

---

### feeTransactionVersion

• `Const` **feeTransactionVersion**: `bigint`

#### Defined in

[src/utils/hash.ts:33](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/utils/hash.ts#L33)

---

### feeTransactionVersion_2

• `Const` **feeTransactionVersion_2**: `bigint`

#### Defined in

[src/utils/hash.ts:34](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/utils/hash.ts#L34)

## Functions

### getVersionsByType

▸ **getVersionsByType**(`versionType?`): `Object`

Return versions based on version type, default transaction versions

#### Parameters

| Name           | Type                       | Description            |
| :------------- | :------------------------- | :--------------------- |
| `versionType?` | `"fee"` \| `"transaction"` | 'fee' \| 'transaction' |

#### Returns

`Object`

versions { v1: bigint; v2: bigint; }

| Name | Type     |
| :--- | :------- |
| `v1` | `bigint` |
| `v2` | `bigint` |

#### Defined in

[src/utils/hash.ts:41](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/utils/hash.ts#L41)

---

### computeHashOnElements

▸ **computeHashOnElements**(`data`): `string`

#### Parameters

| Name   | Type                                      |
| :----- | :---------------------------------------- |
| `data` | [`BigNumberish`](types.md#bignumberish)[] |

#### Returns

`string`

#### Defined in

[src/utils/hash.ts:47](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/utils/hash.ts#L47)

---

### calculateTransactionHashCommon

▸ **calculateTransactionHashCommon**(`txHashPrefix`, `version`, `contractAddress`, `entryPointSelector`, `calldata`, `maxFee`, `chainId`, `additionalData?`): `string`

#### Parameters

| Name                 | Type                                                                   | Default value |
| :------------------- | :--------------------------------------------------------------------- | :------------ |
| `txHashPrefix`       | [`TransactionHashPrefix`](../enums/constants.TransactionHashPrefix.md) | `undefined`   |
| `version`            | [`BigNumberish`](types.md#bignumberish)                                | `undefined`   |
| `contractAddress`    | [`BigNumberish`](types.md#bignumberish)                                | `undefined`   |
| `entryPointSelector` | [`BigNumberish`](types.md#bignumberish)                                | `undefined`   |
| `calldata`           | [`RawCalldata`](types.md#rawcalldata)                                  | `undefined`   |
| `maxFee`             | [`BigNumberish`](types.md#bignumberish)                                | `undefined`   |
| `chainId`            | [`StarknetChainId`](../enums/constants.StarknetChainId.md)             | `undefined`   |
| `additionalData`     | [`BigNumberish`](types.md#bignumberish)[]                              | `[]`          |

#### Returns

`string`

#### Defined in

[src/utils/hash.ts:56](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/utils/hash.ts#L56)

---

### calculateDeployTransactionHash

▸ **calculateDeployTransactionHash**(`contractAddress`, `constructorCalldata`, `version`, `chainId`, `constructorName?`): `string`

#### Parameters

| Name                  | Type                                                       | Default value   |
| :-------------------- | :--------------------------------------------------------- | :-------------- |
| `contractAddress`     | [`BigNumberish`](types.md#bignumberish)                    | `undefined`     |
| `constructorCalldata` | [`RawCalldata`](types.md#rawcalldata)                      | `undefined`     |
| `version`             | [`BigNumberish`](types.md#bignumberish)                    | `undefined`     |
| `chainId`             | [`StarknetChainId`](../enums/constants.StarknetChainId.md) | `undefined`     |
| `constructorName`     | `string`                                                   | `'constructor'` |

#### Returns

`string`

#### Defined in

[src/utils/hash.ts:80](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/utils/hash.ts#L80)

---

### calculateDeclareTransactionHash

▸ **calculateDeclareTransactionHash**(`classHash`, `senderAddress`, `version`, `maxFee`, `chainId`, `nonce`, `compiledClassHash?`): `string`

#### Parameters

| Name                 | Type                                                       |
| :------------------- | :--------------------------------------------------------- |
| `classHash`          | `string`                                                   |
| `senderAddress`      | [`BigNumberish`](types.md#bignumberish)                    |
| `version`            | [`BigNumberish`](types.md#bignumberish)                    |
| `maxFee`             | [`BigNumberish`](types.md#bignumberish)                    |
| `chainId`            | [`StarknetChainId`](../enums/constants.StarknetChainId.md) |
| `nonce`              | [`BigNumberish`](types.md#bignumberish)                    |
| `compiledClassHash?` | `string`                                                   |

#### Returns

`string`

#### Defined in

[src/utils/hash.ts:98](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/utils/hash.ts#L98)

---

### calculateDeployAccountTransactionHash

▸ **calculateDeployAccountTransactionHash**(`contractAddress`, `classHash`, `constructorCalldata`, `salt`, `version`, `maxFee`, `chainId`, `nonce`): `string`

#### Parameters

| Name                  | Type                                                       |
| :-------------------- | :--------------------------------------------------------- |
| `contractAddress`     | [`BigNumberish`](types.md#bignumberish)                    |
| `classHash`           | [`BigNumberish`](types.md#bignumberish)                    |
| `constructorCalldata` | [`RawCalldata`](types.md#rawcalldata)                      |
| `salt`                | [`BigNumberish`](types.md#bignumberish)                    |
| `version`             | [`BigNumberish`](types.md#bignumberish)                    |
| `maxFee`              | [`BigNumberish`](types.md#bignumberish)                    |
| `chainId`             | [`StarknetChainId`](../enums/constants.StarknetChainId.md) |
| `nonce`               | [`BigNumberish`](types.md#bignumberish)                    |

#### Returns

`string`

#### Defined in

[src/utils/hash.ts:119](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/utils/hash.ts#L119)

---

### calculateTransactionHash

▸ **calculateTransactionHash**(`contractAddress`, `version`, `calldata`, `maxFee`, `chainId`, `nonce`): `string`

#### Parameters

| Name              | Type                                                       |
| :---------------- | :--------------------------------------------------------- |
| `contractAddress` | [`BigNumberish`](types.md#bignumberish)                    |
| `version`         | [`BigNumberish`](types.md#bignumberish)                    |
| `calldata`        | [`RawCalldata`](types.md#rawcalldata)                      |
| `maxFee`          | [`BigNumberish`](types.md#bignumberish)                    |
| `chainId`         | [`StarknetChainId`](../enums/constants.StarknetChainId.md) |
| `nonce`           | [`BigNumberish`](types.md#bignumberish)                    |

#### Returns

`string`

#### Defined in

[src/utils/hash.ts:143](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/utils/hash.ts#L143)

---

### calculateContractAddressFromHash

▸ **calculateContractAddressFromHash**(`salt`, `classHash`, `constructorCalldata`, `deployerAddress`): `string`

#### Parameters

| Name                  | Type                                    |
| :-------------------- | :-------------------------------------- |
| `salt`                | [`BigNumberish`](types.md#bignumberish) |
| `classHash`           | [`BigNumberish`](types.md#bignumberish) |
| `constructorCalldata` | [`RawArgs`](types.md#rawargs)           |
| `deployerAddress`     | [`BigNumberish`](types.md#bignumberish) |

#### Returns

`string`

#### Defined in

[src/utils/hash.ts:163](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/utils/hash.ts#L163)

---

### formatSpaces

▸ **formatSpaces**(`json`): `string`

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `json` | `string` |

#### Returns

`string`

#### Defined in

[src/utils/hash.ts:196](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/utils/hash.ts#L196)

---

### default

▸ **default**(`compiledContract`): `string`

#### Parameters

| Name               | Type                                                        |
| :----------------- | :---------------------------------------------------------- |
| `compiledContract` | [`LegacyCompiledContract`](types.md#legacycompiledcontract) |

#### Returns

`string`

#### Defined in

[src/utils/hash.ts:214](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/utils/hash.ts#L214)

---

### computeLegacyContractClassHash

▸ **computeLegacyContractClassHash**(`contract`): `string`

#### Parameters

| Name       | Type                                                                    |
| :--------- | :---------------------------------------------------------------------- |
| `contract` | `string` \| [`LegacyCompiledContract`](types.md#legacycompiledcontract) |

#### Returns

`string`

#### Defined in

[src/utils/hash.ts:223](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/utils/hash.ts#L223)

---

### computeCompiledClassHash

▸ **computeCompiledClassHash**(`casm`): `string`

#### Parameters

| Name   | Type                                      |
| :----- | :---------------------------------------- |
| `casm` | [`CairoAssembly`](types.md#cairoassembly) |

#### Returns

`string`

#### Defined in

[src/utils/hash.ts:276](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/utils/hash.ts#L276)

---

### computeSierraContractClassHash

▸ **computeSierraContractClassHash**(`sierra`): `string`

#### Parameters

| Name     | Type                                        |
| :------- | :------------------------------------------ |
| `sierra` | [`CompiledSierra`](types.md#compiledsierra) |

#### Returns

`string`

#### Defined in

[src/utils/hash.ts:317](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/utils/hash.ts#L317)

---

### computeContractClassHash

▸ **computeContractClassHash**(`contract`): `string`

Compute ClassHash (sierra or legacy) based on provided contract

#### Parameters

| Name       | Type                                                        | Description                                  |
| :--------- | :---------------------------------------------------------- | :------------------------------------------- |
| `contract` | `string` \| [`CompiledContract`](types.md#compiledcontract) | CompiledContract \| CompiledSierra \| string |

#### Returns

`string`

HexString ClassHash

#### Defined in

[src/utils/hash.ts:355](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/utils/hash.ts#L355)

---

### keccakBn

▸ **keccakBn**(`value`): `string`

Keccak hash BigNumberish value

#### Parameters

| Name    | Type                                    | Description  |
| :------ | :-------------------------------------- | :----------- |
| `value` | [`BigNumberish`](types.md#bignumberish) | BigNumberish |

#### Returns

`string`

string - hexadecimal string

#### Defined in

[src/utils/selector.ts:13](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/utils/selector.ts#L13)

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

[src/utils/selector.ts:35](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/utils/selector.ts#L35)

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

[src/utils/selector.ts:48](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/utils/selector.ts#L48)

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

[src/utils/selector.ts:58](https://github.com/starknet-io/starknet.js/blob/v5.19.5/src/utils/selector.ts#L58)
