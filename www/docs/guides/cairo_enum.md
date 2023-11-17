---
sidebar_position: 16
---

# Cairo Enums

## Cairo Enums usage

Cairo-lang v0.12.0 (includes Cairo v2.0.0) introduces a new type of data that can be exchanged with Starknet: the Enums. Not related to the TypeScript Enums, the Cairo Enums are identical to Rust Enums.  
More information in the Starknet book [here](https://book.starknet.io/chapter_2/enums.html).  
In the following paragraphs, you will see how to send and receive Enums with the Starknet network.

## Cairo Option

The `Option` Enum is a core enum, and has 2 variants (`Some` and `None`). Only the `some` variant can contain data.

### Receive Cairo Option

An example of Cairo code that returns an Option enum:

```rust
fn test(self: @ContractState, val1: u16) -> Option<Order> {
    if val1 < 100 {
        return Option::None(());
    }
    Option::Some(Order { p1: 18, p2: val1 })
}
```

In your code, the Starknet.js response will be an instance of the CairoOption class:

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
The `CairoOption` class has "Cairo like" methods:

```typescript
const a = res.isSome(); // false
const a2 = res2.isSome(); // true
const b = res.isNone(); // true
const b2 = res2.isNone(); // false
const c = res.unwrap(); // undefined
const c2: Order = res2.unwrap(); // { p1: 18n, p2: 150n }
```

### Send Cairo Option

An example of Cairo code that use an Option enum as input:

```rust
fn test5(self: @ContractState, inp: Option<Order>) -> u16 {
    match inp {
        Option::Some(x) => {
            return x.p2;
        },
        Option::None(()) => {
            return 17;
        }
    }
}
```

In your code, the Starknet.js request is an instance of the CairoOption class:

```typescript
import { CairoOption, CairoOptionVariant } from "starknet";
type Order = {
    p1: BigNumberish,
    p2: BigNumberish,
}
const res = await myTestContract.call("test5", [new CairoOption<Order>(CairoOptionVariant.Some, {p1:20, p2:40})]) as bigint;
const res2 = await myTestContract.call("test5", [new CairoOption<Order>(CairoOptionVariant.None)]) as bigint;
```

## Cairo Result

Cairo v2.1.0 introduces an other core Enum: `Result`.  
This Enum has 2 variants (`Ok` and `Err`) and both variants can contain data.

### Receive Cairo Result

An example of Cairo code that returns a Result enum:

```rust
fn test(self: @ContractState, val1: u16) -> Result<u16, u16> {
    if val1 < 100 {
        return Result::Err(14);
    }
    Result::Ok(val1)
}
```

In your code, the Starknet.js response will be an instance of the CairoResult class:

```typescript
import { CairoResult } from "starknet";

const res:CairoResult<bigint, bigint> = await myTestContract.test(90);
const res2 = (await myTestContract.call("test", [110])) as CairoResult<bigint, bigint>;
```

In `CairoResult<T, U>`, T is the type of the data related to the `Ok` variant, and U is the type of the data related to the `Err` variant.  
The `CairoResult` class has "Cairo like" methods:

```typescript
const a = res.isOk(); // false
const a2 = res2.isOk(); // true
const b = res.isErr(); // true
const b2 = res2.isErr(); // false
const c = res.unwrap(); // 14n
const c2 = res2.unwrap(); // 110n
```

### Send Cairo Result

An example of Cairo code that uses a Result enum:

```rust
fn test8(self: @ContractState, inp: Result<Order, u16>) -> u16 {
    match inp {
        Result::Ok(x) => {
            return x.p2;
        },
        Result::Err(y) => {
            return y;
        }
    }
}
```

In your code, the Starknet.js request is an instance of the CairoResult class:

```typescript
import { CairoResult, CairoResultVariant } from "starknet";

const res = await myTestContract.call("test8", [new CairoResult<Order, BigNumberish>(CairoResultVariant.Ok, {p1:50, p2:60})]) as bigint;
const res2 = await myTestContract.call("test8", [new CairoResult<Order, BigNumberish>(CairoResultVariant.Err, 50)])as bigint;
```

## Cairo custom Enum

In Cairo v2.0.0, you can also create your own customized Enum.

### Receive Cairo custom Enum

An example of Cairo code that returns the Result enum:

```rust
#[derive(Drop, Serde, Append)]
enum MyEnum {
    Response: Order,
    Warning: felt252,
    Error: (u16,u16),
    Critical: Array<u32>,
    Empty:(),
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
    if val1<200 {
        return MyEnum::Empty(());
    }
    MyEnum::Response(Order { p1: 1, p2: val1 })
}
```

This example Enum has 5 variants (`Response`, `Warning`, `Error`, `Critical` and `Empty`) and both variants can contain data.

In your code, the Starknet.js response will be an instance of the CairoCustomEnum class:

```typescript
import { CairoCustomEnum } from "starknet";

const res: CairoCustomEnum = await myTestContract.test(10);
const res2: CairoCustomEnum = await myTestContract.test(100);
const res3: CairoCustomEnum = await myTestContract.test(120);
const res4: CairoCustomEnum = await myTestContract.test(190);
const res5: CairoCustomEnum = await myTestContract.test(220);
```

The `CairoCustomEnum` class has "Cairo like" methods:

```typescript
const a = res.activeVariant(); // "Error"
const a2 = res2.activeVariant(); // "Warning"
const a3 = res3.activeVariant(); // "Critical"
const a4 = res4.activeVariant(); // "Response"
const a5 = res5.activeVariant(); // "Empty"
const c = res.unwrap(); // {"0": 3n, "1": 4n}
const c2: bigint = res2.unwrap(); // 7721172739414537047772488609840n
const c3: bigint[] = res3.unwrap(); // [5n, 6n]
const c4: Order = res4.unwrap(); // { p1: 1n, p2: 190n }
const c5: Object = res5.unwrap(); // {}
```

> In a `CairoCustomEnum` instance, you can also have a direct access to the content of a variant:

```typescript
const d: Order = res4.variant.Response // { p1: 1n, p2: 190n }
const e = res4.variant["Critical"] // undefined
```

### Send Cairo custom Enum

An example of Cairo code that uses the Result enum:

```rust
#[derive(Drop, Serde, Append)]
enum MyEnum {
    Response: Order,
    Warning: felt252,
    Error: (u16,u16),
    Critical: Array<u32>,
    Empty:(),
}
fn test2a(self: @ContractState, customEnum:MyEnum ) -> u16{
    match customEnum{
        MyEnum::Response(my_order)=>{return my_order.p2;},
        MyEnum::Warning(val)=>{return 0x13_u16;},
        MyEnum::Error((a,b))=>{return b;},
        MyEnum::Critical(myArray)=>{return 0x3c_u16;},
        MyEnum::Empty(_)=>{return 0xab_u16;}
    }
}
```

In your code, the Starknet.js request is an instance of the CairoCustomEnum class:

```typescript
import { CairoCustomEnum } from "starknet";

const orderToSend: Order = { p1: 8, p2: 10 };
const myCustomEnum = new CairoCustomEnum({Response: orderToSend});
const res14 = await myTestContract.call("test2a", [myCustomEnum]) as bigint;
const res14c = await myTestContract.call("test2a", [new CairoCustomEnum({ Error: cairo.tuple(100, 110) })]) as bigint;
const res14d = await myTestContract.call("test2a", [new CairoCustomEnum({ Critical: ["0x10", "0x11"] })]) as bigint;
const res14e = await myTestContract.call("test2a", [new CairoCustomEnum({ Empty: {} })]) as bigint;
```

Take care that if you call a method that do not use the abi (as `CallData.compile`), you have to list all the variants of the enum, like this:

```typescript
const orderToSend: Order = { p1: 8, p2: 10 };
const myCustomEnum = new CairoCustomEnum({
    Response: undefined,
    Warning: undefined,
    Error: cairo.tuple(100, 110),
    Critical: undefined,
    Empty: undefined
    });
const myCalldata = CallData.compile(myCustomEnum);
const res = await myTestContract.call("test2a", myCalldata) as bigint;
```
