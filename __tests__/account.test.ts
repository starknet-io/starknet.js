import { isBN } from 'bn.js';

import typedDataExample from '../__mocks__/typedDataExample.json';
import { Account, Contract, DeployContractPayload, Provider, number, stark } from '../src';
import { feeTransactionVersion } from '../src/utils/hash';
import { toBN } from '../src/utils/number';
import {
  compiledErc20,
  compiledNamingContract,
  compiledStarknetId,
  compiledTestDapp,
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

    test('Get the stark name of the account and account from stark name (using starknet.id)', async () => {
      // Deploy naming contract
      const namingPlayLoad: DeployContractPayload = { contract: compiledNamingContract };
      const namingResponse = await provider.deployContract(namingPlayLoad);
      const namingAddress = namingResponse.contract_address;

      // Deploy Starknet id contract
      const idPlayLoad: DeployContractPayload = { contract: compiledStarknetId };
      const idResponse = await provider.deployContract(idPlayLoad);
      const idAddress = idResponse.contract_address;

      const { transaction_hash } = await account.execute([
        {
          contractAddress: namingAddress,
          entrypoint: 'initializer',
          calldata: [
            idAddress, // starknetid_contract_addr
            '0', // pricing_contract_addr
            account.address, // admin
            '1576987121283045618657875225183003300580199140020787494777499595331436496159', // whitelisting_key
            '0', // l1_contract
          ],
        },
        {
          contractAddress: idAddress,
          entrypoint: 'mint',
          calldata: ['1'], // TokenId
        },
        {
          contractAddress: namingAddress,
          entrypoint: 'whitelisted_mint',
          calldata: [
            '18925', // Domain encoded "ben"
            '1697380617', // Expiry
            '1', // Starknet id linked
            account.address, // receiver_address
            '1249449923402095645023546949816521361907869702415870903008894560968474148064', // sig 0 for whitelist
            '543901326374961504443808953662149863005450004831659662383974986108355067943', // sig 1 for whitelist
          ],
        },
        {
          contractAddress: namingAddress,
          entrypoint: 'set_address_to_domain',
          calldata: [
            '1', // length
            '18925', // Domain encoded "ben"
          ],
        },
      ]);

      await provider.waitForTransaction(transaction_hash);

      const address = await account.getAddressFromStarkName('ben.stark', namingAddress);
      expect(address).toEqual(account.address);

      const name = await account.getStarkName(namingAddress);
      expect(name).toEqual('ben.stark');
    });
  });
});
