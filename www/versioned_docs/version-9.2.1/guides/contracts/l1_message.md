---
title: Messages L1 - L2
sidebar_position: 8
---

# Messages L1 - L2

This guide explains how to handle communication between Ethereum (Layer 1) and Starknet (Layer 2) using Starknet.js. Messages can be exchanged between:

- L2 Starknet Mainnet ↔️ L1 Ethereum
- L2 Starknet Testnet ↔️ L1 Sepolia ETH testnet
- L2 local Starknet Devnet ↔️ L1 local ETH testnet (Foundry/Anvil, ...)

For a detailed explanation of the messaging architecture, see the [Starknet documentation](https://docs.starknet.io/architecture/messaging/).

## Prerequisites

- A deployed Starknet contract that can handle L1 messages
- An Ethereum contract that can send messages to Starknet
- Basic knowledge of Ethereum and Starknet development

## Sending Messages from L1 ➡️ L2

### 1. Estimate the Message Fee

When sending a message from L1 to L2, you need to pay two fees:

1. The normal L1 gas fee for the Ethereum transaction
2. An extra fee (passed as value to `sendMessageToL2`) to pay for the L2 part (with the L1 fee TOKEN)

You can estimate the L2 fee (the extra fee) with this function:

```typescript
import { RpcProvider, constants } from 'starknet';

// Initialize provider for testnet
const myProvider = new RpcProvider({ nodeUrl: constants.NetworkName.SN_SEPOLIA });

// Estimate the L2 part of the message fee
const messageFee = await myProvider.estimateMessageFee({
  from_address: l1ContractAddress, // The L1 contract address
  to_address: l2ContractAddress, // The L2 contract address
  entry_point_selector: 'handle_l1_message', // The L2 function name
  payload: ['1234567890123456789', '200'], // The parameters (without from_address)
});
```

### 2. Sending

On your L1 contract, use the Starknet core contract's `sendMessageToL2` function:

```solidity
/**
    Sends a message to an L2 contract.
    This function is payable, the paid amount is the message fee.
    Returns the hash of the message and the nonce of the message.
*/
function sendMessageToL2(
    uint256 toAddress,
    uint256 selector,
    uint256[] calldata payload
) external payable returns (bytes32, uint256);
```

The L2 contract at `to_address` will automatically execute the function specified by `entry_point_selector`. This function must:

- Have the `#[l1_handler]` decorator
- Have `from_address: felt252` as its first parameter
- The payload should NOT include the `from_address` parameter

### 3. Consuming

Your Starknet contract needs to implement the appropriate interface to handle L1 messages. Here's an example in Cairo:

```cairo
#[starknet::interface]
trait IL1Handler {
    fn handle_l1_message(ref self: TContractState, from_address: felt252, payload: Array<felt252>);
}

#[starknet::contract]
mod MyContract {
    #[storage]
    struct Storage {
        value: felt252,
    }

    #[l1_handler]
    fn handle_l1_message(ref self: TContractState, from_address: felt252, payload: Array<felt252>) {
        // Handle the message from L1
        // payload[0] contains the first parameter, payload[1] contains the second, etc.
        self.value.write(payload[0]);
    }
}
```

### 4. Status

You can check the status of L1-L2 messages:

```typescript
// For L1->L2 messages
const l1MessagesStatus = await myProvider.getL1MessagesStatus(l1TransactionHash);
```

### 5. Hashes and Verification

You can calculate and verify message hashes in three ways:

#### a) Get Message Hash from L1 Transaction

```typescript
const l1FromAddress = '0x0000000000000000000000008453fc6cd1bcfe8d4dfc069c400b433054d47bdc';
const l2ToAddress = 2158142789748719025684046545159279785659305214176670733242887773692203401023n;
const l2Selector = 774397379524139446221206168840917193112228400237242521560346153613428128537n;
const payload = [
  4543560n,
  829565602143178078434185452406102222830667255948n,
  3461886633118033953192540141609307739580461579986333346825796013261542798665n,
  9000000000000000n,
  0n,
];
const l1Nonce = 8288n;

const l1ToL2MessageHash = hash.getL2MessageHash(
  l1FromAddress,
  l2ToAddress,
  l2Selector,
  payload,
  l1Nonce
);
// Verify at: https://sepolia.starkscan.co/message/0x2e350fa9d830482605cb68be4fdb9f0cb3e1f95a0c51623ac1a5d1bd997c2090#messagelogs
```

#### b) Get L1 Message Hash from L2 Transaction

```typescript
const l2TransactionHash = '0x28dfc05eb4f261b37ddad451ff22f1d08d4e3c24dc646af0ec69fa20e096819';
const l1MessageHash = await myProvider.getL1MessageHash(l2TransactionHash);
// Verify at: https://sepolia.voyager.online/tx/0x28dfc05eb4f261b37ddad451ff22f1d08d4e3c24dc646af0ec69fa20e096819#messages
```

#### c) Get Transaction Hash from L1 Transaction

```typescript
const l1ToL2TransactionHash = hash.calculateL2MessageTxHash(
  l1FromAddress,
  l2ToAddress,
  l2Selector,
  payload,
  constants.StarknetChainId.SN_SEPOLIA,
  l1Nonce
);
// Verify at: https://sepolia.starkscan.co/tx/0x067d959200d65d4ad293aa4b0da21bb050a1f669bce37d215c6edbf041269c07
```

## Sending Messages from L2 ➡️ L1

### 1. Estimate the Fee

Before sending a message, estimate the fee that will cover both L1 and L2 costs:

```typescript
// Assuming account0 is initialized with the v8 object syntax
// const account0 = new Account({ provider: myProvider, address: accountAddress, signer: privateKey });

const { suggestedMaxFee } = await account0.estimateInvokeFee({
  contractAddress: L2ContractAddress,
  entrypoint: 'send_message_to_l1',
  calldata: [
    toAddress, // L1 recipient address
    '123', // First parameter
    '456', // Second parameter
  ],
});
```

### 2. Sending

The message is sent by invoking a function in your Cairo contract. The contract will handle the actual message sending to L1.

```typescript
// Send the message by invoking the contract function
const tx = await account0.execute({
  contractAddress: L2ContractAddress,
  entrypoint: 'send_message_to_l1',
  calldata: [toAddress, '123', '456'],
  maxFee: suggestedMaxFee,
});

// Wait for the transaction to be accepted
await myProvider.waitForTransaction(tx.transaction_hash);
```

### 3. Consuming

Your Ethereum contract needs to implement the logic to consume messages from L2. Here's an example in Solidity:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IStarknetCore {
    function consumeMessageFromL2(
        uint256 fromAddress,
        uint256[] calldata payload
    ) external;
}

