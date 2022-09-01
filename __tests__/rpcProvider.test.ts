import { Account, RpcProvider, ec } from '../src';
import {
  compiledOpenZeppelinAccount,
  describeIfRpc,
  getTestAccount,
  getTestProvider,
} from './fixtures';

describeIfRpc('RPCProvider', () => {
  let rpcProvider: RpcProvider;
  let accountPublicKey: string;

  beforeAll(async () => {
    rpcProvider = getTestProvider() as RpcProvider;
    const account = getTestAccount(rpcProvider);

    expect(account).toBeInstanceOf(Account);

    const accountKeyPair = ec.genKeyPair();
    accountPublicKey = ec.getStarkKey(accountKeyPair);
  });

  describe('RPC methods', () => {
    test('getChainId', async () => {
      const chainId = await rpcProvider.getChainId();
      expect(chainId).toBe('0x534e5f474f45524c49');
    });

    test('deployContract', async () => {
      const { contract_address, transaction_hash } = await rpcProvider.deployContract({
        contract: compiledOpenZeppelinAccount,
        constructorCalldata: [accountPublicKey],
        addressSalt: accountPublicKey,
      });
      await rpcProvider.waitForTransaction(transaction_hash);
      expect(contract_address).toBeTruthy();
      expect(transaction_hash).toBeTruthy();
    });

    test.todo('getEstimateFee');

    test.todo('invokeFunction');
  });
});
