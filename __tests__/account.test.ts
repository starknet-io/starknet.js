import typedDataExample from '../__mocks__/typedDataExample.json';
import { Account, Contract, defaultProvider, ec, number, stark } from '../src';
import { toBN } from '../src/utils/number';
import { compiledArgentAccount, compiledErc20 } from './fixtures';

describe('deploy and test Wallet', () => {
  const privateKey = stark.randomAddress();

  const starkKeyPair = ec.getKeyPair(privateKey);
  const starkKeyPub = ec.getStarkKey(starkKeyPair);
  let walletAddress: string;
  let erc20: Contract;
  let erc20Address: string;
  let account: Account;

  beforeAll(async () => {
    const accountResponse = await defaultProvider.deployContract({
      contract: compiledArgentAccount,
      addressSalt: starkKeyPub,
    });
    walletAddress = accountResponse.address;
    const wallet = new Contract(compiledArgentAccount.abi, walletAddress);
    expect(accountResponse.code).toBe('TRANSACTION_RECEIVED');

    const initializeResponse = await wallet.invoke('initialize', {
      signer: starkKeyPub,
      guardian: '0',
    });
    expect(initializeResponse.code).toBe('TRANSACTION_RECEIVED');

    account = new Account(defaultProvider, walletAddress, starkKeyPair);

    const erc20Response = await defaultProvider.deployContract({
      contract: compiledErc20,
    });
    erc20Address = erc20Response.address;
    erc20 = new Contract(compiledErc20.abi, erc20Address);
    expect(erc20Response.code).toBe('TRANSACTION_RECEIVED');

    const mintResponse = await erc20.invoke('mint', {
      recipient: walletAddress,
      amount: '1000',
    });
    expect(mintResponse.code).toBe('TRANSACTION_RECEIVED');
    await defaultProvider.waitForTx(mintResponse.transaction_hash);
  });

  test('same wallet address', () => {
    expect(walletAddress).toBe(account.address);
  });

  test('read nonce', async () => {
    const { result } = await account.callContract({
      contractAddress: account.address,
      entrypoint: 'get_nonce',
    });
    const nonce = result[0];

    expect(number.toBN(nonce).toString()).toStrictEqual(number.toBN(0).toString());
  });

  test('read balance of wallet', async () => {
    const { res } = await erc20.call('balance_of', {
      user: walletAddress,
    });

    expect(number.toBN(res as string).toString()).toStrictEqual(number.toBN(1000).toString());
  });

  test('execute by wallet owner', async () => {
    const { code, transaction_hash } = await account.execute({
      contractAddress: erc20Address,
      entrypoint: 'transfer',
      calldata: [toBN(erc20Address).toString(), '10'],
    });

    expect(code).toBe('TRANSACTION_RECEIVED');
    await defaultProvider.waitForTx(transaction_hash);
  });

  test('read balance of wallet after transfer', async () => {
    const { res } = await erc20.call('balance_of', {
      user: walletAddress,
    });

    expect(number.toBN(res as string).toString()).toStrictEqual(number.toBN(990).toString());
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
        calldata: [toBN(erc20Address).toString(), '10'],
      },
      undefined,
      { nonce }
    );

    expect(code).toBe('TRANSACTION_RECEIVED');
    await defaultProvider.waitForTx(transaction_hash);
  });

  test('sign and verify offchain message', async () => {
    const signature = await account.signMessage(typedDataExample);

    expect(await account.verifyMessage(typedDataExample, signature)).toBe(true);
  });
});
