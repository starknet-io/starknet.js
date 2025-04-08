---
sidebar_position: 3
---

# RpcProvider object 🔌 connect to the network

The first thing to do is to define with which network you want to interact (Mainnet, Testnet, Devnet, ...).

Then you need to select a node. A node is a safe way to connect with the Starknet blockchain. You can use:

- a node supplied by a node provider - it can be free or not; it can have limitations or not; it can have WebSocket support or not.
  > RPC node providers are for example Infura, Alchemy, Blast, Nethermind, Lava, Chainstack...
- your own node, located on your local computer or in your local network.
  > you can spin up your own node with Pathfinder, Juno, Papyrus, Deoxys, ...
- a local development node, that simulates a Starknet network. Useful for devs to perform quick tests without spending precious fee token.
  > Main development devnets are Starknet-devnet, Madara, ...

Each node is communicating with Starknet.js using a rpc specification. Most of the nodes are able to use 2 rpc spec versions.  
For example, this node is compatible with v0.7.1 & v0.8.0, using the following entry points :

- "https://free-rpc.nethermind.io/sepolia-juno/v0_7"
- "https://free-rpc.nethermind.io/sepolia-juno/v0_8"

From rpc spec v0.5.0, you can request the rpc spec version that uses a node address :

```typescript
const resp = await myProvider.getSpecVersion();
console.log('rpc version =', resp);
// result : rpc version = 0.8.0
```

On Starknet.js side, you have to select the proper version, to be in accordance with the node you want to use :

| Rpc spec version of your node | Starknet.js version to use    |
| :---------------------------: | ----------------------------- |
|            v0.4.0             | Starknet.js v5.21.1           |
|            v0.5.0             | Starknet.js v5.23.0           |
|            v0.5.1             | Starknet.js v5.29.0 or v6.1.0 |
|            v0.6.0             | Starknet.js v6.24.1           |
|            v0.7.1             | Starknet.js v6.24.1 or v7.0.1 |
|            v0.8.0             | Starknet.js v7.0.1            |

:::note
From version 6.x.x, Starknet.js is compatible with 2 rpc spec versions.
:::

With the `RpcProvider` class, you define the Starknet Rpc node to use:

```typescript
import { RpcProvider } from 'starknet';
```

## Connect your DAPP to an RPC node provider

### Available nodes

**Mainnet network:**

|                     Node | with public url  |   with API key   |
| -----------------------: | :--------------: | :--------------: |
|                  Alchemy |        No        |    v0_6, v0_7    |
|                   Infura |        No        |       v0_7       |
|                    Blast | v0_6, v0_7, v0_8 | v0_6, v0_7, v0_8 |
|               Nethermind | v0_6, v0_7, v0_8 |        No        |
|                     Lava | v0_6, v0_7, v0_8 |       v0_8       |
| Local Pathfinder v0.16.2 | v0_6, v0_7, v0_8 |       N/A        |
|       Local Juno v0.14.2 | v0_6, v0_7, v0_8 |       N/A        |

**Sepolia Testnet network:**

|                     Node | with public url  | with API key |
| -----------------------: | :--------------: | :----------: |
|                  Alchemy |        No        |  v0_6, v0_7  |
|                   Infura |        No        |     v0_7     |
|                    Blast | v0_6, v0_7, v0_8 |      No      |
|               Nethermind | v0_6, v0_7, v0_8 |      No      |
|                     Lava | v0_6, v0_7, v0_8 |      No      |
| Local Pathfinder v0.16.2 | v0_6, v0_7, v0_8 |     N/A      |
|       Local Juno v0.14.2 | v0_6, v0_7, v0_8 |     N/A      |

**Local Starknet-devnet network:**

|                   Node | with public url | with API key |
| ---------------------: | :-------------: | :----------: |
| Starknet-devnet v0.2.4 |      v0_7       |     N/A      |
| Starknet-devnet v0.3.0 |      v0_8       |     N/A      |

:::note
This status has been performed 02/apr/2025.
:::

### Default Rpc node

If you don't want to use a specific node, or to handle an API key, you can use by default (using Rpc spec 0.8.0):

```typescript
const myProvider = new RpcProvider({ nodeUrl: constants.NetworkName.SN_SEPOLIA });
const myProvider = new RpcProvider({ nodeUrl: constants.NetworkName.SN_MAIN });
// or
const myProvider = new RpcProvider(); // Sepolia
```

> when using this syntax, a random public node will be selected.

Using a specific nodeUrl is the better approach, as such a node will have fewer limitations, the last version of software and will be less crowded.

Some examples of RpcProvider instantiation to connect to RPC node providers:

### Mainnet

```typescript
// Infura node rpc 0.7.0 for Mainnet:
const providerInfuraMainnet = new RpcProvider({
  nodeUrl: 'https://starknet-mainnet.infura.io/v3/' + infuraKey,
  specVersion: '0.7',
});
// Blast node rpc 0.8.0 for Mainnet (0.6 & 0_7 also available):
const providerBlastMainnet = new RpcProvider({
  nodeUrl: 'https://starknet-mainnet.blastapi.io/' + blastKey + '/rpc/v0_8',
});
// Lava node rpc 0.8.0 for Mainnet:
const providerMainnetLava = new RpcProvider({
  nodeUrl: 'https://g.w.lavanet.xyz:443/gateway/strk/rpc-http/' + lavaMainnetKey,
});
// Alchemy node rpc 0.7.0 for Mainnet  (0_6 also available):
const providerAlchemyMainnet = new RpcProvider({
  nodeUrl: 'https://starknet-mainnet.g.alchemy.com/starknet/version/rpc/v0_7/' + alchemyKey,
  specVersion: '0.7',
});
// Public Nethermind node rpc 0.8.0 for Mainnet (0_6 & 0_7 also available):
const providerMainnetNethermindPublic = new RpcProvider({
  nodeUrl: 'https://free-rpc.nethermind.io/mainnet-juno/v0_8',
});
// Public Blast node rpc 0.8.0 for Mainnet (0.6 & 0_7 also available):
const providerBlastMainnet = new RpcProvider({
  nodeUrl: 'https://starknet-mainnet.public.blastapi.io/rpc/v0_8',
});
// Public Lava node rpc 0.8.0 for Mainnet (0.6 & 0_7 also available):
const providerLavaMainnet = new RpcProvider({
  nodeUrl: 'https://rpc.starknet.lava.build/rpc/v0_8',
});
```