contract L1Contract {
    IStarknetCore starknetCore;

    constructor(address _starknetCore) {
        starknetCore = IStarknetCore(_starknetCore);
    }

    function consumeMessage(
        uint256 fromAddress,
        uint256[] calldata payload
    ) external {
        // Consume the message from L2
        starknetCore.consumeMessageFromL2(fromAddress, payload);

        // Handle the message data
        // payload[0] contains the first parameter, payload[1] contains the second, etc.
    }
}
```

### 4. Hashes and Verification

You can calculate the L2->L1 message hash for verification:

```typescript
const fromL2Address = '0x04c5772d1914fe6ce891b64eb35bf3522aeae1315647314aac58b01137607f3f';
const toL1Address = '0x8453fc6cd1bcfe8d4dfc069c400b433054d47bdc';
const payloadMessage = [
  0n,
  1270393329865452722422775477982592488490549769359n,
  4543560n,
  200000000000000,
  0n,
];
const l2ToL1MessageHash = hash.getL1MessageHash(fromL2Address, toL1Address, payloadMessage);
// Verify at: https://sepolia.voyager.online/message/0x2eace1d0ab5dbe354a93fb0a59c6b98f26e6a0fe7c33f87329f8fc9829058b8b
```

## Best Practices

1. **Message Fees**: Always estimate and include the correct message fee when sending messages from L1 to L2.

2. **State Synchronization**: Remember that L1-L2 communication is not instant. Design your application to handle asynchronous state updates.

3. **Error Handling**: Implement proper error handling for cases where messages fail to be delivered or consumed.

4. **Testing**: Test your L1-L2 messaging thoroughly on devnet or testnet before deploying to mainnet.

## Common Issues and Solutions

### Message Not Received

If a message is not being received, check:

- Message fee is sufficient
- Contract addresses are correct
- Function signatures match
- Network state is properly synced

### Message Consumption Fails

If message consumption fails:

- Verify payload format matches the expected parameters
- Check if the message has already been consumed
- Ensure the consuming contract has proper permissions

## Additional Resources

- [Starknet Messaging Documentation](https://docs.starknet.io/architecture/messaging/#l2_l1_messages)
