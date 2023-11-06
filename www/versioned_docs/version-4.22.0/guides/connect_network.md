---
sidebar_position: 3
---

# Provider object 🔌 connect to the network

First thing to do - define with which network you want to interact.

With the Provider object, you define which network to use.

```typescript
import {Provider} from 'starknet';
```

## Connect your DAPP to Starknet mainnet

```typescript
const provider = new Provider({ sequencer: { network: 'mainnet-alpha' } })
```

## Connect your DAPP to Starknet testnet 1 & 2

```typescript
const provider = new Provider({ sequencer: { network: 'goerli-alpha' } }) // for testnet 1
const provider = new Provider({ sequencer: { network: 'goerli-alpha-2' } })  // for testnet 2
```

## Connect your DAPP to Starknet-devnet

```typescript
const provider = new Provider({ sequencer: { baseUrl:"http://127.0.0.1:5050"} });
```

> If you have customized host and port during starknet-devnet initialization, adapt in accordance to your script.

## Connect your DAPP to a private Starknet network

If necessary you can have a full control on the network access (for example, for your company private test network):

```typescript
const provider = new Provider({
  sequencer: {
    baseUrl: 'https://mynetwork.mycompany.io',
    feederGatewayUrl: 'feeder_gateway',
    gatewayUrl: 'gateway',
  }
})
```

## Connect your DAPP to a Starknet node

For a local [Pathfinder](https://github.com/eqlabs/pathfinder) node:

```typescript
const provider = new Provider({ rpc: { nodeUrl: '127.0.0.1:9545' } })
```

## Specific methods

Some methods are available only if connected to a sequencer, and some others are available only if connected to a node (using RPC).

### Specific sequencer methods

For example, if you want to estimate the fee of a L1 ➡️ L2 message, you need to use a method that is available only in the sequencer. The class `SequencerProvider` is available for this case:

```typescript
import { SequencerProvider } from "starknet";
const provider = new SequencerProvider({ baseUrl: "https://alpha4-2.starknet.io" }); // for testnet 2
const responseEstimateMessageFee = await provider.estimateMessageFee(.....)
```

### Specific RPC methods

For example, if you want to read the events recorded in a range of blocks, you need to use a method available from a RPC node. The class `RpcProvider` is available for this case:

```typescript
import { RpcProvider } from "starknet";
const providerRPC = new RpcProvider({ nodeUrl: "http://192.168.1.99:9545" }); // for a pathfinder node located in a PC in the local network
let eventsList = await providerRPC.getEvents({
    address: myContractAddress,
    from_block: {block_number: block_number0},
    to_block: {block_number: block_number1},
    chunk_size: 1000
});
```

RPC providers are for example Infura, Alchemy, Chainstack... Or you can spin up your own Pathfinder node!
