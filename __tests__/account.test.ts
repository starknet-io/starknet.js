import typedDataExample from '../__mocks__/typedDataExample.json';
import { Account, Contract, defaultProvider, ec, number, stark } from '../src';
import { toBN } from '../src/utils/number';
import { compiledArgentAccount, compiledErc20, compiledTestDapp } from './fixtures';

describe('deploy and test Wallet', () => {
  const privateKey = stark.randomAddress();

  const starkKeyPair = ec.getKeyPair(privateKey);
  const starkKeyPub = ec.getStarkKey(starkKeyPair);
  let account: Account;
  let erc20: Contract;
  let erc20Address: string;
  let dapp: Contract;

  beforeAll(async () => {
    const accountResponse = await defaultProvider.deployContract({
      contract: compiledArgentAccount,
      addressSalt: starkKeyPub,
    });
    const contract = new Contract(compiledArgentAccount.abi, accountResponse.address);
    expect(accountResponse.code).toBe('TRANSACTION_RECEIVED');

    const initializeResponse = await contract.initialize(starkKeyPub, '0');
    expect(initializeResponse.code).toBe('TRANSACTION_RECEIVED');

    account = new Account(defaultProvider, accountResponse.address, starkKeyPair);

    const erc20Response = await defaultProvider.deployContract({
      contract: compiledErc20,
    });
    erc20Address = erc20Response.address;
    erc20 = new Contract(compiledErc20.abi, erc20Address);
    expect(erc20Response.code).toBe('TRANSACTION_RECEIVED');

    const mintResponse = await erc20.mint(account.address, '1000');
    expect(mintResponse.code).toBe('TRANSACTION_RECEIVED');

    const dappResponse = await defaultProvider.deployContract({
      contract: compiledTestDapp,
    });
    dapp = new Contract(compiledTestDapp.abi, dappResponse.address);
    expect(dappResponse.code).toBe('TRANSACTION_RECEIVED');
    await defaultProvider.waitForTransaction(dappResponse.transaction_hash);
  });

  test('estimate fee', async () => {
    const { amount, unit } = await account.estimateFee({
      contractAddress: erc20Address,
      entrypoint: 'transfer',
      calldata: [erc20.address, '10'],
    });
    expect(typeof amount).toBe('number');
    expect(typeof unit).toBe('string');
  });

  test('same wallet address', () => {
    expect(account.address).toBe(account.address);
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
    const { res } = await erc20.balance_of(account.address);

    expect(number.toBN(res as string).toString()).toStrictEqual(number.toBN(1000).toString());
  });

  test('execute by wallet owner', async () => {
    const { code, transaction_hash } = await account.execute(
      {
        contractAddress: erc20Address,
        entrypoint: 'transfer',
        calldata: [erc20.address, '10'],
      },
      undefined,
      { maxFee: '0' }
    );

    expect(code).toBe('TRANSACTION_RECEIVED');
    await defaultProvider.waitForTransaction(transaction_hash);
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
      { nonce, maxFee: '0' }
    );

    expect(code).toBe('TRANSACTION_RECEIVED');
    await defaultProvider.waitForTransaction(transaction_hash);
  });

  test('execute multiple transactions', async () => {
    const { code, transaction_hash } = await account.execute(
      [
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
      ],
      undefined,
      { maxFee: '0' }
    );

    expect(code).toBe('TRANSACTION_RECEIVED');
    await defaultProvider.waitForTransaction(transaction_hash);

    const response = await dapp.get_number(account.address);
    expect(toBN(response.number as string).toString()).toStrictEqual('57');
  });

  test('sign and verify offchain message', async () => {
    const signature = await account.signMessage(typedDataExample);

    expect(await account.verifyMessage(typedDataExample, signature)).toBe(true);
  });
});
