import { Contract, defaultProvider, ec, hash, number, stark } from '../src';
import { StarknetChainId } from '../src/constants';
import {
  calculcateTransactionHash,
  getSelectorFromName,
  transactionVersion,
} from '../src/utils/hash';
import { fromCallsToExecuteCalldataWithNonce } from '../src/utils/transaction';
import { compiledArgentAccount, compiledErc20 } from './fixtures';

describe('getStarkAccountFromPrivateKey()', () => {
  test('it works with valid privateKey', () => {
    const privateKey = '0xb696427c0d79c5d28a1fa6f748bae1b98b3f4b86bd1a2505bab144673c856fa9';

    const starkKeyPair = ec.getKeyPair(privateKey);
    const starkKey = ec.getStarkKey(starkKeyPair);

    expect(starkKey).toBe('0x060d46f8d7ef3d83ed05f3ed9beb91e22f9529289b9d863683fd71eafaf28035');
  });
  test('it works with valid privateKey', () => {
    const privateKey = '0x5f65099e269b080000000000000000000000000000000000000000000000000';

    const starkKeyPair = ec.getKeyPair(privateKey);
    const starkKey = ec.getStarkKey(starkKeyPair);

    expect(starkKey).toBe('0xf321e59b257a577836d8313150aabd21f412491358c329966218df76bab591');
  });
});

test('build tx', async () => {
  const privateKey = '0x1B69B4BE052FAB1';
  const keyPair = ec.getKeyPair(privateKey);
  const address = ec.getStarkKey(keyPair);

  expect(address).toBe('0x04024999b9574cb7623679ce049a609db62a95098982c5b28ac61abdebd1c82b');

  const selector = hash.getSelectorFromName('transfer');

  expect(selector).toMatchInlineSnapshot();

  const calls = [{ contractAddress: '1', entrypoint: 'transfer', calldata: ['6', '7'] }];
  const calldata = fromCallsToExecuteCalldataWithNonce(calls, 0);

  const msgHash = calculcateTransactionHash(
    address,
    transactionVersion,
    getSelectorFromName('__execute__'),
    calldata,
    0,
    StarknetChainId.TESTNET
  );
  expect(number.toBN(msgHash).toString()).toMatchInlineSnapshot(
    `"235855380881994314533025886817815774848495061484535023348790852315407085619"`
  );

  const [r, s] = ec.sign(keyPair, msgHash);
  expect(r.toString()).toMatchInlineSnapshot(
    `"181489288548431284937202760565682158657883789985879744111612429574110648095"`
  );
  expect(s.toString()).toMatchInlineSnapshot(
    `"2055384802167699202203509702082340762385659879831017273872106910763470114538"`
  );
});

describe('deploy and test Wallet', () => {
  const privateKey = stark.randomAddress();

  const starkKeyPair = ec.getKeyPair(privateKey);
  const starkKeyPub = ec.getStarkKey(starkKeyPair);
  let accountContract: Contract;
  let erc20: Contract;
  let erc20Address: string;

  beforeAll(async () => {
    const accountResponse = await defaultProvider.deployContract({
      contract: compiledArgentAccount,
      addressSalt: starkKeyPub,
    });
    accountContract = new Contract(compiledArgentAccount.abi, accountResponse.address);
    expect(accountResponse.code).toBe('TRANSACTION_RECEIVED');

    const initializeResponse = await accountContract.initialize(starkKeyPub, '0');
    expect(initializeResponse.code).toBe('TRANSACTION_RECEIVED');

    const erc20Response = await defaultProvider.deployContract({
      contract: compiledErc20,
    });
    erc20Address = erc20Response.address;
    erc20 = new Contract(compiledErc20.abi, erc20Address);
    expect(erc20Response.code).toBe('TRANSACTION_RECEIVED');

    const mintResponse = await erc20.mint(accountContract.address, '1000');
    expect(mintResponse.code).toBe('TRANSACTION_RECEIVED');
    await defaultProvider.waitForTransaction(mintResponse.transaction_hash);
  });

  test('read nonce', async () => {
    const { nonce } = await accountContract.get_nonce();

    expect(number.toBN(nonce as string).toString()).toStrictEqual(number.toBN(0).toString());
  });

  test('read balance of wallet', async () => {
    const { res } = await erc20.balance_of(accountContract.address);

    expect(res).toStrictEqual(number.toBN(1000));
  });
});
