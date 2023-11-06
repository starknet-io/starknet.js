---
sidebar_position: 13
---

# Messages with L1 network

You can exchange messages between L1 & L2 networks:

- L2 Starknet mainnet ↔️ L1 Ethereum.
- L2 Starknet testnet ↔️ L1 Goerli ETH testnet.
- L2 local Starknet devnet ↔️ L1 local ETH testnet (Ganache, ...).

You can find an explanation of the global mechanism [here](https://docs.starknet.io/documentation/architecture_and_concepts/L1-L2_Communication/messaging-mechanism/).

Most of the code for this messaging process will be written in Cairo, but Starknet.js provides some functionalities for this subject.

## L1 ➡️ L2 messages

To send a message from L1 to L2, you need a solidity smart contract in the L1 network, calling the `SendMessageToL2` function of the Starknet core contract.
The interface of this function:

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

You have to pay in the L1 an extra fee when invoking `sendMessageToL2` (of course paid with the L1 fee TOKEN), to pay the L2 part of the messaging mechanism. You can estimate this fee with this function:

```typescript
import { SequencerProvider } from "starknet";
const provider = new SequencerProvider({ baseUrl: constants.BaseUrl.SN_GOERLI }); // for testnet

const responseEstimateMessageFee = await provider.estimateMessageFee({
    from_address: L1address,
    to_address: L2address,
    entry_point_selector: "handle_l1_mess",
    payload: ["1234567890123456789", "200"]
})
```

If the fee is paid in L1, the Cairo contract at `to_Address` is automatically executed, function `entry_point_selector` (the function shall have a decorator `@l1_handler` in the Cairo code), with parameters `payload`.

## L2 ➡️ L1 messages

To send a message to L1, you will just invoke a Cairo contract function, paying a fee that will pay all the processes (in L1 & L2).

If necessary you can estimate this fee with the generic `estimateInvokeFee` function:

```typescript
const { suggestedMaxFee: estimatedFee1 } = await account0.estimateInvokeFee({
	contractAddress: testAddress,
	entrypoint: "withdraw_to_L1",
	calldata: ["123456789", "30"]
});
```

The result is in `estimatedFee1`, of type BN.
