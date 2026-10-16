import { Account, CallData, cairo, hash, num, type RpcProvider } from '../src';
import { Falcon512Signer, falcon512 } from '../src/falcon';
import {
  CONTRACTS,
  adaptAccountIfDevnet,
  createTestProvider,
  describeIfDevnet,
  devnetFeeTokenAddress,
  getTestAccount,
} from './config';
import { giftTypedData } from './utils/falcon/helpers/giftTypedData';

// The S2morrow account class: source and provenance in __mocks__/cairo/falcon512Account/README.md.
const FALCON_ACCOUNT_CLASS_HASH =
  '0x37c7626b50ba517835c9556b53bce57cb6633704bb702f8c2f13a44cf151d5';

// Measured on devnet (RPC 0.10.2) on 2026-10-16: DEPLOY_ACCOUNT 0.039 STRK, INVOKE 0.025 STRK and
// DECLARE 0.057 STRK, 0.121 STRK in all. 1 STRK keeps a wide margin; raise it by hand if needed.
const FUNDING = 10n ** 18n; // 1 STRK

// The account verifies a Falcon signature on-chain: this validation costs much more than an ECDSA
// one, so every fee estimate must run it.
const withValidation = { skipValidate: false };

/** Constructor argument `pk_packed` of the account: struct PackedPolynomial512 { s0 … s28 }. */
const toPkStruct = (packed: string[]): Record<string, string> =>
  Object.fromEntries(packed.map((value, i) => [`s${i}`, value]));

describeIfDevnet('Falcon-512 account (S2morrow), signed by Falcon512Signer', () => {
  let provider: RpcProvider;
  let account: Account;
  let falconAccount: Account;
  const { secretKey, publicKey } = falcon512.generateKeyPair();
  const falconSigner = new Falcon512Signer(secretKey);

  beforeAll(async () => {
    provider = await createTestProvider();
    account = getTestAccount(provider);
  });

  test('DEPLOY_ACCOUNT signed with Falcon-512', async () => {
    const { sierra, casm } = CONTRACTS.Falcon512Account;
    const declared = await account.declareIfNot({ contract: sierra, casm });
    if (declared.transaction_hash) await provider.waitForTransaction(declared.transaction_hash);
    expect(num.toBigInt(declared.class_hash)).toBe(BigInt(FALCON_ACCOUNT_CLASS_HASH));

    const packedPublicKey = falconSigner.getPackedPublicKey();
    const constructorCalldata = new CallData(sierra.abi).compile('constructor', {
      pk_packed: toPkStruct(packedPublicKey),
    });
    const addressSalt = packedPublicKey[0];
    const address = hash.calculateContractAddressFromHash(
      addressSalt,
      FALCON_ACCOUNT_CLASS_HASH,
      constructorCalldata,
      0
    );
    const funding = await account.execute({
      contractAddress: devnetFeeTokenAddress,
      entrypoint: 'transfer',
      calldata: { recipient: address, amount: cairo.uint256(FUNDING) },
    });
    await provider.waitForTransaction(funding.transaction_hash);

    falconAccount = adaptAccountIfDevnet(new Account({ provider, address, signer: falconSigner }));
    const deployed = await falconAccount.deployAccount(
      {
        classHash: FALCON_ACCOUNT_CLASS_HASH,
        constructorCalldata,
        addressSalt,
        contractAddress: address,
      },
      withValidation
    );
    const receipt = await provider.waitForTransaction(deployed.transaction_hash);
    expect(receipt.isSuccess()).toBe(true);
  });

  test('INVOKE signed with Falcon-512', async () => {
    const { transaction_hash } = await falconAccount.execute(
      {
        contractAddress: devnetFeeTokenAddress,
        entrypoint: 'transfer',
        calldata: { recipient: account.address, amount: cairo.uint256(10n ** 10n) },
      },
      withValidation
    );
    const receipt = await provider.waitForTransaction(transaction_hash);
    expect(receipt.isSuccess()).toBe(true);
  });

  test('DECLARE signed with Falcon-512 (exercised when the class is not declared yet)', async () => {
    const { sierra, casm } = CONTRACTS.Dummy1ForEth;
    const declared = await falconAccount.declareIfNot({ contract: sierra, casm }, withValidation);
    if (declared.transaction_hash) {
      const receipt = await provider.waitForTransaction(declared.transaction_hash);
      expect(receipt.isSuccess()).toBe(true);
    }
    expect(num.toBigInt(declared.class_hash)).toBe(
      num.toBigInt(hash.computeContractClassHash(sierra))
    );
  });

  test('SNIP-12 message signed with Falcon-512, verified off-chain and on-chain', async () => {
    const signature = await falconAccount.signMessage(giftTypedData);
    const msgHash = await falconAccount.hashMessage(giftTypedData);
    const { address } = falconAccount;
    expect(falcon512.verifyMessage(giftTypedData, signature, publicKey, address)).toBe(true);
    expect(await provider.verifyMessageInStarknet(giftTypedData, signature, address)).toBe(true);
    expect(await provider.verifyMessageInStarknet(msgHash, signature, address)).toBe(true);
  });
});
