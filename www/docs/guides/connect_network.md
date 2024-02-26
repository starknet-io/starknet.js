---
sidebar_position: 3
---

# RpcProvider object 🔌 connect to the network

The first thing to do is to define with which network you want to interact.

Then you need to select a node. A node is a safe way to connect with the Starknet blockchain. You can use:

- a node supplied by a node provider - it can be free or not; it can have limitations or not; it can have WebSocket support or not.
  > RPC node providers are for example Infura, Alchemy, Blast, Nethermind, Lava, Chainstack...
- your own node, located on your local computer or in your local network.
  > you can spin up your own node with Pathfinder, Juno, Papyrus, Deoxys, ...
- a local development node, that simulates a Starknet network. Useful for devs to perform quick tests without spending precious fee token.
  > Main development devnets are Starknet-devnet-rs, Madara, ...

Each node is communicating with Starknet.js using a rpc specification. Most of the nodes are able to use 2 rpc spec versions.  
For example, this node is compatible with v0.5.1 & v0.6.0, using the following entry points :

- "https://free-rpc.nethermind.io/goerli-juno/v0_5"
- "https://free-rpc.nethermind.io/goerli-juno/v0_6"

From rpc spec v0.5.0, you can request the rpc spec version that uses a node address :

```typescript
const resp = await myProvider.getSpecVersion();
console.log('rpc version =', resp);
// result : rpc version = 0.6.0
```

On Starknet.js side, you have to select the proper version, to be in accordance with the node you want to use :

| Rpc spec version of your node | Starknet.js version to use   |
| :---------------------------: | ---------------------------- |
|            v0.4.0             | Starknet.js v5.21.1          |
|            v0.5.0             | Starknet.js v5.23.0          |
|            v0.5.1             | Starknet.js v5.29.0 & v6.0.0 |
|            v0.6.0             | Starknet.js v6.0.0           |

Starknet.js v6.x.x will recognize automatically if you are connected to a v0.5.1 or a v0.6.0 rpc spec version.

With the `RpcProvider` class, you define the Starknet Rpc node to use.

```typescript
import { RpcProvider } from 'starknet';
```

## Connect your DAPP to an RPC node provider

### Default Rpc node

If you don't want to use a specific node, or to handle an API key, you can use by default:

```typescript
const myProvider = new RpcProvider({ nodeUrl: constants.NetworkName.SN_GOERLI });
const myProvider = new RpcProvider({ nodeUrl: constants.NetworkName.SN_MAIN });
// or
const myProvider = new RpcProvider(); // Goerli
```

> when using this syntax, a random public node will be selected.

Using a specific nodeUrl is the better approach, as such a node will have fewer limitations and will be less crowded.

Some examples of RpcProvider instantiation to connect to RPC node providers:

### Mainnet

```typescript
// Infura node rpc 0.5.1 for Mainnet:
const providerInfuraMainnet = new RpcProvider({
  nodeUrl: 'https://starknet-mainnet.infura.io/v3/' + infuraKey,
});
// Blast node rpc 0.5.1 & 0.6.0 for Mainnet:
const providerBlastMainnet = new RpcProvider({
  nodeUrl: 'https://starknet-mainnet.blastapi.io/' + blastKey + '/rpc/v0.5',
});
const providerBlastMainnet = new RpcProvider({
  nodeUrl: 'https://starknet-mainnet.blastapi.io/' + blastKey + '/rpc/v0_6',
});
// Lava node rpc 0.4.0 for Mainnet:
const providerMainnetLava = new RpcProvider({
  nodeUrl: 'https://g.w.lavanet.xyz:443/gateway/strk/rpc-http/' + lavaMainnetKey,
});
// Alchemy node rpc 0.5.1 for Mainnet:
const providerAlchemyMainnet = new RpcProvider({
  nodeUrl: 'https://starknet-mainnet.g.alchemy.com/starknet/version/rpc/v0.5/' + alchemyKey,
});
// Public Nethermind node rpc 0.5.1 & 0.6.0 for Mainnet:
const providerMainnetNethermindPublic = new RpcProvider({
  nodeUrl: 'https://free-rpc.nethermind.io/mainnet-juno/v0_5',
});
const providerMainnetNethermindPublic = new RpcProvider({
  nodeUrl: 'https://free-rpc.nethermind.io/mainnet-juno/v0_6',
});
// Public Blast node rpc 0.4.0, 0.5.1 & 0.6.0 for Mainnet:
const providerBlastMainnet = new RpcProvider({
  nodeUrl: 'https://starknet-mainnet.public.blastapi.io/rpc/v0.4',
});
const providerBlastMainnet = new RpcProvider({
  nodeUrl: 'https://starknet-mainnet.public.blastapi.io/rpc/v0.5',
});
const providerBlastMainnet = new RpcProvider({
  nodeUrl: 'https://starknet-mainnet.public.blastapi.io/rpc/v0_6',
});
// Public Lava node rpc 0.4.0 for Mainnet:
const providerLavaMainnet = new RpcProvider({
  nodeUrl: 'https://json-rpc.starknet-mainnet.public.lavanet.xyz',
});
```

