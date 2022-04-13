import { Contract, LedgerBlindSigner, Provider } from '../src';
import { compiledArgentAccount } from './fixtures';

describe('deploy and test Wallet', () => {
  const signer = new LedgerBlindSigner();

  /* const provider = new Provider({
      baseUrl: 'http://localhost:5001',
      feederGatewayUrl: 'feeder_gateway',
      gatewayUrl: 'gateway',
  }); */

  const provider = new Provider();

  let contract: Contract;

  beforeAll(async () => {
    const starkKeyPub = await signer.getPubKey();
    console.log(`starkKeyPub =${starkKeyPub}`);

    const accountResponse = await provider.deployContract({
      contract: compiledArgentAccount,
      addressSalt: starkKeyPub,
    });

    contract = new Contract(compiledArgentAccount.abi, accountResponse.address);
    expect(accountResponse.code).toBe('TRANSACTION_RECEIVED');

    const initializeResponse = await contract.initialize(starkKeyPub, '0');
    expect(initializeResponse.code).toBe('TRANSACTION_RECEIVED');

    console.log(`Account address =${accountResponse.address}`);

    await provider.waitForTransaction(accountResponse.transaction_hash);
  });

  test('verify signature', async () => {
    const msg = '0x7ed9734aed3ddbd197fda57856d86d3d6ed398297e41afe9fc62525aa8394ee';
    const signature = await signer.sign(msg);

    await contract.is_valid_signature(msg, signature, signature.length);
  });
});
