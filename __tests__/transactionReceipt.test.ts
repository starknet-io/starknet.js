import {
  Call,
  Contract,
  DeclareDeployUDCResponse,
  RevertedTransactionReceiptResponse,
  SuccessfulTransactionReceiptResponse,
  TransactionExecutionStatus,
  ProviderInterface,
  Account,
  EstimateFeeResponseOverhead,
  createTransactionReceipt,
  GetTxReceiptResponseWithoutHelper,
} from '../src';
import { contracts } from './config/fixtures';
import { createTestProvider, getTestAccount } from './config/fixturesInit';

describe('Transaction receipt utility - RPC 0.8+ - V3', () => {
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
    contract = new Contract({
      abi: contracts.TestReject.sierra.abi,
      address: dd.deploy.contract_address,
      providerOrAccount: account,
    });
    contract.providerOrAccount = account;
  });

  test('test for Success variant', async () => {
    const myCall: Call = contract.populate('test_fail', { p1: 100 });
    const estimate = await account.estimateInvokeFee(myCall);
    const res = await account.execute(myCall, {
      resourceBounds: estimate.resourceBounds,
    }); // maxFee needed to not throw error in getEstimateFee
    const txR = await provider.waitForTransaction(res.transaction_hash);
    expect(txR.value).toHaveProperty('execution_status', TransactionExecutionStatus.SUCCEEDED);
    expect(txR.statusReceipt).toBe('SUCCEEDED');
    expect(txR.isSuccess()).toBe(true);
    expect(txR.isReverted()).toBe(false);
    expect(txR.isError()).toBe(false);
    let isSuccess: boolean = false;
    txR.match({
      SUCCEEDED: () => {
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
    const estim: EstimateFeeResponseOverhead = await account.estimateInvokeFee(
      contract.populate('test_fail', { p1: 100 })
    );
    const res = await account.execute(myCall, { ...estim }); // maxFee needed to not throw error in getEstimateFee
    const txR = await provider.waitForTransaction(res.transaction_hash);
    expect(txR.value).toHaveProperty('execution_status', TransactionExecutionStatus.REVERTED);
    expect(txR.statusReceipt).toBe('REVERTED');
    expect(txR.isSuccess()).toBe(false);
    expect(txR.isReverted()).toBe(true);
    expect(txR.isError()).toBe(false);
    let isReverted: boolean = false;
    txR.match({
      REVERTED: (_resp: RevertedTransactionReceiptResponse) => {
        isReverted = true;
      },
      _: () => {
        isReverted = false;
      },
    });
    expect(isReverted).toBe(true);
  });

  test('test for deploy Success variant', async () => {
    const estimate = await account.estimateDeployFee({ classHash: dd.declare.class_hash });
    const res = await account.deployContract(
      { classHash: dd.declare.class_hash },
      {
        resourceBounds: estimate.resourceBounds,
      }
    ); // maxFee needed to not throw error in getEstimateFee
    const txR = await provider.waitForTransaction(res.transaction_hash);
    expect(txR.value).toHaveProperty('execution_status', TransactionExecutionStatus.SUCCEEDED);
    expect(txR.statusReceipt).toBe('SUCCEEDED');
    expect(txR.isSuccess()).toBe(true);
    expect(txR.isReverted()).toBe(false);
    expect(txR.isError()).toBe(false);
    let isSuccess: boolean = false;
    txR.match({
      SUCCEEDED: (_resp: SuccessfulTransactionReceiptResponse) => {
        isSuccess = true;
      },
      _: () => {
        isSuccess = false;
      },
    });
    expect(isSuccess).toBe(true);
  });

  test('Test else _ case', async () => {
    const myCall: Call = contract.populate('test_fail', { p1: 10 }); // reverted if not 100
    const estim: EstimateFeeResponseOverhead = await account.estimateInvokeFee(
      contract.populate('test_fail', { p1: 100 })
    );
    const res = await account.execute(myCall, { ...estim }); // maxFee needed to not throw error in getEstimateFee
    const txR = await provider.waitForTransaction(res.transaction_hash);
    expect(txR.value).toHaveProperty('execution_status', TransactionExecutionStatus.REVERTED);
    expect(txR.statusReceipt).toBe('REVERTED');
    expect(txR.isSuccess()).toBe(false);
    expect(txR.isReverted()).toBe(true);
    expect(txR.isError()).toBe(false);
    let isReverted: boolean = false;
    txR.match({
      SUCCEEDED: (_resp: SuccessfulTransactionReceiptResponse) => {
        isReverted = false;
      },
      _: () => {
        isReverted = true;
      },
    });
    expect(isReverted).toBe(true);
  });

  test('Mock false rpc response status for ERROR case', async () => {
    const estimate = await account.estimateDeployFee({ classHash: dd.declare.class_hash });
    const res = await account.deployContract(
      { classHash: dd.declare.class_hash },
      {
        resourceBounds: estimate.resourceBounds,
      }
    ); // maxFee needed to not throw error in getEstimateFee

    // Create a mock transaction receipt with a non-existent status
    const receiptWoHelper = (await provider.channel.waitForTransaction(
      res.transaction_hash
    )) as GetTxReceiptResponseWithoutHelper;
    const faleReceipt = {
      ...receiptWoHelper,
      execution_status: 'NONEXISTING' as TransactionExecutionStatus,
    };
    const txR = createTransactionReceipt(faleReceipt as any);

    expect(txR.statusReceipt).toBe('ERROR');
    expect(txR.isSuccess()).toBe(false);
    expect(txR.isReverted()).toBe(false);
    expect(txR.isError()).toBe(true);

    let isSuccess: boolean = false;
    txR.match({
      SUCCEEDED: (_resp: SuccessfulTransactionReceiptResponse) => {
        isSuccess = true;
      },
      _: () => {
        isSuccess = false;
      },
    });
    expect(isSuccess).toBe(false);
  });

  xtest('test error case', async () => {
    // TODO: this should not be possible as fetch would throw on error before it could be read by Helper
    const txR = await provider.getTransactionReceipt('0x123');
    expect(txR.statusReceipt).toBe('ERROR');
    expect(txR.isSuccess()).toBe(false);
    expect(txR.isReverted()).toBe(false);
    expect(txR.isError()).toBe(true);
    let isSuccess: boolean = false;
    txR.match({
      SUCCEEDED: (_resp: SuccessfulTransactionReceiptResponse) => {
        isSuccess = true;
      },
      _: () => {
        isSuccess = false;
      },
    });
    expect(isSuccess).toBe(true);
  });
});
