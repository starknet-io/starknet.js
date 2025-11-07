---
sidebar_position: 1
---

# Why Starknet JS

Starknet.js is your gateway to building powerful decentralized applications (dApps) on Starknet. As the official JavaScript/TypeScript library for Starknet, it provides a comprehensive suite of tools to interact with the Starknet network, making blockchain development accessible and efficient.

## Why Choose Starknet.js?

- 🚀 **Easy Integration**: Simple, intuitive APIs for interacting with Starknet
- 🔒 **Type Safety**: Full TypeScript support with smart contract type generation
- ⚡ **High Performance**: Optimized for handling Starknet's high throughput
- 🛠️ **Complete Toolset**: Everything you need for Starknet development in one package
- 📚 **Well Documented**: Extensive documentation and examples

## Architecture Overview

The following diagrams illustrate how Starknet.js connects your dApp to the Starknet network:

![Starknet.js Architecture](./pictures/why-starknet.svg)

This architecture enables:

- Seamless communication between your dApp and Starknet nodes
- Efficient handling of transactions and contract interactions
- Secure account management and transaction signing
- Real-time event monitoring and state updates

Key components and their interactions:

1. **Your dApp** interacts with Starknet.js through its JavaScript/TypeScript interface
2. **Starknet.js** comprises several classes and utilities that abstract and simplify interacting with Starknet
3. **Starknet Network** processes transactions and maintains the blockchain state

## Starknet.js Core Components

### 1. Provider & Channel

- Both handle communication with the network at different levels.
- **`Provider`**: Your main connection to Starknet nodes. Handles high-level communication. Available as the `RpcProvider` class.
- **`Channel`**: Handles low-level communication. Available as the `RpcChannel` and `WebSocketChannel` classes that support HTTP and WebSocket connections, respectively.

### 2. Account

The `Account` class is your primary interface for:

- 💼 Managing wallets and tokens
- 💰 Handling transaction fees
- 📝 Signing and sending transactions
- 🔐 Managing account security

### 3. Contract

The `Contract` class provides:

- 📖 Reading smart contract state
- ✍️ Writing to contracts
- 🔄 Handling contract events
- 🧪 Testing contract interactions

### 4. Utility Tools

- `Utils`: Helper functions for data conversion and formatting
- `Signer`: Cryptographic operations and message signing

## Network Compatibility

Connect your dApp to any Starknet environment:

| Network                                                   | Description                              | Use Case              |
| --------------------------------------------------------- | ---------------------------------------- | --------------------- |
| [Mainnet](https://starkscan.co)                           | Production network (Layer 2 of Ethereum) | Live applications     |
| [Testnet](https://sepolia.starkscan.co/)                  | Test network (Layer 2 of Sepolia)        | Testing & development |
| [Devnet](https://github.com/0xSpaceShard/starknet-devnet) | Local development network                | Rapid development     |

You can also connect to:

- Custom Starknet deployments
- Local Starknet nodes (connected to mainnet or testnet)

## Prerequisites

Before diving into Starknet.js, familiarize yourself with:

1. [Starknet Documentation](https://docs.starknet.io/documentation/) - Understanding the network
2. [Cairo Programming](https://book.cairo-lang.org/) - Smart contract development
3. JavaScript/TypeScript fundamentals

## Next Steps

Ready to start building? Head to our [Getting Started](./intro.md) guide to begin your journey with Starknet.js!
