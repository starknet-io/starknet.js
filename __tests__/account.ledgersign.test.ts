import { Contract, LedgerSigner, defaultProvider } from '../src';
import { toBN } from '../src/utils/number';
import { compiledArgentAccount } from './fixtures';

describe('deploy and test Wallet', () => {
  const signer = new LedgerSigner();

  // const provider = new Provider();

  let contract: Contract;

  beforeAll(async () => {
    const starkKeyPub = await signer.getPubKey();

    const accountResponse = await defaultProvider.deployContract({
      contract: compiledArgentAccount,
      addressSalt: starkKeyPub,
    });

    contract = new Contract(compiledArgentAccount.abi, accountResponse.address);
    expect(accountResponse.code).toBe('TRANSACTION_RECEIVED');

    const initializeResponse = await contract.initialize(starkKeyPub, '0');
    expect(initializeResponse.code).toBe('TRANSACTION_RECEIVED');

    await defaultProvider.waitForTransaction(accountResponse.transaction_hash);
  });

  test('verify signature', async () => {
    const msg = '0x2bd1d3f8f45a011cbd0674ded291d58985761bbcbc04f4d01c8285d1b35c411';
    const signature = await signer.sign(msg);

    const isValid = await defaultProvider.callContract({
      contractAddress: contract.address,
      entrypoint: 'is_valid_signature',
      calldata: [
        toBN(msg).toString(),
        '2',
        toBN(signature[0]).toString(),
        toBN(signature[1]).toString(),
      ],
    });
    expect(isValid).toEqual({ result: [] });
  });
});
