---
sidebar_position: 9
---

# Data transformation

Cairo contracts and JavaScript/TypeScript languages do not have the same types of data.

So, it's necessary to prepare the data before sending them to a contract (for invoke/execute, or for a constructor).

On the other side, when a contract sends data to your DAPP (result of a call), you also have to transform them before using them in your code.

## Types of data

In Cairo, everything is felt, an integer on 251 bits.

This type does not exist in JS/TS - you have Number, bigInt, string, array, objects... and types defined in libraries.

In Starknet.js, it's a bit ... complicated, you have the BigNumberish type and it can include:

- String: "123", "0xabc2"
- Number (max 53 bits): 123
- BN (max 256 bits): BigNum from [BN.js](https://github.com/indutny/bn.js/) 🤯.

> To create a BigInt: `const myBigInt=BigInt(1234n);`  
> To create a BN: `const myBN=new BN("0x12b4");`  
> To convert a BigInt to BN: `const myBN=new BN(myBigInt.toString());`  
> To convert a BN to BigInt: `const myBigInt=BigInt(myBN.toString());`

## function argument types

There are 4 different types of contract function arguments used in Starknet.js.

### Array of < BigNumberish >

You have to create by yourself this array of < BigNumberish >, in respect with the order of the Cairo function parameters:

```typescript
const myCallData = [ // array of <BigNumberish>
    123, // number 53 bits
    "0x2345", // string
    bn1, // BN
    bi1.toString(), // BigInt converted to string
    num1, // number 53 bits
    initialUint256.low, initialUint256.high, //object converted to BigNumberish
    coord.x0, coord.y0, coord.z0, //object converted to BigNumberish
    shortString.encodeShortString('A'),
    2, "123", "0x2345" // an array of 2 felts
];
// in TypeScript, this object type is: `RawCalldata`
```

### Object

You can list your parameters in an object:

- The names of the object parameters are the names of the Cairo function parameters.
- Simple types have to be converted in strings.
- For an array, you have to use an array of strings.
- For a Cairo struct, you have to code this way (example for an Uint256):  
  `my_uint: { type: 'struct', low: initialUint256.low, high: initialUint256.high }`.

Example for a constructor:

```typescript
{
	name: shortString.encodeShortString('MyToken'),
	symbol: shortString.encodeShortString('MTK'),
	decimals: "18",
	initial_supply: { type: 'struct', low: initialTk.low, high: initialTk.high },
	recipient: account0.address,
	owner: account0.address,
	list:["678", "321", "7890"] // array of 3 cairo felts
}
```

> 🚨 In opposition with the object philosophy, your object content has to be ordered in respect with the order of the definition of the Cairo function parameters.

> You can't send an array of cairo struct with this object type.

### Array of < string >

You can create by yourself this array of < string >, in respect with the order of the Cairo function parameters:

```typescript
const myCallData = [
    "123",
    "0x2345",
    bn1.toString(), // BN converted to string
    bi1.toString(), // BigInt converted to string
    number.toBN(num1).toString(), // Number 53 bits converted to string
    initialUint256.low.toString(), initialUint256.high.toString(),
    coord.x0.toString(), coord.y0.toString(), coord.z0.toString(),
    shortString.encodeShortString('A'),
    "3", "52788", "123", "0x2345", // an array of 3 felts
    "2", "100", "0", "234", "456" // an array of 2 Uint256
];
// in TypeScript, this object type is: `Calldata`
```

Or you can use the function `stark.compileCalldata()`, that converts an object type to an `array of string` type.

For a cairo contract, with this constructor:

```cairo
func constructor{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}(
    name: felt, symbol: felt, decimals: felt, initial_supply: Uint256, recipient: felt, owner: felt
)
```

You will have to create in your code this set of data:

```typescript
const initialTk = uint256.bnToUint256(100);
const ERC20ConstructorCallData = stark.compileCalldata({
	name: shortString.encodeShortString('MyToken'),
	symbol: shortString.encodeShortString('MTK'),
	decimals: "18",
	initial_supply: { type: 'struct', low: initialTk.low, high: initialTk.high },
	recipient: account0.address,
	owner: account0.address
});
```

### Array of < any >

With this type, you can include:

- BigNumberish
- objects representing a Cairo struct
- arrays

...in respect with the order of the Cairo function parameters.

Example:

```typescript
const myCallData = [
    123, // number 53 bits
    "0x2345",
    bn1, // BigNum
    bi1.toString(), // Bigint converted to string
    num1, // number 53 bits
    initialUint256, // object representing a struct of 2 felt
    coord, // object representing a struct of 3 felt
    shortString.encodeShortString('A'), // short string
    [123, "0x2345"], // for an array of 2 cairo felts
    [initialUint256, finallUint256] // for an array of 2 structs (Uint256 here)
];
// in TypeScript, the object type is: `Array<any>`
```

Object representing a Cairo struct are made of `BigNumberish` elements. For example:

```typescript
interface c3D {
    x0: BigNumberish;
    y0: BigNumberish;
    z0: BigNumberish;
}
```

Same for arrays - their elements must have the `BigNumberish` type.

### summary table for arguments

These 4 types of arguments can't be used at your convenience everywhere. Here is a table showing which types can be used in which function:

|                              Function | array of < BigNumberish > |        array of < string >         | object  | array of < any > | MultiInvoke |
| ------------------------------------: | :-----------------------: | :--------------------------------: | :-----: | :--------------: | :---------: |
|                   **TypeScript type** |        RawCalldata        | Calldata or RawArgs or RawCalldata | RawArgs |   Array< any >   |    array    |
|      contract.call contract.metaClass |                           |                 ⚠️                 |         |        ✔️        |             |
|    contract.invoke contract.metaClass |                           |                 ⚠️                 |         |        ✔️        |             |
|                       account.execute |            ✔️             |                 ✔️                 |         |                  |     ✅      |
|                        account.deploy |                           |                 ✔️                 |   ✔️    |                  |     ✅      |
|                account.deployContract |                           |                 ✔️                 |   ✔️    |                  |     ✅      |
|                 account.declareDeploy |                           |                 ✔️                 |   ✔️    |                  |             |
|                 account.deployAccount |            ✔️             |                 ✔️                 |         |                  |             |
| hash.calculateContractAddressFromHash |            ✔️             |                 ✔️                 |         |                  |             |

⚠️ = only for a list of felt (no array or struct).

> for TypeScript, you can import these type of data:

```typescript
import { type Calldata, type RawArgs } from "starknet";
import { type RawCalldata } from "starknet/dist/types/lib";
```

## Receive data from a Cairo contract

When you perform a call, you have the result in an object:

- With a contract.call: `const result=contract.call("read_val", myParameters)`.
- With a contract.meta-class: `const result=contract.read_val(...myParameters)`.

| Type in Cairo                         | Cairo code                                 | Type expected in JS/TS            | JS/TS function to recover data                                     |
| ------------------------------------- | ------------------------------------------ | --------------------------------- | ------------------------------------------------------------------ |
| felt (251 bits max)                   | `func getV()->(total:felt)`                | BN                                | `const total = result.total`                                       |
|                                       |                                            | number (53 bits max)              | `const total:number = parseInt(result.total)`                      |
|                                       |                                            | string representing an hex number | `const address:string = number.toHex(result.total)`                |
| Uint256 (256 bits max)                | `func getV()->(balance:Uint256)`           | BN                                | `const balance = uint256.uint256toBN(result.balance)`              |
| array of felt                         | `func getV()->(list_len:felt, list:felt*)` | BN[]                              | `const list= result.list`                                          |
| shortString (31 ASCII characters max) | `func getV()->(title:felt)`                | string                            | `const title:string = shortString.decodeShortString(result.title)` |

## Handle Strings:

In JavaScript/TypeScript, the max length of a string is nearly limitless. In Cairo, a string is limited to only 31 characters, and is called a ShortString.

### Encode ShortString:

From JS to Cairo, you need to encode this ShortString to a number on 248 bits:

```typescript
const myText = "uri/pict/t38.jpg"; // 31 chars max
const encodedText: string = shortString.encodeShortString(myText);
```

the result is Hex number string: "0x7572692f706963742f7433382e6a7067"

### Decode ShortString:

From Cairo to JS, you need to decode a BN (big number) to a string of 31 character max.

```typescript
const myShortString= new BN("156113730760229877043789998731456835687"); // or result of a Contract.call
const myTextDecoded = shortString.decodeShortString(myShortString);
```

the result is: "uri/pict/t38.jpg"

### LongString

How to handle a string with more than 31 characters:

1. The Cairo contract has to manage this string as array of ShortString (array of felt).
2. The JS code has to split/encode the string before call/invoke.
3. The JS code has to decode/merge the BNs received from a call.

```typescript
function splitString(myString: string): string[] {
    const myShortStrings: string[] = [];
    while (myString.length > 0) {
        myShortStrings.push(myString.slice(0, 31));
        myString = myString.slice(31);
    }
    return (myShortStrings);
}
let myString = "uri:myProject/atosmotor/recurr/monkey148.jpg";
// encoding
const myShortStrings = splitString(myString);
const myShortStringsEncoded = myShortStrings.map((shortStr) => {
    return shortString.encodeShortString(shortStr)
}); // to use as input in call/invoke/deploy

// decoding from a call
// receiving a BN[]
const stringsCoded: BN[] = result.token_uri;
const myShortStringsDecoded = stringsCoded.map((shortStr: BN) => {
    return shortString.decodeShortString(shortStr.toString())
});
const finalString = myShortStringsDecoded.join("");
```
