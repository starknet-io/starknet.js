import { inspect } from 'node:util';
import {
  CallData,
  constants,
  EDataAvailabilityMode,
  encode,
  ETransactionVersion3,
  hash,
  Signer,
  stark,
  transaction,
  typedData,
  type Call,
  type DeclareSignerDetails,
  type DeployAccountSignerDetails,
  type InvocationsSignerDetails,
} from '../../../src';
import { Falcon512Signer, falcon512 } from '../../../src/falcon';
import { loadFalconRsFixture } from './helpers/falconRsFixture';
import { giftTypedData } from './helpers/giftTypedData';

const { secretKey, publicKey } = falcon512.generateKeyPair();
const signer = new Falcon512Signer(secretKey);
const ADDRESS = '0x7f47dc7d5f2ab40ae668a195fc8eb5724333e436d87a1c37f40d39f2776d5fb';
const common = {
  nonce: 3,
  tip: 0,
  paymasterData: [],
  accountDeploymentData: [],
  nonceDataAvailabilityMode: EDataAvailabilityMode.L1,
  feeDataAvailabilityMode: EDataAvailabilityMode.L1,
  resourceBounds: {
    l1_gas: { max_amount: 0n, max_price_per_unit: 10n },
    l2_gas: { max_amount: 2_000_000n, max_price_per_unit: 10n },
    l1_data_gas: { max_amount: 500n, max_price_per_unit: 10n },
  },
  chainId: constants.StarknetChainId.SN_SEPOLIA,
};
const calls: Call[] = [
  {
    contractAddress: '0x4718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d',
    entrypoint: 'transfer',
    calldata: ['0x1', '0x2', '0x0'],
  },
];
const invokeHash = (details: InvocationsSignerDetails): string =>
  hash.calculateInvokeTransactionHash({
    ...details,
    senderAddress: details.walletAddress,
    compiledCalldata: transaction.getExecuteCalldata(calls, details.cairoVersion),
    version: details.version,
    nonceDataAvailabilityMode: stark.intDAM(details.nonceDataAvailabilityMode),
    feeDataAvailabilityMode: stark.intDAM(details.feeDataAvailabilityMode),
  });

describe('Falcon512Signer construction', () => {
  test('from Uint8Array and from hex string (with or without 0x) gives the same public key', async () => {
    const hex = encode.buf2hex(secretKey);
    const expected = encode.addHexPrefix(encode.buf2hex(publicKey));
    expect(await signer.getPubKey()).toBe(expected);
    expect(await new Falcon512Signer(`0x${hex}`).getPubKey()).toBe(expected);
    expect(await new Falcon512Signer(hex).getPubKey()).toBe(expected);
  });

  test('getPackedPublicKey returns a copy of the 29 packed felts', () => {
    const packed = signer.getPackedPublicKey();
    expect(packed).toEqual(falcon512.getPackedPublicKey(publicKey));
    expect(packed).toHaveLength(29);
    packed[0] = '0x0';
    expect(signer.getPackedPublicKey()[0]).not.toBe('0x0');
  });

  test('rejects a wrong length and an invalid key', () => {
    expect(() => new Falcon512Signer(secretKey.slice(1))).toThrow('1281 bytes');
    const bad = secretKey.slice();
    bad[769] = (bad[769] + 1) % 256;
    expect(() => new Falcon512Signer(bad)).toThrow('Falcon512: invalid secret key');
  });

  test('fromFalconRs gives the falcon-rs packed public key', () => {
    const fixture = loadFalconRsFixture();
    const fromFalconRs = Falcon512Signer.fromFalconRs(fixture.secretKey);
    expect(fromFalconRs.getPackedPublicKey()).toEqual(fixture.packedPublicKey);
  });

  test('the secret key is exposed neither by JSON.stringify nor by util.inspect', () => {
    expect(JSON.stringify(signer)).toBe('{}');
    const shown = inspect(signer, { showHidden: true, depth: 10 });
    expect(shown).not.toMatch(/Uint8Array\(1281\)/);
    expect(shown).not.toContain(encode.buf2hex(secretKey).slice(0, 32));
  });
});

