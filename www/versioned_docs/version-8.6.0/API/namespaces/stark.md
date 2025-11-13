---
id: 'stark'
title: 'Namespace: stark'
sidebar_label: 'stark'
sidebar_position: 0
custom_edit_url: null
---

## Functions

### compressProgram

▸ **compressProgram**(`jsonProgram`): [`CompressedProgram`](../modules.md#compressedprogram)

Compress compiled Cairo 0 program

[Reference](https://github.com/starkware-libs/cairo-lang/blob/master/src/starkware/starknet/services/api/gateway/transaction.py#L54-L58)

#### Parameters

| Name          | Type                                              | Description                               |
| :------------ | :------------------------------------------------ | :---------------------------------------- |
| `jsonProgram` | `string` \| [`Program`](../interfaces/Program.md) | Representing the compiled Cairo 0 program |

#### Returns

[`CompressedProgram`](../modules.md#compressedprogram)

Compressed Cairo 0 program

**`Example`**

```typescript
const contractCairo0 = json.parse(fs.readFileSync('./cairo0contract.json').toString('ascii'));
const result = stark.compressProgram(contractCairo0);
// result = "H4sIAAAAAAAAA+1dC4/bOJL+K4aBu01me7r5EEUyixzQk/TuB..."
```

#### Defined in

[src/utils/stark/index.ts:63](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/stark/index.ts#L63)

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

[src/utils/stark/index.ts:97](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/stark/index.ts#L97)

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

[src/utils/stark/index.ts:112](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/stark/index.ts#L112)

---

### formatSignature

▸ **formatSignature**(`sig?`): [`ArraySignatureType`](../modules.md#arraysignaturetype)

Format Signature to standard type (hex array)

#### Parameters

| Name   | Type                                   |
| :----- | :------------------------------------- |
| `sig?` | [`Signature`](../modules.md#signature) |

#### Returns

[`ArraySignatureType`](../modules.md#arraysignaturetype)

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

[src/utils/stark/index.ts:130](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/stark/index.ts#L130)

---

### signatureToDecimalArray

▸ **signatureToDecimalArray**(`sig?`): [`ArraySignatureType`](../modules.md#arraysignaturetype)

Format Signature to decimal string array

#### Parameters

| Name   | Type                                   |
| :----- | :------------------------------------- |
| `sig?` | [`Signature`](../modules.md#signature) |

#### Returns

[`ArraySignatureType`](../modules.md#arraysignaturetype)

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

[src/utils/stark/index.ts:156](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/stark/index.ts#L156)

---

### signatureToHexArray

▸ **signatureToHexArray**(`sig?`): [`ArraySignatureType`](../modules.md#arraysignaturetype)

Format Signature to hex string array

#### Parameters

| Name   | Type                                   |
| :----- | :------------------------------------- |
| `sig?` | [`Signature`](../modules.md#signature) |

#### Returns

[`ArraySignatureType`](../modules.md#arraysignaturetype)

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

[src/utils/stark/index.ts:173](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/stark/index.ts#L173)

---

### zeroResourceBounds

▸ **zeroResourceBounds**(): [`ResourceBoundsBN`](../modules.md#resourceboundsbn)

Returns a resource bounds with zero values and no overhead.

#### Returns

[`ResourceBoundsBN`](../modules.md#resourceboundsbn)

A resource bounds with zero values and no overhead.

#### Defined in

[src/utils/stark/index.ts:181](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/stark/index.ts#L181)

---

### toOverheadResourceBounds

▸ **toOverheadResourceBounds**(`estimate`, `overhead?`): [`ResourceBoundsBN`](../modules.md#resourceboundsbn)

Calculates the maximum resource bounds for fee estimation.

#### Parameters

| Name                            | Type                                                                        | Description                                                                                              |
| :------------------------------ | :-------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------- |
| `estimate`                      | `Object`                                                                    | The estimate for the fee.                                                                                |
| `estimate.unit`                 | `"WEI"` \| `"FRI"`                                                          | -                                                                                                        |
| `estimate.l1_gas_price`         | `string` \| `number`                                                        | -                                                                                                        |
| `estimate.l2_gas_price`         | `string` \| `number`                                                        | -                                                                                                        |
| `estimate.l1_data_gas_price`    | `string` \| `number`                                                        | -                                                                                                        |
| `estimate.l1_gas_consumed`      | `string` \| `number`                                                        | -                                                                                                        |
| `estimate.l2_gas_consumed`      | `string` \| `number`                                                        | -                                                                                                        |
| `estimate.l1_data_gas_consumed` | `string` \| `number`                                                        | -                                                                                                        |
| `estimate.overall_fee`          | `string` \| `number`                                                        | -                                                                                                        |
| `overhead?`                     | `false` \| [`ResourceBoundsOverhead`](../modules.md#resourceboundsoverhead) | The percentage overhead added to the max units and max price per unit. Pass `false` to disable overhead. |

#### Returns

[`ResourceBoundsBN`](../modules.md#resourceboundsbn)

The resource bounds with overhead represented as BigInt.

**`Throws`**

If the estimate object is undefined or does not have the required properties.

#### Defined in

[src/utils/stark/index.ts:193](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/stark/index.ts#L193)

---

### resourceBoundsToEstimateFeeResponse

▸ **resourceBoundsToEstimateFeeResponse**(`resourceBounds`): [`EstimateFeeResponseOverhead`](../modules.md#estimatefeeresponseoverhead)

Converts a resource bounds to an estimate fee response. No overhead is applied.

#### Parameters

| Name             | Type                                                 | Description                     |
| :--------------- | :--------------------------------------------------- | :------------------------------ |
| `resourceBounds` | [`ResourceBoundsBN`](../modules.md#resourceboundsbn) | The resource bounds to convert. |

#### Returns

[`EstimateFeeResponseOverhead`](../modules.md#estimatefeeresponseoverhead)

The estimate fee response.

**`Example`**

```typescript
const resourceBounds = {
  l1_gas: { max_amount: 1000n, max_price_per_unit: 100n },
  l2_gas: { max_amount: 2000n, max_price_per_unit: 200n },
  l1_data_gas: { max_amount: 500n, max_price_per_unit: 50n },
};
const result = stark.resourceBoundsToEstimateFeeResponse(resourceBounds);
// result = {
//   resourceBounds: resourceBounds,
//   overall_fee: 129000n,
//   unit: 'FRI'
// }
```

#### Defined in

[src/utils/stark/index.ts:250](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/stark/index.ts#L250)

---

### toOverheadOverallFee

▸ **toOverheadOverallFee**(`estimate`, `overhead?`): `bigint`

Calculates the overall fee for a transaction based on resource consumption and prices.

The estimated fee for the transaction (in wei or fri, depending on the tx version), equals to:
l1_gas_consumed*l1_gas_price + l1_data_gas_consumed*l1_data_gas_price + l2_gas_consumed\*l2_gas_price

#### Parameters

| Name                            | Type                                                                        | Description                                                |
| :------------------------------ | :-------------------------------------------------------------------------- | :--------------------------------------------------------- |
| `estimate`                      | `Object`                                                                    | The fee estimate containing gas consumption and price data |
| `estimate.unit`                 | `"WEI"` \| `"FRI"`                                                          | -                                                          |
| `estimate.l1_gas_price`         | `string` \| `number`                                                        | -                                                          |
| `estimate.l2_gas_price`         | `string` \| `number`                                                        | -                                                          |
| `estimate.l1_data_gas_price`    | `string` \| `number`                                                        | -                                                          |
| `estimate.l1_gas_consumed`      | `string` \| `number`                                                        | -                                                          |
| `estimate.l2_gas_consumed`      | `string` \| `number`                                                        | -                                                          |
| `estimate.l1_data_gas_consumed` | `string` \| `number`                                                        | -                                                          |
| `estimate.overall_fee`          | `string` \| `number`                                                        | -                                                          |
| `overhead`                      | `false` \| [`ResourceBoundsOverhead`](../modules.md#resourceboundsoverhead) | The overhead percentage. Pass `false` to disable overhead. |

#### Returns

`bigint`

The calculated overall fee in wei or fri

**`Example`**

```typescript
const estimate = {
  l1_gas_consumed: 1000n,
  l1_gas_price: 100n,
  l1_data_gas_consumed: 500n,
  l1_data_gas_price: 50n,
  l2_gas_consumed: 200n,
  l2_gas_price: 20n,
};
const result = stark.toOverheadOverallFee(estimate, overhead);
// result = 1000n * 100n + 500n * 50n + 200n * 20n = 129000n
```

#### Defined in

[src/utils/stark/index.ts:289](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/stark/index.ts#L289)

---

### ZeroFeeEstimate

▸ **ZeroFeeEstimate**(): [`FeeEstimate`](../modules.md#feeestimate)

Mock zero fee API response

#### Returns

[`FeeEstimate`](../modules.md#feeestimate)

#### Defined in

[src/utils/stark/index.ts:315](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/stark/index.ts#L315)

---

### intDAM

▸ **intDAM**(`dam`): [`EDAMode`](../modules.md#edamode)

Converts the data availability mode from EDataAvailabilityMode to EDAMode.

#### Parameters

| Name  | Type                                                                  | Description                                 |
| :---- | :-------------------------------------------------------------------- | :------------------------------------------ |
| `dam` | [`EDataAvailabilityMode`](RPC.RPCSPEC08.API.md#edataavailabilitymode) | The data availability mode to be converted. |

#### Returns

[`EDAMode`](../modules.md#edamode)

The converted data availability mode.

**`Throws`**

If the data availability mode is not a valid value.

**`Example`**

```typescript
const result = stark.intDAM(RPC.EDataAvailabilityMode.L1);
// result = 0
```

#### Defined in

[src/utils/stark/index.ts:340](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/stark/index.ts#L340)

---

### toTransactionVersion

▸ **toTransactionVersion**(`defaultVersion`, `providedVersion?`): [`ETransactionVersion3`](RPC.RPCSPEC09.API.md#etransactionversion3)

Convert input versions to ETransactionVersion or throw an error.
Returns providedVersion if specified, otherwise returns defaultVersion.

#### Parameters

| Name               | Type                                         | Description                                                                |
| :----------------- | :------------------------------------------- | :------------------------------------------------------------------------- |
| `defaultVersion`   | [`BigNumberish`](../modules.md#bignumberish) | The default transaction version to use if providedVersion is not specified |
| `providedVersion?` | [`BigNumberish`](../modules.md#bignumberish) | Optional transaction version that takes precedence if provided             |

#### Returns

[`ETransactionVersion3`](RPC.RPCSPEC09.API.md#etransactionversion3)

The transaction version - either providedVersion if specified or defaultVersion

**`Throws`**

If either version is not a valid ETransactionVersion

**`Example`**

```typescript
const result = stark.toTransactionVersion(
  '0x100000000000000000000000000000003',
  stark.toFeeVersion(2)
);
// result = "0x100000000000000000000000000000002"
```

#### Defined in

[src/utils/stark/index.ts:359](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/stark/index.ts#L359)

---

### toFeeVersion

▸ **toFeeVersion**(`providedVersion?`): [`ETransactionVersion`](../modules.md#etransactionversion) \| `undefined`

Convert Transaction version to Fee version or throw an error

#### Parameters

| Name               | Type                                         | Description                                      |
| :----------------- | :------------------------------------------- | :----------------------------------------------- |
| `providedVersion?` | [`BigNumberish`](../modules.md#bignumberish) | 0..3 number representing the transaction version |

#### Returns

[`ETransactionVersion`](../modules.md#etransactionversion) \| `undefined`

the fee estimation version corresponding to the transaction version provided

**`Throws`**

if the transaction version is unknown

**`Example`**

```typescript
const result = stark.toFeeVersion(2);
// result = "0x100000000000000000000000000000002"
```

#### Defined in

[src/utils/stark/index.ts:383](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/stark/index.ts#L383)

---

### v3Details

▸ **v3Details**(`details`): `V3Details`

Return provided or default v3 tx details

#### Parameters

| Name      | Type                                                    | Description                |
| :-------- | :------------------------------------------------------ | :------------------------- |
| `details` | [`UniversalDetails`](../interfaces/UniversalDetails.md) | details of the transaction |

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

[src/utils/stark/index.ts:417](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/stark/index.ts#L417)

---

### getFullPublicKey

▸ **getFullPublicKey**(`privateKey`): `string`

get the hex string of the full public key related to a Starknet private key.

#### Parameters

| Name         | Type                                         | Description             |
| :----------- | :------------------------------------------- | :---------------------- |
| `privateKey` | [`BigNumberish`](../modules.md#bignumberish) | a 252 bits private key. |

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

[src/utils/stark/index.ts:438](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/stark/index.ts#L438)

---

### resourceBoundsToHexString

▸ **resourceBoundsToHexString**(`resourceBoundsBN`): [`ResourceBounds`](../modules.md#resourcebounds)

Converts ResourceBoundsBN (with bigint values) to ResourceBounds (with string values)

#### Parameters

| Name               | Type                                                 | Description                            |
| :----------------- | :--------------------------------------------------- | :------------------------------------- |
| `resourceBoundsBN` | [`ResourceBoundsBN`](../modules.md#resourceboundsbn) | The resource bounds with bigint values |

#### Returns

[`ResourceBounds`](../modules.md#resourcebounds)

The resource bounds with hex string values

**`Example`**

```typescript
const resourceBoundsBN = {
  l1_gas: { max_amount: 1000n, max_price_per_unit: 100n },
  l2_gas: { max_amount: 2000n, max_price_per_unit: 200n },
  l1_data_gas: { max_amount: 500n, max_price_per_unit: 50n },
};
const result = stark.resourceBoundsToHexString(resourceBoundsBN);
// result = {
//   l1_gas: { max_amount: '0x3e8', max_price_per_unit: '0x64' },
//   l2_gas: { max_amount: '0x7d0', max_price_per_unit: '0xc8' },
//   l1_data_gas: { max_amount: '0x1f4', max_price_per_unit: '0x32' }
// }
```

#### Defined in

[src/utils/stark/index.ts:464](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/stark/index.ts#L464)

---

### resourceBoundsToBigInt

▸ **resourceBoundsToBigInt**(`resourceBounds`): [`ResourceBoundsBN`](../modules.md#resourceboundsbn)

Converts ResourceBounds (with string values) to ResourceBoundsBN (with BigInt values)

#### Parameters

| Name                                            | Type     | Description                            |
| :---------------------------------------------- | :------- | :------------------------------------- |
| `resourceBounds`                                | `Object` | The resource bounds with string values |
| `resourceBounds.l1_gas`                         | `Object` | -                                      |
| `resourceBounds.l1_gas.max_amount`              | `string` | -                                      |
| `resourceBounds.l1_gas.max_price_per_unit`      | `string` | -                                      |
| `resourceBounds.l1_data_gas`                    | `Object` | -                                      |
| `resourceBounds.l1_data_gas.max_amount`         | `string` | -                                      |
| `resourceBounds.l1_data_gas.max_price_per_unit` | `string` | -                                      |
| `resourceBounds.l2_gas`                         | `Object` | -                                      |
| `resourceBounds.l2_gas.max_amount`              | `string` | -                                      |
| `resourceBounds.l2_gas.max_price_per_unit`      | `string` | -                                      |

#### Returns

[`ResourceBoundsBN`](../modules.md#resourceboundsbn)

The resource bounds with BigInt values

**`Example`**

```typescript
const resourceBounds = {
  l1_gas: { max_amount: '0x3e8', max_price_per_unit: '0x64' },
  l2_gas: { max_amount: '0x7d0', max_price_per_unit: '0xc8' },
  l1_data_gas: { max_amount: '0x1f4', max_price_per_unit: '0x32' },
};
const result = stark.resourceBoundsToBigInt(resourceBounds);
// result = {
//   l1_gas: { max_amount: 1000n, max_price_per_unit: 100n },
//   l2_gas: { max_amount: 2000n, max_price_per_unit: 200n },
//   l1_data_gas: { max_amount: 500n, max_price_per_unit: 50n }
// }
```

#### Defined in

[src/utils/stark/index.ts:502](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/utils/stark/index.ts#L502)
