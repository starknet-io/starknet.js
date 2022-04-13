import { Account, Contract, LedgerBlindSigner, Provider } from '../src';
import { compiledArgentAccount, compiledErc20 } from './fixtures';

describe('deploy and test Wallet', () => {
  const signer = new LedgerBlindSigner();

  /* const provider = new Provider({
      baseUrl: 'http://localhost:5001',
      feederGatewayUrl: 'feeder_gateway',
      gatewayUrl: 'gateway',
  }); */

  const provider = new Provider();

  let account: Account;
  let erc20: Contract;
  let erc20Address: string;

  beforeAll(async () => {
    const starkKeyPub = await signer.getPubKey();
    console.log(`starkKeyPub =${starkKeyPub}`);

    const accountResponse = await provider.deployContract({
      contract: compiledArgentAccount,
      addressSalt: starkKeyPub,
    });

    const contract = new Contract(compiledArgentAccount.abi, accountResponse.address);
    expect(accountResponse.code).toBe('TRANSACTION_RECEIVED');

    const initializeResponse = await contract.initialize(starkKeyPub, '0');
    expect(initializeResponse.code).toBe('TRANSACTION_RECEIVED');

    console.log(`Account address =${accountResponse.address}`);
    account = new Account(provider, accountResponse.address, signer);

    const erc20Response = await provider.deployContract({
      contract: compiledErc20,
    });
    erc20Address = erc20Response.address;
    erc20 = new Contract(compiledErc20.abi, erc20Address);
    expect(erc20Response.code).toBe('TRANSACTION_RECEIVED');

    const mintResponse = await erc20.mint(account.address, '1000');
    expect(mintResponse.code).toBe('TRANSACTION_RECEIVED');

    await provider.waitForTransaction(accountResponse.transaction_hash);
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
});
