// Same import as in src/falcon/: the editor then sees the type of provider that `mlkem` expects.
// (tsconfig.json does not include __tests__/, so the editor reads `starknet` from dist/.)
import type { ProviderInterface } from 'starknet';
import { constants, num, type Call, type Signature } from '../../../src';
import {
  Falcon512Signer,
  falcon512,
  mlkem,
  type MlKemSignedCapsule,
  type MlKemSignedKey,
} from '../../../src/falcon';
// Not exported by starknet/falcon: reached through its module.
import { hashBytes } from '../../../src/falcon/mlkem/utils/bytes';

const CHAIN_ID = constants.StarknetChainId.SN_SEPOLIA;

// The accounts of the tests. Alice owns the ML-KEM key. Bob makes the capsule and sends it.
const ALICE = '0xa11ce';
const BOB = '0xb0b';
const MALLORY = '0xbad';
const STARK_ACCOUNT = '0x57a2c';
const ODD_ACCOUNT = '0xdd';
const ACCOUNT_WITHOUT_GETTER = '0xdead';

// Alice signs with the hint (60 felts), Bob without it (31 felts): the tests cover both layouts.
const aliceSigner = new Falcon512Signer(falcon512.generateKeyPair().secretKey, {
  accountType: 'oz-hint',
});
const bobSigner = new Falcon512Signer(falcon512.generateKeyPair().secretKey, {
  accountType: 'oz-direct',
});
const mallorySigner = new Falcon512Signer(falcon512.generateKeyPair().secretKey, {
  accountType: 'oz-hint',
});

/** What `get_public_key` of a Falcon-512 account of OpenZeppelin answers: 29, then 29 felts. */
const falconAnswer = (signer: Falcon512Signer): string[] => [
  '0x1d',
  ...signer.getPackedPublicKey(),
];

// The answer of `get_public_key` of each account.
const answers: Record<string, string[]> = {
  [ALICE]: falconAnswer(aliceSigner),
  [BOB]: falconAnswer(bobSigner),
  [MALLORY]: falconAnswer(mallorySigner),
  // A Stark account answers one felt.
  [STARK_ACCOUNT]: ['0x123'],
  // 30 felts, but the first one is not 29.
  [ODD_ACCOUNT]: ['0x1e', ...aliceSigner.getPackedPublicKey()],
};

// A provider without a node. For an account that is not in `answers`, it throws an error, like a
// node does for an account that has no `get_public_key` (an S2morrow account) or is not deployed.
const provider = {
  getChainId: async () => CHAIN_ID,
  callContract: async (call: Call) => {
    const answer = answers[num.toHex(call.contractAddress)];
    if (call.entrypoint !== 'get_public_key' || answer === undefined) {
      throw new Error('Requested entrypoint does not exist in the contract');
    }
    return answer;
  },
} as unknown as ProviderInterface;

/** A time in seconds, some days from now. A negative number of days gives a time in the past. */
const inDays = (days: number): number => Math.floor(Date.now() / 1000) + days * 24 * 3600;

/** Step 1: Alice creates a key, valid for one day, and signs it with her account. */
async function publishAliceKey() {
  const validUntil = inDays(1);
  const aliceKey = mlkem.createKey(CHAIN_ID, validUntil);
  const signature = await aliceSigner.signMessage(aliceKey.typedData, ALICE);
  const signedKey: MlKemSignedKey = {
    keyOwnerAddress: ALICE,
    publicKey: aliceKey.publicKey,
    validUntil,
    signature,
  };
  return { aliceKey, signedKey };
}

/** Step 2: Bob makes a capsule for the key of Alice, and signs it with his account. */
async function sendBobCapsule(signedKey: MlKemSignedKey) {
  const bobSide = await mlkem.encapsulate(provider, signedKey, BOB);
  const signature = await bobSigner.signMessage(bobSide.typedData, BOB);
  const signedCapsule: MlKemSignedCapsule = {
    senderAddress: BOB,
    capsule: bobSide.capsule,
    timestamp: bobSide.timestamp,
    signature,
  };
  return { bobSide, signedCapsule };
}

