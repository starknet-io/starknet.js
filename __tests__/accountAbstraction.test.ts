// tests of handling of accounts including account abstraction about hashes and signatures
import {
  AbstractedSigner,
  AbstractionFunctions,
  Account,
  ArraySignatureType,
  BigNumberish,
  Call,
  CallData,
  Calldata,
  Contract,
  DeclareSignerDetails,
  DeployAccountSignerDetails,
  Provider,
  RawCalldata,
  Signature,
  TypedData,
  cairo,
  constants,
  ec,
  encode,
  hash,
  typedData,
} from '../src';
import {
  compiledAccountAbstractionCasm,
  compiledAccountAbstractionSierra,
  compiledDummy1Casm,
  compiledDummy1Sierra,
  compiledDummy2Casm,
  compiledDummy2Sierra,
  compiledErc20Echo,
  getTestAccount,
  getTestProvider,
} from './fixtures';
import { initializeMatcher } from './schema';
import { ethAddress } from './utils/utils.test';

describe('Test account abstraction of Cairo 1 account', () => {
  const provider = new Provider(getTestProvider());
  const account0 = getTestAccount(provider);
  const privateKeyAbstraction = '0x7aadb6605c9538199797920884694b5ce84fc68f92c832b0';
  const starkKeyPubAbstraction = ec.starkCurve.getStarkKey(privateKeyAbstraction);
  const fullPublicKey = encode.addHexPrefix(
    encode.buf2hex(ec.starkCurve.getPublicKey(privateKeyAbstraction, false))
  );

  let accountAbstraction: Account;

  beforeAll(async () => {
    initializeMatcher(expect);
    expect(account0).toBeInstanceOf(Account);
    // abstraction definition :
    function signDeployAccount(
      standardInputData: DeployAccountSignerDetails,
      privateKey: string,
      ...additionalParams: string[]
    ): Signature {
      if (additionalParams.length < 3) {
        throw new Error(
          `Abstracted deploy account signer is waiting 3 additional parameters. Got: ${additionalParams.length} params!`
        );
      }
      const signer2FA = additionalParams;

      const txnHash = hash.computeHashOnElements([
        hash.calculateDeployAccountTransactionHash(
          standardInputData.contractAddress,
          standardInputData.classHash,
          CallData.compile(standardInputData.constructorCalldata),
          standardInputData.addressSalt,
          standardInputData.version,
          standardInputData.maxFee,
          standardInputData.chainId,
          standardInputData.nonce
        ),
        ...signer2FA, // the smart contract will check that the 2FA is 0x01, 0x02, 0x03
      ]);

      const { r, s } = ec.starkCurve.sign(txnHash, privateKey);
      const signature = [r.toString(), s.toString(), ...signer2FA];
      return signature;
    }

    function signTransaction(
      standardInputData: {
        contractAddress: BigNumberish;
        version: BigNumberish;
        calldata: RawCalldata;
        maxFee: BigNumberish;
        chainId: constants.StarknetChainId;
        nonce: BigNumberish;
      },
      privateKey: string,
      ...additionalParams: string[]
    ): Signature {
      if (additionalParams.length < 3) {
        throw new Error(
          `Abstracted transaction signer is waiting 3 additional parameters. Got: ${additionalParams.length} params!`
        );
      }
      const signer2FA = additionalParams;

      const txnHash = hash.computeHashOnElements([
        hash.calculateTransactionHash(
          standardInputData.contractAddress,
          standardInputData.version,
          standardInputData.calldata,
          standardInputData.maxFee,
          standardInputData.chainId,
          standardInputData.nonce
        ),
        ...signer2FA, // the smart contract will check that the 2FA is 0x04, 0x05, 0x06
      ]);

      const { r, s } = ec.starkCurve.sign(txnHash, privateKey);
      const signature = [r.toString(), s.toString(), ...signer2FA];
      return signature;
    }

    function signDeclare(
      standardInputData: DeclareSignerDetails,
      privateKey: string,
      ...additionalParams: string[]
    ): Signature {
      if (additionalParams.length < 3) {
        throw new Error(
          `Abstracted declare signer is waiting 3 additional parameters. Got: ${additionalParams.length} params!`
        );
      }
      const signer2FA = additionalParams;

      const txnHash = hash.computeHashOnElements([
        hash.calculateDeclareTransactionHash(
          standardInputData.classHash,
          standardInputData.senderAddress,
          standardInputData.version,
          standardInputData.maxFee,
          standardInputData.chainId,
          standardInputData.nonce,
          standardInputData.compiledClassHash
        ),
        ...signer2FA, // the smart contract will check that the 2FA is 0x07, 0x08, 0x09
      ]);

      const { r, s } = ec.starkCurve.sign(txnHash, privateKey);
      const signature = [r.toString(), s.toString(), ...signer2FA];
      return signature;
    }

    function hashMessage(
      eip712json: TypedData,
      accountAddress: string,
      ...additionalParams: string[]
    ): string {
      if (additionalParams.length < 3) {
        throw new Error(
          `Abstracted message hasher is waiting 3 additional parameters. Got: ${additionalParams.length} params!`
        );
      }
      const signer2FA = additionalParams;
      const msgHash = hash.computeHashOnElements([
        typedData.getMessageHash(eip712json, accountAddress),
        ...signer2FA, // the smart contract will check that the 2FA is 0x0a, 0x0b, 0x0c
      ]);
      return msgHash;
    }

    function signMessage(
      msgHash: string,
      privateKey: string,
      ...additionalParams: string[]
    ): Signature {
      if (additionalParams.length < 3) {
        throw new Error(
          `Abstracted message signer is waiting 3 additional parameters. Got: ${additionalParams.length} params!`
        );
      }
      const signer2FA = additionalParams;
      const { r, s } = ec.starkCurve.sign(msgHash, privateKey);
      const signature = [r.toString(), s.toString(), ...signer2FA]; // the smart contract will check that the 2FA is 0x0a, 0x0b, 0x0c
      return signature;
    }

    const abstractionFns: AbstractionFunctions = {
      abstractedDeployAccountSign: signDeployAccount,
      abstractedTransactionSign: signTransaction,
      abstractedDeclareSign: signDeclare,
      abstractedMessageHash: hashMessage,
      abstractedMessageSign: signMessage,
    };

    // declare account abstraction
    const declareResponse = await account0.declare({
      contract: compiledAccountAbstractionSierra,
      casm: compiledAccountAbstractionCasm,
    });
    const classHashContract = declareResponse.class_hash;
    const signerAbstraction = new AbstractedSigner(privateKeyAbstraction, abstractionFns);
    const addressAbstraction = hash.calculateContractAddressFromHash(
      starkKeyPubAbstraction,
      classHashContract,
      [starkKeyPubAbstraction],
      0
    );
    accountAbstraction = new Account(provider, addressAbstraction, signerAbstraction, '1');

    // fund account abstraction
    const call1: Call = {
      contractAddress: ethAddress,
      entrypoint: 'transfer',
      calldata: CallData.compile({
        recipient: addressAbstraction,
        amount: cairo.uint256(1_000_000_000_000_000_000),
      }),
    };
    const { transaction_hash: th1 } = await account0.execute(call1);
    await provider.waitForTransaction(th1);

    // deploy account abstraction
    const constructor: Calldata = CallData.compile([starkKeyPubAbstraction]);

    const { transaction_hash: th2 } = await accountAbstraction.deployAccount(
      {
        classHash: classHashContract,
        constructorCalldata: constructor,
        contractAddress: addressAbstraction,
        addressSalt: starkKeyPubAbstraction,
      },
      { maxFee: 100_000_000_000_000_000n },
      1, // inputs for abstraction of deploy account are here
      2,
      3
    );
    const tr1 = await provider.waitForTransaction(th2);
    expect(tr1).toHaveProperty('execution_status', 'SUCCEEDED');
  });

  describe('Account abstraction', () => {
    test('Abstracted txs', async () => {
      const contractETH = new Contract(compiledErc20Echo.abi, ethAddress, provider);
      contractETH.connect(accountAbstraction);

      const { transaction_hash: th1 } = await contractETH.invoke(
        'transfer',
        [account0.address, cairo.uint256(200_000)],
        undefined,
        4, // inputs for abstraction of transaction are here
        5,
        6
      );
      const tr1 = await provider.waitForTransaction(th1);
      expect(tr1).toHaveProperty('execution_status', 'SUCCEEDED');

      const call2 = contractETH.populate('transfer', {
        recipient: account0.address,
        amount: cairo.uint256(300_000),
      });
      const { transaction_hash: th2 } = await accountAbstraction.execute(
        call2,
        undefined,
        undefined,
        4, // inputs for abstraction of transaction are here
        5,
        6
      );
      const tr2 = await provider.waitForTransaction(th2);
      expect(tr2).toHaveProperty('execution_status', 'SUCCEEDED');
    });

    test('Abstracted declare then deploy', async () => {
      // declare
      const declareResponse = await accountAbstraction.declare(
        { contract: compiledDummy1Sierra, casm: compiledDummy1Casm },
        undefined,
        7, // inputs for abstraction of declare are here
        8,
        9
      );
      const classHashDummy1 = declareResponse.class_hash;
      const tr3 = await provider.waitForTransaction(declareResponse.transaction_hash);
      expect(tr3).toHaveProperty('execution_status', 'SUCCEEDED');

      // deploy
      const respDeploy = await accountAbstraction.deploy(
        {
          classHash: classHashDummy1,
        },
        undefined,
        4, // inputs for abstraction of deploy are here.
        5, // deploy is handled as a transaction.
        6
      );
      const tr4 = await provider.waitForTransaction(respDeploy.transaction_hash);
      expect(tr4).toHaveProperty('execution_status', 'SUCCEEDED');
    });

    test('Abstracted declareAndDeploy', async () => {
      // declareAndDeploy
      const response = await accountAbstraction.declareAndDeploy(
        { contract: compiledDummy2Sierra, casm: compiledDummy2Casm },
        undefined,
        [7, 8, 9], // abstraction for declare
        [4, 5, 6] //  abstraction for deploy
      );
      const tr4 = await provider.waitForTransaction(response.deploy.transaction_hash);
      expect(tr4).toHaveProperty('execution_status', 'SUCCEEDED');
    });

    test('Abstracted messages', async () => {
      const typedDataValidate: TypedData = {
        domain: {
          chainId: 'Starknet Mainnet',
          name: 'Dappland',
          version: '1.0',
        },
        message: {
          MessageId: 345,
          From: {
            Name: 'Edmund',
            Address: '0x7e00d496e324876bbc8531f2d9a82bf154d1a04a50218ee74cdd372f75a551a',
          },
          To: {
            Name: 'Alice',
            Address: '0x69b49c2cc8b16e80e86bfc5b0614a59aa8c9b601569c7b80dde04d3f3151b79',
          },
          Nft_to_transfer: {
            Collection: 'Stupid monkeys',
            Address: '0x69b49c2cc8b16e80e86bfc5b0614a59aa8c9b601569c7b80dde04d3f3151b79',
            Nft_id: 112,
            Negotiated_for: {
              Qty: '18.4569325643',
              Unit: 'ETH',
              Token_address: '0x69b49c2cc8b16e80e86bfc5b0614a59aa8c9b601569c7b80dde04d3f3151b79',
              Amount: 18456932564300000000n,
            },
          },
          Comment1: 'Monkey with banana, sunglasses,',
          Comment2: 'and red hat.',
          Comment3: '',
        },
        primaryType: 'TransferERC721',
        types: {
          Account1: [
            {
              name: 'Name',
              type: 'string',
            },
            {
              name: 'Address',
              type: 'felt',
            },
          ],
          Nft: [
            {
              name: 'Collection',
              type: 'string',
            },
            {
              name: 'Address',
              type: 'felt',
            },
            {
              name: 'Nft_id',
              type: 'felt',
            },
            {
              name: 'Negotiated_for',
              type: 'Transaction',
            },
          ],
          Transaction: [
            {
              name: 'Qty',
              type: 'string',
            },
            {
              name: 'Unit',
              type: 'string',
            },
            {
              name: 'Token_address',
              type: 'felt',
            },
            {
              name: 'Amount',
              type: 'felt',
            },
          ],
          TransferERC721: [
            {
              name: 'MessageId',
              type: 'felt',
            },
            {
              name: 'From',
              type: 'Account1',
            },
            {
              name: 'To',
              type: 'Account1',
            },
            {
              name: 'Nft_to_transfer',
              type: 'Nft',
            },
            {
              name: 'Comment1',
              type: 'string',
            },
            {
              name: 'Comment2',
              type: 'string',
            },
            {
              name: 'Comment3',
              type: 'string',
            },
          ],
          StarkNetDomain: [
            {
              name: 'name',
              type: 'string',
            },
            {
              name: 'chainId',
              type: 'felt',
            },
            {
              name: 'version',
              type: 'string',
            },
          ],
        },
      };
      const signature = await accountAbstraction.signMessage(typedDataValidate, 10, 11, 12); // inputs for abstraction of message are here
      const sign = signature as ArraySignatureType;
      const res1: boolean = await accountAbstraction.verifyMessage(
        typedDataValidate,
        signature,
        10, // inputs for abstraction of message are here
        11,
        12
      ); // in Starknet network
      expect(res1).toBeTruthy();
      const msgHash2 = await accountAbstraction.hashMessage(typedDataValidate, 10, 11, 12); // in Starknet.js
      const res2: boolean = await accountAbstraction.verifyMessageHash(msgHash2, signature); // in Starknet network
      expect(res2).toBeTruthy();
      const res3: boolean = await accountAbstraction.verifyMessageLocally(
        typedDataValidate,
        sign,
        fullPublicKey,
        10,
        11,
        12
      );
      expect(res3).toBeTruthy();
    });
  });
});
