# Encoding & decoding Cairo values (Call / calldata)

Every concrete output in this file was executed and verified against starknet.js v10.4.0.

## Wire format

Starknet functions consume and return a flat list of field elements ("felts"). In starknet.js:

- `Calldata` = `string[]` of **decimal** number strings (`['291', '50', '0']`).
- `BigNumberish` = `number` (integer ≤ 2^53) | `string` (decimal `"123"` or hex `"0xabc"`) | `bigint`.
- A felt252 is an integer in `[0, P)` with `P = 2^251 + 17·2^192 + 1`.

Serialization layouts:

| Cairo type                                                                                                                    | Felts on the wire                                                            |
| ----------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `felt252`, `u8…u128`, `usize`, `bool`, `bytes31`, `ContractAddress`, `ClassHash`, `EthAddress`, u96 (`BoundedInt<0, 2^96-1>`) | 1 felt                                                                       |
| `i8…i128`, negative value `n`                                                                                                 | 1 felt = `P + n` (e.g. `-5` → `P - 5`)                                       |
| `u256`                                                                                                                        | 2 felts: `[low 128b, high 128b]`                                             |
| `u512`                                                                                                                        | 4 felts: `[limb0 (lowest), limb1, limb2, limb3]`                             |
| `Array<T>`, `Span<T>`                                                                                                         | `[len, ...items]`                                                            |
| `[T; N]` (fixed array)                                                                                                        | N serialized items, **no length**                                            |
| tuple `(A, B)`, struct                                                                                                        | concatenation of members, no prefix                                          |
| `ByteArray`                                                                                                                   | `[data_len, ...data words (31-char chunks), pending_word, pending_word_len]` |
| `Option<T>`                                                                                                                   | Some: `[0, ...T]` — None: `[1]`                                              |
| `Result<T, E>`                                                                                                                | Ok: `[0, ...T]` — Err: `[1, ...E]`                                           |
| custom enum                                                                                                                   | `[variant_index, ...payload]`; unit variant `()`: `[variant_index]` only     |
| `NonZero<T>`                                                                                                                  | same as `T`                                                                  |
| `Secp256k1Point`                                                                                                              | 4 felts: `[x.low, x.high, y.low, y.high]`                                    |

## Three ways to build calldata

| You have            | Use                                                                                   | Safety                                                     |
| ------------------- | ------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| `Contract` instance | `contract.populate('fn', args)` → `Call`; `contract.compile('fn', args)` → `Calldata` | Full ABI validation, object properties may be in any order |
| ABI only            | `const cd = new CallData(abi); cd.compile('fn', args)`                                | Same                                                       |
| No ABI              | `CallData.compile(args)` (static)                                                     | Type inferred from JS values — see traps below             |

Prefer the ABI-aware paths. They validate, reorder object properties to match the ABI, strip stray `*_len` entries, and produce human-readable errors before anything is sent to the network.

```ts
import { Contract, CallData, cairo } from 'starknet';

// ABI-aware (recommended)
const call = myContract.populate('transfer', { recipient: addr, amount: 1000n });
// call = { contractAddress, entrypoint: 'transfer', calldata: ['291', '1000', '0'] }
await account.execute(call);

// no ABI — u256 must be built explicitly
const raw = CallData.compile({ recipient: addr, amount: cairo.uint256(1000n) });
```

## Accepted JS inputs per Cairo type (ABI-aware paths)

| Cairo type                                                    | JS input                                                                                      |
| ------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `felt252`, `u8…u128`, `usize`, `ContractAddress`, `ClassHash` | `BigNumberish`                                                                                |
| `felt252`, `bytes31` (as text)                                | `string` ≤ 31 chars that is NOT hex/decimal-looking                                           |
| `i8…i128`                                                     | `BigNumberish`, negatives allowed                                                             |
| `bool`                                                        | `boolean` or `0`/`1`                                                                          |
| `u256`                                                        | `BigNumberish` or `{ low, high }` or `cairo.uint256(x)`                                       |
| `u512`                                                        | `BigNumberish` or `cairo.uint512(x)` (4 limbs)                                                |
| `Array<T>` / `Span<T>`                                        | JS array — **never** prepend the length                                                       |
| `[T; N]`                                                      | JS array of exactly N items (with ABI)                                                        |
| tuple                                                         | `cairo.tuple(a, b)` or `{ 0: a, 1: b }`; Cairo 0 named tuple also accepts `{ min, max }`      |
| struct                                                        | plain object `{ member: value, ... }`                                                         |
| `ByteArray` (long string)                                     | plain JS `string`, any length                                                                 |
| `Option<T>`                                                   | `new CairoOption<T>(CairoOptionVariant.Some, content)` / `(CairoOptionVariant.None)`          |
| `Result<T, E>`                                                | `new CairoResult<T, E>(CairoResultVariant.Ok, content)` / `(CairoResultVariant.Err, content)` |
| custom enum                                                   | `new CairoCustomEnum({ ActiveVariant: content })`                                             |
| `EthAddress`                                                  | `BigNumberish` (160 bits)                                                                     |
| `Secp256k1Point`                                              | 512-bit `BigNumberish` (uncompressed pubkey, no parity byte)                                  |
| `NonZero<T>`                                                  | same as `T`, non-zero                                                                         |

