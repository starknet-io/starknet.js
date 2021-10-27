import { BigNumber } from '@ethersproject/bignumber';
import fs from 'fs';
import {
  CompiledContract,
  Contract,
  deployContract,
  JsonParser,
  randomAddress,
  waitForTx,
} from '../src';

const compiledERC20: CompiledContract = JsonParser.parse(
  fs.readFileSync('./__mocks__/ERC20.json').toString('ascii')
);

describe('class Contract {}', () => {
  const address = randomAddress();
  const wallet = randomAddress();
  const contract = new Contract(compiledERC20.abi, address);
  beforeAll(async () => {
    const { code, tx_id } = await deployContract(compiledERC20, address);
    // I want to show the tx number to the tester, so he/she can trace the transaction in the explorer.
    // eslint-disable-next-line no-console
    console.log('deployed erc20 contract', tx_id);
    expect(code).toBe('TRANSACTION_RECEIVED');
    await waitForTx(tx_id);
  });
  test('read initial balance of that account', async () => {
    const response = await contract.call('balance_of', {
      user: wallet,
    });
    expect(BigNumber.from(response.res)).toStrictEqual(BigNumber.from(0));
  });
  test('add 10 test ERC20 to account', async () => {
    const response = await contract.invoke('mint', {
      recipient: wallet,
      amount: '10',
    });
    expect(response.code).toBe('TRANSACTION_RECEIVED');

    // I want to show the tx number to the tester, so he/she can trace the transaction in the explorer.
    // eslint-disable-next-line no-console
    console.log('txId:', response.tx_id, ', funded wallet:', wallet);
    await waitForTx(response.tx_id);
  });
  test('read balance after mint of that account', async () => {
    const response = await contract.call('balance_of', {
      user: wallet,
    });

    expect(BigNumber.from(response.res)).toStrictEqual(BigNumber.from(10));
  });
});
