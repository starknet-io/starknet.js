---
sidebar_position: 3
---

# Provider object 🔌 connect to the network

The first thing to do is to define with which network you want to interact.

With the Provider object, you define which network to use.

```typescript
import {Provider} from 'starknet';
```

## Connect your DAPP to Starknet mainnet

```typescript
const provider = new Provider({ sequencer: { network: constants.NetworkName.SN_MAIN } })
```

## Connect your DAPP to Starknet testnet

```typescript
const provider = new Provider({ sequencer: { network: constants.NetworkName.SN_GOERLI } }) // for testnet
```

## Connect your DAPP to Starknet devnet

```typescript
const provider = new Provider({ sequencer: { baseUrl:"http://127.0.0.1:5050"} });
```

> If you have customized host and port during starknet-devnet initialization, adapt in accordance to your script.

## Connect your DAPP to a private Starknet network

If necessary you can have full control of the network access (for example, for your company's private test network):

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

### Pathfinder

For a local [Pathfinder](https://github.com/eqlabs/pathfinder) node:

```typescript
const provider = new Provider({ rpc: { nodeUrl: '127.0.0.1:9545/rpc/v0.4' } })
```

Your node can be located in your local network (example: pathfinder node running on a computer on your network, launched with this additional option: `--http-rpc 0.0.0.0:9545`).
You can connect with:

```typescript
const provider = new Provider({ rpc: { nodeUrl: '192.168.1.99:9545/rpc/v0.4' } })
```

### Juno

Initialize the provider with:

```typescript
const provider = new RpcProvider({ nodeUrl: 'http://127.0.0.1:6060/v0_5' });
```

### Other node clients

Other examples (some need a secret key):

**Mainnet:**

```typescript
// Infura node rpc for Mainnet:
const providerInfuraMainnet = new RpcProvider({ nodeUrl: 'https://starknet-mainnet.infura.io/v3/' + infuraKey });
// Blast node rpc for Mainnet:
const providerBlastMainnet = new RpcProvider({ nodeUrl: 'https://starknet-mainnet.blastapi.io/' + blastKey + "/rpc/v0.4" });
// Lava node rpc for Mainnet:
const providerMainnetLava = new RpcProvider({ nodeUrl: "https://g.w.lavanet.xyz:443/gateway/strk/rpc-http/" + lavaMainnetKey });
// Alchemy node rpc for Mainnet:
const providerAlchemyMainnet = new RpcProvider({ nodeUrl: 'https://starknet-mainnet.g.alchemy.com/v2/' + alchemyKey });
```

**Testnet:**

```typescript
// Infura node rpc for Testnet:
const providerInfuraTestnet = new RpcProvider({ nodeUrl: 'https://starknet-goerli.infura.io/v3/' + infuraKey });
// Blast node rpc for Testnet:
const providerBlastTestnet = new RpcProvider({ nodeUrl: 'https://starknet-testnet.blastapi.io/' + blastKey + "/rpc/v0.4" });
// Alchemy node rpc for Testnet:
const providerAlchemyTestnet = new RpcProvider({ nodeUrl: 'https://starknet-goerli.g.alchemy.com/v2/' + alchemyKey });
```

## Specific methods

Some methods are available only if connected to a sequencer, and some others are available only if connected to a node (using RPC).

### Specific sequencer methods

For example, if you want to estimate the fee of an L1 ➡️ L2 message, you need to use a method that is available only in the sequencer. The class `SequencerProvider` is available for this case:

```typescript
import { SequencerProvider, constants } from "starknet";
const provider = new SequencerProvider({ baseUrl: constants.BaseUrl.SN_GOERLI }); // for testnet
const responseEstimateMessageFee = await provider.estimateMessageFee(.....)
```

### Specific RPC methods

For example, if you want to read the list of pending transactions, you need to use a method available from an RPC node. The class `RpcProvider` is available for this case:

```typescript
import { RpcProvider } from "starknet";
const providerRPC = new RpcProvider({ nodeUrl: "http://192.168.1.99:9545/rpc/v0.4" }); // for a pathfinder node located in a PC in the local network
const pendingTx = await providerRPC.getPendingTransactions();
```

RPC providers are for example Infura, Alchemy, Chainstack... Or you can spin up your own Pathfinder node!

For example, to connect to Alchemy with your personal API key:

```typescript
const providerRPC = new RpcProvider({ nodeUrl: 'https://starknet-mainnet.g.alchemy.com/v2/' + alchemyKey});
```
