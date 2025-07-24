import typedDataExample from '../__mocks__/typedData/baseExample.json';
import {
  Account,
  CallData,
  Contract,
  DeclareDeployUDCResponse,
  Provider,
  ProviderInterface,
  TransactionType,
  cairo,
  ec,
  events,
  num,
  hash,
  stark,
  type Calldata,
  type InvokeTransactionReceiptResponse,
} from '../src';
import { Deployer } from '../src/deployer';
import { C1v2ClassHash, contracts, describeIfDevnet, erc20ClassHash } from './config/fixtures';
import {
  createTestProvider,
  getTestAccount,
  devnetFeeTokenAddress,
  adaptAccountIfDevnet,
  TEST_TX_VERSION,
} from './config/fixturesInit';
import { initializeMatcher } from './config/schema';

const { cleanHex, hexToDecimalString, toBigInt } = num;
const { randomAddress } = stark;
const { Signature } = ec.starkCurve;

// only Rpc0.8
describe('deploy and test Account', () => {
  let provider: Provider;
  let account: Account;
  let erc20: Contract;
  let erc20CallData: CallData;
  let erc20Constructor: Calldata;
  let erc20Address: string;
  let dapp: Contract;
  let dappClassHash: string;
  let dd: DeclareDeployUDCResponse;

  beforeAll(async () => {
    initializeMatcher(expect);

    provider = new Provider(await createTestProvider());
    account = getTestAccount(provider);
    expect(account).toBeInstanceOf(Account);

    erc20CallData = new CallData(contracts.Erc20OZ.sierra.abi);
    erc20Constructor = erc20CallData.compile('constructor', {
      name: 'Token',
      symbol: 'ERC20',
      amount: 1000n,
      recipient: account.address,
      owner: account.address,
    });
    dd = await account.declareAndDeploy({
      contract: contracts.Erc20OZ.sierra,
      casm: contracts.Erc20OZ.casm,
      constructorCalldata: erc20Constructor,
    });
    erc20Address = dd.deploy.contract_address;
    erc20 = new Contract({
      abi: contracts.Erc20OZ.sierra.abi,
      address: erc20Address,
      providerOrAccount: provider,
    });

    const balance = await erc20.balanceOf(account.address);
    expect(balance).toStrictEqual(1000n);

    const dappResponse = await account.declareAndDeploy({
      contract: contracts.C1v2.sierra,
      casm: contracts.C1v2.casm,
    });

    dapp = new Contract({
      abi: contracts.C1v2.sierra.abi,
      address: dappResponse.deploy.contract_address,
      providerOrAccount: provider,
    });
    dappClassHash = num.toHex(dappResponse.declare.class_hash);
  });

  test('declare and deploy', async () => {
    expect(dd.declare).toMatchSchemaRef('DeclareContractResponse');
    expect(dd.deploy).toMatchSchemaRef('DeployContractUDCResponse');
  });

  describeIfDevnet('Test on Devnet', () => {
    test('deployAccount with rawArgs - test on devnet', async () => {
      const privKey = stark.randomAddress();
      const pubKey = ec.starkCurve.getStarkKey(privKey);
      const calldata = { publicKey: pubKey };

      // declare account
      const declareAccount = await account.declareIfNot({
        contract: contracts.C1Account.sierra,
        casm: contracts.C1Account.casm,
      });
      const accountClassHash = declareAccount.class_hash;

      // fund new account
      const toBeAccountAddress = hash.calculateContractAddressFromHash(
        pubKey,
        accountClassHash,
        calldata,
        0
      );

      const { transaction_hash } = await account.execute({
        contractAddress: devnetFeeTokenAddress,
        entrypoint: 'transfer',
        calldata: {
          recipient: toBeAccountAddress,
          amount: cairo.uint256(5n * 10n ** 16n),
        },
      });
      await account.waitForTransaction(transaction_hash);

      // deploy account
      const accountOZ = adaptAccountIfDevnet(
        new Account({
          provider,
          address: toBeAccountAddress,
          signer: privKey,
          transactionVersion: TEST_TX_VERSION,
        })
      );
      const deployed = await accountOZ.deploySelf({
        classHash: accountClassHash,
        constructorCalldata: calldata,
        addressSalt: pubKey,
      });
      const receipt = await account.waitForTransaction(deployed.transaction_hash);
      expect(receipt).toMatchSchemaRef('GetTransactionReceiptResponse');
    });

    test('deploy with rawArgs', async () => {
      const deployment = await account.deploy({
        classHash: erc20ClassHash,
        constructorCalldata: erc20CallData.compile('constructor', {
          name: 'Token',
          symbol: 'ERC20',
          amount: 1000n,
          recipient: account.address,
          owner: account.address,
        }),
      });
      expect(deployment).toMatchSchemaRef('MultiDeployContractResponse');
    });

    test('multiDeploy with rawArgs', async () => {
      const deployments = await account.deploy([
        {
          classHash: dappClassHash,
        },
        {
          classHash: erc20ClassHash,
          constructorCalldata: erc20CallData.compile('constructor', {
            name: 'Token',
            symbol: 'ERC20',
            amount: 1000n,
            recipient: account.address,
            owner: account.address,
          }),
        },
      ]);
      expect(deployments).toMatchSchemaRef('MultiDeployContractResponse');
    });
  });

  describe('simulate transaction', () => {
    test('simulate empty invocations', async () => {
      await expect(account.simulateTransaction([])).rejects.toThrow(TypeError);
    });
    test('simulate INVOKE Cairo 1', async () => {
      const res = await account.simulateTransaction([
        {
          type: TransactionType.INVOKE,
          contractAddress: erc20Address,
          entrypoint: 'transfer',
          calldata: {
            recipient: erc20.address,
            amount: cairo.uint256(10),
          },
        },
        {
          type: TransactionType.INVOKE,
          contractAddress: erc20Address,
          entrypoint: 'transfer',
          calldata: {
            recipient: erc20.address,
            amount: cairo.uint256(10),
          },
        },
      ]);
      expect(res).toMatchSchemaRef('SimulateTransactionResponse');
    });
    test('simulate multi INVOKE Cairo 1', async () => {
      const res = await account.simulateTransaction([
        {
          type: TransactionType.INVOKE,
          payload: [
            {
              contractAddress: erc20Address,
              entrypoint: 'transfer',
              calldata: {
                recipient: erc20.address,
                amount: cairo.uint256(10),
              },
            },
            {
              contractAddress: erc20Address,
              entrypoint: 'transfer',
              calldata: {
                recipient: erc20.address,
                amount: cairo.uint256(10),
              },
            },
          ],
        },
      ]);
      expect(res).toMatchSchemaRef('SimulateTransactionResponse');
    });

    describeIfDevnet('declare tests only on devnet', () => {
      test('simulate DECLARE - Cairo 1 Contract - test if not already declared', async () => {
        const invocation = await provider.prepareInvocations([
          {
            type: TransactionType.DECLARE,
            contract: contracts.Minimalist.sierra,
            casm: contracts.Minimalist.casm,
          },
        ]);

        if (invocation.length) {
          const res = await account.simulateTransaction(invocation);
          expect(res).toMatchSchemaRef('SimulateTransactionResponse');
        }
      });
    });
    test('simulate DEPLOY - Cairo 1 Contract', async () => {
      const res = await account.simulateTransaction([
        {
          type: TransactionType.DEPLOY,
          classHash: erc20ClassHash,
          constructorCalldata: {
            name: 'Token',
            symbol: 'ERC20',
            amount: 1000n,
            recipient: account.address,
            owner: account.address,
          },
        },
      ]);
      expect(res).toMatchSchemaRef('SimulateTransactionResponse');
    });
    test('simulate multi DEPLOY - Cairo 1 Contract', async () => {
      const res = await account.simulateTransaction([
        {
          type: TransactionType.DEPLOY,
          payload: [
            {
              classHash: C1v2ClassHash,
            },
            {
              classHash: erc20ClassHash,
              constructorCalldata: {
                name: 'Token',
                symbol: 'ERC20',
                amount: 1000n,
                recipient: account.address,
                owner: account.address,
              },
            },
          ],
        },
      ]);
      expect(res).toMatchSchemaRef('SimulateTransactionResponse');
    });
    test('simulate DEPLOY_ACCOUNT - Cairo 1 Account', async () => {
      const declareAccount = await account.declareIfNot({
        contract: contracts.C1Account.sierra,
        casm: contracts.C1Account.casm,
      });
      const accountClassHash = declareAccount.class_hash;
      if (declareAccount.transaction_hash) {
        await provider.waitForTransaction(declareAccount.transaction_hash);
      }
      const privateKey = stark.randomAddress();
      const starkKeyPub = ec.starkCurve.getStarkKey(privateKey);
      const precalculatedAddress = hash.calculateContractAddressFromHash(
        starkKeyPub,
        accountClassHash,
        { publicKey: starkKeyPub },
        0
      );
      const newAccount = adaptAccountIfDevnet(
        new Account({
          provider,
          address: precalculatedAddress,
          signer: privateKey,
        })
      );

      const res = await newAccount.simulateTransaction([
        {
          type: TransactionType.DEPLOY_ACCOUNT,
          classHash: accountClassHash,
          constructorCalldata: { publicKey: starkKeyPub },
          addressSalt: starkKeyPub,
          contractAddress: precalculatedAddress,
        },
      ]);
      expect(res).toMatchSchemaRef('SimulateTransactionResponse');
    });
  });

  test('read balance of account', async () => {
    const balance = await erc20.balanceOf(account.address);

    expect(balance).toStrictEqual(1000n);
  });

  test('execute by account owner', async () => {
    const { transaction_hash } = await account.execute({
      contractAddress: erc20Address,
      entrypoint: 'transfer',
      calldata: [erc20.address, '10', '0'],
    });

    await provider.waitForTransaction(transaction_hash);
  });

  test('read balance of account after transfer', async () => {
    const balance = await erc20.balanceOf(account.address);

    expect(balance).toStrictEqual(990n);
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
      { nonce }
    );

    await provider.waitForTransaction(transaction_hash);
  });

  test('execute multiple transactions', async () => {
    const before = await dapp.get_balance();
    const { transaction_hash } = await account.execute([
      {
        contractAddress: dapp.address,
        entrypoint: 'increase_balance',
        calldata: ['47'],
      },
      {
        contractAddress: dapp.address,
        entrypoint: 'increase_balance',
        calldata: ['10'],
      },
    ]);

    await provider.waitForTransaction(transaction_hash);

    const after = await dapp.get_balance();
    expect(after - before).toStrictEqual(57n);
  });

  describe('EIP712 verification', () => {
    // currently only in Starknet-Devnet, because can fail in Sepolia.
    test('sign and verify EIP712 message fail', async () => {
      const signature = await account.signMessage(typedDataExample);
      const [r, s] = stark.formatSignature(signature);

      // change the signature to make it invalid
      const r2 = toBigInt(r) + 123n;

      const signature2 = new Signature(toBigInt(r2.toString()), toBigInt(s));
      if (!signature2) return;

      const verifyMessageResponse: boolean = await account.verifyMessageInStarknet(
        typedDataExample,
        signature2,
        account.address
      );
      expect(verifyMessageResponse).toBe(false);

      const wrongAccount = new Account({
        provider,
        address: '0x037891',
        signer: '0x026789',
        transactionVersion: TEST_TX_VERSION,
      }); // non existing account
      await expect(
        wrongAccount.verifyMessageInStarknet(typedDataExample, signature2, wrongAccount.address)
      ).rejects.toThrow();
    });

    test('sign and verify message', async () => {
      const signature = await account.signMessage(typedDataExample);
      const verifMessageResponse: boolean = await account.verifyMessageInStarknet(
        typedDataExample,
        signature,
        account.address
      );
      expect(verifMessageResponse).toBe(true);
    });
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
      expect(erc20.providerOrAccount).toBeInstanceOf(Provider);
      erc20.providerOrAccount = account;
      expect(erc20.providerOrAccount).toBeInstanceOf(Account);
    });

    test('estimate gas fee for `mint`', async () => {
      const res = await erc20.estimateFee.mint(wallet, cairo.uint256('10'));
      expect(res).toHaveProperty('overall_fee');
    });

    test('Declare ERC20 contract', async () => {
      const declareTx = await account.declareIfNot({
        contract: contracts.Erc20OZ.sierra,
        casm: contracts.Erc20OZ.casm,
        classHash: erc20ClassHash,
      });
      if (declareTx.transaction_hash) {
        await provider.waitForTransaction(declareTx.transaction_hash);
      }
      expect(declareTx).toMatchSchemaRef('DeclareContractResponse');
    });
  });

  describe('Declare and UDC Deploy Flow', () => {
    test('ERC20 Declare', async () => {
      const declareTx = await account.declareIfNot({
        contract: contracts.Erc20OZ.sierra,
        casm: contracts.Erc20OZ.casm,
      });

      if (declareTx.transaction_hash) {
        await provider.waitForTransaction(declareTx.transaction_hash);
      }
      expect(declareTx).toMatchSchemaRef('DeclareContractResponse');
      expect(hexToDecimalString(declareTx.class_hash)).toEqual(hexToDecimalString(erc20ClassHash));
    });

    test('UDC DeployContract', async () => {
      const deployResponse = await account.deployContract({
        classHash: erc20ClassHash,
        constructorCalldata: erc20Constructor,
      });
      expect(deployResponse).toMatchSchemaRef('DeployContractUDCResponse');
    });

    test('UDC Deploy unique', async () => {
      const salt = randomAddress(); // use random salt

      const deployment = await account.deploy({
        classHash: erc20ClassHash,
        constructorCalldata: erc20Constructor,
        salt,
        unique: true,
      });
      expect(deployment).toMatchSchemaRef('MultiDeployContractResponse');

      // check pre-calculated address
      const txReceipt = await provider.waitForTransaction(deployment.transaction_hash);
      const udcEvent = events.parseUDCEvent(txReceipt.value as InvokeTransactionReceiptResponse);
      expect(cleanHex(deployment.contract_address[0])).toBe(cleanHex(udcEvent.contract_address));
    });

    test('UDC Deploy non-unique', async () => {
      const salt = randomAddress(); // use random salt

      const deployment = await account.deploy({
        classHash: erc20ClassHash,
        constructorCalldata: erc20Constructor,
        salt,
        unique: false,
      });
      expect(deployment).toMatchSchemaRef('MultiDeployContractResponse');

      // check pre-calculated address
      const txReceipt = await provider.waitForTransaction(deployment.transaction_hash);
      const udcEvent = events.parseUDCEvent(txReceipt.value as InvokeTransactionReceiptResponse);
      expect(cleanHex(deployment.contract_address[0])).toBe(cleanHex(udcEvent.contract_address));
    });

    test('UDC multi Deploy', async () => {
      const deployments = await account.deploy([
        {
          classHash: C1v2ClassHash,
        },
        {
          classHash: erc20ClassHash,
          constructorCalldata: erc20Constructor,
        },
      ]);
      expect(deployments).toMatchSchemaRef('MultiDeployContractResponse');

      await provider.waitForTransaction(deployments.transaction_hash);
    });
  });

  describe('Estimate fee bulk & estimate fee', () => {
    let accountClassHash: string;
    let precalculatedAddress: string;
    let starkKeyPub: string;
    let newAccount: Account;

    beforeAll(async () => {
      const declareAccount = await account.declareIfNot({
        contract: contracts.C1Account.sierra,
        casm: contracts.C1Account.casm,
      });
      accountClassHash = declareAccount.class_hash;
      if (declareAccount.transaction_hash) {
        await provider.waitForTransaction(declareAccount.transaction_hash);
      }
      const privateKey = stark.randomAddress();
      starkKeyPub = ec.starkCurve.getStarkKey(privateKey);
      precalculatedAddress = hash.calculateContractAddressFromHash(
        starkKeyPub,
        accountClassHash,
        { publicKey: starkKeyPub },
        0
      );
      newAccount = adaptAccountIfDevnet(
        new Account({
          provider,
          address: precalculatedAddress,
          signer: privateKey,
        })
      );
    });

    test('estimateAccountDeployFee Cairo 1', async () => {
      const result = await newAccount.estimateAccountDeployFee({
        classHash: accountClassHash,
        constructorCalldata: { publicKey: starkKeyPub },
        addressSalt: starkKeyPub,
        contractAddress: precalculatedAddress,
      });
      expect(result).toMatchSchemaRef('EstimateFeeResponseOverhead');
    });

    test('estimate fee bulk on empty invocations', async () => {
      await expect(account.estimateFeeBulk([])).rejects.toThrow(TypeError);
    });

    test('estimate fee bulk invoke functions', async () => {
      // TODO @dhruvkelawala check expectation for feeTransactionVersion
      // const innerInvokeEstFeeSpy = jest.spyOn(account.signer, 'signTransaction');
      const estimatedFeeBulk = await account.estimateFeeBulk([
        {
          type: TransactionType.INVOKE,
          payload: {
            contractAddress: erc20Address,
            entrypoint: 'transfer',
            calldata: [erc20.address, '10', '0'],
          },
        },
        {
          type: TransactionType.INVOKE,
          payload: {
            contractAddress: erc20Address,
            entrypoint: 'transfer',
            calldata: [erc20.address, '10', '0'],
          },
        },
      ]);

      estimatedFeeBulk.forEach((value) => {
        expect(value).toMatchSchemaRef('EstimateFeeResponseOverhead');
      });
      expect(estimatedFeeBulk.length).toEqual(2);
      // expect(innerInvokeEstFeeSpy.mock.calls[0][1].version).toBe(feeTransactionVersion);
      // innerInvokeEstFeeSpy.mockClear();
    });

    test('deploy account & multi invoke functions', async () => {
      const { transaction_hash } = await account.execute({
        contractAddress: erc20Address,
        entrypoint: 'transfer',
        calldata: [precalculatedAddress, cairo.uint256(10)],
      });
      await provider.waitForTransaction(transaction_hash);

      const res = await newAccount.estimateFeeBulk([
        {
          type: TransactionType.DEPLOY_ACCOUNT,
          payload: {
            classHash: accountClassHash,
            constructorCalldata: { publicKey: starkKeyPub },
            addressSalt: starkKeyPub,
            contractAddress: precalculatedAddress,
          },
        },
        {
          type: TransactionType.INVOKE,
          payload: [
            {
              contractAddress: erc20Address,
              entrypoint: 'approve',
              calldata: { address: account.address, amount: cairo.uint256(10) },
            },
            {
              contractAddress: erc20Address,
              entrypoint: 'transfer',
              calldata: [account.address, cairo.uint256(10)],
            },
          ],
        },
      ]);
      expect(res).toHaveLength(2);
      res.forEach((value) => {
        expect(value).toMatchSchemaRef('EstimateFeeResponseOverhead');
      });
    });

    describeIfDevnet('declare tests only on devnet', () => {
      test('Manual: declare, deploy & multi invoke functions', async () => {
        /*
         * For contracts re-declaration of the class throw an errors
         * as soo We first need to test is class is already declared
         */

        const isDeclaredCairo1 = await account.isClassDeclared({
          classHash: hash.computeContractClassHash(contracts.C260.sierra),
        });

        const invocations = [
          {
            type: TransactionType.INVOKE,
            payload: [
              {
                contractAddress: erc20Address,
                entrypoint: 'approve',
                calldata: {
                  address: erc20Address,
                  amount: cairo.uint256(10),
                },
              },
              {
                contractAddress: erc20Address,
                entrypoint: 'transfer',
                calldata: [erc20.address, '10', '0'],
              },
            ],
          },
          {
            type: TransactionType.DEPLOY,
            payload: {
              classHash: erc20ClassHash,
              constructorCalldata: erc20Constructor,
            },
          },
          ...(!isDeclaredCairo1
            ? [
                {
                  // Cairo 1.1.0, if declared estimate error with can't redeclare same contract
                  type: TransactionType.DECLARE,
                  contract: contracts.C260.sierra,
                  casm: contracts.C260.casm,
                },
              ]
            : []),
        ];

        const res = await account.estimateFeeBulk(invocations);
        res.forEach((value) => {
          expect(value).toMatchSchemaRef('EstimateFeeResponseOverhead');
        });
      });

      test('prepareInvocations: unordered declare, deploy & multi invoke', async () => {
        const invocations = await provider.prepareInvocations([
          {
            type: TransactionType.DEPLOY,
            payload: {
              classHash: erc20ClassHash,
              constructorCalldata: erc20Constructor,
            },
          },
          {
            type: TransactionType.INVOKE,
            payload: [
              {
                contractAddress: erc20Address,
                entrypoint: 'approve',
                calldata: {
                  address: erc20Address,
                  amount: cairo.uint256(10),
                },
              },
              {
                contractAddress: erc20Address,
                entrypoint: 'transfer',
                calldata: [erc20.address, '10', '0'],
              },
            ],
          },
          {
            // Cairo 1.1.0, if declared estimate error with can't redeclare same contract
            type: TransactionType.DECLARE,
            contract: contracts.C260.sierra,
            casm: contracts.C260.casm,
          },
        ]);

        const res = await account.estimateFeeBulk(invocations);
        res.forEach((value) => {
          expect(value).toMatchSchemaRef('EstimateFeeResponseOverhead');
        });
      });
    });

    // Order is important, declare c1 must be last else estimate and simulate will error
    // with contract already declared
    test('estimateInvokeFee Cairo 1', async () => {
      // TODO @dhruvkelawala check expectation for feeTransactionVersion
      // Cairo 1 contract
      const ddc1: DeclareDeployUDCResponse = await account.declareAndDeploy({
        contract: contracts.C260.sierra,
        casm: contracts.C260.casm,
      });

      // const innerInvokeEstFeeSpy = jest.spyOn(account.signer, 'signTransaction');
      const result = await account.estimateInvokeFee({
        contractAddress: ddc1.deploy.address,
        entrypoint: 'set_name',
        calldata: ['Hello'],
      });

      expect(result).toMatchSchemaRef('EstimateFeeResponseOverhead');
      // expect(innerInvokeEstFeeSpy.mock.calls[0][1].version).toBe(feeTransactionVersion);
      // innerInvokeEstFeeSpy.mockClear();
    });
  });
  describe('Custom Cairo 1 Deployer', () => {
    let accountCustomDeployer: Account;
    beforeAll(async () => {
      const deployerResponse = await account.declareAndDeploy({
        contract: contracts.deployer.sierra,
        casm: contracts.deployer.casm,
      });
      const customDeployer = new Deployer(
        deployerResponse.deploy.contract_address,
        'deploy_contract'
      );
      accountCustomDeployer = new Account({
        address: account.address,
        provider,
        signer: account.signer,
        deployer: customDeployer,
      });
    });
    test('Deploy contract', async () => {
      const deployResponse = await accountCustomDeployer.deployContract({
        classHash: erc20ClassHash,
        constructorCalldata: erc20Constructor,
      });
      expect(deployResponse).toMatchSchemaRef('DeployContractUDCResponse');
    });
  });
});

describe('unit', () => {
  describeIfDevnet('Devnet', () => {
    initializeMatcher(expect);
    let provider: ProviderInterface;
    let account: Account;

    beforeAll(async () => {
      provider = await createTestProvider();
      account = getTestAccount(provider);
    });

    test('declareIfNot', async () => {
      const declare = await account.declareIfNot({
        contract: contracts.Minimalist.sierra,
        casm: contracts.Minimalist.casm,
      });
      expect(declare).toMatchSchemaRef('DeclareContractResponse');

      await expect(
        account.declare({
          contract: contracts.Minimalist.sierra,
          casm: contracts.Minimalist.casm,
        })
      ).rejects.toThrow();

      const redeclare = await account.declareIfNot({
        contract: contracts.Minimalist.sierra,
        casm: contracts.Minimalist.casm,
      });
      expect(redeclare.class_hash).toBe(declare.class_hash);
    });
  });
});
