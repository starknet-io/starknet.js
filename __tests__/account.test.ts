import { isBN } from 'bn.js';

import typedDataExample from '../__mocks__/typedDataExample.json';
import { Account, Contract, Provider, number, stark } from '../src';
import { feeTransactionVersion } from '../src/utils/hash';
import { toBN } from '../src/utils/number';
import { encodeShortString } from '../src/utils/shortString';
import { randomAddress } from '../src/utils/stark';
import {
  IS_DEVNET,
  compiledErc20,
  compiledTestDapp,
  erc20ClassHash,
  getERC20DeployPayload,
  getTestAccount,
  getTestProvider,
} from './fixtures';

describe('deploy and test Wallet', () => {
  const provider = getTestProvider();
  const account = getTestAccount(provider);
  let erc20: Contract;
  let erc20Address: string;
  let dapp: Contract;

  beforeAll(async () => {
    expect(account).toBeInstanceOf(Account);

    const erc20DeployPayload = getERC20DeployPayload(account.address);

    const erc20Response = await provider.deployContract(erc20DeployPayload);

    erc20Address = erc20Response.contract_address;
    erc20 = new Contract(compiledErc20.abi, erc20Address, provider);

    await provider.waitForTransaction(erc20Response.transaction_hash);

    const x = await erc20.balanceOf(account.address);

    expect(number.toBN(x[0].low).toString()).toStrictEqual(number.toBN(1000).toString());

    const dappResponse = await provider.deployContract({
      contract: compiledTestDapp,
    });
    dapp = new Contract(compiledTestDapp.abi, dappResponse.contract_address!, provider);

    await provider.waitForTransaction(dappResponse.transaction_hash);
  });

  test('estimate fee', async () => {
    const innerInvokeEstFeeSpy = jest.spyOn(account.signer, 'signTransaction');
    const { overall_fee } = await account.estimateInvokeFee({
      contractAddress: erc20Address,
      entrypoint: 'transfer',
      calldata: [erc20.address, '10', '0'],
    });
    expect(isBN(overall_fee)).toBe(true);
    expect(innerInvokeEstFeeSpy.mock.calls[0][1].version).toBe(feeTransactionVersion);
    innerInvokeEstFeeSpy.mockClear();
  });

  test('read balance of wallet', async () => {
    const x = await erc20.balanceOf(account.address);

    expect(number.toBN(x[0].low).toString()).toStrictEqual(number.toBN(1000).toString());
  });

  test('execute by wallet owner', async () => {
    const { transaction_hash } = await account.execute({
      contractAddress: erc20Address,
      entrypoint: 'transfer',
      calldata: [erc20.address, '10', '0'],
    });

    await provider.waitForTransaction(transaction_hash);
  });

  test('read balance of wallet after transfer', async () => {
    const { balance } = await erc20.balanceOf(account.address);

    expect(balance.low).toStrictEqual(toBN(990));
  });

  test('execute with custom nonce', async () => {
    const result = await account.getNonce();
    const nonce = toBN(result).toNumber();
    const { transaction_hash } = await account.execute(
      {
        contractAddress: erc20Address,
        entrypoint: 'transfer',
        calldata: [account.address, '10', '0'],
      },
      undefined,
      { nonce }
    );

    await provider.waitForTransaction(transaction_hash);
  });

  test('execute multiple transactions', async () => {
    const { transaction_hash } = await account.execute([
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
    ]);

    await provider.waitForTransaction(transaction_hash);

    const response = await dapp.get_number(account.address);
    expect(toBN(response.number as string).toString()).toStrictEqual('57');
  });

  test('sign and verify offchain message fail', async () => {
    const signature = await account.signMessage(typedDataExample);
    // change the signature to make it invalid
    signature[0] += '123';
    expect(await account.verifyMessage(typedDataExample, signature)).toBe(false);
  });

  test('sign and verify offchain message', async () => {
    const signature = await account.signMessage(typedDataExample);
    expect(await account.verifyMessage(typedDataExample, signature)).toBe(true);
  });

  describe('Contract interaction with Account', () => {
    const wallet = stark.randomAddress();

    beforeAll(async () => {
      const mintResponse = await account.execute({
        contractAddress: erc20Address,
        entrypoint: 'mint',
        calldata: [wallet, '1000', '0'],
      });

      await provider.waitForTransaction(mintResponse.transaction_hash);
    });

    test('change from provider to account', async () => {
      expect(erc20.providerOrAccount instanceof Provider);
      erc20.connect(account);
      expect(erc20.providerOrAccount instanceof Account);
    });

    test('estimate gas fee for `mint`', async () => {
      const res = await erc20.estimateFee.mint(wallet, ['10', '0']);
      expect(res).toHaveProperty('overall_fee');
    });

    test('Declare ERC20 contract', async () => {
      const declareTx = await account.declare({
        contract: compiledErc20,
        classHash: '0x54328a1075b8820eb43caf0caa233923148c983742402dcfc38541dd843d01a',
      });
      await provider.waitForTransaction(declareTx.transaction_hash);

      expect(declareTx.class_hash).toBeDefined();
    });
  });

  describe('Declare and UDC Deploy Flow', () => {
    test('ERC20 Declare', async () => {
      const declareTx = await account.declare({
        classHash: erc20ClassHash,
        contract: compiledErc20,
      });

      await provider.waitForTransaction(declareTx.transaction_hash);

      expect(declareTx).toHaveProperty('class_hash');
      expect(declareTx.class_hash).toEqual(erc20ClassHash);
    });

    test('UDC Deploy', async () => {
      const salt = randomAddress(); // use random salt

      const deployment = await account.deploy({
        classHash: erc20ClassHash,
        constructorCalldata: [
          encodeShortString('Token'),
          encodeShortString('ERC20'),
          account.address,
        ],
        salt,
        unique: true, // Using true here so as not to clash with normal erc20 deploy in account and provider test
        isDevnet: IS_DEVNET,
      });

      await provider.waitForTransaction(deployment.transaction_hash);

      expect(deployment).toHaveProperty('transaction_hash');
    });
  });
});