> Take care to safely manage your API key. It's a confidential item!

:::tip
If the rpc version of the node is 0.7, use :

```typescript
const myProvider = new RpcProvider({
  nodeUrl: `${myNodeUrl}`,
  specVersion: '0.7',
});
```

If you are not sure of the rpc version (0.7 or 0.8), use:

```typescript
const myProvider = await RpcProvider.create({ nodeUrl: `${myNodeUrl}` });
```

This line of code is slow, as it performs a request to the node.
:::

### Goerli Testnet

:::info
The Goerli testnet is no more in service.
:::

### Sepolia Testnet

```typescript
// Infura node rpc 0.7.0 for Sepolia Testnet :
const providerInfuraSepoliaTestnet = new RpcProvider({
  nodeUrl: 'https://starknet-sepolia.infura.io/v3/' + infuraKey,
  specVersion: '0.7',
});
// Public Nethermind node rpc 0.8.0 for Sepolia Testnet (0_6 & 0_7 also available) :
const providerSepoliaTestnetNethermindPublic = new RpcProvider({
  nodeUrl: 'https://free-rpc.nethermind.io/sepolia-juno/v0_8',
});
// Public Blast node rpc 0.8.0 for Sepolia Testnet (0_6 & 0_7 also available) :
const providerSepoliaTestnetBlastPublic = new RpcProvider({
  nodeUrl: 'https://starknet-sepolia.public.blastapi.io/rpc/v0_8',
});
// Public Lava node rpc 0.8.0 for Sepolia Testnet (0_6 & 0_7 also available) :
const providerSepoliaTestnetBlastPublic = new RpcProvider({
  nodeUrl: 'https://rpc.starknet-testnet.lava.build/rpc/v0_8',
});
```

## Connect to your own node

### Pathfinder

For a local [Pathfinder](https://github.com/eqlabs/pathfinder) node:

```typescript
const provider = new RpcProvider({ nodeUrl: '127.0.0.1:9545/rpc/v0_8' });
```

Your node can be located in your local network (example: Pathfinder node running on a computer in your network, launched with this additional option: `--http-rpc 0.0.0.0:9545`).
You can connect with:

```typescript
const provider = new RpcProvider({ nodeUrl: '192.168.1.99:9545/rpc/v0_8' });
```

### Juno

For a local [Juno](https://github.com/NethermindEth/juno) node initialize the provider with:

```typescript
const provider = new RpcProvider({ nodeUrl: 'http://127.0.0.1:6060/v0_8' });
```

> If Juno is running on a separate computer in your local network, don't forget to add the option `--http-host 0.0.0.0` when launching Juno.

## Devnet

Example of a connection to a local development node (rpc 0.8.0), with Starknet-devnet v0.3.0:

```typescript
const provider = new RpcProvider({ nodeUrl: 'http://127.0.0.1:5050/rpc' });
```

> If you have customized host and port during starknet-devnet initialization, adapt in accordance your script.

## Batch JSON-RPC

The BatchClient class allows requests to be batched together in a single HTTP request, either by the interval amount or at the end of the callback queue if the batch is set to 0. By batching requests, we can reduce the overhead associated with handling individual requests.

#### Example of usage with RpcProvider

```typescript
const myBatchProvider = new RpcProvider({
  batch: 0,
});

const [getBlockResponse, blockHashAndNumber, txCount] = await Promise.all([
  myBatchProvider.getBlock(),
  myBatchProvider.getBlockLatestAccepted(),
  myBatchProvider.getBlockTransactionCount('latest'),
]);

// ... usage of getBlockResponse, blockHashAndNumber, txCount
```

#### Example of direct usage of underlying BatchClient class

```typescript
const provider = new RpcProvider();

const batchClient = new BatchClient({
  nodeUrl: provider.channel.nodeUrl,
  headers: provider.channel.headers,
  interval: 0,
});

const [getBlockResponse, blockHashAndNumber, txCount] = await Promise.all([
  batchClient.getBlock(),
  batchClient.getBlockLatestAccepted(),
  batchClient.getBlockTransactionCount('latest'),
]);

// ... usage of getBlockResponse, blockHashAndNumber, txCount
```

## Error handling

The [Starknet RPC specification](https://github.com/starkware-libs/starknet-specs) defines a set of possible errors that the RPC endpoints could return for various scenarios. If such errors arise `starknet.js` represents them with the corresponding [RpcError](../API/classes/RpcError) class where the endpoint error response information is contained within the `baseError` property. Also of note is that the class has an `isType` convenience method that verifies the base error type as shown in the example below.

#### Example

```typescript
try {
  ...
} catch (error) {
  if (error instanceof RpcError && error.isType('UNEXPECTED_ERROR')) { ... }
}
```
