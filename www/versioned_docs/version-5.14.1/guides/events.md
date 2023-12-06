---
sidebar_position: 12
---

# Reading emitted events

## Starknet events

A contract may emit events throughout its execution. Each event contains the following fields:

    from_address: address of the contract emitting the events
    keys: a list of field elements
    data: a list of field elements

The events are stored in a block on the blockchain.

## Events in the Cairo code

You have to analyze the Cairo code of your smart contract, to recover the list of data emitted by the event. An example in Cairo 0:

```cairo
@event
func log_data(d1: felt, d2: felt, d3: felt) {
}

@external
func my_func{syscall_ptr: felt*, pedersen_ptr: HashBuiltin*, range_check_ptr}() {
    ...
    log_data.emit(start_field, high_range, status_prog);
    ...
    return ();
}
```

Here, we can see that the event will store 3 felts.

Once compiled, this code will generate an abi file containing:

```typescript
{
    "data": [
        {"name": "d1", "type": "felt"},
        {"name": "d2", "type": "felt"},
        {"name": "d3", "type": "felt"},
    ],
    "keys": [],
    "name": "log_data",
    "type": "event",
}
```

## Recover the event data

Once the `my_func` is invoked, the event is stored in the blockchain and you get in return the transaction hash.

```typescript
import { InvokeTransactionReceiptResponse } from "starknet";

const resu = await myTestContract.my_func();
const txReceiptDeployTest: InvokeTransactionReceiptResponse = await provider.waitForTransaction(resu.transaction_hash);
console.log("events =", txReceiptDeployTest.events);
```

Now, you have all the events of the block. Here, we have 2 events - the last one contains our data:

```typescript
[
  [Object: null prototype] {
    data: [
      '0x2345b8cdd1eb333ac0959f7d908394b6540234345590e83367ae2a6cfbd4107'
    ],
    from_address: '0x465e68294995849bd00ac9f6ad4ee12be3cec963d8fe27172a1eadda608c110',
    keys: [
      '0x28f911b08eb032a94e35f766f1310b2df2267eb9d25bb069a1e3a6754e4206d'
    ]
  },
  [Object: null prototype] {
    data: [
      '0x7e00d496e324876bbc8531f2d9a82bf154d1a04a50218ee74cdd372f75a551a',
      '0x3711666a3506c99c9d78c4d4013409a87a962b7a0880a1c24af9fe193dafc01',
      '0x1d3d81545c000'
    ],
    from_address: '0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7',
    keys: [
      '0x99cd8bde557814842a3121e8ddfd433a539b8c9f14bf31ebf108d12e6196e9'
    ]
  }
]

```

Use the contract deployment address `testContractAddress`, to filter the events and read the data from your smart contract:

```typescript
const event = txReceiptDeployTest.events.find(
  (it) => num.cleanHex(it.from_address) === num.cleanHex(testContractAddress)
) || {data: []};

const eventD1 = event.data[0];
const eventD2 = event.data[1];
const eventD3 = event.data[2];
```

If you do not have the transaction hash, you have to search in the blocks of Starknet. See an example [here](connect_network#specific-rpc-methods).
