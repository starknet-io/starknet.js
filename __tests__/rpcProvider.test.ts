import { isBN } from 'bn.js';

import { Account, RpcProvider, ec } from '../src';
import {
  compiledErc20,
  compiledOpenZeppelinAccount,
  describeIfRpc,
  getTestAccount,
  getTestProvider,
} from './fixtures';

describeIfRpc('RPCProvider', () => {
  const provider = getTestProvider() as RpcProvider;
  const account = getTestAccount(provider);
  let erc20Address: string;
  let accountPublicKey: string;

  beforeAll(async () => {
    expect(account).toBeInstanceOf(Account);

    const erc20Response = await provider.deployContract({
      contract: compiledErc20,
    });

    erc20Address = erc20Response.contract_address;

    await provider.waitForTransaction(erc20Response.transaction_hash);

    const accountKeyPair = ec.genKeyPair();
    accountPublicKey = ec.getStarkKey(accountKeyPair);
  });

  describe('RPC methods', () => {
    test('getChainId', async () => {
      const chainId = await provider.getChainId();
      expect(chainId).toBe('0x534e5f474f45524c49');
    });

    test('deployContract', async () => {
      const { contract_address, transaction_hash } = await provider.deployContract({
        contract: compiledOpenZeppelinAccount,
        constructorCalldata: [accountPublicKey],
        addressSalt: accountPublicKey,
      });
      await provider.waitForTransaction(transaction_hash);
      expect(contract_address).toBeTruthy();
      expect(transaction_hash).toBeTruthy();
    });

    test('getEstimateFee', async () => {
      const { overall_fee } = await account.estimateFee({
        contractAddress: erc20Address,
        entrypoint: 'mint',
        calldata: [account.address, '1000'],
      });
      expect(isBN(overall_fee)).toBe(true);
    });

    test.todo('invokeFunction');
  });
});
