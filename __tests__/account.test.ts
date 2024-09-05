import typedDataExample from '../__mocks__/typedData/baseExample.json';
import {
  Account,
  AllowArray,
  Call,
  Contract,
  DeclareDeployUDCResponse,
  Provider,
  TransactionType,
  cairo,
  constants,
  contractClassResponseToLegacyCompiledContract,
  ec,
  events,
  extractContractHashes,
  hash,
  num,
  shortString,
  stark,
} from '../src';
import {
  TEST_TX_VERSION,
  compiledErc20,
  compiledHelloSierra,
  compiledHelloSierraCasm,
  compiledOpenZeppelinAccount,
  compiledTestDapp,
  describeIfDevnet,
  erc20ClassHash,
  getTestAccount,
  getTestProvider,
} from './config/fixtures';
import { initializeMatcher } from './config/schema';

const { cleanHex, hexToDecimalString, toBigInt, toHex } = num;
const { encodeShortString } = shortString;
const { randomAddress } = stark;
const { uint256 } = cairo;
const { Signature } = ec.starkCurve;

describe('deploy and test Wallet', () => {
  const provider = new Provider(getTestProvider());
  const account = getTestAccount(provider);
  let erc20: Contract;
  let erc20Address: string;
  let dapp: Contract;
  let dd: DeclareDeployUDCResponse;

  beforeAll(async () => {
    initializeMatcher(expect);
    expect(account).toBeInstanceOf(Account);

    dd = await account.declareAndDeploy({
      contract: compiledErc20,
      constructorCalldata: [
        encodeShortString('Token'),
        encodeShortString('ERC20'),
        account.address,
      ],
    });

    erc20Address = dd.deploy.contract_address;
    erc20 = new Contract(compiledErc20.abi, erc20Address, provider);

    const { balance } = await erc20.balanceOf(account.address);
    expect(BigInt(balance.low).toString()).toStrictEqual(BigInt(1000).toString());

    const dappResponse = await account.declareAndDeploy({
      contract: compiledTestDapp,
      classHash: '0x04367b26fbb92235e8d1137d19c080e6e650a6889ded726d00658411cc1046f5',
    });

    dapp = new Contract(compiledTestDapp.abi, dappResponse.deploy.contract_address!, provider);
  });

  xtest('validate TS for redeclare - skip testing', async () => {
    const cc0 = await account.getClassAt(dd.deploy.address);
    const cc0_1 = await account.getClassByHash(toHex(dd.declare.class_hash));

    await account.declare({
      contract: contractClassResponseToLegacyCompiledContract(cc0),
    });

    await account.declare({
      contract: contractClassResponseToLegacyCompiledContract(cc0_1),
    });
  });

  test('estimateInvokeFee Cairo 0', async () => {
    const innerInvokeEstFeeSpy = jest.spyOn(account.signer, 'signTransaction');

    const calls: AllowArray<Call> = {
      contractAddress: erc20Address,
      entrypoint: 'transfer',
      calldata: [erc20.address, '10', '0'],
    };

    let result = await account.estimateInvokeFee(calls, { skipValidate: true });
    expect(result).toMatchSchemaRef('EstimateFee');
    expect(innerInvokeEstFeeSpy).not.toHaveBeenCalled();
    innerInvokeEstFeeSpy.mockClear();

    result = await account.estimateInvokeFee(calls, { skipValidate: false });
    expect(result).toMatchSchemaRef('EstimateFee');
    expect([constants.TRANSACTION_VERSION.F1, constants.TRANSACTION_VERSION.F3]).toContain(
      innerInvokeEstFeeSpy.mock.calls[0][1].version
    );
    innerInvokeEstFeeSpy.mockRestore();
  });

  xtest('estimateDeclareFee Cairo 0 &  Cairo 1', async () => {
    // this is tested indirectly true declareAndDeploy while declaring
  });

  describeIfDevnet('Test on Devnet', () => {
    test('deployAccount with rawArgs - test on devnet', async () => {
      const priKey = stark.randomAddress();
      const pubKey = ec.starkCurve.getStarkKey(priKey);

      const calldata = { publicKey: pubKey };

      // declare account
      const declareAccount = await account.declareIfNot({
        contract: compiledOpenZeppelinAccount,
      });
      const accountClassHash = declareAccount.class_hash;

      // fund new account
      const tobeAccountAddress = hash.calculateContractAddressFromHash(
        pubKey,
        accountClassHash,
        calldata,
        0
      );
      const devnetERC20Address =
        '0x49D36570D4E46F48E99674BD3FCC84644DDD6B96F7C741B1562B82F9E004DC7';
      const { transaction_hash } = await account.execute({
        contractAddress: devnetERC20Address,
        entrypoint: 'transfer',
        calldata: {
          recipient: tobeAccountAddress,
          amount: uint256(5 * 10 ** 15),
        },
      });
      await account.waitForTransaction(transaction_hash);

      // deploy account
      const accountOZ = new Account(
        provider,
        tobeAccountAddress,
        priKey,
        undefined,
        TEST_TX_VERSION
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
        constructorCalldata: {
          name: 'Token',
          symbol: 'ERC20',
          recipient: account.address,
        },
      });
      expect(deployment).toMatchSchemaRef('MultiDeployContractResponse');
    });

    test('multideploy with rawArgs', async () => {
      const deployments = await account.deploy([
        {
          classHash: '0x04367b26fbb92235e8d1137d19c080e6e650a6889ded726d00658411cc1046f5',
        },
        {
          classHash: erc20ClassHash,
          constructorCalldata: {
            name: 'Token',
            symbol: 'ERC20',
            recipient: account.address,
          },
        },
      ]);
      expect(deployments).toMatchSchemaRef('MultiDeployContractResponse');
    });
  });

  describe('simulate transaction - single transaction S0.11.2', () => {
    test('simulate empty invocations', async () => {
      await expect(account.simulateTransaction([])).rejects.toThrow(TypeError);
    });
    test('simulate INVOKE Cairo 0', async () => {
      const res = await account.simulateTransaction([
        {
          type: TransactionType.INVOKE,
          contractAddress: erc20Address,
          entrypoint: 'transfer',
          calldata: {
            recipient: erc20.address,
            amount: uint256(10),
          },
        },
        {
          type: TransactionType.INVOKE,
          contractAddress: erc20Address,
          entrypoint: 'transfer',
          calldata: {
            recipient: erc20.address,
            amount: uint256(10),
          },
        },
      ]);
      expect(res).toMatchSchemaRef('SimulateTransactionResponse');
    });
    test('simulate multi INVOKE Cairo 0', async () => {
      const res = await account.simulateTransaction([
        {
          type: TransactionType.INVOKE,
          payload: [
            {
              contractAddress: erc20Address,
              entrypoint: 'transfer',
              calldata: {
                recipient: erc20.address,
                amount: uint256(10),
              },
            },
            {
              contractAddress: erc20Address,
              entrypoint: 'transfer',
              calldata: {
                recipient: erc20.address,
                amount: uint256(10),
              },
            },
          ],
        },
      ]);
      expect(res).toMatchSchemaRef('SimulateTransactionResponse');
    });

    describeIfDevnet('declare tests only on devnet', () => {
      test('simulate DECLARE - Cairo 0 Contract', async () => {
        const invocation = await provider.prepareInvocations([
          {
            type: TransactionType.DECLARE,
            contract: compiledErc20,
          },
        ]);
        if (invocation.length) {
          const res = await account.simulateTransaction(invocation);
          expect(res).toMatchSchemaRef('SimulateTransactionResponse');
        }
      });
    });

    test('simulate DECLARE - Cairo 1 Contract - test if not already declared', async () => {
      const invocation = await provider.prepareInvocations([
        {
          type: TransactionType.DECLARE,
          contract: compiledHelloSierra,
          casm: compiledHelloSierraCasm,
        },
      ]);

      if (invocation.length) {
        const res = await account.simulateTransaction(invocation);
        expect(res).toMatchSchemaRef('SimulateTransactionResponse');
      }
    });
    test('simulate DEPLOY - Cairo 0 Contract', async () => {
      const res = await account.simulateTransaction([
        {
          type: TransactionType.DEPLOY,
          classHash: erc20ClassHash,
          constructorCalldata: {
            name: 'Token',
            symbol: 'ERC20',
            recipient: account.address,
          },
        },
      ]);
      expect(res).toMatchSchemaRef('SimulateTransactionResponse');
    });
    test('simulate multi DEPLOY - Cairo 0 Contract', async () => {
      const res = await account.simulateTransaction([
        {
          type: TransactionType.DEPLOY,
          payload: [
            {
              classHash: '0x04367b26fbb92235e8d1137d19c080e6e650a6889ded726d00658411cc1046f5',
            },
            {
              classHash: erc20ClassHash,
              constructorCalldata: {
                name: 'Token',
                symbol: 'ERC20',
                recipient: account.address,
              },
            },
          ],
        },
      ]);
      expect(res).toMatchSchemaRef('SimulateTransactionResponse');
    });
    test('simulate DEPLOY_ACCOUNT - Cairo 0 Account', async () => {
      const declareAccount = await account.declareIfNot({
        contract: compiledOpenZeppelinAccount,
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
      const newAccount = new Account(provider, precalculatedAddress, privateKey);

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

    await provider.waitForTransaction(transaction_hash);
  });

  test('read balance of wallet after transfer', async () => {
    const { balance } = await erc20.balanceOf(account.address);

    expect(balance.low).toStrictEqual(toBigInt(990));
  });

  test('execute with and without deprecated abis parameter', async () => {
    const transaction = {
      contractAddress: erc20Address,
      entrypoint: 'transfer',
      calldata: [erc20.address, '10', '0'],
    };
    const details = { maxFee: 0n };

    await expect(account.execute(transaction, details)).rejects.toThrow(
      /zero|Transaction must commit to pay a positive amount on fee./
    );
    await expect(account.execute(transaction, undefined, details)).rejects.toThrow(
      /zero|Transaction must commit to pay a positive amount on fee./
    );
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

    await provider.waitForTransaction(transaction_hash);

    const response = await dapp.get_number(account.address);
    expect(toBigInt(response.number as string).toString()).toStrictEqual('57');
  });

  describeIfDevnet('EIP712 verification', () => {
    // currently only in Devnet-rs, because can fail in Sepolia.
    // to test in all cases once PR#989 implemented.
    test('sign and verify EIP712 message fail', async () => {
      const signature = await account.signMessage(typedDataExample);
      const [r, s] = stark.formatSignature(signature);

      // change the signature to make it invalid
      const r2 = toBigInt(r) + 123n;

      const signature2 = new Signature(toBigInt(r2.toString()), toBigInt(s));

      if (!signature2) return;

      const verifMessageResponse: boolean = await account.verifyMessage(
        typedDataExample,
        signature2
      );
      expect(verifMessageResponse).toBe(false);

      const wrongAccount = new Account(
        provider,
        '0x037891',
        '0x026789',
        undefined,
        TEST_TX_VERSION
      ); // non existing account
      await expect(wrongAccount.verifyMessage(typedDataExample, signature2)).rejects.toThrow();
    });

    test('sign and verify message', async () => {
      const signature = await account.signMessage(typedDataExample);
      const verifMessageResponse: boolean = await account.verifyMessage(
        typedDataExample,
        signature
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
      erc20.connect(account);
      expect(erc20.providerOrAccount).toBeInstanceOf(Account);
    });

    test('estimate gas fee for `mint`', async () => {
      const res = await erc20.estimateFee.mint(wallet, uint256('10'));
      expect(res).toHaveProperty('overall_fee');
    });

    test('Declare ERC20 contract', async () => {
      const declareTx = await account.declareIfNot({
        contract: compiledErc20,
        classHash: '0x54328a1075b8820eb43caf0caa233923148c983742402dcfc38541dd843d01a',
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
        contract: compiledErc20,
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
      const udcEvent = events.parseUDCEvent(txReceipt as any); // todo: when time fix types
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
      const udcEvent = events.parseUDCEvent(txReceipt as any); // todo: when time fix types
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

  describe('Estimate fee bulk & estimate fee', () => {
    let accountClassHash: string;
    let precalculatedAddress: string;
    let starkKeyPub: string;
    let newAccount: Account;

    beforeAll(async () => {
      const declareAccount = await account.declareIfNot({
        contract: compiledOpenZeppelinAccount,
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
      newAccount = new Account(provider, precalculatedAddress, privateKey);
    });

    test('estimateAccountDeployFee Cairo 0', async () => {
      /*       const { transaction_hash } = await account.execute({
        contractAddress: erc20Address,
        entrypoint: 'transfer',
        calldata: [precalculatedAddress, uint256(10)],
      });
      await provider.waitForTransaction(transaction_hash); */

      // const innerInvokeEstFeeSpy = jest.spyOn(account.signer, 'signTransaction');
      const result = await newAccount.estimateAccountDeployFee({
        classHash: accountClassHash,
        constructorCalldata: { publicKey: starkKeyPub },
        addressSalt: starkKeyPub,
        contractAddress: precalculatedAddress,
      });
      expect(result).toMatchSchemaRef('EstimateFee');
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
        expect(value).toMatchSchemaRef('EstimateFee');
      });
      expect(estimatedFeeBulk.length).toEqual(2);
      // expect(innerInvokeEstFeeSpy.mock.calls[0][1].version).toBe(feeTransactionVersion);
      // innerInvokeEstFeeSpy.mockClear();
    });

    test('deploy account & multi invoke functions', async () => {
      const { transaction_hash } = await account.execute({
        contractAddress: erc20Address,
        entrypoint: 'transfer',
        calldata: [precalculatedAddress, uint256(10)],
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
              calldata: { address: account.address, amount: uint256(10) },
            },
            {
              contractAddress: erc20Address,
              entrypoint: 'transfer',
              calldata: [account.address, uint256(10)],
            },
          ],
        },
      ]);
      expect(res).toHaveLength(2);
      res.forEach((value) => {
        expect(value).toMatchSchemaRef('EstimateFee');
      });
    });

    describeIfDevnet('declare tests only on devnet', () => {
      test('Manual: declare, deploy & multi invoke functions', async () => {
        /*
         * For Cairo0 and Cairo1 contracts re-declaration of the class throw an errors
         * as soo We first need to test is class is already declared
         */
        const isDeclaredCairo0 = await account.isClassDeclared({
          classHash: '0x54328a1075b8820eb43caf0caa233923148c983742402dcfc38541dd843d01a',
        });

        const hashes = extractContractHashes({
          contract: compiledHelloSierra,
          casm: compiledHelloSierraCasm,
        });

        const isDeclaredCairo1 = await account.isClassDeclared({ classHash: hashes.classHash });

        const invocations = [
          {
            type: TransactionType.INVOKE,
            payload: [
              {
                contractAddress: erc20Address,
                entrypoint: 'approve',
                calldata: {
                  address: erc20Address,
                  amount: uint256(10),
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
              classHash: '0x54328a1075b8820eb43caf0caa233923148c983742402dcfc38541dd843d01a',
              constructorCalldata: ['Token', 'ERC20', account.address],
            },
          },
          ...(!isDeclaredCairo0
            ? [
                {
                  // Cairo 0
                  type: TransactionType.DECLARE,
                  payload: {
                    contract: compiledErc20,
                    classHash: '0x54328a1075b8820eb43caf0caa233923148c983742402dcfc38541dd843d01a',
                  },
                },
              ]
            : []),
          ...(!isDeclaredCairo1
            ? [
                {
                  // Cairo 1.1.0, if declared estimate error with can't redeclare same contract
                  type: TransactionType.DECLARE,
                  contract: compiledHelloSierra,
                  casm: compiledHelloSierraCasm,
                },
              ]
            : []),
        ];

        const res = await account.estimateFeeBulk(invocations);
        res.forEach((value) => {
          expect(value).toMatchSchemaRef('EstimateFee');
        });
      });

      test('prepareInvocations: unordered declare, deploy & multi invoke', async () => {
        const invocations = await provider.prepareInvocations([
          {
            type: TransactionType.DEPLOY,
            payload: {
              classHash: '0x54328a1075b8820eb43caf0caa233923148c983742402dcfc38541dd843d01a',
              constructorCalldata: ['Token', 'ERC20', account.address],
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
                  amount: uint256(10),
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
            // Cairo 0
            type: TransactionType.DECLARE,
            payload: {
              contract: compiledErc20,
              classHash: '0x54328a1075b8820eb43caf0caa233923148c983742402dcfc38541dd843d01a',
            },
          },
          {
            // Cairo 1.1.0, if declared estimate error with can't redeclare same contract
            type: TransactionType.DECLARE,
            contract: compiledHelloSierra,
            casm: compiledHelloSierraCasm,
          },
        ]);

        const res = await account.estimateFeeBulk(invocations);
        res.forEach((value) => {
          expect(value).toMatchSchemaRef('EstimateFee');
        });
      });
    });

    // Order is important, declare c1 must be last else estimate and simulate will error
    // with contract already declared
    test('estimateInvokeFee Cairo 1', async () => {
      // TODO @dhruvkelawala check expectation for feeTransactionVersion
      // Cairo 1 contract
      const ddc1: DeclareDeployUDCResponse = await account.declareAndDeploy({
        contract: compiledHelloSierra,
        casm: compiledHelloSierraCasm,
      });

      // const innerInvokeEstFeeSpy = jest.spyOn(account.signer, 'signTransaction');
      const result = await account.estimateInvokeFee({
        contractAddress: ddc1.deploy.address,
        entrypoint: 'increase_balance',
        calldata: [100],
      });

      expect(result).toMatchSchemaRef('EstimateFee');
      // expect(innerInvokeEstFeeSpy.mock.calls[0][1].version).toBe(feeTransactionVersion);
      // innerInvokeEstFeeSpy.mockClear();
    });
  });
});

describe('unit', () => {
  describeIfDevnet('Devnet', () => {
    initializeMatcher(expect);
    const provider = getTestProvider();
    const account = getTestAccount(provider);

    test('declareIfNot', async () => {
      const declare = await account.declareIfNot({
        contract: compiledHelloSierra,
        casm: compiledHelloSierraCasm,
      });
      expect(declare).toMatchSchemaRef('DeclareContractResponse');

      await expect(
        account.declare({
          contract: compiledHelloSierra,
          casm: compiledHelloSierraCasm,
        })
      ).rejects.toThrow();

      const redeclare = await account.declareIfNot({
        contract: compiledHelloSierra,
        casm: compiledHelloSierraCasm,
      });
      expect(redeclare.class_hash).toBe(declare.class_hash);
    });
  });
});
