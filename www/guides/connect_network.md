---
sidebar_position: 3
---

# Provider object : 🔌 connect to the network :

First thing to do : define with which network you want to interact.  
With the Provider object, you defines the network to use :

```typescript
import {Provider} from 'starknet';
```

## Connect your DAPP to Starknet mainnet :

```typescript
const provider = new Provider({ sequencer: { network: 'mainnet-alpha ' } })
```

## Connect your DAPP to Starknet testnet 1 & 2 :

```typescript

const provider = new Provider({ sequencer: { network: 'goerli-alpha' } }) // for testnet 1
const provider = new Provider({ sequencer: { network: 'goerli-alpha-2' } })  // for testnet 2
```

## Connect your DAPP to Starknet-devnet :

```typescript
const provider = new Provider({ sequencer: { baseUrl:"http://127.0.0.1:5050"} });
```

> If you have customized host and port during starknet-devnet initialization, adapt in accordance your script.

## Connect your DAPP to a private Starknet network :

If necessary you can have a full control on the network access (for example for your company private test network) :

```typescript
const provider = new starknet.Provider({
  sequencer: {
    baseUrl: 'https://mynetwork.mycompany.io',
    feederGatewayUrl: 'feeder_gateway',
    gatewayUrl: 'gateway',
  }
})
```

## Connect your DAPP to a Starknet node :

For a local [Pathfinder](https://github.com/eqlabs/pathfinder) node :

```typescript
const provider = new Provider({ rpc: { nodeUrl: '127.0.0.1:9545' } })
```
