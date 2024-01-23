import typedDataExample from '../../__mocks__/typedDataExample.json';
import {
  Call,
  DeclareSignerDetails,
  DeployAccountSignerDetails,
  EthSigner,
  InvocationsSignerDetails,
  RPC,
  constants,
  eth,
  num,
  stark,
} from '../../src';

describe('Ethereum signatures', () => {
  describe('privk, pubK', () => {
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
        '0x020178bb97615b49070eefad71cb2f159392274404e41db748d9397147cb25cf59'
      );
    });
  });

  describe('Signatures', () => {
    test('Message signature', async () => {
      const myPrivateKey = '0x525bc68475c0955fae83869beec0996114d4bb27b28b781ed2a20ef23121b8de';
      const myEthSigner = new EthSigner(myPrivateKey);
      const message = typedDataExample;
      const sig = await myEthSigner.signMessage(
        message,
        '0x65a822fbee1ae79e898688b5a4282dc79e0042cbed12f6169937fddb4c26641'
      );
      expect(sig).toMatchObject({
        r: 46302720252787165203319064060867586811009528414735725622252684979112343882634n,
        s: 44228007167516598548621407232357037139087111723794788802261070080184864735744n,
        recovery: 1,
      });
    });

    // TODO : To update when a contract account handling ETHEREUM signatures will be available.
    test('Transaction signature', async () => {
      const myPrivateKey = '0x525bc68475c0955fae83869beec0996114d4bb27b28b781ed2a20ef23121b8de';
      const myEthSigner = new EthSigner(myPrivateKey);
      const myCall: Call = {
        contractAddress: '0x65a822fbee1ae79e898688b5a4282dc79e0042cbed12f6169937fddb4c26641',
        entrypoint: 'test',
        calldata: [1, 2],
      };
      const sig = await myEthSigner.signTransaction([myCall], {
        version: '0x2',
        walletAddress: '0x64b48806902a367c8598f4f95c305e8c1a1acba5f082d294a43793113115691',
        cairoVersion: '1',
        chainId: constants.StarknetChainId.SN_SEPOLIA,
        nonce: 45,
        maxFee: 10 ** 15,
      } as InvocationsSignerDetails);
      expect(sig).toMatchObject({
        r: 7985353442887841088086521795914083018399735702575968460096442990678259802335n,
        s: 54448706138210541940611627632626053501325595041277792020051079616748389329289n,
        recovery: 0,
      });
    });

    test('Deploy account signature', async () => {
      const myPrivateKey = '0x525bc68475c0955fae83869beec0996114d4bb27b28b781ed2a20ef23121b8de';
      const myEthSigner = new EthSigner(myPrivateKey);
      const myDeployAcc: DeployAccountSignerDetails = {
        version: '0x2',
        contractAddress: '0x65a822fbee1ae79e898688b5a4282dc79e0042cbed12f6169937fddb4c26641',
        chainId: constants.StarknetChainId.SN_SEPOLIA,
        classHash: '0x5f3614e8671257aff9ac38e929c74d65b02d460ae966cd826c9f04a7fa8e0d4',
        constructorCalldata: [1, 2],
        addressSalt: 1234,
        nonce: 45,
        maxFee: 10 ** 15,

        tip: 0,
        paymasterData: [],
        accountDeploymentData: [],
        nonceDataAvailabilityMode: RPC.EDataAvailabilityMode.L1,
        feeDataAvailabilityMode: RPC.EDataAvailabilityMode.L1,
        resourceBounds: stark.estimateFeeToBounds(constants.ZERO),
      };
      const sig = await myEthSigner.signDeployAccountTransaction(myDeployAcc);
      expect(sig).toMatchObject({
        r: 61114347636551792612206610795983058940674613154346642566929862226007498517027n,
        s: 38870792724053768239218215863749216579253019684549941316832072720775828116206n,
        recovery: 1,
      });
    });

    test('Declare signature', async () => {
      const myPrivateKey = '0x525bc68475c0955fae83869beec0996114d4bb27b28b781ed2a20ef23121b8de';
      const myEthSigner = new EthSigner(myPrivateKey);
      const myDeclare: DeclareSignerDetails = {
        version: '0x2',
        chainId: constants.StarknetChainId.SN_SEPOLIA,
        senderAddress: '0x65a822fbee1ae79e898688b5a4282dc79e0042cbed12f6169937fddb4c26641',
        classHash: '0x5f3614e8671257aff9ac38e929c74d65b02d460ae966cd826c9f04a7fa8e0d4',
        nonce: 45,
        maxFee: 10 ** 15,

        tip: 0,
        paymasterData: [],
        accountDeploymentData: [],
        nonceDataAvailabilityMode: RPC.EDataAvailabilityMode.L1,
        feeDataAvailabilityMode: RPC.EDataAvailabilityMode.L1,
        resourceBounds: stark.estimateFeeToBounds(constants.ZERO),
      };
      const sig = await myEthSigner.signDeclareTransaction(myDeclare);
      expect(sig).toMatchObject({
        r: 38069596217315916583476609659691868035000959604311196895707605245620900872129n,
        s: 420191492562045858770062885997406552542950984883779606809355688615026963844n,
        recovery: 1,
      });
    });
  });
});