Imports: `import { CallData, cairo, CairoOption, CairoOptionVariant, CairoResult, CairoResultVariant, CairoCustomEnum, CairoFixedArray, byteArray, shortString, num, uint256 } from 'starknet';`

## String auto-detection (major trap)

A JS string argument is interpreted by content:

- hex string (`'0x7b'`) → the number 123
- whole-decimal string (`'123'`) → the number 123
- other text ≤ 31 ASCII chars → one felt, short-string encoded (`'Token'` → `0x546f6b656e` = `'362646562158'`)
- other text > 31 chars → `ByteArray` struct (or split into 31-char chunks if the ABI expects `Array<felt252>`)

Consequences, all verified:

- User-supplied text that happens to look numeric (`'123'`) is sent as a number, not as text. To force text encoding: `shortString.encodeShortString('123')`.
- A long string passed for `Array<felt252>` is split into 31-char chunks, then **each chunk is re-interpreted**: a numeric-looking chunk (e.g. final chunk `'67'`) is encoded as the number 67, not as text. For a lossless long string over `Array<felt252>`, encode manually:
  ```ts
  const feltArray = shortString.splitLongString(longText).map(shortString.encodeShortString);
  ```
- `ByteArray` encoding (`byteArray.byteArrayFromString`) does NOT have this trap — chunks are always text-encoded.

## Worked examples (exact outputs)

Cairo signatures on the left, `cd = new CallData(abi)`:

```ts
// fn f1(recipient: ContractAddress, amount: u256)
cd.compile('f1', { recipient: '0x123', amount: 50n }); // ['291', '50', '0']
cd.compile('f1', { amount: 50n, recipient: '0x123' }); // same — object order fixed via ABI
cd.compile('f1', ['0x123', cairo.uint256(2n ** 128n)]); // ['291', '0', '1']

// fn f2(list: Array<u8>)
cd.compile('f2', [[1, 2, 3]]); // ['3', '1', '2', '3'] (length added)

// fn f3(name: felt252)
cd.compile('f3', ['Token']); // ['362646562158'] (0x546f6b656e)

// fn f4(msg: ByteArray)
cd.compile('f4', ['ABCDEFGHI']); // ['0', '1203813099885386221641', '9']
//   9 chars < 31: data=[], pending_word=0x414243444546474849, pending_word_len=9
cd.compile('f4', ['ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567']); // ['1', <31-char word>, '13879', '2']
//   33 chars: data_len=1, one full word, pending_word='67' as text (0x3637), len=2

// fn f6(fix: [u32; 3])
cd.compile('f6', [[10, 20, 30]]); // ['10', '20', '30'] (no length)

// fn f7(t: (u16, Order), s: Order)   with struct Order { p1: felt252, p2: u16 }
cd.compile('f7', [cairo.tuple(7, { p1: 8, p2: 9 }), { p1: 10, p2: 11 }]);
//                                                              // ['7', '8', '9', '10', '11']

// fn f8(i: i8)
cd.compile('f8', [-5]); // [(P - 5n).toString()]

// fn f9(b: bool, addr: EthAddress)
cd.compile('f9', [true, '0xff00ff']); // ['1', '16711935']
```

## Cairo enums

`CairoOption`, `CairoResult`, `CairoCustomEnum` are used both to **send** and as **received** values.

```ts
// enum MyEnum { Response: Order, Warning: felt252, Error: (u16, u16), Critical: Array<u32>, Empty: () }
// fn f5(opt: Option<u16>, res: Result<u64, u8>, en: MyEnum)
cd.compile('f5', [
  new CairoOption<number>(CairoOptionVariant.Some, 8), // → ['0', '8']
  new CairoResult<number, number>(CairoResultVariant.Ok, 3), // → ['0', '3']
  new CairoCustomEnum({ Warning: 'attention' }), // → ['1', '1797725618680598458222']
]); // all concatenated

cd.compile('f5', [
  new CairoOption<number>(CairoOptionVariant.None), // → ['1']
  new CairoResult<number, number>(CairoResultVariant.Err, 9), // → ['1', '9']
  new CairoCustomEnum({ Empty: {} }), // unit variant (index 4) → ['4']
]);
```

