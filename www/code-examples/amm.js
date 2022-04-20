import { defaultProvider, stark } from 'starknet';
const { getSelectorFromName } = stark;

/**
 * !! IMPORTANT NOTE !! When fees are introduced all function invocations will go through the account account contract and this example will be deprecated.
 **/

const CONTRACT_ADDRESS = '0x03e19baa6cb2078631bcdb34844f3f7879449a544c9ce722681a54af08cff4b9';

/**
 * invokeFunction() example
 **/

/** Reset the liquidity pool **/
const addLiquidityResponse = await defaultProvider.LEGACYinvokeFunction({
  contractAddress: CONTRACT_ADDRESS,
  entrypoint: 'init_pool',
  calldata: ['1000000', '1000000'],
});
console.log(addLiquidityResponse);

/**
 * callContract() example
 **/

/** Get the balance of the liquidity pool of token A **/
const poolBalanceTokenA = await defaultProvider.callContract({
  contractAddress: CONTRACT_ADDRESS,
  entrypoint: 'get_pool_token_balance',
  calldata: ['1'], // Account 1 (no account implemented)
});
const balanceA = poolBalanceTokenA.result[0];
console.log('token a liquidity pool balance: ', parseInt(balanceA, 16));

/** Get the balance of the liquidity pool of token B **/
const poolBalanceTokenB = await defaultProvider.callContract({
  contractAddress: CONTRACT_ADDRESS,
  entrypoint: 'get_pool_token_balance',
  calldata: ['2'],
});
const balanceB = poolBalanceTokenB.result[0];
console.log('token b liquidity pool balance: ', parseInt(balanceB, 16));

/** Make a swap */
