import fs from 'fs';

import typedDataExample from '../__mocks__/typedDataExample.json';
import {
  CompiledContract,
  Contract,
  Signer,
  compileCalldata,
  defaultProvider,
  ec,
  json,
  number,
  stark,
} from '../src';
import { toBN } from '../src/utils/number';

const compiledArgentAccount: CompiledContract = json.parse(
  fs.readFileSync('./__mocks__/ArgentAccount.json').toString('ascii')
);
const compiledErc20: CompiledContract = json.parse(
  fs.readFileSync('./__mocks__/ERC20.json').toString('ascii')
);

describe('deploy and test Wallet', () => {
  const privateKey = stark.randomAddress();

  const starkKeyPair = ec.getKeyPair(privateKey);
  const starkKeyPub = ec.getStarkKey(starkKeyPair);
  let walletAddress: string;
  let erc20: Contract;
  let erc20Address: string;
  let signer: Signer;

  beforeAll(async () => {
    const { code: codeErc20, address: erc20AddressLocal } = await defaultProvider.deployContract({
      contract: compiledErc20,
    });
    erc20Address = erc20AddressLocal;
    erc20 = new Contract(compiledErc20.abi, erc20Address);

    expect(codeErc20).toBe('TRANSACTION_RECEIVED');

    const { code, address: walletAddressLocal } = await defaultProvider.deployContract({
      contract: compiledArgentAccount,
      constructorCalldata: compileCalldata({
        signer: starkKeyPub,
        guardian: '0',
        L1_address: '0',
      }),
      addressSalt: starkKeyPub,
    });
    walletAddress = walletAddressLocal;
    expect(code).toBe('TRANSACTION_RECEIVED');

    const { code: codeErc20Mint, transaction_hash: txErc20Mint } = await erc20.invoke('mint', {
      recipient: walletAddress,
      amount: '1000',
    });

    expect(codeErc20Mint).toBe('TRANSACTION_RECEIVED');

    signer = new Signer(defaultProvider, walletAddressLocal, starkKeyPair);

    await defaultProvider.waitForTx(txErc20Mint);
  });
  test('same wallet address', () => {
    expect(walletAddress).toBe(signer.address);
  });
  test('read nonce', async () => {
    const { result } = await signer.callContract({
      contractAddress: signer.address,
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
    const { code, transaction_hash } = await signer.invokeFunction({
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
    const { result } = await signer.callContract({
      contractAddress: signer.address,
      entrypoint: 'get_nonce',
    });
    const nonce = toBN(result[0]).toNumber();
    const { code, transaction_hash } = await signer.invokeFunction({
      contractAddress: erc20Address,
      entrypoint: 'transfer',
      calldata: [toBN(erc20Address).toString(), '10'],
      nonce,
    });

    expect(code).toBe('TRANSACTION_RECEIVED');
    await defaultProvider.waitForTx(transaction_hash);
  });
  test('sign and verify offchain message', async () => {
    const signature = await signer.signMessage(typedDataExample);

    expect(await signer.verifyMessage(typedDataExample, signature)).toBe(true);
  });
});