Received enums are class instances:

```ts
const opt = await myContract.maybe_order(50); // CairoOption<Order>
opt.isSome();
opt.isNone();
opt.unwrap(); // unwrap(): content | undefined

const res = await myContract.checked_op(1); // CairoResult<T, E>
res.isOk();
res.isErr();
res.unwrap(); // unwrap() returns Ok OR Err content

const en = await myContract.state(); // CairoCustomEnum
en.activeVariant(); // 'Warning'
en.unwrap(); // active variant content
en.variant.Response; // direct access (undefined if inactive)
```

## Static `CallData.compile` (no ABI) — traps

Type is inferred from the JS value only. Verified behaviors:

```ts
CallData.compile([50n]); // ['50'] — ONE felt; wrong for a u256 param!
CallData.compile([cairo.uint256(50n)]); // ['50', '0'] — correct u256
CallData.compile([cairo.uint512(50n)]); // ['50', '0', '0', '0']
CallData.compile([[1, 2, 3]]); // ['3', '1', '2', '3'] — length auto-added
CallData.compile([CairoFixedArray.compile([10, 20, 30])]); // ['10','20','30'] — fixed array, no length
CallData.compile(['Token']); // ['362646562158'] — short text → 1 felt
CallData.compile(['<33-char text>']); // ByteArray layout, automatic
CallData.compile([{ p1: 8, p2: 9 }]); // ['8', '9'] — object flattened in property order
CallData.compile([true, false]); // ['1', '0']
CallData.compile([new CairoOption(CairoOptionVariant.Some, 8)]); // ['0', '8']
```

- **Property order matters** (no ABI to reorder objects). `{ low, high }` for u256, in that order.
- **Custom enums: list ALL variants** (`undefined` for inactive ones) so the variant index can be derived from position, and **wrap the enum in an array** — `CallData.compile(myEnum)` passed directly (not `[myEnum]`) throws `undefined can't be computed by felt()` in v10:
  ```ts
  const en = new CairoCustomEnum({
    Response: undefined,
    Warning: undefined,
    Error: cairo.tuple(100, 110),
    Critical: undefined,
    Empty: undefined,
  });
  CallData.compile([en]); // ['2', '100', '110']
  ```
- Fixed arrays: a plain JS array would get a length prefix — use `CairoFixedArray.compile([...])` (returns `{ 0: v, 1: v, ... }`).
- `CallData.toHex(args)` — same as compile but hex output. `CallData.toCalldata` = alias of compile.

## Decoding responses

`myContract.call(...)` / meta-class reads return parsed values (Cairo 1):

| Cairo output type                                                                                      | JS result                                                  |
| ------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------- |
| `u8…u128`, `usize`, `felt252`, `ContractAddress`, `ClassHash`, `EthAddress`, `i8…i128`, `u256`, `u512` | `bigint`                                                   |
| `bool`                                                                                                 | `boolean`                                                  |
| `bytes31`                                                                                              | `string` (text-decoded)                                    |
| `ByteArray`                                                                                            | `string` (text-decoded)                                    |
| `Array<T>` / `Span<T>` / `[T; N]`                                                                      | JS array of parsed T                                       |
| struct                                                                                                 | object `{ member: parsed }`                                |
| tuple                                                                                                  | object `{ '0': parsed, '1': parsed }`                      |
| `Option` / `Result` / custom enum                                                                      | `CairoOption` / `CairoResult` / `CairoCustomEnum` instance |
| single output                                                                                          | returned directly (not wrapped)                            |

- `felt252` returns a `bigint` even when it holds text. Decode text manually: `shortString.decodeShortString(num.toHex(value))`.
- A Cairo 1 function returning several values returns a tuple → object with `'0'`, `'1'`… keys.
- Cairo 0 contracts return objects keyed by output names (e.g. `res.balance`).

### Decode arbitrary felts: `decodeParameters`

```ts
const cd = new CallData(abi);
cd.decodeParameters('mymod::MyStruct', ['0x123456', '0x1']); // { a: 1193046n, b: true }
cd.decodeParameters('core::integer::u256', ['0x64', '0x0']); // 100n
cd.decodeParameters(['core::felt252', 'core::bool'], ['0x1', '0x0']); // [1n, false]
```

### Parse options (per-call)

