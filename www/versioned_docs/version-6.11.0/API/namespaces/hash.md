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

Calculate the hex-string Keccak hash for a given BigNumberish

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

[src/utils/hash/selector.ts:19](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/hash/selector.ts#L19)

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

[src/utils/hash/selector.ts:48](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/hash/selector.ts#L48)

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

[src/utils/hash/selector.ts:66](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/hash/selector.ts#L66)

---

### getSelector

▸ **getSelector**(`value`): `string`

Calculate the hex-string selector from a given abi function name, decimal string or hex string

#### Parameters

| Name    | Type     | Description                              |
| :------ | :------- | :--------------------------------------- |
| `value` | `string` | hex-string \| dec-string \| ascii-string |

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
```

#### Defined in

[src/utils/hash/selector.ts:88](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/hash/selector.ts#L88)

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

[src/utils/hash/transactionHash/index.ts:60](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/hash/transactionHash/index.ts#L60)

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

[src/utils/hash/transactionHash/index.ts:120](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/hash/transactionHash/index.ts#L120)

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

[src/utils/hash/transactionHash/index.ts:187](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/hash/transactionHash/index.ts#L187)

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

[src/utils/hash/classHash.ts:27](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/hash/classHash.ts#L27)

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

[src/utils/hash/classHash.ts:31](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/hash/classHash.ts#L31)

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

[src/utils/hash/classHash.ts:47](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/hash/classHash.ts#L47)

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

[src/utils/hash/classHash.ts:55](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/hash/classHash.ts#L55)

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

[src/utils/hash/classHash.ts:73](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/hash/classHash.ts#L73)

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

[src/utils/hash/classHash.ts:116](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/hash/classHash.ts#L116)

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

[src/utils/hash/classHash.ts:144](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/hash/classHash.ts#L144)

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

[src/utils/hash/classHash.ts:162](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/hash/classHash.ts#L162)

---

### hashByteCodeSegments

▸ **hashByteCodeSegments**(`casm`): `bigint`

Compute hash of the bytecode for Sierra v1.5.0 onwards (Cairo 2.6.0)
Each segment is Poseidon hashed.
The global hash is : 1 + PoseidonHash(len0, h0, len1, h1, ...)

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

[src/utils/hash/classHash.ts:230](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/hash/classHash.ts#L230)

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

[src/utils/hash/classHash.ts:252](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/hash/classHash.ts#L252)

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

[src/utils/hash/classHash.ts:306](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/hash/classHash.ts#L306)

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

[src/utils/hash/classHash.ts:350](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/hash/classHash.ts#L350)

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

[src/utils/hash/classHash.ts:47](https://github.com/starknet-io/starknet.js/blob/v6.11.0/src/utils/hash/classHash.ts#L47)