describe('mlkem: the exchange between Alice and Bob', () => {
  test('Alice and Bob get the same secret of 32 bytes', async () => {
    const { aliceKey, signedKey } = await publishAliceKey();
    const { bobSide, signedCapsule } = await sendBobCapsule(signedKey);
    const aliceSecret = await mlkem.decapsulate(provider, signedCapsule, ALICE, aliceKey.seed);
    expect(aliceSecret).toHaveLength(32);
    expect(aliceSecret).toEqual(bobSide.sharedSecret);
  });

  test('the seed has 64 bytes, the public key 1184 bytes and the capsule 1088 bytes', async () => {
    const { aliceKey, signedKey } = await publishAliceKey();
    const { bobSide } = await sendBobCapsule(signedKey);
    expect(aliceKey.seed).toHaveLength(64);
    expect(aliceKey.publicKey).toHaveLength(1184);
    expect(bobSide.capsule).toHaveLength(1088);
  });

  test('two capsules for the same key give two different secrets', async () => {
    const { signedKey } = await publishAliceKey();
    const first = await mlkem.encapsulate(provider, signedKey, BOB);
    const second = await mlkem.encapsulate(provider, signedKey, BOB);
    expect(second.capsule).not.toEqual(first.capsule);
    expect(second.sharedSecret).not.toEqual(first.sharedSecret);
  });

  test('if Mallory signs the capsule of Bob again, Alice gets another secret than Bob', async () => {
    const { aliceKey, signedKey } = await publishAliceKey();
    const { bobSide } = await sendBobCapsule(signedKey);
    // Mallory takes the capsule of Bob, and signs it with her own account.
    const malloryCapsule: MlKemSignedCapsule = {
      senderAddress: MALLORY,
      capsule: bobSide.capsule,
      timestamp: bobSide.timestamp,
      signature: await mallorySigner.signMessage(bobSide.typedData, MALLORY),
    };
    const aliceSecret = await mlkem.decapsulate(provider, malloryCapsule, ALICE, aliceKey.seed);
    expect(aliceSecret).not.toEqual(bobSide.sharedSecret);
  });
});

describe('mlkem.createKey', () => {
  test('the message that Alice signs', () => {
    const validUntil = inDays(30);
    const aliceKey = mlkem.createKey(CHAIN_ID, validUntil);
    expect(aliceKey.typedData.primaryType).toBe('MlKemPublicKey');
    expect(aliceKey.typedData.domain).toEqual({
      name: 'ML-KEM key exchange',
      version: '1',
      chainId: CHAIN_ID,
      revision: '1',
    });
    expect(aliceKey.typedData.message).toEqual({
      Algorithm: 'ML-KEM-768',
      'Key hash': hashBytes(aliceKey.publicKey),
      'Valid until': validUntil,
    });
  });

  test('refuses an empty chain id', () => {
    expect(() => mlkem.createKey('', inDays(1))).toThrow(
      'ML-KEM: chainId must be the chain id, as provider.getChainId() returns it.'
    );
  });

  test('refuses a time in milliseconds', () => {
    expect(() => mlkem.createKey(CHAIN_ID, Date.now())).toThrow(
      'ML-KEM: validUntil must be a time in seconds, from 0 to 4294967295.'
    );
  });

  test('refuses a Date', () => {
    const date = new Date() as unknown as number;
    expect(() => mlkem.createKey(CHAIN_ID, date)).toThrow(
      'ML-KEM: validUntil must be a time in seconds, from 0 to 4294967295.'
    );
  });

  test('refuses a time in the past', () => {
    expect(() => mlkem.createKey(CHAIN_ID, inDays(-1))).toThrow(
      'ML-KEM: validUntil must be in the future.'
    );
  });
});

