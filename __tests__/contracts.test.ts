import fs from 'fs';

import { CompiledContract, Contract, deployContract, utils, waitForTx } from '../src';

const {
  json: { parse },
  number: { toBN },
  starknet: { randomAddress },
} = utils;

const compiledERC20: CompiledContract = parse(
  fs.readFileSync('./__mocks__/ERC20.json').toString('ascii')
);

describe('class Contract {}', () => {
  const wallet = randomAddress();
  let contract: Contract;
  beforeAll(async () => {
    const {
      code,
      transaction_hash,
      address: erc20address,
    } = await deployContract(compiledERC20, []);
    console.log(erc20address);
    contract = new Contract(compiledERC20.abi, erc20address);
    // I want to show the tx number to the tester, so he/she can trace the transaction in the explorer.
    // eslint-disable-next-line no-console
    console.log('deployed erc20 contract', transaction_hash);
    expect(code).toBe('TRANSACTION_RECEIVED');

    await waitForTx(transaction_hash);
  });
  test('read initial balance of that account', async () => {
    const response = await contract.call('balance_of', {
      user: wallet,
    });
    expect(toBN(response.res as string).toString()).toStrictEqual(toBN(0).toString());
  });
  test('add 10 test ERC20 to account', async () => {
    const response = await contract.invoke('mint', {
      recipient: wallet,
      amount: '10',
    });
    expect(response.code).toBe('TRANSACTION_RECEIVED');

    // I want to show the tx number to the tester, so he/she can trace the transaction in the explorer.
    // eslint-disable-next-line no-console
    console.log('txId:', response.transaction_hash, ', funded wallet:', wallet);
    await waitForTx(response.transaction_hash);
  });
  test('read balance after mint of that account', async () => {
    const response = await contract.call('balance_of', {
      user: wallet,
    });

    expect(toBN(response.res as string).toString()).toStrictEqual(toBN(10).toString());
  });
});
