---
sidebar_position: 12
---

# Work with ERC20 tokens

Based on what has been seen in the previous pages of this guide, we will use an ERC20 contract.

## What's an ERC20

As in Ethereum, a token has an ERC20 contract to manage it. This contract contains a table, that lists the quantity of tokens owned by each involved account:
![](./pictures/ERC20.png)

For example, Account address 2 owns 100 tokens of this ERC20 contract.

Users have the feeling that their tokens are stored in their wallets, but it's absolutely false. You have no list of assets stored in your account contract. In fact, a token has its own ERC20 contract, and the amount of token owned by your account address is stored in this contract.

If you want to have your balance of a token, ask for its ERC20 contract, with the function `ERC20contract.balanceOf(accountAddress)`.

When you want to transfer some tokens in your possession, you have to use the ERC20 contract function `transfer`, through the `account.execute` function (or meta-class methods). In this way, Starknet.js will send to the account contract a message signed with the private key.

This message contains the name of the function to call in the ERC20 contract, with its optional parameters.

The account contract will use the public key to check that you have the private key, then will ask the ERC20 contract to execute the requested function.

This way, the ERC20 contract is absolutely sure that the caller of the transfer function knows the private key of this account.

## ETH token is an ERC20 in Starknet

In opposition to Ethereum, the ETH token is an ERC20 in Starknet, like all other tokens. In all networks, its ERC20 contract address is:

```typescript
const addrETH = '0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7';
```

## Deploy an ERC20

Let's dive down the rabbit hole!

This example works with an ERC20, that we will deploy on the devnet-rs (launched with `cargo run --release -- --seed 0`).

First, let's initialize an existing account:

```typescript
// initialize provider
const provider = new RpcProvider({ nodeUrl: 'http://127.0.0.1:5050/rpc' });
// initialize existing pre-deployed account 0 of Devnet-rs
const privateKey = '0x71d7bb07b9a64f6f78ac4c816aff4da9';
const accountAddress = '0x64b48806902a367c8598f4f95c305e8c1a1acba5f082d294a43793113115691';

const account0 = new Account(provider, accountAddress, privateKey);
```

Declaration and deployment of the ERC20 contract:

```typescript
// Deploy an ERC20 contract
console.log('Deployment Tx - ERC20 Contract to Starknet...');
const compiledSierra = json.parse(
  fs.readFileSync('./__mocks__/cairo/ERC20-241/ERC20OZ081.sierra.json').toString('ascii')
);
const compiledCasm = json.parse(
  fs.readFileSync('./__mocks__/cairo/ERC20-241/ERC20OZ081.casm.json').toString('ascii')
);
const initialTk: Uint256 = cairo.uint256(20n * 10n ** 18n); // 20 NIT
const erc20CallData: CallData = new CallData(compiledSierra.abi);
const ERC20ConstructorCallData: Calldata = erc20CallData.compile('constructor', {
  name: 'niceToken',
  symbol: 'NIT',
  fixed_supply: initialTk,
  recipient: account0.address,
});

console.log('constructor=', ERC20ConstructorCallData);
const deployERC20Response = await account0.declareAndDeploy({
  contract: compiledSierra,
  casm: compiledCasm,
  constructorCalldata: ERC20ConstructorCallData,
});
console.log('ERC20 declared hash: ', deployERC20Response.declare.class_hash);
console.log('ERC20 deployed at address: ', deployERC20Response.deploy.contract_address);

// Get the erc20 contract address
const erc20Address = deployERC20Response.deploy.contract_address;
// Create a new erc20 contract object
const erc20 = new Contract(compiledSierra.abi, erc20Address, provider);
erc20.connect(account0);
```

## Interact with an ERC20

Here we will read the balance and transfer tokens:

```typescript
// Check balance - should be 20 NIT
console.log(`Calling Starknet for account balance...`);
const balanceInitial = await erc20.balanceOf(account0.address);
console.log('account0 has a balance of:', balanceInitial);

// Execute tx transfer of 1 tokens to account 1
console.log(`Invoke Tx - Transfer 1 tokens to erc20 contract...`);
const toTransferTk: Uint256 = cairo.uint256(1 * 10 ** 18);
const transferCall: Call = erc20.populate('transfer', {
  recipient: '0x78662e7352d062084b0010068b99288486c2d8b914f6e2a55ce945f8792c8b1',
  amount: 1n * 10n ** 18n,
});
const { transaction_hash: transferTxHash } = await account0.execute(transferCall);
// Wait for the invoke transaction to be accepted on Starknet
console.log(`Waiting for Tx to be Accepted on Starknet - Transfer...`);
await provider.waitForTransaction(transferTxHash);

// Check balance after transfer - should be 19 NIT
console.log(`Calling Starknet for account balance...`);
const balanceAfterTransfer = await erc20.balanceOf(account0.address);
console.log('account0 has a balance of:', balanceAfterTransfer);
console.log('✅ Script completed.');
```