describe('mlkem.encapsulate', () => {
  test('the message that Bob signs', async () => {
    const { signedKey } = await publishAliceKey();
    const bobSide = await mlkem.encapsulate(provider, signedKey, BOB);
    expect(bobSide.typedData.primaryType).toBe('MlKemCapsule');
    expect(bobSide.typedData.message).toEqual({
      'Key owner': ALICE,
      'Key hash': hashBytes(signedKey.publicKey),
      'Capsule hash': hashBytes(bobSide.capsule),
      Timestamp: bobSide.timestamp,
    });
  });

  test('refuses a public key of a wrong size', async () => {
    const { signedKey } = await publishAliceKey();
    const shortKey = { ...signedKey, publicKey: new Uint8Array(1183) };
    await expect(mlkem.encapsulate(provider, shortKey, BOB)).rejects.toThrow(
      'ML-KEM: the public key must be a Uint8Array of 1184 bytes.'
    );
  });

  test('refuses an expired key', async () => {
    const { signedKey } = await publishAliceKey();
    const expiredKey = { ...signedKey, validUntil: inDays(-1) };
    await expect(mlkem.encapsulate(provider, expiredKey, BOB)).rejects.toThrow(
      'ML-KEM: the key of the account 0xa11ce has expired.'
    );
  });

  test('refuses a key that another account signed', async () => {
    const { aliceKey, signedKey } = await publishAliceKey();
    // Bob signs the message of Alice, in the name of Alice.
    const signature = await bobSigner.signMessage(aliceKey.typedData, ALICE);
    await expect(mlkem.encapsulate(provider, { ...signedKey, signature }, BOB)).rejects.toThrow(
      'ML-KEM: the signature of the account 0xa11ce is not valid.'
    );
  });

  test('refuses a Stark account', async () => {
    const { signedKey } = await publishAliceKey();
    const starkKey = { ...signedKey, keyOwnerAddress: STARK_ACCOUNT };
    await expect(mlkem.encapsulate(provider, starkKey, BOB)).rejects.toThrow(
      'ML-KEM: the account 0x57a2c is not a Falcon-512 account of OpenZeppelin.'
    );
  });

  test('refuses an account that answers 30 felts, but not 29 first', async () => {
    const { signedKey } = await publishAliceKey();
    const oddKey = { ...signedKey, keyOwnerAddress: ODD_ACCOUNT };
    await expect(mlkem.encapsulate(provider, oddKey, BOB)).rejects.toThrow(
      'ML-KEM: the account 0xdd is not a Falcon-512 account of OpenZeppelin.'
    );
  });

  test('refuses an account without get_public_key, like an S2morrow account', async () => {
    const { signedKey } = await publishAliceKey();
    const keyWithoutGetter = { ...signedKey, keyOwnerAddress: ACCOUNT_WITHOUT_GETTER };
    const error = await mlkem
      .encapsulate(provider, keyWithoutGetter, BOB)
      .catch((reason: Error) => reason);
    expect(error).toBeInstanceOf(Error);
    expect((error as Error).message).toBe(
      'ML-KEM: cannot read the public key of the account 0xdead. The account must be deployed, ' +
        'and must be a Falcon-512 account of OpenZeppelin.'
    );
    // The error of the node stays available, in `cause`.
    expect(((error as Error).cause as Error).message).toBe(
      'Requested entrypoint does not exist in the contract'
    );
  });

  test('refuses a signature that is not a Falcon-512 signature', async () => {
    const { signedKey } = await publishAliceKey();
    const twoFelts = { ...signedKey, signature: ['0x1', '0x2'] };
    await expect(mlkem.encapsulate(provider, twoFelts, BOB)).rejects.toThrow(
      'ML-KEM: the signature of the account 0xa11ce is not a Falcon-512 signature.'
    );
  });

  test('refuses a signature that is not an array', async () => {
    const { signedKey } = await publishAliceKey();
    // The signature of a Stark key can be an object { r, s }, not an array.
    const signature = { r: 1n, s: 2n } as unknown as Signature;
    await expect(mlkem.encapsulate(provider, { ...signedKey, signature }, BOB)).rejects.toThrow(
      'ML-KEM: the signature of the account 0xa11ce is not a Falcon-512 signature.'
    );
  });
});

