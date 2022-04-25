// import { compiledArgentAccount } from './fixtures';
import { BigNumber } from '@ethersproject/bignumber';

import { LedgerBlindSigner, Provider } from '../src';

describe('deploy and test Wallet', () => {
  const signer = new LedgerBlindSigner();

  /* const provider = new Provider({
      baseUrl: 'http://localhost:5001',
      feederGatewayUrl: 'feeder_gateway',
      gatewayUrl: 'gateway',
  }); */

  const provider = new Provider();

  // let contract: Contract;

  beforeAll(async () => {
    const starkKeyPub = await signer.getPubKey();
    console.log(`starkKeyPub =${starkKeyPub}`);

    /* const accountResponse = await provider.deployContract({
      contract: compiledArgentAccount,
      addressSalt: starkKeyPub,
    }); */

    /* contract = new Contract(
      compiledArgentAccount.abi,
      '0x10443848b23338b5ba24bc32a0d43ba2aaeeda264fff4d8bf96145bd58240d7'
    ); */
    // expect(accountResponse.code).toBe('TRANSACTION_RECEIVED');

    // const initializeResponse = await contract.initialize(starkKeyPub, '0');
    // expect(initializeResponse.code).toBe('TRANSACTION_RECEIVED');

    // console.log(`Account address =${accountResponse.address}`);

    // await provider.waitForTransaction(accountResponse.transaction_hash);
  });

  test('verify signature', async () => {
    const msg = '0x7ed9734aed3ddbd197fda57856d86d3d6ed398297e41afe9fc62525aa8394ee';
    const signature = await signer.sign(msg);

    console.log(signature);

    const isValid = await provider.callContract({
      contractAddress: '0x10443848b23338b5ba24bc32a0d43ba2aaeeda264fff4d8bf96145bd58240d7',
      entrypoint: 'is_valid_signature',
      calldata: [
        BigNumber.from(msg).toString(),
        '2',
        BigNumber.from(signature[0]).toString(),
        BigNumber.from(signature[1]).toString(),
      ],
    });

    console.log(isValid);

    // await contract.is_valid_signature(msg, signature, signature.length);
  });
});
