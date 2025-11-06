---
id: 'Signer'
title: 'Class: Signer'
sidebar_label: 'Signer'
sidebar_position: 0
custom_edit_url: null
---

## Implements

- [`SignerInterface`](SignerInterface.md)

## Constructors

### constructor

• **new Signer**(`pk?`): [`Signer`](Signer.md)

#### Parameters

| Name | Type                     |
| :--- | :----------------------- |
| `pk` | `string` \| `Uint8Array` |

#### Returns

[`Signer`](Signer.md)

#### Defined in

[src/signer/default.ts:30](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/signer/default.ts#L30)

## Properties

### pk

• `Protected` **pk**: `string` \| `Uint8Array`

#### Defined in

[src/signer/default.ts:28](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/signer/default.ts#L28)

## Methods

### getPubKey

▸ **getPubKey**(): `Promise`<`string`\>

Method to get the public key of the signer

#### Returns

`Promise`<`string`\>

hex-string public key

**`Example`**

```typescript
const mySigner = new Signer('0x123');
const result = await mySigner.getPubKey();
// result = "0x566d69d8c99f62bc71118399bab25c1f03719463eab8d6a444cd11ece131616"
```

#### Implementation of

[SignerInterface](SignerInterface.md).[getPubKey](SignerInterface.md#getpubkey)

#### Defined in

[src/signer/default.ts:34](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/signer/default.ts#L34)

---

### signMessage

▸ **signMessage**(`typedData`, `accountAddress`): `Promise`<[`Signature`](../modules.md#signature)\>

Signs a JSON object for off-chain usage with the private key and returns the signature.
This adds a message prefix so it can't be interchanged with transactions

#### Parameters

| Name             | Type                                                               | Description                         |
| :--------------- | :----------------------------------------------------------------- | :---------------------------------- |
| `typedData`      | [`TypedData`](../interfaces/RPC.RPCSPEC09.WALLET_API.TypedData.md) | JSON object to be signed            |
| `accountAddress` | `string`                                                           | Hex string of the account's address |

#### Returns

`Promise`<[`Signature`](../modules.md#signature)\>

the signature of the message

**`Example`**

```typescript
const mySigner = new Signer('0x123');
const myTypedData: TypedData = {
  domain: {
    name: 'Example DApp',
    chainId: constants.StarknetChainId.SN_SEPOLIA,
    version: '0.0.3',
  },
  types: {
    StarkNetDomain: [
      { name: 'name', type: 'string' },
      { name: 'chainId', type: 'felt' },
      { name: 'version', type: 'string' },
    ],
    Message: [{ name: 'message', type: 'felt' }],
  },
  primaryType: 'Message',
  message: { message: '1234' },
};
const result = await mySigner.signMessage(
  myTypedData,
  '0x5d08a4e9188429da4e993c9bf25aafe5cd491ee2b501505d4d059f0c938f82d'
);
// result = Signature {r: 684915484701699003335398790608214855489903651271362390249153620883122231253n,
// s: 1399150959912500412309102776989465580949387575375484933432871778355496929189n, recovery: 1}
```

#### Implementation of

[SignerInterface](SignerInterface.md).[signMessage](SignerInterface.md#signmessage)

#### Defined in

[src/signer/default.ts:38](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/signer/default.ts#L38)

---

### signTransaction

▸ **signTransaction**(`transactions`, `details`): `Promise`<[`Signature`](../modules.md#signature)\>

Signs INVOKE transactions with the private key and returns the signature

#### Parameters

| Name           | Type                                                                 | Description                                         |
| :------------- | :------------------------------------------------------------------- | :-------------------------------------------------- |
| `transactions` | [`Call`](../modules.md#call)[]                                       | Array of Call objects representing the transactions |
| `details`      | [`InvocationsSignerDetails`](../modules.md#invocationssignerdetails) | Transaction details including V3 fields             |

#### Returns

`Promise`<[`Signature`](../modules.md#signature)\>

the signature of the transaction

**`Remarks`**

Only supports V3 transactions. V0, V1, and V2 transactions will throw an error.

**`Example`**

```typescript
const mySigner = new Signer('0x123');
const calls: Call[] = [
  {
    contractAddress: '0x1234567890123456789012345678901234567890',
    entrypoint: 'transfer',
    calldata: ['0xRecipient', '1000', '0'],
  },
];
const transactionsDetail: InvocationsSignerDetails = {
  walletAddress: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
  chainId: constants.StarknetChainId.SN_MAIN,
  cairoVersion: '1',
  version: '0x3',
  nonce: 1,
  resourceBounds: {
    l1_gas: { amount: '0x1000', price: '0x20' },
    l2_gas: { amount: '0x200', price: '0x5' },
    l1_data_gas: { amount: '0x500', price: '0x10' },
  },
  tip: 0,
  paymasterData: [],
  accountDeploymentData: [],
  nonceDataAvailabilityMode: RPC.EDataAvailabilityMode.L1,
  feeDataAvailabilityMode: RPC.EDataAvailabilityMode.L1,
};
const result = await mySigner.signTransaction(calls, transactionsDetail);
// result = Signature {r: 304910226421970384958146916800275294114105560641204815169249090836676768876n,
//   s: 1072798866000813654190523783606274062837012608648308896325315895472901074693n, recovery: 0}
```

#### Implementation of

[SignerInterface](SignerInterface.md).[signTransaction](SignerInterface.md#signtransaction)

#### Defined in

[src/signer/default.ts:43](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/signer/default.ts#L43)

---

### signDeployAccountTransaction

▸ **signDeployAccountTransaction**(`details`): `Promise`<[`Signature`](../modules.md#signature)\>

Signs a DEPLOY_ACCOUNT transaction with the private key and returns the signature

#### Parameters

| Name      | Type                                                                         | Description                                       |
| :-------- | :--------------------------------------------------------------------------- | :------------------------------------------------ |
| `details` | [`V3DeployAccountSignerDetails`](../modules.md#v3deployaccountsignerdetails) | Transaction details to deploy an account contract |

#### Returns

`Promise`<[`Signature`](../modules.md#signature)\>

the signature of the transaction to deploy an account

**`Remarks`**

Only supports V3 transactions. V0, V1, and V2 transactions will throw an error.

**`Example`**

```typescript
const mySigner = new Signer('0x123');
const myDeployAcc: DeployAccountSignerDetails = {
  contractAddress: '0x65a822fbee1ae79e898688b5a4282dc79e0042cbed12f6169937fddb4c26641',
  version: '0x3',
  chainId: constants.StarknetChainId.SN_SEPOLIA,
  classHash: '0x5f3614e8671257aff9ac38e929c74d65b02d460ae966cd826c9f04a7fa8e0d4',
  constructorCalldata: ['0x123', '0x456'],
  addressSalt: '0x789',
  nonce: 0,
  resourceBounds: {
    l1_gas: { amount: '0x1000', price: '0x20' },
    l2_gas: { amount: '0x200', price: '0x5' },
    l1_data_gas: { amount: '0x500', price: '0x10' },
  },
  tip: 0,
  paymasterData: [],
  accountDeploymentData: [],
  nonceDataAvailabilityMode: RPC.EDataAvailabilityMode.L1,
  feeDataAvailabilityMode: RPC.EDataAvailabilityMode.L1,
};
const result = await mySigner.signDeployAccountTransaction(myDeployAcc);
// result = Signature {r: 2871311234341436528393212130310036951068553852419934781736214693308640202748n,
//  s: 1746271646048888422437132495446973163454853863041370993384284773665861377605n, recovery: 1}
```

#### Implementation of

[SignerInterface](SignerInterface.md).[signDeployAccountTransaction](SignerInterface.md#signdeployaccounttransaction)

#### Defined in

[src/signer/default.ts:68](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/signer/default.ts#L68)

---

### signDeclareTransaction

▸ **signDeclareTransaction**(`details`): `Promise`<[`Signature`](../modules.md#signature)\>

Signs a DECLARE transaction with the private key and returns the signature

#### Parameters

| Name      | Type                                                         | Description                                     |
| :-------- | :----------------------------------------------------------- | :---------------------------------------------- |
| `details` | [`DeclareSignerDetails`](../modules.md#declaresignerdetails) | Transaction details to declare a contract class |

#### Returns

`Promise`<[`Signature`](../modules.md#signature)\>

the signature of the transaction to declare a class

**`Remarks`**

Only supports V3 transactions. V0, V1, and V2 transactions will throw an error.

**`Example`**

```typescript
const mySigner = new Signer('0x123');
const myDeclare: DeclareSignerDetails = {
  version: '0x3',
  chainId: constants.StarknetChainId.SN_SEPOLIA,
  senderAddress: '0x65a822fbee1ae79e898688b5a4282dc79e0042cbed12f6169937fddb4c26641',
  classHash: '0x5f3614e8671257aff9ac38e929c74d65b02d460ae966cd826c9f04a7fa8e0d4',
  compiledClassHash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
  nonce: 45,
  resourceBounds: {
    l1_gas: { amount: '0x1000', price: '0x20' },
    l2_gas: { amount: '0x200', price: '0x5' },
    l1_data_gas: { amount: '0x500', price: '0x10' },
  },
  tip: 0,
  paymasterData: [],
  accountDeploymentData: [],
  nonceDataAvailabilityMode: RPC.EDataAvailabilityMode.L1,
  feeDataAvailabilityMode: RPC.EDataAvailabilityMode.L1,
};
const result = await mySigner.signDeclareTransaction(myDeclare);
// result = Signature {r: 2432056944313955951711774394836075930010416436707488863728289188289211995670n,
//  s: 3407649393310177489888603098175002856596469926897298636282244411990343146307n, recovery: 1}
```

#### Implementation of

[SignerInterface](SignerInterface.md).[signDeclareTransaction](SignerInterface.md#signdeclaretransaction)

#### Defined in

[src/signer/default.ts:92](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/signer/default.ts#L92)

---

### signRaw

▸ **signRaw**(`msgHash`): `Promise`<[`Signature`](../modules.md#signature)\>

#### Parameters

| Name      | Type     |
| :-------- | :------- |
| `msgHash` | `string` |

#### Returns

`Promise`<[`Signature`](../modules.md#signature)\>

#### Defined in

[src/signer/default.ts:113](https://github.com/starknet-io/starknet.js/blob/v8.6.0/src/signer/default.ts#L113)
