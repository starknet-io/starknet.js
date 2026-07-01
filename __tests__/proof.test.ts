import fs from 'fs';
import path from 'path';

import { type BigNumberish, type Call } from '../src';
import type { Account } from '../src/account';
import { Contract } from '../src/contract';
import type { ProviderInterface } from '../src/provider/interface';
import { CONTRACTS, createTestProvider, describeIfTestnet, getTestAccount } from './config';

describeIfTestnet('Proof in transaction', () => {
  type ProofMessage = {
    from_address: BigNumberish;
    payload: BigNumberish[];
    to_address: BigNumberish;
  };

  type ProveResult = {
    proof: string;
    proofFacts: BigNumberish[];
    l2ToL1Messages?: ProofMessage[];
  };

  type L1L2message = {
    user_id: BigNumberish;
    is_whitelisted: boolean;
  };

  let provider: ProviderInterface;
  let account: Account;
  let myTestContract: Contract;
  let myCall2: Call;

  const proofPath = path.resolve(__dirname, '../__mocks__/cairo/cairo2170/proofResult.json');
  const proofResult = JSON.parse(fs.readFileSync(proofPath, 'ascii')) as {
    proofRes: ProveResult;
    messageFromProof: L1L2message;
  };
  const { proof, proofFacts } = proofResult.proofRes;
  const message: L1L2message = proofResult.messageFromProof;

  beforeAll(async () => {
    provider = await createTestProvider();
    account = getTestAccount(provider);
    myTestContract = new Contract({
      abi: CONTRACTS.SuperSecret.sierra.abi,
      address: '0x2529eb0dd994b6012b4bd496aea13c3714c13ea8db86d09aeecc5f3164181a6',
    });
    myCall2 = myTestContract.populate('verify_proof_of_secret', {
      public_message: message,
    });
  });

  test('tx with wrong calldata', async () => {
    const myCall3 = { ...myCall2, calldata: [message.user_id, 0] }; // 0 for is_whitelisted instead of 1
    await expect(account.execute(myCall3, { proof, proofFacts })).rejects.toMatchObject({
      message: expect.stringContaining('pub message not related to hash'),
    });
  });

  describe('tx with wrong proofFacts', () => {
    test('tx with wrong proofFacts.PROOF0_marker', async () => {
      const wrongProofFacts = proofFacts.map((item, i) => (i === 0 ? 0n : item));
      await expect(
        account.execute(myCall2, { proof, proofFacts: wrongProofFacts })
      ).rejects.toMatchObject({
        message: expect.stringContaining(
          'Expected first field to be 88314448135728 (PROOF0) or 88314448135729 (PROOF1)'
        ),
      });
    });

    test('tx with wrong proofFacts.VIRTUAL_SNOS_marker', async () => {
      const wrongProofFacts = proofFacts.map((item, i) => (i === 1 ? 0n : item));
      await expect(
        account.execute(myCall2, { proof, proofFacts: wrongProofFacts })
      ).rejects.toMatchObject({
        message: expect.stringContaining(
          'Expected second field to be 26704351219188916681607892819 (VIRTUAL_SNOS)'
        ),
      });
    });

    test('tx with wrong proofFacts.VIRTUAL_SNOS0_marker', async () => {
      const wrongProofFacts = proofFacts.map((item, i) => (i === 3 ? 0n : item));
      await expect(
        account.execute(myCall2, { proof, proofFacts: wrongProofFacts })
      ).rejects.toMatchObject({
        message: expect.stringContaining(
          'Expected SNOS proof facts version to be 6836313912112362670491620561712 (VIRTUAL_OS_OUTPUT_VERSION)'
        ),
      });
    });

    test('tx with wrong proofFacts.l1l2messages length', async () => {
      const wrongProofFacts = proofFacts.map((item, i) => (i === 7 ? 2n : item));
      await expect(
        account.execute(myCall2, { proof, proofFacts: wrongProofFacts })
      ).rejects.toMatchObject({
        message: expect.stringContaining('ProofFacts deser failed'),
      });
    });
  });

  test('tx with correct proof', async () => {
    const res2 = await account.execute(myCall2, { proof, proofFacts });
    const txR2 = await account.provider.waitForTransaction(res2.transaction_hash);
    expect(txR2.isSuccess()).toBe(true);
  });
});
