# Class: LedgerSigner111\<Transport\>

Defined in: [src/signer/ledgerSigner111.ts:43](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/signer/ledgerSigner111.ts#L43)

Signer for accounts using a Ledger Nano S+/X signature (Starknet Ledger APP version 1.1.1)

The Ledger has to be connected, unlocked and the Starknet APP has to be selected prior of use of this class.

## Extended by

- [`LedgerSigner221`](LedgerSigner221.md)

## Type Parameters

### Transport

`Transport` _extends_ `Record`\<`any`, `any`\> = `any`

## Implements

- [`SignerInterface`](SignerInterface.md)

## Constructors

### Constructor

> **new LedgerSigner111**\<`Transport`\>(`transport`, `accountID`, `eip2645application?`, `pathFunction?`): `LedgerSigner111`\<`Transport`\>

Defined in: [src/signer/ledgerSigner111.ts:78](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/signer/ledgerSigner111.ts#L78)

constructor of the LedgerSigner class.

#### Parameters

##### transport

`Transport`

5 transports are available to handle USB, bluetooth, Node, Web, Mobile.
See Guides for more details.

##### accountID

`number`

ID of Ledger Nano (can handle 2\*\*31 accounts).

##### eip2645application?

`string` = `'LedgerW'`

A wallet is defined by an ERC2645 derivation path (6 items),
and one item is the `application` and can be customized.
Default value is `LedgerW`.

##### pathFunction?

[`LedgerPathCalculation`](../type-aliases/LedgerPathCalculation.md) = `getLedgerPathBuffer111`

defines the function that will calculate the path. By default `getLedgerPathBuffer111` is selected.

#### Returns

`LedgerSigner111`\<`Transport`\>

#### Example

```typescript
import TransportNodeHid from '@ledgerhq/hw-transport-node-hid';
const myNodeTransport = await TransportNodeHid.create();
const myLedgerSigner = new LedgerSigner111(myNodeTransport, 0);
```

## Properties

### transporter

> `readonly` **transporter**: `Transport`

Defined in: [src/signer/ledgerSigner111.ts:44](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/signer/ledgerSigner111.ts#L44)

---

### \_transporter

> `protected` **\_transporter**: `any`

Defined in: [src/signer/ledgerSigner111.ts:47](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/signer/ledgerSigner111.ts#L47)

---

### accountID

> `readonly` **accountID**: `number`

Defined in: [src/signer/ledgerSigner111.ts:49](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/signer/ledgerSigner111.ts#L49)

---

### eip2645applicationName

> `readonly` **eip2645applicationName**: `string`

Defined in: [src/signer/ledgerSigner111.ts:51](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/signer/ledgerSigner111.ts#L51)

---

### pathBuffer

> `readonly` **pathBuffer**: `Uint8Array`

Defined in: [src/signer/ledgerSigner111.ts:53](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/signer/ledgerSigner111.ts#L53)

---

### appVersion

> `protected` **appVersion**: `string`

Defined in: [src/signer/ledgerSigner111.ts:55](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/signer/ledgerSigner111.ts#L55)

---

### pubKey

> `protected` **pubKey**: `string`

Defined in: [src/signer/ledgerSigner111.ts:57](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/signer/ledgerSigner111.ts#L57)

---

### fullPubKey

> `protected` **fullPubKey**: `string`

Defined in: [src/signer/ledgerSigner111.ts:59](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/signer/ledgerSigner111.ts#L59)

## Methods

### getPubKey()

> **getPubKey**(): `Promise`\<`string`\>

Defined in: [src/signer/ledgerSigner111.ts:106](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/signer/ledgerSigner111.ts#L106)

provides the Starknet public key

#### Returns

`Promise`\<`string`\>

an hex string : 64 characters are Point X coordinate.

#### Example

```typescript
const result = await myLedgerSigner.getPubKey();
// result= "0x03681417ba3e1f050dd3ccdceb8d22b5e44fa70ee7844d472c6a768bded5174e"
```

#### Implementation of

[`SignerInterface`](SignerInterface.md).[`getPubKey`](SignerInterface.md#getpubkey)

---

### getFullPubKey()

> **getFullPubKey**(): `Promise`\<`string`\>

Defined in: [src/signer/ledgerSigner111.ts:120](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/signer/ledgerSigner111.ts#L120)

provides the full public key (with parity prefix)

#### Returns

`Promise`\<`string`\>

an hex string : 2 first characters are the parity, the 64 following characters are Point X coordinate. 64 last characters are Point Y coordinate.

#### Example

```typescript
const result = await myLedgerSigner.getFullPubKey();
// result= "0x0403681417ba3e1f050dd3ccdceb8d22b5e44fa70ee7844d472c6a768bded5174e03cbc86f805dcfcb0c1922dd4daf181afa289d86223a18bc856276615bcc7787"
```

---

### getAppVersion()

> **getAppVersion**(): `Promise`\<`string`\>

Defined in: [src/signer/ledgerSigner111.ts:134](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/signer/ledgerSigner111.ts#L134)

Returns the version of the Starknet APP implemented in the Ledger.

#### Returns

`Promise`\<`string`\>

version.

#### Example

```typescript
const result = await myLedgerSigner.getAppVersion();
// result= "1.1.1"
```

---

### signMessage()

> **signMessage**(`typedDataToHash`, `accountAddress`): `Promise`\<[`Signature`](../type-aliases/Signature.md)\>

Defined in: [src/signer/ledgerSigner111.ts:155](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/signer/ledgerSigner111.ts#L155)

Sign a TypedData message (SNIP-12) in a Ledger.

#### Parameters

##### typedDataToHash

[`TypedData`](../Starknet.js-API/namespaces/RPC/interfaces/TypedData.md)

A TypedData message compatible with SNIP-12.

##### accountAddress

`string`

Signer account address (Hex or num string)

#### Returns

`Promise`\<[`Signature`](../type-aliases/Signature.md)\>

The signed message.

#### Example

```typescript
const result = myLedgerSigner.signMessage(snip12Message, account0.address);
// result = Signature { r: 611475243393396148729326917410546146405234155928298353899191529090923298688n,
// s: 798839819213540985856952481651392652149797817551686626114697493101433761982n,
// recovery: 0}
```

#### Implementation of

[`SignerInterface`](SignerInterface.md).[`signMessage`](SignerInterface.md#signmessage)

---

### signTransaction()

> **signTransaction**(`transactions`, `transactionsDetail`): `Promise`\<[`Signature`](../type-aliases/Signature.md)\>

Defined in: [src/signer/ledgerSigner111.ts:195](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/signer/ledgerSigner111.ts#L195)

Sign in a Ledger a V1 or a V3 transaction. This is a blind sign on the Ledger screen.

#### Parameters

##### transactions

[`Call`](../type-aliases/Call.md)[]

An array of `Call` transactions (generated for example by `myContract.populate()`).

##### transactionsDetail

[`InvocationsSignerDetails`](../type-aliases/InvocationsSignerDetails.md)

An object that includes all the necessary inputs to hash the transaction. Can be `V2InvocationsSignerDetails` or `V3InvocationsSignerDetails` type.

#### Returns

`Promise`\<[`Signature`](../type-aliases/Signature.md)\>

The signed transaction.

#### Example

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

[`SignerInterface`](SignerInterface.md).[`signTransaction`](SignerInterface.md#signtransaction)

---

### signDeployAccountTransaction()

> **signDeployAccountTransaction**(`details`): `Promise`\<[`Signature`](../type-aliases/Signature.md)\>

Defined in: [src/signer/ledgerSigner111.ts:231](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/signer/ledgerSigner111.ts#L231)

Sign in a Ledger the deployment of a new account. This is a blind sign on the Ledger screen.

#### Parameters

##### details

[`V3DeployAccountSignerDetails`](../type-aliases/V3DeployAccountSignerDetails.md)

An object that includes all necessary data to calculate the Hash. It can be `V2DeployAccountSignerDetails` or `V3DeployAccountSignerDetails` types.

#### Returns

`Promise`\<[`Signature`](../type-aliases/Signature.md)\>

The deploy account signature.

#### Example

```typescript
const result = myLedgerSigner.signDeployAccountTransaction(details);
// result = Signature { r: 611475243393396148729326917410546146405234155928298353899191529090923298688n,
// s: 798839819213540985856952481651392652149797817551686626114697493101433761982n,
// recovery: 0}
```

#### Implementation of

[`SignerInterface`](SignerInterface.md).[`signDeployAccountTransaction`](SignerInterface.md#signdeployaccounttransaction)

---

### signDeclareTransaction()

> **signDeclareTransaction**(`details`): `Promise`\<[`Signature`](../type-aliases/Signature.md)\>

Defined in: [src/signer/ledgerSigner111.ts:267](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/signer/ledgerSigner111.ts#L267)

Sign in a Ledger the declaration of a new class. This is a blind sign on the Ledger screen.

#### Parameters

##### details

[`DeclareSignerDetails`](../type-aliases/DeclareSignerDetails.md)

An object that includes all necessary data to calculate the Hash. It can be `V3DeclareSignerDetails` or `V2DeclareSignerDetails` types.

#### Returns

`Promise`\<[`Signature`](../type-aliases/Signature.md)\>

The declare Signature.

#### Example

```typescript
const result = myLedgerSigner.signDeclareTransaction(details);
// result = Signature { r: 611475243393396148729326917410546146405234155928298353899191529090923298688n,
// s: 798839819213540985856952481651392652149797817551686626114697493101433761982n,
// recovery: 0}
```

#### Implementation of

[`SignerInterface`](SignerInterface.md).[`signDeclareTransaction`](SignerInterface.md#signdeclaretransaction)

---

### signRaw()

> `protected` **signRaw**(`msgHash`): `Promise`\<[`Signature`](../type-aliases/Signature.md)\>

Defined in: [src/signer/ledgerSigner111.ts:290](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/signer/ledgerSigner111.ts#L290)

Internal function to sign a hash in a Ledger Nano.
This is a blind sign in the Ledger ; no display of what you are signing.

#### Parameters

##### msgHash

`string`

#### Returns

`Promise`\<[`Signature`](../type-aliases/Signature.md)\>

---

### getPublicKeys()

> `protected` **getPublicKeys**(): `Promise`\<`void`\>

Defined in: [src/signer/ledgerSigner111.ts:309](https://github.com/starknet-io/starknet.js/blob/v10.8.0/src/signer/ledgerSigner111.ts#L309)

internal function to get both the Starknet public key and the full public key

#### Returns

`Promise`\<`void`\>