describe('Falcon512Signer signatures verify against starknet.js hashes', () => {
  test('signTransaction (V3)', async () => {
    const details: InvocationsSignerDetails = {
      ...common,
      walletAddress: ADDRESS,
      cairoVersion: '1',
      version: ETransactionVersion3.V3,
    };
    const sig = await signer.signTransaction(calls, details);
    expect(falcon512.verify(sig, invokeHash(details), publicKey)).toBe(true);
  });

  test('signTransaction with the fee-estimation version F3', async () => {
    const details: InvocationsSignerDetails = {
      ...common,
      walletAddress: ADDRESS,
      cairoVersion: '1',
      version: ETransactionVersion3.F3,
    };
    const sig = await signer.signTransaction(calls, details);
    expect(falcon512.verify(sig, invokeHash(details), publicKey)).toBe(true);
  });

  test('refuses a V3 version written 0x03, like the Signer of starknet', async () => {
    const details = {
      ...common,
      walletAddress: ADDRESS,
      cairoVersion: '1',
      version: '0x03',
    } as unknown as InvocationsSignerDetails;
    const message = 'Invalid Tx version for hash calculation';
    await expect(new Signer('0x1234').signTransaction(calls, details)).rejects.toThrow(message);
    await expect(signer.signTransaction(calls, details)).rejects.toThrow(message);
  });

  test('signDeployAccountTransaction (V3)', async () => {
    const details: DeployAccountSignerDetails = {
      ...common,
      nonce: 0,
      classHash: '0x37c7626b50ba517835c9556b53bce57cb6633704bb702f8c2f13a44cf151d5',
      constructorCalldata: falcon512.getPackedPublicKey(publicKey),
      addressSalt: '0x123',
      contractAddress: ADDRESS,
      version: ETransactionVersion3.V3,
    };
    const sig = await signer.signDeployAccountTransaction(details);
    const expected = hash.calculateDeployAccountTransactionHash({
      ...details,
      salt: details.addressSalt,
      compiledConstructorCalldata: CallData.compile(details.constructorCalldata),
      version: details.version,
      nonceDataAvailabilityMode: stark.intDAM(details.nonceDataAvailabilityMode),
      feeDataAvailabilityMode: stark.intDAM(details.feeDataAvailabilityMode),
    });
    expect(falcon512.verify(sig, expected, publicKey)).toBe(true);
  });

  test('signDeclareTransaction (V3)', async () => {
    const details: DeclareSignerDetails = {
      ...common,
      classHash: '0x123',
      compiledClassHash: '0x456',
      senderAddress: ADDRESS,
      version: ETransactionVersion3.V3,
    };
    const sig = await signer.signDeclareTransaction(details);
    const expected = hash.calculateDeclareTransactionHash({
      ...details,
      version: details.version,
      nonceDataAvailabilityMode: stark.intDAM(details.nonceDataAvailabilityMode),
      feeDataAvailabilityMode: stark.intDAM(details.feeDataAvailabilityMode),
    });
    expect(falcon512.verify(sig, expected, publicKey)).toBe(true);
  });

  test('signMessage (SNIP-12)', async () => {
    const sig = await signer.signMessage(giftTypedData, ADDRESS);
    const msgHash = typedData.getMessageHash(giftTypedData, ADDRESS);
    expect(falcon512.verifyMessage(giftTypedData, sig, publicKey, ADDRESS)).toBe(true);
    expect(falcon512.verify(sig, msgHash, publicKey)).toBe(true);
  });

  test('rejects a non-V3 transaction version', async () => {
    const details = {
      ...common,
      walletAddress: ADDRESS,
      cairoVersion: '1',
      version: '0x1',
    } as unknown as InvocationsSignerDetails;
    await expect(signer.signTransaction(calls, details)).rejects.toThrow('only V3');
  });
});
