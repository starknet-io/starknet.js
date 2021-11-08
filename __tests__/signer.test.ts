import fs from 'fs';

import {
  CompiledContract,
  Contract,
  deployContract,
  getKeyPair,
  getStarkKey,
  utils,
  waitForTx,
} from '../src';
import { Provider } from '../src/provider';
import { Signer } from '../src/signer/default';
import { toBN } from '../src/utils/number';

const {
  json: { parse },
  starknet: { getSelectorFromName, randomAddress },
} = utils;

const compiledArgentAccount: CompiledContract = parse(
  fs.readFileSync('./__mocks__/ArgentAccount.json').toString('ascii')
);
const compiledErc20: CompiledContract = parse(
  fs.readFileSync('./__mocks__/ERC20.json').toString('ascii')
);

describe('deploy and test Wallet', () => {
  const pk = randomAddress();

  const starkKeyPair = getKeyPair(pk);
  const starkKeyPub = getStarkKey(starkKeyPair);
  let walletAddress: string;
  let erc20: Contract;
  let erc20Address: string;
  let signer: Signer;

  beforeAll(async () => {
    const { code: codeErc20, address: erc20AddressLocal } = await deployContract(compiledErc20, []);
    erc20Address = erc20AddressLocal;
    erc20 = new Contract(compiledErc20.abi, erc20Address);

    expect(codeErc20).toBe('TRANSACTION_RECEIVED');

    const { code, address: walletAddressLocal } = await deployContract(
      compiledArgentAccount,
      Contract.compileCalldata({
        signer: starkKeyPub,
        guardian: '0',
        L1_address: '0',
      }),
      starkKeyPub
    );
    walletAddress = walletAddressLocal;
    expect(code).toBe('TRANSACTION_RECEIVED');

    const { code: codeErc20Mint, transaction_hash: txErc20Mint } = await erc20.invoke('mint', {
      recipient: walletAddress,
      amount: '1000',
    });

    expect(codeErc20Mint).toBe('TRANSACTION_RECEIVED');

    signer = new Signer(new Provider(), walletAddressLocal, starkKeyPair);

    await waitForTx(txErc20Mint);
  });
  test('same wallet address', () => {
    expect(walletAddress).toBe(signer.address);
  });
  test('read nonce', async () => {
    const { result } = await signer.callContract({
      contract_address: signer.address,
      entry_point_selector: getSelectorFromName('get_current_nonce'),
    });
    const nonce = result[0];

    expect(toBN(nonce).toString()).toStrictEqual(toBN(0).toString());
  });
  test('read balance of wallet', async () => {
    const { res } = await erc20.call('balance_of', {
      user: walletAddress,
    });

    expect(toBN(res as string).toString()).toStrictEqual(toBN(1000).toString());
  });
  test('execute by wallet owner', async () => {
    const { code, transaction_hash } = await signer.addTransaction({
      type: 'INVOKE_FUNCTION',
      contract_address: erc20Address,
      entry_point_selector: getSelectorFromName('transfer'),
      calldata: [erc20Address, '10'],
    });

    expect(code).toBe('TRANSACTION_RECEIVED');
    await waitForTx(transaction_hash);
  });
  test('read balance of wallet after transfer', async () => {
    const { res } = await erc20.call('balance_of', {
      user: walletAddress,
    });

    expect(toBN(res as string).toString()).toStrictEqual(toBN(990).toString());
  });
});