> Take care to safely manage your API key. It's a confidential item!

### Goerli Testnet

```typescript
// Infura node rpc 0.5.1 for Goerli Testnet:
const providerInfuraTestnet = new RpcProvider({
  nodeUrl: 'https://starknet-goerli.infura.io/v3/' + infuraKey,
});
// Blast node rpc 0.5.1 & 0.6.0 for Goerli Testnet:
const providerBlastTestnet = new RpcProvider({
  nodeUrl: 'https://starknet-testnet.blastapi.io/' + blastKey + '/rpc/v0.5',
});
const providerBlastTestnet = new RpcProvider({
  nodeUrl: 'https://starknet-testnet.blastapi.io/' + blastKey + '/rpc/v0_6',
});
// Alchemy node rpc 0.5.1 for Goerli Testnet:
const providerAlchemyTestnet = new RpcProvider({
  nodeUrl: 'https://starknet-goerli.g.alchemy.com/starknet/version/rpc/v0.5/' + alchemyKey,
});
// Public Nethermind node rpc 0.5.1 & 0.6.0 for Goerli Testnet:
const providerTestnetNethermindPublic = new RpcProvider({
  nodeUrl: 'https://free-rpc.nethermind.io/goerli-juno/v0_5',
});
const providerTestnetNethermindPublic = new RpcProvider({
  nodeUrl: 'https://free-rpc.nethermind.io/goerli-juno/v0_6',
});
```

### Sepolia Testnet

```typescript
// Blast node rpc 0.5.1 & 0.60 for Sepolia Testnet:
const providerBlastTestnet = new RpcProvider({
  nodeUrl: 'https://starknet-testnet.blastapi.io/' + blastKey + '/rpc/v0.5',
});
const providerBlastTestnet = new RpcProvider({
  nodeUrl: 'https://starknet-testnet.blastapi.io/' + blastKey + '/rpc/v0_6',
});
// Alchemy node rpc for Sepolia Testnet:
const providerSepoliaNethermindPublic = new RpcProvider({
  nodeUrl: 'https://free-rpc.nethermind.io/sepolia-juno/v0_5',
});
const providerSepoliaNethermindPublic = new RpcProvider({
  nodeUrl: 'https://free-rpc.nethermind.io/sepolia-juno/v0_6',
});
```

## Connect to your own node

### Pathfinder

For a local [Pathfinder](https://github.com/eqlabs/pathfinder) node:

```typescript
const provider = new RpcProvider({ nodeUrl: '127.0.0.1:9545/rpc/v0_6' });
```

Your node can be located in your local network (example: Pathfinder node running on a computer in your network, launched with this additional option: `--http-rpc 0.0.0.0:9545`).
You can connect with:

```typescript
const provider = new RpcProvider({ nodeUrl: '192.168.1.99:9545/rpc/v0_6' });
```

### Juno

For a local [Juno](https://github.com/NethermindEth/juno) node initialize the provider with:

```typescript
const provider = new RpcProvider({ nodeUrl: 'http://127.0.0.1:6060/v0_6' });
```

> If Juno is running on a separate computer in your local network, don't forget to add the option `--http-host 0.0.0.0` when launching Juno.

## Devnet

Example of a connection to a local development node (rpc 0.6.0), with Starknet-devnet-rs:

```typescript
const provider = new RpcProvider({ nodeUrl: 'http://127.0.0.1:5050/rpc' });
```

> If you have customized host and port during starknet-devnet initialization, adapt in accordance to your script.
