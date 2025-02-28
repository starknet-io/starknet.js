import {
  Call,
  Contract,
  DeclareDeployUDCResponse,
  RevertedTransactionReceiptResponse,
  SuccessfulTransactionReceiptResponse,
  TransactionExecutionStatus,
  ProviderInterface,
  Account,
} from '../src';
import { contracts, createTestProvider, getTestAccount } from './config/fixtures';

// TODO: add RPC 0.7 V3, RPC 0.8 V3
describe('Transaction receipt utility - RPC 0.7 - V2', () => {
  let provider: ProviderInterface;
  let account: Account;

  let dd: DeclareDeployUDCResponse;
  let contract: Contract;

  beforeAll(async () => {
    provider = await createTestProvider();
    account = getTestAccount(provider);

    dd = await account.declareAndDeploy({
      contract: contracts.TestReject.sierra,
      casm: contracts.TestReject.casm,
    });
    await provider.waitForTransaction(dd.deploy.transaction_hash);
    contract = new Contract(contracts.TestReject.sierra.abi, dd.deploy.contract_address, account);
    contract.connect(account);
  });

  test('test for Success variant', async () => {
    const myCall: Call = contract.populate('test_fail', { p1: 100 });
    const res = await account.execute(myCall, undefined, { maxFee: 1 * 10 ** 15 }); // maxFee needed to not throw error in getEstimateFee
    const txR = await provider.waitForTransaction(res.transaction_hash);
    expect(txR.value).toHaveProperty('execution_status', TransactionExecutionStatus.SUCCEEDED);
    expect(txR.statusReceipt).toBe('success');
    expect(txR.isSuccess()).toBe(true);
    expect(txR.isReverted()).toBe(false);
    expect(txR.isError()).toBe(false);
    let isSuccess: boolean = false;
    txR.match({
      success: () => {
        isSuccess = true;
      },
      _: () => {
        isSuccess = false;
      },
    });
    expect(isSuccess).toBe(true);
  });

  test('test for Reverted variant', async () => {
    const myCall: Call = contract.populate('test_fail', { p1: 10 }); // reverted if not 100
    const res = await account.execute(myCall, undefined, { maxFee: 1 * 10 ** 15 }); // maxFee needed to not throw error in getEstimateFee
    const txR = await provider.waitForTransaction(res.transaction_hash);
    expect(txR.value).toHaveProperty('execution_status', TransactionExecutionStatus.REVERTED);
    expect(txR.statusReceipt).toBe('reverted');
    expect(txR.isSuccess()).toBe(false);
    expect(txR.isReverted()).toBe(true);
    expect(txR.isError()).toBe(false);
    let isReverted: boolean = false;
    txR.match({
      reverted: (_resp: RevertedTransactionReceiptResponse) => {
        isReverted = true;
      },
      _: () => {
        isReverted = false;
      },
    });
    expect(isReverted).toBe(true);
  });

  test('test for deploy Success variant', async () => {
    const res = await account.deployContract(
      { classHash: dd.declare.class_hash },
      { maxFee: 1 * 10 ** 15 }
    ); // maxFee needed to not throw error in getEstimateFee
    const txR = await provider.waitForTransaction(res.transaction_hash);
    expect(txR.value).toHaveProperty('execution_status', TransactionExecutionStatus.SUCCEEDED);
    expect(txR.statusReceipt).toBe('success');
    expect(txR.isSuccess()).toBe(true);
    expect(txR.isReverted()).toBe(false);
    expect(txR.isError()).toBe(false);
    let isSuccess: boolean = false;
    txR.match({
      success: (_resp: SuccessfulTransactionReceiptResponse) => {
        isSuccess = true;
      },
      _: () => {
        isSuccess = false;
      },
    });
    expect(isSuccess).toBe(true);
  });

  // NOTE:
  // no rejected test, impossible to trigger 'rejected' from a node/devnet.
  // no declare test due to slow process (result is very similar to Invoke)
});
