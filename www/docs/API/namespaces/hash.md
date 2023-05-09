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

[src/utils/hash.ts:33](https://github.com/notV4l/starknet.js/blob/c20c3bd/src/utils/hash.ts#L33)

---

### transactionVersion_2

• `Const` **transactionVersion_2**: `2n`

#### Defined in

[src/utils/hash.ts:34](https://github.com/notV4l/starknet.js/blob/c20c3bd/src/utils/hash.ts#L34)

---

### feeTransactionVersion

• `Const` **feeTransactionVersion**: `bigint`

#### Defined in

[src/utils/hash.ts:35](https://github.com/notV4l/starknet.js/blob/c20c3bd/src/utils/hash.ts#L35)

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

[src/utils/hash.ts:37](https://github.com/notV4l/starknet.js/blob/c20c3bd/src/utils/hash.ts#L37)

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

[src/utils/hash.ts:54](https://github.com/notV4l/starknet.js/blob/c20c3bd/src/utils/hash.ts#L54)

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

[src/utils/hash.ts:67](https://github.com/notV4l/starknet.js/blob/c20c3bd/src/utils/hash.ts#L67)

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

[src/utils/hash.ts:77](https://github.com/notV4l/starknet.js/blob/c20c3bd/src/utils/hash.ts#L77)

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

[src/utils/hash.ts:87](https://github.com/notV4l/starknet.js/blob/c20c3bd/src/utils/hash.ts#L87)

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

[src/utils/hash.ts:96](https://github.com/notV4l/starknet.js/blob/c20c3bd/src/utils/hash.ts#L96)

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

[src/utils/hash.ts:120](https://github.com/notV4l/starknet.js/blob/c20c3bd/src/utils/hash.ts#L120)

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

[src/utils/hash.ts:137](https://github.com/notV4l/starknet.js/blob/c20c3bd/src/utils/hash.ts#L137)

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

[src/utils/hash.ts:158](https://github.com/notV4l/starknet.js/blob/c20c3bd/src/utils/hash.ts#L158)

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

[src/utils/hash.ts:182](https://github.com/notV4l/starknet.js/blob/c20c3bd/src/utils/hash.ts#L182)

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

[src/utils/hash.ts:202](https://github.com/notV4l/starknet.js/blob/c20c3bd/src/utils/hash.ts#L202)

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

[src/utils/hash.ts:233](https://github.com/notV4l/starknet.js/blob/c20c3bd/src/utils/hash.ts#L233)

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

[src/utils/hash.ts:251](https://github.com/notV4l/starknet.js/blob/c20c3bd/src/utils/hash.ts#L251)

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

[src/utils/hash.ts:260](https://github.com/notV4l/starknet.js/blob/c20c3bd/src/utils/hash.ts#L260)

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

[src/utils/hash.ts:313](https://github.com/notV4l/starknet.js/blob/c20c3bd/src/utils/hash.ts#L313)

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

[src/utils/hash.ts:354](https://github.com/notV4l/starknet.js/blob/c20c3bd/src/utils/hash.ts#L354)

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

[src/utils/hash.ts:392](https://github.com/notV4l/starknet.js/blob/c20c3bd/src/utils/hash.ts#L392)
