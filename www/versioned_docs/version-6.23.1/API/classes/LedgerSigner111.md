---
id: 'LedgerSigner111'
title: 'Class: LedgerSigner111<Transport>'
sidebar_label: 'LedgerSigner111'
sidebar_position: 0
custom_edit_url: null
---

Signer for accounts using a Ledger Nano S+/X signature (Starknet Ledger APP version 1.1.1)

The Ledger has to be connected, unlocked and the Starknet APP has to be selected prior of use of this class.

## Type parameters

| Name        | Type                                     |
| :---------- | :--------------------------------------- |
| `Transport` | extends `Record`\<`any`, `any`\> = `any` |

## Hierarchy

- **`LedgerSigner111`**

  ↳ [`LedgerSigner221`](LedgerSigner221.md)

## Implements

- [`SignerInterface`](SignerInterface.md)

## Constructors

### constructor

• **new LedgerSigner111**\<`Transport`\>(`transport`, `accountID`, `eip2645application?`, `pathFunction?`): [`LedgerSigner111`](LedgerSigner111.md)\<`Transport`\>

constructor of the LedgerSigner class.

#### Type parameters

| Name        | Type                                     |
| :---------- | :--------------------------------------- |
| `Transport` | extends `Record`\<`any`, `any`\> = `any` |

#### Parameters

| Name                  | Type                                                                    | Default value            | Description                                                                                                                                       |
| :-------------------- | :---------------------------------------------------------------------- | :----------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------ |
| `transport`           | `Transport`                                                             | `undefined`              | 5 transports are available to handle USB, bluetooth, Node, Web, Mobile. See Guides for more details.                                              |
| `accountID`           | `number`                                                                | `undefined`              | ID of Ledger Nano (can handle 2\*\*31 accounts).                                                                                                  |
| `eip2645application?` | `string`                                                                | `'LedgerW'`              | A wallet is defined by an ERC2645 derivation path (6 items), and one item is the `application` and can be customized. Default value is `LedgerW`. |
| `pathFunction?`       | [`LedgerPathCalculation`](../namespaces/types.md#ledgerpathcalculation) | `getLedgerPathBuffer111` | defines the function that will calculate the path. By default `getLedgerPathBuffer111` is selected.                                               |

#### Returns

[`LedgerSigner111`](LedgerSigner111.md)\<`Transport`\>

**`Example`**

```typescript
import TransportNodeHid from '@ledgerhq/hw-transport-node-hid';
const myNodeTransport = await TransportNodeHid.create();
const myLedgerSigner = new LedgerSigner111(myNodeTransport, 0);
```

#### Defined in

[src/signer/ledgerSigner111.ts:81](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/signer/ledgerSigner111.ts#L81)

## Properties

### transporter

• `Readonly` **transporter**: `Transport`

#### Defined in

[src/signer/ledgerSigner111.ts:47](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/signer/ledgerSigner111.ts#L47)

---

### \_transporter

• `Protected` **\_transporter**: `any`

#### Defined in

[src/signer/ledgerSigner111.ts:50](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/signer/ledgerSigner111.ts#L50)

---

### accountID

• `Readonly` **accountID**: `number`

#### Defined in

[src/signer/ledgerSigner111.ts:52](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/signer/ledgerSigner111.ts#L52)

---

### eip2645applicationName

• `Readonly` **eip2645applicationName**: `string`

#### Defined in

[src/signer/ledgerSigner111.ts:54](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/signer/ledgerSigner111.ts#L54)

---

### pathBuffer

• `Readonly` **pathBuffer**: `Uint8Array`

#### Defined in

[src/signer/ledgerSigner111.ts:56](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/signer/ledgerSigner111.ts#L56)

---

### appVersion

• `Protected` **appVersion**: `string`

#### Defined in

[src/signer/ledgerSigner111.ts:58](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/signer/ledgerSigner111.ts#L58)

---

### pubKey

• `Protected` **pubKey**: `string`

#### Defined in

[src/signer/ledgerSigner111.ts:60](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/signer/ledgerSigner111.ts#L60)

---

### fullPubKey

• `Protected` **fullPubKey**: `string`

#### Defined in

[src/signer/ledgerSigner111.ts:62](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/signer/ledgerSigner111.ts#L62)

## Methods

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

#### Defined in

[src/signer/ledgerSigner111.ts:158](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/signer/ledgerSigner111.ts#L158)

---

### signTransaction

▸ **signTransaction**(`transactions`, `transactionsDetail`): `Promise`\<[`Signature`](../namespaces/types.md#signature)\>

Sign in a Ledger a V1 or a V3 transaction. This is a blind sign on the Ledger screen.

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

#### Defined in

[src/signer/ledgerSigner111.ts:198](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/signer/ledgerSigner111.ts#L198)

---

### signDeployAccountTransaction

▸ **signDeployAccountTransaction**(`details`): `Promise`\<[`Signature`](../namespaces/types.md#signature)\>

Sign in a Ledger the deployment of a new account. This is a blind sign on the Ledger screen.

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

#### Defined in

[src/signer/ledgerSigner111.ts:243](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/signer/ledgerSigner111.ts#L243)

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

#### Defined in

[src/signer/ledgerSigner111.ts:316](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/signer/ledgerSigner111.ts#L316)

---

### getPublicKeys

▸ **getPublicKeys**(): `Promise`\<`void`\>

internal function to get both the Starknet public key and the full public key

#### Returns

`Promise`\<`void`\>

#### Defined in

[src/signer/ledgerSigner111.ts:335](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/signer/ledgerSigner111.ts#L335)
