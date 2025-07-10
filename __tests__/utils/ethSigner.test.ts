import typedDataExample from '../../__mocks__/typedData/baseExample.json';
import {
  Account,
  CallData,
  Contract,
  EthSigner,
  Provider,
  ProviderInterface,
  addAddressPadding,
  cairo,
  encode,
  eth,
  extractContractHashes,
  getLedgerPathBuffer111,
  getLedgerPathBuffer221,
  hash,
  num,
  type DeclareContractPayload,
} from '../../src';
import { validateAndParseEthAddress } from '../../src/utils/eth';
import {
  contracts,
  createTestProvider,
  describeIfDevnet,
  getTestAccount,
  STRKtokenAddress,
} from '../config/fixtures';

describe('Ethereum signer', () => {
  describe('signer', () => {
    test('Generates random PK', () => {
      const privK = eth.ethRandomPrivateKey();
      expect(privK.length).toBe(66);
      expect(num.isHex(privK)).toBe(true);
    });

    test('Generates pubKey', async () => {
      const mySigner = new EthSigner(
        '0x525bc68475c0955fae83869beec0996114d4bb27b28b781ed2a20ef23121b8de'
      );
      expect(await mySigner.getPubKey()).toBe(
        '0x0178bb97615b49070eefad71cb2f159392274404e41db748d9397147cb25cf597ebfcf2f399e635b72b99b8f76e9080763c65a42c842869815039d912150ddfe'
      ); // full public key 512 bits
    });

    test('Message signature', async () => {
      const myPrivateKey = '0x525bc68475c0955fae83869beec0996114d4bb27b28b781ed2a20ef23121b8de';
      const myEthSigner = new EthSigner(myPrivateKey);
      const message = typedDataExample;
      const sig = await myEthSigner.signMessage(
        message,
        '0x65a822fbee1ae79e898688b5a4282dc79e0042cbed12f6169937fddb4c26641'
      );
      expect(sig).toMatchObject([
        '0xff887f391242bb244e9e10d5da01cb8a',
        '0x665e69338d4e0772039d4a032b01b07b',
        '0xf84a88e94cabba842ab4accf8adc0200',
        '0x61c82a3a2f1a9340620e634bebecb20b',
        '0x1',
      ]);
    });
  });

  describe('cairo v2.5.3 new secp256k1 type', () => {
    let provider: ProviderInterface;
    let account: Account;
    let ethPubKContract: Contract;

    beforeAll(async () => {
      provider = new Provider(await createTestProvider());
      account = getTestAccount(provider);

      const { deploy } = await account.declareAndDeploy({
        contract: contracts.EthPubk.sierra,
        casm: contracts.EthPubk.casm,
      });

      ethPubKContract = new Contract(
        contracts.EthPubk.sierra.abi,
        deploy.contract_address,
        account
      );
    });

    test('secp256k1', async () => {
      const myCallData = new CallData(ethPubKContract.abi);
      const ethPubKey =
        '0x8c7aea7d673a5858bdca128d124fb0765cceb2c16f198f4c14b328aa571331e6f6c87f51d5224d73d118765cb19d7565212f80be5048bff926ba791c17541c92';
      const resp3 = await ethPubKContract.test_public_key(ethPubKey);
      expect(num.toHex(resp3)).toBe(ethPubKey);
      const calldata1 = myCallData.compile('test_public_key', [ethPubKey]);
      const resp4 = (await ethPubKContract.call('test_public_key', [calldata1])) as bigint;

      expect(num.toHex(resp4)).toBe(ethPubKey);
      const resp5 = (await ethPubKContract.call('test_public_key', calldata1)) as bigint;
      expect(num.toHex(resp5)).toBe(ethPubKey);
    });
  });

  describeIfDevnet('ETH account tx V3', () => {
    // devnet only because fee cost is high
    let provider: Provider;
    let account: Account;
    let ethAccount: Account;

    beforeAll(async () => {
      provider = new Provider(await createTestProvider());
      account = getTestAccount(provider);

      const { transaction_hash: declTH, class_hash: decClassHash } = await account.declareIfNot({
        contract: contracts.EthAccount.sierra,
        casm: contracts.EthAccount.casm,
      });
      if (declTH) {
        await provider.waitForTransaction(declTH);
      }
      const privateKeyETH = eth.ethRandomPrivateKey();
      const ethSigner = new EthSigner(privateKeyETH);
      const ethFullPublicKey = await ethSigner.getPubKey();
      const pubKeyETHx = cairo.uint256(
        addAddressPadding(encode.addHexPrefix(ethFullPublicKey.slice(4, -64)))
      );
      const salt = pubKeyETHx.low;
      const myCallData = new CallData(contracts.EthAccount.sierra.abi);
      const accountETHconstructorCalldata = myCallData.compile('constructor', {
        public_key: ethFullPublicKey,
      });

      const contractETHAccountAddress = hash.calculateContractAddressFromHash(
        salt,
        decClassHash,
        accountETHconstructorCalldata,
        0
      );

      ethAccount = new Account(provider, contractETHAccountAddress, ethSigner);
      const feeEstimation = await ethAccount.estimateAccountDeployFee({
        classHash: decClassHash,
        addressSalt: salt,
        constructorCalldata: accountETHconstructorCalldata,
      });
      // fund account with STRK
      const { transaction_hash } = await account.execute({
        contractAddress: STRKtokenAddress,
        entrypoint: 'transfer',
        calldata: {
          recipient: contractETHAccountAddress,
          amount: cairo.uint256(1n * 10n ** 18n), // 1 STRK of fees
        },
      });
      await account.waitForTransaction(transaction_hash);
      const { transaction_hash: txH2, contract_address } = await ethAccount.deployAccount(
        {
          classHash: decClassHash,
          constructorCalldata: accountETHconstructorCalldata,
          addressSalt: salt,
        },
        {
          resourceBounds: {
            l2_gas: {
              max_amount: BigInt(feeEstimation.resourceBounds.l2_gas.max_amount) * 20n,
              max_price_per_unit:
                BigInt(feeEstimation.resourceBounds.l2_gas.max_price_per_unit) * 20n,
            },
            l1_gas: {
              max_amount: (BigInt(feeEstimation.resourceBounds.l1_gas.max_amount) + 20n) * 20n,
              max_price_per_unit:
                BigInt(feeEstimation.resourceBounds.l1_gas.max_price_per_unit) * 20n,
            },
            l1_data_gas: {
              max_amount: BigInt(feeEstimation.resourceBounds.l1_data_gas!.max_amount) * 20n,
              max_price_per_unit:
                BigInt(feeEstimation.resourceBounds.l1_data_gas!.max_price_per_unit) * 20n,
            },
          },
        }
      );
      await provider.waitForTransaction(txH2);
      expect(contract_address).toBe(contractETHAccountAddress);
    });

    test('ETH account transaction V3', async () => {
      const strkContract2 = new Contract(
        contracts.Erc20OZ.sierra.abi,
        STRKtokenAddress,
        ethAccount
      );
      const txCallData = strkContract2.populate('transfer', [
        account.address,
        cairo.uint256(1 * 10 ** 4),
      ]);
      const feeEstimation = await ethAccount.estimateInvokeFee(txCallData, { skipValidate: false });
      const respTransfer = await ethAccount.execute(txCallData, {
        resourceBounds: feeEstimation.resourceBounds,
      });

      const txR = await provider.waitForTransaction(respTransfer.transaction_hash);
      if (txR.isSuccess()) {
        expect((txR as any).execution_status).toBe('SUCCEEDED');
      } else {
        fail('txR not success');
      }
    });

    test('ETH account declaration V3', async () => {
      const accountTestSierra = contracts.Dummy2Eth.sierra;
      const accountTestCasm = contracts.Dummy2Eth.casm;
      const payload: DeclareContractPayload = {
        contract: accountTestSierra,
        casm: accountTestCasm,
      };
      const declareContractPayload = extractContractHashes(payload);
      try {
        await provider.getClassByHash(declareContractPayload.classHash);
        expect(true).toBeTruthy(); // test skipped if class already declared
      } catch {
        const feeEstimation = await ethAccount.estimateDeclareFee(payload, { skipValidate: false });
        const { transaction_hash: declTH2, class_hash: decClassHash2 } = await ethAccount.declare(
          payload,
          {
            resourceBounds: {
              l2_gas: {
                max_amount: BigInt(feeEstimation.resourceBounds.l2_gas.max_amount) * 2n,
                max_price_per_unit:
                  BigInt(feeEstimation.resourceBounds.l2_gas.max_price_per_unit) * 2n,
              },
              l1_gas: {
                max_amount: BigInt(feeEstimation.resourceBounds.l1_gas.max_amount) * 2n,
                max_price_per_unit:
                  BigInt(feeEstimation.resourceBounds.l1_gas.max_price_per_unit) * 2n,
              },
              l1_data_gas: {
                max_amount: BigInt(feeEstimation.resourceBounds.l1_data_gas!.max_amount) * 2n,
                max_price_per_unit:
                  BigInt(feeEstimation.resourceBounds.l1_data_gas!.max_price_per_unit) * 2n,
              },
            },
          }
        );
        await provider.waitForTransaction(declTH2);
        expect(decClassHash2).toBe(
          '0x5d574bd1467f1ca5178c118be7cdb3e74718c37bae90ab686a9b8536ca24436'
        );
      }
    });
  });
  describe('Ethereum address', () => {
    test('Eth address format', async () => {
      const ethAddr = '0x8359E4B0152ed5A731162D3c7B0D8D56edB165'; // not a valid 20 bytes ETh address
      expect(validateAndParseEthAddress(ethAddr)).toBe(
        '0x008359e4b0152ed5a731162d3c7b0d8d56edb165'
      );
      expect(validateAndParseEthAddress(BigInt(ethAddr))).toBe(
        '0x008359e4b0152ed5a731162d3c7b0d8d56edb165'
      );
      expect(validateAndParseEthAddress(BigInt(ethAddr).toString(10))).toBe(
        '0x008359e4b0152ed5a731162d3c7b0d8d56edb165'
      );
    });
  });
});

describe('Ledger Signer', () => {
  // signature of Ledger can't be tested automatically.
  // So, just the test of the path encoding.

  // Ledger APP v1.1.1
  test('getLedgerPathBuffer111', () => {
    const path = getLedgerPathBuffer111(3, 'AstroAPP');
    expect(path).toEqual(
      new Uint8Array([
        128, 0, 10, 85, 71, 65, 233, 201, 95, 192, 123, 107, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0,
      ])
    );
  });

  // Ledger APP v2.2.1
  test('getLedgerPathBuffer', () => {
    const path = getLedgerPathBuffer221(3, 'AstroAPP');
    expect(path).toEqual(
      new Uint8Array([
        128, 0, 10, 85, 199, 65, 233, 201, 223, 192, 123, 107, 128, 0, 0, 0, 128, 0, 0, 3, 0, 0, 0,
        0,
      ])
    );
  });
});