describe('mlkem.decapsulate', () => {
  test('refuses a capsule of a wrong size', async () => {
    const { aliceKey, signedKey } = await publishAliceKey();
    const { signedCapsule } = await sendBobCapsule(signedKey);
    const shortCapsule = { ...signedCapsule, capsule: new Uint8Array(1087) };
    await expect(mlkem.decapsulate(provider, shortCapsule, ALICE, aliceKey.seed)).rejects.toThrow(
      'ML-KEM: the capsule must be a Uint8Array of 1088 bytes.'
    );
  });

  test('refuses a seed of a wrong size', async () => {
    const { signedKey } = await publishAliceKey();
    const { signedCapsule } = await sendBobCapsule(signedKey);
    await expect(
      mlkem.decapsulate(provider, signedCapsule, ALICE, new Uint8Array(32))
    ).rejects.toThrow('ML-KEM: the seed must be a Uint8Array of 64 bytes.');
  });

  test('refuses a timestamp in milliseconds', async () => {
    const { aliceKey, signedKey } = await publishAliceKey();
    const { signedCapsule } = await sendBobCapsule(signedKey);
    const millisecondCapsule = { ...signedCapsule, timestamp: Date.now() };
    await expect(
      mlkem.decapsulate(provider, millisecondCapsule, ALICE, aliceKey.seed)
    ).rejects.toThrow('ML-KEM: timestamp must be a time in seconds, from 0 to 4294967295.');
  });

  test('refuses a capsule changed on the way', async () => {
    const { aliceKey, signedKey } = await publishAliceKey();
    const { signedCapsule } = await sendBobCapsule(signedKey);
    const capsule = signedCapsule.capsule.slice();
    capsule[0] = (capsule[0] + 1) % 256;
    await expect(
      mlkem.decapsulate(provider, { ...signedCapsule, capsule }, ALICE, aliceKey.seed)
    ).rejects.toThrow('ML-KEM: the signature of the account 0xb0b is not valid.');
  });

  test('refuses a capsule made for another account', async () => {
    const { aliceKey, signedKey } = await publishAliceKey();
    const { signedCapsule } = await sendBobCapsule(signedKey);
    // Bob made the capsule for Alice. Here, Mallory says that it is for her.
    await expect(
      mlkem.decapsulate(provider, signedCapsule, MALLORY, aliceKey.seed)
    ).rejects.toThrow('ML-KEM: the signature of the account 0xb0b is not valid.');
  });

  test('refuses a capsule opened with the seed of another key', async () => {
    const { signedKey } = await publishAliceKey();
    const { signedCapsule } = await sendBobCapsule(signedKey);
    const otherKey = mlkem.createKey(CHAIN_ID, inDays(1));
    await expect(mlkem.decapsulate(provider, signedCapsule, ALICE, otherKey.seed)).rejects.toThrow(
      'ML-KEM: the signature of the account 0xb0b is not valid.'
    );
  });

  test('refuses a capsule sent by a Stark account', async () => {
    const { aliceKey, signedKey } = await publishAliceKey();
    const { signedCapsule } = await sendBobCapsule(signedKey);
    const starkCapsule = { ...signedCapsule, senderAddress: STARK_ACCOUNT };
    await expect(mlkem.decapsulate(provider, starkCapsule, ALICE, aliceKey.seed)).rejects.toThrow(
      'ML-KEM: the account 0x57a2c is not a Falcon-512 account of OpenZeppelin.'
    );
  });
});

describe('hashBytes', () => {
  test('cuts the bytes into felts of 31 bytes, then hashes the felts with Poseidon', () => {
    // Reference value computed apart, with `poseidonHashMany` of @scure/starknet, over the felts
    // 0x0101…01 (31 bytes) and 0x01 (1 byte).
    expect(hashBytes(new Uint8Array(32).fill(1))).toBe(
      '0x56657fe3500667466b4fc95fff44a7e6799c982fff4c85fbd18a5641b51f70d'
    );
  });
});
