import { isBN } from 'bn.js';

import typedDataExample from '../__mocks__/typedDataExample.json';
import { Account, Contract, DeployContractPayload, Provider, number, stark } from '../src';
import { feeTransactionVersion } from '../src/utils/hash';
import { hexToDecimalString, toBN } from '../src/utils/number';
import { encodeShortString } from '../src/utils/shortString';
import { randomAddress } from '../src/utils/stark';
import {
  compiledErc20,
  compiledNamingContract,
  compiledStarknetId,
  compiledTestDapp,
  erc20ClassHash,
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

    const declareDeploy = await account.declareDeploy({
      contract: compiledErc20,
      classHash: '0x54328a1075b8820eb43caf0caa233923148c983742402dcfc38541dd843d01a',
      constructorCalldata: [
        encodeShortString('Token'),
        encodeShortString('ERC20'),
        account.address,
      ],
    });

    erc20Address = declareDeploy.deploy.contract_address;
    erc20 = new Contract(compiledErc20.abi, erc20Address, provider);

    const x = await erc20.balanceOf(account.address);

    expect(number.toBN(x[0].low).toString()).toStrictEqual(number.toBN(1000).toString());

    const dappResponse = await account.declareDeploy({
      contract: compiledTestDapp,
      classHash: '0x04367b26fbb92235e8d1137d19c080e6e650a6889ded726d00658411cc1046f5',
    });

    dapp = new Contract(compiledTestDapp.abi, dappResponse.deploy.contract_address!, provider);
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

    await provider.waitForTransaction(transaction_hash, undefined, ['ACCEPTED_ON_L2']);
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

    await provider.waitForTransaction(transaction_hash, undefined, ['ACCEPTED_ON_L2']);

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
      expect(hexToDecimalString(address as string)).toEqual(hexToDecimalString(account.address));

      const name = await account.getStarkName(namingAddress);
      expect(name).toEqual('ben.stark');
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
      expect(hexToDecimalString(declareTx.class_hash)).toEqual(hexToDecimalString(erc20ClassHash));
    });

    test('UDC DeployContract', async () => {
      const deployResponse = await account.deployContract({
        classHash: erc20ClassHash,
        constructorCalldata: [
          encodeShortString('Token'),
          encodeShortString('ERC20'),
          account.address,
        ],
      });

      expect(deployResponse.contract_address).toBeDefined();
      expect(deployResponse.transaction_hash).toBeDefined();
      expect(deployResponse.address).toBeDefined();
      expect(deployResponse.deployer).toBeDefined();
      expect(deployResponse.unique).toBeDefined();
      expect(deployResponse.classHash).toBeDefined();
      expect(deployResponse.calldata_len).toBeDefined();
      expect(deployResponse.calldata).toBeDefined();
      expect(deployResponse.salt).toBeDefined();
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
      });

      await provider.waitForTransaction(deployment.transaction_hash);

      expect(deployment).toHaveProperty('transaction_hash');
    });
  });
});
