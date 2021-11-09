import fs from 'fs';

import { CompiledContract, Contract, defaultProvider, json, number, stark } from '../src';

const compiledERC20: CompiledContract = json.parse(
  fs.readFileSync('./__mocks__/ERC20.json').toString('ascii')
);

describe('class Contract {}', () => {
  const wallet = stark.randomAddress();
  let contract: Contract;
  beforeAll(async () => {
    const {
      code,
      transaction_hash,
      address: erc20address,
    } = await defaultProvider.deployContract(compiledERC20, []);

    contract = new Contract(compiledERC20.abi, erc20address);

    expect(code).toBe('TRANSACTION_RECEIVED');

    await defaultProvider.waitForTx(transaction_hash);
  });
  test('read initial balance of that account', async () => {
    const response = await contract.call('balance_of', {
      user: wallet,
    });
    expect(number.toBN(response.res as string).toString()).toStrictEqual(number.toBN(0).toString());
  });
  test('add 10 test ERC20 to account', async () => {
    const response = await contract.invoke('mint', {
      recipient: wallet,
      amount: '10',
    });
    expect(response.code).toBe('TRANSACTION_RECEIVED');

    await defaultProvider.waitForTx(response.transaction_hash);
  });
  test('read balance after mint of that account', async () => {
    const response = await contract.call('balance_of', {
      user: wallet,
    });

    expect(number.toBN(response.res as string).toString()).toStrictEqual(
      number.toBN(10).toString()
    );
  });
});
