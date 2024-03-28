import typedDataExample from '../../__mocks__/typedData/baseExample.json';
import {
  Account,
  CallData,
  Contract,
  EthSigner,
  Provider,
  addAddressPadding,
  cairo,
  encode,
  eth,
  hash,
  num,
  stark,
} from '../../src';
import { validateAndParseEthAddress } from '../../src/utils/eth';
import { ETransactionVersion } from '../../src/types/api';
import {
  compiledDummy1Eth,
  compiledDummy1EthCasm,
  compiledDummy2Eth,
  compiledDummy2EthCasm,
  compiledErc20,
  compiledEthAccount,
  compiledEthCasm,
  compiledEthPubk,
  compiledEthPubkCasm,
  getTestAccount,
  getTestProvider,
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
    const provider = new Provider(getTestProvider());
    let ethPubKContract: Contract;
    const account = getTestAccount(provider);

    beforeAll(async () => {
      const { deploy } = await account.declareAndDeploy({
        contract: compiledEthPubk,
        casm: compiledEthPubkCasm,
      });

      ethPubKContract = new Contract(compiledEthPubk.abi, deploy.contract_address, account);
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

  describe('ETH account tx V2', () => {
    const provider = new Provider(getTestProvider());
    const account = getTestAccount(provider);
    const devnetETHtokenAddress =
      '0x49D36570D4E46F48E99674BD3FCC84644DDD6B96F7C741B1562B82F9E004DC7';
    let ethAccount: Account;
    beforeAll(async () => {
      const { transaction_hash: declTH, class_hash: decClassHash } = await account.declareIfNot({
        contract: compiledEthAccount,
        casm: compiledEthCasm,
      });
      if (declTH) {
        await provider.waitForTransaction(declTH);
      }
      const privateKeyETH = '0x45397ee6ca34cb49060f1c303c6cb7ee2d6123e617601ef3e31ccf7bf5bef1f9';
      const ethSigner = new EthSigner(privateKeyETH);
      const ethFullPublicKey = await ethSigner.getPubKey();
      const pubKeyETHx = cairo.uint256(
        addAddressPadding(encode.addHexPrefix(ethFullPublicKey.slice(4, -64)))
      );
      const salt = pubKeyETHx.low;
      const myCallData = new CallData(compiledEthAccount.abi);
      const accountETHconstructorCalldata = myCallData.compile('constructor', {
        public_key: ethFullPublicKey,
      });
      const contractETHAccountAddress = hash.calculateContractAddressFromHash(
        salt,
        decClassHash,
        accountETHconstructorCalldata,
        0
      );

      // fund account with ETH
      const { transaction_hash } = await account.execute({
        contractAddress: devnetETHtokenAddress,
        entrypoint: 'transfer',
        calldata: {
          recipient: contractETHAccountAddress,
          amount: cairo.uint256(5 * 10 ** 17),
        },
      });
      await account.waitForTransaction(transaction_hash);

      ethAccount = new Account(provider, contractETHAccountAddress, ethSigner);
      const deployPayload = {
        classHash: decClassHash,
        constructorCalldata: accountETHconstructorCalldata,
        addressSalt: salt,
      };
      const { suggestedMaxFee: feeDeploy } =
        await ethAccount.estimateAccountDeployFee(deployPayload);
      const { transaction_hash: txH2, contract_address } = await ethAccount.deployAccount(
        deployPayload,
        { maxFee: stark.estimatedFeeToMaxFee(feeDeploy, 100) }
      );
      await provider.waitForTransaction(txH2);
      expect(contract_address).toBe(contractETHAccountAddress);
    });

    test('ETH account transaction V2', async () => {
      const ethContract2 = new Contract(compiledErc20.abi, devnetETHtokenAddress, ethAccount);
      const respTransfer = await ethContract2.transfer(
        account.address,
        cairo.uint256(2 * 10 ** 16),
        { maxFee: 1 * 10 ** 16 }
      );
      const txR = await provider.waitForTransaction(respTransfer.transaction_hash);

      if (txR.isSuccess()) {
        expect(txR.execution_status).toBe('SUCCEEDED');
      } else {
        fail('txR not success');
      }
    });

    test('ETH account declaration V2', async () => {
      const accountTestSierra = compiledDummy1Eth;
      const accountTestCasm = compiledDummy1EthCasm;
      const { transaction_hash: declTH2, class_hash: decClassHash2 } =
        await ethAccount.declareIfNot(
          { contract: accountTestSierra, casm: accountTestCasm },
          { maxFee: 1 * 10 ** 16 }
        );
      if (declTH2) {
        await provider.waitForTransaction(declTH2);
      }
      expect(decClassHash2).toBe(
        '0x4f8989ac63c9266a3038eee607c23a4496210e426ce01079cdda6faad1d7733'
      );
    });
  });

  describe('ETH account tx V3', () => {
    const provider = new Provider(getTestProvider());
    const account = getTestAccount(provider);
    const devnetSTRKtokenAddress =
      '0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d';
    let ethAccount: Account;
    beforeAll(async () => {
      const { transaction_hash: declTH, class_hash: decClassHash } = await account.declareIfNot({
        contract: compiledEthAccount,
        casm: compiledEthCasm,
      });
      if (declTH) {
        await provider.waitForTransaction(declTH);
      }
      const privateKeyETH = '0x525bc68475c0955fae83869beec0996114d4bb27b28b781ed2a20ef23121b8de';
      const ethSigner = new EthSigner(privateKeyETH);
      const ethFullPublicKey = await ethSigner.getPubKey();
      const pubKeyETHx = cairo.uint256(
        addAddressPadding(encode.addHexPrefix(ethFullPublicKey.slice(4, -64)))
      );
      const salt = pubKeyETHx.low;
      const myCallData = new CallData(compiledEthAccount.abi);
      const accountETHconstructorCalldata = myCallData.compile('constructor', {
        public_key: ethFullPublicKey,
      });

      const contractETHAccountAddress = hash.calculateContractAddressFromHash(
        salt,
        decClassHash,
        accountETHconstructorCalldata,
        0
      );

      // fund account with STRK
      const { transaction_hash } = await account.execute({
        contractAddress: devnetSTRKtokenAddress,
        entrypoint: 'transfer',
        calldata: {
          recipient: contractETHAccountAddress,
          amount: cairo.uint256(5 * 10 ** 17),
        },
      });
      await account.waitForTransaction(transaction_hash);

      ethAccount = new Account(
        provider,
        contractETHAccountAddress,
        ethSigner,
        undefined,
        ETransactionVersion.V3
      );
      const feeEstimation = await ethAccount.estimateAccountDeployFee({
        classHash: decClassHash,
        addressSalt: salt,
        constructorCalldata: accountETHconstructorCalldata,
      });
      const { transaction_hash: txH2, contract_address } = await ethAccount.deployAccount(
        {
          classHash: decClassHash,
          constructorCalldata: accountETHconstructorCalldata,
          addressSalt: salt,
        },
        {
          resourceBounds: {
            l2_gas: { max_amount: '0x0', max_price_per_unit: '0x0' },
            l1_gas: {
              max_amount: num.toHex(BigInt(feeEstimation.resourceBounds.l1_gas.max_amount) * 2n),
              max_price_per_unit: num.toHex(
                BigInt(feeEstimation.resourceBounds.l1_gas.max_price_per_unit) * 2n
              ),
            },
          },
        }
      );
      await provider.waitForTransaction(txH2);
      expect(contract_address).toBe(contractETHAccountAddress);
    });

    test('ETH account transaction V3', async () => {
      const ethContract2 = new Contract(compiledErc20.abi, devnetSTRKtokenAddress, ethAccount);
      const txCallData = ethContract2.populate('transfer', [
        account.address,
        cairo.uint256(1 * 10 ** 15),
      ]);
      const feeTransfer = await ethAccount.estimateInvokeFee(txCallData);
      const respTransfer = await ethAccount.execute(txCallData, undefined, {
        resourceBounds: {
          l2_gas: { max_amount: '0x0', max_price_per_unit: '0x0' },
          l1_gas: {
            max_amount: num.toHex(
              stark.estimatedFeeToMaxFee(feeTransfer.resourceBounds.l1_gas.max_amount, 150)
            ),
            max_price_per_unit: num.toHex(
              stark.estimatedFeeToMaxFee(feeTransfer.resourceBounds.l1_gas.max_price_per_unit, 150)
            ),
          },
        },
      });

      const txR = await provider.waitForTransaction(respTransfer.transaction_hash);
      if (txR.isSuccess()) {
        expect(txR.execution_status).toBe('SUCCEEDED');
      } else {
        fail('txR not success');
      }
    });

    test('ETH account declaration V3', async () => {
      const accountTestSierra = compiledDummy2Eth;
      const accountTestCasm = compiledDummy2EthCasm;
      const feeDeclare = await ethAccount.estimateDeclareFee({
        contract: accountTestSierra,
        casm: accountTestCasm,
      });
      const { transaction_hash: declTH2, class_hash: decClassHash2 } =
        await ethAccount.declareIfNot(
          { contract: accountTestSierra, casm: accountTestCasm },
          {
            resourceBounds: {
              l2_gas: { max_amount: '0x0', max_price_per_unit: '0x0' },
              l1_gas: {
                max_amount: num.toHex(BigInt(feeDeclare.resourceBounds.l1_gas.max_amount) * 2n),
                max_price_per_unit: num.toHex(
                  BigInt(feeDeclare.resourceBounds.l1_gas.max_price_per_unit) * 2n
                ),
              },
            },
          }
        );
      if (declTH2) {
        await provider.waitForTransaction(declTH2);
      }
      expect(decClassHash2).toBe(
        '0x5d574bd1467f1ca5178c118be7cdb3e74718c37bae90ab686a9b8536ca24436'
      );
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
