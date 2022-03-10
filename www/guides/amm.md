---
sidebar_position: 3
---

# A Simple Automated Market Maker (AMM) Example

AMM is the killer use case for DeFi. For the first time, people can buy and sell assets without an order book, but by using liquidity pools. This guide is based on the simple AMM tutorial by StarkNet <ins>[here](https://www.cairo-lang.org/docs/hello_starknet/amm.html)</ins>.


#### AMM contract on StarkNet
The AMM contract address on StarkNet, this is the same contract used by the AMM Demo <ins>[here](https://www.starknetswap.com/)</ins>.

```javascript
const CONTRACT_ADDRESS = "0x03e19baa6cb2078631bcdb34844f3f7879449a544c9ce722681a54af08cff4b9";
```

#### Add Liquidity to the Liquidiy Pool
```javascript
const addTokenResponse = await defaultProvider.invokeFunction(
  {
    contractAddress: CONTRACT_ADDRESS,
    entrypoint: "init_pool",
    calldata: ["1000000", "1000000"],
  },
);
console.log(addTokenResponse);
```



#### Full Code
