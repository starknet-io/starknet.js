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

[src/utils/hash.ts:29](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/hash.ts#L29)

---

### transactionVersion_2

• `Const` **transactionVersion_2**: `2n`

#### Defined in

[src/utils/hash.ts:30](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/hash.ts#L30)

---

### feeTransactionVersion

• `Const` **feeTransactionVersion**: `bigint`

#### Defined in

[src/utils/hash.ts:31](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/hash.ts#L31)

## Functions

### computeHashOnElements

▸ **computeHashOnElements**(`data`): `string`

#### Parameters

| Name   | Type                                    |
| :----- | :-------------------------------------- |
| `data` | [`BigNumberish`](num.md#bignumberish)[] |

#### Returns

`string`

#### Defined in

[src/utils/hash.ts:33](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/hash.ts#L33)

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
| `calldata`           | [`RawCalldata`](../modules.md#rawcalldata)                             | `undefined`   |
| `maxFee`             | [`BigNumberish`](num.md#bignumberish)                                  | `undefined`   |
| `chainId`            | [`StarknetChainId`](../enums/constants.StarknetChainId.md)             | `undefined`   |
| `additionalData`     | [`BigNumberish`](num.md#bignumberish)[]                                | `[]`          |

#### Returns

`string`

#### Defined in

[src/utils/hash.ts:42](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/hash.ts#L42)

---

### calculateDeployTransactionHash

▸ **calculateDeployTransactionHash**(`contractAddress`, `constructorCalldata`, `version`, `chainId`): `string`

#### Parameters

| Name                  | Type                                                       |
| :-------------------- | :--------------------------------------------------------- |
| `contractAddress`     | [`BigNumberish`](num.md#bignumberish)                      |
| `constructorCalldata` | [`RawCalldata`](../modules.md#rawcalldata)                 |
| `version`             | [`BigNumberish`](num.md#bignumberish)                      |
| `chainId`             | [`StarknetChainId`](../enums/constants.StarknetChainId.md) |

#### Returns

`string`

#### Defined in

[src/utils/hash.ts:66](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/hash.ts#L66)

---

### calculateDeclareTransactionHash

▸ **calculateDeclareTransactionHash**(`classHash`, `senderAddress`, `version`, `maxFee`, `chainId`, `nonce`, `compiledClassHash?`): `string`

#### Parameters

| Name                 | Type                                                       |
| :------------------- | :--------------------------------------------------------- |
| `classHash`          | `string`                                                   |
| `senderAddress`      | [`BigNumberish`](num.md#bignumberish)                      |
| `version`            | [`BigNumberish`](num.md#bignumberish)                      |
| `maxFee`             | [`BigNumberish`](num.md#bignumberish)                      |
| `chainId`            | [`StarknetChainId`](../enums/constants.StarknetChainId.md) |
| `nonce`              | [`BigNumberish`](num.md#bignumberish)                      |
| `compiledClassHash?` | `string`                                                   |

#### Returns

`string`

#### Defined in

[src/utils/hash.ts:83](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/hash.ts#L83)

---

### calculateDeployAccountTransactionHash

▸ **calculateDeployAccountTransactionHash**(`contractAddress`, `classHash`, `constructorCalldata`, `salt`, `version`, `maxFee`, `chainId`, `nonce`): `string`

#### Parameters

| Name                  | Type                                                       |
| :-------------------- | :--------------------------------------------------------- |
| `contractAddress`     | [`BigNumberish`](num.md#bignumberish)                      |
| `classHash`           | [`BigNumberish`](num.md#bignumberish)                      |
| `constructorCalldata` | [`RawCalldata`](../modules.md#rawcalldata)                 |
| `salt`                | [`BigNumberish`](num.md#bignumberish)                      |
| `version`             | [`BigNumberish`](num.md#bignumberish)                      |
| `maxFee`              | [`BigNumberish`](num.md#bignumberish)                      |
| `chainId`             | [`StarknetChainId`](../enums/constants.StarknetChainId.md) |
| `nonce`               | [`BigNumberish`](num.md#bignumberish)                      |

#### Returns

`string`

#### Defined in

[src/utils/hash.ts:104](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/hash.ts#L104)

---

### calculateTransactionHash

▸ **calculateTransactionHash**(`contractAddress`, `version`, `calldata`, `maxFee`, `chainId`, `nonce`): `string`

#### Parameters

| Name              | Type                                                       |
| :---------------- | :--------------------------------------------------------- |
| `contractAddress` | [`BigNumberish`](num.md#bignumberish)                      |
| `version`         | [`BigNumberish`](num.md#bignumberish)                      |
| `calldata`        | [`RawCalldata`](../modules.md#rawcalldata)                 |
| `maxFee`          | [`BigNumberish`](num.md#bignumberish)                      |
| `chainId`         | [`StarknetChainId`](../enums/constants.StarknetChainId.md) |
| `nonce`           | [`BigNumberish`](num.md#bignumberish)                      |

#### Returns

`string`

#### Defined in

[src/utils/hash.ts:128](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/hash.ts#L128)

---

### calculateContractAddressFromHash

▸ **calculateContractAddressFromHash**(`salt`, `classHash`, `constructorCalldata`, `deployerAddress`): `string`

#### Parameters

| Name                  | Type                                  |
| :-------------------- | :------------------------------------ |
| `salt`                | [`BigNumberish`](num.md#bignumberish) |
| `classHash`           | [`BigNumberish`](num.md#bignumberish) |
| `constructorCalldata` | [`RawArgs`](../modules.md#rawargs)    |
| `deployerAddress`     | [`BigNumberish`](num.md#bignumberish) |

#### Returns

`string`

#### Defined in

[src/utils/hash.ts:148](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/hash.ts#L148)

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

[src/utils/hash.ts:180](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/hash.ts#L180)

---

### default

▸ **default**(`compiledContract`): `string`

#### Parameters

| Name               | Type                                                             |
| :----------------- | :--------------------------------------------------------------- |
| `compiledContract` | [`LegacyCompiledContract`](../modules.md#legacycompiledcontract) |

#### Returns

`string`

#### Defined in

[src/utils/hash.ts:198](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/hash.ts#L198)

---

### computeLegacyContractClassHash

▸ **computeLegacyContractClassHash**(`contract`): `string`

#### Parameters

| Name       | Type                                                                         |
| :--------- | :--------------------------------------------------------------------------- |
| `contract` | `string` \| [`LegacyCompiledContract`](../modules.md#legacycompiledcontract) |

#### Returns

`string`

#### Defined in

[src/utils/hash.ts:207](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/hash.ts#L207)

---

### computeCompiledClassHash

▸ **computeCompiledClassHash**(`casm`): `string`

#### Parameters

| Name   | Type                                           |
| :----- | :--------------------------------------------- |
| `casm` | [`CairoAssembly`](../modules.md#cairoassembly) |

#### Returns

`string`

#### Defined in

[src/utils/hash.ts:260](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/hash.ts#L260)

---

### computeSierraContractClassHash

▸ **computeSierraContractClassHash**(`sierra`): `string`

#### Parameters

| Name     | Type                                                       |
| :------- | :--------------------------------------------------------- |
| `sierra` | [`SierraContractClass`](../modules.md#sierracontractclass) |

#### Returns

`string`

#### Defined in

[src/utils/hash.ts:301](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/hash.ts#L301)

---

### computeContractClassHash

▸ **computeContractClassHash**(`contract`): `string`

Compute ClassHash (sierra or legacy) based on provided contract

#### Parameters

| Name       | Type                                                             | Description                                  |
| :--------- | :--------------------------------------------------------------- | :------------------------------------------- |
| `contract` | `string` \| [`CompiledContract`](../modules.md#compiledcontract) | CompiledContract \| CompiledSierra \| string |

#### Returns

`string`

HexString ClassHash

#### Defined in

[src/utils/hash.ts:339](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/hash.ts#L339)

---

### keccakBn

▸ **keccakBn**(`value`): `string`

Keccak hash BigNumberish value

#### Parameters

| Name    | Type                                  | Description  |
| :------ | :------------------------------------ | :----------- |
| `value` | [`BigNumberish`](num.md#bignumberish) | BigNumberish |

#### Returns

`string`

string - hexadecimal string

#### Defined in

[src/utils/selector.ts:12](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/selector.ts#L12)

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

[src/utils/selector.ts:34](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/selector.ts#L34)

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

[src/utils/selector.ts:47](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/selector.ts#L47)

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

[src/utils/selector.ts:57](https://github.com/0xs34n/starknet.js/blob/develop/src/utils/selector.ts#L57)
