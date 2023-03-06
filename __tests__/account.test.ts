import typedDataExample from '../__mocks__/typedDataExample.json';
import { Account, Contract, Provider, TransactionStatus, ec, stark } from '../src';
import { uint256 } from '../src/utils/calldata/cairo';
import { parseUDCEvent } from '../src/utils/events';
import { calculateContractAddressFromHash, feeTransactionVersion } from '../src/utils/hash';
import { cleanHex, hexToDecimalString, toBigInt, toHex } from '../src/utils/num';
import { encodeShortString } from '../src/utils/shortString';
import { randomAddress } from '../src/utils/stark';
import {
  compiledErc20,
  compiledNamingContract,
  compiledOpenZeppelinAccount,
  compiledStarknetId,
  compiledTestDapp,
  describeIfDevnetSequencer,
  describeIfSequencer,
  erc20ClassHash,
  getTestAccount,
  getTestProvider,
} from './fixtures';
import { initializeMatcher } from './schema';

describe('deploy and test Wallet', () => {
  const provider = getTestProvider();
  const account = getTestAccount(provider);
  let erc20: Contract;
  let erc20Address: string;
  let dapp: Contract;

  beforeAll(async () => {
    initializeMatcher(expect);
    expect(account).toBeInstanceOf(Account);

    const declareDeploy = await account.declareAndDeploy({
      contract: compiledErc20,
      constructorCalldata: [
        encodeShortString('Token'),
        encodeShortString('ERC20'),
        account.address,
      ],
    });

    erc20Address = declareDeploy.deploy.contract_address;
    erc20 = new Contract(compiledErc20.abi, erc20Address, provider);

    const { balance } = await erc20.balanceOf(account.address);
    expect(BigInt(balance.low).toString()).toStrictEqual(BigInt(1000).toString());

    const dappResponse = await account.declareAndDeploy({
      contract: compiledTestDapp,
      classHash: '0x04367b26fbb92235e8d1137d19c080e6e650a6889ded726d00658411cc1046f5',
    });

    dapp = new Contract(compiledTestDapp.abi, dappResponse.deploy.contract_address!, provider);
  });

  test('estimate fee', async () => {
    const innerInvokeEstFeeSpy = jest.spyOn(account.signer, 'signTransaction');
    const result = await account.estimateInvokeFee({
      contractAddress: erc20Address,
      entrypoint: 'transfer',
      calldata: [erc20.address, '10', '0'],
    });

    expect(result).toMatchSchemaRef('EstimateFee');
    expect(innerInvokeEstFeeSpy.mock.calls[0][1].version).toBe(feeTransactionVersion);
    innerInvokeEstFeeSpy.mockClear();
  });

  describeIfDevnetSequencer('Estimate Fee Bulk on Sequencer', () => {
    test('estimate fee bulk', async () => {
      const innerInvokeEstFeeSpy = jest.spyOn(account.signer, 'signTransaction');
      const estimatedFeeBulk = await account.estimateFeeBulk([
        {
          type: 'INVOKE_FUNCTION',
          payload: {
            contractAddress: erc20Address,
            entrypoint: 'transfer',
            calldata: [erc20.address, '10', '0'],
          },
        },
        {
          type: 'INVOKE_FUNCTION',
          payload: {
            contractAddress: erc20Address,
            entrypoint: 'transfer',
            calldata: [erc20.address, '10', '0'],
          },
        },
      ]);

      estimatedFeeBulk.forEach((value) => {
        expect(value).toMatchSchemaRef('EstimateFee');
      });
      expect(estimatedFeeBulk.length).toEqual(2);
      expect(innerInvokeEstFeeSpy.mock.calls[0][1].version).toBe(feeTransactionVersion);
      innerInvokeEstFeeSpy.mockClear();
    });
  });

  describeIfDevnetSequencer('Simulate transaction on Sequencer', () => {
    test('simulate transaction', async () => {
      const innerInvokeEstFeeSpy = jest.spyOn(account.signer, 'signTransaction');
      const res = await account.simulateTransaction({
        contractAddress: erc20Address,
        entrypoint: 'transfer',
        calldata: [erc20.address, '10', '0'],
      });

      expect(res).toMatchSchemaRef('TransactionSimulation');
      expect(innerInvokeEstFeeSpy.mock.calls[0][1].version).toBe(feeTransactionVersion);
      innerInvokeEstFeeSpy.mockClear();
    });
  });

  test('read balance of wallet', async () => {
    const { balance } = await erc20.balanceOf(account.address);

    expect(BigInt(balance.low).toString()).toStrictEqual(BigInt(1000).toString());
  });

  test('execute by wallet owner', async () => {
    const { transaction_hash } = await account.execute({
      contractAddress: erc20Address,
      entrypoint: 'transfer',
      calldata: [erc20.address, '10', '0'],
    });

    await provider.waitForTransaction(transaction_hash, {
      successStates: [TransactionStatus.ACCEPTED_ON_L2],
    });
  });

  test('read balance of wallet after transfer', async () => {
    const { balance } = await erc20.balanceOf(account.address);

    expect(balance.low).toStrictEqual(toBigInt(990));
  });

  test('execute with custom nonce', async () => {
    const result = await account.getNonce();
    const nonce = toBigInt(result);
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

    await provider.waitForTransaction(transaction_hash, {
      successStates: [TransactionStatus.ACCEPTED_ON_L2],
    });

    const response = await dapp.get_number(account.address);
    expect(toBigInt(response.number as string).toString()).toStrictEqual('57');
  });

  test('sign and verify offchain message fail', async () => {
    const signature = await account.signMessage(typedDataExample);
    const [r, s] = stark.formatSignature(signature);

    // change the signature to make it invalid
    const r2 = toBigInt(r) + 123n;

    const signature2 = stark.parseSignature([r2.toString(), s]);

    if (!signature2) return;

    expect(await account.verifyMessage(typedDataExample, signature2)).toBe(false);
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
      const res = await erc20.estimateFee.mint(wallet, uint256('10'));
      expect(res).toHaveProperty('overall_fee');
    });

    test('Declare ERC20 contract', async () => {
      const declareTx = await account.declare({
        contract: compiledErc20,
        classHash: '0x54328a1075b8820eb43caf0caa233923148c983742402dcfc38541dd843d01a',
      });
      await provider.waitForTransaction(declareTx.transaction_hash);
      expect(declareTx).toMatchSchemaRef('DeclareContractResponse');
    });

    test('Get the stark name of the account and account from stark name (using starknet.id)', async () => {
      // Deploy naming contract
      const namingResponse = await account.declareAndDeploy({
        contract: compiledNamingContract,
      });
      const namingAddress = namingResponse.deploy.contract_address;

      // Deploy Starknet id contract
      const idResponse = await account.declareAndDeploy({
        contract: compiledStarknetId,
      });
      const idAddress = idResponse.deploy.contract_address;

      // Create signature from private key
      const whitelistingPublicKey =
        '1893860513534673656759973582609638731665558071107553163765293299136715951024';
      const whitelistingPrivateKey =
        '301579081698031303837612923223391524790804435085778862878979120159194507372';
      const hashed = ec.starkCurve.pedersen(
        ec.starkCurve.pedersen(toBigInt('18925'), toBigInt('1922775124')),
        toBigInt(account.address)
      );
      const signed = ec.starkCurve.sign(hashed, toHex(whitelistingPrivateKey));

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
            signed.r, // sig 0 for whitelist
            signed.s, // sig 1 for whitelist
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

      const name = await account.getStarkName(undefined, namingAddress);
      expect(name).toEqual('ben.stark');
    });
  });

  describe('Declare and UDC Deploy Flow', () => {
    test('ERC20 Declare', async () => {
      const declareTx = await account.declare({
        contract: compiledErc20,
      });

      await provider.waitForTransaction(declareTx.transaction_hash);
      expect(declareTx).toMatchSchemaRef('DeclareContractResponse');
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
      expect(deployResponse).toMatchSchemaRef('DeployContractUDCResponse');
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
      expect(deployment).toMatchSchemaRef('MultiDeployContractResponse');

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
      expect(deployment).toMatchSchemaRef('MultiDeployContractResponse');

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
      expect(deployments).toMatchSchemaRef('MultiDeployContractResponse');

      await provider.waitForTransaction(deployments.transaction_hash);
    });
  });

  describeIfSequencer('Estimate fee bulk', () => {
    let accountClassHash: string;
    let precalculatedAddress: string;
    let starkKeyPub: string;
    let newAccount: Account;

    beforeAll(async () => {
      const declareAccount = await account.declare({
        contract: compiledOpenZeppelinAccount,
        classHash: '0x058d97f7d76e78f44905cc30cb65b91ea49a4b908a76703c54197bca90f81773',
      });
      accountClassHash = declareAccount.class_hash;
      await provider.waitForTransaction(declareAccount.transaction_hash);

      const privateKey = stark.randomAddress();
      starkKeyPub = ec.starkCurve.getStarkKey(privateKey);
      precalculatedAddress = calculateContractAddressFromHash(
        starkKeyPub,
        accountClassHash,
        [starkKeyPub],
        0
      );
      newAccount = new Account(provider, precalculatedAddress, privateKey);
    });

    test('deploy account & invoke functions', async () => {
      const { transaction_hash } = await account.execute({
        contractAddress: erc20Address,
        entrypoint: 'transfer',
        calldata: [precalculatedAddress, '10', '0'],
      });
      await provider.waitForTransaction(transaction_hash);

      const res = await newAccount.estimateFeeBulk([
        {
          type: 'DEPLOY_ACCOUNT',
          payload: {
            classHash: accountClassHash,
            constructorCalldata: [starkKeyPub],
            addressSalt: starkKeyPub,
            contractAddress: precalculatedAddress,
          },
        },
        {
          type: 'INVOKE_FUNCTION',
          payload: [
            {
              contractAddress: erc20Address,
              entrypoint: 'approve',
              calldata: [account.address, '10', '0'],
            },
            {
              contractAddress: erc20Address,
              entrypoint: 'transfer',
              calldata: [account.address, '10', '0'],
            },
          ],
        },
      ]);
      expect(res).toHaveLength(2);
      res.forEach((value) => {
        expect(value).toMatchSchemaRef('EstimateFee');
      });
    });

    test('declare, deploy & invoke functions', async () => {
      const res = await account.estimateFeeBulk([
        {
          type: 'DECLARE',
          payload: {
            contract: compiledErc20,
            classHash: '0x54328a1075b8820eb43caf0caa233923148c983742402dcfc38541dd843d01a',
          },
        },
        {
          type: 'DEPLOY',
          payload: {
            classHash: '0x54328a1075b8820eb43caf0caa233923148c983742402dcfc38541dd843d01a',
            constructorCalldata: [
              encodeShortString('Token'),
              encodeShortString('ERC20'),
              account.address,
            ],
          },
        },
        {
          type: 'INVOKE_FUNCTION',
          payload: [
            {
              contractAddress: erc20Address,
              entrypoint: 'approve',
              calldata: [erc20Address, '10', '0'],
            },
            {
              contractAddress: erc20Address,
              entrypoint: 'transfer',
              calldata: [erc20.address, '10', '0'],
            },
          ],
        },
      ]);
      expect(res).toHaveLength(3);
      res.forEach((value) => {
        expect(value).toMatchSchemaRef('EstimateFee');
      });
    });
  });
});
