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

With the RpcProvider object, you define the Starknet Rpc node to use.

```typescript
import {RpcProvider} from 'starknet';
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
// Infura node rpc for Mainnet:
const providerInfuraMainnet = new RpcProvider({ nodeUrl: 'https://starknet-mainnet.infura.io/v3/' + infuraKey });
// Blast node rpc for Mainnet:
const providerBlastMainnet = new RpcProvider({ nodeUrl: 'https://starknet-mainnet.blastapi.io/' + blastKey + "/rpc/v0.5" });
// Lava node rpc for Mainnet:
const providerMainnetLava = new RpcProvider({ nodeUrl: "https://g.w.lavanet.xyz:443/gateway/strk/rpc-http/" + lavaMainnetKey });
// Alchemy node rpc for Mainnet:
const providerAlchemyMainnet = new RpcProvider({ nodeUrl: 'https://starknet-mainnet.g.alchemy.com/starknet/version/rpc/v0.5/' + alchemyKey });
// Public Nethermind node rpc 0.5.1 for Mainnet:
const providerMainnetNethermindPublic = new RpcProvider({ nodeUrl: "https://free-rpc.nethermind.io/mainnet-juno/v0_5" });
```

> Take care to safely manage your API key. It's a confidential item!

### Testnet

```typescript
// Infura node rpc for Testnet:
const providerInfuraTestnet = new RpcProvider({ nodeUrl: 'https://starknet-goerli.infura.io/v3/' + infuraKey });
// Blast node rpc for Testnet:
const providerBlastTestnet = new RpcProvider({ nodeUrl: 'https://starknet-testnet.blastapi.io/' + blastKey + "/rpc/v0.5" });
// Alchemy node rpc for Testnet:
const providerAlchemyTestnet = new RpcProvider({ nodeUrl: 'https://starknet-goerli.g.alchemy.com/starknet/version/rpc/v0.5/' + alchemyKey });
// Public Nethermind node rpc for Testnet:
const providerTestnetNethermindPublic = new RpcProvider({ nodeUrl: "https://free-rpc.nethermind.io/testnet-juno/v0_5" });
```

## Connect to your own node

### Pathfinder

For a local [Pathfinder](https://github.com/eqlabs/pathfinder) node:

```typescript
const provider = new RpcProvider({ nodeUrl: '127.0.0.1:9545/rpc/v0.5' });
```

Your node can be located in your local network (example: Pathfinder node running on a computer in your network, launched with this additional option: `--http-rpc 0.0.0.0:9545`).
You can connect with:

```typescript
const provider = new RpcProvider({ nodeUrl: '192.168.1.99:9545/rpc/v0.5' })
```

### Juno

For a local [Juno](https://github.com/NethermindEth/juno) node initialize the provider with:

```typescript
const provider = new RpcProvider({ nodeUrl: 'http://127.0.0.1:6060/v0_5' });
```

> If Juno is running on a separate computer in your local network, don't forget to add the option `--http-host 0.0.0.0` when launching Juno.

## Devnet

Example of a connection to a local development node, with Starknet-devnet-rs:

```typescript
const provider = new RpcProvider({ nodeUrl: "http://127.0.0.1:5050/rpc" });
```

> If you have customized host and port during starknet-devnet initialization, adapt in accordance to your script.
