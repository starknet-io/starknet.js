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

[src/utils/hash.ts:30](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/hash.ts#L30)

---

### transactionVersion_2

• `Const` **transactionVersion_2**: `2n`

#### Defined in

[src/utils/hash.ts:31](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/hash.ts#L31)

---

### feeTransactionVersion

• `Const` **feeTransactionVersion**: `bigint`

#### Defined in

[src/utils/hash.ts:32](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/hash.ts#L32)

## Functions

### computeHashOnElements

▸ **computeHashOnElements**(`data`): `string`

#### Parameters

| Name   | Type                                      |
| :----- | :---------------------------------------- |
| `data` | [`BigNumberish`](types.md#bignumberish)[] |

#### Returns

`string`

#### Defined in

[src/utils/hash.ts:34](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/hash.ts#L34)

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

[src/utils/hash.ts:43](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/hash.ts#L43)

---

### calculateDeployTransactionHash

▸ **calculateDeployTransactionHash**(`contractAddress`, `constructorCalldata`, `version`, `chainId`): `string`

#### Parameters

| Name                  | Type                                                       |
| :-------------------- | :--------------------------------------------------------- |
| `contractAddress`     | [`BigNumberish`](types.md#bignumberish)                    |
| `constructorCalldata` | [`RawCalldata`](types.md#rawcalldata)                      |
| `version`             | [`BigNumberish`](types.md#bignumberish)                    |
| `chainId`             | [`StarknetChainId`](../enums/constants.StarknetChainId.md) |

#### Returns

`string`

#### Defined in

[src/utils/hash.ts:67](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/hash.ts#L67)

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

[src/utils/hash.ts:84](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/hash.ts#L84)

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

[src/utils/hash.ts:105](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/hash.ts#L105)

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

[src/utils/hash.ts:129](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/hash.ts#L129)

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

[src/utils/hash.ts:149](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/hash.ts#L149)

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

[src/utils/hash.ts:181](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/hash.ts#L181)

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

[src/utils/hash.ts:199](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/hash.ts#L199)

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

[src/utils/hash.ts:208](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/hash.ts#L208)

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

[src/utils/hash.ts:261](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/hash.ts#L261)

---

### computeSierraContractClassHash

▸ **computeSierraContractClassHash**(`sierra`): `string`

#### Parameters

| Name     | Type                                                  |
| :------- | :---------------------------------------------------- |
| `sierra` | [`SierraContractClass`](types.md#sierracontractclass) |

#### Returns

`string`

#### Defined in

[src/utils/hash.ts:302](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/hash.ts#L302)

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

[src/utils/hash.ts:340](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/hash.ts#L340)

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

[src/utils/selector.ts:13](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/selector.ts#L13)

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

[src/utils/selector.ts:35](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/selector.ts#L35)

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

[src/utils/selector.ts:48](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/selector.ts#L48)

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

[src/utils/selector.ts:58](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/selector.ts#L58)
