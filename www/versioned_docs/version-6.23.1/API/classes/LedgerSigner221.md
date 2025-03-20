---
id: 'LedgerSigner221'
title: 'Class: LedgerSigner221<Transport>'
sidebar_label: 'LedgerSigner221'
sidebar_position: 0
custom_edit_url: null
---

Signer for accounts using a Ledger Nano S+/X signature (Starknet Ledger APP version 2.2.1).

The Ledger has to be connected, unlocked and the Starknet APP has to be selected prior of use of this class.

## Type parameters

| Name        | Type                                     |
| :---------- | :--------------------------------------- |
| `Transport` | extends `Record`\<`any`, `any`\> = `any` |

## Hierarchy

- [`LedgerSigner111`](LedgerSigner111.md)

  ↳ **`LedgerSigner221`**

## Implements

- [`SignerInterface`](SignerInterface.md)

## Constructors

### constructor

• **new LedgerSigner221**\<`Transport`\>(`transport`, `accountID`, `eip2645application?`, `pathFunction?`): [`LedgerSigner221`](LedgerSigner221.md)\<`Transport`\>

constructor of the LedgerSigner class.

#### Type parameters

| Name        | Type                                     |
| :---------- | :--------------------------------------- |
| `Transport` | extends `Record`\<`any`, `any`\> = `any` |

#### Parameters

