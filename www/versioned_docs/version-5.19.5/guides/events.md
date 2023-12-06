---
sidebar_position: 12
---

# Events

A contract may emit events throughout its execution. Each event contains the following fields:

- from_address: address of the contract emitting the events
- keys: a list of field elements
- data: a list of field elements

The keys can be used for indexing the events, while the data may contain any information that we wish to log.

The events are recorded in the blocks of the blockchain.

Example of Cairo code for an event :

```rust
#[derive(Drop, starknet::Event)]
    struct EventPanic {
        #[key]
        errorType: u8,
        errorDescription: felt252,
    }
```

Here we have an event called `EventPanic`, with an u8 stored in keys, and a felt252 (text) in data.

## Why events ?

Events are a useful tool for logging and notifying external entities about specific occurrences within a contract, with a timestamp (the block number). They emit data that can be accessed by everybody.

Some cases :

- When a specific value is reached in a contract, an event can be created to store the fact that this value has been reached at a specific block number.
- When the L1 network has triggered the execution of a L2 contract, you can store in the event some results and when it occurs.

An event can be useful also when you invoke a contract. When you invoke a Cairo function (meaning to write in the network), the API does not authorize any response (only call functions can provide an answer). To generate an event in the code is a way to provide a response (for example for the creation of an account, an event is generated to return the account address).

## With the Transaction hash

If you use Starknet.js to invoke a Cairo function that will trigger a new event, you will have as response the transaction hash. Keep it preciously ; it will be easy to read the event with it.

Example of invocation :

```typescript
const transactionHash = myContract.invoke("emitEventPanic", [8, "Mega Panic."])
```

Then get the transaction receipt :

```typescript
const txReceipt = await provider.waitForTransaction(transactionHash);
```

### Raw response

You can recover all the events related to this transaction hash :

```typescript
const listEvents = txReceipt.events;
```

The result is an array of events (here only one event):

```typescript
[
    {
        from_address: '0x47cb13bf174043adde61f7bea49ab2d9ebc575b0431f85bcbfa113a6f93fc4',
        keys: [
        '0x3ba972537cb2f8e811809bba7623a2119f4f1133ac9e955a53d5a605af72bf2',
        '0x8'
        ],
        data: [ '0x4d6567612050616e69632e' ]
    }
]
```

The first parameter in the `keys` array is a hash of the name of the event, calculated this way :

```typescript
const nameHash = num.toHex( hash.starknetKeccak("EventPanic"));
```

The second parameter is the `errorType` variable content (stored in keys array because of the `#[key]` flag in the Cairo code).

The `data` array contains the `errorDescription` variable content (`'0x4d6567612050616e69632e'` corresponds to the encoded value of "Mega Panic.")

You can decode it with :

```typescript
const ErrorMessage =  shortString.decodeShortString("0x4d6567612050616e69632e")
```

### Parsed response

Once you have the transaction receipt, you can parse the events to have something easier to process.  
We will perform parsing this way :

```typescript
const events = myTestContract.parseEvents(txReceipt);
```

The result is an array of parsed events (here only one event):

```typescript
events = [
  {
    EventPanic: { errorType: 8n, errorDescription: 93566154138418073030976302n }
  },
]
```

Easier to read and process, isn't it?

## Without transaction hash

If you don't have the transaction Hash of the contract execution that created the event, it will be necessary to search inside the blocks of the Starknet blockchain.

In this example, if you want to read the events recorded in the last 10 blocks, you need to use a method available only from an RPC node. The class `RpcProvider` is available for this case:

```typescript
import { RpcProvider } from "starknet";
const providerRPC = new RpcProvider({ nodeUrl: "{ nodeUrl: 'https://starknet-goerli.infura.io/v3/' + infuraKey }" }); // for an Infura node on Testnet
const lastBlock = await providerRPC.getBlock('latest');
const keyFilter = [num.toHex(hash.starknetKeccak("EventPanic")), "0x8"]
const eventsList = await providerRPC.getEvents({
    address: myContractAddress,
    from_block: {block_number: lastBlock.block_number-9},
    to_block: {block_number: lastBlock.block_number},
    keys:[keyFilter],
    chunk_size: 10
});
```

> `address, from_block, to_block, keys` are all optional parameters.

> If you don't want to filter by key, you can either remove the `keys` parameter, or affect it this way : `[[]]` .

Here we have only one event. You can easily read this event :

```typescript
const event = eventsList.events[0];
console.log("data length =", event.data.length, "key length =", event.keys.length, ":");
console.log("\nkeys =", event.keys, "data =", event.data);
```

To limit the workload of the node, the parameter `chunk_size` defines a size of chunk to read. If the request needs an additional chunk, the response includes a key `continuation_token` containing a string to use in the next request.  
Hereunder a code to read all the chunks of a request :

```typescript
const keyFilter = [num.toHex(hash.starknetKeccak("EventPanic")), "0x8"]
let block = await provider.getBlock('latest');
console.log("bloc #", block.block_number);

let continuationToken: string | undefined = "0";
let chunkNum: number = 1;
while (continuationToken) {
    const eventsRes = await providerRPC.getEvents({
        from_block: {
            block_number: block.block_number - 30
        },
        to_block: {
            block_number: block.block_number
        },
        address: myContractAddress,
        keys: [keyFilter],
        chunk_size: 5,
        continuation_token: continuationToken
    });
    const nbEvents = eventsRes.events.length;
    continuationToken=eventsRes.continuation_token;
    console.log("chunk nb =", chunkNum, ".", nbEvents, "events recovered.");
    console.log("continuation_token =", continuationToken );
    for (let i = 0; i < nbEvents; i++) {
        const event = eventsRes.events[i];
        console.log("event #", i, "data length =", event.data.length, "key length =", event.keys.length, ":");
        console.log("\nkeys =", event.keys, "data =", event.data)
    }
    chunkNum++;
}
```
