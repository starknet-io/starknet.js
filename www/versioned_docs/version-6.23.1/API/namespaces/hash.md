---
id: 'hash'
title: 'Namespace: hash'
sidebar_label: 'hash'
sidebar_position: 0
custom_edit_url: null
---

## Namespaces

- [poseidon](hash.poseidon.md)

## Functions

### keccakBn

▸ **keccakBn**(`value`): `string`

Calculate the hex-string Starknet Keccak hash for a given BigNumberish

#### Parameters

| Name    | Type                                    | Description   |
| :------ | :-------------------------------------- | :------------ |
| `value` | [`BigNumberish`](types.md#bignumberish) | value to hash |

#### Returns

`string`

hex-string Keccak hash

**`Example`**

```typescript
const result = keccakBn('0xabc');
// result = '0x11cf08aac85935e32397f410e48217a127b6855d41b1e3877eb4179c0904b77'
```

#### Defined in

[src/utils/hash/selector.ts:21](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/utils/hash/selector.ts#L21)

---

### starknetKeccak

▸ **starknetKeccak**(`str`): `bigint`

Calculate the BigInt Starknet Keccak hash for a given string
[Reference](https://github.com/starkware-libs/cairo-lang/blob/master/src/starkware/starknet/public/abi.py#L38)

#### Parameters

| Name  | Type     | Description   |
| :---- | :------- | :------------ |
| `str` | `string` | value to hash |

#### Returns

`bigint`

BigInt Keccak hash

**`Example`**

```typescript
const result = starknetKeccak('test').toString();
// result = '61835310290161785288773114225739080147441215596947647498723774891619563096'
```

#### Defined in

[src/utils/hash/selector.ts:50](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/utils/hash/selector.ts#L50)

---

### getSelectorFromName

▸ **getSelectorFromName**(`funcName`): `string`

Calculate the hex-string selector for a given abi function name
[Reference](https://github.com/starkware-libs/cairo-lang/blob/master/src/starkware/starknet/public/abi.py#L46)

#### Parameters

| Name       | Type     | Description       |
| :--------- | :------- | :---------------- |
| `funcName` | `string` | abi function name |

#### Returns

`string`

hex-string selector

**`Example`**

```typescript
const result = getSelectorFromName('myFunction');
// result = '0xc14cfe23f3fa7ce7b1f8db7d7682305b1692293f71a61cc06637f0d8d8b6c8'
```

#### Defined in

[src/utils/hash/selector.ts:68](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/utils/hash/selector.ts#L68)

---

### getSelector

▸ **getSelector**(`value`): `string`

Calculate the hex-string selector from a given abi function name or of any representation of number.

#### Parameters

| Name    | Type                                    | Description                                                  |
| :------ | :-------------------------------------- | :----------------------------------------------------------- |
| `value` | [`BigNumberish`](types.md#bignumberish) | ascii-string \| hex-string \| dec-string \| number \| BigInt |

#### Returns

`string`

hex-string selector

**`Example`**

```typescript
const selector1: string = getSelector('myFunction');
// selector1 = "0xc14cfe23f3fa7ce7b1f8db7d7682305b1692293f71a61cc06637f0d8d8b6c8"

const selector2: string = getSelector('0x123abc');
// selector2 = "0x123abc"

const selector3: string = getSelector('123456');
// selector3 = "0x1e240"

const selector4: string = getSelector(123456n);
// selector4 = "0x1e240"
```

#### Defined in

[src/utils/hash/selector.ts:93](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/utils/hash/selector.ts#L93)

---

### solidityUint256PackedKeccak256

▸ **solidityUint256PackedKeccak256**(`params`): `string`

Solidity hash of an array of uint256

#### Parameters

| Name     | Type                                      | Description                 |
| :------- | :---------------------------------------- | :-------------------------- |
| `params` | [`BigNumberish`](types.md#bignumberish)[] | an array of uint256 numbers |

#### Returns

`string`

the hash of the array of Solidity uint256

**`Example`**

```typescript
const result = hash.solidityUint256PackedKeccak256(['0x100', '200', 300, 400n]);
// result = '0xd1e6cb422b65269603c491b0c85463295edabebfb2a6844e4fdc389ff1dcdd97'
```

#### Defined in

[src/utils/hash/selector.ts:110](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/utils/hash/selector.ts#L110)

---

### getL2MessageHash

▸ **getL2MessageHash**(`l1FromAddress`, `l2ToAddress`, `l2Selector`, `l2Calldata`, `l1Nonce`): `string`

Calculate the L2 message hash related by a message L1->L2

#### Parameters

| Name            | Type                                      | Description                                                                  |
| :-------------- | :---------------------------------------- | :--------------------------------------------------------------------------- |
| `l1FromAddress` | [`BigNumberish`](types.md#bignumberish)   | L1 account address that paid the message.                                    |
| `l2ToAddress`   | [`BigNumberish`](types.md#bignumberish)   | L2 contract address to execute.                                              |
| `l2Selector`    | [`BigNumberish`](types.md#bignumberish)   | can be a function name ("bridge_withdraw") or a number (BigNumberish).       |
| `l2Calldata`    | [`BigNumberish`](types.md#bignumberish)[] | an array of BigNumberish of the raw parameters passed to the above function. |
| `l1Nonce`       | [`BigNumberish`](types.md#bignumberish)   | The nonce of the L1 account.                                                 |

#### Returns

`string`

hex-string of the L2 transaction hash

**`Example`**

```typescript
const l1FromAddress = '0x0000000000000000000000008453fc6cd1bcfe8d4dfc069c400b433054d47bdc';
const l2ToAddress = 2158142789748719025684046545159279785659305214176670733242887773692203401023n;
const l2Selector = 774397379524139446221206168840917193112228400237242521560346153613428128537n;
const payload = [
  4543560n,
  829565602143178078434185452406102222830667255948n,
  3461886633118033953192540141609307739580461579986333346825796013261542798665n,
  9000000000000000n,
  0n,
];
const l1Nonce = 8288n;
const result = hash.getL2MessageHash(l1FromAddress, l2ToAddress, l2Selector, payload, l1Nonce);
// result = "0x2e350fa9d830482605cb68be4fdb9f0cb3e1f95a0c51623ac1a5d1bd997c2090"
```

#### Defined in

[src/utils/hash/selector.ts:145](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/utils/hash/selector.ts#L145)

---

### calculateInvokeTransactionHash

▸ **calculateInvokeTransactionHash**(`args`): `string`

#### Parameters

| Name   | Type                   |
| :----- | :--------------------- |
| `args` | `CalcInvokeTxHashArgs` |

#### Returns

`string`

#### Defined in

[src/utils/hash/transactionHash/index.ts:61](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/utils/hash/transactionHash/index.ts#L61)

---

### calculateDeclareTransactionHash

▸ **calculateDeclareTransactionHash**(`args`): `string`

#### Parameters

| Name   | Type                    |
| :----- | :---------------------- |
| `args` | `CalcDeclareTxHashArgs` |

#### Returns

`string`

#### Defined in

[src/utils/hash/transactionHash/index.ts:121](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/utils/hash/transactionHash/index.ts#L121)

---

### calculateDeployAccountTransactionHash

▸ **calculateDeployAccountTransactionHash**(`args`): `string`

#### Parameters

| Name   | Type                          |
| :----- | :---------------------------- |
| `args` | `CalcDeployAccountTxHashArgs` |

#### Returns

`string`

#### Defined in

[src/utils/hash/transactionHash/index.ts:188](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/utils/hash/transactionHash/index.ts#L188)

---

### calculateL2MessageTxHash

▸ **calculateL2MessageTxHash**(`l1FromAddress`, `l2ToAddress`, `l2Selector`, `l2Calldata`, `l2ChainId`, `l1Nonce`): `string`

Calculate the L2 transaction hash generated by a message L1->L2

#### Parameters

| Name            | Type                                                       | Description                                                                  |
| :-------------- | :--------------------------------------------------------- | :--------------------------------------------------------------------------- |
| `l1FromAddress` | [`BigNumberish`](types.md#bignumberish)                    | L1 account address that paid the message.                                    |
| `l2ToAddress`   | [`BigNumberish`](types.md#bignumberish)                    | L2 contract address to execute.                                              |
| `l2Selector`    | [`BigNumberish`](types.md#bignumberish)                    | can be a function name ("bridge_withdraw") or a number (BigNumberish).       |
| `l2Calldata`    | [`RawCalldata`](types.md#rawcalldata)                      | an array of BigNumberish of the raw parameters passed to the above function. |
| `l2ChainId`     | [`StarknetChainId`](../enums/constants.StarknetChainId.md) | L2 chain ID: from constants.StarknetChainId.xxx                              |
| `l1Nonce`       | [`BigNumberish`](types.md#bignumberish)                    | The nonce of the L1 account.                                                 |

#### Returns

`string`

hex-string of the L2 transaction hash

**`Example`**

```typescript
const l1FromAddress = '0x0000000000000000000000008453fc6cd1bcfe8d4dfc069c400b433054d47bdc';
const l2ToAddress = 2158142789748719025684046545159279785659305214176670733242887773692203401023n;
const l2Selector = 774397379524139446221206168840917193112228400237242521560346153613428128537n;
const payload = [
  4543560n,
  829565602143178078434185452406102222830667255948n,
  3461886633118033953192540141609307739580461579986333346825796013261542798665n,
  9000000000000000n,
  0n,
];
const l1Nonce = 8288n;
const result = hash.calculateL2MessageTxHash(
  l1FromAddress,
  l2ToAddress,
  l2Selector,
  payload,
  constants.StarknetChainId.SN_SEPOLIA,
  l1Nonce
);
// result = "0x67d959200d65d4ad293aa4b0da21bb050a1f669bce37d215c6edbf041269c07"
```

#### Defined in

[src/utils/hash/transactionHash/v2.ts:158](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/utils/hash/transactionHash/v2.ts#L158)

---

### computePedersenHash

▸ **computePedersenHash**(`a`, `b`): `string`

#### Parameters

| Name | Type                                    |
| :--- | :-------------------------------------- |
| `a`  | [`BigNumberish`](types.md#bignumberish) |
| `b`  | [`BigNumberish`](types.md#bignumberish) |

#### Returns

`string`

#### Defined in

[src/utils/hash/classHash.ts:28](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/utils/hash/classHash.ts#L28)

---

### computePoseidonHash

▸ **computePoseidonHash**(`a`, `b`): `string`

#### Parameters

| Name | Type                                    |
| :--- | :-------------------------------------- |
| `a`  | [`BigNumberish`](types.md#bignumberish) |
| `b`  | [`BigNumberish`](types.md#bignumberish) |

#### Returns

`string`

#### Defined in

[src/utils/hash/classHash.ts:32](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/utils/hash/classHash.ts#L32)

---

### computeHashOnElements

▸ **computeHashOnElements**(`data`): `string`

Compute Pedersen hash from data

#### Parameters

| Name   | Type                                      | Description                               |
| :----- | :---------------------------------------- | :---------------------------------------- |
| `data` | [`BigNumberish`](types.md#bignumberish)[] | Array of data to compute Pedersen hash on |

#### Returns

`string`

hex-string of Pedersen hash

**`Example`**

```typescript
const result = hash.computeHashOnElements(['0xabc', '0x123', '0xabc123']);
// result = 0x148141e8f7db29d005a0187669a56f0790d7e8c2c5b2d780e4d8b9e436a5521
```

#### Defined in

[src/utils/hash/classHash.ts:48](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/utils/hash/classHash.ts#L48)

---

### computePoseidonHashOnElements

▸ **computePoseidonHashOnElements**(`data`): `string`

#### Parameters

| Name   | Type                                      |
| :----- | :---------------------------------------- |
| `data` | [`BigNumberish`](types.md#bignumberish)[] |

#### Returns

`string`

#### Defined in

[src/utils/hash/classHash.ts:56](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/utils/hash/classHash.ts#L56)

---

### calculateContractAddressFromHash

▸ **calculateContractAddressFromHash**(`salt`, `classHash`, `constructorCalldata`, `deployerAddress`): `string`

Calculate contract address from class hash

#### Parameters

| Name                  | Type                                    | Description                                    |
| :-------------------- | :-------------------------------------- | :--------------------------------------------- |
| `salt`                | [`BigNumberish`](types.md#bignumberish) | Salt to be used for hashing                    |
| `classHash`           | [`BigNumberish`](types.md#bignumberish) | Class hash of contract to generate address for |
| `constructorCalldata` | [`RawArgs`](types.md#rawargs)           | Call data for contract constructor             |
| `deployerAddress`     | [`BigNumberish`](types.md#bignumberish) | Address of contract deployer                   |

#### Returns

`string`

hex-string

**`Example`**

```typescript
const result = hash.calculateContractAddressFromHash(
  1234,
  0x1cf4fe5d37868d25524cdacb89518d88bf217a9240a1e6fde71cc22c429e0e3,
  [1234, true, false],
  0x052fb1a9ab0db3c4f81d70fea6a2f6e55f57c709a46089b25eeec0e959db3695
);
// result = 0x5fb03d3a88d8e474976932f927ff6a9e332e06ed36642ea3e8c7e38bf010f76
```

#### Defined in

[src/utils/hash/classHash.ts:74](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/utils/hash/classHash.ts#L74)

---

### formatSpaces

▸ **formatSpaces**(`json`): `string`

Format json-string without spaces to conform starknet json-string

#### Parameters

| Name   | Type     | Description                |
| :----- | :------- | :------------------------- |
| `json` | `string` | json-string without spaces |

#### Returns

`string`

json-string with additional spaces after `:` and `,`

**`Example`**

```typescript
const result = hash.formatSpaces("{'onchain':true,'isStarknet':true}");
// result = "{'onchain': true, 'isStarknet': true}"
```

#### Defined in

[src/utils/hash/classHash.ts:117](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/utils/hash/classHash.ts#L117)

---

### computeHintedClassHash

▸ **computeHintedClassHash**(`compiledContract`): `string`

Compute hinted class hash for legacy compiled contract (Cairo 0)

#### Parameters

| Name               | Type                                                        |
| :----------------- | :---------------------------------------------------------- |
| `compiledContract` | [`LegacyCompiledContract`](types.md#legacycompiledcontract) |

#### Returns

`string`

hex-string

**`Example`**

```typescript
const compiledCairo0 = json.parse(fs.readFileSync('./cairo0contract.json').toString('ascii'));
const result = hash.computeHintedClassHash(compiledCairo0);
// result = "0x293eabb06955c0a1e55557014675aa4e7a1fd69896147382b29b2b6b166a2ac"
```

#### Defined in

[src/utils/hash/classHash.ts:145](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/utils/hash/classHash.ts#L145)

---

### computeLegacyContractClassHash

▸ **computeLegacyContractClassHash**(`contract`): `string`

Computes the class hash for legacy compiled contract (Cairo 0)

#### Parameters

| Name       | Type                                                                    | Description                      |
| :--------- | :---------------------------------------------------------------------- | :------------------------------- |
| `contract` | `string` \| [`LegacyCompiledContract`](types.md#legacycompiledcontract) | legacy compiled contract content |

#### Returns

`string`

hex-string of class hash

**`Example`**

```typescript
const compiledCairo0 = json.parse(fs.readFileSync('./cairo0contract.json').toString('ascii'));
const result = hash.computeLegacyContractClassHash(compiledCairo0);
// result = "0x4a5cae61fa8312b0a3d0c44658b403d3e4197be80027fd5020ffcdf0c803331"
```

#### Defined in

[src/utils/hash/classHash.ts:163](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/utils/hash/classHash.ts#L163)

---

### hashByteCodeSegments

▸ **hashByteCodeSegments**(`casm`): `bigint`

Compute hash of the bytecode for Sierra v1.5.0 onwards (Cairo 2.6.0)
Each segment is Poseidon hashed.
The global hash is: 1 + PoseidonHash(len0, h0, len1, h1, ...)

#### Parameters

| Name   | Type                                      | Description                        |
| :----- | :---------------------------------------- | :--------------------------------- |
| `casm` | [`CairoAssembly`](types.md#cairoassembly) | compiled Sierra CASM file content. |

#### Returns

`bigint`

the bytecode hash as bigint.

**`Example`**

```typescript
const compiledCasm = json.parse(fs.readFileSync('./contractC260.casm.json').toString('ascii'));
const result = hash.hashByteCodeSegments(compiledCasm);
// result = 80499149343908132326491548897246987792410240503053732367044713070598981699n
```

#### Defined in

[src/utils/hash/classHash.ts:231](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/utils/hash/classHash.ts#L231)

---

### computeCompiledClassHash

▸ **computeCompiledClassHash**(`casm`): `string`

Compute compiled class hash for contract (Cairo 1)

#### Parameters

| Name   | Type                                      | Description                       |
| :----- | :---------------------------------------- | :-------------------------------- |
| `casm` | [`CairoAssembly`](types.md#cairoassembly) | Cairo 1 compiled contract content |

#### Returns

`string`

hex-string of class hash

**`Example`**

```typescript
const compiledCasm = json.parse(fs.readFileSync('./cairo260.casm.json').toString('ascii'));
const result = hash.computeCompiledClassHash(compiledCasm);
// result = "0x4087905743b4fa2b3affc1fc71333f1390c8c5d1e8ea47d6ba70786de3fc01a"
```

#### Defined in

[src/utils/hash/classHash.ts:253](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/utils/hash/classHash.ts#L253)

---

### computeSierraContractClassHash

▸ **computeSierraContractClassHash**(`sierra`): `string`

Compute sierra contract class hash (Cairo 1)

#### Parameters

| Name     | Type                                        | Description                     |
| :------- | :------------------------------------------ | :------------------------------ |
| `sierra` | [`CompiledSierra`](types.md#compiledsierra) | Cairo 1 Sierra contract content |

#### Returns

`string`

hex-string of class hash

**`Example`**

```typescript
const compiledSierra = json.parse(fs.readFileSync('./cairo260.sierra.json').toString('ascii'));
const result = hash.computeSierraContractClassHash(compiledSierra);
// result = "0x67b6b4f02baded46f02feeed58c4f78e26c55364e59874d8abfd3532d85f1ba"
```

#### Defined in

[src/utils/hash/classHash.ts:307](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/utils/hash/classHash.ts#L307)

---

### computeContractClassHash

▸ **computeContractClassHash**(`contract`): `string`

Compute ClassHash (sierra or legacy) based on provided contract

#### Parameters

| Name       | Type                                                        | Description              |
| :--------- | :---------------------------------------------------------- | :----------------------- |
| `contract` | `string` \| [`CompiledContract`](types.md#compiledcontract) | Cairo 1 contract content |

#### Returns

`string`

hex-string of class hash

**`Example`**

```typescript
const compiledSierra = json.parse(fs.readFileSync('./cairo260.sierra.json').toString('ascii'));
const result = hash.computeContractClassHash(compiledSierra);
// result = "0x67b6b4f02baded46f02feeed58c4f78e26c55364e59874d8abfd3532d85f1ba"
```

#### Defined in

[src/utils/hash/classHash.ts:351](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/utils/hash/classHash.ts#L351)

---

### computePedersenHashOnElements

▸ **computePedersenHashOnElements**(`data`): `string`

Compute Pedersen hash from data

#### Parameters

| Name   | Type                                      | Description                               |
| :----- | :---------------------------------------- | :---------------------------------------- |
| `data` | [`BigNumberish`](types.md#bignumberish)[] | Array of data to compute Pedersen hash on |

#### Returns

`string`

hex-string of Pedersen hash

**`Example`**

```typescript
const result = hash.computeHashOnElements(['0xabc', '0x123', '0xabc123']);
// result = 0x148141e8f7db29d005a0187669a56f0790d7e8c2c5b2d780e4d8b9e436a5521
```

#### Defined in

[src/utils/hash/classHash.ts:48](https://github.com/starknet-io/starknet.js/blob/v6.23.1/src/utils/hash/classHash.ts#L48)
