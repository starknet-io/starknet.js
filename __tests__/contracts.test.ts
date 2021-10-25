import fs from 'fs';
import { CompiledContract, Contract, deployContract, JsonParser, randomAddress } from '../src';

const compiledERC20: CompiledContract = JsonParser.parse(
  fs.readFileSync('./__mocks__/ERC20.json').toString('ascii')
);

describe('new Contract()', () => {
  const address = randomAddress();
  //   const address = "";
  const wallet = randomAddress();
  const contract = new Contract(compiledERC20.abi, address);
  beforeAll(async () => {
    const { code, tx_id } = await deployContract(compiledERC20, address);
    // I want to show the tx number to the tester, so he/she can trace the transaction in the explorer.
    // eslint-disable-next-line no-console
    console.log('deployed erc20 contract', tx_id);
    expect(code).toBe('TRANSACTION_RECEIVED');
  });
  test('initialize ERC20 mock contract', async () => {
    const response = await contract.invoke('mint', {
      recipient: wallet,
      amount: '10',
    });
    expect(response.code).toBe('TRANSACTION_RECEIVED');

    // I want to show the tx number to the tester, so he/she can trace the transaction in the explorer.
    // eslint-disable-next-line no-console
    console.log('txId:', response.tx_id, ', funded wallet:', wallet);
  });
});
