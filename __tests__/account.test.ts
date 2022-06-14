import { isBN } from 'bn.js';

import typedDataExample from '../__mocks__/typedDataExample.json';
import { Account, Contract, Provider, ec, number, stark } from '../src';
import { toBN } from '../src/utils/number';
import {
  compiledErc20,
  compiledOpenZeppelinAccount,
  compiledTestDapp,
  getTestAccount,
  getTestProvider,
} from './fixtures';

describe('deploy and test Wallet', () => {
  const account: Account = getTestAccount();
  const provider = getTestProvider();
  let erc20: Contract;
  let erc20Address: string;
  let dapp: Contract;

  beforeAll(async () => {
    expect(account).toBeInstanceOf(Account);

    const erc20Response = await provider.deployContract({
      contract: compiledErc20,
    });
    erc20Address = erc20Response.address;
    erc20 = new Contract(compiledErc20.abi, erc20Address);
    expect(erc20Response.code).toBe('TRANSACTION_RECEIVED');

    await provider.waitForTransaction(erc20Response.transaction_hash);

    const mintResponse = await account.execute({
      contractAddress: erc20Address,
      entrypoint: 'mint',
      calldata: [account.address, '1000'],
    });

    expect(mintResponse.code).toBe('TRANSACTION_RECEIVED');

    await provider.waitForTransaction(mintResponse.transaction_hash);

    const dappResponse = await provider.deployContract({
      contract: compiledTestDapp,
    });
    dapp = new Contract(compiledTestDapp.abi, dappResponse.address);
    expect(dappResponse.code).toBe('TRANSACTION_RECEIVED');

    await provider.waitForTransaction(dappResponse.transaction_hash);
  });

  test('estimate fee', async () => {
    const { amount, unit } = await account.estimateFee({
      contractAddress: erc20Address,
      entrypoint: 'transfer',
      calldata: [erc20.address, '10'],
    });
    expect(isBN(amount)).toBe(true);
    expect(typeof unit).toBe('string');
  });

  test('read balance of wallet', async () => {
    const { res } = await erc20.balance_of(account.address);

    expect(number.toBN(res as string).toString()).toStrictEqual(number.toBN(1000).toString());
  });

  test('execute by wallet owner', async () => {
    const { code, transaction_hash } = await account.execute({
      contractAddress: erc20Address,
      entrypoint: 'transfer',
      calldata: [erc20.address, '10'],
    });

    expect(code).toBe('TRANSACTION_RECEIVED');
    await provider.waitForTransaction(transaction_hash);
  });

  test('read balance of wallet after transfer', async () => {
    const { res } = await erc20.balance_of(account.address);

    expect(res).toStrictEqual(toBN(990));
  });

  test('execute with custom nonce', async () => {
    const { result } = await account.callContract({
      contractAddress: account.address,
      entrypoint: 'get_nonce',
    });
    const nonce = toBN(result[0]).toNumber();
    const { code, transaction_hash } = await account.execute(
      {
        contractAddress: erc20Address,
        entrypoint: 'transfer',
        calldata: [account.address, '10'],
      },
      undefined,
      { nonce }
    );

    expect(code).toBe('TRANSACTION_RECEIVED');
    await provider.waitForTransaction(transaction_hash);
  });

  test('execute multiple transactions', async () => {
    const { code, transaction_hash } = await account.execute([
      {
        contractAddress: dapp.address,
        entrypoint: 'set_number',
        calldata: ['47'],
      },
      {
        contractAddress: dapp.address,
        entrypoint: 'increase_number',
        calldata: ['10'],
      },
    ]);

    expect(code).toBe('TRANSACTION_RECEIVED');
    await provider.waitForTransaction(transaction_hash);

    const response = await dapp.get_number(account.address);
    expect(toBN(response.number as string).toString()).toStrictEqual('57');
  });

  test('sign and verify offchain message', async () => {
    const signature = await account.signMessage(typedDataExample);

    expect(await account.verifyMessage(typedDataExample, signature)).toBe(true);
  });

  describe('new deployed account', () => {
    let newAccount: Account;

    beforeAll(async () => {
      const starkKeyPair = ec.genKeyPair();
      const starkKeyPub = ec.getStarkKey(starkKeyPair);

      const accountResponse = await provider.deployContract({
        contract: compiledOpenZeppelinAccount,
        constructorCalldata: [starkKeyPub],
      });

      await provider.waitForTransaction(accountResponse.transaction_hash);

      newAccount = new Account(provider, accountResponse.address, starkKeyPair);
    });

    test('read nonce', async () => {
      const { result } = await account.callContract({
        contractAddress: newAccount.address,
        entrypoint: 'get_nonce',
      });
      const nonce = result[0];

      expect(number.toBN(nonce).toString()).toStrictEqual(number.toBN(0).toString());
    });
  });

  describe('Contract interaction with Account', () => {
    const wallet = stark.randomAddress();

    beforeAll(async () => {
      const mintResponse = await account.execute({
        contractAddress: erc20Address,
        entrypoint: 'mint',
        calldata: [wallet, '1000'],
      });

      expect(mintResponse.code).toBe('TRANSACTION_RECEIVED');

      await provider.waitForTransaction(mintResponse.transaction_hash);
    });

    test('change from provider to account', async () => {
      expect(erc20.providerOrAccount instanceof Provider);
      erc20.connect(account);
      expect(erc20.providerOrAccount instanceof Account);
    });

    test('estimate gas fee for `mint`', async () => {
      const res = await erc20.estimateFee.mint(wallet, '10');
      expect(res).toHaveProperty('amount');
      expect(res).toHaveProperty('unit');
    });
  });
});
