---
id: 'stark'
title: 'Namespace: stark'
sidebar_label: 'stark'
sidebar_position: 0
custom_edit_url: null
---

## Type Aliases

### feeOverhead

Ƭ **feeOverhead**: [`ResourceBounds`](types.md#resourcebounds)

#### Defined in

[src/utils/stark/index.ts:232](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/utils/stark/index.ts#L232)

## Functions

### compressProgram

▸ **compressProgram**(`jsonProgram`): [`CompressedProgram`](types.md#compressedprogram)

Compress compiled Cairo 0 program

[Reference](https://github.com/starkware-libs/cairo-lang/blob/master/src/starkware/starknet/services/api/gateway/transaction.py#L54-L58)

#### Parameters

| Name          | Type                                                    | Description                               |
| :------------ | :------------------------------------------------------ | :---------------------------------------- |
| `jsonProgram` | `string` \| [`Program`](../interfaces/types.Program.md) | Representing the compiled Cairo 0 program |

#### Returns

[`CompressedProgram`](types.md#compressedprogram)

Compressed Cairo 0 program

**`Example`**

```typescript
const contractCairo0 = json.parse(fs.readFileSync('./cairo0contract.json').toString('ascii'));
const result = stark.compressProgram(contractCairo0);
// result = "H4sIAAAAAAAAA+1dC4/bOJL+K4aBu01me7r5EEUyixzQk/TuB..."
```

#### Defined in

[src/utils/stark/index.ts:70](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/utils/stark/index.ts#L70)

---

### decompressProgram

▸ **decompressProgram**(`base64`): `any`

Decompress compressed compiled Cairo 0 program

#### Parameters

| Name     | Type                   | Description                |
| :------- | :--------------------- | :------------------------- |
| `base64` | `string` \| `string`[] | Compressed Cairo 0 program |

#### Returns

`any`

Parsed decompressed compiled Cairo 0 program

**`Example`**

```typescript
const contractCairo0 = json.parse(fs.readFileSync('./cairo0contract.json').toString('ascii'));
const compressedCairo0 = stark.compressProgram(contractCairo0);
const result = stark.decompressProgram(compressedCairo0);
// result = {
//   abi: [
//     {
//       inputs: [Array],
//       name: 'increase_balance',
//       outputs: [],
//       type: 'function'
//     }
//   ],
//   entry_points_by_type: { CONSTRUCTOR: [], EXTERNAL: [ [Object], [Object] ], L1_HANDLER: [] },
//   program: {
//     attributes: [],
//     builtins: [ 'pedersen', 'range_check' ],
//     compiler_version: '0.10.2',
//     data: [
//       '0x480680017fff8000',
// ...
```

#### Defined in

[src/utils/stark/index.ts:104](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/utils/stark/index.ts#L104)

---

### randomAddress

▸ **randomAddress**(): `string`

Random Address based on random keyPair

#### Returns

`string`

an hex string of a random Starknet address

**`Example`**

```typescript
const result = stark.randomAddress();
// result = "0x51fc8126a13cd5ddb29a71ca399cb1e814f086f5af1b502d7151c14929554f"
```

#### Defined in

[src/utils/stark/index.ts:119](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/utils/stark/index.ts#L119)

---

### formatSignature

▸ **formatSignature**(`sig?`): [`ArraySignatureType`](types.md#arraysignaturetype)

Format Signature to standard type (hex array)

#### Parameters

| Name   | Type                              |
| :----- | :-------------------------------- |
| `sig?` | [`Signature`](types.md#signature) |

#### Returns

[`ArraySignatureType`](types.md#arraysignaturetype)

Custom hex string array

**`Throws`**

if sig not defined, or wrong format

**`Example`**

```typescript
const signature = ec.starkCurve.sign('0x12de34', '0x3487123eac');
const result = stark.formatSignature(signature);
// result = ['0xba8eecee2d69c417e8c6a20cf331c821f716b58ba9e47166c7476afdb38997',
//  '0x69ef7438c94104839a6e2aa2385482a77399d2f46e894ae4f50ab6d69239d1c']
```

#### Defined in

[src/utils/stark/index.ts:137](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/utils/stark/index.ts#L137)

---

### signatureToDecimalArray

▸ **signatureToDecimalArray**(`sig?`): [`ArraySignatureType`](types.md#arraysignaturetype)

Format Signature to decimal string array

#### Parameters

| Name   | Type                              |
| :----- | :-------------------------------- |
| `sig?` | [`Signature`](types.md#signature) |

#### Returns

[`ArraySignatureType`](types.md#arraysignaturetype)

Custom hex string array

**`Throws`**

if sig not defined, or wrong format

**`Example`**

```typescript
const signature = ec.starkCurve.sign('0x12de34', '0x3487123eac');
const result = stark.signatureToDecimalArray(signature);
// result = ['329619989660444495690615805546674399714973829707166906185976654753023887767',
//  '2994745480203297689255012826403147585778741462125743754529207781488706428188']
```

#### Defined in

[src/utils/stark/index.ts:163](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/utils/stark/index.ts#L163)

---

### signatureToHexArray

▸ **signatureToHexArray**(`sig?`): [`ArraySignatureType`](types.md#arraysignaturetype)

Format Signature to hex string array

#### Parameters

| Name   | Type                              |
| :----- | :-------------------------------- |
| `sig?` | [`Signature`](types.md#signature) |

#### Returns

[`ArraySignatureType`](types.md#arraysignaturetype)

Custom hex string array

**`Throws`**

if sig not defined, or wrong format

**`Example`**

```typescript
const signature = ec.starkCurve.sign('0x12de34', '0x3487123eac');
const result = stark.signatureToHexArray(signature);
// result = ['0xba8eecee2d69c417e8c6a20cf331c821f716b58ba9e47166c7476afdb38997',
//  '0x69ef7438c94104839a6e2aa2385482a77399d2f46e894ae4f50ab6d69239d1c']
```

#### Defined in

[src/utils/stark/index.ts:180](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/utils/stark/index.ts#L180)

---

### estimatedFeeToMaxFee

▸ **estimatedFeeToMaxFee**(`estimatedFee`, `overhead?`): `bigint`

Convert estimated fee to max fee including a margin

#### Parameters

| Name           | Type                                    | Description                   |
| :------------- | :-------------------------------------- | :---------------------------- |
| `estimatedFee` | [`BigNumberish`](types.md#bignumberish) | The estimated fee             |
| `overhead?`    | `number`                                | The overhead added to the gas |

#### Returns

`bigint`

The maximum fee with the margin

**`Example`**

```typescript
const result = stark.estimatedFeeToMaxFee('8982300000000', 50);
// result = "13473450000000n"
```

#### Defined in

[src/utils/stark/index.ts:195](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/utils/stark/index.ts#L195)

---

### estimateFeeToBounds

▸ **estimateFeeToBounds**(`estimate`, `overhead?`, `specVersion?`): [`ResourceBounds`](types.md#resourcebounds)

Calculates the maximum resource bounds for fee estimation.

#### Parameters

| Name           | Type                                                        | Description                                                                                  |
| :------------- | :---------------------------------------------------------- | :------------------------------------------------------------------------------------------- |
| `estimate`     | `0n` \| [`FeeEstimate`](types.md#feeestimate)               | The estimate for the fee. If a BigInt is provided, the returned bounds will be set to '0x0'. |
| `overhead?`    | [`ResourceBoundsOverhead`](types.md#resourceboundsoverhead) | The percentage overhead added to the max units and max price per unit.                       |
| `specVersion?` | `"0.7.1"` \| `"0.8.1"`                                      | -                                                                                            |

#### Returns

[`ResourceBounds`](types.md#resourcebounds)

The resource bounds with overhead.

**`Throws`**

If the estimate object is undefined or does not have the required properties.

#### Defined in

[src/utils/stark/index.ts:210](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/utils/stark/index.ts#L210)

---

### ZEROFee

▸ **ZEROFee**(`specVersion`): `Object`

Mock zero fee response

#### Parameters

| Name          | Type                   |
| :------------ | :--------------------- |
| `specVersion` | `"0.7.1"` \| `"0.8.1"` |

#### Returns

`Object`

| Name                   | Type                                                  |
| :--------------------- | :---------------------------------------------------- |
| `l1_gas_consumed`      | `bigint`                                              |
| `l1_gas_price`         | `bigint`                                              |
| `l1_data_gas_consumed` | `bigint`                                              |
| `l1_data_gas_price`    | `bigint`                                              |
| `l2_gas_consumed`      | `bigint`                                              |
| `l2_gas_price`         | `bigint`                                              |
| `overall_fee`          | `bigint`                                              |
| `unit`                 | [`PRICE_UNIT`](types.RPC.RPCSPEC08.API.md#price_unit) |
| `suggestedMaxFee`      | `bigint`                                              |
| `resourceBounds`       | [`ResourceBounds`](types.md#resourcebounds)           |

#### Defined in

[src/utils/stark/index.ts:237](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/utils/stark/index.ts#L237)

---

### intDAM

▸ **intDAM**(`dam`): [`EDAMode`](types.md#edamode-1)

Converts the data availability mode from EDataAvailabilityMode to EDAMode.

#### Parameters

| Name  | Type                                                                          | Description                                 |
| :---- | :---------------------------------------------------------------------------- | :------------------------------------------ |
| `dam` | [`EDataAvailabilityMode`](types.RPC.RPCSPEC08.API.md#edataavailabilitymode-1) | The data availability mode to be converted. |

#### Returns

[`EDAMode`](types.md#edamode-1)

The converted data availability mode.

**`Throws`**

If the data availability mode is not a valid value.

**`Example`**

```typescript
const result = stark.intDAM(RPC.EDataAvailabilityMode.L1);
// result = 0
```

#### Defined in

[src/utils/stark/index.ts:264](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/utils/stark/index.ts#L264)

---

### toTransactionVersion

▸ **toTransactionVersion**(`defaultVersion`, `providedVersion?`): [`ETransactionVersion`](types.md#etransactionversion-1)

Convert to ETransactionVersion or throw an error.
Return providedVersion is specified else return defaultVersion

#### Parameters

| Name               | Type                                    | Description                          |
| :----------------- | :-------------------------------------- | :----------------------------------- |
| `defaultVersion`   | [`BigNumberish`](types.md#bignumberish) | default estimate transaction version |
| `providedVersion?` | [`BigNumberish`](types.md#bignumberish) | estimate transaction version         |

#### Returns

[`ETransactionVersion`](types.md#etransactionversion-1)

if providedVersion is not provided, returns the default estimate version, else return the provided version

**`Throws`**

if estimate transaction version or default estimate transaction version is unknown

**`Example`**

```typescript
const result = stark.toTransactionVersion(
  '0x100000000000000000000000000000003',
  stark.toFeeVersion(2)
);
// result = "0x100000000000000000000000000000002"
```

#### Defined in

[src/utils/stark/index.ts:283](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/utils/stark/index.ts#L283)

---

### toFeeVersion

▸ **toFeeVersion**(`providedVersion?`): [`ETransactionVersion`](types.md#etransactionversion-1) \| `undefined`

Convert Transaction version to Fee version or throw an error

#### Parameters

| Name               | Type                                    | Description                                      |
| :----------------- | :-------------------------------------- | :----------------------------------------------- |
| `providedVersion?` | [`BigNumberish`](types.md#bignumberish) | 0..3 number representing the transaction version |

#### Returns

[`ETransactionVersion`](types.md#etransactionversion-1) \| `undefined`

the fee estimation version corresponding to the transaction version provided

**`Throws`**

if the transaction version is unknown

**`Example`**

```typescript
const result = stark.toFeeVersion(2);
// result = "0x100000000000000000000000000000002"
```

#### Defined in

[src/utils/stark/index.ts:311](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/utils/stark/index.ts#L311)

---

### v3Details

▸ **v3Details**(`details`, `specVersion?`): `V3Details`

Return provided or default v3 tx details

#### Parameters

| Name           | Type                                                          | Description                |
| :------------- | :------------------------------------------------------------ | :------------------------- |
| `details`      | [`UniversalDetails`](../interfaces/types.UniversalDetails.md) | details of the transaction |
| `specVersion?` | `"0.7.1"` \| `"0.8.1"`                                        | -                          |

#### Returns

`V3Details`

an object including the V3 transaction details.

**`Example`**

```typescript
const detail: UniversalDetails = { tip: 3456n };
const result = stark.v3Details(detail);
// result = {
//   tip: 3456n,
//   paymasterData: [],
//   accountDeploymentData: [],
//   nonceDataAvailabilityMode: 'L1',
//   feeDataAvailabilityMode: 'L1',
//   resourceBounds: {
//     l2_gas: { max_amount: '0x0', max_price_per_unit: '0x0' },
//     l1_gas: { max_amount: '0x0', max_price_per_unit: '0x0' }
//   }
// }
```

#### Defined in

[src/utils/stark/index.ts:345](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/utils/stark/index.ts#L345)

---

### reduceV2

▸ **reduceV2**(`providedVersion`): [`ETransactionVersion`](types.md#etransactionversion-1)

It will reduce V2 to V1, else (V3) stay the same
F2 -> F1
V2 -> V1
F3 -> F3
V3 -> V3

#### Parameters

| Name              | Type                                                                      |
| :---------------- | :------------------------------------------------------------------------ |
| `providedVersion` | [`ETransactionVersion`](types.RPC.RPCSPEC08.API.md#etransactionversion-1) |

#### Returns

[`ETransactionVersion`](types.md#etransactionversion-1)

if v2 then returns v1. if v3 then return v3

**`Example`**

```typescript
const result = stark.reduceV2(constants.TRANSACTION_VERSION.V2);
// result = "0x1"
```

#### Defined in

[src/utils/stark/index.ts:370](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/utils/stark/index.ts#L370)

---

### getFullPublicKey

▸ **getFullPublicKey**(`privateKey`): `string`

get the hex string of the full public key related to a Starknet private key.

#### Parameters

| Name         | Type                                    | Description             |
| :----------- | :-------------------------------------- | :---------------------- |
| `privateKey` | [`BigNumberish`](types.md#bignumberish) | a 252 bits private key. |

#### Returns

`string`

an hex string of a 520 bit number, representing the full public key related to `privateKey`.

**`Example`**

```typescript
const result = ec.getFullPublicKey(
  '0x43b7240d227aa2fb8434350b3321c40ac1b88c7067982549e7609870621b535'
);
// result = "0x0400b730bd22358612b5a67f8ad52ce80f9e8e893639ade263537e6ef35852e5d3057795f6b090f7c6985ee143f798608a53b3659222c06693c630857a10a92acf"
```

#### Defined in

[src/utils/stark/index.ts:386](https://github.com/starknet-io/starknet.js/blob/v7.5.1/src/utils/stark/index.ts#L386)
