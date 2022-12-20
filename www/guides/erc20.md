---
sidebar_position: 3
---

# Deploy an ERC20 Contract

Deploying a contract relies on having an account already set up with enough ETH to pay fees for both:

1. The class declaration
2. The transaction interacting with the UDC (universal deployer contract)

> You must first declare your contract class and only then deploy a new instance of it!

High level explanations from StarkWare can be found in this Notion [page](https://starkware.notion.site/Deploy-a-contract-and-an-account-on-StarkNet-ed2fd13301d2414e8223bb72bb90e386).

ERC20 implementations:

1. Argent ERC20 contract can be found [here](https://github.com/argentlabs/argent-contracts-starknet/blob/develop/contracts/lib/ERC20.cairo).
2. OpenZeppelin ERC20 can be found [here](https://github.com/OpenZeppelin/cairo-contracts/tree/main/src/openzeppelin/token/erc20).

## Setup

```javascript
const compiledErc20 = json.parse(
  fs.readFileSync("./ERC20.json").toString("ascii")
);
```

```javascript
// devnet private key from Account #0 if generated with --seed 0
const starkKeyPair = ec.getKeyPair("0xe3e70682c2094cac629f6fbed82c07cd");
const accountAddress = "0x7e00d496e324876bbc8531f2d9a82bf154d1a04a50218ee74cdd372f75a551a";

const recieverAddress = '0x69b49c2cc8b16e80e86bfc5b0614a59aa8c9b601569c7b80dde04d3f3151b79';

// Starknet.js currently doesn't have the functionality to calculate the class hash
const erc20ClassHash = '0x03f794a28472089a1a99b7969fc51cd5fbe22dd09e3f38d2bd6fa109cb3f4ecf';

const account = new Account(
    provider,
    accountAddress,
    starkKeyPair
  );
```

## Declare contract

```javascript
const erc20DeclareResponse = await account.declare({
  classHash: erc20ClassHash,
  contract: compiledErc20,
});

await provider.waitForTransaction(erc20DeclareResponse.transaction_hash);
```

## Deploy contract

```javascript
const salt = '900080545022'; // use some random salt

const erc20Response = await account.deploy({
  classHash: erc20ClassHash,
  constructorCalldata: stark.compileCalldata({
    name: shortString.encodeShortString('TestToken'),
    symbol: shortString.encodeShortString('ERC20'),
    decimals: 18,
    initial_supply: ['1000'],
    recipient: account.address,
  }),
  salt,
});

await provider.waitForTransaction(erc20Response.transaction_hash);

const txReceipt = await provider.getTransactionReceipt(erc20Response.transaction_hash);
```

## Interact with contracts

We have 2 options to interact with contracts.

### Option 1 - call the contract object

```javascript
const erc20 = new Contract(compiledErc20.abi, erc20Address, provider);

erc20.connect(account);

const { transaction_hash: mintTxHash } = await erc20.transfer(
  recieverAddress,
  ['0', '10'], // send 10 tokens as Uint256
);

await provider.waitForTransaction(mintTxHash);
```

### Option 2 - call contract from Account

```javascript
const executeHash = await account.execute(
  {
    contractAddress: erc20Address,
    entrypoint: 'transfer',
    calldata: stark.compileCalldata({
      recipient: recieverAddress,
      amount: ['10']
    })
  }
);

await provider.waitForTransaction(executeHash.transaction_hash);
```

## Check the balance

```javascript
const balanceBeforeTransfer = await erc20.balanceOf(account.address);

console.log(
  `account Address ${account.address} has a balance of:`,
  number.toBN(balanceBeforeTransfer[0].high).toString()
);
```

## Convenience Methods

### deployContract convenience method

High level wrapper for deploy. Doesn't require `waitForTransaction`. Response similar to deprecated `provider.deployContract`.

Convenient also to get the address of the deployed contract in the same response - easier than using the `deploy` already mentioned in the guide.

```typescript
  const deployResponse = await account.deployContract({
    classHash: erc20ClassHash,
    constructorCalldata: [
      encodeShortString('Token'),
      encodeShortString('ERC20'),
      account.address,
    ],
  });
```

### declareDeploy convenience method

High level wrapper for declare & deploy. Doesn't require `waitForTransaction`. Functionality similar to deprecated `provider.deployContract`.

Declare and Deploy contract using single function:

```typescript
  const declareDeploy = await account.declareDeploy({
    contract: compiledErc20,
    classHash: '0x54328a1075b8820eb43caf0caa233923148c983742402dcfc38541dd843d01a',
    constructorCalldata: [
      encodeShortString('Token'),
      encodeShortString('ERC20'),
      account.address,
    ],
  });
  const declareTransactionHash = declareDeploy.declare.transaction_hash
  const erc20Address = declareDeploy.deploy.contract_address;
```