| Name                  | Type                                                                    | Default value            | Description                                                                                                                                                                                                                                                                                                |
| :-------------------- | :---------------------------------------------------------------------- | :----------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `transport`           | `Transport`                                                             | `undefined`              | 5 transports are available to handle USB, bluetooth, Node, Web, Mobile. See Guides for more details.                                                                                                                                                                                                       |
| `accountID`           | `number`                                                                | `undefined`              | ID of Ledger Nano (can handle 2\*\*31 accounts).                                                                                                                                                                                                                                                           |
| `eip2645application?` | `string`                                                                | `'LedgerW'`              | A wallet is defined by an ERC2645 derivation path (6 items). One item is called `application` and can be customized. Default value is `LedgerW`.                                                                                                                                                           |
| `pathFunction?`       | [`LedgerPathCalculation`](../namespaces/types.md#ledgerpathcalculation) | `getLedgerPathBuffer221` | defines the function that will calculate the path. By default `getLedgerPathBuffer221` is selected. If you are using APP v2.2.1 with an account created with the v1.1.1, you need to use: `typescript const myLedgerSigner = new LedgerSigner211(myNodeTransport, 0, undefined, getLedgerPathBuffer111); ` |

#### Returns

[`LedgerSigner221`](LedgerSigner221.md)\<`Transport`\>

**`Example`**

```typescript
import TransportNodeHid from '@ledgerhq/hw-transport-node-hid';
const myNodeTransport = await TransportNodeHid.create();
const myLedgerSigner = new LedgerSigner211(myNodeTransport, 0);
```

#### Overrides

[LedgerSigner111](LedgerSigner111.md).[constructor](LedgerSigner111.md#constructor)

#### Defined in

[src/signer/ledgerSigner221.ts:72](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/signer/ledgerSigner221.ts#L72)

## Properties

### transporter

• `Readonly` **transporter**: `any`

#### Inherited from

[LedgerSigner111](LedgerSigner111.md).[transporter](LedgerSigner111.md#transporter)

#### Defined in

[src/signer/ledgerSigner111.ts:47](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/signer/ledgerSigner111.ts#L47)

---

### \_transporter

• `Protected` **\_transporter**: `any`

#### Inherited from

[LedgerSigner111](LedgerSigner111.md).[\_transporter](LedgerSigner111.md#_transporter)

#### Defined in

[src/signer/ledgerSigner111.ts:50](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/signer/ledgerSigner111.ts#L50)

---

### accountID

• `Readonly` **accountID**: `number`

#### Inherited from

[LedgerSigner111](LedgerSigner111.md).[accountID](LedgerSigner111.md#accountid)

#### Defined in

[src/signer/ledgerSigner111.ts:52](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/signer/ledgerSigner111.ts#L52)

---

### eip2645applicationName

• `Readonly` **eip2645applicationName**: `string`

#### Inherited from

[LedgerSigner111](LedgerSigner111.md).[eip2645applicationName](LedgerSigner111.md#eip2645applicationname)

#### Defined in

[src/signer/ledgerSigner111.ts:54](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/signer/ledgerSigner111.ts#L54)

---

### pathBuffer

• `Readonly` **pathBuffer**: `Uint8Array`

#### Inherited from

[LedgerSigner111](LedgerSigner111.md).[pathBuffer](LedgerSigner111.md#pathbuffer)

#### Defined in

[src/signer/ledgerSigner111.ts:56](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/signer/ledgerSigner111.ts#L56)

---

### appVersion

• `Protected` **appVersion**: `string`

#### Inherited from

[LedgerSigner111](LedgerSigner111.md).[appVersion](LedgerSigner111.md#appversion)

#### Defined in

[src/signer/ledgerSigner111.ts:58](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/signer/ledgerSigner111.ts#L58)

---

### pubKey

• `Protected` **pubKey**: `string`

#### Inherited from

[LedgerSigner111](LedgerSigner111.md).[pubKey](LedgerSigner111.md#pubkey)

#### Defined in

[src/signer/ledgerSigner111.ts:60](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/signer/ledgerSigner111.ts#L60)

---

### fullPubKey

• `Protected` **fullPubKey**: `string`

#### Inherited from

[LedgerSigner111](LedgerSigner111.md).[fullPubKey](LedgerSigner111.md#fullpubkey)

#### Defined in

[src/signer/ledgerSigner111.ts:62](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/signer/ledgerSigner111.ts#L62)

## Methods

### signTransaction

▸ **signTransaction**(`transactions`, `transactionsDetail`): `Promise`\<[`Signature`](../namespaces/types.md#signature)\>

Sign in a Ledger a V1 or a V3 transaction. The details are displayed on the Ledger screen.

#### Parameters

| Name                 | Type                                                                          | Description                                                                                                                                         |
| :------------------- | :---------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------- |
| `transactions`       | [`Call`](../namespaces/types.md#call)[]                                       | An array of `Call` transactions (generated for example by `myContract.populate()`).                                                                 |
| `transactionsDetail` | [`InvocationsSignerDetails`](../namespaces/types.md#invocationssignerdetails) | An object that includes all the necessary inputs to hash the transaction. Can be `V2InvocationsSignerDetails` or `V3InvocationsSignerDetails` type. |

#### Returns

`Promise`\<[`Signature`](../namespaces/types.md#signature)\>

The signed transaction.

**`Example`**

```typescript
const txDetailsV3: V3InvocationsSignerDetails = {
  chainId: constants.StarknetChainId.SN_MAIN,
  nonce: '28',
  accountDeploymentData: [],
  paymasterData: [],
  cairoVersion: '1',
  feeDataAvailabilityMode: 'L1',
  nonceDataAvailabilityMode: 'L1',
  resourceBounds: {
    l1_gas: {
      max_amount: '0x2a00',
      max_price_per_unit: '0x5c00000',
    },
    l2_gas: {
      max_amount: '0x00',
      max_price_per_unit: '0x00',
    },
  },
  tip: 0,
  version: '0x3',
  walletAddress: account0.address,
};
const result = myLedgerSigner.signTransaction([call0, call1], txDetailsV3);
// result = Signature { r: 611475243393396148729326917410546146405234155928298353899191529090923298688n,
// s: 798839819213540985856952481651392652149797817551686626114697493101433761982n,
// recovery: 0}
```

#### Implementation of

[SignerInterface](SignerInterface.md).[signTransaction](SignerInterface.md#signtransaction)

#### Overrides

[LedgerSigner111](LedgerSigner111.md).[signTransaction](LedgerSigner111.md#signtransaction)

#### Defined in

[src/signer/ledgerSigner221.ts:116](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/signer/ledgerSigner221.ts#L116)

---

### signDeployAccountTransaction

▸ **signDeployAccountTransaction**(`details`): `Promise`\<[`Signature`](../namespaces/types.md#signature)\>

Sign in a Ledger the deployment of a new account. The details are displayed on the Ledger screen.

#### Parameters

| Name      | Type                                                                              | Description                                                                                                                                         |
| :-------- | :-------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------- |
| `details` | [`DeployAccountSignerDetails`](../namespaces/types.md#deployaccountsignerdetails) | An object that includes all necessary data to calculate the Hash. It can be `V2DeployAccountSignerDetails` or `V3DeployAccountSignerDetails` types. |

#### Returns

`Promise`\<[`Signature`](../namespaces/types.md#signature)\>

The deploy account signature.

**`Example`**

```typescript
const result = myLedgerSigner.signDeployAccountTransaction(details);
// result = Signature { r: 611475243393396148729326917410546146405234155928298353899191529090923298688n,
// s: 798839819213540985856952481651392652149797817551686626114697493101433761982n,
// recovery: 0}
```

#### Implementation of

[SignerInterface](SignerInterface.md).[signDeployAccountTransaction](SignerInterface.md#signdeployaccounttransaction)

#### Overrides

[LedgerSigner111](LedgerSigner111.md).[signDeployAccountTransaction](LedgerSigner111.md#signdeployaccounttransaction)

#### Defined in

[src/signer/ledgerSigner221.ts:169](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/signer/ledgerSigner221.ts#L169)

---

### convertBnToLedger

▸ **convertBnToLedger**(`input`): `Uint8Array`

Internal function to convert a bigNumberish to an Uint8array of 256 bits

#### Parameters

| Name    | Type                                                  | Description |
| :------ | :---------------------------------------------------- | :---------- |
| `input` | [`BigNumberish`](../namespaces/types.md#bignumberish) | input value |

#### Returns

`Uint8Array`

a Uint8Array containing 32 bytes.

#### Defined in

[src/signer/ledgerSigner221.ts:215](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/signer/ledgerSigner221.ts#L215)

---

### decodeSignatureLedger

▸ **decodeSignatureLedger**(`respSign`): `Object`

Internal function to decode the response of the Ledger signature

#### Parameters

| Name       | Type         | Description                       |
| :--------- | :----------- | :-------------------------------- |
| `respSign` | `Uint8Array` | the Buffer response of the Ledger |

#### Returns

`Object`

transaction hash & signature

| Name        | Type                                            |
| :---------- | :---------------------------------------------- |
| `hash`      | `bigint`                                        |
| `signature` | [`Signature`](../namespaces/types.md#signature) |

#### Defined in

[src/signer/ledgerSigner221.ts:224](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/signer/ledgerSigner221.ts#L224)

---

### encodeCall

▸ **encodeCall**(`call`): `Uint8Array`[]

Internal function to convert a Call to an array of Uint8Array.

#### Parameters

| Name   | Type                                  | Description        |
| :----- | :------------------------------------ | :----------------- |
| `call` | [`Call`](../namespaces/types.md#call) | A Call to convert. |

#### Returns

`Uint8Array`[]

Call encoded in an array of Uint8Array (each containing 7 u256).

#### Defined in

[src/signer/ledgerSigner221.ts:238](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/signer/ledgerSigner221.ts#L238)

---

### signTxV1

▸ **signTxV1**(`txDetails`, `calls`): `Promise`\<\{ `hash`: `bigint` ; `signature`: [`Signature`](../namespaces/types.md#signature) }\>

Ask the Ledger Nano to display and sign a Starknet V1 transaction.

#### Parameters

| Name        | Type                                                                              | Description                        |
| :---------- | :-------------------------------------------------------------------------------- | :--------------------------------- |
| `txDetails` | [`V2InvocationsSignerDetails`](../namespaces/types.md#v2invocationssignerdetails) | All the details needed for a txV1. |
| `calls`     | [`Call`](../namespaces/types.md#call)[]                                           | array of Starknet invocations      |

#### Returns

`Promise`\<\{ `hash`: `bigint` ; `signature`: [`Signature`](../namespaces/types.md#signature) }\>

an object including the transaction Hash and the signature

**`Example`**

```typescript
const calls: Call[] = [
  {
    contractAddress: '0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7',
    entrypoint: 'transfer',
    calldata: [
      '0x11f5fc2a92ac03434a7937fe982f5e5293b65ad438a989c5b78fb8f04a12016',
      '0x9184e72a000',
      '0x0',
    ],
  },
];
const txDet: V2InvocationsSignerDetails = {
  walletAddress: txDetails.accountAddress,
  chainId: constants.StarknetChainId.SN_MAIN,
  cairoVersion: '1',
  maxFee: txDetails.max_fee,
  nonce: txDetails.nonce,
  version: '0x1',
};
const res = await myLedgerSigner.signTxV1(txDet, calls);
// res = {hash:
//   signature:
// }
```

#### Defined in

[src/signer/ledgerSigner221.ts:284](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/signer/ledgerSigner221.ts#L284)

---

### signTxV3

▸ **signTxV3**(`txDetails`, `calls`): `Promise`\<\{ `hash`: `bigint` ; `signature`: [`Signature`](../namespaces/types.md#signature) }\>

Ask to the Ledger Nano to display and sign a Starknet V3 transaction.

#### Parameters

| Name        | Type                                                                              | Description                        |
| :---------- | :-------------------------------------------------------------------------------- | :--------------------------------- |
| `txDetails` | [`V3InvocationsSignerDetails`](../namespaces/types.md#v3invocationssignerdetails) | All the details needed for a txV3. |
| `calls`     | [`Call`](../namespaces/types.md#call)[]                                           | array of Starknet invocations      |

#### Returns

`Promise`\<\{ `hash`: `bigint` ; `signature`: [`Signature`](../namespaces/types.md#signature) }\>

an object including the transaction Hash and the signature

**`Example`**

```typescript
const calls: Call[] = [
  {
    contractAddress: '0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7',
    entrypoint: 'transfer',
    calldata: [
      '0x11f5fc2a92ac03434a7937fe982f5e5293b65ad438a989c5b78fb8f04a12016',
      '0x9184e72a000',
      '0x0',
    ],
  },
];
const txDetailsV3: V3InvocationsSignerDetails = {
  chainId: constants.StarknetChainId.SN_MAIN,
  nonce: '28',
  accountDeploymentData: [],
  paymasterData: [],
  cairoVersion: '1',
  feeDataAvailabilityMode: 'L1',
  nonceDataAvailabilityMode: 'L1',
  resourceBounds: {
    l1_gas: { max_amount: '0x2a00', max_price_per_unit: '0x5c00000' },
    l2_gas: { max_amount: '0x00', max_price_per_unit: '0x00' },
  },
  tip: 0,
  version: '0x3',
  walletAddress: account0.address,
};
const res = await myLedgerSigner.signTxV3(txDetailsV3, calls);
// res = {hash:
//   signature:
// }
```

#### Defined in

[src/signer/ledgerSigner221.ts:354](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/signer/ledgerSigner221.ts#L354)

---

### signDeployAccountV1

▸ **signDeployAccountV1**(`deployAccountDetail`): `Promise`\<\{ `hash`: `bigint` ; `signature`: [`Signature`](../namespaces/types.md#signature) }\>

Ask the Ledger Nano to display and sign a Starknet V1 account deployment.

#### Parameters

| Name                  | Type                                                                                  | Description                                     |
| :-------------------- | :------------------------------------------------------------------------------------ | :---------------------------------------------- |
| `deployAccountDetail` | [`V2DeployAccountSignerDetails`](../namespaces/types.md#v2deployaccountsignerdetails) | All the details needed for a V1 deploy account. |

#### Returns

`Promise`\<\{ `hash`: `bigint` ; `signature`: [`Signature`](../namespaces/types.md#signature) }\>

an object including the transaction Hash and the signature

**`Example`**

```typescript
const deployData: V2DeployAccountSignerDetails = {
  tip: 0,
  paymasterData: [],
  accountDeploymentData: [],
  nonceDataAvailabilityMode: 'L1',
  feeDataAvailabilityMode: 'L1',
  resourceBounds: {
    l2_gas: { max_amount: '0x0', max_price_per_unit: '0x0' },
    l1_gas: { max_amount: '0x0', max_price_per_unit: '0x0' },
  },
  classHash: '0x540d7f5ec7ecf317e68d48564934cb99259781b1ee3cedbbc37ec5337f8e688',
  constructorCalldata: [
    '89832696000889662999767022750851886674077821293893187900664573372145410755',
  ],
  contractAddress: '0x32c60fba64eb96831d064bbb2319375b7b7381543abe66da872e4344bcd72a0',
  addressSalt: '0x0032d7efe2a9232f9b463e7206c68fdea4aeb13fec0cb308c6ba1d197d5922c3',
  chainId: '0x534e5f5345504f4c4941',
  maxFee: 55050000000000n,
  version: '0x1',
  nonce: 0n,
};
const res = await myLedgerSigner.signDeployAccountV1(deployData);
// res = {hash:
//   signature:
// }
```

#### Defined in

[src/signer/ledgerSigner221.ts:460](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/signer/ledgerSigner221.ts#L460)

---

### signDeployAccountV3

▸ **signDeployAccountV3**(`deployAccountDetail`): `Promise`\<\{ `hash`: `bigint` ; `signature`: [`Signature`](../namespaces/types.md#signature) }\>

Ask the Ledger Nano to display and sign a Starknet V3 account deployment.

#### Parameters

| Name                  | Type                                                                                  | Description                                     |
| :-------------------- | :------------------------------------------------------------------------------------ | :---------------------------------------------- |
| `deployAccountDetail` | [`V3DeployAccountSignerDetails`](../namespaces/types.md#v3deployaccountsignerdetails) | All the details needed for a V3 deploy account. |

#### Returns

`Promise`\<\{ `hash`: `bigint` ; `signature`: [`Signature`](../namespaces/types.md#signature) }\>

an object including the transaction Hash and the signature

**`Example`**

```typescript
const deployData: V3DeployAccountSignerDetails = {
  tip: 0,
  paymasterData: [],
  accountDeploymentData: [],
  nonceDataAvailabilityMode: 'L1',
  feeDataAvailabilityMode: 'L1',
  resourceBounds: {
    l2_gas: { max_amount: '0x0', max_price_per_unit: '0x0' },
    l1_gas: { max_amount: '0x226', max_price_per_unit: '0x22ecb25c00' },
  },
  classHash: '0x540d7f5ec7ecf317e68d48564934cb99259781b1ee3cedbbc37ec5337f8e688',
  constructorCalldata: [
    '3571125127744830445572285574469842579401255431821644822726857471463672199621',
  ],
  contractAddress: '0x4ca062add1cf12a107be1107af17981cf6e544a24d987693230ea481d3d5e34',
  addressSalt: '0x07e52f68e3160e1ef698211cdf6d3792368fe347e7e2d4a8ace14d9b248f39c5',
  chainId: '0x534e5f5345504f4c4941',
  maxFee: 0,
  version: '0x3',
  nonce: 0n,
};
const res = await myLedgerSigner.signDeployAccountV3(deployData);
// res = {hash:
//   signature:
// }
```

#### Defined in

[src/signer/ledgerSigner221.ts:542](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/signer/ledgerSigner221.ts#L542)

---

### getPubKey

▸ **getPubKey**(): `Promise`\<`string`\>

provides the Starknet public key

#### Returns

`Promise`\<`string`\>

an hex string: 64 characters are Point X coordinate.

**`Example`**

```typescript
const result = await myLedgerSigner.getPubKey();
// result= "0x03681417ba3e1f050dd3ccdceb8d22b5e44fa70ee7844d472c6a768bded5174e"
```

#### Implementation of

[SignerInterface](SignerInterface.md).[getPubKey](SignerInterface.md#getpubkey)

#### Inherited from

[LedgerSigner111](LedgerSigner111.md).[getPubKey](LedgerSigner111.md#getpubkey)

#### Defined in

[src/signer/ledgerSigner111.ts:109](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/signer/ledgerSigner111.ts#L109)

---

### getFullPubKey

▸ **getFullPubKey**(): `Promise`\<`string`\>

provides the full public key (with parity prefix)

#### Returns

`Promise`\<`string`\>

an hex string: 2 first characters are the parity, the 64 following characters are Point X coordinate. 64 last characters are Point Y coordinate.

**`Example`**

```typescript
const result = await myLedgerSigner.getFullPubKey();
// result= "0x0403681417ba3e1f050dd3ccdceb8d22b5e44fa70ee7844d472c6a768bded5174e03cbc86f805dcfcb0c1922dd4daf181afa289d86223a18bc856276615bcc7787"
```

#### Inherited from

[LedgerSigner111](LedgerSigner111.md).[getFullPubKey](LedgerSigner111.md#getfullpubkey)

#### Defined in

[src/signer/ledgerSigner111.ts:123](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/signer/ledgerSigner111.ts#L123)

---

### getAppVersion

▸ **getAppVersion**(): `Promise`\<`string`\>

Returns the version of the Starknet APP implemented in the Ledger.

#### Returns

`Promise`\<`string`\>

version.

**`Example`**

```typescript
const result = await myLedgerSigner.getAppVersion();
// result= "1.1.1"
```

#### Inherited from

[LedgerSigner111](LedgerSigner111.md).[getAppVersion](LedgerSigner111.md#getappversion)

#### Defined in

[src/signer/ledgerSigner111.ts:137](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/signer/ledgerSigner111.ts#L137)

---

### signMessage

▸ **signMessage**(`typedDataToHash`, `accountAddress`): `Promise`\<[`Signature`](../namespaces/types.md#signature)\>

Sign a TypedData message (SNIP-12) in a Ledger.

#### Parameters

| Name              | Type                                                                     | Description                                  |
| :---------------- | :----------------------------------------------------------------------- | :------------------------------------------- |
| `typedDataToHash` | [`TypedData`](../interfaces/types.RPC.RPCSPEC07.WALLET_API.TypedData.md) | A TypedData message compatible with SNIP-12. |
| `accountAddress`  | `string`                                                                 | Signer account address (Hex or num string)   |

#### Returns

`Promise`\<[`Signature`](../namespaces/types.md#signature)\>

The signed message.

**`Example`**

```typescript
const result = myLedgerSigner.signMessage(snip12Message, account0.address);
// result = Signature { r: 611475243393396148729326917410546146405234155928298353899191529090923298688n,
// s: 798839819213540985856952481651392652149797817551686626114697493101433761982n,
// recovery: 0}
```

#### Implementation of

[SignerInterface](SignerInterface.md).[signMessage](SignerInterface.md#signmessage)

#### Inherited from

[LedgerSigner111](LedgerSigner111.md).[signMessage](LedgerSigner111.md#signmessage)

#### Defined in

[src/signer/ledgerSigner111.ts:158](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/signer/ledgerSigner111.ts#L158)

---

### signDeclareTransaction

▸ **signDeclareTransaction**(`details`): `Promise`\<[`Signature`](../namespaces/types.md#signature)\>

Sign in a Ledger the declaration of a new class. This is a blind sign on the Ledger screen.

#### Parameters

| Name      | Type                                                                  | Description                                                                                                                             |
| :-------- | :-------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------- |
| `details` | [`DeclareSignerDetails`](../namespaces/types.md#declaresignerdetails) | An object that includes all necessary data to calculate the Hash. It can be `V3DeclareSignerDetails` or `V2DeclareSignerDetails` types. |

#### Returns

`Promise`\<[`Signature`](../namespaces/types.md#signature)\>

The declare Signature.

**`Example`**

```typescript
const result = myLedgerSigner.signDeclareTransaction(details);
// result = Signature { r: 611475243393396148729326917410546146405234155928298353899191529090923298688n,
// s: 798839819213540985856952481651392652149797817551686626114697493101433761982n,
// recovery: 0}
```

#### Implementation of

[SignerInterface](SignerInterface.md).[signDeclareTransaction](SignerInterface.md#signdeclaretransaction)

#### Inherited from

[LedgerSigner111](LedgerSigner111.md).[signDeclareTransaction](LedgerSigner111.md#signdeclaretransaction)

#### Defined in

[src/signer/ledgerSigner111.ts:287](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/signer/ledgerSigner111.ts#L287)

---

### signRaw

▸ **signRaw**(`msgHash`): `Promise`\<[`Signature`](../namespaces/types.md#signature)\>

Internal function to sign a hash in a Ledger Nano.
This is a blind sign in the Ledger ; no display of what you are signing.

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `msgHash` | `string` |

#### Returns

`Promise`\<[`Signature`](../namespaces/types.md#signature)\>

#### Inherited from

[LedgerSigner111](LedgerSigner111.md).[signRaw](LedgerSigner111.md#signraw)

#### Defined in

[src/signer/ledgerSigner111.ts:316](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/signer/ledgerSigner111.ts#L316)

---

### getPublicKeys

▸ **getPublicKeys**(): `Promise`\<`void`\>

internal function to get both the Starknet public key and the full public key

#### Returns

`Promise`\<`void`\>

#### Inherited from

[LedgerSigner111](LedgerSigner111.md).[getPublicKeys](LedgerSigner111.md#getpublickeys)

#### Defined in

[src/signer/ledgerSigner111.ts:335](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/signer/ledgerSigner111.ts#L335)
