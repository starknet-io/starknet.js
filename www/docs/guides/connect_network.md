---
sidebar_position: 3
---

# RpcProvider object 🔌 connect to the network

The first thing to do is to define with which network you want to interact.

With the RpcProvider object, you define the Starknet Rpc node to use.

> Many nodes providers are available. You have hereunder some examples.

```typescript
import {RpcProvider} from 'starknet';
```

## Connect your DAPP to Starknet mainnet

```typescript
const provider = new RpcProvider({ nodeUrl: "https://json-rpc.starknet-mainnet.public.lavanet.xyz" });
```

## Connect your DAPP to Starknet testnet

```typescript
const provider = new RpcProvider({ nodeUrl: "https://limited-rpc.nethermind.io/goerli-juno" }); // for testnet
```

## Connect your DAPP to Starknet-devnet-rs

```typescript
const provider = new RpcProvider({ nodeUrl: "http://127.0.0.1:5050/rpc" });
```

> If you have customized host and port during starknet-devnet initialization, adapt in accordance to your script.

## Connect your DAPP to a Starknet node

### Pathfinder

For a local [Pathfinder](https://github.com/eqlabs/pathfinder) node:

```typescript
const provider = new RpcProvider({ nodeUrl: '127.0.0.1:9545/rpc/v0.5' });
```

Your node can be located in your local network (example: pathfinder node running on a computer on your network, launched with this additional option: `--http-rpc 0.0.0.0:9545`).
You can connect with:

```typescript
const provider = new RpcProvider({ nodeUrl: '192.168.1.99:9545/rpc/v0.5' })
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
const providerBlastMainnet = new RpcProvider({ nodeUrl: 'https://starknet-mainnet.blastapi.io/' + blastKey + "/rpc/v0.5" });
// Lava node rpc for Mainnet:
const providerMainnetLava = new RpcProvider({ nodeUrl: "https://g.w.lavanet.xyz:443/gateway/strk/rpc-http/" + lavaMainnetKey });
// Alchemy node rpc for Mainnet:
const providerAlchemyMainnet = new RpcProvider({ nodeUrl: 'https://starknet-mainnet.g.alchemy.com/starknet/version/rpc/v0.5/' + alchemyKey });
// Public Nethermind node rpc 0.5.1 for Mainnet :
const providerMainnetNethermindPublic = new RpcProvider({ nodeUrl: "https://limited-rpc.nethermind.io/mainnet-juno/v0_5" });
```

**Testnet:**

```typescript
// Infura node rpc for Testnet:
const providerInfuraTestnet = new RpcProvider({ nodeUrl: 'https://starknet-goerli.infura.io/v3/' + infuraKey });
// Blast node rpc for Testnet:
const providerBlastTestnet = new RpcProvider({ nodeUrl: 'https://starknet-testnet.blastapi.io/' + blastKey + "/rpc/v0.5" });
// Alchemy node rpc for Testnet:
const providerAlchemyTestnet = new RpcProvider({ nodeUrl: 'https://starknet-goerli.g.alchemy.com/starknet/version/rpc/v0.5/' + alchemyKey });
// Public Nethermind node rpc for Testnet :
const providerTestnetNethermindPublic = new RpcProvider({ nodeUrl: "https://limited-rpc.nethermind.io/goerli-juno" });
```

RPC providers are for example Infura, Alchemy, Chainstack... Or you can spin up your own Pathfinder node!