```ts
await myContract.call('get_bal', rawFelts, { parseRequest: false }); // send raw felts untouched
await myContract.call('get_bals', [100n], { parseResponse: false }); // raw string[] back
// formatResponse: post-process parsed bigints ('string' = decode short/long string,
// 'number' = Number(), or a custom (value) => any function; nest for structs/arrays)
await myContract.get_text({ formatResponse: { name: 'string', description: 'string' } });
// same options on a Contract via .withOptions({...}) for the next call only
```

## Which argument shapes does each API accept?

| API                                                                                                   | Accepted args                                                                |
| ----------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| meta-class `myContract.fn(a, b, c)`                                                                   | spread list of parameters (or `...myArray`), or a single compiled `Calldata` |
| `contract.call/invoke('fn', args)`                                                                    | array of parameters, or compiled `Calldata`                                  |
| `contract.populate` / `contract.compile` / `myCallData.compile`                                       | array of parameters, or object (any property order)                          |
| `CallData.compile` (static) / `account.execute({...calldata})` / `deployContract.constructorCalldata` | array of parameters, or object in ABI property order                         |

A compiled `Calldata` (output of any `compile`/`populate().calldata`) is accepted everywhere calldata is expected.

## Hand-crafting a minimal ABI

To use `new CallData(abi)` / `decodeParameters` without a compiled contract, write ABI entries with fully-qualified type paths:

```ts
const abi = [
  {
    type: 'struct',
    name: 'mymod::Order',
    members: [
      { name: 'p1', type: 'core::felt252' },
      { name: 'p2', type: 'core::integer::u16' },
    ],
  },
  {
    type: 'enum',
    name: 'core::option::Option::<core::integer::u16>',
    variants: [
      { name: 'Some', type: 'core::integer::u16' },
      { name: 'None', type: '()' },
    ],
  },
  {
    type: 'function',
    name: 'f',
    state_mutability: 'external',
    inputs: [{ name: 'opt', type: 'core::option::Option::<core::integer::u16>' }],
    outputs: [],
  },
];
```

Every `Option`/`Result`/custom enum type used must appear as its own `enum` entry (variants `Some`/`None`, `Ok`/`Err`). Common type strings: `core::felt252`, `core::integer::u8…u256`, `core::bool`, `core::byte_array::ByteArray`, `core::bytes_31::bytes31`, `core::array::Array::<T>`, `core::array::Span::<T>`, `[core::integer::u32; 3]`, `(core::integer::u16, mymod::Order)`, `core::starknet::contract_address::ContractAddress`, `core::starknet::eth_address::EthAddress`, `core::zeroable::NonZero::<T>`.

## Manual helpers

```ts
shortString.encodeShortString('uri/pict/t38.jpg'); // '0x7572692f706963742f7433382e6a7067'
shortString.decodeShortString('0x7572692f...'); // 'uri/pict/t38.jpg'
shortString.splitLongString(text); // 31-char chunks
byteArray.byteArrayFromString('ABCDEFGHI'); // { data: [], pending_word: '0x4142…49', pending_word_len: 9 }
byteArray.stringFromByteArray(ba); // back to JS string
cairo.uint256(2n ** 128n + 5n); // { low: '5', high: '1' }
cairo.tuple(10, 20); // { 0: 10, 1: 20 }
cairo.felt('ABC'); // '4276803' (short-string encoded)
cairo.isCairo1Abi(abi);
myContract.isCairo1(); // Cairo version detection
num.toHex(291); // '0x123'
uint256.uint256ToBN({ low, high }); // bigint
```

## Common mistakes

| Mistake                                                  | Reality                                                                                            |
| -------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| Prepending `array_len` before an array                   | The library adds length prefixes; a stray `_len` property is ignored/rejected                      |
| Plain bigint for u256 in static `CallData.compile`       | Encodes 1 felt; use `cairo.uint256()` or `{ low, high }`                                           |
| `new CairoCustomEnum({ Active: v })` in static compile   | Variant index unknowable without ABI — list all variants; with ABI the single-variant form is fine |
| `CallData.compile(myEnum)` un-wrapped                    | Throws in v10 — wrap: `CallData.compile([myEnum])`                                                 |
| Passing `'123'` expecting text                           | Numeric-looking strings become numbers; use `encodeShortString`                                    |
| JS array for `[T; N]` in static compile                  | Gets a length prefix; use `CairoFixedArray.compile([...])`                                         |
| Expecting `string` from a `felt252` return               | You get `bigint`; decode with `shortString.decodeShortString(num.toHex(v))`                        |
| Reading `res.Some` on a returned Option                  | Use `res.isSome()` / `res.unwrap()`                                                                |
| Object args to static `CallData.compile` in random order | Static compile can't reorder — properties must follow ABI order                                    |
