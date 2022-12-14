import { isBN } from 'bn.js';

import typedDataExample from '../__mocks__/typedDataExample.json';
import { Account, Contract, Provider, number, stark } from '../src';
import { getKeyPair, sign } from '../src/utils/ellipticCurve';
import { parseUDCEvent } from '../src/utils/events';
import { feeTransactionVersion, pedersen } from '../src/utils/hash';
import { cleanHex, hexToDecimalString, toBN } from '../src/utils/number';
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
      const namingResponse = await account.declareDeploy({
        contract: compiledNamingContract,
        classHash: '0x3f2f8c80ab2d404bcfb4182e8528708e4efa2c646dd711bdd7b721ecc6111f7',
      });
      const namingAddress = namingResponse.deploy.contract_address;

      // Deploy Starknet id contract
      const idResponse = await account.declareDeploy({
        contract: compiledStarknetId,
        classHash: '0x1eb5a8308760d82321cb3ee8967581bb1d38348c7d2f082a07580040c52217c',
      });
      const idAddress = idResponse.deploy.contract_address;

      // Create signature from private key
      const whitelistingPublicKey =
        '1893860513534673656759973582609638731665558071107553163765293299136715951024';
      const whitelistingPrivateKey =
        '301579081698031303837612923223391524790804435085778862878979120159194507372';
      const hashed = pedersen([
        pedersen([toBN('18925'), toBN('1922775124')]),
        toBN(hexToDecimalString(account.address)),
      ]);
      const keyPair = getKeyPair(toBN(whitelistingPrivateKey));
      const signed = sign(keyPair, hashed);

      const { transaction_hash } = await account.execute([
        {
          contractAddress: namingAddress,
          entrypoint: 'initializer',
          calldata: [
            idAddress, // starknetid_contract_addr
            '0', // pricing_contract_addr
            account.address, // admin
            whitelistingPublicKey, // whitelisting_key
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
            '1922775124', // Expiry
            '1', // Starknet id linked
            account.address, // receiver_address
            signed[0], // sig 0 for whitelist
            signed[1], // sig 1 for whitelist
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

    test('UDC Deploy unique', async () => {
      const salt = randomAddress(); // use random salt

      const deployment = await account.deploy({
        classHash: erc20ClassHash,
        constructorCalldata: [
          encodeShortString('Token'),
          encodeShortString('ERC20'),
          account.address,
        ],
        salt,
        unique: true,
      });
      expect(deployment).toHaveProperty('transaction_hash');

      // check pre-calculated address
      const txReceipt = await provider.waitForTransaction(deployment.transaction_hash);
      const udcEvent = parseUDCEvent(txReceipt);
      expect(cleanHex(deployment.contract_address[0])).toBe(cleanHex(udcEvent.contract_address));
    });

    test('UDC Deploy non-unique', async () => {
      const salt = randomAddress(); // use random salt

      const deployment = await account.deploy({
        classHash: erc20ClassHash,
        constructorCalldata: [
          encodeShortString('Token'),
          encodeShortString('ERC20'),
          account.address,
        ],
        salt,
        unique: false,
      });
      expect(deployment).toHaveProperty('transaction_hash');

      // check pre-calculated address
      const txReceipt = await provider.waitForTransaction(deployment.transaction_hash);
      const udcEvent = parseUDCEvent(txReceipt);
      expect(cleanHex(deployment.contract_address[0])).toBe(cleanHex(udcEvent.contract_address));
    });

    test('UDC multi Deploy', async () => {
      const deployments = await account.deploy([
        {
          classHash: '0x04367b26fbb92235e8d1137d19c080e6e650a6889ded726d00658411cc1046f5',
        },
        {
          classHash: erc20ClassHash,
          constructorCalldata: [
            encodeShortString('Token'),
            encodeShortString('ERC20'),
            account.address,
          ],
        },
      ]);
      expect(deployments).toHaveProperty('transaction_hash');
      expect(deployments.contract_address[0]).toBeDefined();
      expect(deployments.contract_address[1]).toBeDefined();

      await provider.waitForTransaction(deployments.transaction_hash);
    });
  });
});
