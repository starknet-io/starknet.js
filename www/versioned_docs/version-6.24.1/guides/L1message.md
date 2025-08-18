---
sidebar_position: 14
---

# Messages with L1 network

You can exchange messages between L1 & L2 networks:

- L2 Starknet mainnet ↔️ L1 Ethereum.
- L2 Starknet testnet ↔️ L1 Sepolia ETH testnet.
- L2 local Starknet devnet ↔️ L1 local ETH testnet (anvil, ...).

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
import { RpcProvider, constants } from 'starknet';
const provider = new RpcProvider({ nodeUrl: constants.NetworkName.SN_SEPOLIA }); // for testnet

const responseEstimateMessageFee = await provider.estimateMessageFee({
  from_address: L1address,
  to_address: L2address,
  entry_point_selector: 'handle_l1_mess',
  payload: ['1234567890123456789', '200'], // without from_address
});
```

If the fee is paid in L1, the Cairo contract at `to_Address` is automatically executed, function `entry_point_selector` (the function shall have a decorator `#[l1_handler]` in the Cairo code, with a first parameter called `from_address: felt252`). The payload shall not include the `from_address` parameter.

### L1 ➡️ L2 hashes

Starknet.js proposes 2 functions to calculate hashes related to a L1 ➡️ L2 message :

- The L2 message hash:  
  For a L1 tx requesting a message L1->L2, some data extracted from etherscan : https://sepolia.etherscan.io/tx/0xd82ce7dd9f3964d89d2eb9d555e1460fb7792be274950abe578d610f95cc40f5

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
  // l1ToL2MessageHash = '0x2e350fa9d830482605cb68be4fdb9f0cb3e1f95a0c51623ac1a5d1bd997c2090'
  ```

  Can be verified here : https://sepolia.starkscan.co/message/0x2e350fa9d830482605cb68be4fdb9f0cb3e1f95a0c51623ac1a5d1bd997c2090#messagelogs

- The L2 transaction hash:  
  For the same message:
  ```typescript
  const l1ToL2TransactionHash = hash.calculateL2MessageTxHash(
    l1FromAddress,
    l2ToAddress,
    l2Selector,
    payload,
    constants.StarknetChainId.SN_SEPOLIA,
    l1Nonce
  );
  // l1ToL2TransactionHash = '0x67d959200d65d4ad293aa4b0da21bb050a1f669bce37d215c6edbf041269c07'
  ```
  Can be verified here : https://sepolia.starkscan.co/tx/0x067d959200d65d4ad293aa4b0da21bb050a1f669bce37d215c6edbf041269c07

## L2 ➡️ L1 messages

To send a message to L1, you will just invoke a Cairo contract function, paying a fee that will pay all the processes (in L1 & L2).

If necessary you can estimate this fee with the generic `estimateInvokeFee` function:

```typescript
const { suggestedMaxFee: estimatedFee1 } = await account0.estimateInvokeFee({
  contractAddress: testAddress,
  entrypoint: 'withdraw_to_L1',
  calldata: ['123456789', '30'],
});
```

The result is in `estimatedFee1`, of type BN.

### L2 ➡️ L1 hash

Starknet.js proposes a function to calculate the L1 ➡️ L2 message hash :

```typescript
const l2TransactionHash = '0x28dfc05eb4f261b37ddad451ff22f1d08d4e3c24dc646af0ec69fa20e096819';
const l1MessageHash = await provider.getL1MessageHash(l2TransactionHash);
// l1MessageHash = '0x55b3f8b6e607fffd9b4d843dfe8f9b5c05822cd94fcad8797deb01d77805532a'
```

Can be verified here : https://sepolia.voyager.online/tx/0x28dfc05eb4f261b37ddad451ff22f1d08d4e3c24dc646af0ec69fa20e096819#messages
