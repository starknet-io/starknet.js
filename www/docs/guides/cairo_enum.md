---
sidebar_position: 16
---

# Cairo Enums

## Cairo Enums usage

Cairo-lang v0.12.0 (including Cairo v2.0.0) introduces a new type of data that can be exchanged with Starknet : the Enums. Nothing related to Typescript Enums, the Cairo Enums are identical to Rust Enums.  
More information in the Starknet book [here](https://book.starknet.io/chapter_2/enums.html).  
In the following paragraphers, you will see how to receive Enums from the Starknet network.

To send an Enum to Starknet, Starknet.js can only be used this way (for the moment) :

```typescript
const res = await myTestContract.call("test", [0, 10, 11], { parseRequest: false, parseResponse: false });
```

The first number is the variant number, then the data of this variant.  
It will be improved in a near future.

## Cairo Option

The `Option` Enum is a core enum, and has 2 variants (`Some` and `None`). Only the `some` variant can contain data.  
An example of Cairo code that uses the Option enum :

```rust
fn test(self: @ContractState, val1: u16) -> Option<Order> {
    if val1 < 100 {
        return Option::None(());
    }
    Option::Some(Order { p1: 18, p2: val1 })
}
```

In your code, the Starknet.js response will be an instance of the CairoOption class :

```typescript
import { CairoOption } from "starknet";
type Order = {
    p1: BigNumberish,
    p2: BigNumberish,
}
const res: CairoOption<Order> = await myTestContract.test(50);
const res2: CairoOption<Order> = await myTestContract.test(150);
```

In `CairoOption<T>`, T is the type of the data related to the `Some` variant.  
The `CairoOption` class has "Cairo like" methods :

```typescript
const a = res.isSome(); // false
const a2 = res2.isSome(); // true
const b = res.isNone(); // true
const b2 = res2.isNone(); // false
const c = res.unwrap(); // undefined
const c2: Order = res2.unwrap(); // { p1: 18n, p2: 150n }
```

## Cairo Result

Cairo v2.0.0 introduces an other core Enum : `Result`.  
This Enum has 2 variants (`Ok` and `Err`) and both variants can contain data.  
An example of Cairo code that uses the Result enum :

```rust
fn test(self: @ContractState, val1: u16) -> Result<u16, u16> {
    if val1 < 100 {
        return Result::Err(14);
    }
    Result::Ok(val1)
}
```

In your code, the Starknet.js response will be an instance of the CairoResult class :

```typescript
import { CairoResult } from "starknet";

const res:CairoResult<bigint, bigint> = await myTestContract.test(90);
const res2 = (await myTestContract.call("test",[110])) as CairoResult<bigint, bigint>;
```

In `CairoResult<T, U>`, T is the type of the data related to the `Ok` variant, and U is the type of the data related to the `Err` variant.  
The `CairoResult` class has "Cairo like" methods :

```typescript
const a = res.isOk(); // false
const a2 = res2.isOk(); // true
const b = res.isErr(); // true
const b2 = res2.isErr(); // false
const c = res.unwrap(); // 14n
const c2 = res2.unwrap(); // 110n
```

## Cairo custom Enum

In Cairo v2.0.0, you can also create your own customized Enum.  
An example of Cairo code that uses the Result enum :

```rust
#[derive(Drop, Serde, Append)]
enum MyEnum {
    Response: Order,
    Warning: felt252,
    Error: (u16,u16),
    Critical: Array<u32>,
}
fn test(self: @ContractState, val1: u16) -> MyEnum {
    if val1 < 100 {
        return MyEnum::Error((3,4));
    }
    if val1 == 100 {
        return MyEnum::Warning('attention:100');
    }
    if val1 < 150 {
        let mut arr=ArrayTrait::new();
        arr.append(5);
        arr.append(6);
        return MyEnum::Critical(arr);
    }
    MyEnum::Response(Order { p1: 1, p2: val1 })
}
```

This example Enum has 4 variants (`Response`, `Warning`, `Error` and `Critical`) and both variants can contain data.

In your code, the Starknet.js response will be an instance of the CairoCustomEnum class :

```typescript
import { CairoCustomEnum } from "starknet";

const res: CairoCustomEnum = await myTestContract.test(10);
const res2: CairoCustomEnum = await myTestContract.test(100);
const res3: CairoCustomEnum = await myTestContract.test(120);
const res4: CairoCustomEnum = await myTestContract.test(190);
```

The `CairoCustomEnum` class has "Cairo like" methods :

```typescript
const a = res.activeVariant(); // "Error"
const a2 = res2.activeVariant(); // "Warning"
const a3 = res3.activeVariant(); // "Critical"
const a4 = res4.activeVariant(); // "Response"
const c = res.unwrap(); // {"0": 3n, "1": 4n}
const c2: bigint = res2.unwrap(); // 7721172739414537047772488609840n
const c3: bigint[] = res3.unwrap(); // [5n, 6n]
const c4: Order = res4.unwrap(); // { p1: 1n, p2: 190n }
```

> In a `CairoCustomEnum` instance, you can also have a direct access to the content of a variant :

```typescript
const d: Order = res4.variant.Response // { p1: 1n, p2: 190n }
const e = res4.variant["Critical"] // undefined
```
