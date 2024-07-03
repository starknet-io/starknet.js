---
id: 'stark'
title: 'Namespace: stark'
sidebar_label: 'stark'
sidebar_position: 0
custom_edit_url: null
---

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

[src/utils/stark.ts:41](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/stark.ts#L41)

---

### decompressProgram

▸ **decompressProgram**(`base64`): `any`

Decompress compressed compiled Cairo 0 program

#### Parameters

| Name     | Type     | Description                |
| :------- | :------- | :------------------------- |
| `base64` | `string` | Compressed Cairo 0 program |

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

[src/utils/stark.ts:75](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/stark.ts#L75)

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

[src/utils/stark.ts:90](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/stark.ts#L90)

---

### makeAddress

▸ **makeAddress**(`input`): `string`

Lowercase and hex prefix string

#### Parameters

| Name    | Type     |
| :------ | :------- |
| `input` | `string` |

#### Returns

`string`

**`Deprecated`**

Not used internally, naming is confusing based on functionality

#### Defined in

[src/utils/stark.ts:100](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/stark.ts#L100)

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

[src/utils/stark.ts:117](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/stark.ts#L117)

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

[src/utils/stark.ts:143](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/stark.ts#L143)

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

[src/utils/stark.ts:160](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/stark.ts#L160)

---

### estimatedFeeToMaxFee

▸ **estimatedFeeToMaxFee**(`estimatedFee`, `overhead?`): `bigint`

Convert estimated fee to max fee including a margin

#### Parameters

| Name           | Type                                    | Default value                 | Description                   |
| :------------- | :-------------------------------------- | :---------------------------- | :---------------------------- |
| `estimatedFee` | [`BigNumberish`](types.md#bignumberish) | `undefined`                   | The estimated fee             |
| `overhead?`    | `number`                                | `FeeMarginPercentage.MAX_FEE` | The overhead added to the gas |

#### Returns

`bigint`

The maximum fee with the margin

**`Example`**

```typescript
const result = stark.estimatedFeeToMaxFee('8982300000000', 50);
// result = "13473450000000n"
```

#### Defined in

[src/utils/stark.ts:175](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/stark.ts#L175)

---

### estimateFeeToBounds

▸ **estimateFeeToBounds**(`estimate`, `amountOverhead?`, `priceOverhead?`): [`ResourceBounds`](types.RPC.RPCSPEC07.API.md#resourcebounds)

Calculates the maximum resource bounds for fee estimation.

#### Parameters

| Name              | Type                                                                                                                                                                                                            | Default value                                     | Description                                                                                  |
| :---------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------ | :------------------------------------------------------------------------------------------- |
| `estimate`        | `0n` \| \{ `unit`: `"WEI"` \| `"FRI"` ; `gas_consumed`: `string` ; `gas_price`: `string` ; `overall_fee`: `string` ; `data_gas_consumed`: `undefined` \| `string` ; `data_gas_price`: `undefined` \| `string` } | `undefined`                                       | The estimate for the fee. If a BigInt is provided, the returned bounds will be set to '0x0'. |
| `amountOverhead?` | `number`                                                                                                                                                                                                        | `FeeMarginPercentage.L1_BOUND_MAX_AMOUNT`         | The percentage overhead added to the gas consumed or overall fee amount.                     |
| `priceOverhead?`  | `number`                                                                                                                                                                                                        | `FeeMarginPercentage.L1_BOUND_MAX_PRICE_PER_UNIT` | The percentage overhead added to the gas price per unit.                                     |

#### Returns

[`ResourceBounds`](types.RPC.RPCSPEC07.API.md#resourcebounds)

The maximum resource bounds for fee estimation.

**`Throws`**

If the estimate object is undefined or does not have the required properties.

**`Example`**

```typescript
const feeEstimated: FeeEstimate = {
  gas_consumed: '0x3456a',
  gas_price: '0xa45567567567ae4',
  overall_fee: '0x2198F463A77A899A5668',
  unit: 'WEI',
};
const result = stark.estimateFeeToBounds(feeEstimated, 70, 50);
// result = {
//   l2_gas: { max_amount: '0x0', max_price_per_unit: '0x0' },
//   l1_gas: { max_amount: '0x58f9a', max_price_per_unit: '0xf6801b01b01b856' }
// }
```

#### Defined in

[src/utils/stark.ts:205](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/stark.ts#L205)

---

### intDAM

▸ **intDAM**(`dam`): [`EDAMode`](types.RPC.RPCSPEC07.API.md#edamode-1)

Converts the data availability mode from EDataAvailabilityMode to EDAMode.

#### Parameters

| Name  | Type                                                                          | Description                                 |
| :---- | :---------------------------------------------------------------------------- | :------------------------------------------ |
| `dam` | [`EDataAvailabilityMode`](types.RPC.RPCSPEC07.API.md#edataavailabilitymode-1) | The data availability mode to be converted. |

#### Returns

[`EDAMode`](types.RPC.RPCSPEC07.API.md#edamode-1)

The converted data availability mode.

**`Throws`**

If the data availability mode is not a valid value.

**`Example`**

```typescript
const result = stark.intDAM(RPC.EDataAvailabilityMode.L1);
// result = 0
```

#### Defined in

[src/utils/stark.ts:244](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/stark.ts#L244)

---

### toTransactionVersion

▸ **toTransactionVersion**(`defaultVersion`, `providedVersion?`): [`ETransactionVersion`](types.RPC.RPCSPEC07.API.md#etransactionversion-1)

Convert to ETransactionVersion or throw an error.
Return providedVersion is specified else return defaultVersion

#### Parameters

| Name               | Type                                    | Description                          |
| :----------------- | :-------------------------------------- | :----------------------------------- |
| `defaultVersion`   | [`BigNumberish`](types.md#bignumberish) | default estimate transaction version |
| `providedVersion?` | [`BigNumberish`](types.md#bignumberish) | estimate transaction version         |

#### Returns

[`ETransactionVersion`](types.RPC.RPCSPEC07.API.md#etransactionversion-1)

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

[src/utils/stark.ts:263](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/stark.ts#L263)

---

### toFeeVersion

▸ **toFeeVersion**(`providedVersion?`): `undefined` \| `"0x100000000000000000000000000000000"` \| `"0x100000000000000000000000000000001"` \| `"0x100000000000000000000000000000002"` \| `"0x100000000000000000000000000000003"`

Convert Transaction version to Fee version or throw an error

#### Parameters

| Name               | Type                                    | Description                                      |
| :----------------- | :-------------------------------------- | :----------------------------------------------- |
| `providedVersion?` | [`BigNumberish`](types.md#bignumberish) | 0..3 number representing the transaction version |

#### Returns

`undefined` \| `"0x100000000000000000000000000000000"` \| `"0x100000000000000000000000000000001"` \| `"0x100000000000000000000000000000002"` \| `"0x100000000000000000000000000000003"`

the fee estimation version corresponding to the transaction version provided

**`Throws`**

if the transaction version is unknown

**`Example`**

```typescript
const result = stark.toFeeVersion(2);
// result = "0x100000000000000000000000000000002"
```

#### Defined in

[src/utils/stark.ts:291](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/stark.ts#L291)

---

### v3Details

▸ **v3Details**(`details`): `Object`

Return provided or default v3 tx details

#### Parameters

| Name      | Type                                                          | Description                |
| :-------- | :------------------------------------------------------------ | :------------------------- |
| `details` | [`UniversalDetails`](../interfaces/types.UniversalDetails.md) | details of the transaction |

#### Returns

`Object`

an object including the V3 transaction details.

| Name                        | Type                                                                                 |
| :-------------------------- | :----------------------------------------------------------------------------------- |
| `tip`                       | [`BigNumberish`](types.md#bignumberish)                                              |
| `paymasterData`             | [`BigNumberish`](types.md#bignumberish)[]                                            |
| `accountDeploymentData`     | [`BigNumberish`](types.md#bignumberish)[]                                            |
| `nonceDataAvailabilityMode` | [`EDataAvailabilityMode`](types.RPC.RPCSPEC07.API.md#edataavailabilitymode-1)        |
| `feeDataAvailabilityMode`   | [`EDataAvailabilityMode`](types.RPC.RPCSPEC07.API.md#edataavailabilitymode-1)        |
| `resourceBounds`            | [`RESOURCE_BOUNDS_MAPPING`](types.RPC.RPCSPEC07.API.SPEC.md#resource_bounds_mapping) |

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

[src/utils/stark.ts:324](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/stark.ts#L324)

---

### reduceV2

▸ **reduceV2**(`providedVersion`): [`ETransactionVersion`](types.RPC.RPCSPEC07.API.md#etransactionversion-1)

It will reduce V2 to V1, else (V3) stay the same
F2 -> F1
V2 -> V1
F3 -> F3
V3 -> V3

#### Parameters

| Name              | Type                                                                      |
| :---------------- | :------------------------------------------------------------------------ |
| `providedVersion` | [`ETransactionVersion`](types.RPC.RPCSPEC07.API.md#etransactionversion-1) |

#### Returns

[`ETransactionVersion`](types.RPC.RPCSPEC07.API.md#etransactionversion-1)

if v2 then returns v1. if v3 then return v3

**`Example`**

```typescript
const result = stark.reduceV2(constants.TRANSACTION_VERSION.V2);
// result = "0x1"
```

#### Defined in

[src/utils/stark.ts:349](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/stark.ts#L349)
