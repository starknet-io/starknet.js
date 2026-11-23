import { Account, CallData, cairo, hash, num, type RpcProvider } from '../src';
import {
  Falcon512Signer,
  falcon512,
  mlkem,
  type Falcon512AccountType,
  type MlKemSignedCapsule,
  type MlKemSignedKey,
} from '../src/falcon';
import {
  CONTRACTS,
  adaptAccountIfDevnet,
  createTestProvider,
  describeIfDevnet,
  devnetFeeTokenAddress,
  getTestAccount,
} from './config';

// Classes and provenance: __mocks__/cairo/falcon512Account/README.md.
const OZ_HINT_CLASS_HASH = '0x014660ce3739fbde6e33d994cebd6a9fb20e800516b2e1b6c253d4d09baa9ae0';
const OZ_DIRECT_CLASS_HASH = '0x016111958d61eedfa5a950b608997abb4981b548f1862d620cc9247461ddeeb1';

// 1 STRK pays the deployment of a Falcon-512 account on devnet, with a wide margin.
const FUNDING = 10n ** 18n;

// A Falcon-512 account must run its validation in each fee estimate.
const withValidation = { skipValidate: false };

/** A time in seconds, one day from now. */
const inOneDay = (): number => Math.floor(Date.now() / 1000) + 24 * 3600;

/**
 * Declares the class if needed, then funds and deploys a new Falcon-512 account of OpenZeppelin.
 * Same steps as in falconAccount.test.ts.
 */
async function deployOzFalconAccount(
  provider: RpcProvider,
  funder: Account,
  accountType: Falcon512AccountType
): Promise<Account> {
  const isHint = accountType === 'oz-hint';
  const { sierra, casm } = isHint
    ? CONTRACTS.OzFalcon512ShakeAccountUpgradeable
    : CONTRACTS.OzFalcon512ShakeDirectAccountUpgradeable;
  const classHash = isHint ? OZ_HINT_CLASS_HASH : OZ_DIRECT_CLASS_HASH;
  const declared = await funder.declareIfNot({ contract: sierra, casm });
  if (declared.transaction_hash) await provider.waitForTransaction(declared.transaction_hash);
  expect(num.toBigInt(declared.class_hash)).toBe(BigInt(classHash));

  const signer = new Falcon512Signer(falcon512.generateKeyPair().secretKey, { accountType });
  const packedPublicKey = signer.getPackedPublicKey();
  const constructorCalldata = CallData.compile({ public_key: packedPublicKey });
  const addressSalt = packedPublicKey[0];
  const address = hash.calculateContractAddressFromHash(
    addressSalt,
    classHash,
    constructorCalldata,
    0
  );
  const funding = await funder.execute({
    contractAddress: devnetFeeTokenAddress,
    entrypoint: 'transfer',
    calldata: { recipient: address, amount: cairo.uint256(FUNDING) },
  });
  await provider.waitForTransaction(funding.transaction_hash);

  const account = adaptAccountIfDevnet(new Account({ provider, address, signer }));
  const deployed = await account.deployAccount(
    { classHash, constructorCalldata, addressSalt, contractAddress: address },
    withValidation
  );
  expect((await provider.waitForTransaction(deployed.transaction_hash)).isSuccess()).toBe(true);
  return account;
}

// Only on devnet: on another network, the two deployments would spend real test STRK.
describeIfDevnet('ML-KEM key exchange between two Falcon-512 accounts of OpenZeppelin', () => {
  let provider: RpcProvider;
  // The predeployed account of devnet: an OpenZeppelin account with a Stark key.
  let starkAccount: Account;
  // Alice owns the ML-KEM key. Bob makes the capsule and sends it.
  let aliceAccount: Account;
  let bobAccount: Account;

  beforeAll(async () => {
    provider = await createTestProvider();
    starkAccount = getTestAccount(provider);
    aliceAccount = await deployOzFalconAccount(provider, starkAccount, 'oz-hint');
    bobAccount = await deployOzFalconAccount(provider, starkAccount, 'oz-direct');
  });

  test('Alice and Bob get the same secret, with the keys of their accounts read on the node', async () => {
    const validUntil = inOneDay();
    const aliceKey = mlkem.createKey(await provider.getChainId(), validUntil);
    const signedKey: MlKemSignedKey = {
      keyOwnerAddress: aliceAccount.address,
      publicKey: aliceKey.publicKey,
      validUntil,
      signature: await aliceAccount.signMessage(aliceKey.typedData),
    };

    const bobSide = await mlkem.encapsulate(provider, signedKey, bobAccount.address);
    const signedCapsule: MlKemSignedCapsule = {
      senderAddress: bobAccount.address,
      capsule: bobSide.capsule,
      timestamp: bobSide.timestamp,
      signature: await bobAccount.signMessage(bobSide.typedData),
    };

    const aliceSecret = await mlkem.decapsulate(
      provider,
      signedCapsule,
      aliceAccount.address,
      aliceKey.seed
    );
    expect(aliceSecret).toEqual(bobSide.sharedSecret);
  });

  test('a Stark account is refused', async () => {
    const validUntil = inOneDay();
    const key = mlkem.createKey(await provider.getChainId(), validUntil);
    const signedKey: MlKemSignedKey = {
      keyOwnerAddress: starkAccount.address,
      publicKey: key.publicKey,
      validUntil,
      signature: await starkAccount.signMessage(key.typedData),
    };
    await expect(mlkem.encapsulate(provider, signedKey, bobAccount.address)).rejects.toThrow(
      `ML-KEM: the account ${num.toHex(starkAccount.address)} is not a Falcon-512 account of ` +
        'OpenZeppelin.'
    );
  });

  test('an address without a deployed account is refused', async () => {
    const validUntil = inOneDay();
    const aliceKey = mlkem.createKey(await provider.getChainId(), validUntil);
    const signedKey: MlKemSignedKey = {
      keyOwnerAddress: '0x123456',
      publicKey: aliceKey.publicKey,
      validUntil,
      signature: await aliceAccount.signMessage(aliceKey.typedData),
    };
    await expect(mlkem.encapsulate(provider, signedKey, bobAccount.address)).rejects.toThrow(
      'ML-KEM: cannot read the public key of the account 0x123456.'
    );
  });
});
